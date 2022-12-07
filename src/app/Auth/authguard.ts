import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map,take ,tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class authguard implements CanActivate {

 constructor(private authservice:AuthService, private router: Router){}
    
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // throw new Error("Method not implemented.");
        return this.authservice.user.pipe(
            take(1),map(user => {
            const isAuth = !!user;
            if(isAuth){
                return true
            }
            return this.router.createUrlTree(['/auth']);
        }),
        // tap(isauth => {
        //    if(!isauth){
        //     this.router.navigate(['/auth']);
        //     }
        // })
        );
          
    }
        
}