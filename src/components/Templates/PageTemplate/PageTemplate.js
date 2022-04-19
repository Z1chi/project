import React, {useEffect} from 'react';
import {useAtom} from '@reatom/react';
import {useResizeDetector} from 'react-resize-detector';
import {useQuery} from "react-query";
import request from "../../../api/request";

import {Header} from "../../Organisms/Header/Header";
import {Sidebar} from '../../Organisms/Sidebar/Sidebar';
import {Alert} from '../../Molecules/Alert/Alert';
import {Modal} from "../../Organisms/Modal/Modal";
// import {PageNesting} from "../../Molecules/PageNesting/PageNesting";

import {sidebarAtom} from '../../../store/Sidebar';
import {modalAtom} from '../../../store/Modal';
import {alertAtom} from '../../../store/Alert';
import {profileSettingsAtom} from "../../../store/ProfileSettings";
import {languageAtom} from "../../../store/language";
import {languageConfig} from "../../../localization";

import './pageTemplate.scss'


export const PageTemplate = ({renderPage}) => {
    const {width, ref} = useResizeDetector();

    const [alertData] = useAtom(alertAtom);
    const [modalData] = useAtom(modalAtom);
    const [sidebarData, sidebarActions] = useAtom(sidebarAtom);
    const [languageData, languageActions] = useAtom(languageAtom);
    const [, profileSettingsActions] = useAtom(profileSettingsAtom);


    const profileQuery = useQuery(['profile', languageData.language], () => {
        return request('/profile/get-data').then(res => {
            if(res.exception) {
                window.location.href = `${process.env.MEDIA_URL}/mngr/`;
            }
            const data = res.data;
            const language = data.language;
            language && language !== languageData.language &&
            languageActions.setLanguage({
                language: language,
                data: languageConfig[language]
            });
            return data
        })
    });


    useEffect(() => {
        window.innerWidth < 480 ? sidebarActions.close() : ''
    }, []);

    useEffect(() => {
        profileQuery.data && profileSettingsActions.setInitialFields(profileQuery.data);
    }, [profileQuery.data]);

    useEffect(() => {
        (window.innerWidth < 710 && window.innerWidth > 479) ? sidebarActions.close() : '';
    }, [window.innerWidth]);

    return (
        <div className={`pageTemplate${sidebarData.isOpened ? ' pageTemplate--compressed' : ''}`}>
            <div className="pageTemplate__sidebar">
                <Sidebar sidebarIsOpened={sidebarData.isOpened}/>
            </div>
            <div className='pageTemplate__wrapper'>
                <div className='pageTemplate__header'>
                    <Header/>
                </div>

                <div ref={ref} className='pageTemplate__content'>
                    {renderPage({width, contentData: languageData, profileQuery})}
                </div>
            </div>

            {modalData && modalData.isOpened && <Modal {...modalData} />}
            {alertData && alertData.isOpened && <Alert {...alertData} />}
        </div>
    )
};