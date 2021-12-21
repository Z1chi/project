import { createAtom } from '@reatom/core'

export const modalAtom = createAtom(
    { 
        setFields: (value) => value, 
        setSelectedFieldIndex: (value) => value,
        setFieldValue: (value) => value,
    },
    ({ onAction }, state = { fields: [], selectedFieldIndex: null, }) => {
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
        onAction('setFieldValue', () => {
            return state = {
                ...state,
                fields: fields.map( field => {
                    return field.id ===payload.fieldId
                        ? {
                            ...field,
                            selectedValue: payload.selectedValue
                        } : field;
                })
            }
        })

        return state
    },
)