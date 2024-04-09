import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService'
import * as Yup from 'yup'
import './searchChar.sass'

const SearchChar = () => {
    const [error, setError] = useState(false);
    const [char, setChar] = useState({});
    const {loading,getCharacterForName} = useMarvelService();

    const onRequest = (text) => {
            getCharacterForName(text)
            .then(res => {setChar(res); setError(false)})
            .catch(()=>{setError(true); setChar({})})
    }

    const spinner = loading ? <Spinner/> : null;

    return (
        <Formik
        initialValues={{text: ''}}
        validationSchema={Yup.object({text: Yup.string().required('This field is required'),})}
        onSubmit= {values  => onRequest(values.text)}>
            <div className="search-panel">
            <div className="search-panel__text">Or find a character by name:</div>
            <Form action="">
                <Field type="text" name="text" id='text' placeholder='Enter name' />
                <button type='submit' className="button button__main">
                    <div className="inner">Find</div>
                </button>
            </Form>
            <ErrorMessage className='search-panel__error' name='text' component='div'/>
            {error ? <div className='search-panel__error'>The character was not found. Check the name and try again</div> : null}
            {char.name? 
            <div className="search-panel__error" style={{color: '#03710E'}}>
                <div>There is! Visit {char.name} page?</div>
                <Link to={`character/${char.id}`}>
                    <button className='button button__secondary'>
                        <div className="inner">TO PAGE</div>
                    </button>
                </Link>
            </div>: null}
            {spinner}
            </div>
        </Formik>
    );
}
 
export default SearchChar;