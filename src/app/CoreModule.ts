import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core"
import { AuthinterceptorService } from "./Auth/auth.interceptor.service";
import { loggingService } from "./Logging.service";
import { RecipeService } from "./recipes/recipe.service";
import { shoppinglistService } from "./shopping-list/shopping-list.service";

@NgModule({
providers:[
    shoppinglistService,
    RecipeService,
    {
    provide:HTTP_INTERCEPTORS, 
    useClass:AuthinterceptorService,
    multi:true
  }
]
})
export class CoreModule{}