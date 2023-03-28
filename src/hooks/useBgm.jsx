import { useEffect, useState } from "react";
import useSound from "use-sound";
import bgm from '../sound/bgm.mp3';
import woo from '../sound/woo.mp3';

let speechCount = 0;

export default function useBgm(setAnimation) {
    const [ bgmToggle, setBgmToggle ] = useState(false);
    const [ speech, setSpeech ] = useState('');
    const [ play ] = useSound(woo);
    const [ bgmPlay, {stop}] = useSound(bgm);
    
    const handleClick = () => {
        setAnimation('reacting')
        play();
        setBgmToggle(!bgmToggle);
    }

    const setDefault = () => {
        if (bgmToggle) {
            setSpeech('')
        } else if (speechCount === 0) {
            setSpeech('날 눌러서 음악을 틀어줘!')
            speechCount += 1;
        }
    }

    useEffect(() => { 
        if (bgmToggle) {
          setSpeech('')
          bgmPlay()
        } else {
          stop()
        }
    }, [bgmToggle])

    return { speech, handleClick, setDefault }
}