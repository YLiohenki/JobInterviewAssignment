import { Action } from "@ngrx/store";

export enum AppActionTypes {
  InitApplication = "[App] Init Application"
}

export class InitApplicationAction implements Action {
  public readonly type: AppActionTypes.InitApplication =
    AppActionTypes.InitApplication;
  constructor() {}
}

export type AppActions = InitApplicationAction;
