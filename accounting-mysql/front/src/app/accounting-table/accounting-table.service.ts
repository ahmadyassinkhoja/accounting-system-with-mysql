import { Injectable } from '@angular/core'

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AccoutningTableService {

  constructor(private http: HttpClient){

  }

  editMode = false
  accounts
  // accounts = [
  //     {
  //       name:'Cash',
  //       debit: 10000,
  //       credit: 0
  //     },
  //     {
  //       name:'Account Recievable',
  //       debit: 2000,
  //       credit: 0
  //     },
  //     {
  //       name:'Prepaid building rent',
  //       debit: 0,
  //       credit: 12000
  //     }
  //   ]

    getAccounts(){
      return this.http.get('http://localhost:3000/getaccounts')
      
      // return this.accounts 
    }

    addRecord() {
      this.editMode = true

      let newAccount = {
        name:'New Enrty',
        debit: 0,
        credit: 0
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };

      this.http.post('http://localhost:3000/addnewaccount',newAccount, httpOptions)
      .subscribe(data => {
        console.log(data);
      });
      this.getAccounts()
      // this.accounts.push(newAccount)
    }

    deleteRecord(account) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };

      this.http.delete(`http://localhost:3000/deleteaccount/${account.id}`,httpOptions)
      .subscribe(data => {
        console.log(data);
      });
      this.getAccounts()
      // let index = this.accounts.indexOf(account)
      // this.accounts.splice(index, 1)
    }


    accountChanged(account) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };

      this.http.put(`http://localhost:3000/updateaccount/${account.id}`,account, httpOptions)
      .subscribe(data => {
        console.log(data);
      });
    }
}