import styled from "styled-components";

export const PostRatingsAreaRight = styled.div`
height: 100%;
width: 50%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;

@media screen and (max-width: 1460px) {
max-width: 50%;
}

@media screen and (max-width: 660px) {
height: 50%;
min-width: 100%;
}
`