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
import Error404 from './pages/Error404';


function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
      setIsActive(!isActive);
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header logoText={"OxygenIMAGES"}>
          <LightDarkThemeToggler img={"./assets/img/light-dark-"} size={30}/>
          <Nav isMenuDeployed={isActive}/>
          <BurgerMenu isDeployed={isActive} onClick={toggleActive} classname="burger_menu"/>
        </Header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/myphotos" element={<MyPhotos/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
