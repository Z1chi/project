import React from 'react';
import {useAtom} from "@reatom/react";
import {CircleFlag} from 'react-circle-flags'

import request from "../../../api/request";

import {alertAtom} from "../../../store/Alert";
import {modalAtom} from "../../../store/Modal";
import {languageAtom} from "../../../store/language";

import {languageConfig} from "../../../localization";

import './languageChanger.scss'

const changeLanguage = ({language, handler}) => {
    return request(`/localization/change/${language}`).then((res) => {
        return handler({success: res?.success, language})
    })
};

export const LanguageChanger = () => {
    const [, alertActions] = useAtom(alertAtom);
    const [, modalActions] = useAtom(modalAtom);
    const [, languageActions] = useAtom(languageAtom);

    const alertHandler = ({success, language}) => {

        if (success) {
            modalActions.close();
            alertActions.open({
                message: 'Язык изменен',
                type: 'ALERT/SUCCESS',
            });
            languageActions.setLanguage({
                language: language,
                data: languageConfig[language]
            })
        } else {
            alertActions.open({
                message: 'Язык не изменен.',
                type: 'ALERT/ERROR',
            });
        }
    };

    return (
        <div className='languageChanger'>
            <CircleFlag onClick={() => changeLanguage({language: 'ru', handler: alertHandler})}
                        countryCode="ru" height="35"/>
            <CircleFlag onClick={() => changeLanguage({language: 'en', handler: alertHandler})}
                        countryCode="gb" height="35"/>
        </div>
    )
};