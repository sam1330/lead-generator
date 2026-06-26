import { agentBus, EVENTS } from "../brokers/index.js";

export type PayloadParams = {
    // context: {
    //     sessionId: string;
    //     userId: string;
    // },
    instructions: string
};

agentBus.on(EVENTS.DISCOVERY.SEARCH_REQUESTED, async (payload: PayloadParams) => { 
    // Invoke discovery agent.
    console.log('Discovery agent invoked', payload);
});

agentBus.on(EVENTS.DISCOVERY.SEARCH_COMPLETED, async (payload: PayloadParams) => {
    // Notify done workflow.
    console.log(payload);
});

agentBus.on(EVENTS.QUALITY.QUALIFY_REQUESTED, async (payload: PayloadParams) => {
    // Notify done workflow.
    console.log(payload);
});

agentBus.on(EVENTS.QUALITY.QUALIFY_COMPLETED, async (payload: PayloadParams) => {
    // Notify done workflow.
    console.log(payload);
});

agentBus.on(EVENTS.OUTREACH.GENERATION_REQUESTED, async (payload: PayloadParams) => {
    // Notify done workflow.
    console.log(payload);
});

agentBus.on(EVENTS.OUTREACH.GENERATION_COMPLETED, async (payload: PayloadParams) => {
    // Notify done workflow.
    console.log(payload);
});