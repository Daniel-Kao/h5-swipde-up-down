import styled from "styled-components";

export const NEXT = "NEXT";
export const PREV = "PREV";

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vh;
  height: 100vh;
  transition: transform 0.5s ease;
  transform: ${props => {
    const val = -props.height;
    if (props.dir === NEXT) {
      return `translateY(${val}px)`;
    } else {
      return `translateY(${val}px)`;
    }
  }};
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;
