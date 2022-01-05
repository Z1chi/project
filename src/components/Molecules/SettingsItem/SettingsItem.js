import React, {useState} from 'react';
import {useAtom} from "@reatom/react";

import {profileSettingsAtom} from "../../../store/ProfileSettings";
import request from "../../../api/request";

import {Input} from "../../Atoms/Input/Input";
import {EditFieldForm} from "../EditFieldForm/EditFieldForm";
import {Button} from "../../Atoms/Button/Button";
import {Modal} from "../../Organisms/Modal/Modal";

import {modalAtom} from "../../../store/Modal";

import './settingsItem.scss';
import {alertAtom} from "../../../store/Alert";


export const SettingsItem = ({title, description, placeholder, isNotChangeable, type, value, hasConfirmField, confirmOldValue, validator, id, formValidator, mapRequestData, apiId, isMobile}) => {

    const [modalData, modalActions] = useAtom(modalAtom);
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
                <Modal
                    title={title}
                    content={{value, hasConfirmField, confirmOldValue, validator, formValidator, id, placeholder, type, data: profileSettingsData, onError: onFormError}}
                    renderContent={({content}) => (<EditFieldForm
                            placeholder={content.placeholder}
                            type={content.type}
                            id={content.id}
                            validator={content.validator}
                            onChangeFieldValue={(fieldType) => (item) => profileSettingsActions.setField({
                                fieldId: content.id,
                                fieldType,
                                fieldValue: item
                            })}
                            value={content.value}
                            hasConfirmField={content.hasConfirmField}
                            confirmOldValue={content.confirmOldValue}
                        />
                    )}
                    renderSubmitSection={({onClose, onError, formValidator, data}) => (<Button
                        onClick={() => {
                            const fieldsAreValid =
                                formValidator ? formValidator(data.fields[id]) : data.fields[id];
                            const requestData = fieldsAreValid ? (mapRequestData(data.fields[id])) : null;

                            // if(!requestData) {
                            //     return;
                            // }

                            return request(`/profile/update-${apiId}`, {method: 'patch', data: requestData}).then((res) => {
                                return res.exception ? onError({
                                    message: 'Error text',
                                    type: 'ALERT/ERROR',
                                }) : onClose()
                            })
                        }}

                        containerStyles={{width: "100%"}}
                        styles={{width: "100%", cursor: "pointer"}}>

                        Change

                    </Button>)}
                    onClose={() => setModalOpen(false)}/>
                }
            </div>
        </div>
    )
};
