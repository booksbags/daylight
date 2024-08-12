import React from 'react'
import { CardStyle } from './style'
import { useNavigate } from 'react-router-dom';


type CardProp = {
    title:string;
    img:string;
    url:string;
}

const Card = ({title, img, url}:CardProp) => {
  const goPage = useNavigate();
  return (
    <CardStyle
      onClick={
        ()=>goPage(url)
      }
    >
      <h5>{title}</h5>
      <img src={img ? img :"https://th.bing.com/th/id/OIP.fZWi-qLKVzletfZE1v744wHaNK?rs=1&pid=ImgDetMain"}/>
    </CardStyle>
  )
}

export default Card
