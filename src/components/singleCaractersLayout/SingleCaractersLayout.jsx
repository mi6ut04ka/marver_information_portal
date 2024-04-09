import { Helmet } from 'react-helmet';
import './singleCaractersLayout.scss'

const SingleCaractersLayout = ({data}) => {
    const {name, description, thumbnail} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }
        return (
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${name} description`}
                        />
                    <title>{name}</title>
                </Helmet>
                <img style={imgStyle} src={thumbnail} alt={name} className="single-comic__char-img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
            </div>
        )
}
 
export default SingleCaractersLayout;