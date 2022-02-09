import React, { useState } from 'react';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '../../Molecules/DatePicker/DatePicker';

import './calendar.scss';
import { calendarLocale } from './data';

export const Calendar = ({ onChange, dateSource }) => {
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    return (
        <div className='calendar'>
            <DatePicker
                value={dateSource || selectedDayRange}
                onChange={(e)=>{setSelectedDayRange(e);onChange(e)}}
                locale={calendarLocale}
            />
        </div>
    )
}