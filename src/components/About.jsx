import { motion } from 'framer-motion';
import styled from 'styled-components';
import skills from '../utils/skills';
import pic from '../img/pic.png'

const Container = styled(motion.div)`
    min-height: 100vh;
    font-family: 'Nanum Gothic Coding', monospace;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`
const Text = styled(motion.div)`
    font-size: 16px;
    font-weight: normal;
`
const Card = styled(motion.div)`
    width: 50%;
    height: 50%;
    border-radius: 10px;
    background: rgba(255, 255, 255, .9);
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 30px;
    gap: 30px;
    margin: 10px 0;
`
const Skill = styled(motion.img)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
`

function About(props) {
    return (
        <Container style={{opacity: props.opacity, translateX: props.opacity * 150, rotate: `${props.opacity - 1}deg`, translateZ: props.opacity}}>
            <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
                <img src={pic} alt="" width='10%'style={{border:'1px solid #000', backgroundColor:'beige', borderRadius:'10px'}}/>
                <div style={{textAlign:'start', marginLeft:'20px'}}>
                    <h1>Front-end Developer</h1>
                    <div>최하영(hayeong choi) 1991.01.11 </div>
                </div>
            </div>
            <Card >
                {
                    skills.map((skill, i) => {
                        return (
                            <motion.div key={skill.name} initial='start' animate='end'>
                                <Skill src={skill.image} custom={i * .2}/>
                                <Text custom={i * .2}>{skill.name}</Text>
                            </motion.div>
                        )
                    })
                }
            </Card>
        </Container>
    )
}

export default About;