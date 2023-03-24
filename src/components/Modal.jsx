import styled from "styled-components"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useModal } from "../contexts/ModalContexts";

const Card = styled(motion.div)`
    width: 80%;
    border-radius: 20px;
    height: 50vh;
    background-image: url(${props => props.background});
    background-size: cover;
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    text-align: center;
    margin: 0 20px;
    //transform: scale(${props => props.scale});
    /* display: flex;
    align-items: center;
    justify-content: center; */
`
const OpenCard = styled(Card)`
    /* width: 90vw;
    height: 90vh; */
    border-radius: 20px;
    //top: 200vh;
    background-color: #fff;
    /* left: 5vw;
    position: absolute; */
    position: fixed;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    color: ${props => props.color};
    z-index: 9;
    overflow: auto;
`
const BackDrop = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const CardWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-direction: ${props => props.flexColumn && 'column'};
`
const Skill = styled(motion.span)`
    gap: 20px;
    margin-right: 50px;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Content = styled(Skill)`
    align-items: center;
    padding: 40px;
`
export default function Modal () {
    const { modal, setModal, content } = useModal();

    return (       
        <AnimatePresence>
            {
                modal &&
                <>
                 <BackDrop
                    onClick={() => setModal(false)}
                    animate={{ opacity: 1 }}
                    //exit={{ opacity: 0 }}
                >
                </BackDrop>
                <OpenCard
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1, transition: {duration: .3}}}
                exit={{ opacity: 0, scale: 0, transition: {duration: .3}}}
            >
                { 
                  content.skills.map((skill, i) => 
                  <p key={`${skill}-${i}`}> 
                      {skill}&nbsp; { i !== content.skills.length - 1 ? '|' : null }&nbsp;
                  </p>
                    )
                }
                {
                    content.contents.map((obj, i) => 
                    <div key={`obj${i}`}>
                    <CardWrap flexColumn={obj.flexColumn}>
                    {
                        obj.images.map((item, i) => 
                            <Card key={'image' + i} background={item.image} 
                                size={item.size? item.size : [70, 60]}
                            ></Card>
                        )
                    }
                    </CardWrap>
                    <Content>
                    {
                        obj.content.map((item, i) => 
                            <p key={'content' + i}  >
                                🐰 {item}
                            </p>)
                    }
                    </Content>
                    </div>
                    )
                }
                
                  
            </OpenCard>
                </>
               
            }
      
        </AnimatePresence>

    )
}