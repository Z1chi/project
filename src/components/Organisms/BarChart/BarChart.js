import { useAtom } from '@reatom/react';
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
import { languageAtom } from '../../../store/language';

import { TableEmpty } from '../../Molecules/TableEmpty/TableEmpty';
  
import './barChart.scss';

  // const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];
  
  // const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];

    //закоментил пока не исопльзуется, что бы видеть лог без ошибок

  // const labelData = greenData.map((d, idx) => ({
  //   x: d.x,
  //   y: Math.max(greenData[idx].y, blueData[idx].y)
  // }));

    const margin = {
        default: 40,
        steps: [-3,3]
    };

    const colors = [
        '#16FFAC',
        '#0063FF',
    ];

    const getFormattedTick = num => {
        if (num >= 1000000000) {
          return Math.round(num / 100000000) / 10 + "Bn";
        } else if (num >= 1000000) {
          return Math.round(num / 100000) / 10 + "M";
        } else if (num >= 1000) {
          return Math.round(num / 100) / 10 + "K";
        } else {
            return Math.round(num);
        }
    };
export const BarChart = ({ data, isEmpty }) => {

    const [languageData, languageActions] = useAtom(languageAtom);

    if(isEmpty) {
        return (
            <div className='barChart'>
                <TableEmpty text={languageData.data.common.emptyChart} />    
            </div>
        )
        
    }

    const maxValue = Math.max.apply(null, data.bars.map( item => item.data).flat());

    const leftMargin = ( Math.max(...data.bars[0].data.map(item => getFormattedTick(item.y))) ).toString().length * 16 + 20;

    return (
        <div className='barChart'>
            <AutoSizer>
            {({ width, height }) => {
                return (
                    <XYPlot xType="ordinal" width={width} height={height} yDomain={[0, maxValue+1]} margin={{ left: leftMargin }}>
                        <VerticalGridLines />
                        <HorizontalGridLines  />
        
                        <XAxis tickLabelAngle={-30} style={{
                            text: {stroke: 'none', fill: '#898A98',},
                            ticks: {fontSize: 10},
                        }}/>
                        <YAxis style={{
                            text: {stroke: 'none', fill: '#898A98',}
                        }} tickFormat={getFormattedTick} />
        
                        {
                            data.bars && data.bars.map( (bar, barIndex) => {
                                const relevantData = [...bar.data].slice(-10);
                                const barData = relevantData.map( (item, index) => {
                                    return {
                                        x: data.dates[index].split(' ')[0],
                                        y: Number(item),
                                    }
                                } );
                                return (
                                    <VerticalBarSeries key={barIndex} color={colors[barIndex]} barWidth={.25} data={barData} marginLeft={margin.default+margin.steps[barIndex]} style={data.style} />
                                )
                            })
                        }
                    </XYPlot>
                )
            }}
            </AutoSizer>
        </div>
    )
};