import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductService from "../sevices/ProductService";
import NumberFormat from "react-number-format";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    ProductService.getDetailById(id).then((response) => {
      setProduct(response);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="container mt-50 mb-50">
        <div className="page-header breadcrumb-wrap">
          <div className="container">
            <div className="breadcrumb">
              <Link to={`/`} className="add">
                Anasayfa
              </Link>
              <span></span> {product.title}
            </div>
          </div>
        </div>
        <div className="product-detail accordion-detail">
          <div className="row mb-50 mt-30">
            <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
              <div className="detail-gallery">
                <div className="product-image-slider ">
                  <img src={product.images[0]} alt="product image" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="detail-info pr-30 pl-30">
                <h2 className="title-detail">{product.title}</h2>

                <div className="clearfix product-price-cover">
                  <div className="product-price primary-color float-left">
                    <span className="current-price text-brand">
                      <NumberFormat value={product.price - (product.price / 100) * product.discountPercentage} displayType={"text"} thousandSeparator={true} decimalScale={2} suffix={"₺"} />
                    </span>
                    <span>
                      <span className="save-price font-md color3 ml-15">{product.discountPercentage}% Off</span>
                      <NumberFormat className="old-price  font-md ml-15" value={product.price} displayType={"text"} thousandSeparator={true} decimalScale={2} suffix={"₺"} />
                    </span>
                  </div>
                </div>
                <div className="short-desc mb-30">
                  <p className="font-lg">{product.description}</p>
                </div>

                <div className="detail-extralink mb-50">
                  <div className="product-extra-link2">
                    <button type="submit" className="button button-add-to-cart">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
