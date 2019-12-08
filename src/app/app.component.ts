import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { IStoreState } from "../model/store/state";
import { Store } from "@ngrx/store";
import { InitApplicationAction } from 'src/model/store/actions/app.actions';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title: string = "Newshore MSE solution";

  constructor(private store: Store<IStoreState>) {}

  ngOnInit(): void {
    this.store.dispatch(new InitApplicationAction());
  }
}
