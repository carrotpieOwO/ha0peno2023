import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import contactList from '../utils/contacts';
import hover from '../sound/hover.mp3';
import useSound from 'use-sound';

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        position: absolute;
        bottom: 75vh;
        font-family: 'PyeongChangPeace-Bold';
        color: #25244e;
    }
    .light {
        z-index: 9;
    }
`
const Content = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 50vh;
    gap: 20px;
`
const Card = styled(motion.div)`
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px;
    margin: 0;
    padding: 0;
    cursor: pointer;
    width: 300px;
    height: 300px;
    position: relative;

    h1 {
        font-family: 'PyeongChangPeace-Bold';
        position: absolute;
        bottom: 10px;
        margin: 0;
        color: #ffdde1;
        -webkit-text-stroke: 1px #000;
    }
    img {
        width: 300px;
        position: absolute;
        top: -20px;
    }
`
const titleVariants = {
    start: {
        opacity: 0,
        scale: 0,
    },
    end: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            bounce: .6,
            duration: 1,
        }
    }
}
const lightVariants = {
    start: { 
        x: -120, 
        scale: .1 
    },
    end: {
        x: 120, 
        scale: 1,
        transition: { duration: .5 }
    }
}
const listVariants = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: .2,
        }
    }
}
const cardVariants = {
    start: {opacity: 0, sacle: 0, y: 30},
    end: {opacity: 1, scale: 1, y: 0, transition: { duration: .2 }}
}

export default function Contact (props) {
    const [ play, {stop}] = useSound(hover);

    return (
        <Container>
            <AnimatePresence>
            {
                props.progress > 0 &&
                <>
                    <motion.h1 className='light'
                        variants={lightVariants} initial='start' animate='end' exit='start'
                    >✨</motion.h1>
                    <motion.h1 variants={titleVariants} initial='start' animate='end' exit='start'>
                        Contact me
                    </motion.h1>
                    <Content variants={listVariants} initial='start' animate='end' exit='start'>
                    {
                        contactList.map(item => 
                            <Card key={item.title} variants={cardVariants} 
                                onMouseEnter={() => play()}
                                onMouseLeave={() => stop()}
                                onClick={() => {window.open(item.link)}}
                            >
                                <h1>{item.title}</h1>
                                <motion.img src={item.image} alt={item.title} whileHover={{ scale: 1.2 }} />
                            </Card>
                        )
                    }
                    </Content>
                </>
            }
            </AnimatePresence>
        </Container>
    )
}