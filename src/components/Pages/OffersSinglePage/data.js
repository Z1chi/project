import React from "react";

import {Swiper, SwiperSlide} from 'swiper/react';

import {Table} from "../../Organisms/Table/Table";
import {Map} from "../../Organisms/Map/Map";
import {AItem} from "../../Atoms/AdItem/AItem";
import {OfferPaymentParam} from "../../Atoms/OfferPaymentParam/OfferPaymentParam";

import 'swiper/css';

import {images} from "./images/index";

import {offerTypeNameList} from "../OffersPage/data";

export const descriptionData = {
    benefits: ["Преимущества кратко:",
        "Кешбэк до 30% у партнеров: LevelOne, AliExpress, re:Store, Reebok, Adidas, Ostin, Pandora, Подружка, GeekBrains, Улыбка Радуги, О'КЕЙ доставка, МТС и другие.",
        "Умный кешбэк до 10% рублями в категории максимальных трат, и 1% - на все остальные покупки До 5% милями на все покупки и до 11% милями за покупки на «Газпромбанк - Travel»",
        "Один раз в месяц вы можете сменить программу лояльности и копить мили вместо кешбэка и наоборот. Накопленные баллы при этом не сгорают.",
    ],
    service: ["Обслуживание – от 0 ₽",
        "Бесплатное снятие наличных в любых банкоматах мира",
        "Моментальные переводы без комиссии в другие банки",
        "До 6% на остаток по накопительному счету",
        "Выпуск до 4 дополнительных карт бесплатно",
        "Технология PayPass, бесконтактная технология Apple Pay, Google Pay, Samsung Pay",
    ],
    superiority: [
        "2 160 платежных систем",
        "47 языков на веб-сайте",
        "12 000+ партнеров по всему миру",
        "Высокие коэффициенты",
        "Регулярные акции и бонусы",
        "1 000 000+ ставок ежедневно"
    ],

};


const adData = [
    {
        link: '/',
        backgroundImage: images.prostoImg
    },
    {
        link: '/',
        backgroundImage: images.remove
    },
    {
        link: '/',
        backgroundImage: images.prostoImg
    },
    {
        link: '/',
        backgroundImage: images.remove
    }
];


