import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { UsernameValidator } from "../validators/username.validator";
import { PasswordValidator } from "../validators/password.validator";
import { INJECTION_TOKENS } from "src/model/shared/tokens";
import { AuthenticationService } from "src/model/services/auth.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerMock: Router = <any>{
    navigateByUrl: jasmine.createSpy("navigateByUrl", (url: string) => {})
  };
  let returnUrl: string = "return/url";
  let activatedRoute: ActivatedRoute = <any>{
    snapshot: { queryParams: { returnUrl: returnUrl } }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: INJECTION_TOKENS.ValidatorsLoginUsernameSync,
          useClass: UsernameValidator,
          multi: true
        },
        {
          provide: INJECTION_TOKENS.ValidatorsLoginPasswordSync,
          useClass: PasswordValidator,
          multi: true
        },
        AuthenticationService,
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
