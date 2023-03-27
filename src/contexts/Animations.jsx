import { createContext, useContext, useState } from "react";

const AnimationsContext = createContext({});
export const AnimationProvider = (props) => {
    const [ animation, setAnimation ] = useState('hello');

    
    return <AnimationsContext.Provider value={{
        animation,
        setAnimation,
    }}>
        {props.children}
    </AnimationsContext.Provider>
}

export const useCharacterAnimations = () => {
    return useContext(AnimationsContext)
}