import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';


function RegisterPage(props) {
    const dispatch = useDispatch();

    // props state

    // state 만들기 
    const [Email, setEmail] = useState("") // 초기상태는 빈칸 ("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    
    const onsubmitHandler = (event) => {
        event.preventDefault(); // 안막아주면 계속 refresh 된다.abs
        // 서버에 보내고자 하는 값을 state에서 가지고 있다.
        // Axios를 써서 post (http 메서드)를 이용해서 보낸다.

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name : Name
        }

        // redux 사용.
        dispatch(registerUser(body)) //action 폴더
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
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

                <label>Name</label>
                <input type="name" value={Name} onChange={ onNameHandler } />

                <label>Password</label>
                <input type="password" value={Password} onChange={ onPasswordHandler } />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={ onConfirmPasswordHandler } />

                <br />

                <button type = "submit">
                    회원가입
                </button>

        
            </form>

        </div>
    )
}

export default withRouter(RegisterPage)

