import React from 'react';

import SVG from 'react-inlinesvg';

import './historyItem.scss';
import { images } from './images';

export const HistoryItem = ({ source, date, income, }) => {
    return (
        <div className='historyItem'>
            <div className='historyItem__info'>
                <div className='historyItem__source'>
                    {source}
                </div>
                <div className='historyItem__date'>
                    {date}
                </div>
            </div>
            <div className='historyItem__amount'>
                {income.currency.symbol} {income.amount.toFixed(income.precision)}
            </div>
            <div className='historyItem__more'>
                <SVG src={images.arrowIcon} />
            </div>
        </div>
    )
}