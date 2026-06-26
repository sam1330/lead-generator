import type { PayloadParams } from "../consumers/index.js";
import { agentBus, EVENTS } from "../brokers/index.js";

export class OrchestratorAgentEvent {
    emitInvokeDiscoveryAgent(data: PayloadParams) {
        agentBus.emit(EVENTS.DISCOVERY.SEARCH_REQUESTED, data);
    }

    emitInvokeQualityAgent(data: PayloadParams) {
        agentBus.emit(EVENTS.QUALITY.QUALIFY_REQUESTED, data);
    }

    emitInvokeOutreachAgent(data: PayloadParams) {
        agentBus.emit(EVENTS.OUTREACH.GENERATION_REQUESTED, data);
    }

    emitAnswerToUser(data: PayloadParams) {
        agentBus.emit(EVENTS.USER.ANSWER, data);
    }
}

export class DiscoveryAgentEvent {
    emitSearchCompleted(data: PayloadParams) {
        agentBus.emit(EVENTS.ORCHESTRATOR.INVOKE, data);
    }
}

export class QualityAgentEvent {
    emitQualificationCompleted(data: PayloadParams) {
        agentBus.emit(EVENTS.ORCHESTRATOR.INVOKE, data);
    }
}

export class OutreachAgentEvent {
    emitOutreachCompleted(data: PayloadParams) {
        agentBus.emit(EVENTS.ORCHESTRATOR.INVOKE, data);
    }
}