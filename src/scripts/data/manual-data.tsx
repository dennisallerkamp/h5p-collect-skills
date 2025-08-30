import React from 'react';

export const pages = [
  {
    headline: 'manual1_headline',
    text: 'manual1_txt',
    animation: (
      <img id="manualAnimationCollectSkillsIcon" alt="collect skills logo" />
    ),
    id: 'collectSkillsIconManualAnimation',
  },
  {
    headline: 'manual2_headline',
    text: 'manual2_txt',
    animation: (
      <>
        <img id="manual_animation_skill" alt="Manual animation layer" />
        <img id="manual_animation_activity_1" alt="Manual animation layer" />
        <img alt="Manual animation layer" />
        <img alt="Manual animation layer" />
        <img alt="Manual animation layer" />
        <img id="manual_animation_cursor" alt="Manual animation layer" />
        <img id="manual_animation_chest" alt="Manual animation layer" />
        <img id="manual_animation_clickfx" alt="Manual animation layer" />
        <img id="manual_animation_activity_done" alt="Manual animation layer" />
      </>
    ),
    id: 'activityCompletionManualAnimation',
  },
  {
    headline: 'manual3_headline',
    text: 'manual3_txt',
    animation: (
      <div id="trophyAnimationContainer">
        <img id="manualAnimationTrophy" alt="trophy" />
        <div id="lightStreak" />
      </div>
    ),
    id: 'trophyManualAnimation',
  },
];
