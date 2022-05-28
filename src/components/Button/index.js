import styled, {css} from "styled-components";

const activeButtonStyle = css`
  background-color: ${({theme}) => theme.colors.main};
  border-bottom: 5px solid ${({theme}) => theme.colors.main2};
  text-shadow: 0px -2px ${({theme}) => theme.colors.main2};

  &:hover {
    cursor: pointer;
  }
// ;
//
//   &:active {
//     transform: translate(0px, 5px);
//     -webkit-transform: translate(0px, 5px);
//     border-bottom: 1px solid;
//   }
// ;
//   transition: all 0.1s;
//   -webkit-transition: all 0.1s;
// `;
// const disabledButtonStyle = css`
//   background-color: ${({theme}) => theme.colors.disabled};
//   border-bottom: 5px solid #000000;
//   text-shadow: 0px -2px #000000;
// `;

export const AppButton = styled.div`
  align-self: center;
  padding: 10px 40px;
  margin: 10px;
  float: left;
  border-radius: 10px;
  font-family: 'Pacifico', cursive;
  font-size: 25px;
  color: #FFF;
  text-decoration: none;
  user-select: none;
`;
