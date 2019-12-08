import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { RetryComponent } from "../components/retry/retry.component";
import { HouseTileComponent } from "../components/house-tile/house-tile.component";
import { RouterModule } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { CharacterSortingStrategyByName } from "src/model/sorting/character-sorting-strategy-by-name";
import { CharacterSortingStrategyByLastName } from "src/model/sorting/character-sorting-strategy-by-last-name";
import { EntityState } from "src/model/shared/entity-wrapper";
import { INJECTION_TOKENS } from "src/model/shared/tokens";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const initialState = {
    characters: { state: EntityState.Pristine, value: null },
    houses: { state: EntityState.Pristine, value: null }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, RetryComponent, HouseTileComponent],
      imports: [RouterModule.forRoot([])],
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
