import styled from "styled-components";

export const ProductActionsContainer = styled.div`
height: 75px;
width: 500px;
display: flex;
justify-content: space-between;

@media screen and (max-width: 1750px) {
height: 50px;
}

@media screen and (max-width: 1250px) {
    width: 350px;
}

@media screen and (max-width: 505px) {
width: 275px;
}
`