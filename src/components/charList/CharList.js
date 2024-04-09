import {useState, useEffect, useRef} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);  
    const {loading,error,getAllCharacters} = useMarvelService();
    useEffect(()=>{
        onRequest(offset, true);
        // eslint-disable-next-line
    },[])

    const onRequest = (offset,initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }


    const onCharListLoaded = (newcharList) => {
        let ended = false;
        if(newcharList.length < 9){
            ended = true;
        }
        setCharList(charList=>[...charList,...newcharList]);
        setNewItemLoading(false);
        setOffset(offset=>offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (i) =>{
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[i].classList.add('char__item_selected');
        itemRefs.current[i].focus();
    }


    const renderItems = (arr) => {
        const items =  arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition
                key={item.id}
                timeout={500}
                classNames="char__item">
                    <li
                        tabIndex={0}
                        className="char__item"
                        ref = {el=> itemRefs.current[i] = el}
                        key={item.id}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyDown ={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                            
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button 
                onClick={()=> onRequest(offset)} 
                className="button button__main button__long"
                disabled ={newItemLoading}
                style={{'display':charEnded? 'none': 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
}


export default CharList;




