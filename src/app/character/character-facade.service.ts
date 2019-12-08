import { Injectable } from "@angular/core";
import { Observable, combineLatest, of } from "rxjs";
import { Store } from "@ngrx/store";
import { IStoreState } from "src/model/store/state";
import { EntityWrapper, EntityState } from "src/model/shared/entity-wrapper";
import { map, catchError } from "rxjs/operators";
import { CharacterDto } from "src/model/dto/character.dto";
import { CharacterFormData } from "./character-form-data";
import { ActivatedRoute, Params } from "@angular/router";
import { ROUTE_PARAM_NAMES } from "src/model/shared/tokens";
import { InitApplicationAction } from "src/model/store/actions/app.actions";

@Injectable({
  providedIn: "root"
})
export class CharacterFacadeService {
  constructor(
    private store: Store<IStoreState>,
    private route: ActivatedRoute
  ) {}

  public getCharacterFormData(): Observable<EntityWrapper<CharacterFormData>> {
    return combineLatest(
      this.store.select((state: IStoreState) => state.characters),
      this.route.params
    ).pipe(
      map(
        ([charactersState, params]: [
          EntityWrapper<CharacterDto[]>,
          Params
        ]) => {
          if (charactersState.state === EntityState.Failed) {
            return {
              value: null,
              state: EntityState.Failed
            };
          }
          if (charactersState.state !== EntityState.Success) {
            return {
              state: charactersState.state,
              value: null
            };
          }
          return {
            value: this.mapCharacterDtoToCharacterFormData(
              this.findCharacter(
                charactersState.value,
                params[ROUTE_PARAM_NAMES.characterId]
              )
            ),
            state: EntityState.Success
          };
        }
      ),
      catchError(_error => of({ state: EntityState.Failed, value: null }))
    );
  }

  public retryInit() {
    this.store.dispatch(new InitApplicationAction());
  }

  private findCharacter(charactersList: CharacterDto[], characterId: string) {
    return charactersList.find(
      (character: CharacterDto) => character._id === characterId
    );
  }

  private mapCharacterDtoToCharacterFormData(
    character: CharacterDto
  ): CharacterFormData {
    return new CharacterFormData(
      character._id,
      character.name,
      character.role,
      character.house,
      character.school,
      character.ministryOfMagic,
      character.orderOfThePhoenix,
      character.dumbledoresArmy,
      character.deathEater,
      character.bloodStatus,
      character.species,
      character.boggart,
      character.alias,
      character.animagus,
      character.wand,
      character.patronus
    );
  }
}
