import { createContext, useContext, useState } from "react";
import works from '../utils/works';

const ModalContext = createContext({});
export const ModalProvider = (props) => {
    const [ modal, setModal ] = useState(false);
    const [ content, setContent ] = useState(works[0]);

    return <ModalContext.Provider value={{
        modal, setModal, content, setContent
    }}>
        { props.children }
    </ModalContext.Provider>
}

export const useModal = () => {
    return useContext(ModalContext)
}