import styled from "styled-components";

export const ProductDetailText = styled.p`
font-size: 36px;
position: relative;
top: ${(props) => props.top}px;
text-align: ${(props) => props.ta};
margin: 0px;

@media screen and (max-width: 1750px) {
font-size: 24px;
}
`