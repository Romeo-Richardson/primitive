import styled from "styled-components";

export const ProductDetailsButton = styled.div`
height: 10%;
width: 100%;
background-color: darkgrey;
transition: 1s;
&:active {
    background-color: grey;
}
&:hover {
    cursor: pointer;
    background-color: grey;
}
display: flex;
justify-content: center;
align-items: center;
`