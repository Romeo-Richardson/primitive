import styled from "styled-components";

export const ProductDisplayImageContainer = styled.div`
height: 100%;
width: 60%;
background-color: blue;

@media screen and (max-width: 940px) {
height: 60%;
width: 100%;
order: 1;
}
`