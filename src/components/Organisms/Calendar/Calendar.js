import React, { useState } from 'react';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '../../Molecules/DatePicker/DatePicker';

import './calendar.scss';
import { calendarLocale, months, weekdays } from './data';

import CalendarComponent from 'react-calendar';

import SVG from 'react-inlinesvg';
import { images } from './images';
import { dateObjFormator, dateToObjFormator } from '../../../helpers/lib';


export const Calendar = ({ onChange, dateSource }) => {
    // const [selectedDayRange, setSelectedDayRange] = useState({
    //     from: null,
    //     to: null
    // });
    const [value, setValue] = useState( new Date() );
    
    return (
        <div className='calendar'>
            {/* <div className='calendar__aside'>

            </div>
            <div className='calendar__main'>
                <div className='calendar__header'>
                    <div className='calendar__arrow--prev'>

                    </div>
                    <div className='calendar__month'>

                    </div>
                    <div className='calendar__year'>

                    </div>
                    <div className='calendar__arrow--next'>

                    </div>
                </div>
                <div className='calendar__dayOfWeekList'></div>
                <div className='calendar__dateList'></div>
            </div> */}
            {/* <DatePicker
                value={dateSource || selectedDayRange}
                onChange={(e)=>{setSelectedDayRange(e);onChange(e)}}
                locale={calendarLocale}
            /> */}


            <CalendarComponent
                locale='en-EN'
                onChange={e=>{ 
                    const [from, to] = e;
                    if(from && to) {
                        const date = dateToObjFormator({ from, to });
                        onChange(date);
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
}