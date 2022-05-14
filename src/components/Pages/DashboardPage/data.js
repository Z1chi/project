import React from "react";

import {dateStringFormator, currencyFormator} from "../../../helpers/lib";
import {images} from "./images";

export const statistics = [{
    id: 'total_balance',
    icon: images.balanceIcon,
    title: 'Total Balance',
    renderValue: (value) => {
        return currencyFormator(value)
    },
    backgroundColor: '#FF7800',
}, {
    id: 'total_income',
    prevId: 'total_income_last_period',
    icon: images.incomeIcon,
    title: 'Income',
    renderValue: (value) => {
        return currencyFormator(value)
    },
    backgroundColor: '#16FFAC',
}, {
    id: 'total_turnover',
    prevId: 'total_turnover_last_period',
    icon: images.turnoverIcon,
    title: 'Turnover',
    renderValue: (value) => {
        return currencyFormator(value)
    },
    backgroundColor: '#0063FF',
},];

export const getGraphicsConfig = (data) => {
    return {
        dates: data && data.map(item => item.date),
        bars: [
            {
                style: {
                    stroke: '#16FFAC',
                    fill: '#16FFAC',
                },
                data: data && data.map(item => item.income),
            }, {
                style: {
                    stroke: '#0063FF',
                    fill: '#0063FF',
                },
                data: data && data.map(item => item.turnover),
            }
        ]
    }
};

export const table = {

    tableConfig: [{
        columnId: 'created_at',
        columnName: 'Date',
        columnWidth: '170px',

        renderRowItem: (item) => dateStringFormator(item),
    }, {
        columnId: 'user_id',
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

        renderRowItem: (item) => currencyFormator(item),
    }, {
        columnId: 'geo',
        columnName: 'GEO',
        columnWidth: '116px',
    }, {
        columnId: 'smartlink',
        columnName: 'Smart Link',
        columnWidth: '116px',
    }, {
        columnId: 'payout',
        columnName: 'Payout',
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
                    {item.amount} {item.symbol}
                </div>
            )
        }
    },],

    emptyTable: {
        icon: images.emptyTableIcon,
        button: {
            text: 'Explore offers',
            onClick: () => {
            }
        }
    }
};