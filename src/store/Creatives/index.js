import { createAtom } from '@reatom/core'

export const creativesAtom = createAtom(
    {
        setFilterIds: (value) => value,
    },
    ({ onAction }, state = { filterIds: [] }) => {
        onAction('setFilterIds', (payload) => { 
            return state = {
                ...state,
                filterIds: state.filterIds.some( id => {
                    return id === payload.id
                }) ? state.filterIds.filter( id => {
                    return id !== payload.id
                }) : [ ...state.filterIds, payload.id ]
            }
        })

        return state
    },
)