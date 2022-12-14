import { images } from './images';
import { dropdownTypes } from '../../../constants/dropdown';

import { dateStringFormator, idArrayFormator, dateFormator, currencyFormator} from '../../../helpers/lib';

export const actionLogsStatisticsConfig = [
    {
        id: 'totalClicks',
        title: 'Total clicks',
        icon: images.clicksIcon,
    },
    {
        id: 'totalRegistrations',
        title: 'Total Registrations',
        icon: images.registrationsIcon,
    },
    {
        id: 'totalDeposits',
        title: 'Total Deposits',
        icon: images.depositIcon,
    }
];

export const filters = [{
    id: 'date',
    title: 'Date',
    type: dropdownTypes.DATE,
    mobileTitle: 'Select date',
    maxWidth: '169px',
}, {
    id: 'offer',
    title: 'Offers',
    mobileTitle: 'Select offers',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'title',
    maxWidth: '169px',
    renderItem: (item) => (
        <div style={{display: 'flex', alignItems: 'center', }}>
            <img src={item.image}  alt=''/>
            <span style={{marginLeft: '10px'}}>{item.title}</span>
        </div>
    ),
}, {
    id: 'smartlink',
    title: 'Smartlink',
    mobileTitle: 'Select smartlink',
    type: dropdownTypes.SELECT,
    matchPropName: 'title',
    maxWidth: '169px',
    renderItem: (item) => item.title,
}, {
    id: 'action',
    title: 'Action',
    mobileTitle: 'Select actions',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'label',
    maxWidth: '169px',
    renderItem: (item) => item.label,
}, ];

export const filterFormators = {
    date: date => dateFormator(date),
    offer: itemArray => idArrayFormator(itemArray),
    smartlink: itemArray => idArrayFormator(itemArray),
    action: itemArray => idArrayFormator(itemArray),
};

export const table = {

    tableConfig: [{
        columnId: 'created_at',
        columnName: 'Date',
        columnWidth: '190px',

        renderRowItem: (item) => dateStringFormator(item),
    }, {
        columnId: 'user_id',
        columnName: 'User id',
        columnWidth: '110px',
    }, {
        columnId: 'action',
        columnName: 'Action',
        columnWidth: '90px',

        

        renderRowItem: (item) => {
            const isNotClick = item==='Registration' || item==='Deposit';
            return (
                 <div
                    style={{
                        padding: '5px 10px',
                        backgroundColor: isNotClick ? 'rgba(22, 255, 172, 0.26)' : 'initial',
                        color: isNotClick ? '#16FFAC' : '#fff',
                        borderRadius: '4px',
                    }}
                >
                    {item}
                </div>
            )
        }
    }, {
        columnId: 'deposit',
        columnName: 'Deposit',
        columnWidth: '110px',

        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'geo',
        columnName: 'GEO',
        columnWidth: '110px',
    }, {
        columnId: 'smartlink',
        columnName: 'Smart Link',
        columnWidth: '140px',
    }, {
        columnId: 'payout',
        columnName: 'Payout',
        columnWidth: '110px',

        renderRowItem: (item) => {
            const isPositiveAmount = item.amount > 0
            return (
                 <div
                    style={{
                        padding: '5px 10px',
                        backgroundColor: isPositiveAmount ? 'rgba(22, 255, 172, 0.26)' : 'initial',
                        color: isPositiveAmount ? '#16FFAC' : '#fff',
                        borderRadius: '4px',
                    }}
                >
                    {item.amount} {item.symbol}
                </div>
            )
        }
    }, ],


};