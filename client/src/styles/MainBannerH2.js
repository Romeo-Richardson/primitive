import styled from "styled-components";

export const MainBannerH2 = styled.div`
font-size: 64px;
font-weight: 800;

@media screen and (max-width: 1025px) {
    margin-left: 25px;
}

@media screen and (max-width: 680px) {
    font-size: 50px;
    margin-left: 37.5px;
}

@media screen and (max-width: 495px) {
    margin-left: 22px;
    font-size: 43px;
}
`