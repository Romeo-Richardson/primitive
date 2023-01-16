import styled from "styled-components";

export const MainBannerImageContainer = styled.div`
width: 40%;
height: 100%;
background-color: orange;
display: flex;
justify-content: center;
align-items: center;

@media screen and (max-width: 1025px) {
    position: absolute;
    transform: scale(0);
}
`