import { Injectable } from '@angular/core';

export interface User {
  id: string;
  name: string;
  token: string;
  CRM?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public login(user: User) {
    window.sessionStorage.setItem('id', user.id);
    window.sessionStorage.setItem('token', user.token);
    window.sessionStorage.setItem('name', user.name);
    window.sessionStorage.setItem('crm', user.CRM || '');
  }

  public validateUserLogged(): string {
    if (window.sessionStorage.getItem('crm') !== '') {
      return 'doctor';
    } else {
      return 'patient';
    }
  }

  public logout() {
    window.sessionStorage.clear();
  }

  public getUserLogged(): any {
    return window.sessionStorage;
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
