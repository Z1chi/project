import React from 'react';

import { TabsHead } from '../../Molecules/TabsHead/TabsHead';

import './tabs.scss';

export const Tabs = ({ tabs, }) => {
    return (
        <div className='tabs'>
            <div className='tabs__head'>
                <TabsHead items={tabs.items.map(item => item.head)} renderItem={tabs.renderHeadItem} activeIndex={tabs.activeIndex} />
            </div>
            <div className='tabs__content'>
            {
                tabs[tabs.activeIndex].renderContent()
            }
            </div>
        </div>
    )
}