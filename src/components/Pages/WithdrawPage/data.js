import emptyTableIcon from './images/emptyTable.svg'

import { images } from './images';

import { withdrawStatusList, withdrawStatusData } from './constants/status';
import { dropdownTypes } from '../../../constants/dropdown';

export const statistics = [{
    icon: images.balanceIcon,
    backgroundColor: '#000',
    title: 'Total Balance',
    value: {
        amount: 0,
        precision: 8,
    }
}];

export const filters = [{
    title: 'Date',
    mobileTitle: 'Select date',
    type: dropdownTypes.DATE,
    items: {
        options: [
            'All',
            'FIRST',
            'SECOND',
        ],
        selectedIndex: 0,
    },
    width: '204px',
}, {
    title: 'Amount',
    mobileTitle: 'Select amount',
    type: dropdownTypes.SELECT,
    items: {
        options: [
            'All',
            'FIRST',
            'SECOND',
        ],
        selectedIndex: 0,
    },
    width: '154px',
}, {
    title: 'Status',
    mobileTitle: 'Select status',
    type: dropdownTypes.SELECT,
    items: {
        options: [
            'All',
            'FIRST',
            'SECOND',
        ],
        selectedIndex: 0,
    },
    width: '154px',
}, ];

export const table = {

    tableConfig: [{
        columnId: 'requestDate',
        columnName: 'Request Date',
        columnWidth: '170px',
    }, {
        columnId: 'payDate',
        columnName: 'Pay Date',
        columnWidth: '159px',
    }, {
        columnId: 'amount',
        columnName: 'Amount',
        columnWidth: '133px',

        renderHeadItem: ({ rowItem, columnName }) => {
            return `${columnName} (${rowItem.currency.symbol})`
        },

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency.symbol} {item.amount}
                </div>
            )
        }
    }, {
        columnId: 'amountConverted',
        columnName: 'Amount',
        columnWidth: '164px',

        renderHeadItem: ({ rowItem, columnName }) => {
            return `${columnName} (${rowItem.value.currencyToConvert.symbol})`
        }, 

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency.symbol} {item.amount}
                </div>
            )
        }
    }, {
        columnId: 'status',
        columnName: 'Status',
        columnWidth: '150px',

        renderRowItem: (item) => {
            const status = withdrawStatusData[item];
            return (
                <div 
                    style={status.styles}
                >
                    {status.text}
                </div>
            )
        }
    }, ],

    data: [{
        requestDate: 'Mar 13, 2021 08:05 AM',
        payDate: 'Mar 13, 2021 08:05 AM',
        amount: {
            amount: 1234567,
            currency: {
                id: 1,
                symbol: '₿',
            }
        },
        amountConverted: {
            amount: 1234567,
            currency: {
                id: 0,
                symbol: '$',
            }
        },
        status: withdrawStatusList.REQUESTED,
    }, {
        requestDate: 'Mar 13, 2021 08:05 AM',
        payDate: 'Mar 13, 2021 08:05 AM',
        amount: {
            amount: 1234567,
            currency: {
                id: 1,
                symbol: '₿',
            }
        },
        amountConverted: {
            amount: 1234567,
            currency: {
                id: 0,
                symbol: '$',
            }
        },
        status: withdrawStatusList.SENT,
    },{
        requestDate: 'Mar 13, 2021 08:05 AM',
        payDate: 'Mar 13, 2021 08:05 AM',
        amount: {
            amount: 1234567,
            currency: {
                id: 1,
                symbol: '₿',
            }
        },
        amountConverted: {
            amount: 1234567,
            currency: {
                id: 0,
                symbol: '$',
            }
        },
        status: withdrawStatusList.COMPLETED,
    }, ],

    info: {
        amountConverted: {
            notification: true,
        },
    },

    emptyTable: {
        icon: emptyTableIcon,
        text: 'Withdraws will appear here once you’ll lorem ipsum dolomir loret galor. ',
        button: {
            text: 'Explore offers',
            onClick: ()=>{}
        }
    }
}