import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap,take,exhaustMap} from "rxjs/operators";


import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../Auth/auth.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    constructor(
      private http: HttpClient, 
      private recipeservice:RecipeService,
      private authservice: AuthService
      ){}

    StoreRecipe(){
      const recipes = this.recipeservice.getrecipe();
      return this.http.put('https://ng-course-recipe-book-8b8c8-default-rtdb.firebaseio.com/recipes.json',recipes)
      .subscribe(response => {
        console.log(response);
      });
    }

    FetchRecipe() {
      return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-8b8c8-default-rtdb.firebaseio.com/recipes.json')
          .pipe(
            map(recipes => {
            return recipes.map(recipe => {
               return {
                ...recipe,
                ingredients: recipe.ingredient ? recipe.ingredient : []
              };
            });
          }),
          tap(
            recipes => {
            this.recipeservice.setRecipe(recipes);}
        ))}
          // })
    

// Hamza Code
    // FetchRecipe(){
    // return this.authservice.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>(
    //   'https://ng-course-recipe-book-8b8c8-default-rtdb.firebaseio.com/recipes.json',
    //   {
    //     params: new HttpParams().set('auth', user.token)
    //   }
    //   );
    //   }),
    //   map( recipes => {
    //       return recipes.map(recipe => {
    //           return {...recipe, 
    //             ingredients:recipe.ingredient ? recipe.ingredient : []};
    //     })
    //   }
    //   ),tap(
    //     recipes => {
    //       this.recipeservice.setRecipe(recipes);
    //     }
    //   ))   
    // }   
  }