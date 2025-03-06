import { useTheme } from "./ThemeProvider";
import { saveAs } from 'file-saver';
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
                const imageUrl = images[key].download+"&client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI";

                async function downloadImage() {
                    try {
                        const response = await fetch(imageUrl);
                        
                        if (!response.ok) {
                            throw new Error('Couldn\'t fetch the image');
                        }

                        const image = await response.json();
                        
                        saveAs(image.url, images[key].id+".png");
                    } catch (error) {
                        console.error('Error al descargar la imagen:', error);
                    }
                }

                return <div className="image-card" key={images[key].id}>
                    <div className="image-card__card image-card__interact">
                        <button className={"image-card--save image-card--save--"+(isDark?"dark":"light")}>
                            <img src={"assets/img/bookmark-"+(isDark?"dark":"light")+".png"} alt="bookmark"></img>
                        </button>
                        <div className="image-card__card--download">
                            <button onClick={downloadImage}><img src="assets/img/download-dark.png" alt=""/></button>
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


