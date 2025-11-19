export const CloudLog = {
  events: [] as any[],

  record(event: any) {
    this.events.push({
      ...event,
      timestamp: new Date().toISOString()
    });
  }
};
