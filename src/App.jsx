import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/header/Header';
import LightDarkThemeToggler from './components/header/LightDarkThemeToggler';
import BurgerMenu from './components/header/BurgerMenu';
import Nav from './components/header/Nav';
import About from './pages/About';
import Home from './pages/Home';
import MyPhotos from './pages/MyPhotos';
import Error404 from './pages/Error404';
import { search } from './redux/searchSlice';


function App() {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const toggleActive = () => {
      setIsActive(!isActive);
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSearch = () => {
    dispatch(search({query: query}));
  };

  handleSearch();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header logoText={"OxygenIMAGES"}>
          <input 
            type='text'
            value={query}
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
