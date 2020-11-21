// User의 모델과 스키마 설정
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50

    },
    email :{
        type : String,
        trim :true, // 공백 제거해주는 trim
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastanme : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token :{
        type : String
    },
    tokenExp : { // 토큰 사용할수 있는 기간
        type : Number
    }
})

const User = mongoose.model('User',userSchema)
// 이 유저를 다른 곳에서 사용할수 있게 exports
module.exports = { User }