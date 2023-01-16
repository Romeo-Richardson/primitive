import styled from "styled-components";

export const ProductDisplayArea = styled.div`
height: 850px;
width: 50%;
display: flex;
justify-content: space-between;
align-items: center;

@media screen and (max-width: 940px) {
    min-width: 100%;
    min-height: 400px;
    flex-direction: column;
} 

@media screen and (max-width: 1745px) {
    height: 100%;
}
`