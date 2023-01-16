import styled from "styled-components";

export const ProductActionButton = styled.div`
height: 100%;
width: 45%;
display: flex;
justify-content: center;
align-items: center;
background-color: grey;
transition: 1s;
&:hover {
    cursor: pointer;
    background-color: hsl(210, 2%, 29%);
}
`