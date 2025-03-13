import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/header/Header';
import LightDarkThemeToggler from './components/header/LightDarkThemeToggler';
import BurgerMenu from './components/header/BurgerMenu';
import Nav from './components/header/Nav';
import About from './pages/About';
import Home from './pages/Home';
import MyPhotos from './pages/MyPhotos';
import Error404 from './pages/Error404';
import { search, goToPage, setQuery } from './redux/searchSlice';


function App() {
  const [isActive, setIsActive] = useState(false);
  const { favorites } = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const toggleActive = () => {
    setIsActive(!isActive);
  }

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
  }

  const handleSearch = () => {
    dispatch(goToPage(1));
    dispatch(search());
  };

  useEffect(handleSearch, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header logoText={"OxygenIMAGES"}>
          <input 
            type='text'
            onChange={handleChange}
            placeholder='Search...'
          ></input>
          <button onClick={handleSearch}>Search</button>
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
