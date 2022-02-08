import React, {useState} from 'react';
import {useAtom} from "@reatom/react";

import {profileSettingsAtom} from "../../../store/ProfileSettings";
import request from "../../../api/request";

import {Input} from "../../Atoms/Input/Input";
import {EditFieldForm} from "../EditFieldForm/EditFieldForm";
import {Modal} from "../../Organisms/Modal/Modal";

import {alertAtom} from "../../../store/Alert";

import './settingsItem.scss';

export const SettingsItem = ({title, description, placeholder, isNotChangeable, type, value, onSubmitHandler,
    hasConfirmField, confirmOldValue, validator, id, formValidator, renderNewValueField, mapRequestData, apiId, isMobile}) => {

    const [alertData, alertActions] = useAtom(alertAtom);

    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);

    const [modalOpen, setModalOpen] = useState(false);
    
    return (
        <div className={`settingsItem${isMobile ? ' settingsItem--isMobile' : ''}`}>
            <h5>{title}</h5>
            <p>{description}</p>
            <div className='settingsItem__input'>
                <Input value={value} type={type} placeholder={placeholder} isNotChangeable={isNotChangeable}/>
                <span onClick={() => setModalOpen(true)}>Change</span>
                {modalOpen &&
                <Modal title={title} onClose={()=>setModalOpen(false)}>
                    <EditFieldForm
                        placeholder={placeholder}
                        type={type}
                        id={id}
                        validator={validator}
                        formValidator={formValidator}
                        onChangeFieldValue={(fieldType) => (item) => profileSettingsActions.setField({
                            fieldId: id,
                            fieldType,
                            fieldValue: item
                        })}
                        value={value}
                        hasConfirmField={hasConfirmField}
                        confirmOldValue={confirmOldValue}
                        renderNewValueField={renderNewValueField}
                        onSubmit={ () => {
                            const requestData = (mapRequestData(profileSettingsData.fields[id]));
                            return request(`/profile/${apiId}`, {method: 'patch', data: requestData}).then((res) => {
                                onSubmitHandler();
                                if(res.exception) {
                                    alertActions.open({
                                        message: 'An error occurred. Please try again later or contact support.',
                                        type: 'ALERT/ERROR',
                                    })
                                } else {
                                    setModalOpen(false)
                                    alertActions.open({
                                        message: 'Your settings are successfully updated.',
                                        type: 'ALERT/SUCCESS',
                                    });
                                }
                            })
                        }}
                    />
                </Modal>
                }
            </div>
        </div>
    )
};
