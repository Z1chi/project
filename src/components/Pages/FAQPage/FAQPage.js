import React from 'react';
import { useQuery, } from 'react-query';

import { getAdaptiveClassName } from '../../../helpers/mobile';

import { FAQItem } from '../../Atoms/FAQItem/FAQItem';
import { ContactUs } from '../../Organisms/ContactUs/ContactUs';
import { PageTemplate } from '../../Templates/PageTemplate/PageTemplate';

import request from '../../../api/request';
import { FAQ } from './data';

import './FAQPage.scss';

export const FAQPage = () => {

    // const faqQuery = useQuery('faq', async () => {
    //     return request('faq').then(res => res.data)
    // })

    return (
        <div className='FAQPage'>
            <PageTemplate 
                renderPage={({ width, contentData, profileQuery })=>{
                    return (
                        <div className={getAdaptiveClassName({ className: 'FAQPage__content', width, maxWidth: 900 })}>
                            <div className='FAQPage__questions'>
                                <div className='FAQPage__title'>
                                    <h2>FAQ</h2>
                                </div>

                                <div className='FAQPage__questionList'>
                                {
                                    contentData.data.faq.questions.map( (question, index) => {
                                        return (
                                            <div key={`FAQPage__questionListItem(${index})`} className='FAQPage__questionListItem'>
                                                <FAQItem {...question} />
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            <div className='FAQPage__contacts'>
                                <ContactUs contentData={contentData.data.faq} support={profileQuery.data?.support} />
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
};