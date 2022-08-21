import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const ProductListItem = (item) => {
  item = item.item;
  if (item === undefined) {
    return <div>loading...</div>;
  } else {
    return (
      <div className=" col-md-4 col-12 col-sm-6">
        <div className="product-cart-wrap mb-30">
          <div className="product-img-action-wrap">
            <div className="product-img product-img-zoom">
              <a href="shop-product-right.html">
                <img className="default-img" src={item.images[0]} alt="" />
              </a>
            </div>
          </div>
          <div className="product-content-wrap">
            <div className="product-category">{item.category.charAt(0).toUpperCase() + item.category.replace("-", " ").slice(1)}</div>
            <h2 className="product-tilte">{item.title}</h2>
            <p className="product-description">{item.description.substring(0, 40)}</p>
            <span className="font-small text-muted">
              By <span className="brand-name">{item.brand.charAt(0).toUpperCase() + item.brand.slice(1).toLowerCase()}</span>
            </span>
            <div className="product-card-bottom">
              <div className="product-price">
                <span>
                  <NumberFormat value={item.price - (item.price / 100) * item.discountPercentage} displayType={"text"} thousandSeparator={true} decimalScale={2} suffix={"₺"} />
                </span>
                <NumberFormat className="old-price" value={item.price} displayType={"text"} thousandSeparator={true} decimalScale={2} suffix={"₺"} />
              </div>
              <div className="add-cart">
                <Link to={`/product-detail/${item.id}`} className="add">
                  <i className="fi-rs-shopping-cart mr-5"></i>Detay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductListItem;
