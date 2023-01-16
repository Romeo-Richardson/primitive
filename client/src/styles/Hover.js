import styled from "styled-components";

export const Hover = styled.div`
font-size: ${(props) => props.fs};
font-weight: ${(props) => props.fw};
&:hover {
    cursor: pointer;
}
`