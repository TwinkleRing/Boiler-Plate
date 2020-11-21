

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


