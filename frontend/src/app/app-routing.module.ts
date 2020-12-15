import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from "./pages/list/list.component";
import {DetailsComponent} from "./pages/details/details.component";


const routes: Routes = [
  {path: 'home', component: ListComponent},
  {path: 'details', component: DetailsComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
