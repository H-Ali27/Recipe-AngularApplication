import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { loggingService } from "../Logging.service";
import { SharedModule } from "../shared/SharedModule";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports:[
    FormsModule,
    CommonModule,
    RouterModule.forChild([{path: '', component:ShoppingListComponent}]),
    SharedModule
    ],
    // exports:[
    // ShoppingListComponent,
    // ShoppingEditComponent,
    // ],
    providers:[loggingService]
})
export class ShoppingListModule{

}