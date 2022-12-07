import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs/internal/Subject";
import { Ingredient } from "../shared/ingredients.model";
import { shoppinglistService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
  RecipeChanged = new Subject<Recipe[]>();
 
    // private recipes: Recipe[]= [
    //     new Recipe('Testy Schnitzer',
    //     'More you want!',
    //     'https://www.ontariopork.on.ca/Portals/11/EasyDNNNews/659/images/Pork-Schnitzel-Recipe-1000-1000-p-L-97.jpg'
    //     ,[
    //       new Ingredient('meet',1),
    //       new Ingredient('French Fries',20)
    //     ]),

    //     new Recipe('Big Fat Burger',
    //     'Testy Big Fat Burger',
    //     'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    //     [
    //       new Ingredient('Bun',2),
    //       new Ingredient('Meat',1)
    //     ])
    //   ];
  private recipes:Recipe[]=[];

  constructor(private slService:shoppinglistService,
  private router:Router,
  private route:ActivatedRoute){}

setRecipe(recipes:Recipe[]){
  this.recipes = recipes;
  this.RecipeChanged.next(this.recipes.slice());  
}

getrecipe(){
 return  this.recipes.slice();
}

getRecipe(index:number){
  return this.recipes[index];
}

AddingredientToshoppinglist(ingredients: Ingredient[]){
this.slService.addingredients(ingredients);
}

AddRecipe(recipe: Recipe){
this.recipes.push(recipe);
this.RecipeChanged.next(this.recipes.slice());
}

UpdateRecipe(index:number, newrecipe:Recipe){
  this.recipes[index] = newrecipe;
  this.RecipeChanged.next(this.recipes.slice());  
}

DeleteRecipe(index:number){
this.recipes.splice(index,1);
this.RecipeChanged.next(this.recipes.slice());
}

}