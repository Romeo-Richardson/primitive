// React
import { useState, useRef } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from './redux/cartSlice';

// React Router DOM
import { Routes, Route, useNavigate } from 'react-router-dom'
import { CartIconContainer } from './styles/CartIconContainer';

// React Query
import { useQuery } from '@tanstack/react-query'

// Fetch Calls
import { getProducts } from './helper/async';
import { stripeCheckout } from './helper/async';

// Images
import CartIcon from './images/icon-cart.svg'
import BannerImage from './images/fem.jpg'

// Components
import ProductDetails from './components/ProductDetails';

// Styled Components
import { Global } from './styles/Global';
import { Navbar } from './styles/Navbar';
import { ResponsiveCartIcon } from './styles/ResponsiveCartIcon';
import { MainBanner } from './styles/MainBanner';
import { MainBannerH1 } from './styles/MainBannerH1';
import { MainBannerH2 } from './styles/MainBannerH2'
import { MainBannerHeaderContainer } from './styles/MainBannerHeaderContainer'
import { MainBannerH3 } from './styles/MainBannerH3'
import { MainBannerImageContainer } from './styles/MainBannerImageContainer';
import { MainBannerImage } from './styles/MainBannerImage';
import { ProductsHeaderContainer } from './styles/ProductsHeaderContainer';
import { ProductsH1 } from './styles/ProductsH1';
import { ProductsH2 } from './styles/ProductsH2';
import { Gallery } from './styles/Gallery';
import { CardContainer } from './styles/CardContainer';
import { ProductImageContainer } from './styles/ProductImageContainer';
import { ProductImage } from './styles/ProductImage';
import { ProductDetailsButton } from './styles/ProductDetailsButton';
import { AddToCartButton } from './styles/AddToCardButton';
import { CardText } from './styles/CardText';
import { Footer } from './styles/Footer';
import { FooterText } from './styles/FooterText';
import { CartContainer } from './styles/CartContainer';
import { CartItem } from './styles/CartItem';
import { CartItemDetails } from './styles/CartItemDetails';
import { Hover } from './styles/Hover';
import { CartIconSubContainer } from './styles/CartIconSubContainer';
import { PrimitiveNavText } from './styles/PrimitiveNavText';
import { CartCounterContainer } from './styles/CartCounterContainer';
import { FooterTextContainer } from './styles/FooterTextContainer';

function App() {
  // Local State
  const [showCart, setShowCart] = useState('scale(0)')

  // React Router DOM
  const navigate = useNavigate()

  // Redux Global State to manage cart
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.reduceCartSlice.cart)

  // React Query
  const { data: products, isFetched } = useQuery(['products'], getProducts)

  if (isFetched) {
    console.log(products)
  }

  // Logic
  // Controls display of cart on Click
  const toggleCart = () => {
    showCart === 'scale(0)' ?
      setShowCart('scale(1)') :
      setShowCart('scale(0)')
  }

  // Deletes target item from cart
  const deleteItem = (id) => {
    console.log(id)
    const targetItem = cart.filter((item) => {
      return item.id === id
    })[0]
    console.log(targetItem)
    const targetIndex = cart.indexOf(targetItem)
    const temp = [...cart]
    temp.splice(targetIndex, 1)
    dispatch(setCart(temp))
  }

  // Handles adding Item to cart
  const addToCart = (id) => {
    const targetItem = products.filter((item) => {
      return item.productID === id
    })[0]

    const cartItem = {
      name: targetItem.name,
      quantity: 1,
      id: id
    }

    const payload = [...cart, cartItem]
    dispatch(setCart(payload))
  }

  return (
    <>
      <Global />
      <Navbar>
        <PrimitiveNavText onClick={() => {
          navigate('/')
        }}>P R I M I T I V E</PrimitiveNavText>
        <CartContainer>
          <CartIconContainer>
            <CartIconSubContainer>
              {cart.length > 0 ? <CartCounterContainer onClick={toggleCart}>{cart.length}</CartCounterContainer>
                : <></>}
              <ResponsiveCartIcon src={CartIcon} onClick={toggleCart}></ResponsiveCartIcon>
            </CartIconSubContainer>
          </CartIconContainer>
          {cart.length > 0 ? cart.map((item) => {
            return (
              <CartItem scale={showCart}>
                <CartItemDetails onClick={() => { navigate(`/products/${item.id}`) }}>
                  <Hover><p style={{ fontSize: '24px' }}>{item.name}: x{item.quantity}</p></Hover>
                </CartItemDetails>
                <Hover fs={'24px'} fw={'bold'} id={item.id} onClick={(e) => {
                  deleteItem(e.target.id)
                }}>x</Hover>
              </CartItem>
            )
          }) : <CartItem scale={showCart}>
            <CartItemDetails>
              <p style={{ fontSize: '24px' }}>No items in cart.</p>
            </CartItemDetails>
          </CartItem>}
          <>
            {cart.length > 0 ?
              <CartItem scale={showCart}>
                <CartItemDetails>
                  <Hover onClick={() => { cart.length > 0 ? stripeCheckout(cart) : alert('Cart Empty') }}>
                    <p style={{ fontSize: '24px' }}>Proceed to Checkout</p>
                  </Hover>
                </CartItemDetails>
              </CartItem> : <></>}
          </>
        </CartContainer>
      </Navbar>
      <Routes>
        <Route path='/*' element={
          <>
            <MainBanner>
              <MainBannerHeaderContainer>
                <MainBannerH1>Amazing Styles</MainBannerH1>
                <MainBannerH2>Street Fashion</MainBannerH2>
                <MainBannerH3>PRIMITIVE</MainBannerH3>
              </MainBannerHeaderContainer>
              <MainBannerImageContainer>
                <MainBannerImage src={BannerImage}></MainBannerImage>
              </MainBannerImageContainer>
            </MainBanner>
            <ProductsHeaderContainer>
              <ProductsH1>Products</ProductsH1>
              <ProductsH2>Only the best</ProductsH2>
            </ProductsHeaderContainer>
            <Gallery>
              {products ? products.map((item) => {
                return (
                  <CardContainer>
                    <ProductImageContainer>
                      <ProductImage of={'cover'} src={item.imgURL}></ProductImage>
                    </ProductImageContainer>
                    <ProductDetailsButton onClick={() => {
                      navigate(`/products/${item.productID}`)
                    }}><CardText>Product Details</CardText></ProductDetailsButton>
                    <AddToCartButton onClick={() => { addToCart(item.productID) }}><CardText>Add to Cart: ${item.displayPrice}</CardText></AddToCartButton>
                  </CardContainer>
                )
              }) : <></>}
            </Gallery>
          </>
        }>
        </Route>
        <Route path='/products/:id' element={
          <ProductDetails></ProductDetails>
        }>
        </Route>
      </Routes>
      <Footer>
        <FooterTextContainer>
          <FooterText onClick={() => { navigate('/') }}>Home</FooterText>
        </FooterTextContainer>
        <FooterTextContainer>
          <FooterText onClick={() => { cart.length > 0 ? stripeCheckout(cart) : alert('Cart Empty') }}>Checkout</FooterText>
        </FooterTextContainer>
        <FooterTextContainer>
          <FooterText onClick={() => { window.location.assign('https://romeo.herokuapp.com/') }}>Portfolio</FooterText>
        </FooterTextContainer>
        <FooterTextContainer>
          <FooterText onClick={() => { window.location.assign('https://github.com/Romeo-Richardson') }}>Github</FooterText>
        </FooterTextContainer>
      </Footer>
    </>
  );
}

export default App;
