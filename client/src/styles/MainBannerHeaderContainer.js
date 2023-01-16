import styled from "styled-components";

export const MainBannerHeaderContainer = styled.div`
width: 60%;
height: 80%;

@media screen and (max-width: 1750px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

@media screen and (max-width: 1025px) {
    width: 100%;
}
`