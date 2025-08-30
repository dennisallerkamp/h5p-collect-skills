import React, { useEffect, useState } from 'react';
import { Translation } from '@/Translations';
import Modal from './Modal';
import './DevelopmentModal.scss';
import DevelopmentGraph from '@components/DevelopmentGraph';
import { useDevelopmentChartData } from '@hooks/useDevelopmentChartData';

export default function DevelopmentModal() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const { chartData, firstActivityDate, totalAccumActivities, totalDays } =
    useDevelopmentChartData();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });

    resizeObserver.observe(document.getElementById('chartSvg'));
  });

  function showOnlyWeeksOnXAxis(): boolean {
    const xAxisDivisionWidth: number = width / totalDays;
    return xAxisDivisionWidth < 7;
  }

  function getYAxisLabel() {
    return Translation.translate('dev_graph_y_axis_label', {
      '@totalAccActivities': String(totalAccumActivities),
    });
  }

  function getXAxisLabel(): string {
    if (firstActivityDate != null) {
      const date = firstActivityDate.toLocaleDateString();
      let unit = 'unit_days';
      if (showOnlyWeeksOnXAxis()) unit = 'unit_weeks';
      return Translation.translate('dev_graph_x_axis_label', {
        '@firstActivityDate': date,
        '@unit': Translation.translate(unit),
      });
    }
    return '';
  }

  return (
    <Modal id={'graphModal'} headline={'Graph'}>
      <div className="graph-modal-container">
        <div className="graph-container">
          <div className="graph-container-row">
            <span className="graph-y-axis-headline">{getYAxisLabel()}</span>
            <DevelopmentGraph
              showWeeksOnXAxis={showOnlyWeeksOnXAxis()}
              chartWidth={width}
              chartHeight={height}
            />
          </div>
          <span className="graph-x-axis-headline">{getXAxisLabel()}</span>
          <div className="graph-explanation">
            {chartData.map((graphDate, i) => (
              <div key={graphDate.label} className="graph-exp">
                <div className={'graph-exp-color graph-' + (i % 16)}></div>
                <span className="graph-exp-txt">{graphDate.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
