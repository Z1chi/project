import {createValidator} from "../index";
import {profileSettingsFieldTypeList} from "../../components/Pages/SettingsPage/data";

const handlePasswordFormValidate = () => (values) => {
    return values[profileSettingsFieldTypeList.new] === values[profileSettingsFieldTypeList.repeatNew]
};

const passwordFormHandlers = [handlePasswordFormValidate];

export const passwordFormValidator = createValidator({
    handlerConfig: {},
    handlers: passwordFormHandlers,

});
