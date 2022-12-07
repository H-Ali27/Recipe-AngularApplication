import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../Auth/auth.service";
import { DataStorageService } from "../shared/Data.storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './headercomponent.html',
  styleUrls:['./headercomponent.css']
})
export class headerComponent implements OnInit, OnDestroy{
 private usersub: Subscription;  
 collapsed = true;
 isauthenticated = false;

 constructor(
    private datastorageservice:DataStorageService, 
    private authservice:AuthService
    ){}
  
  
  ngOnInit(): void {
    this.usersub = this.authservice.user.subscribe(user => {
      // this.isauthenticated = !User ? false : true; 
      this.isauthenticated = !!user;  
      console.log(!user);
      
      console.log(!!user);
    }) 
  }

  onSaveData(){
    this.datastorageservice.StoreRecipe();
  }

  onfetchData(){
    this.datastorageservice.FetchRecipe().subscribe();
  }
 
  onLogout(){
    this.authservice.Logout();
  }
  
  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  } 
}