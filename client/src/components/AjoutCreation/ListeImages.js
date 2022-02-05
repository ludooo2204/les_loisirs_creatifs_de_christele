import React from 'react';

const ListeImages = ({images}) => {
  return <>
  {images&&images.map(image=><div>{image.name}</div>)}
  </>;
};

export default ListeImages;
