declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      myClassesBg: string
      dark: string
      main: string
      light: string
      bodyBg: string
      darkBg: string
      lightBg: string
      tooltipBg: string
      tableHeaderBg: string
      myDayBg: string
    }
  }
  interface PaletteOptions {
    customColors?: {
      dark?: string
      main?: string
      light?: string
      bodyBg?: string
      darkBg?: string
      lightBg?: string
      tooltipBg?: string
      tableHeaderBg?: string
    }
  }
}

export {}
