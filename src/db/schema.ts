import { sql } from "drizzle-orm";
import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const leadsTable = pgTable("leads", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  industry: varchar({ length: 255 }),
  answered: boolean().notNull().default(false),
});
