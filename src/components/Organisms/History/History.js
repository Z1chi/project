import React from 'react';

import { HistoryItem } from '../../Molecules/HistoryItem/HistoryItem';

import './history.scss';

export const History = ({ historyList, }) => {
    return (
        <div className='history'>
            <div className='history__header'>
                <div className='history__title'>
                    History
                </div>
                <div className='history__showAll'>
                    Show All
                </div>
            </div>
            <div className='history__list'>
            {
                historyList.map(item => {
                    return (
                        <div className='history__listItem'>
                            <HistoryItem {...item} />
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}