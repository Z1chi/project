import { createAtom } from '@reatom/core'

export const filterAtom = createAtom(
    { 
        setFields: (value) => value, 
        setSelectedFieldIndex: (value) => value,
        setFieldValue: (value) => value,
        reset: (value) => value,
    },
    ({ onAction }, state = { fields: {}, selectedFieldIndex: null, }) => {
        onAction('setFields', (payload) => ( 
            state = {
                ...state, 
                fields: payload.fields
            }
        ))
        onAction('setSelectedFieldIndex', (payload) => ( 
            state = {
                ...state, 
                selectedFieldIndex: payload,
            }
        ))
        onAction('setFieldValue', (payload) => {
            return state = {
                ...state,
                fields: {
                    ...state.fields,
                    [payload.fieldId]: payload.fieldValue
                }
            }
        })
        onAction('reset', (payload) => {
            return state = {
                ...state,
                fields: {}
            }
        })

        return state
    },
)