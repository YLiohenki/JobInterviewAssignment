import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HouseComponent } from "./house/house.component";
import { CharacterComponent } from "./character/character.component";
import { LoginComponent } from "./login/login.component";
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { HousesService } from "src/model/services/houses.service";
import { CharactersService } from "src/model/services/characters.service";
import { appReducers } from "src/model/store/reducers";
import { HouseTileComponent } from "./components/house-tile/house-tile.component";
import { CharacterTileComponent } from "./components/character-tile/character-tile.component";
import { RetryComponent } from "./components/retry/retry.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { CharacterEffects } from "src/model/store/effects/character.effects";
import { HouseEffects } from "src/model/store/effects/house.effects";
import { DashboardFacadeService } from "./dashboard/dashboard-facade.service";
import { CharacterSortingStrategyByLastName } from "src/model/sorting/character-sorting-strategy-by-last-name";
import { CharacterSortingStrategyByName } from "src/model/sorting/character-sorting-strategy-by-name";
import { NoYesPipe } from "./pipes/boolean.pipe";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BloodTypeDirective } from "./directives/blood-type.directive";
import { MatIconModule, MatIcon } from "@angular/material/icon";
import { CharacterFacadeService } from "./character/character-facade.service";
import { INJECTION_TOKENS } from "src/model/shared/tokens";
import { AuthenticationService } from "src/model/services/auth.service";
import { AuthGuard } from './guards/auth.guard';
import { UsernameValidator } from './validators/username.validator';
import { PasswordValidator } from './validators/password.validator';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HouseComponent,
    CharacterComponent,
    LoginComponent,
    HouseTileComponent,
    CharacterTileComponent,
    RetryComponent,
    NoYesPipe,
    BloodTypeDirective
  ],
  entryComponents: [MatIcon],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([CharacterEffects, HouseEffects]),
    NoopAnimationsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    HousesService,
    CharactersService,
    DashboardFacadeService,
    {
      provide: INJECTION_TOKENS.SortingStrategiesForCharacterTileData,
      useClass: CharacterSortingStrategyByName,
      multi: true
    },
    {
      provide: INJECTION_TOKENS.SortingStrategiesForCharacterTileData,
      useClass: CharacterSortingStrategyByLastName,
      multi: true
    },
    CharacterFacadeService,
    AuthenticationService,
    AuthGuard,
    {
      provide: INJECTION_TOKENS.ValidatorsLoginUsernameSync,
      useClass: UsernameValidator,
      multi: true
    },
    {
      provide: INJECTION_TOKENS.ValidatorsLoginPasswordSync,
      useClass: PasswordValidator,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
