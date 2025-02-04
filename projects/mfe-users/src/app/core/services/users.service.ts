import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IData, IUser } from '../models/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URL = 'https://reqres.in/api/users';

  private http = inject(HttpClient);
  private usersSubject = new BehaviorSubject<IUser[]>([]);  // BehaviorSubject para manejar los usuarios
  public users$ = this.usersSubject.asObservable(); 

  getUsers(page: number,perPage: number):Observable<IData> {
    return this.http.get<IData>(`${this.API_URL}?page=${page}&per_page=${perPage}`);
  }

  updateUser(userId: number, updateUser:IUser):Observable<IData> {
    const url = `${this.API_URL}/${userId}`
    return this.http.put<IData>(url, updateUser)
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.API_URL}/${userId}`);
  }
}
