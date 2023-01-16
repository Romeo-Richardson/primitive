import styled from "styled-components";

export const HeaderText = styled.p`
font-size: 36px;
font-weight: 800;
text-align: ${(props) => props.ta};

@media screen and (max-width: 590px) {
font-size: 24px;
}
`