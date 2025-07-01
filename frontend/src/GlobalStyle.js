import { createGlobalStyle } from "styled-components"
import coffee from "../src/Images/coffee.jpg"

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }
  body{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif';
    background-image: url(${coffee});
    color: white;
    background-size: cover; 
  }
  button{
    background-color: #1a1a1a;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif';
    backdrop-filter: blur(1px);
  }
  option{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif';
  }

  .error-tooltip {
    position: fixed;
    bottom: 3vw;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f8d7da;
    color: #721c24;
    padding: 0.5vw 1vw;
    border-radius: 0.3vw;
    border: 1px solid #f5c6cb;
    font-size: 1vw;
    z-index: 9999;
    max-width: 80vw;
    text-align: center;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  }
`