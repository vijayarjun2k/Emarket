import { Component } from '@angular/core';
import { FormBuilder,FormControlName,FormsModule,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Users } from '../../Store/Model/User.model';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { beginRegister, duplicateUser } from '../../Store/User/User.action';
import { showalert } from '../../Store/Common/App.Action';
import { isDuplicateUser } from '../../Store/User/User.Selectors';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatFormField,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private store:Store){

  }

  registerform = this.builder.group({
     username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
    gender: this.builder.control('male')
  })

   Proceedregister() {
    if (this.registerform.valid) {
      if (this.registerform.value.password === this.registerform.value.confirmpassword) {
        const _userobj: Users = {
          username: this.registerform.value.username as string,
          password: this.registerform.value.password as string,
          name: this.registerform.value.name as string,
          email: this.registerform.value.email as string,
          phone: this.registerform.value.phone as string,
          gender: this.registerform.value.gender as string,
          role: 'user',
          status: true
        }
        this.store.dispatch(beginRegister({userdata:_userobj}))

      } else{
          this.store.dispatch(showalert({message: 'Password mistach', resulttype: 'fail'}))
      }
    }
  }

  FunctionDuplicateUser() {
    const username = this.registerform.value.username as string;
    if (username != '') {
      this.store.dispatch(duplicateUser({ username: username }));
      this.store.select(isDuplicateUser).subscribe(item => {
        const isexist = item;
        if (isexist) {
          this.registerform.controls['username'].reset();
        }
      });
    }
  }

}
