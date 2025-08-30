export default class ActivityHistory {
  public entries: {
    date: Date;
    activityId: string;
  }[];

  constructor(entries: { date: Date; activityId: string }[] = []) {
    this.entries = entries;
  }

  public findLastAbsolvedIndex(activityId: string): number {
    let lastEntryIndex = -1;

    this.entries.forEach((entry, index) => {
      if (entry.activityId === activityId) {
        lastEntryIndex = index;
      }
    });
    return lastEntryIndex;
  }

  public getLastAbsolvedAsString(activityId: string): string {
    const index = this.findLastAbsolvedIndex(activityId);
    if (index !== -1) {
      return this.entries[index].date.toLocaleDateString();
    }
    return '';
  }

  public removeEntryByIndex(index: number): void {
    if (index !== -1) {
      this.entries.splice(index, 1); // Remove the entry
    }
  }

  public addEntry(entry: { date: Date; activityId: string }) {
    this.entries.push(entry);
  }
}
