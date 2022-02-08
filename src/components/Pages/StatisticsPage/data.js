import React from "react";
import {images} from "./images";

import { dropdownTypes } from '../../../constants/dropdown';
import { idArrayFormator,dateFormator, currencyFormator } from "../../../helpers/lib";



export const filters = [{
    id: 'date',
    title: 'Date',
    mobileTitle: 'Select date',
    type: dropdownTypes.DATE,
    width: '204px',
}, {
    id: 'format',
    title: 'Format',
    mobileTitle: 'Select format',
    type: dropdownTypes.SELECT, 
    matchPropName: 'label',
    width: '154px',
    renderItem: (item) => item.label,
}, {
    id: 'country',
    title: 'Country',
    mobileTitle: 'Select countries',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'name',
    width: '154px',
    renderItem: (item) => item.name,
}, {
    id: 'smartlink',
    title: 'Smartlink',
    mobileTitle: 'Select smartlink',
    type: dropdownTypes.SELECT,
    matchPropName: 'title',
    width: '154px',
    renderItem: (item) => item.title,
}, {
    id: 'offer',
    title: 'Offers',
    mobileTitle: 'Select offers',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'title',
    width: '154px',
    renderItem: (item) => (
        <div style={{display: 'flex', alignItems: 'center', }}>
            <img src={item.image}  alt='image'/>
            <span style={{marginLeft: '10px'}}>{item.title}</span>
        </div>
    ),
}, ];

export const filterFormators = {
    date: date => dateFormator(date),
    format: itemArray => idArrayFormator(itemArray),
    country: itemArray => idArrayFormator(itemArray),
    smartlink: itemArray => idArrayFormator(itemArray),
    offer: itemArray => idArrayFormator(itemArray),
};

export const table = {
    groups: [{
        id: 'Time',
        width: '150px',
    }, {
        id: 'Clicks',
        width: '300px',
    }, {
        id: 'Leads',
        width: '300px',
    }, {
        id: 'Deposits',
        info: true,
        width: '400px',
    }, {
        id: 'Profit',
        info: true,
        width: '300px',
    }, {
        id: 'Withdraw',
        info: true,
        width: '300px',
    }],
    tableConfig: [{
        columnId: 'date',
        columnName: 'Date',
        columnWidth: '150px',
        isGroupEnd: true,
        groupId: 'Time',
    }, {
        columnId: 'clicks',
        columnName: 'Clicks',
        columnWidth: '100px',
        groupId: 'Clicks',
    }, {
        columnId: 'unique_clicks',
        columnName: 'Unique Clicks',
        columnWidth: '100px',
        groupId: 'Clicks',
    }, {
        columnId: 'epc',
        columnName: 'EPC',
        columnWidth: '100px',
        isGroupEnd: true,
        groupId: 'Clicks',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'registrations',
        columnName: 'Reg',
        columnWidth: '100px',
        groupId: 'Leads',
    }, {
        columnId: 'clicks_to_registration',
        columnName: 'CR',
        columnWidth: '100px',
        groupId: 'Leads',

        renderRowItem: item => `${Number(item).toFixed(2)} %`,
    }, {
        columnId: 'epr',
        columnName: 'EPR',
        columnWidth: '100px',
        isGroupEnd: true,
        groupId: 'Leads',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'deposits',
        columnName: 'DEP',
        columnWidth: '100px',
        groupId: 'Deposits',
    }, {
        columnId: 'clicks_to_deposit',
        columnName: 'CR',
        columnWidth: '100px',
        groupId: 'Deposits',

        renderRowItem: item => isNaN(Number(item)) ? item : `${Number(item).toFixed(2)} %`,
    }, {
        columnId: 'registrations_to_deposit',
        columnName: 'CR',
        columnWidth: '100px',
        groupId: 'Deposits',

        renderRowItem: item => isNaN(Number(item)) ? item : `${Number(item).toFixed(2)} %`,
    }, {
        columnId: 'sum_deposit',
        columnName: 'SUM',
        columnWidth: '100px',
        isGroupEnd: true,
        groupId: 'Deposits',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'profit_cpa',
        columnName: 'CPA',
        columnWidth: '100px',
        groupId: 'Profit',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'profit_revshare',
        columnName: 'REVSHARE',
        columnWidth: '100px',
        groupId: 'Profit',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'profit_sum',
        columnName: 'SUM',
        columnWidth: '100px',
        isGroupEnd: true,
        groupId: 'Profit',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'cpa_pending',
        columnName: 'Pending',
        columnWidth: '100px',
        groupId: 'Withdraw',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'cpa_declined',
        columnName: 'Declined',
        columnWidth: '100px',
        groupId: 'Withdraw',
        
        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'cpa_accepted',
        columnName: 'Accepted',
        columnWidth: '100px',
        groupId: 'Withdraw',

        renderRowItem: (item) => currencyFormator(item),
    },


    ],

    data: [{
        date: 'Mar 13, 2021 08:05 AM',
        userId: '#1234567890123',
        action: 'Click',
        deposit: 'Lorem ipsum',
        geo: 'Unknown',
        smartLink: 'Test',
        payout: {
            value: 1800,
            currency: '$',
            precision: 0,
        }
    }, {
        date: 'Mar 13, 2021 08:05 AM',
        userId: '#1234567890123',
        action: 'Click',
        deposit: 'Lorem ipsum',
        geo: 'Unknown',
        smartLink: 'Test',
        payout: {
            value: 1800,
            currency: '$',
            precision: 0,
        }
    }, {
        date: 'Mar 13, 2021 08:05 AM',
        userId: '#1234567890123',
        action: 'Click',
        deposit: 'Lorem ipsum',
        geo: 'Unknown',
        smartLink: 'Test',
        payout: {
            value: 1800,
            currency: '$',
            precision: 0,
        }
    },],

    emptyTable: {
        icon: images.emptyTableIcon,
        text: 'Your statistics will appear here once you’ll lorem ipsum dolomir loret galor.',
        button: {
            text: 'Explore offers',
            link: '/offers',
        }
    }
};

