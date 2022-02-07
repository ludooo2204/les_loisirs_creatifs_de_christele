import React from 'react';

const ListeImages = ({images}) => {
  console.log("images from ListeImages");
  console.log(images);
  console.log(URL.createObjectURL(images));
  return <>
  {images&&images.map(image=><div>{image.name}</div>)}
  {images&&images.map(image=><img>{image.name}</img>)}
  </>;
};

export default ListeImages;
