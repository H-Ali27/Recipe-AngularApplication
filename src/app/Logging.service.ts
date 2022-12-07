import { Injectable } from "@angular/core";
import { last } from "rxjs-compat/operator/last";

// @Injectable({providedIn:"root"})

export class loggingService{
 lastload: string;

 printlog(message:string){
    console.log(message);
    console.log(this.lastload);
    this.lastload = message
 }
}