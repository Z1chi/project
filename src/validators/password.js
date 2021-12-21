import {createValidator} from "./index";
import {lengthValidator} from "./common/length";
import {profileSettingsFieldTypeList} from "../components/Pages/SettingsPage/data";


const handlerConfig = {
    maxLength: 255,
    minLength: 12,

};

const handlePasswordValidate = () => (value) => {
    return value.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/g)
};


//хэндлеры валидаций
const passwordHandlers = [lengthValidator, handlePasswordValidate];

const handlePasswordFormValidate = () => (values) => {
    return values[profileSettingsFieldTypeList.new] === values[profileSettingsFieldTypeList.repeatNew]
};

const passwordFormHandlers = [handlePasswordFormValidate];


export const passwordValidator = createValidator({
    handlerConfig,
    handlers: passwordHandlers,
});

export const passwordFormValidator = createValidator({
    handlerConfig: {},
    handlers: passwordFormHandlers,

});
