import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListComponent} from './pages/list/list.component';
import {DetailsComponent} from './pages/details/details.component';
import {ModalAddComponent} from './pages/list/modal-add/modal-add.component';
import { MessagesComponent } from './shared/components/messages/messages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    ModalAddComponent,
    MessagesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
