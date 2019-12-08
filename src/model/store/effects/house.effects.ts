import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import {
  HouseActions,
  HouseActionTypes,
  FetchHousesSuccessAction,
  FetchHousesFailureAction,
  FetchHousesAction
} from "../actions/house.actions";
import { switchMap, catchError, map } from "rxjs/operators";
import { HousesService } from "src/model/services/houses.service";
import { HouseDto } from "src/model/dto/house.dto";
import { of } from "rxjs";
import { AppActions, AppActionTypes } from "../actions/app.actions";

@Injectable()
export class HouseEffects {
  @Effect()
  fetchHousesList$ = this.actions$.pipe(
    ofType<HouseActions>(HouseActionTypes.FetchHouses),
    switchMap(() =>
      this.housesService.fetchHousesList().pipe(
        map(
          (result: HouseDto[]) =>
            new FetchHousesSuccessAction({ houses: result })
        ),
        catchError((err: any) => of(new FetchHousesFailureAction(err)))
      )
    )
  );

  @Effect()
  initHouses$ = this.actions$.pipe(
    ofType<AppActions>(AppActionTypes.InitApplication),
    map(() => new FetchHousesAction())
  );

  constructor(
    private actions$: Actions,
    private housesService: HousesService
  ) {}
}
