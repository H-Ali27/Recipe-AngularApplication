import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authguard } from "../Auth/authguard";
import { RecipeResolverService } from "../recipe.resolver.service";
import { EditRecipesComponent } from "./edit-recipes/edit-recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesComponent } from "./recipes.component";

const routes:Routes = [
    {
        path: '', 
        component:RecipesComponent,
        canActivate:[authguard],
    children:[
         {path:'', component: RecipeStartComponent},
         {path: 'new', component: EditRecipesComponent},
         {path: ':id', component: RecipesDetailComponent, resolve:[RecipeResolverService]},
         {path: ':id/edit', component: EditRecipesComponent, resolve:[RecipeResolverService]},
   ]},
]; 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
    
})
export class RecipeRoutingModule {

}