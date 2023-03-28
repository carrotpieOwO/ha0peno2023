import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import works from '../utils/works';
import arrowLeft from '../img/arrow-left.svg';
import arrowRight from '../img/arrow-right.svg';
import ProjectCard from '../components/ProjectCard';
import useSound from "use-sound";
import nextSound from '../sound/next.mp3';
import prevSound from '../sound/prev.mp3';
import pickSound from '../sound/pick.mp3'
import clickSound from '../sound/click.mp3';

const Container = styled(motion.div)`
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
`
const Title = styled(motion.div)`
    position: absolute;
    left: 200px;
    top: 130px;

    div {
        display: flex;
        align-items: center;
        gap: 30px;
    }
    hr {
        width: 40px;
        margin: 0px;
        border: 1px solid #fff;
    }
    h3 {
        color: #fff   
    }
    h1 {
        font-weight: normal;
    }
`
const Content = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
`

const SlideBtnWrap = styled.div`
    position: absolute;
    bottom: 200px;
    display: flex;
    width: 100vw;
    justify-content: center;
    gap: 30px;
    
`
const SlideBtn = styled(motion.button)`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #fff;
    :disabled {
        background-color: #a4aab5;
    }
`
const titleVariants = {
    fadeOut: {
        x: -150,
        opacity: 0
    },
    fadeIn: {
        x: 0,
        opacity: 1,
        transition: {
            duration: .5,
            type: 'spring',
            damping: 10
        }
    }
}

const cardWidth = 410; // card width + margin + padding


export default function Projects(props) {
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ left, setLeft ] = useState((windowWidth / 2 ) - (cardWidth / 2));
    const [ targetIndex, setTargetIndex ] = useState(0);
    const [ bgColor, setBgColor ] = useState('transparent');
    const [ nextPlay ] = useSound(nextSound);
    const [ prevPlay ] = useSound(prevSound);
    const [ pickPlay ] = useSound(pickSound);
    const [ clickPlay ] = useSound(clickSound);


    // window 사이즈 변경감지
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // window 사이즈가 변경될 경우, 선택된 카드를 화면의 중앙으로 맞춰준다.
    useEffect(() => {
        // 화면사이즈의 절반에서 선택된 카드의 이전 카드들의 width합에 현재카드 width반값을 더한 값을 빼준다.
        const left = (windowWidth / 2) - ((targetIndex) * cardWidth + (cardWidth/ 2))
        setLeft(left)
    }, [windowWidth])
    
    // slide에서 prev, next버튼 클릭 시 화면 이동
    const showNextSlide = () => {
        setLeft( prev => prev -= cardWidth)
        setTargetIndex( prev => prev += 1)
        nextPlay();
    };
    const showPrevSlide = () => {
        setLeft( prev => prev += cardWidth)
        setTargetIndex( prev => prev -= 1)
        prevPlay();
    };

    // 선택된 project가 아닌 card를 클릭 할 경우 해당 project를 선택한다.
    const selectItem = (newIndex) => {
        const leftPosition = (targetIndex - newIndex) * cardWidth;

        setTargetIndex(newIndex)
        setLeft( prev => prev + leftPosition)
        pickPlay();
    }

    // project card의 버튼 클릭
    const onClick = (link, item) => {
        clickPlay();
        if (link.type !== 'Detail') {
            // code, live view의 경우 해당 페이지로 이동
            window.open(link.url)
        } else {
            // detail일 경우 modal에 project데이터 셋팅
            props.setModal(true);
            props.setContent(item)
        }
    }

    // 선택된 project의 color값으로 배경색 변경
    useEffect(() => {
        setBgColor(works[targetIndex].color);
    }, [targetIndex])
    
    return (
        <Container id="project"  animate={{backgroundColor: bgColor, transition: {duration: .5} }}>
            <AnimatePresence>
            {
                props.progress > 0 &&
                <Title variants={titleVariants} initial='fadeOut' animate='fadeIn' exit='fadeOut'>
                    <div>
                        <hr />
                        <h3>projects</h3>
                    </div>
                    <h1>제가 한 작업들을 보여드릴게요! ✨ </h1>
                </Title>
            }
            </AnimatePresence>
            <Content>
                <ProjectCard left={left} targetIndex={targetIndex} selectItem={selectItem} onClick={onClick} />       
                <SlideBtnWrap>
                    <SlideBtn type="button" onClick={showPrevSlide} disabled={targetIndex === 0}>
                        <img src={arrowLeft} alt="prev" width='30px' />
                    </SlideBtn>
                    <SlideBtn type="button" onClick={showNextSlide} disabled={targetIndex === works.length-1}>
                        <img src={arrowRight} alt="next" width='30px' />
                    </SlideBtn>
                </SlideBtnWrap>
            </Content>
        </Container>
    )
}