import React, { FormEvent, useRef } from 'react'
import { ContainStyle, LoginStyle } from './style'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const nameRef = useRef<HTMLInputElement|null>(null);
  const pswRef = useRef<HTMLInputElement|null>(null);
  const goPage = useNavigate();
  function submit(e:FormEvent){
    e.preventDefault();
    console.log(e);
    const name = nameRef.current?.value;
    const psw = pswRef.current?.value;
    if(!name){
      alert("请输入名称");
      return;
    }else if(!psw){
      alert("请输入口令");
      return;
    }
    const [realName, realPsw] = localStorage.getItem("token")!.split("_");
    if(realName === name && realPsw === psw){
      goPage("/home");
    }else if(realName !== name){
      alert("查无此人");
    }else{
      alert("请输入正确的口令");
    }
  }
  return (
    <LoginStyle>
      <ContainStyle>
        <form
          onSubmit={submit}
        >
          <label>
            <span>尊称：</span>
            <input type="text" ref={nameRef} maxLength={10}/>
          </label>
          <label>
            <span>口令：</span>
            <input type="password" ref={pswRef} maxLength={20} />
          </label>
          <button type="submit">提交</button>
        </form>
      </ContainStyle>
    </LoginStyle>
  )
}

export default Login
