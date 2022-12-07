import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { Dropdowndirective } from "./Dropdown.directive";
import { LoadingSpinnerComponent } from "./loading.spinner/loading-spinner";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        Dropdowndirective
    ],
    imports:[CommonModule],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        Dropdowndirective]
})
export class SharedModule{}