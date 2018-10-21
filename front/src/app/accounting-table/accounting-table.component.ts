import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AccoutningTableService } from './accounting-table.service';


@Component({
  selector: 'app-accounting-table',
  templateUrl: './accounting-table.component.html',
  styleUrls: ['./accounting-table.component.css']
})
export class AccountingTableComponent implements OnInit, DoCheck {

  constructor(private accountingSr: AccoutningTableService) { }

  accounts
  once = true

  debitSum = 0
  creditSum = 0

  editMode = this.accountingSr.editMode

  ngOnInit() {
    this.accountingSr.getAccounts().subscribe( (data) => {this.accounts = data })
    
    // setTimeout(
    //   this.accounts.data.map( (account) => {
    //     this.debitSum += account.debit
    //     this.creditSum += account.credit
    //   })
    //   ,2000
    // )
    
  }



 

  addRecord() {
    this.accountingSr.addRecord()
  }

  editToggle() {
    // let lastAccount = this.accounts.slice(-1)
    this.editMode = !this.editMode
    // this.debitSum += parseInt(lastAccount[0].debit) 
    // this.creditSum += parseInt(lastAccount[0].credit)
  }

  deleteRecord(account) {
    console.log(account)
    if(account.debit){
      this.debitSum -= parseInt(account.debit) 
    }
    if(account.credit){
      this.creditSum -= parseInt(account.credit) 
    }
    this.accountingSr.deleteRecord(account)
  }

  accountChanged(account) {
    this.debitSum = 0
    this.creditSum = 0

    this.accountingSr.accountChanged(account)

    this.accounts.map( (account) => {
      console.log(this.debitSum)
      this.debitSum += parseInt(account.debit)
      this.creditSum += parseInt(account.credit)
    })

  }

  deleteLink(account){
    return `http://localhost:3000/deleteaccount/${account.id}`
  }

  ngDoCheck(){

    if(this.once == true){
      setTimeout(
        this.accounts.map( (account) => {
          this.debitSum += account.debit
          this.creditSum += account.credit
        })
        ,2000
      )
    }
    this.once = false

    
    //   console.log('last account -->', lastAccount)
    //   // this.accounts.map( (account) => {
    //   //   if(lastAccount){
    //   //     this.debitSum += lastAccount.debit
    //   //     this.creditSum += lastAccount.credit
    //   //   }
    //   // })
    }

}
