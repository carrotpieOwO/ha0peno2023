import { Scroll, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { useModal } from "../contexts/ModalContexts";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Home from "../sections/Home";
import Projects from "../sections/Projects";
import Chat from "./Chat";

export const Overlay = () => {
    const scroll = useScroll();
    const [ homeScrollProgress, setHomeScrollProgress ] = useState(0)
    const [ aboutScrollProgress, setAboutScrollProgress ] = useState(1)
    const [ projectScrollProgress, setProjectScrollProgress ] = useState(2)
    const [ contactScrollProgress, setContactScrollProgress ] = useState(2)

    const { setModal, setContent } = useModal();

    useFrame(() => {
        // about section이 fadein, fadeout되는 시작위치 지정
        setHomeScrollProgress(scroll.curve(1/4, 1/4, 0.2));
        setAboutScrollProgress(scroll.curve(1/6, 1/4)); 
        setProjectScrollProgress(scroll.curve(2/5, 3/4));
        setContactScrollProgress(scroll.curve(4/5, 3/4));
    })

    return (
        <>
            <Scroll html>
                <Home progress={homeScrollProgress} />
                <About progress={aboutScrollProgress} />
                <Projects progress={projectScrollProgress} setModal={setModal} setContent={setContent}/>
                <Contact progress={contactScrollProgress} />
                <Chat />
            </Scroll>
        </>
    )
}