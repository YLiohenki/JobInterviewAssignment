import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HouseComponent } from "./house.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NoYesPipe } from "../pipes/boolean.pipe";
import { CharacterTileComponent } from "../components/character-tile/character-tile.component";
import { RetryComponent } from "../components/retry/retry.component";
import { BloodTypeDirective } from "../directives/blood-type.directive";
import { EntityState } from "src/model/shared/entity-wrapper";
import { IStoreState } from "src/model/store/state";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { CharacterSortingStrategyByName } from "src/model/sorting/character-sorting-strategy-by-name";
import { CharacterSortingStrategyByLastName } from "src/model/sorting/character-sorting-strategy-by-last-name";
import { INJECTION_TOKENS } from 'src/model/shared/tokens';

describe("HouseComponent", () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;
  const initialState = {
    characters: { state: EntityState.Pristine, value: null },
    houses: { state: EntityState.Pristine, value: null }
  };
  let store: Store<IStoreState>;
  let dispatchSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HouseComponent,
        CharacterTileComponent,
        NoYesPipe,
        RetryComponent,
        BloodTypeDirective
      ],
      imports: [RouterModule.forRoot([]), FormsModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: INJECTION_TOKENS.SortingStrategiesForCharacterTileData,
          useFactory: () => new CharacterSortingStrategyByName(),
          multi: true
        },
        {
          provide: INJECTION_TOKENS.SortingStrategiesForCharacterTileData,
          useFactory: () => new CharacterSortingStrategyByLastName(),
          multi: true
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
