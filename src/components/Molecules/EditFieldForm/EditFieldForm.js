import React from 'react';
import { Form, Field } from "react-final-form";

import {Input} from "../../Atoms/Input/Input";
import {Button} from "../../Atoms/Button/Button";

import {profileSettingsFieldTypeList} from '../../Pages/SettingsPage/data'

import './editFieldForm.scss';

export const EditFieldForm = ({value, onSubmit, hasConfirmField, confirmOldValue = false, onChangeFieldValue, validator, id, placeholder, type = 'text', formValidator, renderNewValueField, }) => {

    return (
        <div className='editFieldForm'>
        <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={(values) => {
                const res = formValidator(values);
                return res;
        }}
        render={({ handleSubmit, form, submitting, pristine, values, valid }) => (
          <form onSubmit={handleSubmit}>
            <Field name={profileSettingsFieldTypeList.current}>
                {({ input, meta }) => (
                    <div className='editFieldForm__input'>
                        <label>Current</label>
                            <Input
                                type={type}
                                name={id}
                                onChange={onChangeFieldValue(profileSettingsFieldTypeList.current)}
                                placeholder={value || placeholder}
                                isNotChangeable={!confirmOldValue}
                                hasError={meta.error && meta.touched}
                                error={meta.error}
                                fieldData={input}
                            />
                        <span>{meta.error}</span>
                    </div>
                )}
            </Field>
            <Field name={profileSettingsFieldTypeList.new}>
                {({ input, meta }) => (
                    <div className='editFieldForm__input'>
                        <label>New</label>
                            {
                                renderNewValueField
                                ? renderNewValueField()
                                : <Input
                                    validator={validator}
                                    type={type}
                                    placeholder={placeholder}
                                    name={id}
                                    onChange={onChangeFieldValue(profileSettingsFieldTypeList.new)}
                                    hasError={meta.error && meta.touched}
                                    error={meta.error}
                                    fieldData={input}
                                />
                            }
                            
                    </div>
                )}
            </Field>

            {hasConfirmField &&
                <Field name={profileSettingsFieldTypeList.repeatNew}>
                    {({ input, meta }) => (
                    <div className='editFieldForm__input'>
                            <label>Repeat new </label>
                            <Input
                                validator={validator}
                                placeholder={value || placeholder}
                                type={type}
                                name={id}
                                onChange={onChangeFieldValue(profileSettingsFieldTypeList.repeatNew)}
                                hasError={meta.error && meta.touched && meta.modified}
                                error={meta.error}
                                fieldData={input}
                            />
                        </div>
                    )}
                </Field>
            }
            <div className='editFieldForm__submit'>
              <Button type="submit" disabled={submitting || !valid}                         
                containerStyles={{width: "100%"}}
                styles={{width: "100%", cursor: "pointer"}}>
                Submit
              </Button>
            </div>
          </form>
        )}
      />
    </div>
        
    )
};