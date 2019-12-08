import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { provideMockStore } from "@ngrx/store/testing";
import { EntityState } from "src/model/shared/entity-wrapper";
import { IStoreState } from "src/model/store/state";
import { Store } from "@ngrx/store";
import { InitApplicationAction } from "src/model/store/actions/app.actions";
const initialState = {
  characters: { state: EntityState.Pristine, value: null },
  houses: { state: EntityState.Pristine, value: null }
};
let store: Store<IStoreState>;
let dispatchSpy;

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Newshore'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Newshore MSE solution");
  });

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to Newshore MSE solution!"
    );
  });

  it("should dispatch init application action", () => {
    dispatchSpy = spyOn(store, "dispatch");
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new InitApplicationAction());
  });
});
