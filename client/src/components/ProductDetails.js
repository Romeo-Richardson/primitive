// React
import React, { useEffect, useState, useRef } from 'react'

//React Query 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// React Router DOM
import { useParams } from 'react-router-dom'

// Fetch Calls
import { getProducts } from '../helper/async'
import { postComment } from '../helper/async'
import { postAvg } from '../helper/async'
import { stripeCheckout } from '../helper/async'

// Images
import ratingStar from '../images/filled-star.png'

// Styled Components
import { ProductDisplayContainer } from '../styles/ProductDisplayContainer'
import { ProductDisplayArea } from '../styles/ProductDisplayArea'
import { ProductInfoArea } from '../styles/ProductInfoArea'
import { ProductDisplayImageContainer } from '../styles/ProductDisplayImageContainer'
import { ProductAltDisplay } from '../styles/ProductAltDisplay'
import { ProductImage } from '../styles/ProductImage'
import { MainBannerH2 } from '../styles/MainBannerH2'
import { RatingContainer } from '../styles/RatingContainer'
import { Rating } from '../styles/Rating'
import { RatingImage } from '../styles/RatingImage'
import { ProductDetailTextContainer } from '../styles/ProductDetailTextContainer'
import { ProductDetailText } from '../styles/ProductDetailText'
import { QuantityContainer } from '../styles/QuantityContainer'
import { QuantitySubContainer } from '../styles/QuantitySubContainer'
import { QuantityContent } from '../styles/QuantityContent'
import { ProductActionsContainer } from '../styles/ProductActionsContainer'
import { ProductActionButton } from '../styles/ProductActionButton'
import { PostRatingsArea } from '../styles/PostRatingsArea'
import { PostRatingsAreaLeft } from '../styles/PostRatingsAreaLeft'
import { PostRatingsAreaRight } from '../styles/PostRatingsAreaRight'
import { RatingNameInput } from '../styles/RatingNameInput'
import { RatingInput } from '../styles/RatingInput'
import { RatingTextInput } from '../styles/RatingTextInput'
import { RatingRangeContainer } from '../styles/RatingRangeContainer'
import { CommentsHeader } from '../styles/CommentsHeader'
import { ProductsH1 } from '../styles/ProductsH1'
import { CommentContainer } from '../styles/CommentContainer'
import { NameInputContainer } from '../styles/NameInputContainer'
import { SubmitButton } from '../styles/SubmitButton'
import { ProductAltDisplayImgContainer } from '../styles/ProductAltDisplayImgContainer'
import { ProductAltImg } from '../styles/ProductAltImg'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../redux/cartSlice'
import { HeaderText } from '../styles/HeaderText'
import { ProductInfoHeader } from '../styles/ProductInfoHeader'
import { ProductInfoKeyword } from '../styles/ProductInfoKeyword'



