import { ActionReducerMap, Action } from "@ngrx/store";
import { initialStoreState, IStoreState } from "./state";
import { EntityWrapper, EntityState } from "../shared/entity-wrapper";
import { HouseDto } from "../dto/house.dto";
import { CharacterDto } from "../dto/character.dto";
import { HouseActionTypes, HouseActions } from "./actions/house.actions";
import {
  CharacterAction,
  CharacterActionTypes
} from "./actions/character.actions";

export const housesReducer = (
  state = initialStoreState.houses,
  action: HouseActions
): EntityWrapper<HouseDto[]> => {
  switch (action.type) {
    case HouseActionTypes.FetchHouses:
      return {
        state: EntityState.Loading,
        value: state.value
      };
    case HouseActionTypes.FetchHousesFailure:
      return {
        state: EntityState.Failed,
        value: null
      };
    case HouseActionTypes.FetchHousesSuccess:
      return {
        state: EntityState.Success,
        value: action.payload.houses
      };
    default:
      return state;
  }
};

export const charactersReducer = (
  state = initialStoreState.characters,
  action: CharacterAction
): EntityWrapper<CharacterDto[]> => {
  switch (action.type) {
    case CharacterActionTypes.FetchCharacters:
      return {
        state: EntityState.Loading,
        value: state.value
      };
    case CharacterActionTypes.FetchCharactersFailure:
      return {
        state: EntityState.Failed,
        value: null
      };
    case CharacterActionTypes.FetchCharactersSuccess:
      return {
        state: EntityState.Success,
        value: action.payload.characters
      };
    default:
      return state;
  }
};

export const appReducers: ActionReducerMap<IStoreState, Action> = {
  houses: housesReducer,
  characters: charactersReducer
};
