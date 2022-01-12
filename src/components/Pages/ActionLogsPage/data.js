import { images } from './images';
import { dropdownTypes } from '../../../constants/dropdown';
import { idArrayFormator } from '../../../helpers/idArrayFormator';
import { dateFormator } from '../../../helpers/lib';

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
    width: '169px',
    onSelectFormator: date => dateFormator(date),
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
    onSelectFormator: itemArray => idArrayFormator(itemArray),
}, {
    id: 'smartlink',
    title: 'Smartlink',
    mobileTitle: 'Select smartlink',
    type: dropdownTypes.SELECT,
    matchPropName: 'title',
    width: '169px',
    renderItem: (item) => item.title,
    onSelectFormator: (item) => item.id,
}, {
    id: 'action',
    title: 'Action',
    mobileTitle: 'Select actions',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'label',
    width: '169px',
    renderItem: (item) => item.label,
    onSelectFormator: (item) => item.id,
}, ];

export const table = {

    tableConfig: [{
        columnId: 'created_at',
        columnName: 'Date',
        columnWidth: '190px',

        renderRowItem: (item) => dateFormator(item),
    }, {
        columnId: 'user_id',
        columnName: 'User id',
        columnWidth: '110px',
    }, {
        columnId: 'action',
        columnName: 'Action',
        columnWidth: '90px',
    }, {
        columnId: 'deposit',
        columnName: 'Deposit',
        columnWidth: '110px',
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
            return (
                 <div
                    style={{
                        padding: '5px 10px',
                        backgroundColor: 'rgba(22, 255, 172, 0.26)',
                        color: '#16FFAC',
                        borderRadius: '4px',
                    }}
                >
                    {item} $
                </div>
            )
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