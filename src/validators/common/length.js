export const lengthValidator = ({minLength, maxLength}) => (value) => {
    return (
        value.length >= minLength && value.length <= maxLength)
};