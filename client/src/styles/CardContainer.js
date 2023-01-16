import styled from "styled-components";

export const CardContainer = styled.div`
height: 625px;
width: 22.5%;
margin-bottom: 50px;

@media screen and (max-width: 1750px) {
    width: 30%;
}

@media screen and (max-width: 1150px) {
    width: 45%;
}

@media screen and (max-width: 790px) {
    width: 95%;
}
`