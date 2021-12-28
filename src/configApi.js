const config = {
    apiUrl: process.env.NODE_ENV === 'production' ? '/api-affiliate' : 'http://pp.laravel/api-affiliate',
    root: 'http://pp.local',

};

export default config;
