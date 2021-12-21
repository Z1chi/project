export const createValidator = ({ handlers, handlerConfig }) => (value) => {
    return handlers.every(handler => handler(handlerConfig)(value))
};