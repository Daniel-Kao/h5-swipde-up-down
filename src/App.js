import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Carousel from "./components/DemoCarousel";
import P1 from "./P1";
import { useSwipeable } from "react-swipeable";

import {
  CarouselContainer,
  Wrapper,
  CarouselSlot,
  NEXT,
  PREV
} from "./components";

const Item = styled.div`
  background: ${props => props.color};
  text-align: center;
  width: 100%;
  min-height: 100%;
  color: white;
  overflow-y: scroll;
`;

const initialState = { pos: 0, sliding: false, dir: NEXT, height: 0 };

const numItems = 4;

const App = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref0 = useRef(null);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    console.log("scrollheight");
    console.log(ref0.current.clientHeight + ref0.current.offsetTop);
    console.log("window");
    console.log(window.scrollY + window.innerHeight);
  }

  const slide = dir => {
    let nextHeight;
    if (dir === "PREV") {
      nextHeight =
        state.pos === 1
          ? ref0.current.clientHeight
          : state.pos === 2
          ? ref1.current.clientHeight
          : state.pos === 3
          ? ref2.current.clientHeight
          : 0;
    } else if (dir === "NEXT") {
      nextHeight =
        state.pos === 0
          ? ref0.current.clientHeight
          : state.pos === 1
          ? ref1.current.clientHeight
          : state.pos === 2
          ? ref2.current.clientHeight
          : 0;
    }
    console.log(state);
    console.log(nextHeight);
    dispatch({ type: dir, numItems, nextHeight });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
  };

  const handlers = useSwipeable({
    onSwipedUp: () => slide("NEXT"),
    onSwipedDown: () => slide("PREV"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div {...handlers}>
      <Wrapper>
        <CarouselContainer
          dir={state.dir}
          sliding={state.sliding}
          pos={state.pos}
          height={state.height}
        >
          <Item ref={ref0} color="green">
            Elit id nostrud incididunt veniam veniam nisi excepteur
            reprehenderit esse non tempor. Sunt ullamco adipisicing quis non
            esse consectetur occaecat. Occaecat dolor do anim culpa non nulla ex
            cupidatat amet do. Do ipsum aliquip id eiusmod incididunt aute esse
            consectetur dolore qui aliqua. Non fugiat proident ex sint. Dolore
            non fugiat laboris deserunt esse labore ea. Sunt elit labore non
            occaecat id quis qui adipisicing cillum Lorem do sunt ad laborum. Ad
            sunt cillum fugiat labore laborum nulla irure in ad incididunt
            consectetur nostrud incididunt voluptate. Nostrud do mollit anim
            Lorem dolore sint velit sint ut. Nostrud anim mollit elit nostrud
            ullamco commodo ullamco anim nostrud laboris do cillum magna.
            Cupidatat laboris ea velit ad sint do tempor enim veniam commodo
            anim. Qui veniam laboris in irure ex labore laboris fugiat
            consectetur nisi consequat irure esse veniam. Do ea do ipsum ad
            amet. Laborum aliquip enim sunt cillum nostrud do cillum in officia.
            Reprehenderit exercitation do proident irure tempor ad ea duis
            aliquip quis aliqua mollit laboris. Id cillum irure in enim elit est
            reprehenderit duis consectetur voluptate eu sit est. Proident ut
            deserunt anim officia aliquip eu. In elit esse eu irure velit qui
            nulla. Minim ut ut nulla laboris duis sint magna adipisicing.
            Commodo esse ea Lorem incididunt ipsum labore do cupidatat laborum.
            Excepteur esse occaecat voluptate enim laborum veniam consectetur
            nostrud ad incididunt veniam. Laboris ut veniam elit adipisicing id
            deserunt anim in sit. Mollit fugiat Lorem sunt exercitation non
            aliqua reprehenderit in. Ex ullamco occaecat eiusmod eu minim.
            Ullamco fugiat irure in ullamco aute ut deserunt sunt. Exercitation
            labore proident qui culpa irure laboris minim. In minim elit ullamco
            laborum ad do ex nostrud pariatur veniam exercitation fugiat. In
            esse commodo Lorem duis do ea sunt cillum voluptate elit velit qui
            laboris. Sunt tempor est ea consectetur reprehenderit dolore tempor
            labore adipisicing ullamco amet voluptate commodo. Sunt amet enim
            est veniam qui culpa veniam anim cupidatat quis aliquip. Aliquip
            ipsum eiusmod tempor enim tempor dolore dolore cillum consequat amet
            eu sint mollit. Tempor culpa sit ad labore amet qui laboris culpa id
            cupidatat aliqua est. Amet mollit amet duis qui culpa nostrud
            commodo incididunt tempor labore. Culpa et laborum eiusmod do sit
            fugiat tempor tempor enim excepteur enim nostrud fugiat eu. Officia
            mollit aute fugiat irure magna fugiat non. Laborum incididunt
            voluptate amet sint dolor laborum ex proident enim qui. Laborum
            cillum eiusmod magna ipsum ex ex cillum. Pariatur sit sint culpa
            dolore. Ipsum magna anim reprehenderit amet amet mollit sint
            pariatur ad eiusmod aliqua. Enim aliquip nulla veniam exercitation
            enim et amet adipisicing officia tempor occaecat exercitation sit
            est. Aliqua quis id et consectetur et eiusmod mollit laboris dolore
            id. Mollit laborum duis excepteur minim est ea. Ea voluptate
            voluptate id et dolor et laborum Lorem fugiat qui reprehenderit id.
            Est eu id fugiat laboris excepteur anim anim laborum occaecat.
            Mollit reprehenderit deserunt anim excepteur duis. Ipsum esse
            exercitation fugiat anim laboris laborum. Aliquip non id occaecat
            reprehenderit ullamco velit.
          </Item>
          <Item ref={ref1} color="red">
            Item
          </Item>
          <Item ref={ref2} color="blue">
            Item
          </Item>
          <Item ref={ref3} color="yellow">
            Item
          </Item>
        </CarouselContainer>
      </Wrapper>
      {/* <button onClick={() => slide("PREV")}>go prev</button>
      <button onClick={() => slide("NEXT")}>go next</button> */}
    </div>
  );
};

function reducer(state, { type, numItems, nextHeight }) {
  switch (type) {
    case "reset":
      return initialState;
    case PREV:
      console.log(state.pos);
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? 0 : state.pos - 1,
        height: state.height - nextHeight
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === 3 ? 3 : state.pos + 1,
        height: state.height + nextHeight
      };
    case "stopSliding":
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default App;
