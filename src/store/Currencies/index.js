import { createAtom } from '@reatom/core'

export const currenciesAtom = createAtom(
    {
        setCurrencyList: (value) => value,
        setCurrencySelected: (value) => value,
    },
    ({ onAction }, state = { currencies: [], currencySelected: {} }) => {
        onAction('setCurrencyList', (payload) => { 
            return state = {
                ...state,
                currencies: payload,
            }
        })
        onAction('setCurrencySelected', (payload) => { 
            return state = {
                ...state,
                currencySelected: payload,
            }
        })

        return state
    },
)