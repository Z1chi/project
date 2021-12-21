const mobileClassNameModifier = 'isMobile';

export const getAdaptiveClassName = ({ className, width, maxWidth }) => {
    return `${className}${width<maxWidth?` ${className}--${mobileClassNameModifier}`:''}`
}