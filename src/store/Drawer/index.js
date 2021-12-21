import { createAtom } from '@reatom/core'

export const drawerAtom = createAtom(
    { 
        open: (value) => value, 
        close: (value) => value,
    },
    ({ onAction }, state = { isOpened: false, fields: [] }) => {
        onAction('open', (payload) => ( 
            state = {
                ...state, 
                isOpened: true,
                ...payload
            }
        ))
        onAction('close', () => {
            return state = {
                isOpened: false,
            }
        })

        return state
    },
)