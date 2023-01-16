
export const getProducts = async () => {
    const getRequest = await fetch('/handleProducts')
    const getResponse = await getRequest.json()
    return getResponse
}

export const postComment = async (payload) => {
    await fetch('/handleComments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: payload[1][payload[0]]._id,
            rating: payload[1][payload[0]].ratings
        })
    })
}

export const postAvg = async (payload) => {
    await fetch('/handleAvg', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: payload[1][payload[0]]._id,
            avgRating: payload[1][payload[0]].avgRating
        })
    })
}

export const stripeCheckout = async (cart) => {
    const postRequest = await fetch('/stripeCheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
    })
    const postResponse = await postRequest.json()
    console.log(postResponse)
    window.location.assign(postResponse.url)
}