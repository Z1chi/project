import { dateObjFormator } from "../../../helpers/lib";

const getDaysDiff = ({ from, to }) => {
  const diffTime = Math.abs(to - from);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
}

export const getCustomPeriodLabel = ({ from, to }) => {
  const dateLength = getDaysDiff({from, to});
  if(dateLength < 31) {
    const labelCount = dateLength > 1 ? 'days' : 'day';
    return (`last ${dateLength} ${labelCount}`);
  } else if(dateLength < 365) {
    const labelCount = Math.round(dateLength/30) > 1 ? 'months' : 'month';
    return (`last ${Math.round(dateLength/30)} ${labelCount}`);
  } else {
    const labelCount = Math.round(dateLength/365) > 1 ? 'years' : 'year';
    return (`last ${Math.round(dateLength/365)} ${labelCount}`);
  }
}

const getToday = () => new Date();

const getDateByDiff = (diff) => {
  return new Date(new Date().getTime() - (diff-1) * 24*60*60*1000);
} 

const getYearByDiff = (diff) =>{
  return new Date().getFullYear() - diff;
}

const getFirstDayOfYear = (year) => {
  return new Date(year, 0, 1);
}

const getLastDayOfYear = (year) => {
  return new Date(year, 11, 31);
}

export const getCalendarAside = ({ changeHandler, setValue, setLabel=()=>{}, }) => {
  const today = getToday();
  const onChange = ({from, to})=>{
    changeHandler(dateObjFormator({from, to}));
    setValue([from, to]);
  }
  return (
    [
      {
          onClick: () => {
            setValue(null);
            changeHandler(null);
            setLabel(null);
          },
      },
      {
          onClick: () => { 
            const todayMidnight = getToday()
            todayMidnight.setHours(0,0,0,0);
            onChange({ from: todayMidnight, to: today });
            setLabel('today');
          },
      }, {
          onClick: () => {
            onChange({ from: getDateByDiff(7), to: today });
            setLabel('last week');
          },
      }, {
          onClick: () => {
            onChange({ from: getDateByDiff(30), to: today });
            setLabel('last month');
          },
      }, {
          onClick: () => {
            onChange({ from: getDateByDiff(90), to: today });
            setLabel('last 3 months');
          },
      }, {
          onClick: () => {
            const year = getYearByDiff(0);
            onChange({ from: getFirstDayOfYear(year), to: getLastDayOfYear(year) });
            setLabel(`year ${year}`);
          },
      }, {
          onClick: () => {
            const year = getYearByDiff(1);
            onChange({ from: getFirstDayOfYear(year), to: getLastDayOfYear(year) });
            setLabel(`year ${year}`);
          },
      }, {
          onClick: () => {
            const year = getYearByDiff(2);
            onChange({ from: getFirstDayOfYear(year), to: getLastDayOfYear(year) });
            setLabel(`year ${year}`);
          },
      }, 
  ]);
}

export const weekdays = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


export const calendarLocale = {
    // months list by order
    months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ],
  
    // week days by order
    weekDays: [
      {
        name: 'Monday',
        short: 'Mo',
      },
      {
        name: 'Tuesday',
        short: 'Tu',
      },
      {
        name: 'Wednesday',
        short: 'We',
      },
      {
        name: 'Thursday',
        short: 'Th',
      },
      {
        name: 'Friday',
        short: 'Fr',
      },
      {
        name: 'Saturday',
        short: 'Sa',
        isWeekend: true,
      },{
        name: 'Sunday',
        short: 'Su',
        isWeekend: true,
      },
    ],
  
    // just play around with this number between 0 and 6
    weekStartingIndex: 0,
  
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
  
    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
  
    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
  
    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },
  
    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',
  
    // for input range value
    from: 'from',
    to: 'to',
  
  
    // used for input value when multi dates are selected
    digitSeparator: ',',
  
    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,
  
    // is your language rtl or ltr?
    isRtl: false,
  }