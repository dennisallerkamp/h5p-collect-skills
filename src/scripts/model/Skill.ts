import { Activity } from './Activity';

interface Image {
  path: string;
  width: number;
  height: number;
  copyright: any;
}

export default class Skill {
  public image: Image;
  public name: string;
  public activities: Activity[];

  public static from(json: Skill[]): Skill[] {
    return json.map((skill: Skill) => Skill.fromSingle(skill));
  }

  public static fromSingle(json: Skill): Skill {
    const skill = new Skill();
    skill.image = json.image;
    skill.name = json.name;
    skill.activities = json.activities.map((activity: any) =>
      Activity.from(activity),
    );

    return skill;
  }
}

export function calcSkillLevel(absolvedCount: number) {
  if (absolvedCount === 0) return 1;
  return Math.min(5, absolvedCount);
}
