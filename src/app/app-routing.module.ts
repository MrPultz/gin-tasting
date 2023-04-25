import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { ListComponent } from './pages/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { Top10Component } from './pages/top10/top10.component';
import { VoteComponent } from './pages/vote/vote.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { GinComponent } from './pages/admin/gin/gin.component';
import { EventComponent } from './pages/admin/event/event.component';
import { ShowEventComponent } from './pages/admin/show-event/show-event.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: HeaderComponent, children: [
    { path: '', component: FrontpageComponent},
    { path: 'top10', component: Top10Component},
    { path: 'list', component: ListComponent},
    { path: 'vote', component: VoteComponent},
  ]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToHome}},
  { path: 'admin', component:NavbarComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}, children: [
    { path: '', component: DashboardComponent},
    { path: 'gin', component: GinComponent},
    { path: 'event', component: EventComponent},
    { path: 'event/:id', component: ShowEventComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
