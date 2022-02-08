import React from "react";
import { validate } from 'bitcoin-address-validation';

import { FormField } from "../../Molecules/FormField/FormField";

import { dropdownTypes } from '../../../constants/dropdown';

export const profileSettingsFieldTypeList = {
    current: "PROFILE_SETTINGS_FIELD_TYPE/current",
    new: "PROFILE_SETTINGS_FIELD_TYPE/new",
    repeatNew: "PROFILE_SETTINGS_FIELD_TYPE/repeatNew",
};

export const getProfileSettingsConfig = (configOptions) => [
    {
        id: 'name',
        apiId: 'update-name',
        title: 'Full name',
        type: 'text',
        description: 'Your name or nickname',
        value: 'Pavel Martinov',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            name: field[profileSettingsFieldTypeList.new],
        }),
        formValidator: (values) => {
            const errors = {};
            if(!values[profileSettingsFieldTypeList.new]) {
                return;
            }
            if(!values[profileSettingsFieldTypeList.new].match(new RegExp(/^[a-z0-9\s]+$/i))) {
                errors[profileSettingsFieldTypeList.new] = 'Only letters and numbers allowed'
            }
            return errors;
        },
    },
    {
        id: 'wallet_address',
        apiId: 'update-wallet',
        title: 'Wallet Address',
        type: 'text',
        description: 'Please enter your wallet address correctly. We cannot help if you entered the wrong wallet address.',
        value: 'BJ12039DKAMCKJA09123LASKLDS',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            walletAddress: field[profileSettingsFieldTypeList.new],
        }),
        formValidator: (values) => {
            const errors = {};
            if(!values[profileSettingsFieldTypeList.new]) {
                return;
            }
            if(!validate(values[profileSettingsFieldTypeList.new])) {
                errors[profileSettingsFieldTypeList.new] = 'Invalid bitcoin address'
            }
            return errors;
        },
    },
    {
        id: 'password',
        apiId: 'update-password',
        title: 'Password',
        type: 'password',
        description: 'Your password. Keep in mind we will never ask you for your password.',
        value: 'Password',
        placeholder: '**********',
        isNotChangeable: true,
        hasConfirmField: true,
        confirmOldValue: true,
        mapRequestData: (field) => ({
            oldPassword: field[profileSettingsFieldTypeList.current],
            newPassword: field[profileSettingsFieldTypeList.new],
        }),
        formValidator: (values) => {
            const errors = {};

                if (!values[profileSettingsFieldTypeList.new]) {
                    errors[profileSettingsFieldTypeList.new] = 'Enter new password'
                }

                if (!values[profileSettingsFieldTypeList.repeatNew]) {
                    errors[profileSettingsFieldTypeList.repeatNew] = 'Confirm new password'
                }

                if (values[profileSettingsFieldTypeList.new] !== values[profileSettingsFieldTypeList.repeatNew]) {
                    errors[profileSettingsFieldTypeList.repeatNew] = 'Passwords do not match'
                }
            return errors;
        },
    },
    {
        id: 'telegram',
        apiId: 'update-telegram',
        title: 'Telegram',
        type: 'text',
        description: 'The fastest way to reach our team whenever you have any questions. Use it to contact your personal manager.',
        value: '@ellay',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            telegram: field[profileSettingsFieldTypeList.new],
        }),
        formValidator: ()=>true,
    },
    {
        id: 'email',
        apiId: 'update-email',
        title: 'Email',
        type: 'text',
        description: 'Use it for authorization, sign-up confirmation, and receiving newsletters (including news, statistics, weekly top, etc.)',
        value: 'martinov.uxui@gmail.com',
        isNotChangeable: true,
        mapRequestData: (field) => ({
            email: field[profileSettingsFieldTypeList.new],
        }),
        formValidator: ()=>true,
    },
    {
        id: 'currency_id',
        apiId: 'change-currency',
        title: 'Currency',
        type: 'text',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
        isNotChangeable: true,
        renderCurrentValueFieldValue: () => {
            return configOptions.initialCurrency?.name;
        },
        mapRequestData: (field) => {
            return {
                currency_id: field ? field[profileSettingsFieldTypeList.new] : '',
            }
        },
        formValidator: ()=>true,
        renderNewValueField: () => {
            return configOptions.currencyList ? (
                <FormField
                    fieldValue={configOptions.currencyList}
                    type={dropdownTypes.SELECT}
                    onChange={(options) => configOptions.changeCurrency(options)}
                    options={configOptions.currencyList}
                    renderItem={(option) => option.name}
                    matchPropName='name'
                />
            ) : null
        }
    },
];