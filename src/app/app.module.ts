import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { ProductItemComponent } from './product/products-list/product-item/product-item.component';
import { ProductsService } from './product/products.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { SignupService } from './user/sign-up/signup.service';
import { UserService } from './user/user.service';
import { SignUpDeactivate } from './user/signupDeactivate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ProductsCrudComponent } from './product/products-crud/products-crud.component';
import { AuthGuardService } from './user/auth-guard.service';
import { AdminPanelComponent } from './user/admin-panel/admin-panel.component';
import { UserCrudComponent } from './user/admin-panel/user-crud/user-crud.component';
import { FilterPipe } from './product/filter.pipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment'; // Angular CLI environment
import { appReducers } from './cart/store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './cart/store/cart.effects';


const appRoutes: Routes = [
  { path: '', redirectTo:"/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'cart',canActivate: [AuthGuardService], component: CartComponent },
  { path: 'sign-up', component: SignUpComponent,
    canDeactivate: [SignUpDeactivate] },
  { path: 'log-in', component: LogInComponent },
  { path: 'admin-panel', component: AdminPanelComponent }
]

@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    ProductComponent,
    ProductsListComponent,
    ProductItemComponent,
    HomeComponent,
    CartComponent,
    UserComponent,
    SignUpComponent,
    LogInComponent,
    ProductsCrudComponent,
    AdminPanelComponent,
    UserCrudComponent,
    FilterPipe
  ],

  entryComponents: [ProductsCrudComponent,UserCrudComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([CartEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [ProductsService,CartService,SignupService,UserService,SignUpDeactivate,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
