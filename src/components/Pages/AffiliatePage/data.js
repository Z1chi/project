import { dropdownTypes } from "../../../constants/dropdown";
import { images } from "./images";

export const statistics = [{
    icon: images.registrationsIcon,
    backgroundColor: '#00D1FF',
    title: 'Total Registrations',
    value: {
        amount: 300,
    },
}, {
    icon: images.turnoverIcon,
    backgroundColor: '#E61B4A',
    title: 'Total Affiliate Turnover',
    renderSubtitle: (value) => {
        return `${value.currency} ${value.amount.toFixed(value.precision)}`;
    },
    value: {
        amount: 3,
        precision: 8,
        currency: '₿',
        currencyToConvert: '$',
    },
}, {
    icon: images.incomeIcon,
    backgroundColor: '#16FFAC',
    title: 'Your Total Income',
    renderSubtitle: (value) => {
        return `${value.currency} ${value.amount.toFixed(value.precision)}`;
    },
    value: {
        amount: 3,
        precision: 8,
        currency: '₿',
        currencyToConvert: '$',
    },
}, ];

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
    width: '133px',
}, {
    title: 'Payout',
    mobileTitle: 'Select payout',
    type: dropdownTypes.SELECT,
    items: {
        options: [
            'All',
            'FIRST',
            'SECOND',
        ],
        selectedIndex: 0,
    },
    width: '140px',
}, {
    title: 'Affiliate',
    mobileTitle: 'Select affiliate',
    type: dropdownTypes.SELECT,
    items: {
        options: [
            'All',
            'FIRST',
            'SECOND',
        ],
        selectedIndex: 0,
    },
    width: '148px',
}, ];


export const table = {

    tableConfig: [{
        columnId: 'affiliateName',
        columnName: 'Affiliate Name',
        columnWidth: '170px',
    }, {
        columnId: 'turnover',
        columnName: 'Turnover',
        columnWidth: '113px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency} {item.amount}
                </div>
            )
        },
    }, {
        columnId: 'turnoverConverted',
        columnName: 'Turnover',
        columnWidth: '113px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency} {item.amount}
                </div>
            )
        },
    }, {
        columnId: 'profit',
        columnName: 'Your profit',
        columnWidth: '113px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency} {item.amount}
                </div>
            )
        },
    }, {
        columnId: 'profitConverted',
        columnName: 'Profit',
        columnWidth: '113px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency} {item.amount}
                </div>
            )
        },
    }, {
        columnId: 'balance',
        columnName: 'Balance',
        columnWidth: '113px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency} {item.amount}
                </div>
            )
        },
    }, {
        columnId: 'payouts',
        columnName: 'Payouts',
        columnWidth: '113px',

        renderRowItem: (item) => {
            return (
                <div
                    style={{
                        color: '#16FFAC',
                    }}
                >
                    {item.currency} {item.amount}
                </div>
            )
        }
    }, ],

    data: [{
        affiliateName: 'RandomAffiliateName',
        turnover: {
            amount: 1234567,
            currency: '₿',
        },
        turnoverConverted: {
            amount: 1234567,
            currency: '$',
        },
        profit: {
            amount: 1234567,
            currency: '₿',
        },
        profitConverted: {
            amount: 1234567,
            currency: '$',
        },
        balance: {
            amount: 1234567,
            currency: '₿',
        },
        payouts: {
            amount: 1234567,
            currency: '₿',
        }
    }, {
        affiliateName: 'RandomAffiliateName',
        turnover: {
            amount: 1234567,
            currency: '₿',
        },
        turnoverConverted: {
            amount: 1234567,
            currency: '$',
        },
        profit: {
            amount: 1234567,
            currency: '₿',
        },
        profitConverted: {
            amount: 1234567,
            currency: '$',
        },
        balance: {
            amount: 1234567,
            currency: '₿',
        },
        payouts: {
            amount: 1234567,
            currency: '₿',
        }
    }, {
        affiliateName: 'RandomAffiliateName',
        turnover: {
            amount: 1234567,
            currency: '₿',
        },
        turnoverConverted: {
            amount: 1234567,
            currency: '$',
        },
        profit: {
            amount: 1234567,
            currency: '₿',
        },
        profitConverted: {
            amount: 1234567,
            currency: '$',
        },
        balance: {
            amount: 1234567,
            currency: '₿',
        },
        payouts: {
            amount: 1234567,
            currency: '₿',
        }
    }, ],
}