import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loginMode = true;
  error: string;
  loggedIn = false;
  user: User;
  address: string;
  phoneNumber: number;
  isAddress: boolean;
  isPhoneNumber: boolean;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm) {
    if (!this.loginMode) {
      this.authService.signup(form.value.email, form.value.password).subscribe(
        (user: User) => {
          console.log(user);
          this.dataStorage.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.user = user;
          window.location.reload();
        },
        (error) => {
          console.log(error);
          this.error = error.error.error.message;
          switch (this.error) {
            case 'EMAIL_EXISTS':
              alert('The email address is already in use by another account.');
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              alert(
                'We have blocked all requests from this device due to unusual activity. Try again later.'
              );
              break;
            default:
              console.log(this.error);
          }
        }
      );
    } else {
      this.authService.login(form.value.email, form.value.password).subscribe(
        (user: User) => {
          console.log(user);
          this.dataStorage.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.user = user;
          window.location.reload();
        },
        (error) => {
          console.log(error);
          this.error = error.error.error.message;
          switch (this.error) {
            case 'EMAIL_NOT_FOUND':
              alert(
                'There is no user record corresponding to this identifier. The user may have been deleted.'
              );
              break;
            case 'INVALID_PASSWORD':
              alert(
                'The password is invalid or the user does not have a password.'
              );
              break;
            case 'USER_DISABLED':
              alert('The user account has been disabled by an administrator.');
              break;
            case 'USER_DISABLED':
              alert('The user account has been disabled by an administrator.');
              break;
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
              alert(
                'Your password is too weak. Please use at least 6 characters for your password.'
              );
              break;
            default:
              console.log(this.error);
          }
        }
      );
    }
  }

  changeMode() {
    this.loginMode = !this.loginMode;
  }

  submitInfo() {
    this.user = {
      ...this.user,
      phoneNumber: this.phoneNumber,
      address: this.address,
    };
    this.dataStorage.user.next(this.user);
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(this.user));
  }

  logout() {
    localStorage.removeItem('userData');
    window.location.reload();
  }

  ngOnInit() {
    this.dataStorage.user.subscribe((user: User) => {
      if (user) {
        this.loggedIn = true;
        this.user = user;
      }
      if (user.address) {
        this.isAddress = true;
      }
      if (user.phoneNumber) {
        this.isPhoneNumber = true;
      }
    });
  }
}
