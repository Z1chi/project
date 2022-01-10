import SVG from 'react-inlinesvg';
import { dropdownTypes } from '../../../constants/dropdown';
import { dateFormator } from '../../../helpers/dateFormator';
import { idArrayFormator } from '../../../helpers/idArrayFormator';
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
    id: 'offers',
    title: 'Offers',
    mobileTitle: 'Select offer',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'title',
    width: '204px',
    renderItem: (item) => (
        <div style={{display: 'flex', alignItems: 'center', }}>
            <img src={item.image} />
            <span style={{marginLeft: '10px'}}>{item.title}</span>
        </div>
    ),
    onSelectFormator: itemArray => idArrayFormator(itemArray),
}, {
    id: 'date',
    title: 'Date',
    mobileTitle: 'Select date',
    type: dropdownTypes.DATE,
    width: '154px',
    onSelectFormator: dateFormator,
}, {
    id: 'format',
    title: 'Format',
    mobileTitle: 'Select format',
    type: dropdownTypes.SELECT,
    matchPropName: 'label',
    width: '163px',
    renderItem: (item) => item.label,
    onSelectFormator: (item)=>item.id,
}, ];

export const table = {

    getTableConfig: (props) => ([{
        columnId: 'title',
        columnName: 'Name',
        columnWidth: '100px',
    }, {
        columnId: 'created_at',
        columnName: 'Created',
        columnWidth: '100px',
    }, {
        columnId: 'project',
        columnName: 'Offer',
        columnWidth: '99px',
        renderRowItem: (item) => item.title,
    }, {
        columnId: 'format',
        columnName: 'Format',
        columnWidth: '99px',
        renderRowItem: (item) => item.label,
    }, {
        columnId: 'url',
        columnName: 'URL',
        columnWidth: '120px',

        renderRowItem: (item) => {
            return renderLink(item);
        },
    }, {
        columnId: 'iframe_lead',
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
                <div onClick={() => props.onEditOpen({ itemId:id })}>
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
                <div onClick={() => props.onDeleteOpen({ itemId:id })}>
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
                id: 'project_id',
                title: 'Select Offer', 
                placeholder: 'Select Offer...',
                matchPropName: 'title',
                type: dropdownTypes.SELECT,
                renderItem: (item) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={item.image} />
                        <span style={{marginLeft: '10px'}}>{item.title}</span>
                    </div>
                ),
            }],
            
            [{
                id: 'title',
                title: 'Name', 
                placeholder: 'Type name...',
                type: dropdownTypes.INPUT,
            }],
            
            [{
                id: 'format',
                title: 'Format', 
                placeholder: 'Select format...',
                matchPropName: 'label',
                type: dropdownTypes.SELECT,
                renderItem: (item) => item.label,
            }],

            [{
                title: 'Lead IFrame', 
                placeholder: '',
                type: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                info: true,
            }],

            [{
                title: 'Conversion IFrame', 
                placeholder: '',
                type: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                info: true,
            }],

            [{
                generateField: ({ stateData }) => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                            background: '#3F3F3F',
                        }} 
                            onClick={()=>props.onCreate({
                                project_id: stateData.project_id.id,
                                title: stateData.title,
                                format: stateData.format.id
                            })}
                        >
                            Create
                        </Button>
                    )
                }
            }],

            [{
                title: 'Generated URL', 
                placeholder: '',
                type: dropdownTypes.INPUT,
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
                id: 'created_at',
                title: 'Created', 
                placeholder: 'Select date...',
                type: dropdownTypes.DATE,
            }, {
                id: 'project',
                title: 'Offer', 
                placeholder: 'Select offer...',
                matchPropName: 'title',
                type: dropdownTypes.SELECT,
                renderItem: (item) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={item.image} />
                        <span style={{marginLeft: '10px'}}>{item.title}</span>
                    </div>
                ),
            }],
            
            [{
                id: 'title',
                title: 'Name', 
                type: dropdownTypes.INPUT,
            }],

            [{
                id: 'format',
                title: 'Format',
                matchPropName: 'label',
                type: dropdownTypes.SELECT,
                renderItem: (item) => item.label
            }],

            [{
                id: 'iframe_lead',
                title: 'Lead IFrame', 
                placeholder: '',
                type: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                info: true,
            }],

            [{
                id: 'iframe_conversion',
                title: 'Conversion IFrame', 
                placeholder: '',
                type: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                info: true,
            }],

            [{
                id: 'url',
                title: 'Generated URL', 
                placeholder: '',
                type: dropdownTypes.INPUT,
                styles: {
                    color: '#219FE5',
                    textDecoration: 'underline',
                },
                canCopy: true,
                info: true,
            }],

            [{
                generateField: (data) => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                            background: '#3F3F3F',
                        }}
                            onClick={() => props.onEdit(data)}
                        >
                            Apply changes
                        </Button>
                    )
                }
            }],

            [{
                generateField: ({ itemId }) => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                            background: '#343844',
                        }} 
                            onClick={() => props.onDelete({ itemId })}
                        >
                            Delete offer
                        </Button>
                    )
                }
            }],
        ],
    }),
};

export const modalDelete = ({ onSubmit, }) => ({
    icon: images.deleteIcon,
    title: 'Delete Smartlink', 
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et', 
    renderSubmitSection: ({ onClose }) => {
        return (
            <div>
                <Button onClick={() => { onSubmit(); onClose(); }}>
                    Primary CTA
                </Button>
                <Button styles={{backgroundColor: '#1F2431'}} onClick={onClose}>
                    Secondary CTA
                </Button>
            </div>
        )
    },
})