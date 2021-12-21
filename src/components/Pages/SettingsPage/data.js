import React from "react";

import {passwordFormValidator, passwordValidator} from "../../../validators/password";

export const profileSettingsFieldTypeList = {
    current: "PROFILE_SETTINGS_FIELD_TYPE/current",
    new: "PROFILE_SETTINGS_FIELD_TYPE/new",
    repeatNew: "PROFILE_SETTINGS_FIELD_TYPE/repeatNew",
};


export const profileSettingsConfig = [
    {
        id: 'name',
        apiId: 'name',
        title: 'Full name',
        type: 'text',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
        value: 'Pavel Martinov',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            name: field[profileSettingsFieldTypeList.new],

        })

    },
    {
        id: 'wallet_address',
        apiId: 'wallet',
        title: 'Wallet Address',
        type: 'text',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
        value: 'BJ12039DKAMCKJA09123LASKLDS',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            walletAddress: field[profileSettingsFieldTypeList.new],

        })
    },
    {
        id: 'password',
        apiId: 'password',
        title: 'Password',
        type: 'password',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
        value: 'Password',
        placeholder: '**********',
        isNotChangeable: true,
        hasConfirmField: true,
        confirmOldValue: true,
        validator: passwordValidator,
        formValidator: passwordFormValidator,
        mapRequestData: (field) => ({
            oldPassword: field[profileSettingsFieldTypeList.current],
            newPassword: field[profileSettingsFieldTypeList.new],

        })
    },
    {
        id: 'telegram',
        apiId: 'telegram',
        title: 'Telegram',
        type: 'text',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
        value: '@ellay',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            telegram: field[profileSettingsFieldTypeList.new],

        })
    },
    {
        id: 'email',
        apiId: 'email',
        title: 'Email',
        type: 'text',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
        value: 'martinov.uxui@gmail.com',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            email: field[profileSettingsFieldTypeList.new],

        })

    },
];