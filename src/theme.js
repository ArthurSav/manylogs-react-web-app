import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
import { css } from "styled-components";

// custom css
const customScrollBar = css`
  &::-webkit-scrollbar {
    background: #00000000;
    width: 8px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #999999;
    border-radius: 4px;
  }
`;

// main
export const mainTheme = deepMerge(grommet, {
  name: "manylogs",
  defaultMode: "dark",
  rounding: 6,
  global: {
    colors: {
      background: {
        dark: "dark-1",
        light: "light-2",
      },
      brand: {
        dark: "#7700cc",
        light: "#6600cc",
      },
      "accent-1": "#31ddab",
      "accent-2": "#621e95",
      "background-json-highlighting": "#2B2B2B",
      "calm-red": "#E57373",
      "dark-0": "#0f0f11",
    },
    size: {
      // xxsmall: "48px",
      // xsmall: "96px",
      // small: "192px",
      // medium: "384px",
      // large: "768px",
      // xlarge: "1152px",
      // xxlarge: "1536px",
      // full: "100%",
      xmedium: "500px",
    },
  },
  tab: {
    color: "active-text",
    active: {
      color: "accent-1",
    },
    border: {
      color: "active-text",
      active: {
        color: "accent-1",
      },
    },
  },
  box: {
    extend: customScrollBar,
    size: {
      smallplus: "44px",
    },
  },
  textArea: {
    extend: customScrollBar,
  },
  layer: {
    border: {
      radius: "8px",
    },
  },
});

// extended theme
export const themeContextLogItem = {
  text: {
    font: {
      family: '"Inter", sans-serif',
    },
  },
};

export const themeContextEditResponse = {
  formField: {
    border: false,
  },
};

export const themeContextLogin = {
  formField: {
    border: {
      side: "all",
    },
    round: "4px",
    label: {
      size: "small",
      margin: { bottom: "8px", left: "2px" },
    },
    error: {
      margin: { top: "8px", left: "2px" },
      size: "small",
    },
  },
  button: {
    border: {
      radius: "4px",
    },
    padding: {
      vertical: "10px",
      horizontal: "24px",
    },
  },
  textInput: {
    extend: () => `
      font-weight: 400;
    `,
  },
};

