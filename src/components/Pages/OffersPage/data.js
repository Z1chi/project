import React from "react";

import {OfferPaymentParam} from "../../Atoms/OfferPaymentParam/OfferPaymentParam";

export const offerTypeNameList = {
    0: 'CPA:',
    1: 'Revshare:',
    2: 'CPA, Revshare:',
};

export const paymentParamsConfig = {
    payout: {
        renderValue: ({value, isMobile}) => {

            const type = value[1].type;
            const typeName = offerTypeNameList[type];
            return (
                <>
                    <OfferPaymentParam
                        isMobile={isMobile}
                        styles={{rowGap: '5px'}}
                        param={[
                            'Type:',
                            typeName?.slice(0, -1)
                        ]}
                    />
                    {(type === 0 || type === 2) &&
                    <OfferPaymentParam
                        isMobile={isMobile}
                        param=
                            {[
                                isMobile ? 'Payout' : '',
                                <span style={{
                                    padding: '5px 10px',
                                    color: '#16FFAC',
                                    background: 'rgba(22, 255, 172, 0.26)',
                                    border: '1px solid rgba(22, 255, 172, 0.4)',
                                    cursor: 'default',
                                    borderRadius: "4px"
                                }}>
                                {value[1].cpa.amount ? `${offerTypeNameList[0]} ${value[1].cpa.symbol}${Number(value[1].cpa.amount).toFixed(2)}` : ''}
                            </span>
                            ]}

                    />}
                    {(type === 1 || type === 2) &&
                    <OfferPaymentParam
                        isMobile={isMobile}
                        param=
                            {[
                                isMobile ? 'Payout' : '',
                                <span style={{
                                    padding: '5px 10px',
                                    color: '#FF16BE',
                                    background: 'rgba(255, 22, 190, 0.26)',
                                    border: '1px solid rgba(255, 22, 190, 0.4)',
                                    cursor: 'default',
                                    borderRadius: "4px"
                                }}>
                                {value[1].revshare ? `${offerTypeNameList[1]} ${Number(value[1].revshare).toFixed(1)}%` : ''}
                            </span>
                            ]}
                    />}
                </>
            )
        }
    },
    min_deposit: {
        renderValue: ({value, isMobile}) =>
            <OfferPaymentParam
                isMobile={isMobile}
                param=
                    {[
                        "Minimum Deposit: ",
                        `${value[1].symbol}${value[1].amount}`
                    ]}
            />
    }

};