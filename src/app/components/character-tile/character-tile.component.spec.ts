import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CharacterTileComponent } from "./character-tile.component";
import { BloodTypeDirective } from "src/app/directives/blood-type.directive";
import { NoYesPipe } from "src/app/pipes/boolean.pipe";
import { MatIconModule, MatIcon } from "@angular/material/icon";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { CharacterTileData } from "./character-tile-data";

describe("CharacterTileComponent", () => {
  let component: CharacterTileComponent;
  let fixture: ComponentFixture<CharacterTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterTileComponent, BloodTypeDirective, NoYesPipe],
      imports: [MatIconModule]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [MatIcon] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTileComponent);
    component = fixture.componentInstance;
    component.character = new CharacterTileData("", "", "", "", false);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
