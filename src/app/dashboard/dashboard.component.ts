import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { DashboardFacadeService } from "./dashboard-facade.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { EntityWrapper, EntityState } from "src/model/shared/entity-wrapper";
import { HouseTileData } from "../components/house-tile/house-tile-data";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  public houseTileDataList: HouseTileData[] = null;
  public loadingError: boolean = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dashboardFacadeService: DashboardFacadeService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dashboardFacadeService
      .getHousesTileDataList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((houses: EntityWrapper<HouseTileData[]>) => {
        if (houses.state === EntityState.Failed) {
          this.loadingError = true;
        } else {
          this.loadingError = false;
        }
        if (houses.state === EntityState.Success) {
          this.houseTileDataList = houses.value;
        }
        this.ref.detectChanges();
      });
  }

  public retry() {
    this.dashboardFacadeService.retryInit();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
