import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../configuration/api";
import { authenticationService } from "../../../services/authentication.service";
import "./Products.css";

const Products = (props) => {
    const [productItems, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();




    const config = {
        method: 'get',
        url: 'http://localhost:8080/products',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    };

   function addToCart(item){

        api.get('buyers/'+authenticationService.currentUserValue?.userId+ '/shoppingcart')
            .then(function (response) {
                let products = response.data;
                products.push(item);
                api.patch('buyers/' + authenticationService.currentUserValue?.userId + '/shoppingcart', products)
            })
            .then(function (response) {
                console.log("resp", response.data)
                // setRefresh(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    function fetchProducts() {
        setLoading(true);
        setError(null);
        axios(config)
            .then(function (response) {
                setProducts(response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
                setError(error.message);
            });

    }

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const data = [
            {
                id: "1",
                name: "airPods",
                price: 149,
                image: "./pics/airpods.jpg"
            },
            {
                id: "2",
                name: "iPhone X",
                price: 1299,
                image: "./pics/iphone11.jpg"
            },
            {
                id: "3",
                name: "macBook Pro",
                price: 2499,
                image: "./pics/mac book pro.jpg"
            },
            {
                id: "4",
                name: "macBook Air",
                price: 149,
                image: "./pics/macbook air.jpg"
            },
            {
                id: "5",
                name: "iPad",
                price: 1799,
                image: "./pics/Ipad and pen.jpg"
            },
            {
                id: "6",
                name: "apple watch",
                price: 349,
                image: "./pics/apple watch.jpg"
            },
            {
                id: "7",
                name: "airTags",
                price: 99,
                image: "./pics/airtags.jpg"
            }
        ]
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
    console.log(data);
    return (
        <div className="products">
            {productItems.map((productItem) => (
                <div className="card">
                    <Link to={authenticationService.currentUserValue?.userId ? 'products' + '/' + productItem.id  : '/login' } key={productItem.id}>
                    <div>
                        <img className="product-image" src={data[getRandomInt(7)].image} alt={productItem.name} />
                    </div>
                    <div>
                        <h3 className="product-name">{productItem.name} </h3>
                    </div>
                    <div className="product-price">
                        ${productItem.price}
                    </div>
                    </Link>
                    <div>
                        <button onClick={addToCart(productItem)} className="product-add-button"> Add To Cart</button>
                    </div>
            
                </div>
            ))}
        </div>
    );
}

export default Products;
