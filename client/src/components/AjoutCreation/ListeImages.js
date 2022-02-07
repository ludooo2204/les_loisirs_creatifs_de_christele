import React from 'react';
import styles from "./AjoutCreation.module.css";


const ListeImages = ({images}) => {
  if (images.length>0) {
  console.log("images from ListeImages");
  console.log(images);
  console.log('URL.createObjectURL(selectedFile)');
  console.log(URL.createObjectURL(images[0]));
}
  return <div className={styles.ListeImages}>
  {images&&images.map((image)=>{return <div>{image.name}
  <img className={styles.image} src={URL.createObjectURL(image)}/></div>})}
  </div>;
};

export default ListeImages;
