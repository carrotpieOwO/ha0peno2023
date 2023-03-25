import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import like from "../img/like.gif"
import sad from "../img/sad.gif"

const Input = styled.input`
    border: 1px solid #8583ff;
    border-radius: 1em;
    padding: 10px;
    max-width: 100%;
    margin: 0.5em 0;
`
const TextArea = styled.textarea`
    height: 7em;
    border: 1px solid #8583ff;
    border-radius: 1em;
    padding: 10px;
    max-width: 100%;
    margin: 0.5em 0;
`
const Button = styled.button`
    border-radius: 1em;
    border: ${props => props.type === 'submit' ? 'none' : '1px solid #8583ff'};
    padding: 10px;
    background: ${props => props.type === 'submit' ? '#8583ff' : '#fff' };
    color: ${props => props.type === 'submit' ? '#fff' : '#8583ff' };
    margin-top: 1em;
`
export default function EmailForm (props) {
    const [ status, setStatus ] = useState('form');
    
    const form = useRef();
    
    const handleSubmit = (e) => {
      e.preventDefault();

      emailjs.sendForm('ha0peno', 'ha0peno_template', form.current, process.env.REACT_APP_PUBLIC_KEY)
        .then(result => {
            setStatus('success')
            props.triggerNextStep({ value: "email-success", skip: false });
        }, 
        error => {
            setStatus('fail')
            props.triggerNextStep({ value: "email-fail", skip: false });
        });
    };
  
    const cancel = (e) => {
        e.preventDefault();

        setStatus('cancel')
        props.triggerNextStep({ value: "email-cancel", skip: false });
    }

    return (
        status === 'form' ? 
        <form onSubmit={handleSubmit} ref={form} style={{display: 'grid', width: '100%'}}>
            <label htmlFor="name">이름</label>
            <Input id="name" type="text" name="user_name" placeholder="이름을 기입하세요" required />
            <label htmlFor="email">이메일</label>
            <Input id="email" type="email" name="user_email" placeholder="이메일 주소를 알려주세요" required />
            <label htmlFor="content">내용</label>
            <TextArea id="content" name="message" placeholder="궁금하신 점이나 하고싶은 말을 적어주세요" required />
            <Button type="submit">전송 🚀</Button>
            <Button type="button" onClick={cancel}>취소</Button>
        </form>
        :  status === 'success' ? 
        <div style={{display: 'grid', justifyContent:'center', width: '100%'}}>
            <img src={like} alt="success" />
            전송완료!
        </div>
        :
        <div style={{display: 'grid', justifyContent:'center', width: '100%'}}>
            <img src={sad} alt="success" />
        </div>
    );
}