import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Usercred } from '../../Store/Model/User.model';
import { beginLogin } from '../../Store/User/User.action';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
   imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatFormField,
    MatButtonModule,
    RouterModule,
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private builder: FormBuilder, private store: Store) {

  }
  ngOnInit(): void {
   localStorage.clear();
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  Proceedlogin() {
    if (this.loginform.valid) {
      const _obj: Usercred = {
        username: this.loginform.value.username as string,
        password: this.loginform.value.password as string
      }
      this.store.dispatch(beginLogin({ usercred: _obj }))
    }
  }

  resetlogin() {
    this.loginform.reset();
  }

}