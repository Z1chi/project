import { SOCIALS_EMAIL, SOCIALS_TELEGRAM } from "./constants";
import { images } from "./images";

export const FAQ = {
    questions: [{
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }, {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }, {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }, {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }, {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }, {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }, ],

    contacts: {
        links: [{
            socialName: SOCIALS_EMAIL,
            link: {
                to: 'exampletest@gmail.com',
                text: 'exampletest@gmail.com',
            },
        }, {
            socialName: SOCIALS_TELEGRAM,
            link: {    
                to: '@ourtelegramsupport',
                text: '@ourtelegramsupport',
            },
        }],
        manager: {
            avatar: images.managerAvatar,
            info: [{
                parameter: 'Full name',
                value: 'Pavel Durov',
            }, {
                parameter: 'Occupation',
                value: 'Marketing Expert',
            }, {
                parameter: 'Experience',
                value: '10 years',
            }, ]
        },
    }
}