import { ISortingStrategy } from "./i-sorting-strategy";
import { CharacterTileData } from "src/app/components/character-tile/character-tile-data";

export class CharacterSortingStrategyByLastName
  implements ISortingStrategy<CharacterTileData> {
  public name: string = "By last name";
  public compare: (
    character1: CharacterTileData,
    character2: CharacterTileData
  ) => number = (
    character1: CharacterTileData,
    character2: CharacterTileData
  ) => {
    return character1.lastName.localeCompare(character2.lastName);
  };
}
