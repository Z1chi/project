import React from 'react';

export const TabsHead = ({ items, renderItem, activeIndex }) => {
    return (
        <div className='tabsHead'>
        {
            items.map( item => {
                return (
                    <div className='tabsHead__item'>
                    {
                        renderItem({ item, activeIndex })
                    }
                    </div>
                )
            })
        }
        </div>
    )
}