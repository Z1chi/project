const getPropQueryParam = (property, isProp) => {
    return isProp ? '[' + property + ']' : property
}

export const convertToQueryString = (object, currentBreadcrum = '', isProp=false, ) => {
    let queryString = '';
    
    console.log('test', isProp, object, currentBreadcrum)

    for (let property in object) {
        let potentialObject = object[property];
        
        if (typeof potentialObject === 'undefined') {
            potentialObject = '';
        } // set undefined values to an empty string

        if (typeof potentialObject === 'object') {
            queryString += convertToQueryString( potentialObject, currentBreadcrum + property, true, );
        } else {
            if (currentBreadcrum === '' && queryString === '') { // don't prepend an '&' if it's the first item in the query string
                queryString += currentBreadcrum + getPropQueryParam(property, isProp) + '=' + potentialObject;
            } else {
                queryString += '&' + currentBreadcrum + getPropQueryParam(property, isProp) + '=' + potentialObject;
            }
        }
    }
    
    return queryString;
};