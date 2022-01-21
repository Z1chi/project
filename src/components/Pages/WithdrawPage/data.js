import emptyTableIcon from './images/emptyTable.svg'

import { images } from './images';

import { dateFormator } from '../../../helpers/dateFormator';
import { withdrawStatusList, } from './constants/status';
import { dropdownTypes } from '../../../constants/dropdown';
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import { dateStringFormator } from '../../../helpers/lib';

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
    id: 'date',
    title: 'Request date',
    mobileTitle: 'Select request date',
    type: dropdownTypes.DATE,
    width: '204px',
    onSelectFormator: dateFormator,
}, {
    id: 'pay_date',
    title: 'Pay date',
    mobileTitle: 'Select pay date',
    type: dropdownTypes.DATE,
    width: '154px',
    onSelectFormator: dateFormator,
}, {
    id: 'status',
    title: 'Status',
    mobileTitle: 'Select status',
    type: dropdownTypes.SELECT,
    width: '154px',
    renderItem: ({ id, label }) => label,
    onSelectFormator: (itemArray)=>itemArray.map(item => item.id),
}, ];

export const table = {

    tableConfig: [{
        columnId: 'created_at',
        columnName: 'Request Date',
        columnWidth: '190px',

        renderRowItem: (item) => dateStringFormator(item),
    }, {
        columnId: 'paid_at',
        columnName: 'Pay Date',
        columnWidth: '159px',
    }, {
        columnId: 'amount_btc',
        columnName: 'Amount',
        columnWidth: '133px',

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

    emptyTable: {
        icon: emptyTableIcon,
        text: 'Withdraws will appear here once you’ll lorem ipsum dolomir loret galor. ',
        button: {
            text: 'Explore offers',
            onClick: ()=>{}
        }
    }
};


export const drawers = {
    withdraw: (props) => ({
        logo: images.withdrawIcon, 
        title: 'Withdraw money', 
        subtitle: 'Lorem ipsum dolomir loret alor lorem ipsum.', 
        fieldRows: [
            [{
                id: 'walletAddress',
                title: 'Bitcoin address:', 
                placeholder: props.walletAddress,
                type: dropdownTypes.INPUT,
            }],

            [{
                id: 'amount',
                title: 'Amount:',
                generateField: ({ onChange }) => {
                    return (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Input placeholder='0.000000000' onChange={onChange} />
                            <span style={{ 
                                backgroundColor: '#2D313D', color: 'rgba(255, 255, 255, 0.4)', height: '40px', minWidth: '100px',
                                display:'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', fontSize:'13px', 
                            }}>
                                Available: {props.available}
                            </span>
                        </div>
                    )    
                }
            }],

            [{
                generateField: ({ stateData }) => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                            background: '#3F3F3F',
                        }} 
                            onClick={() => props.onClick(stateData)}
                        >
                            Withdraw
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