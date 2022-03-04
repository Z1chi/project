import React from "react";
import {validate} from 'bitcoin-address-validation';

import {FormField} from "../../Molecules/FormField/FormField";

import {dropdownTypes} from '../../../constants/dropdown';

export const profileSettingsFieldTypeList = {
    current: "PROFILE_SETTINGS_FIELD_TYPE/current",
    new: "PROFILE_SETTINGS_FIELD_TYPE/new",
    repeatNew: "PROFILE_SETTINGS_FIELD_TYPE/repeatNew",
};

export const getProfileSettingsConfig = ({currencyList, initialCurrency, changeCurrency, contentData: {settingsPage}}) => {
    return [
        {
            id: 'name',
            apiId: 'update-name',
            title: settingsPage.fullName.title,
            type: 'text',
            description: settingsPage.fullName.description,
            value: 'Pavel Martinov',
            isNotChangeable: true,
            mapRequestData: (field) => ({
                name: field[profileSettingsFieldTypeList.new],
            }),
            formValidator: (values) => {
                const errors = {};
                if (!values[profileSettingsFieldTypeList.new]) {
                    errors[profileSettingsFieldTypeList.new] = 'Enter fullname or nickname';
                    return errors;
                }
                if (values[profileSettingsFieldTypeList.new].length < 2) {
                    errors[profileSettingsFieldTypeList.new] = 'Name must be at least 2 symbols long'
                }
                if (!values[profileSettingsFieldTypeList.new].match(new RegExp(/^[a-z0-9\s]+$/i))) {
                    errors[profileSettingsFieldTypeList.new] = 'Only letters and numbers allowed'
                }
                return errors;
            },
        },
        {
            id: 'wallet_address',
            apiId: 'update-wallet',
            title: settingsPage.walletAddress.title,
            type: 'text',
            description: settingsPage.walletAddress.description,
            value: 'BJ12039DKAMCKJA09123LASKLDS',
            isNotChangeable: true,
            mapRequestData: (field) => ({
                walletAddress: field[profileSettingsFieldTypeList.new],
            }),
            formValidator: (values) => {
                const errors = {};
                if (!values[profileSettingsFieldTypeList.new]) {
                    return;
                }
                if (!validate(values[profileSettingsFieldTypeList.new])) {
                    errors[profileSettingsFieldTypeList.new] = 'Invalid bitcoin address'
                }
                return errors;
            },
        },
        {
            id: 'password',
            apiId: 'update-password',
            title: settingsPage.password.title,
            type: 'password',
            description: settingsPage.password.description,
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
            title: settingsPage.telegram.title,
            type: 'text',
            description: settingsPage.telegram.description,
            value: '@ellay',
            isNotChangeable: true,
            mapRequestData: (field) => ({
                telegram: field[profileSettingsFieldTypeList.new],
            }),
            formValidator: () => true,
        },
        {
            id: 'email',
            apiId: 'update-email',
            title: settingsPage.email.title,
            type: 'text',
            description: settingsPage.email.description,
            value: 'martinov.uxui@gmail.com',
            isNotChangeable: true,
            mapRequestData: (field) => ({
                email: field[profileSettingsFieldTypeList.new],
            }),
            formValidator: () => true,
        },
        {
            id: 'currency_id',
            apiId: 'change-currency',
            title: settingsPage.currency.title,
            type: 'text',
            description: settingsPage.currency.description,
            isNotChangeable: true,
            renderCurrentValueFieldValue: () => {
                return initialCurrency?.name;
            },
            mapRequestData: (field) => {
                return {
                    currency_id: field ? field[profileSettingsFieldTypeList.new] : '',
                }
            },
            formValidator: () => true,
            renderNewValueField: () => {
                return currencyList ? (
                    <FormField
                        fieldValue={currencyList}
                        type={dropdownTypes.SELECT}
                        onChange={(options) => changeCurrency(options)}
                        options={currencyList}
                        renderItem={(option) => option.name}
                        matchPropName='name'
                    />
                ) : null
            }
        },
    ]
};