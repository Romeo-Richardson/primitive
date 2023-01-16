import styled from "styled-components";

export const ProductImage = styled.img`
height: 100%;
width: 100%;
object-fit: ${(props) => props.of};
`