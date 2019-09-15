import { Action, applyMiddleware, compose, createStore, Dispatch, StoreEnhancer } from 'redux';
import { rootReducer } from './reducers';

const enhancers: Function[] = [];
const middleware = [];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const actionToPlainObject = () => (next: Dispatch) => (action: Action) => {
    return next({ ...action });
};

middleware.push(actionToPlainObject);

const composedEnchancers: StoreEnhancer = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export const store = createStore(rootReducer, {}, composedEnchancers);
