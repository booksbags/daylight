import React from 'react'
import { CardStyle } from './style'
import { useNavigate } from 'react-router-dom';
import coverImg from "@public/pic/mds.jpg"


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
      <img src={img ? img :coverImg}/>
    </CardStyle>
  )
}

export default Card