export const rowsConfig = [
    [{
        id: 'model',
        icon: images.modelIcon,
        title: 'Model',
        renderContent: ({type, cpa, revshare}) => {

            return (
                <> {(type === 0 || type === 2) && <OfferPaymentParam
                    styles={{margin: '5px 10px 5px 0'}}
                    param={[

                        <div style={{
                            padding: '5px 10px',
                            color: '#16FFAC',
                            background: 'rgba(22, 255, 172, 0.26)',
                            border: '1px solid rgba(22, 255, 172, 0.4)',
                            cursor: 'default',
                            borderRadius: "4px"
                        }}>
                            {`${offerTypeNameList[0]} $${Number(cpa).toFixed(2)}`}
                        </div>
                    ]}

                />}
                    {(type === 1 || type === 2) && <OfferPaymentParam
                        styles={{margin: '5px 0'}}
                        param={[

                            <div style={{
                                padding: '5px 10px',
                                color: '#FF16BE',
                                background: 'rgba(255, 22, 190, 0.26)',
                                border: '1px solid rgba(255, 22, 190, 0.4)',
                                cursor: 'default',
                                borderRadius: "4px"
                            }}>
                                {`${offerTypeNameList[1]} ${Number(revshare).toFixed(1)}% `}<b>FTD</b>
                            </div>
                        ]}/>}</>
            )
        }
    }, {
        id: 'conversion',
        icon: images.conversionIcon,
        title: 'Conversion',
        renderContent: ({conversion_type}) => {
            return String(conversion_type);
        }
    }],

    [{
        id: 'demoAccount',
        icon: images.demoAccountIcon,
        title: 'Demo Account',
        renderContent: ({demoAccounts}) => {
            const demoAccountTable = {
                tableConfig: [
                    {
                        columnId: 'login',
                        columnName: 'Login',
                        columnWidth: '170px',
                    },
                    {
                        columnId: 'password',
                        columnName: 'Password',
                        columnWidth: '156px',
                    },
                    {
                        columnId: 'link',
                        columnName: 'Link',
                        columnWidth: '216px',

                        renderRowItem: (item) => {
                            return (
                                <div>
                                    <a style={{color: '#219FE5'}} href={item}>{item}</a>
                                </div>
                            )
                        }
                    },
                ],
                data: demoAccounts,
                emptyTable: {
                    icon: images.emptyTableIcon,
                    text: 'Action logs will appear here once you’ll lorem ipsum dolomir loret galor. ',
                    button: {
                        text: 'Explore offers',
                        onClick: () => {
                        }
                    }
                }
            };

            return (
                <Table {...demoAccountTable} />
            )
        }
    }],

    // [{
    //     id: 'trafficSource',
    //     icon: images.trafficSourceIcon,
    //     title: 'Traffic Source',
    //     renderContent: () => {
    //         return (
    //             <Table {...demoAccountTable} />
    //         )
    //     }
    // }],

    // [{
    //     id: 'statistic',
    //     icon: images.statisticsIcon,
    //     title: 'Statistic',
    //     renderContent: () => {
    //         return (
    //             <Table {...demoAccountTable} />
    //         )
    //     }
    // }],

    [{
        id: 'geo',
        icon: images.demoAccountIcon,
        title: 'GEO',
        renderContent: ({countries}) => {
            return (
                <>
                    <div
                        style={{display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
                        <span
                            style={{
                                width: '12px',
                                height: '12px',
                                background: '#219FE6',
                                borderRadius: '2px',
                                marginRight: '5px'
                            }}/>
                        <p
                            style={{marginRight: '10px'}}>Available</p>
                        <span
                            style={{
                                width: '12px',
                                height: '12px',
                                background: '#3C3F4B',
                                borderRadius: '2px',
                                marginRight: '5px'
                            }}/>
                        <p>Unavailable</p></div>
                    <Map countryIdList={countries}/>

                    <p style={{color: '#898A98'}}>Available Country list:</p>
                    {

                    }
                </>
            )
        }
    }],

    [{
        id: 'advertismentExamples',
        isSlider: true,
        icon: images.advertismentExamplesIcon,
        title: 'Advertisment examples',
        renderContent: ({width, assets}) => {
            const isMobile = width < 510;
            if (isMobile) {

                return (

                    <Swiper
                        style={{width: '100%', height: '100%'}}
                        slidesPerView={1.3}
                        freeMode={true}
                        spaceBetween={15}
                        loop={true}>

                        {
                            assets && assets.map((adItem, key) => (
                                <SwiperSlide style={{width: "100%", height: "200px"}} key={key}>
                                    <AItem {...adItem} isMobile={isMobile}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                )

            } else {
                return (

                    assets && assets.map((adItem, key) => (
                        <div style={{width: '50%', height: 'auto'}}
                             key={key}>
                            <AItem {...adItem}/>
                        </div>
                    ))

                )

            }

        }
    }],
];


export const gridData = {
    model: '40%',
    demoAccount: {}
};


export const description = {
    icon: images.descriptionIcon,
    title: 'Description',
    renderContent: ({data}) => {
        return (

            <div>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,

                }}>
                    {data.benefits.map((item, key) => {
                        return (
                            <li key={key}>{item}</li>
                        )
                    })}
                </ul>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '15px',
                }}>
                    {data.service.map((item, key) => {
                        return (
                            <li key={key}>{item}</li>
                        )
                    })}
                </ul>
                <ul
                    style={{
                        paddingLeft: '15px',
                        listStyleImage: `url(${images.superiorityListItem})`,
                    }}>
                    {data.superiority.map((item, key) => {
                        return (
                            <li style={{marginBottom: '5px'}} key={key}>
                                {item}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
};
