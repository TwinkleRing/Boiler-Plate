// 백엔드 시작점

// express js 설치

// npm install express --save

// node_modules 안에 내가 다운 받은 라이브러리들이 있다.


const express = require('express') // 다운받은 express 가져옴
const app = express() // 새로운 express 앱 만들기
const port = 5000 // 포트는 아무거나 상관없다.

// mongoose 
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hun:dudgns941!@boilerplate.oevwc.mongodb.net/BoilerPlate?retryWrites=true&w=majority', {
    useNewUrlParser : true, useUnifiedTopology: true , useCreateIndex : true, useFindAndModify : false
    // 에러 안뜨게 함
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/',(req,res) => res.send('안녕하세요 ~ !'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// 실행 : npm run start

// 몽고 DB 연결하기
// 1. 몽고 DB 사이트 접속 , 클러스터 만들기, 몽고db 유저 생성
// id : hun , password : dudgns941!

// mongodb+srv://hun:<password>@boilerplate.oevwc.mongodb.net/<dbname>?retryWrites=true&w=majority

// 몽구스 : 몽고db를 편하게 사용하게 해주는 툴

