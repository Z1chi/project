import { images } from './images';

const { modalMainImage, sliderItemFirstImage, sliderItemSecondImage, } = images;

export const creativesCategories = {
    countLimit: 999,
    items: [
        {
            id: 0,
            name: 'All Cathegories',
            count: 10000,
        }, {
            id: 1,
            name: 'Videos',
            count: 72,
        }, {
            id: 2,
            name: 'Banners',
            count: 301,
        }, {
            id: 3,
            name: 'Animated Banners',
            count: 512,
        }, {
            id: 4,
            name: 'Landings',
            count: 400,
        }, {
            id: 5,
            name: 'RAR Archives + Landings',
            count: 20,
        }, {
            id: 6,
            name: 'RAR Archives + IMG',
            count: 20,
        }, 
    ]
};

export const creativesModalData = {
    mainImage: modalMainImage,
    sliderImages: [sliderItemFirstImage, sliderItemSecondImage, sliderItemFirstImage, sliderItemSecondImage, sliderItemFirstImage], 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
    filesInfo: [{
        name: 'Format',
        value: 'MP4'
    }, {
        name: 'Size',
        value: '1.2GB'
    }, {
        name: 'Files',
        value: '21'
    }, ], 
    onDownload: () => {},
};