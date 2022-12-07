import { Component , OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { shoppinglistService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
   @ViewChild('f') slform: NgForm;
   subscription: Subscription;
   editmode = false;
   editItemIndex : number;
   editedItem: Ingredient;
 constructor(private shoppinglistservice: shoppinglistService) { }
  
 
  ngOnInit(): void { 
    this.subscription = this.shoppinglistservice.startEditing.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editmode = true;
        this.editedItem = this.shoppinglistservice.getIngredientEdit(index);  
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editmode){
      this.shoppinglistservice.UpdateIngredient(this.editItemIndex, newIngredient)
    }else{
      this.shoppinglistservice.Addingredient(newIngredient);
    }
    this.editmode = false;
    this.slform.reset();
  }

  onClear(){
    this.slform.reset();
    this.editmode = false;
  }

  onDelete(){
    this.onClear();
    this.shoppinglistservice.Deleteingredient(this.editItemIndex);
  }

  // ondelete(){
  //   const ingname = this.nameInputRef.nativeElement.value;
  //   const ingamount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingname,ingamount);
  //   this.shoppinglistservice.deleteingredient(newIngredient);
  // }
}
function output() {
  throw new Error('Function not implemented.');
}

