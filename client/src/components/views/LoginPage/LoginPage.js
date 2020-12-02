import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    // props state

    // state 만들기 
    const [Email, setEmail] = useState("") // 초기상태는 빈칸 ("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)

    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    
    const onsubmitHandler = (event) => {
        event.preventDefault(); // 안막아주면 계속 refresh 된다.abs
        // 서버에 보내고자 하는 값을 state에서 가지고 있다.
        // Axios를 써서 post (http 메서드)를 이용해서 보낸다.

        let body = {
            email: Email,
            password: Password
        }
        // redux 사용.
        dispatch(loginUser(body)) // action 폴더
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error˝')
                }
            })

        
    }
    
    return (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center'
        , width :'100%', height:'100vh'
        }}>

            <form style ={{ display:'flex', flexDirection: 'column' }}
                onSubmit={ onsubmitHandler }
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={ onEmailHandler } />
                <label>Password</label>
                <input type="password" value={Password} onChange={ onPasswordHandler } />

                <br />
                <button type = "submit">
                    Login
                </button>

        
            </form>

        </div>
    )
}

export default withRouter(LoginPage)