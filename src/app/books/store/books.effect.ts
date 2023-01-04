import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { AppState } from 'src/app/shared/store/app-state';
import { BooksService } from '../books.service';
import {
  booksFetchAPISuccess,
  deleteBookAPISuccess,
  invokeBooksAPI,
  invokeDeleteBookAPI,
  invokeSaveNewBookAPI,
  invokeUpdateBookAPI,
  saveNewBookAPISuccess,
  updateBookAPISuccess,
} from './books.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store,
    private appStore: Store<AppState>
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      mergeMap(([, bookFormStore]) => {
        if (bookFormStore.length > 0) {
          return EMPTY;
        }
        return this.booksService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.create(action.newBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewBookAPISuccess({ newBook: data });
          })
        );
      })
    );
  });

  updateBookAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.update(action.updateBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateBookAPISuccess({ updateBook: data });
          })
        );
      })
    );
  });
  deleteBooksAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteBookAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteBookAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
