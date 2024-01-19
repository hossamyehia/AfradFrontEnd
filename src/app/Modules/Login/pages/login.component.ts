import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  msgType?: boolean;
  msgShow = false;
  msgContent?: string;

  constructor(private api: ApiService, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(){
    this.api.post("user/login", this.loginForm.value)
    .subscribe({
      next: ( res: ApiResponse ) => {
        this.auth.tokenSetter(res["Data"][0]);
        this.msgStart("Login  Success", true);
        this.router.navigate(['/dashboard']);
      },
      error: (err)=> {
        this.msgStart(err.Message, false);
      }
    })
  }

  msgStart(msg: string, type: boolean){
    this.msgType = type;
    this.msgShow = true;
    this.msgContent = msg;
  }

  msgDone(){
    this.msgType = undefined;
    this.msgShow = false;
    this.msgContent = undefined;
  }

}
