import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private reqPath: string = "";

  constructor(private httpClient: HttpClient) {
    this.reqPath = environment.apiBaseUrl + "Accounts";
  }

  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.reqPath + "/all");
    // return this.httpClient.get<Account[]>(`${this.reqPath}/all`);
  }
}
