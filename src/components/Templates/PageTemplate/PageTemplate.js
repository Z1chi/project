import React, {useEffect, useState} from 'react';
import {useAtom} from '@reatom/react';
import {useResizeDetector} from 'react-resize-detector';

import {Header} from "../../Organisms/Header/Header";
import {Sidebar} from '../../Organisms/Sidebar/Sidebar';
import {Alert} from '../../Molecules/Alert/Alert';
import {Modal} from "../../Organisms/Modal/Modal";
// import {PageNesting} from "../../Molecules/PageNesting/PageNesting";

import {sidebarAtom} from '../../../store/Sidebar';
import {modalAtom} from '../../../store/Modal';
import {alertAtom} from '../../../store/Alert';


import './pageTemplate.scss'


export const PageTemplate = ({renderPage}) => {
    const {width, height, ref} = useResizeDetector();

    const [alertData] = useAtom(alertAtom);
    const [modalData] = useAtom(modalAtom);
    const [sidebarData, sidebarActions] = useAtom(sidebarAtom);

    useEffect(() => {
        (window.innerWidth < 710 && window.innerWidth > 479) ? sidebarActions.close() : '';
    }, [window.innerWidth]);

    console.log('render alert', alertData)

    return (
        <div className={`pageTemplate${sidebarData.isOpened ? ' pageTemplate--compressed' : ''}`}>
            <div className="pageTemplate__sidebar">
                <Sidebar
                    sidebarIsOpened={sidebarData.isOpened}
                />
            </div>
            <div className='pageTemplate__wrapper'>
                <div className='pageTemplate__header'>
                    <Header/>
                </div>

                <div ref={ref} className='pageTemplate__content'>
                    {
                        renderPage({width})
                    }
                </div>
            </div>

            {modalData && modalData.isOpened && <Modal {...modalData} />}
            {alertData && alertData.isOpened && <Alert {...alertData} />}
        </div>
    )
};