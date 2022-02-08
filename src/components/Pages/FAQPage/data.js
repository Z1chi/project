import { SOCIALS_EMAIL, SOCIALS_TELEGRAM } from "./constants";
import { images } from "./images";

export const FAQ = {
    questions: [{
        short_question: 'Offers',
        full_question: 'Offers',
        answer: `Find the best affiliate offers to participate in the program. Pick a suitable offer and click the Select button. The system will redirect you to the SmartLinks section. Create your own link that will redirect traffic to the website. Feel free to use ready-made creative promo tools such as videos, images, or landing pages. You can find them any time on the Creative promo page.`,
    }, {
        short_question: 'Smartlinks',
        full_question: 'Smartlinks',
        answer: `SmartLink is an affiliate marketing link that drives customers to the website with a higher percentage of CR. Using your SmartLink, you don't have to create and run any complex marketing campaigns. Any user who clicks on your SmartLink will be automatically attached to your account. Also, it can be used as a detailed statistics tool as SmartLinks are related to the algorithms that provide rankings of affiliate offers due to their performance.`,
    }, {
        short_question: 'Statistics',
        full_question: 'Statistics',
        answer: <div>
            <p>Get access to your detailed statistics. Track current income stats and measure your daily affiliate performance on the following page.</p>
            <p>To make you feel comfortable with statistics, it contains five sections:</p>
            <ul>
                <li>Clicks</li>
                <li>Leads</li>
                <li>Deposits</li>
                <li>Profit</li>
                <li>Withdraw</li>
            </ul>

            <p>The section contains the following items.</p>
            <ul>
                <li>Clicks - Total clicks</li>
                <li>UC - Total unique users clicked on your link</li>
                <li>EPC - Earn per one click </li>
                <li>REG - Total registrations</li>
                <li>CR - Clicks to registrations percentage. With 100 clicks and 10 registrations, your CR is 10%.</li>
                <li>EPR - Earn per one registration</li>
                <li>DEP - Total deposits made</li>
                <li>CR - Conversion rate (Registration to Deposit) </li>
                <li>SUM - Sum of deposits </li>
                <li>CPA - Profit by CPA </li>
                <li>REVSHARE - Profit by Revshare </li>
                <li>SUM - Your overall profit </li>
                <li>Pending - The 'Pending' status of your income under CPA (the status may remain within seven business days)</li>
                <li>Declined - The 'Declined' status of your income under CPA. Make sure attracted consumers fully meet the requirements to get an 'Accepted' status</li>
                <li>Accepted - The 'Accepted' status of your income under CPA</li>
            </ul>
        </div>,
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