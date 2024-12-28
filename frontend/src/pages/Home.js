import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpods"} heading={"Top Airpods"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular Earphone"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Moliles"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera and Photography"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct category={"processor"} heading={"Processors"}/>
      <VerticalCardProduct category={"refrigarator"} heading={"Refrigrirators"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Gromming"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
    </div>
  )
}

export default Home
