import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HouseTileComponent } from "./house-tile.component";
import { HouseTileData } from "./house-tile-data";

describe("HouseTileComponent", () => {
  let component: HouseTileComponent;
  let fixture: ComponentFixture<HouseTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HouseTileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseTileComponent);
    component = fixture.componentInstance;
    component.house = new HouseTileData("", "", 0);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
