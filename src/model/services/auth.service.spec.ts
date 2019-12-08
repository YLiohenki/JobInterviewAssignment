import { AuthenticationService } from "./auth.service";
import { STORAGE_KEYS } from "../shared/tokens";

describe("AuthService", () => {
  let service: AuthenticationService;

  beforeEach(() => {
    service = new AuthenticationService();
  });

  beforeEach(() => {});

  it("should return correct user", () => {
    spyOn(localStorage, "getItem").and.returnValue(
      '{"username":"bob","password":"bob1"}'
    );
    let user: any = service.getCurrentUser();
    expect(user.username).toEqual("bob");
    expect(user.password).toEqual("bob1");
  });

  it("should call set item on login", () => {
    spyOn(localStorage, "setItem");
    service.login("user", "pass");
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.currentUser,
      '{"username":"user","password":"pass"}'
    );
  });
});
