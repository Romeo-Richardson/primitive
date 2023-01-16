import styled from "styled-components";

export const CommentsHeader = styled.div`
height: 135px;
width: 1720px;
display: flex;
flex-direction: column;
align-items: center;
position: relative;
top: 390px;

@media screen and (max-width: 1740px) {
    width: 80vw;
    top: 240px;
}

@media screen and (max-width: 825px) {
    top: 210px;
}

@media screen and (max-width: 440px) {
top: 270px;
}
`

