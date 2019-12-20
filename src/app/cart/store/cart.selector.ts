import { createSelector } from '@ngrx/store';

import { IAppState } from './app.state';
import { ICartState } from './cart.state';

const selectCartProducts = (state: IAppState) => state.cartProducts;

export const selectCartList = createSelector(
  selectCartProducts,
  (state: ICartState) => state.cartProducts
);
