import express from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';

const TokenKey = "dcincmDJ#$^@9"

const app = express()
const port = 3000

const users = [{
    email:"fidosh",
    role:"user",
    password:"fidosh"

}]

app.use(express.json())


app.get('/users', (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({message:"Unauth"})
    }
    var decoded = jwt.verify(token,TokenKey);
    res.send(users)
  }

   catch (error) {
    return res.status(401).json({message:error})
  }
})

app.get('/users', (req, res) => {
    res.send('Hello World!')
  })
  
  app.post('/login', (req, res) => {
   try {
    const {email,password} = req.body
    const isUserYoxla = users.find(x=>x.email === email)
    if (!isUserYoxla) {
        return res.status(404).json("email yoxdur")
        
    }
    if (isUserYoxla.password !== password) {
        return res.status(401).json("password sehvdir")
        
    }
    var token = jwt.sign({id:isUserYoxla.id,email:isUserYoxla.email,role:isUserYoxla.role}, TokenKey,{ expiresIn: '1h' });
  res.status(200).json({token})
   } catch (error) {
    res.status(400).json({message:error})
   }
  })
  app.post('/register', (req, res) => {
  
     const {email,password} = req.body
     const isUserYoxla = users.find(x=>x.email === email)
     if (isUserYoxla) {
         return res.status(400).json("basga email daxil et")
         
     }
     users.push({id:uuidv4(),email,password,role:"user"})
     res.send("user yarandi")
    })
 
  
  app.put('/users', (req, res) => {
    res.send('Got a PUT request at /user')
  })
  
  app.delete('/users', (req, res) => {
    res.send('Got a DELETE request at /user')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})