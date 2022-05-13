import React, { useState } from 'react';
import CalendarComponent from 'react-calendar';

import { Dropdown } from '../../Molecules/Dropdown/Dropdown';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './calendar.scss';
import { useAtom } from '@reatom/react';
import { languageAtom } from '../../../store/language';
import { getCalendarAside, months, weekdays } from './data';
import { dateObjFormator } from '../../../helpers/lib';

export const ChartCalendar = ({ setPeriodLabel=()=>{}, changeHandler=()=>{}, isMobile }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState( new Date() );
    const [languageData, languageActions] = useAtom(languageAtom);
    const currentYear = (new Date()).getFullYear()
    const calendarAside = getCalendarAside({changeHandler, setValue, setLabel: setPeriodLabel });
    return (
        <div className={`chartCalendar${isMobile?' chartCalendar--isMobile':''}`}>
            <Dropdown 
                renderSwitcher={()=>{
                    return (
                        <div className='chartCalendar__preview' onClick={()=>{setIsVisible(!isVisible)}}>
                            <SVG className='chartCalendar__icon' src={images.calendarIcon} />
                            <span className='chartCalendar__period'>
                                {value.toLocaleDateString
                                    ?value.toLocaleDateString()
                                    :`${value[0].toLocaleDateString()} - ${value[1].toLocaleDateString()}`
                                }
                            </span>
                        </div>
                    )
                }}
                renderContent={()=>{
                    return (
                        <div className={`chartCalendar__datePicker${isVisible?' chartCalendar__datePicker--visible':''}`}>
                            <div className='chartCalendar__options'>
                            {
                                [...languageData.data.chart.options, currentYear, currentYear-1, currentYear-2].map((item, index) => {
                                    return (
                                        <div 
                                            className={`chartCalendar__optionsItem ${selectedOptionIndex===index?' chartCalendar__optionsItem--selected':''}`}
                                            onClick={()=>{
                                                setSelectedOptionIndex(index);
                                                calendarAside[index].onClick()
                                            }}
                                        >
                                            {item}
                                        </div>
                                    )
                                })
                            }    
                            </div>
                            <CalendarComponent
                                locale='en-EN'
                                onChange={e=>{
                                    const [from, to] = e;
                                    if(from && to) {
                                        const date = dateObjFormator({ from, to });
                                        changeHandler(date);
                                        setValue(e)
                                    }
                                }}
                                value={value}
                                navigationLabel={({ date }) => <><span>{months[date.getMonth()]}</span><span>{date.getFullYear()}</span></>}
                                prevLabel={<SVG src={images.arrowPrevIcon} /> }
                                nextLabel={<SVG src={images.arrowNextIcon} /> }
                                formatShortWeekday={(locale, date) => weekdays[date.getDay()]}
                                selectRange={true}
                            />
                        </div>
                    )
                }}
            />
        </div>
    )
}