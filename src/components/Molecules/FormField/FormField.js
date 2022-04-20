import React, { useEffect }  from 'react';

import { fieldComponentsList } from '../../../constants/field';

import './formField.scss';

const renderField = ({type, generateField}) => (props) => {
    const Component = fieldComponentsList[type];
    return Component ? <Component {...props} /> : generateField(props);
};

export const FormField = ({ mobileTitle, isRequired, type, generateField, ...props }) => {
    useEffect(()=>{
        
    },[props.value, props.inputValue])
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
            <div className={`formField__input ${(isRequired&&!props.stateData[props.id])?' formField__input--required':''}`}>
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
};