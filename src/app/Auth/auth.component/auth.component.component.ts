import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeholder/placeholder.directive';


import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth.component',
  templateUrl: './auth.component.component.html',
  styleUrls: ['./auth.component.component.css']
})
export class AuthComponentComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceHolderDirective, {static:false}) alertHost:PlaceHolderDirective;
  isloggedin = true;
  isloading = false;
  error:string = null;
 private closesub: Subscription;
  constructor(
    private authservice:AuthService, 
    private router:Router,
    private componentfactoryresolver: ComponentFactoryResolver
    ) { }
  ngOnDestroy() {
    if(this.closesub){
      this.closesub.unsubscribe();
    }
  }

  Switchto(){
    this.isloggedin = !this.isloggedin;
  }

  ngOnInit(): void {
  }
  
  OnSubmit(authform: NgForm){
    
    if(!authform.valid){
      return;
    }
    const email = authform.value.email;
    const password = authform.value.password;
    
    let authobs: Observable<AuthResponseData>
    
    this.isloading = true;
    if(this.isloggedin){
      authobs = this.authservice.Login(email,password);
    } else{
     authobs = this.authservice.SignUp(email,password);
    }


    authobs.subscribe(resData=>{
      console.log(resData);
      this.isloading = false;
      this.router.navigate(['/recipes']);
    },
    errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isloading = false;
    });

    authform.reset();
    }   
   
    handlerror(){
      this.error = null;
    }

    private showErrorAlert(message: string){
    // const altcomp = new AlertComponent;
    const alertcmpFactory = this.componentfactoryresolver.resolveComponentFactory(AlertComponent);
    const hostviewcontainerRef = this.alertHost.viewconatinerRef;
    hostviewcontainerRef.clear();
    const componentRef = hostviewcontainerRef.createComponent(alertcmpFactory);
    componentRef.instance.message = message;
    this.closesub = componentRef.instance.close.subscribe(()=> {
        this.closesub.unsubscribe();
        hostviewcontainerRef.clear();
    });
  }
}
