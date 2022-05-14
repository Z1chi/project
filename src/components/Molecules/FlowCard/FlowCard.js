import React from 'react';
import SVG from 'react-inlinesvg';

import {FlowItem} from '../../Atoms/FlowItem/FlowItem';

import {flowList} from './constants/difference';

import './flowCard.scss';

const getDifference = ({currentMonthValue, lastMonthValue}) => {
    return lastMonthValue === 0 ? 0 : Math.abs((currentMonthValue / lastMonthValue) * 100 - 100);
};

const getFlow = ({currentMonthValue, lastMonthValue}) => {
    return currentMonthValue > lastMonthValue
        ? flowList.increase
        : currentMonthValue < lastMonthValue
            ? flowList.decrease
            : flowList.unchanged
};

export const FlowCard = ({icon, title, currentMonth, lastMonth, renderValue = (value) => value.amount, backgroundColor, isMobile, period}) => {
    return (
        <div className={`flowCard${isMobile?' flowCard--isMobile':''}`}>
            <div className='flowCard__icon' style={{backgroundColor}}>
                <SVG src={icon}/>
            </div>
            <div className='flowCard__text'>
                <div className='flowCard__title'>
                    {title}
                </div>
                <div className='flowCard__subtitle'>
                    <div className='flowCard__vale'>{renderValue(currentMonth)}</div>
                    { lastMonth && lastMonth.amount > 0 && period &&
                        <div className='flowCard__flow'>
                            <FlowItem
                                difference={getDifference({
                                    currentMonthValue: currentMonth.amount,
                                    lastMonthValue: lastMonth.amount
                                })}
                                flow={getFlow({
                                    currentMonthValue: currentMonth.amount,
                                    lastMonthValue: lastMonth.amount
                                })}
                            />
                        </div>
                    }
                </div>
                { lastMonth && period && <div className='flowCard__description'>
                    Compared to {renderValue(lastMonth)} {period}
                </div> }
            </div>
        </div>
    )
};