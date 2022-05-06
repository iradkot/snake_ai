import {css} from "styled-components";
import {SPACING_UNIT, SPACING_UNIT_TYPE} from "./consts";

export const theme = {
    colors: {
        main: '#3498DB',
        main2: '#2980B9',
        mainTextColor: '#CB6724',
        disabled: '#5e686b'
    },
    spacing: {
        l: '16px',
        xl: '32px'
    },
    fontSizes: {
        xl: '28px',
        l: '20px'
    },
    getSpacing: (spaceAmount = 0) => () => SPACING_UNIT * spaceAmount + SPACING_UNIT_TYPE,
    get headerStyle1() {
        return css`
          color: ${this.mainTextColor};
          font-size: ${this.fontSizes.xl};
        `
    },
    get textDefault() {
        return css`
          color: ${this.mainTextColor};
          font-size: ${this.fontSizes.l};
        `
    },
}
