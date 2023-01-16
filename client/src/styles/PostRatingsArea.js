import styled from "styled-components";

export const PostRatingsArea = styled.div`
height: 450px;
width: 1720px;
position: relative;
top: 510px;
display: flex;
margin-top: 15px;

@media screen and (max-width: 1740px) {
    width: 80vw;
    top: 480px;
}

 @media screen and (max-width: 660px) {
    display: flex;
    flex-direction: column;
    height: 900px;
} 
`