const ProductDetails = () => {
    // Local State
    const [quantity, setQuantity] = useState(0)
    const [currentRating, setCurrentRating] = useState(5)
    const [nameInput, setNameInput] = useState('')
    const [commentInput, setCommentInput] = useState('')
    const [buttonStatus, setButtonStatus] = useState('all')

    // References
    const displayImageRef = useRef()
    const nameRef = useRef()
    const commentRef = useRef()
    const ratingRef = useRef()

    // React Router DOM
    // Holds URL Information
    const { id } = useParams()

    // Redux Global State to manage cart
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.reduceCartSlice.cart)

    // React Query
    // Contains all Product Information
    const { data: products } = useQuery(['products'], getProducts)

    const queryClient = useQueryClient()

    // OnSuccess actions for Fetch Calls
    const { mutate: mutateProduct } = useMutation(postComment, {
        onSuccess: async (payload) => {
            await queryClient.cancelQueries(['products'])
            queryClient.setQueryData(['products'], payload[1])
            queryClient.invalidateQueries(['products'])
        }
    })

    const { mutate: mutateAvg } = useMutation(postAvg, {
        onSuccess: async (payload) => {
            await queryClient.cancelQueries(['products'])
            queryClient.setQueryData(['products'], payload[1])
            queryClient.invalidateQueries(['products'])
        }
    })

    // Logic 

    // Sets Current Product
    const currentProduct = products?.filter((item) => {
        return item.productID === id
    })

    const addToCart = () => {
        if (currentProduct) {
            const cartItem = {
                name: currentProduct[0].name,
                quantity: quantity,
                id: id
            }
            const payload = [...cart, cartItem]
            console.log(cartItem)
            dispatch(setCart(payload))
        }
    }

    // Handles Posting Product Reviews
    const sendComment = () => {
        if (nameInput === '') {
            alert('Please enter a valid Name/Alias')
        } else if (commentInput === '') {
            alert('Please enter a Comment')
        } else {
            const newComment = {
                name: nameInput,
                rating: currentRating,
                comment: commentInput
            }
            const productIndex = products.indexOf(currentProduct[0])
            products[productIndex].ratings.push(newComment)
            const payload = [productIndex, products]
            mutateProduct(payload)
            nameRef.current.value = ''
            commentRef.current.value = ''
            ratingRef.current.value = 5
            setCurrentRating(5)
        }
    }

    // Updates Average Rating on Mount
    const updateAvg = () => {
        let counter = 0
        currentProduct[0].ratings.forEach((rating) => {
            counter += rating.rating
        })
        let indexCounter = Math.round(counter / currentProduct[0].ratings.length)
        let temp = []
        while (indexCounter !== 0) {
            temp.push('')
            indexCounter--
        }
        const productIndex = products.indexOf(currentProduct[0])
        products[productIndex].avgRating = temp
        const payload = [productIndex, products]
        mutateAvg(payload)
    }

    useEffect(() => {
        if (currentProduct) {
            updateAvg()
        }
    }, [])

    // Controls Image Switching
    const changeDisplayImage = (src) => {
        displayImageRef.current.src = src
    }

    // Prevents Quantity from going negative
    useEffect(() => {
        if (quantity < 1) {
            setButtonStatus('none')
        } else {
            setButtonStatus('all')
        }
    }, [quantity])


    return (
        <>
            <ProductDisplayContainer>
                <ProductDisplayArea>
                    <ProductAltDisplay>
                        {currentProduct ? currentProduct[0].imgCollection?.map((img, key) => {
                            return (
                                <ProductAltDisplayImgContainer key={key}>
                                    <ProductAltImg src={img} onClick={(e) => {
                                        changeDisplayImage(e.target.src)
                                    }}></ProductAltImg>
                                </ProductAltDisplayImgContainer>
                            )
                        }) : <></>}
                    </ProductAltDisplay>
                    <ProductDisplayImageContainer>
                        {currentProduct ? <ProductImage of={'cover'} ref={displayImageRef} src={currentProduct[0].imgURL}></ProductImage>
                            : <></>}
                    </ProductDisplayImageContainer>
                </ProductDisplayArea>
                <ProductInfoArea>
                    {currentProduct ? <ProductInfoHeader>{currentProduct[0].name}</ProductInfoHeader>
                        : <></>}
                    <RatingContainer>
                        {currentProduct ? currentProduct[0].avgRating.map((item, key) => {
                            return (
                                <Rating key={key}>
                                    <RatingImage src={ratingStar}></RatingImage>
                                </Rating>
                            )
                        }) : <></>}
                    </RatingContainer>
                    <ProductInfoKeyword>Details:</ProductInfoKeyword>
                    {currentProduct ? <ProductDetailText>{currentProduct[0].productDetail}</ProductDetailText>
                        : <></>}
                    {currentProduct ? <ProductInfoKeyword>Price: ${currentProduct[0].displayPrice}</ProductInfoKeyword>
                        : <></>}
                    <QuantityContainer>
                        <ProductInfoKeyword>Quantity:</ProductInfoKeyword>
                        <QuantitySubContainer>
                            <QuantityContent cursor={'pointer'} status={buttonStatus} onClick={() => {
                                setQuantity(prev => prev - 1)
                            }}>-</QuantityContent>
                            <QuantityContent>{quantity}</QuantityContent>
                            <QuantityContent cursor={'pointer'} onClick={() => {
                                setQuantity(prev => prev + 1)
                            }}>+</QuantityContent>
                        </QuantitySubContainer>
                    </QuantityContainer>
                    <ProductActionsContainer>
                        <ProductActionButton onClick={addToCart}>
                            <ProductInfoKeyword>Add to Cart</ProductInfoKeyword>
                        </ProductActionButton>
                        <ProductActionButton onClick={() => { cart.length > 0 ? stripeCheckout(cart) : alert('Cart Empty') }}>
                            <ProductInfoKeyword>Checkout</ProductInfoKeyword>
                        </ProductActionButton>
                    </ProductActionsContainer>
                </ProductInfoArea>
            </ProductDisplayContainer>
            <CommentsHeader>
                <ProductsH1>Product Reviews</ProductsH1>
            </CommentsHeader>
            {currentProduct ? currentProduct[0].ratings?.map((item, key) => {
                let temp = []
                let counter = item.rating
                while (counter !== 0) {
                    temp.push('')
                    counter--
                }
                return (
                    <CommentContainer key={key}>
                        <ProductDetailText>Name: {item.name}</ProductDetailText>
                        <RatingContainer>
                            {temp.map(() => {
                                return (
                                    <Rating>
                                        <RatingImage src={ratingStar}></RatingImage>
                                    </Rating>
                                )
                            })}
                        </RatingContainer>
                        <ProductDetailText>{item.comment}</ProductDetailText>
                    </CommentContainer>
                )
            }) : <></>}
            <PostRatingsArea>
                <PostRatingsAreaLeft>
                    <HeaderText ta={'center'}>Share your experience</HeaderText>
                    <ProductDetailText top={'-45'} ta={'center'}>We here at Primitive pride ourselves in our quest for quality. We feel in order to deliver on our quest and put the customer first we need to hear from you, our amazing customers. Please consider leaving a positive rating if you enjoyed your experience.</ProductDetailText>
                </PostRatingsAreaLeft>
                <PostRatingsAreaRight>
                    <NameInputContainer>
                        <RatingNameInput placeholder='Name or Alias' ref={nameRef} onChange={(e) => { setNameInput(e.target.value) }}></RatingNameInput>
                        <SubmitButton onClick={sendComment}>Submit</SubmitButton>
                    </NameInputContainer>
                    <RatingRangeContainer>
                        <RatingInput type={'range'} ref={ratingRef} min={0} max={5} onChange={(e) => { setCurrentRating(e.target.value) }}></RatingInput>
                        <p style={{ fontWeight: 'bold', fontSize: '36px' }}>{currentRating}/5</p>
                    </RatingRangeContainer>
                    <RatingTextInput placeholder='Comment' ref={commentRef} onChange={(e) => { setCommentInput(e.target.value) }}></RatingTextInput>
                </PostRatingsAreaRight>
            </PostRatingsArea>
        </>
    )
}

export default ProductDetails