import {createValidator} from "../index";
import {lengthValidator} from "../common/length";

const handlerConfig = {
    maxLength: 255,
    minLength: 12,
};

const handlePasswordValidate = () => (value) => {
    return value.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/g)
};

//хэндлеры валидаций
const passwordHandlers = [lengthValidator, handlePasswordValidate];

export const passwordValidator = createValidator({
    handlerConfig,
    handlers: passwordHandlers,
});

