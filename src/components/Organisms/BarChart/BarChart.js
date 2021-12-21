import React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    // LabelSeries
  } from 'react-vis';
  
import './barChart.scss';

  const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];
  
  const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];

    //закоментил пока не исопльзуется, что бы видеть лог без ошибок

  // const labelData = greenData.map((d, idx) => ({
  //   x: d.x,
  //   y: Math.max(greenData[idx].y, blueData[idx].y)
  // }));

  const margin = {
    default: 40,
    steps: [-3,3]
};

const maxValue = Math.max.apply(null, [...greenData, ...blueData].map(item => item.y));

export const BarChart = () => {
    return (
        <div className='barChart'>
            <AutoSizer>
            {({ width, height }) => {
                return (
                    <XYPlot xType="ordinal" width={width} height={height} yDomain={[0, maxValue+1]}>
                        <VerticalGridLines />
                        <HorizontalGridLines  />
        
                        <XAxis style={{
                            text: {stroke: 'none', fill: '#898A98',}
                        }} />
                        <YAxis style={{
                            text: {stroke: 'none', fill: '#898A98',}
                        }} />
        
                        <VerticalBarSeries barWidth={.25} data={greenData} marginLeft={margin.default+margin.steps[0]} style={{stroke: '#16FFAC', fill: '#16FFAC' }} />
                        <VerticalBarSeries barWidth={.25} data={blueData} marginLeft={margin.default+margin.steps[1]} style={{stroke: '#0063FF', fill: '#0063FF'}} />
                    </XYPlot>
                )
            }}
            </AutoSizer>
        </div>
    )
}