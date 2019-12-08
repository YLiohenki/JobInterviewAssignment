import { Injectable } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { Store } from "@ngrx/store";
import { IStoreState } from "src/model/store/state";
import { EntityWrapper, EntityState } from "src/model/shared/entity-wrapper";
import { HouseTileData } from "../components/house-tile/house-tile-data";
import { HouseDto } from "src/model/dto/house.dto";
import { map } from "rxjs/operators";
import { CharacterDto } from "src/model/dto/character.dto";
import { InitApplicationAction } from "src/model/store/actions/app.actions";

@Injectable({
  providedIn: "root"
})
export class DashboardFacadeService {
  constructor(private store: Store<IStoreState>) {}

  getHousesTileDataList(): Observable<EntityWrapper<HouseTileData[]>> {
    return combineLatest(
      this.store.select((state: IStoreState) => state.characters),
      this.store.select((state: IStoreState) => state.houses)
    ).pipe(
      map(
        ([charactersState, housesState]: [
          EntityWrapper<CharacterDto[]>,
          EntityWrapper<HouseDto[]>
        ]) => ({
          ...housesState,
          value:
            housesState.state === EntityState.Success &&
            charactersState.state === EntityState.Success
              ? this.mapHouseDtoToHouseTileData(
                  housesState.value,
                  charactersState.value
                )
              : null
        })
      )
    );
  }

  public retryInit() {
    this.store.dispatch(new InitApplicationAction());
  }

  mapHouseDtoToHouseTileData(
    houses: HouseDto[],
    characters: CharacterDto[]
  ): HouseTileData[] {
    return houses.map(
      (houseDto: HouseDto) =>
        new HouseTileData(
          houseDto._id,
          houseDto.name,
          houseDto.members.filter((id: string) =>
            characters.some((character: CharacterDto) => character._id === id)
          ).length
        )
    );
  }
}
