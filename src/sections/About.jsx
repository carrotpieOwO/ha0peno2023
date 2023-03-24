import { motion } from 'framer-motion';
import styled from 'styled-components';
import skills from '../utils/skills';
import pic from '../img/pic.png'
import { TypeAnimation } from 'react-type-animation';

const Container = styled(motion.div)`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    transform: translateX(${ props => `${props.progress * 150}px`}) translateZ(${props => `${props.progress}px`}) rotate(${props => `${props.progress -1}deg`});
    opacity: ${ props => props.progress };
`
const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`
const IdPhoto = styled.img`
    background: #F7F8F8;
    width: 10%;
    border-radius: 50%;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
`
const Card = styled.div`
    width: 50%;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    -webkit-box-align: center;
    align-items: center;
    padding: 30px;
    gap: 30px;
    margin: 10px 0px;
    min-width: 820px;
    max-height: 850px;
`
const SkillGrid = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
`
const Skill = styled.img`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
`

export default function About(props) {
    return (
        <Container progress={props.progress}>
            <Title>
                <IdPhoto src={pic} alt="id-photo" />
                <div style={{textAlign:'start', marginLeft:'20px'}}>
                    <h1>💻 Front-End Developer</h1>
                    <TypeAnimation
                        sequence={[
                            '최하영(hayeong choi) / 1991.01.11',
                            5000,
                            '',
                            1500,
                        ]}
                        repeat={Infinity}
                    />
                </div>
            </Title>
            <Card >
                {
                    skills.map((skill, i) => {
                        return (
                            <SkillGrid key={skill.name}>
                                <Skill src={skill.image} alt={skill.name}/>
                                <p>{skill.name}</p>
                            </SkillGrid>
                        )
                    })
                }
            </Card>
        </Container>
    )
}