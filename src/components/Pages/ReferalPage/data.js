import { images } from "./images";

export const referalLink = {
    to: '/', 
    text: 'trafburg.com/?aff=8wv6v9',
};

export const referalCards = [{
    renderTitle: ({ gradient }) => {
        return <>
            <span style={{background: gradient, WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>От заработка</span>
            &nbsp;реферала вам
        </>
    },
    renderDescription: ({ value }) => {
        return <>
            {`Вы будете получать ${value}% в течении 1 года от дохода каждого зарегистрированного по вашей ссылке вебмастера`}
        </>
    },
    value: 10,
    gradient: 'linear-gradient(180deg, #00C880 0%, #FFAE81 100%)',
}, {
    renderTitle: ({ gradient }) => {
        return <>
            Бонус для реферала
            <span style={{background: gradient, WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>&nbsp;на выплату</span>
        </>
    },
    renderDescription: ({ value }) => {
        return <>
            {`Каждый зарегестрированный по вашей ссылке вебмастер получит бонус +${value}% от суммы первой выплату`}
        </>
    },
    value: 30,
    gradient: 'linear-gradient(180deg, #005CC8 0%, #E681FF 100%)',
}, ];


export const referalProgram = {
    title: 'How does the referral program work?',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    steps: [{
        image: images.linkIcon,
        title: 'Copy the referral link',
        description: 'The link can be found in the Trafburg affiliate program.'
    }, {
        image: images.referalsIcon,
        title: 'Bring referrals',
        description: 'Share the link on your blog, social networks, messengers, post it on your website or under a video. Send to friends or colleagues.'
    }, {
        image: images.incomeIcon,
        title: 'Get passive income',
        description: 'You will be credited 10% withing 1 year from the earnings from each referral whp registers by the link, you can withdraw the earned funds in a variety of available ways.'
    }, ]
}