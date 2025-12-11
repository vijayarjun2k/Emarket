import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { Roles, Userinfo } from '../../Store/Model/User.model';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getroles, getuserbycode, updateuserrole } from '../../Store/User/User.action';
import { getallroles, getUserbycode } from '../../Store/User/User.Selectors';
import { MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-rolepopup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormField,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatOption,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatListModule,
    MatInputModule
   
],
  templateUrl: './rolepopup.component.html',
  styleUrl: './rolepopup.component.css'
})
export class RolepopupComponent implements OnInit {
  rolelist!: Roles[]
  userinfo!: Userinfo;
  constructor(private builder: FormBuilder, private store: Store, private ref: MatDialogRef<RolepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.store.dispatch(getroles())
    this.store.select(getallroles).subscribe(item => {
      this.rolelist = item;
    })
    if (this.data != null) {
      this.store.dispatch(getuserbycode({ username: this.data.code }))
      this.store.select(getUserbycode).subscribe(item => {
        this.userinfo = item;
        this.roleform.setValue({
          username: this.userinfo.username,
          role: this.userinfo.role,
          id: this.userinfo.id
        })
      })
    }
  }

  roleform = this.builder.group({
    id: this.builder.control(0),
    username: this.builder.control({ value: '', disabled: true }),
    role: this.builder.control('', Validators.required)
  });

  Saveuserrole() {
    if (this.roleform.valid) {
       this.store.dispatch(updateuserrole({userrole:this.roleform.value.role as string,
        userid:this.roleform.value.id as number}))
        this.closepopup();
    }
  }

  closepopup() {
    this.ref.close();
  }


}