// examples
const exampleTheme = {
  name: "my theme",
  rounding: 4,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: "#7700cc",
        light: "#6600cc",
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
    },
    font: {
      family: '"Lato"',
      face: "/* latin-ext */\n@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/lato/v20/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Lato';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/lato/v20/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "4px",
      large: "12px",
      xlarge: "24px",
    },
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "4px",
          large: "6px",
          xlarge: "12px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "6px",
          medium: "12px",
          large: "24px",
          xlarge: "48px",
        },
        size: {
          xxsmall: "24px",
          xsmall: "48px",
          small: "96px",
          medium: "192px",
          large: "384px",
          xlarge: "768px",
          full: "100%",
        },
      },
      medium: {
        value: 1536,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "6px",
      small: "12px",
      medium: "24px",
      large: "48px",
      xlarge: "96px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "12px",
      weight: 600,
    },
    spacing: "24px",
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "384px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  button: {
    border: {
      width: "2px",
      radius: "18px",
    },
    padding: {
      vertical: "4px",
      horizontal: "22px",
    },
  },
  calendar: {
    small: {
      fontSize: "14px",
      lineHeight: 1.375,
      daySize: "27.43px",
    },
    medium: {
      fontSize: "18px",
      lineHeight: 1.45,
      daySize: "54.86px",
    },
    large: {
      fontSize: "30px",
      lineHeight: 1.11,
      daySize: "109.71px",
    },
  },
  checkBox: {
    size: "24px",
    toggle: {
      radius: "24px",
      size: "48px",
    },
  },
  clock: {
    analog: {
      hour: {
        width: "8px",
        size: "24px",
      },
      minute: {
        width: "4px",
        size: "12px",
      },
      second: {
        width: "3px",
        size: "9px",
      },
      size: {
        small: "72px",
        medium: "96px",
        large: "144px",
        xlarge: "216px",
        huge: "288px",
      },
    },
    digital: {
      text: {
        xsmall: {
          size: "10px",
          height: 1.5,
        },
        small: {
          size: "14px",
          height: 1.43,
        },
        medium: {
          size: "18px",
          height: 1.375,
        },
        large: {
          size: "22px",
          height: 1.167,
        },
        xlarge: {
          size: "26px",
          height: 1.1875,
        },
        xxlarge: {
          size: "34px",
          height: 1.125,
        },
      },
    },
  },
  heading: {
    level: {
      1: {
        small: {
          size: "34px",
          height: "40px",
          maxWidth: "816px",
        },
        medium: {
          size: "50px",
          height: "56px",
          maxWidth: "1200px",
        },
        large: {
          size: "82px",
          height: "88px",
          maxWidth: "1968px",
        },
        xlarge: {
          size: "114px",
          height: "120px",
          maxWidth: "2736px",
        },
      },
      2: {
        small: {
          size: "30px",
          height: "36px",
          maxWidth: "720px",
        },
        medium: {
          size: "42px",
          height: "48px",
          maxWidth: "1008px",
        },
        large: {
          size: "54px",
          height: "60px",
          maxWidth: "1296px",
        },
        xlarge: {
          size: "66px",
          height: "72px",
          maxWidth: "1584px",
        },
      },
      3: {
        small: {
          size: "26px",
          height: "32px",
          maxWidth: "624px",
        },
        medium: {
          size: "34px",
          height: "40px",
          maxWidth: "816px",
        },
        large: {
          size: "42px",
          height: "48px",
          maxWidth: "1008px",
        },
        xlarge: {
          size: "50px",
          height: "56px",
          maxWidth: "1200px",
        },
      },
      4: {
        small: {
          size: "22px",
          height: "28px",
          maxWidth: "528px",
        },
        medium: {
          size: "26px",
          height: "32px",
          maxWidth: "624px",
        },
        large: {
          size: "30px",
          height: "36px",
          maxWidth: "720px",
        },
        xlarge: {
          size: "34px",
          height: "40px",
          maxWidth: "816px",
        },
      },
      5: {
        small: {
          size: "16px",
          height: "22px",
          maxWidth: "384px",
        },
        medium: {
          size: "16px",
          height: "22px",
          maxWidth: "384px",
        },
        large: {
          size: "16px",
          height: "22px",
          maxWidth: "384px",
        },
        xlarge: {
          size: "16px",
          height: "22px",
          maxWidth: "384px",
        },
      },
      6: {
        small: {
          size: "14px",
          height: "20px",
          maxWidth: "336px",
        },
        medium: {
          size: "14px",
          height: "20px",
          maxWidth: "336px",
        },
        large: {
          size: "14px",
          height: "20px",
          maxWidth: "336px",
        },
        xlarge: {
          size: "14px",
          height: "20px",
          maxWidth: "336px",
        },
      },
    },
  },
  paragraph: {
    small: {
      size: "16px",
      height: "22px",
      maxWidth: "384px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "22px",
      height: "28px",
      maxWidth: "528px",
    },
    xlarge: {
      size: "26px",
      height: "32px",
      maxWidth: "624px",
    },
    xxlarge: {
      size: "34px",
      height: "40px",
      maxWidth: "816px",
    },
  },
  radioButton: {
    size: "24px",
  },
  text: {
    xsmall: {
      size: "14px",
      height: "20px",
      maxWidth: "336px",
    },
    small: {
      size: "16px",
      height: "22px",
      maxWidth: "384px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "22px",
      height: "28px",
      maxWidth: "528px",
    },
    xlarge: {
      size: "26px",
      height: "32px",
      maxWidth: "624px",
    },
    xxlarge: {
      size: "34px",
      height: "40px",
      maxWidth: "816px",
    },
  },
};
