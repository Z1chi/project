import React from "react";

import { dropdownTypes } from '../../../constants/dropdown';
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import { dateStringFormator, idArrayFormator, dateFormator } from '../../../helpers/lib';

import { images } from './images';
import emptyTableIcon from './images/emptyTable.svg'


export const statistics = [{
    icon: images.balanceIcon,
    backgroundColor: '#000',
}];

export const filters = [{
    id: 'date',
    title: 'Request date',
    mobileTitle: 'Select request date',
    type: dropdownTypes.DATE,
    width: '204px',
}, {
    id: 'pay_date',
    title: 'Pay date',
    mobileTitle: 'Select pay date',
    type: dropdownTypes.DATE,
    width: '154px',
}, {
    id: 'status',
    title: 'Status',
    mobileTitle: 'Select status',
    type: dropdownTypes.SELECT,
    width: '154px',
    matchPropName: 'label',
    renderItem: ({ label }) => label,
}, ];

export const filterFormators = {
    date: date => dateFormator(date),
    pay_date: date => dateFormator(date),
    status: itemArray => idArrayFormator(itemArray),
};

export const table = {

    tableConfig: [{
        columnId: 'created_at',
        columnName: 'Request Date',
        columnWidth: '210px',

        renderRowItem: (item) => dateStringFormator(item),
    }, {
        columnId: 'paid_at',
        columnName: 'Pay Date',
        columnWidth: '210px',
    }, {
        columnId: 'amount_btc',
        columnName: 'Amount',
        columnWidth: '163px',

        renderHeadItem: ({ rowItem, columnName }) => {
            return `${columnName} (${rowItem ? rowItem.currency.symbol : ''})`
        },

        renderRowItem: (item) => {
            return item ? (
                <div>
                    {item.symbol} {item.amount}
                </div>
            ) : null
        }
    }, {
        columnId: 'amount',
        columnName: 'Amount',
        columnWidth: '164px',

        renderHeadItem: ({ rowItem, columnName }) => {
            return `${columnName} (${rowItem.value.currencyToConvert.symbol})`
        }, 

        renderRowItem: (item) => {
            return item ? (
                <div>
                    {item.symbol} {item.amount}
                </div>
            ) : null
        }
    }, {
        columnId: 'status',
        columnName: 'Status',
        columnWidth: '150px',

        renderRowItem: (item) => {
            return (
                <div>
                    {item.value}
                </div>
            )
        }
    }, ],

    info: {
        amountConverted: {
            notification: true,
        },
    },


};


export const drawers = {
    withdraw: (props) => ({
        logo: images.withdrawIcon, 
        title: props.title,
        subtitle: props.subtitle,
        fieldRows: [
            [{
                id: 'walletAddress',
                title: 'Bitcoin address:', 
                placeholder: props.walletAddress,
                type: dropdownTypes.INPUT,
                value: props.walletAddress,
            }],

            [{
                id: 'amount',
                title: 'Amount:',
                generateField: ({ onChange }) => {
                    const [availableMain, availableFractional] = props.available.toString().split('.')
                    return (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Input required={true} placeholder='0.000000000' onChange={onChange} onChangeValue={(value)=>value.replace(/[^0-9|\.]/,'')} />
                            <span style={{ 
                                backgroundColor: '#2D313D', color: 'rgba(255, 255, 255, 0.4)', height: '40px', minWidth: '100px',
                                display:'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', fontSize:'13px', 
                            }}>
                                Available: {availableMain}{availableFractional ? `.${availableFractional.slice(0,8)}` : ''}
                            </span>
                        </div>
                    )    
                }
            }],

            [{
                generateField: ({ stateData }) => {
                    const button = {};
                    if(!(stateData.walletAddress || props.walletAddress) || !stateData.amount) {
                        button.onClick = () => {}
                    } else {
                        button.onClick = () => props.onClick(stateData.walletAddress ? stateData : {...stateData, walletAddress: props.walletAddress})
                    }
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',

                        }}
                            disabled={!(stateData.walletAddress || props.walletAddress) || !stateData.amount}
                            onClick={button.onClick}
                        >
                            {props.withdrawButton}
                        </Button>
                    )
                }
            }],
        ],
    }),
};

export const modalWithdraw = ({ onClose, onSubmit, data }) => ({
    icon: images.withdrawIcon,
    title: 'Withdraw', 
    subtitle: 'You’re about to withdraw you money. Please, check the address and amount below.', 
    children: (
        <>
        <div style={{ marginTop: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '15px 10px', rowGap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '13px', marginBottom: '15px' }}>
                <span>Address:</span>
                <span>{data.walletAddress}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '13px', }}>
                <span>Amount:</span>
                <span>{data.amount}</span>
            </div>
        </div>
        <div>
            <Button onClick={() => { onSubmit(data); onClose(); }} containerStyles={{ width: '100%', marginTop: '30px' }}>
                Confirm
            </Button>
            <Button styles={{backgroundColor: '#1F2431'}} onClick={onClose} containerStyles={{ width: '100%', marginTop: '20px', marginBottom:'20px' }}>
                Cancel
            </Button>
        </div>
        </>
    )
});