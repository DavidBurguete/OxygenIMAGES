import { useTheme } from "./ThemeProvider";
import { saveAs } from 'file-saver';
import { ColumnsPhotoAlbum } from "react-photo-album";
import { removeFavorite } from "../redux/favoritesSlice";
import { useDispatch } from "react-redux";
import "react-photo-album/styles.css";

function MyImageCard({fetchedImages}){
    const { isDark } = useTheme();
    const dispatch = useDispatch();
    
    const removeImage = img => {
        const img_copy = {
            id: img.id,
            src: img.src,
            date: img.date,
            width: img.width,
            height: img.height,
            alt: img.alt,
            likes: img.likes,
            liked_by_user: img.liked_by_user,
            description: img.description,
            download_link: img.download_link
        }
        dispatch(removeFavorite(img_copy));
    }

    const gallery = fetchedImages.map(image => {
        const imageUrl = image.download_link+"&client_id=Zws9gh0kAQ4lmheTh2imCNYIzl0ZpQYd6HqFDJS0XrI";
        const imageID = image.id;

        async function downloadImage() {
            try {
                const response = await fetch(imageUrl);
                
                if (!response.ok) {
                    throw new Error('Couldn\'t fetch the image');
                }

                const image = await response.json();
                saveAs(image.url, imageID+".png");
            } catch (error) {
                console.error('Error al descargar la imagen:', error);
            }
        }
        
        function fadeIn(){
            document.getElementsByTagName("html")[0].style.overflow = "hidden";
            document.getElementById(imageID).classList.add("modal--fadeIn");
            let escape = (e) => {
                if(e["key"] == "Escape"){
                    closeModal();
                }
            }
            document.addEventListener("keydown", escape);
        };

        function closeModal(){
            document.getElementsByTagName("html")[0].style.overflow = "visible";
            document.getElementById(imageID).classList.remove("modal--fadeIn");
        }

        const clickOut = (parentNode) => {
            if(parentNode.target.id === imageID){
                closeModal();
            }
        };

        return {
            id: imageID,
            src: image.src,
            date: image.date,
            width: image.width,
            height: image.height,
            alt: image.alt,
            likes: image.likes,
            liked_by_user: image.liked_by_user,
            description: image.description,
            download_link: imageUrl,
            download: downloadImage,
            fadeIn: fadeIn,
            close: closeModal,
            clickOut: clickOut
        }
    });

    return <ColumnsPhotoAlbum
        photos={gallery} 
        render={{
            photo: ({_},{photo}) => {
                return <span key={photo.id}>
                    <div className="image-card" htmlFor={photo.id}>
                        <div className="image-card__card image-card__interact">
                            <button className={`image-card--save image-card--save--${isDark?"dark":"light"}`} onClick={() => removeImage(photo)}>
                                <img src={"assets/img/crossed-bookmark-"+(isDark?"dark":"light")+".png"} alt="bookmark"></img>
                            </button>
                            <div className="image-card__card--download">
                                <button onClick={photo.download}>
                                    <img src="assets/img/download-dark.png" alt="download image"/>
                                </button>
                            </div>
                            <img className="image-card__card no-visibility" src={photo.src} alt={photo.alt} onClick={photo.fadeIn}/>
                        </div>
                        <img className="image-card__card" src={photo.src} alt={photo.alt}/>
                    </div>
                    <div className="modal" id={photo.id} role="dialog" aria-labelledby="newsletter" onClick={photo.clickOut}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-header">
                                <button id="close" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" onClick={photo.close}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <button className={"image-card--save--modal image-card--save--"+(isDark?"dark":"light")} onClick={() => removeImage(photo)}>
                                    <img src={"assets/img/crossed-bookmark-"+(isDark?"dark":"light")+".png"} alt="bookmark"></img>
                                </button>
                                <button className={"image-card--download--modal image-card--save--"+(isDark?"dark":"light")} onClick={photo.download}>
                                    <img src={"assets/img/download-"+(isDark?"dark":"light")+".png"} alt="download image"/>
                                </button>
                                <img src={photo.src} alt={photo.alt} className="modal--full_image"></img>
                            </div>
                        </div>
                    </div>
                </span>
            }
        }}
    />;
}

export default MyImageCard;