import {images} from "./images";

import { dropdownTypes } from '../../../constants/dropdown';
import { idArrayFormator } from "../../../helpers/idArrayFormator";
import { dateFormator } from "../../../helpers/dateFormator";

export const filters = [{
    id: 'date',
    title: 'Date',
    mobileTitle: 'Select date',
    type: dropdownTypes.DATE,
    width: '204px',
    onSelectFormator: date => dateFormator(date),
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
    width: '154px',
    renderItem: (item) => item.title,
    onSelectFormator: (item)=>item.id,
}, {
    id: 'offer',
    title: 'Offers',
    mobileTitle: 'Select offers',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'title',
    width: '154px',
    renderItem: (item) => (
        <div style={{display: 'flex', alignItems: 'center', }}>
            <img src={item.image} />
            <span style={{marginLeft: '10px'}}>{item.title}</span>
        </div>
    ),
    onSelectFormator: itemArray => idArrayFormator(itemArray),
}, ];


export const table = {
    tableConfig: [{
        columnId: 'date',
        columnName: 'Date',
        columnWidth: '150px',
        isGroupEnd: true,
    }, {
        columnId: 'clicks',
        columnName: 'Clicks',
        columnWidth: '100px',
    }, {
        columnId: 'unique_clicks',
        columnName: 'Unique Clicks',
        columnWidth: '100px',
    }, {
        columnId: 'epc',
        columnName: 'EPC',
        columnWidth: '100px',
        isGroupEnd: true,
    }, {
        columnId: 'registrations',
        columnName: 'Reg',
        columnWidth: '100px',
    }, {
        columnId: 'clicks_to_registration',
        columnName: 'CR',
        columnWidth: '100px',
        renderRowItem: item => Number(item).toFixed(8)
    }, {
        columnId: 'epr',
        columnName: 'EPR',
        columnWidth: '100px',
        isGroupEnd: true,
    }, {
        columnId: 'deposits',
        columnName: 'DEP',
        columnWidth: '100px',
    }, {
        columnId: 'clicks_to_deposit',
        columnName: 'CR',
        columnWidth: '100px',
        renderRowItem: item => Number(item).toFixed(8)
    }, {
        columnId: 'registrations_to_deposit',
        columnName: 'CR',
        columnWidth: '100px',
    }, {
        columnId: 'sum_deposit',
        columnName: 'SUM',
        columnWidth: '100px',
        isGroupEnd: true,
    }, {
        columnId: 'profit_cpa',
        columnName: 'CPA',
        columnWidth: '100px',
    }, {
        columnId: 'profit_revshare',
        columnName: 'REVSHARE',
        columnWidth: '100px',
    }, {
        columnId: 'profit_sum',
        columnName: 'SUM',
        columnWidth: '100px',
        isGroupEnd: true,
    }, {
        columnId: 'cpa_pending',
        columnName: 'Pending',
        columnWidth: '100px',
    }, {
        columnId: 'cpa_declined',
        columnName: 'Declined',
        columnWidth: '100px',
    }, {
        columnId: 'cpa_accepted',
        columnName: 'Accepted',
        columnWidth: '100px',
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
            onClick: () => {
            }
        }
    }
};

