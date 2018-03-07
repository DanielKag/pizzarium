import to from 'await-to-js';

export const httpMiddleware = store => next => action => {
    if(action.payload && action.payload.isHttp) {
        handleHTTPAction(next, action);
    } else {
        next(action);
    }
};

const handleHTTPAction = async (next, action) => {
    
    next({
            type: action.type + '_PENDING',
            payload: action.payload
        });

    const [error, response] = await to(fetch(action.payload.url));
        
    if(response) {
        const jsonResposne = await response.json();
        
        next({
            type: action.type + '_SUCCESS',
            payload: {
                response: jsonResposne
            }
        });           

    } else {
        
        next({
            type: action.type + '_FAILURE',
            payload:{
                error
            }
        })
    }             
}
