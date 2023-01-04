import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { BooksEffect } from './store/books.effect';
import { bookReducer } from './store/books.reducer';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    StoreModule.forFeature('myBooks', bookReducer),
    EffectsModule.forFeature([BooksEffect]),

  ]
})
export class BooksModule { }
