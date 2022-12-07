import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { loggingService } from './Logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authservice: AuthService, private loggingservice:loggingService){}
  ngOnInit(): void {
    this.authservice.autologin();
    this.loggingservice.printlog('hello from app-component ngoninit')
  }

}
