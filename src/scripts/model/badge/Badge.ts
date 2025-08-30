import { Translation } from '@/Translations';
import { State } from '@context/StateContext';

export abstract class Badge {
  name: string;
  description: string;
  imageIndex: number;
  hasLevel: boolean;

  protected constructor(
    nameKey: string,
    descriptionKey: string,
    imageIndex: number,
    hasLevel: boolean,
  ) {
    this.name = Translation.translate(nameKey);
    this.description = Translation.translate(descriptionKey);
    this.imageIndex = imageIndex;
    this.hasLevel = hasLevel;
  }

  public getClassName(): string {
    const level = this.calculateLevel();

    if (this.hasLevel && level > 0) {
      return 'lvl' + level;
    } else if (level === 1) {
      return 'free';
    }

    return 'locked';
  }

  public getStatusMessage(): string {
    const level = this.calculateLevel();

    if (this.hasLevel && level > 0) {
      return Translation.translate('badge_lvl_unlocked', {
        '@level': level.toString(),
      });
    }
    if (level === 1) {
      return Translation.translate('badge_unlocked');
    }
    return Translation.translate('badge_locked');
  }

  abstract calculateLevel(state?: State): number;
}
