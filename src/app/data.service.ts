import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class DataService {
  // error = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log(environment)
  }
  // Credentials DB
  getAllAccounts() {
    return this.http.get(`http://localhost:3000/auth/accs`);
  }

  login(data) {
    return this.http.post(`http://localhost:3000/auth/login`, data);
  }

  register(data) {
    return this.http.post(`http://localhost:3000/auth/register`, data);
  }

  mfa() {
    return this.http.get(`http://localhost:3000/auth/mfa`);
  }

  getAccountLogs() {
    return this.http.get(`http://localhost:3000/auth/acc/logs`);
  }

  activateAccount(data) {
    return this.http.post(`http://localhost:3000/auth/acc/act`, data);
  }

  deactivateAccount(data) {
    return this.http.post(`http://localhost:3000/acc/deact`, data);
  }

  // Records DB
  recordRegister(data) {
    return this.http.post(`http://localhost:3000/records/reg`, data);
  }

  getProfile() {
    return this.http.get(`http://localhost:3000/records/profile`);
  }

  uploadCovidTest(data) {
    return this.http.post(`http://localhost:3000/records/upload_test`, data);
  }

  getCovidTest() {
    return this.http.get(`http://localhost:3000/records/test_history`);
  }

  uploadHealthDeclaration(data) {
    return this.http.post(`http://localhost:3000/records/upload_declaration`, data);
  }

  getHealthDeclarationHistory() {
    return this.http.get(`http://localhost:3000/records/declaration_history`);
  }

  getRecordLogs() {
    return this.http.get(`http://localhost:3000/records/record_logs`);
  }

  uploadVaccinationStatus(data) {
    return this.http.post(`http://localhost:3000/records/upload_vaccination`, data);
  }

  getVaccinationStatus(data) {
    return this.http.post(`http://localhost:3000/records/vaccination_history`, data);
  }

  getCovidDashboard() {
    return this.http.get(`http://localhost:3000/records/covid_dashboard`);
  }

  // Check authentication
  isAuthenticated() {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = helper.decodeToken(token);
      const isExpired = helper.isTokenExpired(token);
      return !!decodedToken && !isExpired;
    }
    catch (ex) {
      return false;
    }
  }
}