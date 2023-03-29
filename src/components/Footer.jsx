import styled from "styled-components"

const Containter = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 3em;
    color: #535353;
`
export default function Footer () {
    return (
        <Containter>
            © 2023 ha0peno 💜
        </Containter>
    )
}