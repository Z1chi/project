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


export const BarChart = ({ data }) => {
    
    const maxValue = Math.max.apply(null, data.bars.map( item => item.data).flat());

    console.log('maxValue', maxValue)

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
        
                        {
                            data.bars.map( (bar, index) => {
                                const barData = bar.data.map( (item, index) => {
                                    return {
                                        x: data.dates[index],
                                        y: Number(item),
                                    }
                                } );
                                console.log('r', barData)
                                return (
                                    <VerticalBarSeries barWidth={.25} data={barData} marginLeft={margin.default+margin.steps[index]} style={data.style} />
                                )
                            })
                        }
                    </XYPlot>
                )
            }}
            </AutoSizer>
        </div>
    )
}