import styled from "styled-components"
import { AnimatePresence, motion } from 'framer-motion';
import { useModal } from "../contexts/ModalContexts";

const Circle = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 8px;
    background-color: ${props => props.bgColor};
`
const ModalContainer = styled(motion.div)`
    border-radius: 20px;
    background-color: #202330;
    position: fixed;
    top: 10%;
    left: 8%;
    width: 80%;
    height: 80%;
    color: ${props => props.color};
    z-index: 9;
    overflow: auto;
    padding: 0 40px;
    color: #fff;
    text-align: center;

    img {
        object-fit: fill;
        max-width: 60%;
        overflow: hidden;
        border-radius: 10px;
    }
    p:last-child {
        margin-bottom: 50px;
    }
`
const ModalNav = styled.div`
    display: flex;
    position: fixed;
    background-color: #202330;
    width: 80%;
    padding: 15px 0;
    
    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    span {
        position: absolute;
        justify-content: center;
        display: flex;
        width: 100%;
    }
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
    margin: 70px 0 10px 0;
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
                        exit={{ opacity: 0 }}
                    >
                    </BackDrop>
                    <ModalContainer
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1, transition: {duration: .3}}}
                        exit={{ opacity: 0, scale: 0, transition: {duration: .3}}}
                    >
                        <ModalNav>
                            <div>
                                <Circle bgColor="#FF605C" />
                                <Circle bgColor="#FFBD44" />
                                <Circle bgColor="#00CA4E" />
                            </div>
                            <span>{content.projectNm}</span>
                        </ModalNav>
                        {
                            content.contents.map((obj, i) => 
                            <div key={`container-${i}`} >
                                <CardWrap flexColumn={obj.flexColumn}>
                                {
                                    obj.images.map((item, i) => 
                                        <img key={`image-${i}`} src={item.image} alt={item}/>
                                    )
                                }
                                </CardWrap>
                                {
                                    obj.content.map((item, i) => 
                                        <p key={`content-${i}`}>
                                            - {item}
                                        </p>
                                    )
                                }
                            </div>
                            )
                        }                    
                    </ModalContainer>
                </>
            }
        </AnimatePresence>
    )
}