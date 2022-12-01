import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BORD Gin Smagning';
  isAdminPage: boolean = false;

    constructor(private titleService: Title, private route: Router) {

        this.route.events.subscribe(event => {
            if(event instanceof RoutesRecognized) {
                console.log('navigated to:', event.url)
                console.log('route state', event.state)
            } else if(event instanceof NavigationEnd) {
                console.log('navigated to includes:', event.urlAfterRedirects.includes("/admin"))
                if(event.urlAfterRedirects.includes("/admin")){
                    console.log("This is admin")
                    this.isAdminPage = true
                } else {
                    console.log("this is not admin")
                    this.isAdminPage = false
                }
            }
        })
    }

}
