import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from './app.state';
import { cartReducer } from './cart.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  cartProducts: cartReducer,
};
