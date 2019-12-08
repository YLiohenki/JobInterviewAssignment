import { Injectable } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { Store } from "@ngrx/store";
import { IStoreState } from "src/model/store/state";
import { EntityWrapper, EntityState } from "src/model/shared/entity-wrapper";
import { map, filter } from "rxjs/operators";
import { CharacterTileData } from "../components/character-tile/character-tile-data";
import { CharacterDto } from "src/model/dto/character.dto";
import { HouseDto } from "src/model/dto/house.dto";
import { ActivatedRoute, Params } from "@angular/router";
import { ROUTE_PARAM_NAMES } from "src/model/shared/tokens";
import { InitApplicationAction } from 'src/model/store/actions/app.actions';

@Injectable({
  providedIn: "root"
})
export class HouseFacadeService {
  constructor(
    private store: Store<IStoreState>,
    private route: ActivatedRoute
  ) {}

  public getCharactersTileDataList(
    nameFilter: string
  ): Observable<EntityWrapper<CharacterTileData[]>> {
    return combineLatest(
      this.store.select((state: IStoreState) => state.characters),
      this.store.select((state: IStoreState) => state.houses),
      this.route.params
    ).pipe(
      map(
        ([charactersState, houseState, params]: [
          EntityWrapper<CharacterDto[]>,
          EntityWrapper<HouseDto[]>,
          Params
        ]) => {
          if (
            charactersState.state === EntityState.Failed ||
            houseState.state === EntityState.Failed
          ) {
            return {
              value: null,
              state: EntityState.Failed
            };
          }
          if (
            charactersState.state !== EntityState.Success ||
            houseState.state !== EntityState.Success
          ) {
            return {
              value: null,
              state: EntityState.Loading
            };
          }
          let house: HouseDto = houseState.value.find(
            (house: HouseDto) => house._id === params[ROUTE_PARAM_NAMES.houseId]
          );
          return {
            value: this.mapCharacterDtoToCharacterTileData(
              this.filterCharacterDtoOnHouse(
                charactersState.value,
                house,
                nameFilter.toLowerCase()
              )
            ),
            state: EntityState.Success
          };
        }
      )
    );
  }

  public retryInit(): void {
    this.store.dispatch(new InitApplicationAction());
  }

  private filterCharacterDtoOnHouse(
    charactersList: CharacterDto[],
    house: HouseDto,
    nameFilter: string
  ): CharacterDto[] {
    return charactersList.filter((characterDto: CharacterDto) => {
      return (
        characterDto.name.toLowerCase().indexOf(nameFilter) >= 0 &&
        house.members.some((memberId: string) => memberId === characterDto._id)
      );
    });
  }

  private mapCharacterDtoToCharacterTileData(
    charactersList: CharacterDto[]
  ): CharacterTileData[] {
    return charactersList.map((characterDto: CharacterDto) => {
      var nameWords = characterDto.name.split(" ");
      return new CharacterTileData(
        characterDto._id,
        nameWords[0],
        nameWords.length > 1 ? nameWords.slice(1).join(" ") : " ",
        characterDto.bloodStatus,
        characterDto.orderOfThePhoenix
      );
    });
  }
}
