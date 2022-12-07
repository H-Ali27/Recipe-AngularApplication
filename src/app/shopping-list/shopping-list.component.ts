import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { loggingService } from '../Logging.service';
import { Ingredient } from '../shared/ingredients.model';
import { shoppinglistService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  private igChangeSub: Subscription;
  Ingredients: Ingredient[];

  constructor(
    private shoppinglistservice: shoppinglistService,
    private loggingservice:loggingService) {}

  ngOnInit() {
    this.Ingredients = this.shoppinglistservice.getIngredient();
     this.igChangeSub = this.shoppinglistservice.IngredientsChanged.
    subscribe((ingredient: Ingredient[]) => {
      this.Ingredients = ingredient;
    }
    );
    this.loggingservice.printlog('hello from shoppinglist component ngoninit')
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppinglistservice.startEditing.next(index);
  }

}
