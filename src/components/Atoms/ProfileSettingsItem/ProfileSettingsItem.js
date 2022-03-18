import React from 'react';
import {useAtom} from "@reatom/react";
import {useHistory} from "react-router-dom";

import {LanguageChanger} from "../../Molecules/LanguageChanger/LanguageChanger";

import {modalAtom} from "../../../store/Modal";

import './profileSettingsItem.scss'


export const ProfileSettingsItem = ({info: {title, description, onClick, renderContent},contentData}) => {
    const [, modalActions] = useAtom(modalAtom);

    const history = useHistory();
    return (
        <div className='profileSettingsItem' onClick={() => onClick({
            history, handler: () =>
                modalActions.open({children: <LanguageChanger/>, title: contentData.common.profileMenu.language.title})
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