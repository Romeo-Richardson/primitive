import styled from "styled-components";

export const RatingImage = styled.img`
height: 100%;
width: 100%;
object-fit: cover;

@media screen and (max-width: 590px) {
object-fit: contain;
}
`