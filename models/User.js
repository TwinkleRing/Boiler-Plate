// User의 모델과 스키마 설정
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { JsonWebTokenError } = require('jsonwebtoken');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
// 정보들을 유저 모델을 저장하기 전에 실행해줌.
userSchema.pre('save', function( next ) {
    var user = this; // userSchema를 가리키게 됨.
    // 모델의 필드 중에 비밀번호를 바꿀때만 다시 암호화 해야 하므로 조건을 걸어준다.

    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) { // salt 만들기 , 콜백펑션으로 에러나면 err 리턴, salt 제대로 생성하면 
            if (err) return next(err) ;
        
            bcrypt.hash( user.password , salt, function(err, hash)  { // 원래의 평문 비밀번호 가져오기
                if(err) return next(err) ;
                user.password = hash
                next();
                
            });
        });
    } else {
        next();
    }

    
});



userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword : 1234567 암호화된 비밀번호 : $2b$10$ka0.z58MtR6ZQH.N.7OiSuScVq2fl1Frskh9L9Pf2pCkK5xVgQFEW
    // 평문을 암호화해서 db에 있는 비밀번호와 같은지 비교한다.
    bcrypt.compare(plainPassword, this.password , function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}


userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken')


    user.token = token 
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

// auth의 미들웨어
userSchema.statics.findByToken = function(token , cb) {
    var user = this; // user 스키마
    // 가져온 토큰을 복호화한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id" : decoded, "token" : token}, function(err, user){
            if (err) return cb(err);
            console.log('user',user);
            cb(null, user)
        })
    })
}

// 유저 모델의 정보를 저장하기 전에(index.js에서 save 하기 전에) function을 준다.

const User = mongoose.model('User',userSchema)
// 이 유저를 다른 곳에서 사용할수 있게 exports
module.exports = { User }