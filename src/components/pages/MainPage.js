import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchChar from "../searchChar/SearchChar";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected = {onCharSelected}/>
                </ErrorBoundary>
                <div className="sidepanel">
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                    </ErrorBoundary>
                    <SearchChar/>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;