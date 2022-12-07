import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/SharedModule";
import { AuthComponentComponent } from "./auth.component/auth.component.component";

@NgModule({
    declarations:[
        AuthComponentComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: AuthComponentComponent}]),
        SharedModule]
        ,
    exports:[
        AuthComponentComponent
    ]
})
export class AuthModule{}