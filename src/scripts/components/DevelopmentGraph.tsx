import React from 'react';
import './DevelopmentGraph.scss';
import { useDevelopmentChartData } from '@hooks/useDevelopmentChartData';

type ChartProps = {
  showWeeksOnXAxis: boolean;
  chartWidth: number;
  chartHeight: number;
};

export default function DevelopmentGraph({
  showWeeksOnXAxis,
  chartWidth,
  chartHeight,
}: ChartProps) {
  const { chartData, totalAccumActivities, totalDays } =
    useDevelopmentChartData();

  const chartValuesWidth = chartWidth - 15;
  const chartValuesHeight = chartHeight - 15;

  const xAxisPoints = { x1: 0, y1: 0, x2: chartWidth, y2: 0 };
  const xAxisArrowPoints: [number, number][] = [
    [chartWidth - 10, 10],
    [chartWidth, 0],
    [chartWidth - 10, -10],
  ];

  const yAxisPoints = { x1: 0, y1: 0, x2: 0, y2: chartHeight };
  const yAxisArrowPoints: [number, number][] = [
    [-10, chartHeight - 10],
    [0, chartHeight],
    [10, chartHeight - 10],
  ];

  function pointsToString(points: [number, number][]) {
    let pointsAsStr = '';
    for (let i = 0; i < points.length; i++) {
      // Apply padding
      const x = offsetPoint('x', points[i][0]);
      const y = offsetPoint('y', points[i][1]);

      pointsAsStr += String(x) + ',' + String(y) + ' ';
    }
    return pointsAsStr;
  }

  function offsetPoint(coord: 'x' | 'y', pt: number) {
    if (coord === 'x') {
      return (pt / chartWidth) * (chartWidth - 12) + 10;
    } else {
      pt = (pt / chartHeight) * (chartHeight - 12) + 10;
      return chartHeight - pt;
    }
  }

  function getChartPolygons() {
    const polygonInfo: { id: string; classname: string; points: string }[] = [];

    const currAccumulatedData: number[] = new Array(totalDays).fill(0);

    for (let i = 0; i < chartData.length; i++) {
      const graphData = chartData[i];
      for (let j = 0; j < graphData.data.length; j++) {
        currAccumulatedData[j] += graphData.data[j];
      }

      polygonInfo.unshift(getGraphPolygon(i, currAccumulatedData));
    }
    return polygonInfo;
  }

  function getGraphPolygon(
    polygonIdx: number,
    currAccumData: number[],
  ): { id: string; classname: string; points: string } {
    const graphClassName: string = 'graph-' + String(polygonIdx % 16);

    const xStepSize: number = chartValuesWidth / currAccumData.length;
    const yStepSize: number = chartValuesHeight / totalAccumActivities;

    let xPoint: number;
    let yPoint: number;

    const points: [number, number][] = [[0, 0]];

    for (let j = 0; j < currAccumData.length; j++) {
      xPoint = (j + 1) * xStepSize;
      yPoint = currAccumData[j] * yStepSize;
      points.push([xPoint, yPoint]);
    }
    points.push([xPoint, 0]);
    points.push([0, 0]);

    return {
      id: graphClassName,
      classname: graphClassName,
      points: pointsToString(points),
    };
  }

  function getAxisStrokes() {
    if (totalDays <= 0 || totalAccumActivities <= 0) {
      return [];
    }

    const axisDivisionStrokeLen: number = 15;
    // Init x-axis unit-subdivisions
    let xAxisDivisionWidth: number = chartValuesWidth / totalDays;
    let xAxisDivisionsCount: number = totalDays;

    if (showWeeksOnXAxis) {
      // Show weeks on axis instead of days when days become to small
      xAxisDivisionWidth = xAxisDivisionWidth * 7;
      xAxisDivisionsCount = Math.floor(xAxisDivisionsCount / 7);
    }

    const axisStrokes = [];
    for (let i = 1; i <= xAxisDivisionsCount; i++) {
      axisStrokes.push({
        id: 'x-axis-unit-' + i,
        class: 'x-axis-unit-division',
        x1: i * xAxisDivisionWidth,
        y1: -axisDivisionStrokeLen / 2,
        x2: i * xAxisDivisionWidth,
        y2: axisDivisionStrokeLen / 2,
      });
    }

    // Init y-axis unit-subdivisions
    const yAxisDivisionWidth: number = chartValuesHeight / totalAccumActivities;
    if (yAxisDivisionWidth > 7) {
      // Only draw if there is enough space otherwise the subdivisions become to small
      for (let i = 1; i <= totalAccumActivities; i++) {
        axisStrokes.push({
          id: 'y-axis-unit-' + i,
          class: 'y-axis-unit-division',
          x1: -axisDivisionStrokeLen / 2,
          y1: i * yAxisDivisionWidth,
          x2: axisDivisionStrokeLen / 2,
          y2: i * yAxisDivisionWidth,
        });
      }
    }
    return axisStrokes;
  }

  return (
    <svg id="chartSvg">
      {getChartPolygons().map((chartPolygon) => (
        <polygon
          key={chartPolygon.id}
          id={chartPolygon.id}
          points={chartPolygon.points}
          className={chartPolygon.classname}
        ></polygon>
      ))}

      <line
        id="x-axis"
        x1={offsetPoint('x', xAxisPoints.x1)}
        y1={offsetPoint('y', xAxisPoints.y1)}
        x2={offsetPoint('x', xAxisPoints.x2)}
        y2={offsetPoint('y', xAxisPoints.y2)}
      ></line>
      <line
        id="y-axis"
        x1={offsetPoint('x', yAxisPoints.x1)}
        y1={offsetPoint('y', yAxisPoints.y1)}
        x2={offsetPoint('x', yAxisPoints.x2)}
        y2={offsetPoint('y', yAxisPoints.y2)}
      ></line>

      <polyline
        id="x-axis-arrow"
        points={pointsToString(xAxisArrowPoints)}
      ></polyline>
      <polyline
        id="y-axis-arrow"
        points={pointsToString(yAxisArrowPoints)}
      ></polyline>

      {getAxisStrokes().map((stroke) => (
        <line
          key={stroke.id}
          id={stroke.id}
          className={stroke.class}
          x1={offsetPoint('x', stroke.x1)}
          y1={offsetPoint('y', stroke.y1)}
          x2={offsetPoint('x', stroke.x2)}
          y2={offsetPoint('y', stroke.y2)}
        ></line>
      ))}
    </svg>
  );
}
