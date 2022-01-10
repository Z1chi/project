export const dateFormator = (dateObject) => {
    return {
        from: `${dateObject.from.year}-${dateObject.from.month.toString().padStart(2, '0')}-${dateObject.from.day.toString().padStart(2, '0')} 00:00:00`,
        to: `${dateObject.to.year}-${dateObject.to.month.toString().padStart(2, '0')}-${dateObject.to.day.toString().padStart(2, '0')} 23:59:59`
    }
}