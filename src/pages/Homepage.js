import React, { useState, useEffect } from "react";
import ProductService from "../sevices/ProductService";
import SidebarComponent from "../components/SidebarComponent";
import ProductListItem from "../components/ProductListItem";

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [productList, setProduct] = useState([]);
  const [updatedProductList, setUpdadetProduct] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    ProductService.getAll().then((response) => {
      setProduct(response.products);
      let newcategoryList = [];
      let newbrandList = [];
      response.products.forEach(function (item, index) {
        newcategoryList.push({ value: item.category, category: item.category.charAt(0).toUpperCase() + item.category.replace("-", " ").slice(1), checked: false });
        newbrandList.push({ value: item.brand, brand: item.brand.charAt(0).toUpperCase() + item.brand.slice(1), checked: false });
      });

      const categorys = newcategoryList.map((o) => o.category);
      const brands = newbrandList.map((o) => o.brand);
      const filteredCategory = newcategoryList.filter(({ category }, index) => !categorys.includes(category, index + 1));
      const filteredBrand = newbrandList.filter(({ brand }, index) => !brands.includes(brand, index + 1));
      setCategoryList(filteredCategory);
      setBrandList(filteredBrand);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="container mt-50 mb-50">
        <div className="row">
          <SidebarComponent brandListx={brandList} categoryListx={categoryList} productList={productList} setUpdadetProduct={setUpdadetProduct} />

          <div className="col-lg-9">
            <div className="shop-product-fillter mb-30">
              <div className="totall-product">
                <p>
                  Toplam <strong className="text-brand">{updatedProductList.length}</strong> ürün bulunud!
                </p>
              </div>
            </div>

            <div className="row">{updatedProductList.length > 0 && updatedProductList.map((item) => <ProductListItem item={item} key={item.id} />)}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Homepage;
