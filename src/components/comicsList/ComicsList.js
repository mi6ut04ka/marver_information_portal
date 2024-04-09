import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);  

    const {loading, error, getComics} = useMarvelService();
    useEffect(()=>{
        onRequest(offset, true);
        // eslint-disable-next-line
    },[])

    const onRequest = (initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(offset)
            .then(onComicsListLoaded)
    }


    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8){
            ended = true;
        }
        setComicsList(comicsList=>[...comicsList,...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset=>offset + 9);
        setComicsEnded(ended);
    }
    const renderItems = (arr) => {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition
                timeout={500}
                classNames={'comics__item'}
                key={item.id}>
                    <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img style={imgStyle} src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                    </li>
                </CSSTransition>
            )
        });
        return(
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
        
    return (
        <div className="comics__list">
            {items}
            {errorMessage}
            {spinner}
            <button className="button button__main button__long"
            onClick={()=> onRequest(offset)}
            disabled ={newItemLoading}
            style={{'display':comicsEnded? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default ComicsList;