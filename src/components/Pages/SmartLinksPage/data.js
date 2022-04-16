import React from "react";

import SVG from 'react-inlinesvg';
import {dropdownTypes} from '../../../constants/dropdown';
import {dateStringFormator, idArrayFormator, dateFormator} from '../../../helpers/lib';
import {Button} from '../../Atoms/Button/Button';
import {images} from './images';

const renderLink = ({link, onCopy}) => {
    return (
        <span style={{color: '#219FE5', textDecoration: 'underline',}} onClick={()=>{navigator.clipboard.writeText(link); onCopy();}}>
            {link}
        </span>
    )
};

export const filters = [{
    id: 'offers',
    title: 'Offers',
    mobileTitle: 'Select offer',
    type: dropdownTypes.MULTISELECT,
    matchPropName: 'title',
    maxWidth: '204px',
    renderItem: (item) => (
        <div style={{display: 'flex', alignItems: 'center',}}>
            { item.image && <img src={item.image} alt=""/> }
            <span style={{marginLeft: '10px'}}>{item.title}</span>
        </div>
    ),
}, {
    id: 'date',
    title: 'Date',
    mobileTitle: 'Select date',
    type: dropdownTypes.DATE,
    maxWidth: '154px',
}, {
    id: 'format',
    title: 'Format',
    mobileTitle: 'Select format',
    type: dropdownTypes.SELECT,
    matchPropName: 'label',
    maxWidth: '163px',
    renderItem: (item) => item.label,
},];

export const filterFormators = {
    offers: itemArray => idArrayFormator(itemArray),
    date: date => dateFormator(date),
    format: itemArray => idArrayFormator(itemArray),
};

export const getTable = (tableProps) => ({

    getTableConfig: (props) => ([{
        columnId: 'title',
        columnName: 'Name',
        columnWidth: '190px',
    }, {
        columnId: 'created_at',
        columnName: 'Created',
        columnWidth: '190px',
        renderRowItem: (item) => dateStringFormator(item)
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
        columnWidth: '170px',

        renderRowItem: (link) => {
            return renderLink({ link, onCopy: tableProps.onCopy });
        },
    }, {
        columnId: 'iframe_lead',
        columnName: 'Lead iFrame',
        columnWidth: '170px',

        renderRowItem: (link) => {
            return renderLink({ link, onCopy: tableProps.onCopy });
        },
    }, {
        columnId: 'conversionIFrame',
        columnName: 'Conversion iFrame',
        columnWidth: '170px',

        renderRowItem: (link) => {
            return renderLink({ link, onCopy: tableProps.onCopy });
        },

    }, {
        columnId: 'editItem',
        columnName: '',
        columnWidth: '50px',

        renderRowItem: (_, id,) => {
            return (
                <div onClick={() => props.onEditOpen({itemId: id})} style={{cursor: 'pointer'}}>
                    <SVG src={images.editIcon}/>
                </div>
            )
        }
    }, {
        columnId: 'deleteItem',
        columnName: '',
        columnWidth: '50px',

        renderRowItem: (_, id,) => {
            return (
                <div onClick={() => props.onDeleteOpen({itemId: id})} style={{cursor: 'pointer'}}>
                    <SVG src={images.deleteIcon}/>
                </div>
            )
        }
    },]),

    // data: [{
    //     id: 0,
    //     name: 'LoremIpsum',
    //     created: 'Mar 13, 2021',
    //     offer: '1xBest',
    //     format: 'CPA',
    //     url: '....com/?aff=8wv6v9',
    //     leadIFrame: '....com/?aff=8wv6v9',
    //     conversionIFrame: '....com/?aff=8wv6v9',
    // }, {
    //     id: 1,
    //     name: 'LoremIpsum',
    //     created: 'Mar 13, 2021',
    //     offer: '1xBest',
    //     format: 'CPA',
    //     url: '....com/?aff=8wv6v9',
    //     leadIFrame: '....com/?aff=8wv6v9',
    //     conversionIFrame: '....com/?aff=8wv6v9',
    // }, {
    //     id: 2,
    //     name: 'LoremIpsum',
    //     created: 'Mar 13, 2021',
    //     offer: '1xBest',
    //     format: 'CPA',
    //     url: '....com/?aff=8wv6v9',
    //     leadIFrame: '....com/?aff=8wv6v9',
    //     conversionIFrame: '....com/?aff=8wv6v9',
    // },],

});

const isNewSmartlinkValid = ({project, title, format,}) => {
    return project && project.some(item => !!item.isSelected) && title && format && format.some(item => !!item.isSelected);
};

export const drawers = {
    create: (props) => ({
        logo: images.createLinkIcon,
        title: props.title,
        subtitle: props.subTitle,
        fieldRows: [
            [{
                id: 'project',
                title: 'Select Offer',
                placeholder: 'Select Offer...',
                matchPropName: 'title',
                type: dropdownTypes.SELECT,
                renderItem: (item) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={item.image} alt=''/>
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
                generateField: ({stateData}) => {
                    const button = {};
                    if (!isNewSmartlinkValid(stateData)) {

                        button.onClick = () => {
                        };
                    } else {

                        button.onClick = () => props.onCreate({
                            project_id: stateData.project.find(item => !!item.isSelected).id,
                            title: stateData.title,
                            format: stateData.format.find(item => !!item.isSelected).id,
                        })
                    }
                    return (
                        <Button
                            disabled={!isNewSmartlinkValid(stateData)}
                            onClick={button.onClick}
                        >
                            Create
                        </Button>
                    )
                }
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
                onCopy: props.onCopy,
                info: true,
            }],
        ],
    }),
    edit: (props) => ({
        logo: images.editLinkIconExample,
        title: props.editTitle,
        subtitle: props.editSubtitle,
        fieldRows: [
            [{
                id: 'created_at',
                title: 'Created',
                placeholder: 'Select date...',
                type: dropdownTypes.INPUT,
                isNotChangeable: true,
                formatValue: dateStringFormator,
            }, {
                id: 'project',
                title: 'Offer',
                placeholder: 'Select offer...',
                matchPropName: 'title',
                type: dropdownTypes.SELECT,
                renderItem: (item) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={item.image} alt=''/>
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
                renderItem: (item) => item.label,
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
                onCopy: props.onCopy,
                info: true,
            }],

            [{
                generateField: (data) => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',

                        }}
                                onClick={() => props.onEdit(data)}
                        >
                            Apply changes
                        </Button>
                    )
                }
            }],

            [{
                generateField: ({itemId}) => {
                    return (
                        <Button styles={{
                            padding: '10px 15px',
                            height: '42px',
                        }}
                                onClick={() => props.onDelete({itemId})}
                        >
                            Delete offer
                        </Button>
                    )
                }
            }],
        ],
    }),
};

export const modalDelete = ({onSubmit, onClose, title, subtitle, confirm, back}) => ({
    icon: images.deleteIcon,
    title: title,
    subtitle: subtitle,
    children: (
        <div>
            <Button containerStyles={{width: '100%'}} styles={{marginTop: '30px', width: '100%', height: '50px'}}
                    onClick={() => {
                        onSubmit();
                        onClose();
                    }}
            >
                {confirm}
            </Button>
            <Button styles={{marginTop: '20px', background: 'transparent', width: '100%'}}
                    containerStyles={{width: '100%'}}
                    onClick={onClose}
            >
                {back}
            </Button>
        </div>
    ),
});