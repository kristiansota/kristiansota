import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import {
  GetCartProducts,
  ECartActions,
  GetCartProductsSuccess} from './cart.actions';
import { CartService } from 'src/app/cart.service';

@Injectable()
export class CartEffects {

    @Effect()
    getCartProducts$ = this._actions$.pipe(
      ofType<GetCartProducts>(ECartActions.GetCartProducts),
      switchMap(() => this.cartService.getCartProducts()),
      switchMap((response : any[]) => of(new GetCartProductsSuccess(response)))
    );
  
    constructor(
      private cartService: CartService,
      private _actions$: Actions,
    ) {}
  }