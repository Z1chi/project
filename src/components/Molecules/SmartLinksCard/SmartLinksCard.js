import React from 'react'; 

import { SmartLinksField } from '../../Atoms/SmartLinksField/SmartLinksField';

import './smartLinksCard.scss';

const renderFormatList = {
    'CPA': () => {
        return (
            <div style={{ background: 'rgba(22, 255, 172, 0.1)', color: '#16FFAC', border: '1px solid #16FFAC' }}>
                CPA
            </div>
        )
    },
    'Revshare': () => {
        return (
            <div style={{ background: 'rgba(255, 22, 190, 0.26)', color: '#FF16BE', border: '1px solid #FF16BE' }}>
                Revshare
            </div>
        )
    },
}

export const SmartLinksCard = ({ config, data, }) => {
    const { id, created, offer, format, name, ...fields } = data;

    return (
        <div className='smartLinksCard'>
            <div className='smartLinksCard__header'>
                <div className='smartLinksCard__date'>
                    {created}
                </div>
                <div className='smartLinksCard__titleWrapper'>
                    <div className='smartLinksCard__title'>
                        <div className='smartLinksCard__titleLogo'>
                            
                        </div>
                        <div className='smartLinksCard__titleText'>
                            {offer}
                        </div>
                    </div>
                    <div className='smartLinksCard__type'>
                        {renderFormatList[format.label]}
                    </div>
                </div>
            </div>
            <div className='smartLinksCard__name'>
                <SmartLinksField item={name} configItem={{ columnName: 'Name', }} />
            </div>
            <div className='smartLinksCard__info'>
            {
                config && config.length > 0 && config.map( configItem => {
                    const item = fields[configItem.columnId];
                    return (
                        item
                        && (
                            <div className='smartLinksCard__infoItem'>
                                <SmartLinksField item={item} configItem={configItem} />
                            </div>
                        )
                    )
                })
            }
            </div>
            <div className='smartLinksCard__edit'>
                Edit
            </div>
        </div>
    )
}