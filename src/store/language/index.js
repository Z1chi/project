import {createAtom} from '@reatom/core'
import {languageConfig} from "../../localization";

export const languageAtom = createAtom(
    {
        setLanguage: (value) => value,
    },
    ({onAction}, state = {language: 'en', data: languageConfig['en']}) => {
        onAction('setLanguage', (payload) => {
            return (
                state = {
                    ...state,
                    language: payload.language,
                    data: payload.data,
                }
            )
        });

        return state
    },
);