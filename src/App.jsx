import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/header/Header';
import LightDarkThemeToggler from './components/header/LightDarkThemeToggler';
import BurgerMenu from './components/header/BurgerMenu';
import Nav from './components/header/Nav';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import MyPhotos from './pages/MyPhotos';


function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
      setIsActive(!isActive);
  }

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header logoText={"OxygenIMAGES"}>
          <LightDarkThemeToggler img={"./src/img/light-dark-"} size={30}/>
          <Nav isMenuDeployed={isActive}/>
          <BurgerMenu isDeployed={isActive} onClick={toggleActive} classname="burger_menu"/>
        </Header>
      </ThemeProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/myphotos" element={<MyPhotos/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
