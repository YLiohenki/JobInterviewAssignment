import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { HouseFacadeService } from "./house-facade.service";
import { Subject, combineLatest, BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EntityWrapper, EntityState } from "src/model/shared/entity-wrapper";
import { CharacterTileData } from "../components/character-tile/character-tile-data";
import { ISortingStrategy } from "../../model/sorting/i-sorting-strategy";
import { INJECTION_TOKENS } from "../../model/shared/tokens";

@Component({
  selector: "app-house",
  templateUrl: "./house.component.html",
  styleUrls: ["./house.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HouseFacadeService]
})
export class HouseComponent implements OnInit {
  public charactersTileDataList: CharacterTileData[] = null;
  public loadingError: boolean = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public nameFilter$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public sortinStrategy$: BehaviorSubject<
    ISortingStrategy<CharacterTileData>
  > = new BehaviorSubject<ISortingStrategy<CharacterTileData>>(null);
  public nameFilter: string = "";

  constructor(
    private houseFacadeService: HouseFacadeService,
    private ref: ChangeDetectorRef,
    @Inject(INJECTION_TOKENS.SortingStrategiesForCharacterTileData)
    public sortingStrategiesList: ISortingStrategy<CharacterTileData>[]
  ) {}

  ngOnInit() {
    combineLatest(this.nameFilter$, this.sortinStrategy$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([nameFilter, sortingStrategy]: [
          string,
          ISortingStrategy<CharacterTileData>
        ]) =>
          this.houseFacadeService
            .getCharactersTileDataList(nameFilter)
            .pipe(takeUntil(this.destroy$))
            .subscribe((characters: EntityWrapper<CharacterTileData[]>) => {
              if (characters.state === EntityState.Failed) {
                this.loadingError = true;
              } else {
                this.loadingError = false;
              }
              if (characters.state === EntityState.Success) {
                this.charactersTileDataList = characters.value;
                if (sortingStrategy != null) {
                  this.charactersTileDataList = this.charactersTileDataList.sort(
                    sortingStrategy.compare
                  );
                }
              }
              this.ref.detectChanges();
            })
      );
  }

  public nameFilterChange(nameFilter: string) {
    this.nameFilter$.next(nameFilter);
  }

  public changeSortingStrategy(strategy: ISortingStrategy<CharacterTileData>) {
    this.sortinStrategy$.next(strategy);
  }

  public retry() {
    this.houseFacadeService.retryInit();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
