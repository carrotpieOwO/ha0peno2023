import { Scroll, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import About from "../sections/About";
import Home from "../sections/Home";

export const Overlay = () => {
    const scroll = useScroll();
    const [ homeScrollProgress, setHomeScrollProgress ] = useState(0)
    const [ aboutScrollProgress, setAboutScrollProgress ] = useState(1)
    
    useFrame(() => {
        // about section이 fadein, fadeout되는 시작위치 지정
        setHomeScrollProgress(scroll.curve(1/4, 1/4, 0.2))
        setAboutScrollProgress(scroll.curve(1/6, 1/4)); 
        
    })

    return (
        <Scroll html>
            <Home progress={homeScrollProgress} />
            <About progress={aboutScrollProgress} />
            <div id="project" style={{height:'100vh', display:'flex', alignItems:'center', backgroundColor:'blue'}}>
                projects
            </div>
            <div style={{height:'100vh', display:'flex', alignItems:'center'}}>
                contact
            </div>
        </Scroll>
    )
}