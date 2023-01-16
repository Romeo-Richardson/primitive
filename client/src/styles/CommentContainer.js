import styled from "styled-components";

export const CommentContainer = styled.span`
width: 100%;
position: relative;
top: 420px;
border-top: 1px solid grey;
border-bottom: 1px solid grey;
display: flex;
flex-direction: column;
justify-content: space-between;

@media screen and (max-width: 1740px) {
    width: 80vw;
    top: 330px;
}

@media screen and (max-width: 825px) {
    top: 240px;
}

@media screen and (max-width: 440px) {
top: 310px;
}
`