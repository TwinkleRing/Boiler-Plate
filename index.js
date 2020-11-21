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
// id : hun , password : password

// mongodb+srv://hun:<password>@boilerplate.oevwc.mongodb.net/<dbname>?retryWrites=true&w=majority

// 몽구스 : 몽고db를 편하게 사용하게 해주는 툴

// user model, user schema 
// model은 스키마를 감싸주는 역할을 하는 것
// 스키마는 어떤 상품에 관련된 글을 작성한다면 , 글을 작성하는 사람이 누구인지, 그 포스트의 이름이 무엇인지, 
// 그리고 타입은 무엇이고 길이는 얼마까지인지 지정해주는 것이 스키마로 하는 일

// #5 . git 설치
// 분산 버전 관리 시스템 , git --version

// git 저장소 만들기 : git init
// git status
// git add .
// 1. working directory => 2. Staging Area => 3. Git repository (Local) => 4. Git repository (Remote)

// git ignore

// git commit -m " 쓰고 싶은 메세지 "

// #6 . github 연결 (ssh로 github 연결하기)

// ssh 설정하기

// https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account
