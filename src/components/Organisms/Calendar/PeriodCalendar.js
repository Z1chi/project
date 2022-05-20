import React, { useEffect, useState } from 'react';
import CalendarComponent from 'react-calendar';

import { Dropdown } from '../../Molecules/Dropdown/Dropdown';

import SVG from 'react-inlinesvg';
import { images } from './images';

import './calendar.scss';
import { useAtom } from '@reatom/react';
import { languageAtom } from '../../../store/language';
import { getCalendarAside, months, weekdays } from './data';
import { dateObjFormator } from '../../../helpers/lib';

export const PeriodCalendar = ({ dateSource, isMobile, onChange=()=>{}, }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [value, setValue] = useState( null );
    const [languageData, languageActions] = useAtom(languageAtom);
    const currentYear = (new Date()).getFullYear();
    const calendarAside = getCalendarAside({changeHandler: onChange, setValue, });

    useEffect(()=>{
        if(!dateSource) {
            setSelectedOptionIndex(0)
        }
    }, [dateSource]);

    return (
        <div className={`periodCalendar${isMobile?' periodCalendar--isMobile':''}`}>
            <div className='periodCalendar__options'>
            {
                [...languageData.data.chart.options, currentYear, currentYear-1, currentYear-2].map((item, index) => {
                    return (
                        <div
                            key={`PeriodCalendar__optionsItem ${index}`}
                            className={`periodCalendar__optionsItem ${selectedOptionIndex===index?' periodCalendar__optionsItem--selected':''}`}
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
                        onChange(date);
                        setValue(e);
                        setSelectedOptionIndex(null);
                    }
                }}
                value={dateSource==null ? null : value}
                navigationLabel={({ date }) => <><span>{months[date.getMonth()]}</span><span>{date.getFullYear()}</span></>}
                prevLabel={<SVG src={images.arrowPrevIcon} /> }
                nextLabel={<SVG src={images.arrowNextIcon} /> }
                formatShortWeekday={(locale, date) => weekdays[date.getDay()]}
                selectRange={true}
            />
        </div>
    )
};