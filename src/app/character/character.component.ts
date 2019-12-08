import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from "@angular/core";
import { CharacterFacadeService } from "./character-facade.service";
import { CharacterFormData } from "./character-form-data";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EntityWrapper, EntityState } from "src/model/shared/entity-wrapper";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CharacterFacadeService]
})
export class CharacterComponent implements OnInit, OnDestroy {
  public characterFormData: CharacterFormData;
  public characterForm: FormGroup;
  public loadingError: boolean = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private characterFacadeService: CharacterFacadeService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.characterFacadeService
      .getCharacterFormData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (characterFormDataWrapper: EntityWrapper<CharacterFormData>) => {
          if (characterFormDataWrapper.state === EntityState.Failed) {
            this.loadingError = true;
            this.characterFormData = null;
            return;
          }
          this.loadingError = false;
          this.characterFormData = characterFormDataWrapper.value;
          this.characterForm = this.createFormData(this.characterFormData);
          this.ref.detectChanges();
        }
      );
  }

  public retry(): void {
    this.characterFacadeService.retryInit();
  }

  private createFormData(character: CharacterFormData): FormGroup {
    let group: any = {};
    if (character != null) {
      Object.keys(character).forEach((key: string) => {
        group[key] = [character[key]];
      });
      return this.formBuilder.group(group);
    } else {
      return this.formBuilder.group({});
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
