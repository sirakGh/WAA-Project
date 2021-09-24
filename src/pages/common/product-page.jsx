import React from 'react';
import ProductDetail from '../../components/Product/ProductDetail';


const ProductPage = (props) => {
    return (
        <div>
            <ProductDetail productId={props.match.params.id} />
        </div>
    );
}

export default ProductPage;