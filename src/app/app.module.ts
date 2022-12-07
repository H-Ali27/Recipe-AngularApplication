import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { headerComponent } from './headerComponent/headercomponent';
import { SharedModule } from './shared/SharedModule';
import { CoreModule } from './CoreModule';
import { loggingService } from './Logging.service';





@NgModule({
  declarations: [
    AppComponent,
    headerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    SharedModule,
    CoreModule
  ],
   providers: [
loggingService    
],
  bootstrap: [AppComponent],
  // entryComponents: [AlertComponent]
})
export class AppModule { }
