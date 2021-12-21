import React from 'react';
import { WithdrawCardField } from '../../Atoms/WithdrawCardField/WithdrawCardField';

import './withdrawCard.scss';

export const WithdrawCard = ({ fields, config }) => {
    return (
        <div className='withdrawCard'>
        {
            config.map( configItem => {
                return (
                    <div className='withdrawCard__field'>
                        <WithdrawCardField field={fields[configItem.columnId]} configItem={configItem} />
                    </div>
                )
            })
        }
        </div>
    )
}