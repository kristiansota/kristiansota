import { Action } from '@ngrx/store';
import { initialCartState, ICartState } from './cart.state';
import { ECartActions, CartActions } from './cart.actions';


export const cartReducer = (
    state = initialCartState,
    action: CartActions
  ): ICartState => {
    switch (action.type) {
      case ECartActions.GetCartProductsSuccess: {
        return {
          ...state,
          cartProducts: action.payload
        };
      }
      
      default:
        return state;
    }
  };
  