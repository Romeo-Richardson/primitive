import styled from "styled-components";

export const QuantityContent = styled.div`
height: 100%;
width: 33.33%;
border: 1px solid black;
display: flex;
justify-content: center;
align-items: center;
&:hover {
    cursor: ${(props) => props.cursor};
}
pointer-events: ${(props) => props.status};
`