import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { addCUSTOMER, updateCUSTOMER } from '../../Store/Customer/Customer.Action';
import { getcustomer } from '../../Store/Customer/Customer.Selectors';
import { Customers } from '../../Store/Model/Customer.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from "@angular/material/select"
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from "@angular/material/checkbox"

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatFormField,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit {
  title = 'Create Customer'
  isedit = false;
  dialogdata: any;
  editcode!: number;
  editdata!: Customers;


  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddcustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.editcode = this.dialogdata.code;
    if (this.editcode > 0) {
      this.store.select(getcustomer(this.editcode)).subscribe(res => {
        this.editdata = res as Customers;
        this.associateform.setValue({
          id: this.editdata.id, name: this.editdata.name, email: this.editdata.email, phone: this.editdata.phone,
          address: this.editdata.address, group: this.editdata.associategroup, type: this.editdata.type, status: this.editdata.status
        })
      })
    }
  }

  ClosePopup() {
    this.ref.close();
  }



  associateform = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('CUSTOMER'),
    group: this.builder.control('level1'),
    status: this.builder.control(true)
  })

  SaveAssociate() {
    if (this.associateform.valid) {
      const _obj: Customers = {
        id: this.associateform.value.id as number,
        name: this.associateform.value.name as string,
        email: this.associateform.value.email as string,
        phone: this.associateform.value.phone as string,
        associategroup: this.associateform.value.group as string,
        address: this.associateform.value.address as string,
        type: this.associateform.value.type as string,
        status: this.associateform.value.status as boolean
      }
      if (_obj.id === 0) {
        this.store.dispatch(addCUSTOMER({ inputdata: _obj }))
      } else {
        this.store.dispatch(updateCUSTOMER({ inputdata: _obj }))
      }
      this.ClosePopup();
    }
  }

}
