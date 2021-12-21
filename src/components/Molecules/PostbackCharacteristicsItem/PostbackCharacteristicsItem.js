import React from 'react';

import { Checkbox } from '../../Atoms/Checkbox/Checkbox';
import { Input } from '../../Atoms/Input/Input';
import { PostbackSectionTitle } from '../../Atoms/PostbackSectionTitle/PostbackSectionTitle';

import './postbackCharacteristicsItem.scss';

export const PostbackCharacteristicsItem = ({ id, isSelected, name, value, description, info,  }) => {
    return (
        <div className='postbackCharacteristicsItem'>
            <div className='postbackCharacteristicsItem__checkbox'>
                <Checkbox size='20px' isChecked={isSelected} />
            </div>
            <div className='postbackCharacteristicsItem__wrapper'>
                <div className='postbackCharacteristicsItem__name'>
                    <div className='postbackCharacteristicsItem__nameTitle'>
                        <PostbackSectionTitle text='Variable name' info='Info' />
                    </div>
                    <div className='postbackCharacteristicsItem__nameInput'>
                        <Input placeholder={name} value={name} />
                    </div>
                </div>
                <div className='postbackCharacteristicsItem__value'>
                    <div className='postbackCharacteristicsItem__valueTitle'>
                        <PostbackSectionTitle text='Variable value' info='Info' />
                    </div>
                    <div className='postbackCharacteristicsItem__valueInput'>
                        <Input placeholder={`{${name}}`} value={value} />
                    </div>
                </div>
                {
                    description && (
                        <div className='postbackCharacteristicsItem__description'>
                            <div className='postbackCharacteristicsItem__descriptionText'>
                                {description}
                            </div>
                            {
                                info && <div className='postbackCharacteristicsItem__descriptionInfo'>
                                    
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}