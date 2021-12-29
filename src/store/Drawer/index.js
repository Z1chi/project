import { createAtom } from '@reatom/core'

export const drawerAtom = createAtom(
    { 
        open: (value) => value, 
        close: (value) => value,
        setFieldValues: (value) => value,
        setFieldValue: (value) => value,
        clearFieldValues: (value) => value,
    },
    ({ onAction }, state = { isOpened: false, fields: [], fieldValues: {} }) => {
        onAction('open', (payload) => {
            const initialFieldValues = {};
            payload.fieldRows.flat().map( field => {
                if(field.id) initialFieldValues[field.id] = '';
            });
            return state = {
                ...state, 
                ...payload,
                isOpened: true,
                fieldValues: initialFieldValues,
            }
        })
        onAction('close', () => {
            return state = {
                isOpened: false,
                fieldValues: {},
            }
        })
        onAction('setFieldValues', (payload) => {

            return state = {
                ...state,
                fieldValues: payload
            }
        })
        onAction('setFieldValue', (payload) => {

            return state = {
                ...state,
                fieldValues: {
                    ...state.fieldValues,
                    [payload.fieldId]: payload.fieldValue,
                }
            }
        })
        onAction('clearFieldValues', () => (
            state = {
                ...state,
                fieldValues: {}
            }
        ))

        return state
    },
)