import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";
import useSound from "use-sound";
import git from '../img/github.svg';
import icon from '../img/homeIcon.png';
import click from '../sound/pooyo.mp3';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    position: fixed;
    margin-top: 30px;
    z-index: 99;
`
const Link = styled(motion.a)`
    padding: 10px;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: ${ props => props.margin || 0 };
    img {
        pointer-events: none;
    }
`

export default function Nav () {
    const [ play, {stop} ] = useSound(click);

    return (
        <Container>
            <Link href='/' margin='0 0 0 30px' 
                onMouseEnter={() => play()}
                onMouseLeave={() => stop()}
                whileHover={{ scale: 1.1 }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <img src={icon} alt="" width='30px' style={{marginRight:'1em'}}/>
                <TypeAnimation
                    cursor={false}
                    style={{color: '#000'}}
                    sequence={[
                        "ha0peno's Portfolio",
                        1500,
                    ]}
                    repeat={Infinity}
                />
            </Link>           
            <Link href="https://github.com/carrotpieOwO" target="_blank" margin='0 30px 0 0'
                onMouseEnter={() => play()}
                onMouseLeave={() => stop()}
                whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <img src={git} alt='github' width='30px'/>
            </Link>
        </Container>
    )
}
