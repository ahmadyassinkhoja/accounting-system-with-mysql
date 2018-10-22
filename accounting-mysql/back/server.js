const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const PORT= 3000

const mysql = require('mysql')

// Creating connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'accounting'
})

// Connect 
db.connect( (err) => {
    if(err){
        console.log(err)
    }
    console.log('MySql is connected')
})


// Creating DB
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE accounting'
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send('database created')
    })
})


// Creating a Table
app.get('/createaccountstable', (req,res) => {
    let sql = 'CREATE TABLE accounts(id int AUTO_INCREMENT, name VARCHAR(255), debit int, credit int, PRIMARY KEY (id) )' 
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send('accounts table created')
    })
})

// Insert account 1
app.get('/addaccount1', (req,res) => {
    let account = {
        name:'Cash',
        debit: 10000,
        credit: 0
    }
    let sql = 'INSERT INTO accounts SET?'
    let query = db.query(sql, account, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send('account 1 is created')
    })
})

// Insert account 2
app.get('/addaccount2', (req,res) => {
    let account = {
        name:'Account Recievable',
        debit: 2000,
        credit: 0
    }
    let sql = 'INSERT INTO accounts SET?'
    let query = db.query(sql, account, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send('account 2 is created')
    })
})


// Insert account 3
app.get('/addaccount3', (req,res) => {
    let account = {
        name:'Prepaid building rent',
        debit: 0,
        credit: 12000
      }
    let sql = 'INSERT INTO accounts SET?'
    let query = db.query(sql, account, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send('account 3 is created')
    })
})

let ids = 3;

const accounts = [
    {
      id: 0,
      name:'Cash',
      debit: 10000,
      credit: 0
    },
    {
      id:1,
      name:'Account Recievable',
      debit: 2000,
      credit: 0
    },
    {
      id:2,
      name:'Prepaid building rent',
      debit: 0,
      credit: 12000
    }
  ]

 // for parsing and delevering the json
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}) );

 // for google auth and allowing passing headers from server to app
 app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

  app.get('/', (req, res) => {
    res.send({
        msg: 'Welcome to Accounting Backend'
    })
})

// app.get('/accounts', (req,res) => {
//     res.send({data: accounts})
// })

// app.post('/addAccount', (req,res) => {
//     console.log(req.body)
//     res.setHeader("Content-Type", "text/html")
//     req.body.id = ids++;
//     accounts.push(req.body)
//     // console.log(accounts)
//     res.redirect('http://localhost:4200')
// })

// app.put('/editAccount/:id', (req,res) => {
//     console.log(req.body)
//     let account = req.body
//     let selectedAccount = accounts.find( (_account) => _account.id == account.id)
//     if(selectedAccount){
//         selectedAccount.credit = parseInt(account.credit)
//         selectedAccount.debit = parseInt(account.debit)
//     }
// })


app.all('/account/:id', (req,res) => {
    console.log('test delete-->',req.url)
    let url = req.url
    let urlSplit = url.split('/')
    let id = urlSplit[2]
    console.log('id-->',id)

    let account = accounts.find( (account) => account.id == id)
    let index = account.id
    console.log(index)

    console.log(accounts)
   
    accounts.splice(index , 1)

   res.redirect('http://localhost:4200')
})



// get accounts
app.get('/getaccounts', (req,res) => {
    let sql = 'SELECT * FROM accounts'
    let query = db.query(sql, (err, results) => {
        if(err){
            console.log(err)
        }
        console.log(results)
        res.send(results)
    })
})

// Insert account 
app.post('/addnewaccount', (req,res) => {
    // console.log('test --> ',req.body)
    // res.send(req.body)
    let account = {
        name: req.body.name,
        debit: req.body.debit,
        credit: req.body.credit
      }
    let sql = 'INSERT INTO accounts SET?'
    let query = db.query(sql, account, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.redirect('http://localhost:4200')
    })
})


// update account
app.put('/updateaccount/:id', (req,res) => {
    let account = req.body
    console.log(account)
    let sql = `UPDATE accounts SET name= '${account.name}', debit = ${account.debit}, credit= ${account.credit} WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send('updated succesfully')
    })
})

// Delete Account
app.delete('/deleteaccount/:id', (req,res) => {
    // let account = req.body
    // console.log(account)
    console.log('i m here',req.params.id)
    let sql = `DELETE FROM  accounts WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        res.redirect('http://localhost:4200')
    })
})



app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})