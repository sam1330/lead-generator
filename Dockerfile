# --- STAGE 1: Base Runtime Setup ---
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Enable Corepack to automatically manage the correct pnpm version
RUN corepack enable

# --- STAGE 2: Install All Dependencies & Build ---
FROM base AS build
WORKDIR /usr/src/app

# Copy lockfile and package configuration
COPY package.json pnpm-lock.yaml ./

# Use a BuildKit cache mount to drastically speed up sequential pnpm installs
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Compile TypeScript into JavaScript (typically outputs to a /dist folder)
RUN pnpm run build

# --- STAGE 3: Install Production-Only Dependencies ---
FROM base AS prod-deps
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# --- STAGE 4: Final Lightweight Runtime Image ---
FROM base AS runtime
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy compiled JS code from the build stage
COPY --from=build --chown=node:node /usr/src/app/dist ./dist
# Copy only production dependencies from the prod-deps stage
COPY --from=prod-deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/package.json ./package.json

# Run the container as a non-root user for enhanced security
USER node

EXPOSE 3000

CMD [ "node", "dist/src/index.js" ]
