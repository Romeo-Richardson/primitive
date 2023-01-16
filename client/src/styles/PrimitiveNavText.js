import styled from "styled-components";

export const PrimitiveNavText = styled.p`
font-size: 24px;

@media screen and (max-width: 440px) {
font-size: 18px;
}

&:hover {
    cursor: pointer;
}
`