import React, {useState} from 'react';

import SVG from 'react-inlinesvg';
import {images} from './images';

import './FAQItem.scss';

export const FAQItem = ({short_question, full_question, answer}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`FAQItem${isExpanded ? ' FAQItem--expanded' : ''}`} onClick={() => {
            isExpanded ? setIsExpanded(false) : setIsExpanded(true)
        }}>
            <div className='FAQItem__header'>
                <div className='FAQItem__question'>
                    {isExpanded ? full_question : short_question}
                </div>
                <div className='FAQItem__expander'>
                    <SVG src={isExpanded ? images.expanderMinus : images.expanderPlus}/>
                </div>
            </div>
            {
                isExpanded && (
                    <div className='FAQItem__answer'>
                        {
                            answer[0] === "<" ?    <div dangerouslySetInnerHTML={{__html: answer}} /> : answer
                        }
                    </div>
                )
            }
        </div>
    )
}