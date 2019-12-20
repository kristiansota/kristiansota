import { ICartState, initialCartState } from './cart.state';


export interface IAppState {
  cartProducts: ICartState;
  
}

export const initialAppState: IAppState = {
  cartProducts: initialCartState,

};

export function getInitialState(): IAppState {
  return initialAppState;
}
