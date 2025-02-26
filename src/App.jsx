import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/header/Header';
import LightDarkThemeToggler from './components/header/LightDarkThemeToggler';
import BurgerMenu from './components/header/BurgerMenu';

function App() {

  return (
    <ThemeProvider>
      <Header logoText={"OxygenIMAGES"}>
        <LightDarkThemeToggler img={"./src/img/light-dark-"} size={30}/>
        <BurgerMenu classname="burger_menu"/>
      </Header>
    </ThemeProvider>
  )
}

export default App
