import { HouseDto } from '../dto/house.dto';
import { CharacterDto } from '../dto/character.dto';
import { EntityWrapper, EntityState } from '../shared/entity-wrapper';

export interface IStoreState {
    houses: EntityWrapper<HouseDto[]>;
    characters: EntityWrapper<CharacterDto[]>;
}

export const initialStoreState: IStoreState = {
    houses: { state: EntityState.Pristine, value: null },
    characters: { state: EntityState.Pristine, value: null }
}