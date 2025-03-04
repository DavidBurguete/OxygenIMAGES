import { useTheme } from "./ThemeProvider";
import Masonry from 'react-masonry-css'

function ImageCard({images}){
    const { isDark } = useTheme();

    const breakpointColumnsObj = {
        default: 4,
        999: 2
    };

    return (<Masonry
            breakpointCols={breakpointColumnsObj}
            className="image-cards-grid"
            columnClassName="image-cards"
        >{
            Object.keys(images).map(key =>{ 
                return <div className="image-card" key={images[key].id}>
                    <div className="image-card__card image-card__interact">
                        <button className={"image-card--save image-card--save--"+(isDark?"dark":"light")}>
                            <img src={"assets/img/bookmark-"+(isDark?"dark":"light")+".png"} alt="bookmark"></img>
                        </button>
                        <div className="image-card__card--download">
                            <button><img src="assets/img/download-dark.png" alt=""/></button>
                        </div>
                        <img className="image-card__card no-visibility" src={images[key].link}/>
                    </div>
                    <img className="image-card__card" src={images[key].link}/>
                </div>
            })
        }
    </Masonry>);
}

export default ImageCard;


