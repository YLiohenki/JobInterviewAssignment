import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-retry",
  templateUrl: "./retry.component.html",
  styleUrls: ["./retry.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RetryComponent implements OnInit {
  @Output() retry = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public retryClick() {
    this.retry.emit();
  }
}
