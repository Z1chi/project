export const withdrawStatusList = {
    REQUESTED: 'WITHDRAWS/STATUS/REQUESTED',
    SENT: 'WITHDRAWS/STATUS/SENT',
    COMPLETED: 'WITHDRAWS/STATUS/COMPLETED',
};

export const withdrawStatusData = {
    [withdrawStatusList.REQUESTED]: {
        styles: {
            color: '#219FE5',
        },
        text: 'Requested',
    },
    [withdrawStatusList.SENT]: {
        styles: {
            color: '#FFA800',
        },
        text: 'Sent',
    },
    [withdrawStatusList.COMPLETED]: {
        styles: {
            color: '#61FF00',
        },
        text: 'Completed',
    },
}