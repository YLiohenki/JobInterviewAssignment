import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../shared/tokens";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor() {}

  public getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser));
  }

  public login(username: string, password: string) {
    localStorage.setItem(
      STORAGE_KEYS.currentUser,
      JSON.stringify({ username: username, password: password })
    );
  }
}
