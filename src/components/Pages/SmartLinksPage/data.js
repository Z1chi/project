import SVG from 'react-inlinesvg';
import { dropdownTypes } from '../../../constants/dropdown';
import { Button } from '../../Atoms/Button/Button';
import { images } from './images';

const renderLink = (link) => {
    return (
        <div style={{ color: '#219FE5', textDecoration: 'underline', }}>
            {link}
        </div>
    )
}

export const filters = [{
    title: 'Offers',
    mobileTitle: 'Select offer',
    type: dropdownTypes.SELECT,
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
    width: '154px',
}, {
    title: 'Format',
    mobileTitle: 'Select format',
    type: dropdownTypes.SELECT,
    items: {
        options: [
            'All',
            'FIRST',
            'SECOND',
        ],
        selectedIndex: 0,
    },
    width: '163px',
}, ];

export const table = {

    getTableConfig: (props) => ([{
        columnId: 'name',
        columnName: 'Name',
        columnWidth: '100px',
    }, {
        columnId: 'created',
        columnName: 'Created',
        columnWidth: '100px',
    }, {
        columnId: 'offer',
        columnName: 'Offer',
        columnWidth: '99px',
    }, {
        columnId: 'format',
        columnName: 'Format',
        columnWidth: '99px',
    }, {
        columnId: 'url',
        columnName: 'URL',
        columnWidth: '120px',

        renderRowItem: (item) => {
            return renderLink(item);
        },
    }, {
        columnId: 'leadIFrame',
        columnName: 'Lead iFrame',
        columnWidth: '120px',

        renderRowItem: (item) => {
            return renderLink(item);
        },
    }, {
        columnId: 'conversionIFrame',
        columnName: 'Conversion iFrame',
        columnWidth: '120px',        

        renderRowItem: (item) => {
            return renderLink(item);
        },

    }, {
        columnId: 'editItem',
        columnName: '',
        columnWidth: '30px',

        renderRowItem: (_, id,) => {
            return (
                <div onClick={() => props.onEditOpen({ id })}>
                    <SVG src={images.editIcon} />
                </div>
            )
        }
    }, {
        columnId: 'deleteItem',
        columnName: '',
        columnWidth: '30px',

        renderRowItem: (_, id,) => {
            return (
                <div onClick={() => props.onDeleteOpen({ id })}>
                    <SVG src={images.deleteIcon} />
                </div>
            )
        }
    }, ]),

    data: [{
        id: 0,
        name: 'LoremIpsum',
        created: 'Mar 13, 2021',
        offer: '1xBest',
        format: 'CPA',
        url: '....com/?aff=8wv6v9',
        leadIFrame: '....com/?aff=8wv6v9',
        conversionIFrame: '....com/?aff=8wv6v9',
    }, {
        id: 1,
        name: 'LoremIpsum',
        created: 'Mar 13, 2021',
        offer: '1xBest',
        format: 'CPA',
        url: '....com/?aff=8wv6v9',
        leadIFrame: '....com/?aff=8wv6v9',
        conversionIFrame: '....com/?aff=8wv6v9',
    }, {
        id: 2,
        name: 'LoremIpsum',
        created: 'Mar 13, 2021',
        offer: '1xBest',
        format: 'CPA',
        url: '....com/?aff=8wv6v9',
        leadIFrame: '....com/?aff=8wv6v9',
        conversionIFrame: '....com/?aff=8wv6v9',
    }, ],

    emptyTable: {
        icon: images.emptyTableIcon,
        text: 'Smartlinks will appear here once you’ll lorem ipsum dolomir loret galor. ',
        button: {
            text: 'Create Smartlink',
        }
    }
}

export const drawers = {
    create: (props) => ({
        logo: images.createLinkIcon, 
        title: 'Create smartlink', 
        subtitle: 'Lorem ipsum dolomir loret alor lorem ipsum.', 
        fieldRows: [
            [{
                title: 'Select Offer', 
                placeholder: 'Select Offer...',
                fieldType: dropdownTypes.SELECT,
            }],
            
            [{
                title: 'Name', 
                placeholder: 'Type name...',
                fieldType: dropdownTypes.INPUT,
            }],
            
            [{
                title: 'Format', 
                placeholder: 'Select format...',
                fieldType: dropdownTypes.SELECT,
            }],

            [{
                title: 'Lead IFrame', 
                placeholder: '',
                fieldType: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                info: true,
            }],

            [{
                title: 'Conversion IFrame', 
                placeholder: '',
                fieldType: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                info: true,
            }],

            [{
                generateField: () => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                            background: '#3F3F3F',
                        }} 
                            onClick={props.onCreate}
                        >
                            Create
                        </Button>
                    )
                }
            }],

            [{
                title: 'Generated URL', 
                placeholder: '',
                fieldType: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                canCopy: true,
                info: true,
            }],
        ],
    }),
    edit: (props) => ({
        logo: images.editLinkIconExample, 
        title: 'Edit smartlink', 
        subtitle: 'Lorem ipsum dolomir loret alor lorem ipsum.', 
        fieldRows: [
            [{
                title: 'Created', 
                placeholder: 'Select date...',
                fieldType: dropdownTypes.SELECT,
            }, {
                title: 'Offer', 
                placeholder: 'Select offer...',
                fieldType: dropdownTypes.SELECT,
            }],
            
            
            [{
                title: 'Name', 
                fieldType: dropdownTypes.INPUT,
            }],

            [{
                title: 'Generated URL', 
                placeholder: '',
                fieldType: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                canCopy: true,
                info: true,
            }],

            [{
                generateField: () => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                            background: '#3F3F3F',
                        }}
                            onClick={props.onEdit}
                        >
                            Apply changes
                        </Button>
                    )
                }
            }],

            [{
                generateField: () => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                            background: '#343844',
                        }} 
                            onClick={props.onDelete}
                        >
                            Delete offer
                        </Button>
                    )
                }
            }],
        ],
    }),
};

export const modalDelete = ({ onSubmit, onClose }) => ({
    icon: images.deleteIcon,
    title: 'Delete Smartlink', 
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et', 
    renderSubmitSection: () => {
        return (
            <div>
                <Button>
                    Primary CTA
                </Button>
                <Button styles={{backgroundColor: '#1F2431'}}>
                    Secondary CTA
                </Button>
            </div>
        )
    },
})