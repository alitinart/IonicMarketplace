import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddListingPage } from './add-listing.page';

const routes: Routes = [
  {
    path: '',
    component: AddListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddListingPageRoutingModule {}
