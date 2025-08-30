import { useMemo } from 'react';
import { useStateContext } from '@context/StateContext';

export interface GraphData {
  label: string;
  data: number[];
}
export function useDevelopmentChartData() {
  const stateContext = useStateContext();

  const getDaysBetweenDates = (date0: Date, date1: Date) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const date0StartTime: number = date0.getTime() - (date0.getTime() % oneDay);
    const date1StartTime: number = date1.getTime() - (date1.getTime() % oneDay);
    return Math.round(Math.abs(date1StartTime - date0StartTime) / oneDay);
  };

  const skillNamesByActivityIds = useMemo(() => {
    const skillNamesByActivityIds: { [activityId: string]: string } = {};
    for (const skill of stateContext.state.skills) {
      for (const activity of skill.activities) {
        skillNamesByActivityIds[activity.id] = skill.name;
      }
    }
    return skillNamesByActivityIds;
  }, [stateContext.state.history.entries]);

  const chartData = useMemo(() => {
    if (stateContext.state.history.entries.length === 0) {
      return [];
    }
    // hours*minutes*seconds*milliseconds
    const firstDay: Date = stateContext.state.history.entries[0].date;

    // dayCount is the number of days that have passed between the first and today
    const dayCount = getDaysBetweenDates(new Date(), firstDay) + 1;
    // Init Dictionary skillNames-to GraphData
    const dataBySkillNames: { [key: string]: GraphData } = {};
    for (const skill of stateContext.state.skills) {
      dataBySkillNames[skill.name] = {
        label: skill.name,
        data: new Array(dayCount).fill(0), // Array entry for each day that has passed since the first entry
      };
    }
    // Fill the dictionary with data: How many activities have been completed each day?
    for (const entry of stateContext.state.history.entries) {
      const skillName = skillNamesByActivityIds[entry.activityId];
      const dayIdx: number = getDaysBetweenDates(entry.date, firstDay);
      dataBySkillNames[skillName].data[dayIdx] += 1;
    }

    // Accumulated data
    for (const skillName of Object.keys(dataBySkillNames)) {
      for (let i = 0; i < dataBySkillNames[skillName].data.length; i++) {
        if (i > 0) {
          dataBySkillNames[skillName].data[i] +=
            dataBySkillNames[skillName].data[i - 1];
        }
      }
    }
    return Object.values(dataBySkillNames);
  }, [stateContext.state.history.entries]);

  const totalDays = useMemo(() => {
    if (chartData.length === 0) return 0;
    return chartData[0].data.length;
  }, [chartData]);

  const totalAccumActivities = useMemo(() => {
    let totalAccumData = 0;
    for (const d of chartData) {
      if (d.data.length > 0) {
        totalAccumData += d.data[d.data.length - 1];
      }
    }
    return totalAccumData;
  }, [chartData]);

  const firstActivityDate = useMemo(() => {
    const passedTime = 24 * 60 * 60 * 1000 * totalDays;
    const firstDayTime = new Date().getTime() - passedTime;
    return new Date(firstDayTime);
  }, [chartData]);

  return {
    chartData,
    firstActivityDate,
    totalAccumActivities,
    totalDays,
  };
}
