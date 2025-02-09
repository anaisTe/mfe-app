import { NgFor, NgIf } from '@angular/common';
import { Component, inject, model, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '../../core/models/users.interface';
import { UsersService } from '../../core/services/users.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditUserComponent } from '../../components/dialog/edit-user/edit-user.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-mfe-users-home',
  standalone: true,
  imports: [
    MatCardModule,
    NgFor, 
    NgIf, 
    NgxSkeletonLoaderModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatDialogModule,
    SweetAlert2Module
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeMfeComponent implements OnInit, OnDestroy {
  ItemsList: IUser[] = [];
  userListBd!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage:number = 1; //pagination
  totalItems:number = 0; //pagination
  totalPages:number = 1; //pagination
  pageSize:number = 6; //pagination

  constructor(
    public dialog: MatDialog,
    private _showUserList: UsersService
  ) { }

  ngOnInit() {
    this.loadPageUser(this.currentPage);

    this._showUserList.users$.subscribe(users => {
      this.ItemsList = users;
    });
  }

  loadPageUser(page:number) {
    this.userListBd = this._showUserList.getUsers(page, this.pageSize)
    .subscribe({
      next: (res) => {
        this.ItemsList = res.data;
        this.totalItems = res.total;
        this.totalPages = res.total_pages;
        if (this.paginator) {
          this.paginator.pageIndex = page - 1;
        }
      },
      error:(err) => {
        console.warn(err);
      }
    })
  }


  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadPageUser(this.currentPage);
  }

  newUserDialog() {
    this.dialog.open(EditUserComponent, {
      data: {
        dialogHeader: 'Nuevo usuario',
        cancelButtonLabel: 'Cancelar', 
        confirmButtonLabel: 'Guardar'
      }
    }).afterClosed().pipe(take(1)).subscribe({
        next: (value) => {
          value.id = this.ItemsList.map(ele => ele.id + 1 ).pop();
            
          this.ItemsList = [...this.ItemsList, value];

          this.totalItems++;
        }
      })
  }

  openEditDialog(editingUser: IUser) {
    this.dialog.open(EditUserComponent, {
      data: {
        dialogHeader: 'Editar alumno',
        cancelButtonLabel: 'Cancelar', 
        confirmButtonLabel: 'Actualizar',
        dataForm: editingUser
      },
      width:'450px'
    }).afterClosed().subscribe({
      next: (res) => {
          if(editingUser) {
            this.ItemsList = this.ItemsList.map( ele =>
              ele.id === editingUser.id ? { ...ele, ...res } : ele
            );
          }
        }
      });
  }

  deleteUser(id: number) {
    const dato = this.ItemsList.filter(ele => ele.id === id ).map(ele => ele.first_name);

    Swal.fire({
      title: '¿Está seguro?',
      text: `El usuario ${ dato } será eliminado`,
      icon: 'warning',
      confirmButtonColor: '#006a6a',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          icon: "success",
          confirmButtonColor: '#006a6a',
          confirmButtonText: 'Aceptar',
        });
        
        this.ItemsList = this.ItemsList.filter( ele => ele.id != id);
        this.totalItems--;
      }
    })

  }

  ngOnDestroy(): void {
    this.userListBd.unsubscribe();
  }
}
