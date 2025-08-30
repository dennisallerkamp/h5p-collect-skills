import { Translation } from '@/Translations';

export class Activity {
  description: string;
  isOneTime: boolean;
  id: string;
  isAbsolved = false;
  absolveCount = 0;

  static from(json: any): Activity {
    const activity = new Activity();
    activity.description = json.description;
    activity.isOneTime = json.isOneTime;

    return activity;
  }

  public markAsAbsolved(): void {
    this.isAbsolved = true;
    this.absolveCount++;
  }

  public undoAbsolve(): void {
    if (this.absolveCount > 0) {
      this.absolveCount--;
    }
    if (this.absolveCount === 0) {
      this.isAbsolved = false;
    }
  }

  public canBeAbsolved(): boolean {
    return !(this.isOneTime && this.isAbsolved);
  }

  public getStatusClassname(): string {
    if (!this.isAbsolved) {
      return '';
    }
    return this.isOneTime ? 'completed' : 'absolved';
  }

  public getStatusMessage(): string {
    let message = '';

    if (!this.isAbsolved) {
      message = Translation.translate('status_not_absolved');
    } else if (this.isOneTime) {
      message = Translation.translate('status_absolved');
    } else {
      message = Translation.translate('status_x_times_absolved', {
        '@times': String(this.absolveCount),
      });
    }

    return message;
  }
}
