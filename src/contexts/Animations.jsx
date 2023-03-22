import { createContext, useContext, useState } from "react";

const AnimationsContext = createContext({});
export const AnimationProvider = (props) => {
    const [ animation, setAnimation ] = useState('hello');
    const [ animations, setAnimations ] = useState([]);

    
    return <AnimationsContext.Provider value={{
        animation,
        setAnimation,
        animations,
        setAnimations
    }}>
        {props.children}
    </AnimationsContext.Provider>
}

export const useCharacterAnimations = () => {
    return useContext(AnimationsContext)
}