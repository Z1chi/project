import {createAtom} from '@reatom/core'
import {profileSettingsFieldTypeList} from "../../components/Pages/SettingsPage/data";



export const profileSettingsAtom = createAtom(
    {

        setField: (value) => value,
        setInitialFields: (value) => value,

    },
    ({onAction}, state = {fields: {}}) => {
        onAction('setField', (payload) => (
            state = {
                ...state,
                fields: {
                    ...state.fields,
                    [payload.fieldId]: {
                        ...state.fields[payload.fieldId],
                        [payload.fieldType]: payload.fieldValue
                    }
                }
            }
        ));
        onAction('setInitialFields', (payload) => {
            let currentFields = {};
            for(let prop in payload) {
                currentFields[prop] = {
                    [profileSettingsFieldTypeList.current]: payload[prop]
                }
            }
            return state = {
                fields: currentFields,
            }
        });

        return state
    },
);