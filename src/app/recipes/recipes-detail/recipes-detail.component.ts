import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
 recipe:Recipe;
 id:number;
  constructor( private recipeservice: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
        this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.recipe = this.recipeservice.getRecipe(this.id);
            this
          }
        );
  }
  
  Addtoshoppinglist(){
    this.recipeservice.AddingredientToshoppinglist(this.recipe.ingredient)
    
  }
  oneditrecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    // this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route});//it take you up for one level with this mention id by the help of activated route
  }

  onDeleteRecipe(){
    this.recipeservice.DeleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
