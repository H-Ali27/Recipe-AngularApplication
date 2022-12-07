import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipes/recipe.model";
import { RecipeService } from "./recipes/recipe.service";
import { DataStorageService } from "./shared/Data.storage.service";

@Injectable({
    providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private datastorageservice:DataStorageService, private recipeservice:RecipeService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeservice.getrecipe()
        if(recipes.length === 0 ){
            return this.datastorageservice.FetchRecipe()
        }else{
            return recipes;
        }
    }

}