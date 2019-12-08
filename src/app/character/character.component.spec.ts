import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CharacterComponent } from "./character.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RetryComponent } from "../components/retry/retry.component";
import { provideMockStore } from "@ngrx/store/testing";
import { EntityState } from "src/model/shared/entity-wrapper";

describe("CharacterComponent", () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  const initialState = {
    characters: { state: EntityState.Pristine, value: null },
    houses: { state: EntityState.Pristine, value: null }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterComponent, RetryComponent],
      imports: [RouterModule.forRoot([]), ReactiveFormsModule, FormsModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
