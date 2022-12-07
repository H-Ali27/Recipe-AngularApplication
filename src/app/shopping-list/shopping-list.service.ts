import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class shoppinglistService{
IngredientsChanged = new Subject<Ingredient[]>();
startEditing = new Subject<number>();
 private Ingredients: Ingredient[] =[
        new Ingredient('Apple',5),
        new Ingredient('Mango',10),
        
      ];

  getIngredient(){
    return this.Ingredients.slice();
  }

  getIngredientEdit(index:number){
    return this.Ingredients[index];
  }

  Addingredient(ingredient: Ingredient){
    this.Ingredients.push(ingredient);
    this.IngredientsChanged.next(this.Ingredients.slice());
  }

  Deleteingredient(index: number){
    this.Ingredients.splice(index, 1)
    this.IngredientsChanged.next(this.Ingredients.slice());
  }

  // deleteingredient(ingredient: Ingredient){
  //   this.Ingredients.splice(0,3)
  // };

  addingredients(ingredient: Ingredient[]){
    // for(let ingredient of this.Ingredients){
    //   this.Addingredient(ingredient);
    // }
    this.Ingredients.push(...ingredient);
    this.IngredientsChanged.next(this.Ingredients.slice());
  }

  UpdateIngredient(index:number, newIngredient:Ingredient){
  this.Ingredients[index] = newIngredient;
  this.IngredientsChanged.next(this.Ingredients.slice());
  }  
  
}
