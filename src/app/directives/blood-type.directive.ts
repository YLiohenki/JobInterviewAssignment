import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ViewContainerRef
} from "@angular/core";

@Directive({
  selector: "[appBloodType]"
})
export class BloodTypeDirective implements OnChanges {
  private iconName: string = "";

  constructor(
    public viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  @Input("appBloodType") bloodType: string;

  public ngOnChanges(_changes: SimpleChanges) {}
}
