import { AnimatePresence, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: ${ props => props.margin || 0 };
`
const Container = styled(CenterDiv)`
    height: 100vh;
    flex-direction: column;
`
const MouseWrapper = styled.div`
    position: fixed;
    top: 75vh;
    left: calc(50vw - 12px);
    text-align: center;
`
const Mouse = styled(CenterDiv)`
    width: 24px;
    height: 38px;
    border: 1px solid rgba(0, 0, 0, .3);
    border-radius: 12px;
`
const Wheel = styled(motion.div)`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-top: 6px;
    background-color: rgba(0, 0, 0, .3);
`
const Introduce = styled(motion.div)`
    width: 100vw;
    position: relative;
    top: 30vh;
    font-size: 2em;
`
const letterVariants = {
    start: (isScale) => ({
        opacity: 0, scale: isScale ? 0 : 1, transition: { duration: .7 }
    }),
    end: {
        opacity:1, scale: 1, transition: { duration: .7 }
    }
}
const heartVariants = {
    animate: {
        scale: [2, 2.5, 2.3], transition: { duration: 1, times: [0, 0.2, 1], repeat: Infinity, repeatType: "reverse" }
    }
}
const upDownVariants = {
    start: { 
        y: 15 
    },
    end: { 
        y: [15, 0], transition: { duration: 1, times: [0, 0.2], repeat: Infinity, repeatType: "reverse" }
    }
};
const shakeVariants = {
    animate: { 
        rotate: [-10, 60], transition: { repeat: Infinity, repeatType: "reverse", duration: .7 }
    }
}

export default function Home (props) {
    return (
        <Container id="home">
                <AnimatePresence>
                    {
                        props.progress === 0 &&
                        <>
                            <motion.div 
                                style={{width: '100vw'}}
                                variants={letterVariants} initial='start' animate='end' exit='start' custom={true}
                            >
                                <motion.div variants={heartVariants} animate='animate'>
                                    ❤️
                                </motion.div>
                                <h1>Welcome to my Portfolio Page!</h1>
                                <p>제 포트폴리오 페이지에 오신 것을 환영합니다 :)</p>
                            </motion.div>
                            <MouseWrapper>
                                <Mouse>
                                    <Wheel variants={upDownVariants} custom={0} initial='start' animate='end' />
                                </Mouse>
                            </MouseWrapper>
                        </>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        props.progress > 0 &&
                        <Introduce variants={letterVariants} initial='start' animate='end' exit='start' >
                            <CenterDiv margin='0 0 .5em 0'>
                                안녕하세요!&nbsp;
                                <motion.div 
                                    variants={shakeVariants}
                                    animate="animate">
                                    👋🏻
                                </motion.div> 
                            </CenterDiv>
                            <span>저는&nbsp;</span>
                            <TypeAnimation
                                style={{color:'#EF629F'}}
                                sequence={[
                                    '노력하는 개발자',
                                    1500,
                                    'Front End 개발자',
                                    1500,
                                    '사용자경험을 중요시하는',
                                    1500,
                                    '고민하는 개발자',
                                    1500,
                                    '고양이를 키우는',
                                    1500,
                                    '키보드를 좋아하는',
                                    1500,
                                    'INTP',
                                    1500,
                                ]}
                                repeat={Infinity}
                            />
                            <span>&nbsp;최하영입니다. :)</span>{' '}
                        </Introduce>
                    }
                </AnimatePresence>
            </Container>
    )
}