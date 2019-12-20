import { Action } from '@ngrx/store';

export enum ECartActions {
    GetCartProducts = '[Cart] Get Cart Products',
    GetCartProductsSuccess = '[Cart] Get Cart Products Success',
  }

  export class GetCartProducts implements Action {
    public readonly type = ECartActions.GetCartProducts;
  }

  export class GetCartProductsSuccess implements Action {
    public readonly type = ECartActions.GetCartProductsSuccess;
    constructor(public payload: any[]) {}
  }

  export type CartActions = GetCartProducts | GetCartProductsSuccess;