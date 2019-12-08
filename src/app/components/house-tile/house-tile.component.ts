import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { HouseTileData } from "./house-tile-data";

@Component({
  selector: "app-house-tile",
  templateUrl: "./house-tile.component.html",
  styleUrls: ["./house-tile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseTileComponent implements OnInit {
  @Input() house: HouseTileData;

  constructor() {}

  ngOnInit() {}
}
