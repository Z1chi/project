import React from 'react';

import { fieldComponentsList } from '../../../constants/field';

import './formField.scss';

const renderField = ({type, generateField}) => (props) => {
    const Component = fieldComponentsList[type];
    console.log('p', props)
    return Component ? <Component {...props} /> : generateField(props);
}

export const FormField = ({ mobileTitle, type, generateField, ...props }) => {
    return (
        <div className='formField'>
            <div className='formField__header'>
                {
                    props.title && <div className='formField__title'>
                        {props.title}
                    </div>
                }
                {
                    props.info && (
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
                    { mobileConfig: { title: mobileTitle }, ...props }
                )
            }
            </div>
        </div>
    )
}