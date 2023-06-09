import ChatBot from 'react-simple-chatbot';
import avatar from '../img/icon.png';
import chatMsg from "../utils/chatMsg";
import icon from '../img/icon.png'
import { useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import useSound from 'use-sound';
import ung from '../sound/ung.mp3';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'NEXON Lv2 Gothic',
    headerBgColor: '#876ef5',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#876ef5',
    botFontColor: '#fff',
    userBubbleColor: '#d7d5ff',
    userFontColor: '#4a4a4a',
};

export default function Chat() {
    const bot = useRef();
    
    const handleEnd = () => {
        setTimeout(() => {
            bot.current.toggleChatBot()    
        }, 500);
    };

    const [play] = useSound(ung);
    
    const [opend, setOpend] = useState(false);
    const onMouseEnter = () => {
        !opend && play()
    }
      
    return (
        <div onClick={onMouseEnter}>
            <ThemeProvider theme={theme}>
                <ChatBot
                    ref={bot}
                    botAvatar={avatar}
                    style={{ position:'absolute', bottom:'1.5em', right:'1.5em'}}
                    steps={ chatMsg }
                    floating
                    headerTitle="Let's Talk❤️"
                    floatingIcon={<img src={icon} width="80%" alt="" />}
                    handleEnd={handleEnd}
                    placeholder={"채팅이 불가능한 채널입니다."}
                    toggleFloating={() => setOpend(!opend)}
                    opened={opend}
                />
            </ThemeProvider>
        </div>

    )
}