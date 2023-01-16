import styled from "styled-components";

export const CartItem = styled.div`
height: 100%;
width: 100%;
border: 1px solid black;
background-color: white;
z-index: 2;
display: flex;
align-items: center;
transform: ${(props) => props.scale};
`