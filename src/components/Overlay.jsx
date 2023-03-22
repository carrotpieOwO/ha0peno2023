import { Scroll, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import About from "./About";


export const Overlay = () => {
    const scroll = useScroll();
    const [ aboutSection, setAboutSection ] = useState(1)

    useFrame(() => {
        // about section이 fadein, fadeout되는 시작위치 지정
        setAboutSection(scroll.curve(1/6, 1/4)); 
    })

    return (
        <Scroll html>
            <div id="home" style={{height:'100vh', display:'flex', alignItems:'center'}}>
                <div style={{width: '100vw', position:'fixed', alignItems:'center', justifyContent:'center'}}>
                    안녕하세요. 최하영입니다.
                </div>
            </div>
            <About opacity={aboutSection} />
            <div id="project" style={{height:'100vh', display:'flex', alignItems:'center', backgroundColor:'blue'}}>
                projects
            </div>
            <div style={{height:'100vh', display:'flex', alignItems:'center'}}>
                contact
            </div>
        </Scroll>
    )
}