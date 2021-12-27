import React from 'react';

import { fieldComponentsList } from '../../../constants/field';

import './formField.scss';

const renderField = ({type, generateField}) => (props) => {
    const Component = fieldComponentsList[type];
    return Component ? <Component {...props} /> : generateField();
}

export const FormField = ({ title, mobileTitle, info, type, placeholder, options, renderItem, canCopy, generateField, }) => {
    return (
        <div className='formField'>
            <div className='formField__header'>
                {
                    title && <div className='formField__title'>
                        {title}
                    </div>
                }
                {
                    info && (
                        <div className='formField__info'>
                            
                        </div>
                    )
                }
            </div>
            <div className='formField__input'>
            {
                renderField(
                    { type, generateField }
                )(
                    { title, info, type, placeholder, canCopy, options, renderItem, mobileConfig: { title: mobileTitle }}
                )
            }
            </div>
        </div>
    )
}