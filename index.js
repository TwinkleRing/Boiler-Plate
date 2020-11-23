const express = require('express') // 다운받은 express 가져옴
const app = express() // 새로운 express 앱 만들기
const port = 5000 // 포트는 아무거나 상관없다.
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User }  = require("./models/User");
const { auth } = require("./middleware/auth");

// 비밀 정보 관리
const db = require('./config/keys');


// application/x-www-form-urlencoded 가져오기
app.use(bodyParser.urlencoded({extended: true})); 
// application/json 가져오기
app.use(bodyParser.json());
app.use(cookieParser());

// mongoose 
const mongoose = require('mongoose');

mongoose.connect(db.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  }).then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

app.get('/', (req, res) => res.send('오늘은 11월 23일,   안녕하세요!'))

app.post('/api/users/register', (req, res) => {
    
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면 
    // 그것들을 데이터베이스에 넣어준다.
    //bodyparser로 client에서 보내주는 정보를 받는다.

    const user = new User(req.body)

    // mongoDB 메서드
    user.save((err, userInfo) => {
        if (err) return res.json({ success : false ,  err })
        return res.status(200).json({
            success : true // 성공
        }) 
    })
})


app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({ email : req.body.email }, (err, user) => {
        if(!user) {
            return res.json ({
                loginSuccess: false ,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword( req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess : false , message : "비밀번호가 틀렸습니다."})


             // 비밀번호 까지 맞다면 토큰 생성.    
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err)
                
                // 토큰을 저장한다. 어디에 ? 쿠키.. , 로컬스토리지... 여기서는 쿠키에 하자
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess : true , userId : user._id })


            });

        });

    });
   
});
// role 1 어드민 role 2 특정 부서 어드민
// role 0 -> 일반 유저 role 0이 아니면 관리자


// auth Router
// auth라는 미들웨어: req받아서 콜백펑션하기전에 중간에서 처리하는것.
// auth.js에서 user와 id를 req에 저장해놔서 바로 저렇게 밑에서 사용할수있는것.
// 이렇게 라우터를 만들어놓으면 어느페이지에서 user정보와 id를 가지고있어서 사용할수가있음.

app.get('/api/users/auth', auth , (req, res) => { // auth 미들웨어
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말.
    res.status(200).json({
        _id: req.user._id, // auth 미들웨어 통해 가져왔기 때문에 사용 가능
        isAdmin: req.user.role === 0 ? false : true, // role : 0 -> 일반유저
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
        
    });
});

app.get('/api/users/logout', auth, (req, res) => {

    User.findOneAndUpdate({ _id : req.user._id }, { token : "" }, (err, user) => {
        if (err) return res.json({ success : false , err });
        return res.status(200).send({
            success : true
        })
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))