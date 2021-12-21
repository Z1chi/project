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


export const SettingsItem = ({title, description, placeholder, isNotChangeable, type, value, hasConfirmField, confirmOldValue, validator, id, formValidator, mapRequestData, apiId, isMobile}) => {

    const [modalData, modalActions] = useAtom(modalAtom);

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
                <Modal
                    title={title}
                    content={{value, hasConfirmField, confirmOldValue, validator, id, placeholder, type}}
                    renderContent={({content}) => (<EditFieldForm
                            placeholder={content.placeholder}
                            type={content.type}
                            id={content.id}
                            // validator={content.validator}
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
                    renderSubmitSection={({onClose}) => (<Button
                        onClick={() => {
                            const validFields =
                                // formValidator ? formValidator(profileSettingsData.fields[id]) :
                                profileSettingsData.fields[id];
                            const data = (mapRequestData(validFields));

                            return request(`/profile/update-${apiId}`, {method: 'patch', data}).then((res) => onClose())
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
