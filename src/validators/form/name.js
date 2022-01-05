import {createValidator} from "../index";
import {profileSettingsFieldTypeList} from "../../components/Pages/SettingsPage/data";

const handleNameFormValidate = () => (values) => {
    console.log('v', values)
    const [firstName, lastName] = values[profileSettingsFieldTypeList.new].split(' ');
    return values[profileSettingsFieldTypeList.new] !== values[profileSettingsFieldTypeList.current] && firstName && firstName.length > 1 && lastName && lastName.length > 1;
};

const nameFormHandlers = [handleNameFormValidate];

export const nameFormValidator = createValidator({
    handlerConfig: {},
    handlers: nameFormHandlers,

});
