import { SOCIALS_EMAIL, SOCIALS_TELEGRAM } from "./constants";
import { images } from "./images";



export const FAQ = {

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