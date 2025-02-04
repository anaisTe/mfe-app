import { Component, inject, model } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IUser } from '../../../core/models/users.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-mfe-users-edit-user',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  readonly dialogRef = inject(MatDialogRef<EditUserComponent>);
  readonly data = inject<IUser>(MAT_DIALOG_DATA);
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private _updateUser: UsersService
  ) {
    this.userForm = this.fb.group({
      first_name: [this.data.first_name, Validators.required],
      last_name: [this.data.last_name, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
    });
  }

  get first_name() {
    return this.userForm.get('first_name');
  }

  get last_name() {
    return this.userForm.get('last_name');
  }

  get email() {
    return this.userForm.get('email');
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter an email';
    }
    return this.email?.hasError('email') ? 'El correo ingresado no es valido' : '';
  }

  update() {
    if (this.userForm.valid) {
      const updatedUser: IUser = this.userForm.value;
      this._updateUser.updateUser(this.data.id, updatedUser).subscribe({
        next: (result) => {
          console.log('Usuario actualizado:', result);
          this.dialogRef.close(updatedUser);
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
