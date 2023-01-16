import styled from "styled-components";

export const MainBannerH3 = styled.div`
font-size: 200px;
font-weight: 900;
color: white;

@media screen and (max-width: 1750px) {
    font-size: 150px;
}

@media screen and (max-width: 1520px) {
    font-size: 125px;
}

@media screen and (max-width: 1290px) {
    font-size: 100px;
}

@media screen and (max-width: 1025px) {
    margin-left: 50px;
}

@media screen and (max-width: 680px) {
    font-size: 65px;
    margin-left: 75px;
}

@media screen and (max-width: 495px) {
    font-size: 50px;
    margin-left: 60px;
}

@media screen and (max-width: 379px) {
    margin-left: 45px;
}
`