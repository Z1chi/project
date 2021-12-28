import React, { useState } from 'react';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import { Calendar as CalendarComponent } from 'react-modern-calendar-datepicker';
import DatePicker from '../../Molecules/DatePicker/DatePicker';

import './calendar.scss';
import { calendarLocale } from './data';

export const Calendar = () => {
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
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
            <DatePicker
                value={selectedDayRange}
                onChange={setSelectedDayRange}
                locale={calendarLocale}
            />
        </div>
    )
}