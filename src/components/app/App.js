import { Suspense} from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SinglePage from "../singlePage/SinglePage";
import SingleComicLayout from "../singleComicLayout/SingleComicLayout";
import SingleCharacterLayout from '../singleCaractersLayout/SingleCaractersLayout'
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from "../pages/404";

// const MainPage = lazy(()=> import('../pages/MainPage'));
// const ComicsPage = lazy(()=> import('../pages/ComicsPage'));
// const Page404 = lazy(()=> import('../pages/404'));



const App = () => {
    
    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                        <Route path="/character/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </main>
            </div>
        </Router>
        )
    }

export default App;


