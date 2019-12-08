import { NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { HouseComponent } from "./house/house.component";
import { CharacterComponent } from "./character/character.component";
import { ROUTE_PARAM_NAMES } from "src/model/shared/tokens";
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: `houses/:${ROUTE_PARAM_NAMES.houseId}`,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: HouseComponent
      },
      {
        path: `characters/:${ROUTE_PARAM_NAMES.characterId}`,
        component: CharacterComponent
      }
    ]
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" }
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
