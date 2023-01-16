import styled from "styled-components";

export const ProductInfoArea = styled.div`
height: 850px;
width: 50%;
display: flex;
flex-direction: column;
justify-content: space-between;
padding-left: 50px;

@media screen and (max-width: 1745px) {
    height: 100%;
}

@media screen and (max-width: 940px) {
    width: 100%;
    min-height: 50%;
    padding-left: 0px;
}

@media screen and (max-width: 475px) {
min-height: 65%;
}
`