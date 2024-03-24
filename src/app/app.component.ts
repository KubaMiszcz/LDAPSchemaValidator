import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LDAP Schema Validator';
  isDevelopmentMode = this.appService.build.startsWith('dev');

  constructor(private appService: AppService){
  }
}
