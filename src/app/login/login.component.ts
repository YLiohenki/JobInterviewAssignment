import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";
import { AuthenticationService } from "src/model/services/auth.service";
import { FormGroup, FormControl } from "@angular/forms";
import { INJECTION_TOKENS } from "src/model/shared/tokens";
import { IValidator } from "../validators/i-validator";
import { VALIDATION_ERROR_CODES } from "../../model/shared/tokens";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public validationErrorCodes: any = VALIDATION_ERROR_CODES;

  constructor(
    private authenticationService: AuthenticationService,
    @Inject(INJECTION_TOKENS.ValidatorsLoginPasswordSync)
    public passwordValidators: IValidator[],
    @Inject(INJECTION_TOKENS.ValidatorsLoginUsernameSync)
    public usernameValidators: IValidator[],
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(
        "",
        this.usernameValidators.map((validator: IValidator) =>
          validator.getValidatorFn()
        )
      ),
      password: new FormControl(
        "",
        this.passwordValidators.map((validator: IValidator) =>
          validator.getValidatorFn()
        )
      )
    });
  }

  public login() {
    if (this.loginForm.valid) {
      this.authenticationService.login(
        this.loginForm.get("username").value,
        this.loginForm.get("password").value
      );
      let returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

      this.router.navigateByUrl(returnUrl);
    }
  }

  public get username() {
    return this.loginForm.get("username");
  }

  public get password() {
    return this.loginForm.get("password");
  }
}
