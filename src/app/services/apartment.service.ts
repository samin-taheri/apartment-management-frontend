import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
  id: number;
  amount: number;
  due_date: string;
  paid: boolean;
}

export interface Flat {
  id?: number;
  name: string;
  type: string;
  furnished: boolean;
  facilities: string | string[];
  street: string;
  city: string;
  user?: {
    username: string;
  };
  payments?: Payment[];
}

export interface AppUser {
  id?: number;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  block?: string;
  doorNumber?: string;
  role: 'ADMIN' | 'USER';
}

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  private loginUrl = 'http://localhost:8080/authenticate';
  private apiUrl = 'http://localhost:8080/flat';
  private apiUrl2 = 'http://localhost:8080/api';
  private apiUrl3 = 'http://localhost:8080/api/users';
  private apiUrl4 = 'http://localhost:8080/api/announcements';
  private apiUrl5 = 'http://localhost:8080/api/payments/by-user';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllFlats(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiUrl}/getAllFlats`, {
      headers: this.getAuthHeaders(),
    });
  }

  getFlatById(id: number): Observable<Flat> {
    return this.http.get<Flat>(`${this.apiUrl}/load/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createFlat(flat: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, flat, {
      headers: this.getAuthHeaders(),
    });
  }

  updateFlat(id: number, flat: Flat): Observable<Flat> {
    return this.http.put<Flat>(`${this.apiUrl}/update/${id}`, flat, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteFlat(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  getDebtorFlats(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiUrl}/debtors`);
  }

  acceptPayment(paymentId: number): Observable<string> {
    return this.http.put(`${this.apiUrl2}/payments/${paymentId}/accept`, null, {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  createExpense(expense: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}/expenses`, expense, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/expenses`, {
      headers: this.getAuthHeaders(),
    });
  }

  getExpenseSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/expenses/summary`, {
      headers: this.getAuthHeaders(),
    });
  }

  getIncome(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl2}/expenses/income`, {
      headers: this.getAuthHeaders(),
    });
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}/payments`, payment, {
      headers: this.getAuthHeaders(),
    });
  }

  generateMonthlyDues(): Observable<string> {
    return this.http.post(
      `${this.apiUrl2}/dues/generate`,
      {},
      {
        headers: this.getAuthHeaders(),
        responseType: 'text',
      }
    );
  }

  getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiUrl3}/all`);
  }

  getAdmins(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiUrl3}/admins`);
  }

  getRegularUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiUrl3}/regular-users`);
  }

  registerUser(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.apiUrl3}/register`, user, {
      responseType: 'text' as 'json',
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/username/${username}`);
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl3}/${id}`, {
      responseType: 'text',
    });
  }

  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl4);
  }

  postAnnouncement(message: string): Observable<any> {
    return this.http.post(this.apiUrl4, message, { responseType: 'json' });
  }

  getPaymentsByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl5}/${username}`);
  }

  login(
    username: string,
    password: string
  ): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.loginUrl}`, {
      username,
      password,
    });
  }
}
