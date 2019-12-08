import { ISortingStrategy } from "./i-sorting-strategy";
import { CharacterTileData } from "src/app/components/character-tile/character-tile-data";

export class CharacterSortingStrategyByName
  implements ISortingStrategy<CharacterTileData> {
  public name: string = "By first name";
  public compare: (
    character1: CharacterTileData,
    character2: CharacterTileData
  ) => number = (
    character1: CharacterTileData,
    character2: CharacterTileData
  ) => {
    return character1.firstName.localeCompare(character2.firstName);
  };
}
