import { createAtom } from '@reatom/core'

export const currenciesAtom = createAtom(
    {
        setCurrencyList: (value) => value,
        setCurrencySelected: (value) => value,
    },
    ({ onAction }, state = { currencies: [] }) => {
        onAction('setCurrencyList', (payload) => { 
            return state = {
                ...state,
                currencies: payload,
            }
        })

        return state
    },
)