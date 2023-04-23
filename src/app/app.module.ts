import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { LoginComponent } from './pages/login/login.component';
import { GinRenderComponent } from './components/gin-render/gin-render.component';
import { ListComponent } from './pages/list/list.component';
import { Top10Component } from './pages/top10/top10.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { VoteComponent } from './pages/vote/vote.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { GinComponent } from './pages/admin/gin/gin.component';
import { EventComponent } from './pages/admin/event/event.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShowEventComponent } from './pages/admin/show-event/show-event.component';
import { GinEventCardComponent } from './components/gin-event-card/gin-event-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrontpageComponent,
    LoginComponent,
    GinRenderComponent,
    ListComponent,
    Top10Component,
    VoteComponent,
    DashboardComponent,
    GinComponent,
    EventComponent,
    NavbarComponent,
    RegisterComponent,
    ShowEventComponent,
    GinEventCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
