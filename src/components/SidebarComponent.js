import React, { useState, useEffect } from "react";

const SidebarComponent = ({ productList, brandListx, categoryListx, setUpdadetProduct }) => {
  const [categoryList, setCategoryList] = useState(categoryListx);
  const [brandList, setBrandList] = useState(brandListx);
  const [searchKey, setSearchKey] = useState("");
  let filterResponse = {};

  function handleCheckbox(index, e) {
    if (e.target.getAttribute("data-type") === "category") {
      categoryList[index].checked = e.target.checked;
      setCategoryList([...categoryList]);
    } else {
      brandList[index].checked = e.target.checked;
      setBrandList([...brandList]);
    }
  }

  function searchHandler() {
    let allFilteredResponse = [];
    const categoryListCE = categoryList.filter((x) => x.checked === true);
    const brandListCE = brandList.filter((x) => x.checked === true);
    filterResponse = productList;
    for (let index = 0; index < filterResponse.length; index++) {
      if (categoryListCE.length > 0 || brandListCE.length > 0) {
        for (let i = 0; i < categoryListCE.length; i++) {
          if (filterResponse[index].category === categoryListCE[i].value) {
            allFilteredResponse.push(filterResponse[index]);
            break;
          }
        }
        for (let x = 0; x < brandListCE.length; x++) {
          if (filterResponse[index].brand === brandListCE[x].value) {
            allFilteredResponse.push(filterResponse[index]);
            break;
          }
        }
      } else {
        allFilteredResponse.push(filterResponse[index]);
      }
    }
    if (searchKey !== "") {
      if (allFilteredResponse.length > 0) {
        const results = allFilteredResponse.filter((item) => {
          return item.title.toLowerCase().includes(searchKey.toLowerCase());
        });

        allFilteredResponse = [];
        for (var x = 0; x < results.length; x++) {
          allFilteredResponse.push(results[x]);
        }
      } else {
        const results = productList.filter((item) => {
          return item.title.toLowerCase().includes(searchKey.toLowerCase());
        });
        allFilteredResponse = [];
        allFilteredResponse.push(results);
      }
    }

    setUpdadetProduct(allFilteredResponse);
  }

  const searchFilter = (e) => {
    const keyword = e.target.value;
    setSearchKey(keyword);
  };

  useEffect(() => {
    searchHandler();
  }, [categoryList, brandList, searchKey]);

  return (
    <div className="col-lg-3 col-sm-6 d-none d-lg-block">
      <div className="sidebar-widget mb-30">
        <input type="search" value={searchKey} onChange={searchFilter} className="search-input" placeholder="Aranacak Kelimeyi yazınız" />
      </div>
      <div className="sidebar-widget mb-30">
        <header className="section-title">Kategori</header>
        {categoryList.length > 0 &&
          categoryList.map((item, index) => (
            <label className="form-check mb-2" key={Math.random()}>
              <input className="form-check-input" onChange={(e) => handleCheckbox(index, e)} type="checkbox" checked={item.checked} name={item.category} value={item.value} data-type="category" />
              <span className="form-check-label"> {item.category} </span>
            </label>
          ))}
      </div>
      <div className="sidebar-widget mb-30">
        <header className="section-title">Marka</header>
        {brandList.length > 0 &&
          brandList.map((item, index) => (
            <label className="form-check mb-2" key={Math.random()}>
              <input className="form-check-input" onChange={(e) => handleCheckbox(index, e)} type="checkbox" checked={item.checked} name={item.brand} value={item.value} data-type="brand" />
              <span className="form-check-label">{item.brand}</span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default SidebarComponent;
