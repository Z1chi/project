export const calendarAside = [
    {
        getText: () => 'Today',
        onClick: () => {},
    }, {
        getText: () => 'Last 30 days',
        onClick: () => {},
    }, {
        getText: () => 'Last 90 days',
        onClick: () => {},
    }, {
        getText: () => (new Date()).getFullYear(),
        onClick: () => {},
    }, {
        getText: () => (new Date()).getFullYear() - 1,
        onClick: () => {},
    }, {
        getText: () => (new Date()).getFullYear() - 2,
        onClick: () => {},
    }, 
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