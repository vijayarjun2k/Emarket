import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { Store } from '@ngrx/store';
import { addassociate, updateassociate } from '../../Store/Associate/Associate.Action';
import { getassociate } from '../../Store/Associate/Associate.Selectors';
import { Associates } from '../../Store/Model/Associates.model';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-addassociate',
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
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
  ],
  templateUrl: './addassociate.component.html',
  styleUrl: './addassociate.component.css'
})
export class AddassociateComponent implements OnInit {  
  title = 'Create a Product'
  isedit = false;
  dialogdata: any;

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(getassociate).subscribe(res => {
      this.associateform.setValue({
        id: res.id, name: res.name, email: res.email, phone: res.phone,
        address: res.address, group: res.associategroup, type: res.type, status: res.status
      })
    })
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
      const _obj: Associates = {
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
        this.store.dispatch(addassociate({ inputdata: _obj }))
      } else {
        this.store.dispatch(updateassociate({ inputdata: _obj }))
      }
      this.ClosePopup();
    }
  }
}
