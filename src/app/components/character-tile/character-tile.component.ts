import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ComponentFactoryResolver,
  ViewChild
} from "@angular/core";
import { CharacterTileData } from "./character-tile-data";
import { MatIcon } from "@angular/material/icon";
import { BloodTypeDirective } from "src/app/directives/blood-type.directive";

@Component({
  selector: "app-character-tile",
  templateUrl: "./character-tile.component.html",
  styleUrls: ["./character-tile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterTileComponent implements OnInit {
  @Input() character: CharacterTileData;

  @ViewChild(BloodTypeDirective) bloodType: BloodTypeDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadIconComponent();
  }

  private loadIconComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      MatIcon
    );

    const viewContainerRef = this.bloodType.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance._elementRef.nativeElement.innerText = this.getIconName(
      this.character.bloodStatus
    );
    componentRef.instance._elementRef.nativeElement.classList.add(
      "blood-type-icon"
    );
  }

  private getIconName(bloodTypeName: string): string {
    switch (bloodTypeName) {
      case "quarter-villa":
        return "perm-identity";
      case "pure-blood":
        return "face";
      case "muggle":
        return "update";
      case "muggle-born":
        return "perm_contact_calendar";
      case "half-blood":
        return "android";
      case "unknown":
        return "account_circle";
      default:
        return "accessibility";
    }
  }
}
