import React from "react";

import {Swiper, SwiperSlide} from 'swiper/react';

import {Table} from "../../Organisms/Table/Table";
import {Map} from "../../Organisms/Map/Map";
import {AItem} from "../../Atoms/AdItem/AItem";
import {OfferPaymentParam} from "../../Atoms/OfferPaymentParam/OfferPaymentParam";
import {SelectionItem} from "../../Atoms/SelectionItem/SelectionItem";
import {InfoCard} from "../../Molecules/InfoCard/InfoCard";
import {TrafficSourceList} from "../../Molecules/TrafficSourceList/TrafficSourceList";
import {OfferDemoAccount} from "../../Organisms/OfferDemoAccount/OfferDemoAccount";

import 'swiper/css';

import {images} from "./images/index";

import {offerTypeNameList} from "../OffersPage/data";

import {dateStringFormator, localeString} from "../../../helpers/lib";

// export const descriptionData = {
//     benefits: ["Преимущества кратко:",
//         "Кешбэк до 30% у партнеров: LevelOne, AliExpress, re:Store, Reebok, Adidas, Ostin, Pandora, Подружка, GeekBrains, Улыбка Радуги, О'КЕЙ доставка, МТС и другие.",
//         "Умный кешбэк до 10% рублями в категории максимальных трат, и 1% - на все остальные покупки До 5% милями на все покупки и до 11% милями за покупки на «Газпромбанк - Travel»",
//         "Один раз в месяц вы можете сменить программу лояльности и копить мили вместо кешбэка и наоборот. Накопленные баллы при этом не сгорают.",
//     ],
//     service: ["Обслуживание – от 0 ₽",
//         "Бесплатное снятие наличных в любых банкоматах мира",
//         "Моментальные переводы без комиссии в другие банки",
//         "До 6% на остаток по накопительному счету",
//         "Выпуск до 4 дополнительных карт бесплатно",
//         "Технология PayPass, бесконтактная технология Apple Pay, Google Pay, Samsung Pay",
//     ],
//     superiority: [
//         "2 160 платежных систем",
//         "47 языков на веб-сайте",
//         "12 000+ партнеров по всему миру",
//         "Высокие коэффициенты",
//         "Регулярные акции и бонусы",
//         "1 000 000+ ставок ежедневно"
//     ],
// };


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

                        <span style={{
                            padding: '5px 10px',
                            color: '#16FFAC',
                            background: 'rgba(22, 255, 172, 0.26)',
                            border: '1px solid rgba(22, 255, 172, 0.4)',
                            cursor: 'default',
                            borderRadius: "4px"
                        }}>
                            {`${offerTypeNameList[0]} $${Number(cpa).toFixed(2)}`}
                        </span>
                    ]}

                />}
                    {(type === 1 || type === 2) && <OfferPaymentParam
                        styles={{margin: '5px 0'}}
                        param={[

                            <span style={{
                                padding: '5px 10px',
                                color: '#FF16BE',
                                background: 'rgba(255, 22, 190, 0.26)',
                                border: '1px solid rgba(255, 22, 190, 0.4)',
                                cursor: 'default',
                                borderRadius: "4px"
                            }}>
                                {`${offerTypeNameList[1]} ${Number(revshare).toFixed(1)}% `}<b>FTD</b>
                            </span>
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
        renderContent: ({demoAccounts, width}) => {

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

                                <a style={{color: '#219FE5'}} href={item}>{item}</a>

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
                width < 511 ?
                    <OfferDemoAccount demoAccounts={demoAccounts}/> :
                    <Table {...demoAccountTable} />
            )
        }
    }],

    [{
        id: 'trafficSource',
        icon: images.trafficSourceIcon,
        title: 'Traffic Source',
        renderContent: ({sources, width}) => {
            return (
                <TrafficSourceList width={width} sources={sources}/>
            )
        }
    }],

    [{
        id: 'statistic',
        icon: images.statisticsIcon,
        title: 'Statistic',
        renderContent: ({statistic, width}) => {

            const isMobile = width < 511;
            statistics = [
                {
                    icon: images.created_at,
                    title: 'Creation date:',
                    value: dateStringFormator(statistic.created_at),
                },
                {
                    icon: images.avg_deposit,
                    title: 'Avg. deposit:',
                    value: localeString({value: statistic.avg_deposit}).slice(0, -3),
                },
                {
                    icon: images.deposits,
                    title: 'Deposit record: ',
                    value: localeString({value: statistic.deposits}).slice(0, -3),
                },
                {
                    icon: images.avg_turnover,
                    title: 'Avg. turnover (30d)',
                    value: localeString({value: statistic.avg_turnover}).slice(0, -3),
                },
                {
                    icon: images.registrations_amount,
                    title: 'Registration amount:',
                    value: statistic.registrations_amount,
                },
                {
                    icon: images.deposits_amount,
                    title: 'Deposit amount:',
                    value: statistic.deposits_amount,
                },

            ];
            return (
                <>
                    {statistic && statistics.map((card, key) => {


                            return <div
                                className={`offerStatisticCard${isMobile ? ' offerStatisticCard--isMobile' : ''}`}
                                key={`offerStatisticCard${key}`}>
                                <InfoCard {...card} iconSize='80px' backgroundColor='#2D313D'
                                          renderSubtitle={value => <p>{value}</p>}/>
                            </div>
                        }
                    )}
                </>
            )
        }
    }],

    [{
        id: 'geo',
        icon: images.geoIcon,
        title: 'GEO',
        renderContent: ({countries, width}) =>
            <>
                {width > 350 ?
                    <>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center'
                            }}>
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
                        <Map countryIdList={countries}/> </> : ''}

                <p style={{color: '#898A98', marginBottom: '20px'}}>Available Country list:</p>
                <div style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>

                    {countries && countries.map((item, key) =>

                        <SelectionItem
                            key={key}
                            isSelected={true}
                            title={item.name}
                            styles={{width: width < 511 ? '100%' : 'calc(50% - 10px)', margin: '10px 5px'}}/>
                    )}
                </div>
            </>


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


export const description = {
    icon: images.descriptionIcon,
    title: 'Description',
    renderContent: ({data}) => {
        return (              
            <div dangerouslySetInnerHTML={{__html: data}} />
        )
    }
};
