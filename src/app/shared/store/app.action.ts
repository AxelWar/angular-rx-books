import { createAction, props } from "@ngrx/store";
import { AppState } from "./app-state";

export const setAPIStatus = createAction(
    '[API] success or failure status',
    props<{apiStatus: AppState}>()
);
