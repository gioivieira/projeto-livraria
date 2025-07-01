import styled from "styled-components";

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
  color: white;

  h1 {
    margin: 1vw;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vw;

    button {
        white-space: nowrap;
        border: solid 0.1vw white;
        color: white;
        text-align: center;
        border-radius: 25%;
        margin-right: 7vw;
        margin-left: 7vw;
        margin-bottom: 1vw;
        max-width: 10vw;
        padding:0.6vw;
        white-space: nowrap;
        font-size: 1vw;
        :hover{
            transform: scale(1.2);
            transition: all 0.5s;
        }
      }
  }
`

export const IngredientsContainer = styled.li`
  display: block;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8vw 1vw;
  border-radius: 10px;
  width: 15vw;
  color: black;
  margin: 0.7vw auto;

  input {
    margin-right: 1vw;
    transform: scale(1.2);
    cursor: pointer;
  }

  h3 {
    margin: 0;
    font-size: 1.1vw;
    font-weight: 400;
  }
`


