import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { EditRecipesComponent } from './edit-recipes/edit-recipes.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe.routing.Module';
import { SharedModule } from '../shared/SharedModule';

@NgModule({
    declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    EditRecipesComponent,
    
],
imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    CommonModule,
    SharedModule
]
})
export class RecipeModule{}