import React from 'react';

import {Input} from "../../Atoms/Input/Input";

import {profileSettingsFieldTypeList} from '../../Pages/SettingsPage/data'

import './editFieldForm.scss';

export const EditFieldForm = ({value, hasConfirmField, confirmOldValue = false, onChangeFieldValue, validator, id, placeholder, type = 'text'}) => {



    return (
        <div className='editFieldForm'>

            <div className='editFieldForm__input'>
                <label>Current</label>
                <Input
                    validator={validator}
                    type={type}
                    name={id}
                    onChange={onChangeFieldValue(profileSettingsFieldTypeList.current)}
                    placeholder={value || placeholder}
                    isNotChangeable={!confirmOldValue}/>

            </div>

            <div className='editFieldForm__input'>
                <label>New</label>
                <Input
                    validator={validator}
                    type={type}
                    placeholder={placeholder}
                    name={id}
                    onChange={onChangeFieldValue(profileSettingsFieldTypeList.new)}
                />
            </div>

            {hasConfirmField &&
            <div className='editFieldForm__input'>
                <label>Repeat New</label>
                <Input
                    validator={validator}
                    placeholder={value || placeholder}
                    type={type}
                    name={id}
                    onChange={onChangeFieldValue(profileSettingsFieldTypeList.repeatNew)}
                />
            </div>}

        </div>
    )
};