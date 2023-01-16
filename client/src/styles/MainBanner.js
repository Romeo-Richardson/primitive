import styled from "styled-components";

export const MainBanner = styled.div`
height: 650px;
width: 1720px;
background-color: grey;
position: relative;
top: 30px;
display: flex;
align-items: center;
justify-content: space-between;

@media screen and (max-width: 1750px) {
    width: 80vw;
}

@media screen and (max-width: 680px) {
    height: 500px;
}
`