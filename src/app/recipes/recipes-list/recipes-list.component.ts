  import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[] ;
  
  constructor(private recipeservice: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  this.subscription = this.recipeservice.RecipeChanged.subscribe(
    (recipe:Recipe[])=>{
      this.recipes = recipe;
    }
  );
  this.recipes = this.recipeservice.getrecipe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();    
  }
  
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
