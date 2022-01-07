import { images } from './images';
import { dropdownTypes } from '../../../constants/dropdown';

export const actionLogsStatisticsConfig = [
    {
        id: 'totalClicks',
        icon: images.clicksIcon,
    },
    {
        id: 'totalRegistrations',
        icon: images.registrationsIcon,
    },
    {
        id: 'totalDeposits',
        icon: images.depositIcon,
    }
];

export const filters = [{
    id: 'date',
    title: 'Date',
    type: dropdownTypes.DATE,
    mobileTitle: 'Select date',
    items: {
        options: [],
        selectedIndex: 0,
    },
    width: '169px',
}, {
    id: 'offer',
    title: 'Offers',
    mobileTitle: 'Select offers',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'title',
    width: '169px',
    renderItem: (item) => (
        <div style={{display: 'flex', alignItems: 'center', }}>
            <img src={item.image}  alt=''/>
            <span style={{marginLeft: '10px'}}>{item.title}</span>
        </div>
    ),
    onSelectFormatter: (itemArray)=>itemArray.map(item => item.id),
}, {
    id: 'smartlink',
    title: 'Smartlink',
    mobileTitle: 'Select smartlink',
    type: dropdownTypes.SELECT,
    matchPropName: 'title',
    width: '169px',
    renderItem: (item) => item.title,
    onSelectFormatter: (item) => item.id,
}, {
    id: 'action',
    title: 'Action',
    mobileTitle: 'Select actions',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'label',
    width: '169px',
    renderItem: (item) => item.label,
    onSelectFormatter: (item) => item.id,
}, ];

export const table = {

    tableConfig: [{
        columnId: 'date',
        columnName: 'Date',
        columnWidth: '170px',
    }, {
        columnId: 'userId',
        columnName: 'User id',
        columnWidth: '130px',
    }, {
        columnId: 'action',
        columnName: 'Action',
        columnWidth: '90px',
    }, {
        columnId: 'deposit',
        columnName: 'Deposit',
        columnWidth: '130px',
    }, {
        columnId: 'geo',
        columnName: 'GEO',
        columnWidth: '116px',
    }, {
        columnId: 'smartLink',
        columnName: 'Smart Link',
        columnWidth: '116px',
    }, {
        columnId: 'payout',
        columnName: 'Payout',
        columnWidth: '116px',

        renderRowItem: (item) => {
            return item ? (
                <div
                    style={{
                        padding: '5px 10px',
                        backgroundColor: 'rgba(22, 255, 172, 0.26)',
                        color: '#16FFAC',
                        borderRadius: '4px',
                    }}
                >
                    {item.currency} {item.value}
                </div>
            ) : null
        }
    }, ],

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
    }, ],

    emptyTable: {
        icon: images.emptyTableIcon,
        text: 'Action logs will appear here once you’ll lorem ipsum dolomir loret galor. ',
        button: {
            text: 'Explore offers',
            onClick: ()=>{}
        }
    }
};