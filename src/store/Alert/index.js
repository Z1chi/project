import { createAtom } from '@reatom/core'

export const alertAtom = createAtom(
    { 
        open: (value) => value, 
        close: (value) => value,
    },
    ({ onAction }, state = { isOpened: false, }) => {
        onAction('open', (payload) => { 
            state = {
                ...state, 
                isOpened: true,
                ...payload
            }
        });
        onAction('close', () => {
            return state = {
                isOpened: false,
            }
        });

        return state
    },
);