// == Angular

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersSignInComponent } from './users-sign-in/users-sign-in.component';
import { UsersSignUpComponent } from './users-sign-up/users-sign-up.component';
import { UsersCreateAccountComponent } from './users-create-account/users-create-account.component';
import { UsersBillingInfoComponent } from './users-billing-info/users-billing-info.component';

const routes: Routes = [
  { path: 'signup', component: UsersSignUpComponent },
  { path: 'signin', component: UsersSignInComponent },
  { path: 'create-account', component: UsersCreateAccountComponent },
  { path: 'billing-info', component: UsersBillingInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }