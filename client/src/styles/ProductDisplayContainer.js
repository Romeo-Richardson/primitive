import styled from "styled-components";

export const ProductDisplayContainer = styled.div`
height: 650px;
width: 1720px;
position: relative;
top: 90px;
display: flex;
justify-content: space-between;

@media screen and (max-width: 1745px) {
    width: 80vw;
    height: 575px;
}

@media screen and (max-width: 1440px) {
height: 500px;
}

@media screen and (max-width: 940px) {
    display: flex;
    flex-direction: column;
    height: 800px;
    width: 80vw;
} 

@media screen and (max-width: 570px) {
height: 900px;
}
`