import EventEmitter from "node:events";

export const agentBus = new EventEmitter();

export const EVENTS = {
    USER: {
        ANSWER: "user:answer"
    },
    ORCHESTRATOR: {
        INVOKE: "orchestrator:invoke"
    },
    DISCOVERY:{
        SEARCH_REQUESTED: "discovery:search_requested",
        SEARCH_COMPLETED: "discovery:search_completed",
    },
    QUALITY: {
        QUALIFY_REQUESTED: "quality:qualification_requested",
        QUALIFY_COMPLETED: "quality:qualification_requested",
    },
    OUTREACH: {
        GENERATION_REQUESTED: "outreach:generation_requested",
        GENERATION_COMPLETED: "outreach:generation_completed",
    }
}