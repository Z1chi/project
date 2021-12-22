export const withdrawStatusList = {
    REQUESTED: 10,
    SENT: 20,
    COMPLETED: 30,
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