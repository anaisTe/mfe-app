import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUser, IUserDialog } from '../../../core/models/users.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { FormFieldValidationErrorsPipe } from '../../../pipes/form-validation-error.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mfe-users-edit-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    FormFieldValidationErrorsPipe,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  constructor(
    private matDialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: IUserDialog
  ) {
    matDialogRef.disableClose = true;

    if (this.data?.dataForm) {
      this.userForm.patchValue(this.data?.dataForm);
    }
  }

  userForm = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
    ])
  });

  get firstNameControl() {
    return this.userForm.get('first_name');
  }

  get lastNameControl() {
    return this.userForm.get('last_name');
  }

  get emailControl() {
    return this.userForm.get('email');
  }


  update() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    }
     else {
      this.matDialogRef.close(this.userForm.value);

      Swal.fire({
        title: 'Guardado',
        icon: 'success',
        confirmButtonColor: '#006a6a',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
