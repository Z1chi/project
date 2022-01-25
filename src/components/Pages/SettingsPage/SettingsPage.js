import React, {useEffect, useState} from 'react';
import {useAtom} from "@reatom/react";
import SVG from 'react-inlinesvg';

import {PageTemplate} from '../../Templates/PageTemplate/PageTemplate';
import {Avatar} from "../../Atoms/Avatar/Avatar";
import {SettingsItem} from "../../Molecules/SettingsItem/SettingsItem";
import {Modal} from "../../Organisms/Modal/Modal";
import {AvatarEditor} from "../../Molecules/AvatarEditor/AvatarEditor";

import i from '../../Molecules/ManagerSidebarCard/images/i.jpeg';
import avatarUpdateIcon from './images/avatarUpdateIcon.svg'

import { getProfileSettingsConfig, profileSettingsFieldTypeList} from './data'
import { profileSettingsAtom } from "../../../store/ProfileSettings";
import { currenciesAtom } from '../../../store/Currencies';

import './settingsPage.scss';
import request from '../../../api/request';

export const SettingsPage = () => {

    const [initialCurrency, setInitialCurrency] = useState(null);
    const [profileSettingsData, profileSettingsActions] = useAtom(profileSettingsAtom);
    const [currencyData, currencyActions] = useAtom(currenciesAtom);
    const [modalAvatar, setModalAvatar] = useState(false);
    
    useEffect( ()=>{
        Object.keys(profileSettingsData.fields).length > 0 && request('/currency/get-currencies/').then(res => {
            currencyActions.setCurrencyList(res.data);
            const currencyFound = res.data.find( currency => currency.id === profileSettingsData.fields.currency_id[profileSettingsFieldTypeList.current])
            setInitialCurrency(currencyFound)
        });
    }, [profileSettingsData,])

    const profileSettingsConfig =  currencyData.currencies ? getProfileSettingsConfig({
        currencySelected: currencyData.currencySelected,
        currencyList: currencyData.currencies,
        changeCurrency: (currencyList) => {
            currencyActions.setCurrencyList(currencyList);
            profileSettingsActions.setField({
                fieldId: 'currency_id',
                fieldType: profileSettingsFieldTypeList.new,
                fieldValue: currencyList.find(item => !!item.isSelected).id,
            })
            console.log('p', profileSettingsData, currencyList)
        },
        initialCurrency,
    }) : [];

    return (
        <div className='settingsPage'>
            <PageTemplate
                renderPage={({width}) => {
                    return (
                        <div
                            className={`settingsPage__content${width < 480 ? ' settingsPage__content--isMobile' : ''}`}>
                            <h3>Personal Settings</h3>
                            <div onClick={() => setModalAvatar(true)} className='settingsPage__contentAvatar'>
                                {
                                    profileSettingsData.fields.img &&
                                    profileSettingsData.fields.img[profileSettingsFieldTypeList.current] &&
                                    <Avatar
                                        size={width > 480 ? '165px' : '175px'}
                                        imageSrc={process.env.MEDIA_URL +
                                        profileSettingsData.fields.img[profileSettingsFieldTypeList.current]}/>
                                }
                                <div className='settingsPage__contentAvatar--Icon'>
                                    <SVG src={avatarUpdateIcon}/>
                                </div>
                            </div>
                            {
                                profileSettingsConfig.map((settingsField, key) => {
                                        const inputValue = settingsField.renderCurrentValueFieldValue 
                                            ? settingsField.renderCurrentValueFieldValue()
                                            : profileSettingsData.fields[settingsField.id] &&
                                                profileSettingsData
                                                    .fields[settingsField.id][profileSettingsFieldTypeList.current];
                                        return (
                                            <div className='settingsPage__contentItem'
                                                 key={`settingsPage__contentItem${key}`}>
                                                <SettingsItem
                                                    onSubmitHandler={() => request('/profile/get-data').then( res => {
                                                        profileSettingsActions.setInitialFields(res.data)
                                                    })}
                                                    isMobile={width < 480}
                                                    {...settingsField}
                                                    value={inputValue || ""}
                                                />
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    )
                }}
            />
            {modalAvatar &&
            <Modal onClose={() => setModalAvatar(false)}>
                {
                    profileSettingsData.fields.img &&
                    <AvatarEditor onClose={setModalAvatar}/>
                }
            </Modal>}
        </div>
    )
};