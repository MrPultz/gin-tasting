import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { ListComponent } from './pages/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { Top10Component } from './pages/top10/top10.component';

const routes: Routes = [
  { path: '', component: FrontpageComponent},
  { path: 'top10', component: Top10Component},
  { path: 'list', component: ListComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
