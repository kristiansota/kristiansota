import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';


@Injectable()
export class SignUpDeactivate implements CanDeactivate<SignUpComponent> {
    canDeactivate(component: SignUpComponent): boolean {
        if(component.signupForm.dirty){
            return confirm('Are you sure you want to leave this page and discard your inputs?');
        }
        return true;
    }
}