import { useEffect, useState } from "react"
import axios from "axios"

import Title from "./styled/Title"
import GridBox from "./styled/GridBox"
import CartItem from "./CartItem"

function Cart() {

    const [items, setItems] = useState([])

    useEffect(() => {
        axios
            .get("/carts/5")
            .then((res) => res.data)
            .then((json) => {
                const products = json.products
                let newItemsPromise = []
                const getProductPromise = (productId) => {
                    return axios.get(`/products/${productId}`)
                        .then(res => res.data)
                        .then(json => {
                            return {
                                ...json,
                                stock: 5
                            }
                        })
                }
                products.forEach((product) => {
                    newItemsPromise.push(getProductPromise(product.productId))
                })
                Promise.all(newItemsPromise).then((items) => {
                    setItems(items)
                })
            })
    }, [])

    return (
        <div id="cart">
            <Title>Cart</Title>
            <GridBox>
                {items.map((item) => {
                    return <CartItem key={item.id} item={item} />
                })}
            </GridBox>
        </div>
    )
}

export default Cart
