import styled from "styled-components";

export const ProductAltDisplayImgContainer = styled.div`
height: 33.33%;
width: 100%;
transition: 1s;
&:hover {
    cursor: pointer;
    transform: scale(1.075);
}

@media screen and (max-width: 940px) {
height: 100%;
width: 33.33%;
}
`