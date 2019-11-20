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

const appRoutes: Routes = [
  { path: '', redirectTo:"/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'cart',canActivate: [AuthGuardService], component: CartComponent },
  { path: 'sign-up', component: SignUpComponent,
    canDeactivate: [SignUpDeactivate] },
  { path: 'log-in', component: LogInComponent }
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
    ProductsCrudComponent
  ],

  entryComponents: [ProductsCrudComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ProductsService,CartService,SignupService,UserService,SignUpDeactivate,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
