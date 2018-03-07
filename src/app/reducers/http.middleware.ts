export const httpMiddleware = store => next => action => {
    if(action.payload && action.payload.isHttp) {
        handleHTTPAction(next, action);
    } else {
        next(action);
    }
};

const handleHTTPAction = (next, action) => {
    
    next({
            type: action.type + '_PENDING',
            payload: action.payload
        });

    fetch(action.payload.url)
        .then(response => response.json())
        .then(response => {
            next({
                type: action.type + '_SUCCESS',
                payload: {
                    response
                }
            });
        })
        .catch(error => {
            next({
                type: action.type + '_FAILURE',
                payload:{
                    error
                }
            })
        });
}

