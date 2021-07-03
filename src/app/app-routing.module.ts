import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdminModule } from './product-admin/product-admin.module';

const routes: Routes = [
  { path: '', redirectTo: 'product-dashboard', pathMatch: 'full' },
  { path: 'product-dashboard', loadChildren: () => ProductAdminModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
