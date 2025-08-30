export class Translation {
  private static translations: { [key: string]: string };

  private static DEFAULT_TRANSLATION: { [key: string]: string } = {
    manual1_headline: 'Welcome to @appname!',
    manual1_txt:
      'Your tool for digitally checking on your competencies. The goal of @appname is to help you to become aware of your strengths and weaknesses.',
    manual2_headline: 'Use @appname as many times as you want',
    manual2_txt:
      'Collect and document project related tasks and activities in the treasure box. Many activities can be completed more than once.',
    manual3_headline: 'Track your progress',
    manual3_txt:
      'You can see your individual competency-progress by clicking on the trophy-icon. Find out what @appname is offering you...',
    next_bt_descr: 'Next',
    prev_bt_descr: 'Back',
    ready_bt_descr: "Let's go",
    badge_page_name: 'Badges',
    badge_1_name: 'The Beginning',
    badge_1_descr: 'Absolve an activity for the first time.',
    badge_2_name: 'Specialist',
    badge_2_descr: 'Absolve an activity for at least 5-times.',
    badge_3_name: 'Allrounder',
    badge_3_descr: 'Absolve at least one activity from at least one category.',
    badge_4_name: 'Expert',
    badge_4_descr: 'Absolve each activity at least one time.',
    badge_5_name: 'Ambitioned',
    badge_5_descr: 'Absolve at least 5 activities on a single day.',
    badge_6_name: 'Endurance runner',
    badge_6_descr: 'Use the tool every day.',
    badge_7_name: 'Total-Activities',
    badge_7_descr:
      'Accumulated number of all absolved activities from all skills.',
    badge_8_name: 'Badge Master',
    badge_8_descr: 'Total number of all collected badges.',
    badge_locked: 'Locked',
    badge_unlocked: 'Unlocked',
    badge_lvl_unlocked: 'Unlocked: Level @level',
    skills_headline: 'Skills',
    remaining_activities_for_lvl:
      'Absolve @remainingActivities more activities to reach the next level',
    max_lvl_reached: 'You have reached the maximum Level!',
    activity: 'Activity',
    absolved_at: 'Absolved at @date',
    last_absolved: 'Last absolved at @date',
    absolved_activities: 'Absolved activities',
    not_absolved_activities: 'Remaining activities',
    absolve_bt_label: 'Absolve activity',
    undo_absolve_bt_label: 'Undo absolving',
    status_absolved: 'Absolved',
    status_not_absolved: 'Not absolved',
    status_x_times_absolved: '@times times absolved',
    dev_graph_bt_label: 'Development',
    dev_graph_x_axis_label: 'Time in @unit (@firstActivityDate until today)',
    dev_graph_y_axis_label:
      'Acc. absolved activities (today @totalAccActivities)',
    unit_days: 'days',
    unit_weeks: 'weeks',
    message_successfully_completed_activity: 'Activity successfully completed',
    message_successfully_undone_activity:
      'Activity completion successfully undone',
    message_activity_already_absolved: 'Activity was already absolved',
    achievement_congratulations: 'Congratulations!',
    achievement_badge_txt: 'You earned a new badge: @badgeName',
    achievement_skill_txt: 'You reached level @newLvl of the Skill @skillName.',
    button_label_main_page: 'Change to activity page',
    button_label_close_modal: 'Close modal',
    button_label_manual: 'Open the manual',
    button_label_fullscreen: 'Open the app in fullscreen',
    button_label_badges_page: 'Change to badges-page',
    button_label_skills_page: 'Change to skills-page',
    button_label_skill_details:
      'See details of progress for the skill @skillName',
    button_label_badge_details:
      'See details of progress for the skill @badgeName',
    button_label_change_activity_status:
      'Edit activity status of  @activitydescr',
    badge_img_label: 'Image of the badge @badgeName',
  };

  static set_translations(translations: { [key: string]: string }) {
    if (translations == null) {
      Translation.translations = Translation.DEFAULT_TRANSLATION;
    } else {
      Translation.translations = translations;
      for (const key in Translation.DEFAULT_TRANSLATION) {
        if (
          !(key in Translation.translations) ||
          Translation.translations[key] == null
        ) {
          Translation.translations[key] = Translation.DEFAULT_TRANSLATION[key];
        }
      }
    }
  }

  static translate(key: string, variables: { [key: string]: string } = {}) {
    let translation: string = Translation.translations[key];
    for (const key in variables) {
      translation = translation.replace(key, variables[key]);
    }
    return translation;
  }
}
