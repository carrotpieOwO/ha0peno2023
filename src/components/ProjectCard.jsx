import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ReactComponent as Code } from '../img/code.svg'
import { ReactComponent as Internet } from '../img/internet.svg';
import { ReactComponent as Detail }   from '../img/detail.svg';
import works from '../utils/works';
import { useEffect, useState } from 'react';

const CardWrap = styled(motion.div)`
    position: absolute;
    display: flex;
    top: 300px;
`
const Card = styled(motion.div)`
    width: 350px;
    height: 550px;
    border-radius: 20px;
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
        height: 55%;
        width: inherit;
        border-radius: 13px;
    }
    p {
        height: 63px;
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
const scaleVariants = {
    animate: (target) => ({
      scale: target,
      transition: {
          duration: .5,
        }
    })
}
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
        mysql: '42759c',
        firebase: 'f7c52b',
        gatsby: '7952B3',
        graphql: 'E10098'
    }
    
    const skillId = skill.toLowerCase().replace('.', '');
    const skillColor = skillsColor[`${skillId}`] ? skillsColor[`${skillId}`] : 'efefef'
    const logoColor = skill === 'React' || skill === 'Javascript' || skill === 'firebase' ? 'black' : 'white'

return `https://img.shields.io/badge/${skill}-${skillColor}?style=flat-square&logo=${skill}&logoColor=${logoColor}`
}

export default function ProjectCard (props) {
    const { left, targetIndex, selectItem, onClick } = props;
    const [ bgColor, setBgColor ] = useState('');

    // 선택된 project의 color값으로 배경색 변경
    useEffect(() => {
        setBgColor(works[targetIndex].color);
    }, [targetIndex])
    

    return (
        <CardWrap  animate={{x: `${left}px`, transition:{type: 'keyframes'}}}>
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
                    <img className="main-image" src={item.mainImg} alt={item.projectNm} />
                    <div style={{padding: '8px 16px'}}>
                        <h3>{item.projectNm} ({item.period})</h3>
                        <div style={{display:'flex', gap: '5px'}}>
                            {
                                item.skills.map(skill => 
                                    <img key={`${item.projectId}-${skill}`} src={getImageUrl(skill)} alt={skill} />
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
                                    key={`${item.projectId}-${link.type}`}
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
    )
}