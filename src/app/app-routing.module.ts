import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { ListComponent } from './pages/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { Top10Component } from './pages/top10/top10.component';
import { VoteComponent } from './pages/vote/vote.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { GinComponent } from './pages/admin/gin/gin.component';
import { EventComponent } from './pages/admin/event/event.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: FrontpageComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'top10', component: Top10Component, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'list', component: ListComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToHome}},
  { path: 'vote', component: VoteComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'admin/dashboard', component:DashboardComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'admin/gin', component:GinComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'admin/event', component:EventComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
