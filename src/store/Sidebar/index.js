import { createAtom } from '@reatom/core'

export const sidebarAtom = createAtom(
    { 
        open: (value) => value, 
        close: (value) => value,
    },
    ({ onAction }, state = { isOpened: true }) => {
        onAction('open', () => ( 
            state = {
                ...state, 
                isOpened: true,
            }
        ))
        onAction('close', () => {
            return state = {
                ...state, 
                isOpened: false,
            }
        })

        return state
    },
)