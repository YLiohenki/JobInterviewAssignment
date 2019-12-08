import { Action } from "@ngrx/store";
import { CharacterDto } from "src/model/dto/character.dto";

export enum CharacterActionTypes {
  FetchCharacters = "[Character] Fetch Characters",
  FetchCharactersFailure = "[Character] Fetch Characters Failure",
  FetchCharactersSuccess = "[Character] Fetch Characters Success"
}

export class FetchCharactersAction implements Action {
  public readonly type: CharacterActionTypes.FetchCharacters = CharacterActionTypes.FetchCharacters;
  constructor() {}
}

export class FetchCharactersFailureAction implements Action {
  public readonly type: CharacterActionTypes.FetchCharactersFailure = CharacterActionTypes.FetchCharactersFailure;
  constructor(public error: Error) {}
}

export class FetchCharactersSuccessAction implements Action {
  public readonly type: CharacterActionTypes.FetchCharactersSuccess = CharacterActionTypes.FetchCharactersSuccess;
  constructor(public payload: { characters: CharacterDto[] }) {}
}

export type CharacterAction =
  | FetchCharactersAction
  | FetchCharactersFailureAction
  | FetchCharactersSuccessAction;
