import { images } from "./images"

export const statistics = [{
    id: 'total_balance',
    icon: images.balanceIcon, 
    title: 'Total Balance',
    renderSubtitle: (value) => {
        return `₿ ${value.toFixed(8)}`
    },
    backgroundColor: '#FF7800',
}, {
    id: 'total_income',
    icon: images.incomeIcon, 
    title: 'Income', 
    renderSubtitle: (value) => {
        return `₿ ${value.toFixed(8)}`
    },
    backgroundColor: '#16FFAC',
}, {
    id: 'total_turnover',
    icon: images.turnoverIcon, 
    title: 'Total Turnover',
    renderSubtitle: (value) => {
        return `₿ ${value.toFixed(8)}`
    },
    backgroundColor: '#0063FF',
}, ];

export const getGraphicsConfig = (data) => {
    return {
        dates: data.map( item => item.date ),
        bars: [
            {
                style: {
                    stroke: '#16FFAC', 
                    fill: '#16FFAC',
                },
                data: data.map( item => item.income),
            }, {
                style: {
                    stroke: '#0063FF', 
                    fill: '#0063FF',
                },
                data: data.map( item => item.turnover),
            }
        ]
    }
}

export const table = {

    tableConfig: [{
        columnId: 'date',
        columnName: 'Date',
        columnWidth: '170px',
    }, {
        columnId: 'source',
        columnName: 'Source',
        columnWidth: '130px',
    }, {
        columnId: 'deposit',
        columnName: 'Deposit',
        columnWidth: '127px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.amount}{item.currency.symbol}
                </div>
            )
        }
    }, {
        columnId: 'project',
        columnName: 'Project',
        columnWidth: '130px',
    }, {
        columnId: 'model',
        columnName: 'Model',
        columnWidth: '170px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.currency?item.currency.symbol:''}{item.value}{item.isPercent?'%':''}
                </div>
            )
        }
    }, {
        columnId: 'income',
        columnName: 'Income',
        columnWidth: '116px',

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
                    {item.currency.symbol} {item.value}
                </div>
            )
        }
    }, ],

    data: [{
        date: 'Mar 13, 2021 08:05 AM',
        source: 'Cryptonews',
        deposit: {
            amount: 4500,
            currency: {
                id: 0,
                symbol: '$',
            },
        },
        project: 'Shamining',
        model: {
            type: 'Revshare',
            value: 40,
            isPercent: true,
        },
        income: {
            amount: 1800,
            currency: {
                id: 0,
                symbol: '$',
            },
            precision: 0,
        }
    }, {
        date: 'Mar 13, 2021 08:05 AM',
        source: 'Cryptonews',
        deposit: {
            amount: 4500,
            currency: {
                id: 0,
                symbol: '$',
            },
        },
        project: 'Shamining',
        model: {
            type: 'Revshare',
            value: 40,
            isPercent: true,
        },
        income: {
            amount: 1800,
            currency: {
                id: 0,
                symbol: '$',
            },
            precision: 0,
        }
    }, {
        date: 'Mar 13, 2021 08:05 AM',
        source: 'Cryptonews',
        deposit: {
            amount: 4500,
            currency: {
                id: 0,
                symbol: '$',
            },
        },
        project: 'Shamining',
        model: {
            type: 'Revshare',
            value: 40,
            isPercent: true,
        },
        income: {
            amount: 1800,
            currency: {
                id: 0,
                symbol: '$',
            },
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
}