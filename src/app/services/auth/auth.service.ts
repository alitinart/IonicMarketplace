import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { DataStorageService } from '../data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private dataStorage: DataStorageService
  ) {}

  signup(email: string, password: string) {
    const auth: Auth = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<User>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbLgX6EB0sc_Bz_k2Hjlr5rkXaoRYOcXY',
      auth
    );
  }

  login(email: string, password: string) {
    const auth: Auth = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<User>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbLgX6EB0sc_Bz_k2Hjlr5rkXaoRYOcXY',
      auth
    );
  }

  logout() {
    this.dataStorage.user.next(null);
  }
}
