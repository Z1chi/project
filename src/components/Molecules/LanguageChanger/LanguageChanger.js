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

const changeMessage = {
    ru: {
        "success": "Язык изменен",
        "error": "Язык не изменен",
    },
    en: {
        "success": "Language changed",
        "error": "Language not changed",
    }
};

export const LanguageChanger = () => {

    const [, alertActions] = useAtom(alertAtom);
    const [, modalActions] = useAtom(modalAtom);
    const [languageData, languageActions] = useAtom(languageAtom);

    const alertHandler = ({success, language}) => {

        if (success) {
            modalActions.close();
            languageActions.setLanguage({
                language: language,
                data: languageConfig[language]
            });
            alertActions.open({
                message: changeMessage[language].success,
                type: 'ALERT/SUCCESS',
            })

        } else {
            alertActions.open({
                message: changeMessage[language].error,
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