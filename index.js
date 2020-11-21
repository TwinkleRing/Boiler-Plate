// 백엔드 시작점

// express js 설치

// npm install express --save

// node_modules 안에 내가 다운 받은 라이브러리들이 있다.

const express = require('express') // 다운받은 express 가져옴
const app = express() // 새로운 express 앱 만들기
const port = 5000 // 포트는 아무거나 상관없다.
const bodyParser = require("body-parser");
const { User }  = require("./models/User");
// application/x-www-form-urlencoded 가져오기
app.use(bodyParser.urlencoded({extended: true})); 
// application/json 가져오기
app.use(bodyParser.json());

// mongoose 
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://hun:dudgns941!@boilerplate.oevwc.mongodb.net/BoilerPlate?retryWrites=true&w=majority', {
    useNewUrlParser : true, useUnifiedTopology: true , useCreateIndex : true, useFindAndModify : false
    // 에러 안뜨게 함
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('안녕하세요 ~ !'))

app.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면 
    // 그것들을 데이터베이스에 넣어준다.

    
    //bodyparser로 client에서 보내주는 정보를 받는다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success : false ,  err })
        return res.status(200).json({
            success : true
        }) // 성공
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

