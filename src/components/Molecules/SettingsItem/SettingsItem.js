import React, {useState} from 'react';
import {useAtom} from "@reatom/react";

import {profileSettingsAtom} from "../../../store/ProfileSettings";
import request from "../../../api/request";

import {Input} from "../../Atoms/Input/Input";
import {EditFieldForm} from "../EditFieldForm/EditFieldForm";
import {Modal} from "../../Organisms/Modal/Modal";

import {alertAtom} from "../../../store/Alert";

import './settingsItem.scss';

export const SettingsItem = ({title, description, placeholder, isNotChangeable, type, value, hasConfirmField, confirmOldValue, validator, id, formValidator, mapRequestData, apiId, isMobile}) => {

    const [alertData, alertActions] = useAtom(alertAtom);

    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);

    const [modalOpen, setModalOpen] = useState(false);

    const onFormError = (payload) => alertActions.open(payload);

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
                        onSubmit={ () => {
                            const requestData = (mapRequestData(profileSettingsData.fields[id]));
                            return request(`/profile/update-${apiId}`, {method: 'patch', data: requestData}).then((res) => {
                                return res.exception ? onFormError({
                                    message: 'Error text',
                                    type: 'ALERT/ERROR',
                                }) : ()=>setModalOpen(false)
                            })
                        }}
                    />
                </Modal>
                }
            </div>
        </div>
    )
};
