import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.css']
})
export class EditRecipesComponent implements OnInit {
id: number;
editMode = false;
recipeForm: FormGroup;
  constructor( private route: ActivatedRoute, 
               private recipeservice: RecipeService,
               private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit(){
    const newrecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagepath'],
      this.recipeForm.value['ingredients']
    );
    if(this.editMode){
      this.recipeservice.UpdateRecipe(this.id,newrecipe);
    }else{
      this.recipeservice.AddRecipe(newrecipe);
    }
    this.onCancelRecipe();
  }

  private initForm(){
    let recipeName = '';
    let recipeimagepath = '';
    let recipedescription = '';
    let recipeingredient = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeservice.getRecipe(this.id);
      recipeName = recipe.name;
      recipeimagepath = recipe.imagePath;
      recipedescription = recipe.description;
      if(recipe['ingredient']){
        for(let ingredient of recipe.ingredient){
          recipeingredient.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName, Validators.required),
    'imagepath': new FormControl(recipeimagepath, Validators.required),
    'description' : new FormControl(recipedescription, Validators.required),
    'ingredients' : recipeingredient
  });
  }
  
  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddingredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, 
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])        
      })
    )
  }

onCancelRecipe(){
  this.router.navigate(['../'],{relativeTo:this.route});
}

onClearingredients(){
  (<FormArray>this.recipeForm.get('ingredients')).clear();
}

onDeleteIngredient(index:number){
 (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}

}
