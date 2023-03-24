import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import works from '../utils/works';
import { ReactComponent as Code } from '../img/code.svg'
import { ReactComponent as Internet } from '../img/internet.svg';
import { ReactComponent as Detail }   from '../img/detail.svg';
import arrowLeft from '../img/arrow-left.svg';
import arrowRight from '../img/arrow-right.svg';

const Container = styled(motion.div)`
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
`
const CardWrap = styled(motion.div)`
    position: absolute;
    display: flex;
    top: 300px;
`
const Card = styled(motion.div)`
    width: 20vw;
    border-radius: 20px;
    height: 50vh;
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    text-align: left;
    margin: 0 20px;
    background-color: #fff;
    padding: 10px;
    font-size: 14px;
    line-height: 1.5;

    img {
        border-radius: 5px;
    }
    .main-image {
        object-fit: fill;
        height: 60%;
        width: inherit;
        border-radius: 13px;
    }
`
const BtnWrap = styled.div`
    display: ${props => props.length === 1 ? 'flex' : 'grid' };
    grid-template-columns: 2fr 7fr;
    gap: 8px;
    margin: 8px;
`
const Btn = styled(motion.button)`
    width: 100%;
    padding: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    border-radius:12px;
    opacity: ${props => props.opacity};
    color: ${props => props.opacity === 1 ? '#fff' : '#000' };
    background-size: 0 0;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-image: radial-gradient(circle at center, #ff9b4f 50%, transparent 50%);    
`
const CodeIcon = styled(Code)`
    path {
        fill: ${props => props.color}
    }
`
const SlideBtnWrap = styled.div`
    position: absolute;
    bottom: 100px;
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
const scaleVariants = {
  animate: (target) => ({
    scale: target,
    transition: {
        duration: .5,
      }
  })
}
const arrowVariants = {
    start: { 
        x: 5
    },
    end: { 
        x: [5, -10], transition: { duration: 1, times: [0, 0.2], repeat: Infinity, repeatType: "reverse" }
    }
};
// img.shields.io에서 제공하는 skill태그 주소를 생성하고 반환한다.
const getImageUrl = (skill) => {
        const skillsColor = {
            javascript: 'F7DF1E',
            typescript: '3178C6',
            jquery: '0965a7',
            angularjs: 'DD0031',
            react:'61DAFB',
            redux: '7c41be',
            antdesign: 'f7495b',
            chartjs: 'f67377',
            d3js: 'f78949',
            spring: '6DB33F',
            mysql: '42759c'
        }
        
        const skillId = skill.toLowerCase().replace('.', '');
        const skillColor = skillsColor[`${skillId}`] ? skillsColor[`${skillId}`] : 'efefef'
        const logoColor = skill === 'React' || skill === 'Javascript' ? 'black' : 'white'

    return `https://img.shields.io/badge/${skill}-${skillColor}?style=flat-square&logo=${skill}&logoColor=${logoColor}`
}

export default function Projects(props) {
    const [ left, setLeft ] = useState(40);
    const [ targetIndex, setTargetIndex ] = useState(0);
    const [ bgColor, setBgColor ] = useState('transparent');

    // slide에서 prev, next버튼 클릭 시 화면 이동
    const showNextSlide = () => {
       setLeft( prev => prev -= 22.5)
       setTargetIndex( prev => prev += 1)
    };
    const showPrevSlide = () => {
        setLeft( prev => prev += 22.5)
        setTargetIndex( prev => prev -= 1)
    };

    // 선택된 project가 아닌 card를 클릭 할 경우 해당 project를 선택한다.
    const selectItem = (newIndex) => {
        const leftPosition = targetIndex > newIndex ? (targetIndex - newIndex) * 22.5 : (newIndex - targetIndex) * -22.5;

        setTargetIndex(newIndex)
        setLeft( prev => prev + leftPosition)
    }

    // project card의 버튼 클릭
    const onClick = (link, item) => {
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
        <Container id="project" 
            style={{height:'100vh', display:'flex', alignItems:'center', position: 'relative'}}
            animate={{backgroundColor: bgColor, transition: {duration: .5} }}
        >
            <CardWrap  animate={{x: `${left}vw`, transition:{type: 'keyframes'}}}>
            {
                works.map(( item, i ) => 
                    <Card 
                        key={item.projectId}
                        variants={scaleVariants}
                        animate='animate'
                        custom={i === targetIndex ? 1.1 : 1}
                        whileTap={ i !== targetIndex &&  { scale: 0.9 }}
                        onClick={() => { i !== targetIndex && selectItem(i)}}
                    >
                        <img class="main-image" src={item.mainImg} alt={item.projectNm} />
                        <div style={{padding: '8px 16px'}}>
                            <h3>{item.projectNm} ({item.period})</h3>
                            <div style={{display:'flex', gap: '5px'}}>
                                {
                                    item.skills.map(skill => 
                                        <img src={getImageUrl(skill)} alt={skill} />
                                    )
                                }
                            </div>
                            <p>{item.description}</p>
                        </div>
                        <BtnWrap length={item.link.length}>
                            {
                                item.link &&
                                item.link.map(link => 
                                    <Btn
                                        onClick={() => onClick(link, item)}
                                        animate={{
                                            backgroundColor: i === targetIndex ? bgColor : 'rgba(0, 0, 0, .2)', 
                                            transition: {duration: .5} 
                                        }}
                                        opacity={ i === targetIndex ? 1 : .5 }
                                        whileHover={i === targetIndex && {backgroundSize: '200% 200%'}}
                                    >
                                        {
                                            link.type === 'Site' ? 
                                                <><Internet width={20} height={20} fill={ i === targetIndex ? '#fff' : '#000' } /> Live View</>
                                                : link.type === 'Git' ? 
                                                <CodeIcon width={20} height={20} color={ i === targetIndex ? '#fff' : '#000' } />
                                                : <><Detail width={20} height={20} fill={ i === targetIndex ? '#fff' : '#000' } />Detail</>
                                        }
                                    </Btn>
                                )
                            }
                        </BtnWrap>
                    </Card> 
                )
            }
            </CardWrap>                
            <SlideBtnWrap>
                <SlideBtn type="button" onClick={showPrevSlide} disabled={targetIndex === 0}>
                    <img src={arrowLeft} alt="prev" width='30px' />
                </SlideBtn>
                <SlideBtn type="button" onClick={showNextSlide} disabled={targetIndex === works.length-1}>
                    <img src={arrowRight} alt="next" width='30px' />
                </SlideBtn>
             </SlideBtnWrap>
        </Container>
    )
}