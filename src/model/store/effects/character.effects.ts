import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { switchMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import {
  CharacterActionTypes,
  FetchCharactersFailureAction,
  CharacterAction,
  FetchCharactersSuccessAction,
  FetchCharactersAction
} from "../actions/character.actions";
import { CharacterDto } from "src/model/dto/character.dto";
import { CharactersService } from "src/model/services/characters.service";
import { AppActionTypes, AppActions } from "../actions/app.actions";

@Injectable()
export class CharacterEffects {
  @Effect()
  fetchCharactersList$ = this.actions$.pipe(
    ofType<CharacterAction>(CharacterActionTypes.FetchCharacters),
    switchMap(() =>
      this.charactersService.fetchCharactersList().pipe(
        map(
          (result: CharacterDto[]) =>
            new FetchCharactersSuccessAction({ characters: result })
        ),
        catchError((err: any) => of(new FetchCharactersFailureAction(err)))
      )
    )
  );

  @Effect()
  initCharacters$ = this.actions$.pipe(
    ofType<AppActions>(AppActionTypes.InitApplication),
    map(() => new FetchCharactersAction())
  );

  constructor(
    private actions$: Actions,
    private charactersService: CharactersService
  ) {}
}
