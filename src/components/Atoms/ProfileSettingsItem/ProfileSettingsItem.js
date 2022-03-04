import React from 'react';
import {useAtom} from "@reatom/react";
import {useHistory} from "react-router-dom";

import {modalAtom} from "../../../store/Modal";

import './profileSettingsItem.scss'
import {LanguageChanger} from "../../Molecules/LanguageChanger/LanguageChanger";


export const ProfileSettingsItem = ({info: {title, description, onClick, renderContent}}) => {
    const [modalData, modalActions] = useAtom(modalAtom);

    const history = useHistory();
    return (
        <div className='profileSettingsItem' onClick={() => onClick({
            history, handler: () =>
                modalActions.open({children: <LanguageChanger/>, title: 'Language'})
        })}>
            {
                title &&
                <div className='profileSettingsItem__title'>{title}</div>
            }
            {
                description &&
                <div className='profileSettingsItem__description'>{description}</div>
            }
            {
                renderContent &&
                <div className='profileSettingsItem__description'>{renderContent()}</div>
            }
        </div>
    )
};