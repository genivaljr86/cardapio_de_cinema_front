import { Dispatch, SetStateAction, createContext } from "react";


type CThemeContextParams = {
  cTheme: string,
  setCTheme: Dispatch<SetStateAction<string>>;
}
const CThemeContext = createContext<CThemeContextParams>({
  cTheme: 'dark',
  setCTheme: () => { }
})

export default CThemeContext