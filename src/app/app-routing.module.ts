import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: '/recipes',pathMatch:'full'},
    {path:'recipes',
     loadChildren:() => import('./recipes/RecipeModule').then(m=>m.RecipeModule)
    },
    {path:'shopping-list', 
    loadChildren:() => import('./shopping-list/ShoppingListModule').then(s=>s.ShoppingListModule)
    },
    {path:'auth', loadChildren:() => import('./Auth/AuthModule').then(a=>a.AuthModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
