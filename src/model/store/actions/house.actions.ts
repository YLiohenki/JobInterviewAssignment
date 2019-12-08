import { Action } from "@ngrx/store";
import { HouseDto } from "src/model/dto/house.dto";

export enum HouseActionTypes {
  FetchHouses = "[House] Fetch Houses",
  FetchHousesFailure = "[House] Fetch Houses Failure",
  FetchHousesSuccess = "[House] Fetch Houses Success"
}

export class FetchHousesAction implements Action {
  public readonly type: HouseActionTypes.FetchHouses = HouseActionTypes.FetchHouses;
  constructor() {}
}

export class FetchHousesFailureAction implements Action {
  public readonly type: HouseActionTypes.FetchHousesFailure = HouseActionTypes.FetchHousesFailure;
  constructor(public error: Error) {}
}

export class FetchHousesSuccessAction implements Action {
  public readonly type: HouseActionTypes.FetchHousesSuccess = HouseActionTypes.FetchHousesSuccess;
  constructor(public payload?: { houses: HouseDto[] }) {}
}

export type HouseActions =
  | FetchHousesAction
  | FetchHousesFailureAction
  | FetchHousesSuccessAction;
