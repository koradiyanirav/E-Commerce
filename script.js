// Index.Html Started

var products = "";
$.ajax({
  type: "get",
  url: "https://fakestoreapi.com/products/categories",
  success: function (preload) {
    // console.log(preload);
    var categorie = preload;
    for (var i = 0; i < categorie.length; i++) {
      // console.log(categorie[i]);
      products += `
                <div><a href="products.html?category=${categorie[i]}" class="categorie">${categorie[i]}</a></div>
                `;
      // console.log(products);
    }
    $(".main_nav_content").html(products);
  },
});

// Index.Html End

// Products.Html Started

var params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// console.log(params.category);
$.ajax({
  type: "get",
  url: "https://fakestoreapi.com/products/category/" + params.category,
  success: function (data) {
    // console.log(data);
    var products = data;
    var categorie = "";
    for (var i = 0; i < products.length; i++) {
      // console.log(products[i]);
      categorie += `
              <div class="m-3 ">
                  <a href="product.html?id=${products[i].id}" class="text-decoration-none">
                  <div class="card" style="width:400px">
                      <img class="card-img-top" src="${products[i].image}" alt="not found image" style="width:100%">
                      <div class="card-body">
                          <h4 class="card-title">${products[i].title}</h4>
                          <a href="#" class="btn btn-primary">${products[i].price}$</a>
                          <button class="btn btn-success" onclick="addToCart(${products[i].id})">Add To Cart</button>
                      </div>
                  </div>
                  </a>
              </div>`;
      // console.log(categorie)
    }
    $(".containe").html(categorie);
  },
});

// Products.Html End

// product.Html Started

var params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// console.log(params.id)
$.ajax({
  type: "get",
  url: "https://fakestoreapi.com/products/" + params.id,
  success: function (data) {
    // console.log(data);
    var prod = `
        <div class="mt-5 mb-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10">
                   <div class="card" id="item1">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="images p-3">
                                    <div class="text-center p-4">
                                        <img id="main-image" src="${data.image}" width="300" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="product p-4">
                                    <div class="mt-4 mb-3">
                                        <h5 class="text-uppercase" id="card_title">${data.title}</h5>
                                        <div class="price d-flex flex-row align-items-center"> 
                                            <span class="act-price">$${data.price}</span>
                                            <div id="price-info-icon" class="d-flex cursor-pointer ">
                                                <i class="fa fa-info-circle " aria-hidden="true"></i>
                                            </div>
                                    </div>
                                </div>
                                    <div class="rating-wrap my-3">
                                        <b class="label-rating text-warning">${data.rating.rate}<img src="star.svg" class="startsvg"></b>
                                        <span class="label-rating text-muted">${data.rating.count} ratings</span>
                                        <span class="label-rating text-success">In stock</span>
                                    </div> <!-- rating-wrap.// -->
                                    <p class="about">${data.description}</p>
                                    <div class="sizes mt-5">
                                        <h6 class="text-uppercase">Size</h6> 
                                        <label class="radio">
                                            <input type="radio" name="size" value="S" checked> 
                                            <span>S</span> 
                                        </label> 
                                        <label class="radio">
                                            <input type="radio" name="size" value="M">
                                            <span>M</span> 
                                        </label> 
                                        <label class="radio">
                                            <input type="radio" name="size" value="L">
                                            <span>L</span> 
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="size" value="XL">
                                            <span>XL</span> 
                                        </label> 
                                        <label class="radio">
                                            <input type="radio" name="size" value="XXL">
                                            <span>XXL</span> 
                                        </label>
                                    </div>
                                    <div class="cart mt-4 align-items-center"> 
                                        <button class="btn btn-danger text-uppercase mr-2 px-4" id="addcart">Add to cart</button>            
                                        <i class="fa fa-heart text-muted hover-danger"></i> 
                                        <i class="fa fa-share-alt text-muted"></i> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                `;
    console.log(prod);
    $("#product").html(prod);
  },
});

// product.Html End

//Add Cart Started
function addToCart(id) {
  $.ajax({
    type: "post",
    data: {
      userId: 5,
      date: 2020 - 02 - 03,
      products: [{ productId: id, quantity: 1 }],
    },
    url: "https://fakestoreapi.com/carts/",
    success: function (data) {
      console.log("success:", data);
    },
    error: function (error) {
      console.log(error.responseJSON);
    },
  });
}

// Add Cart End

// Navbar Script Started

function change_image(image) {
  var container = document.getElementById("main-image");

  container.src = image.src;
}
document.addEventListener("DOMContentLoaded", function (event) {});

$(document).ready(function () {
  "use strict";

  var menuActive = false;
  var header = $(".header");
  setHeader();
  initCustomDropdown();
  initPageMenu();

  function setHeader() {
    if (window.innerWidth > 991 && menuActive) {
      closeMenu();
    }
  }

  function initCustomDropdown() {
    if ($(".custom_dropdown_placeholder").length && $(".custom_list").length) {
      var placeholder = $(".custom_dropdown_placeholder");
      var list = $(".custom_list");
    }

    placeholder.on("click", function (ev) {
      if (list.hasClass("active")) {
        list.removeClass("active");
      } else {
        list.addClass("active");
      }

      $(document).one("click", function closeForm(e) {
        if ($(e.target).hasClass("clc")) {
          $(document).one("click", closeForm);
        } else {
          list.removeClass("active");
        }
      });
    });

    $(".custom_list a").on("click", function (ev) {
      ev.preventDefault();
      var index = $(this).parent().index();

      placeholder.text($(this).text()).css("opacity", "1");

      if (list.hasClass("active")) {
        list.removeClass("active");
      } else {
        list.addClass("active");
      }
    });

    $("select").on("change", function (e) {
      placeholder.text(this.value);

      $(this).animate({ width: placeholder.width() + "px" });
    });
  }

  /* 

	4. Init Page Menu

	*/

  function initPageMenu() {
    if ($(".page_menu").length && $(".page_menu_content").length) {
      var menu = $(".page_menu");
      var menuContent = $(".page_menu_content");
      var menuTrigger = $(".menu_trigger");

      //Open / close page menu
      menuTrigger.on("click", function () {
        if (!menuActive) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      //Handle page menu
      if ($(".page_menu_item").length) {
        var items = $(".page_menu_item");
        items.each(function () {
          var item = $(this);
          if (item.hasClass("has-children")) {
            item.on("click", function (evt) {
              evt.preventDefault();
              evt.stopPropagation();
              var subItem = item.find("> ul");
              if (subItem.hasClass("active")) {
                subItem.toggleClass("active");
                TweenMax.to(subItem, 0.3, { height: 0 });
              } else {
                subItem.toggleClass("active");
                TweenMax.set(subItem, { height: "auto" });
                TweenMax.from(subItem, 0.3, { height: 0 });
              }
            });
          }
        });
      }
    }
  }

  function openMenu() {
    var menu = $(".page_menu");
    var menuContent = $(".page_menu_content");
    TweenMax.set(menuContent, { height: "auto" });
    TweenMax.from(menuContent, 0.3, { height: 0 });
    menuActive = true;
  }

  function closeMenu() {
    var menu = $(".page_menu");
    var menuContent = $(".page_menu_content");
    TweenMax.to(menuContent, 0.3, { height: 0 });
    menuActive = false;
  }
});

// Navbar Script End

function getCart() {
  $.ajax({
    type: "get",
    url: "https://fakestoreapi.com/carts/user/2",
    success: function (data) {
      var cartProducts = data[0].products;
      for (var i = 0; i < cartProducts.length; i++) {
        console.log(cartProducts[i]);
        $.ajax({
          type: "get",
          url: "https://fakestoreapi.com/products/" + cartProducts[i].productId,
          success: function (preloads) {
            console.log("success:", preloads);
            var productsCart = preloads;
            carts = ` <section class="gradient-custom mt-25">
            <div class="container">
              <div class="row d-flex justify-content-center my-4">
                <div class="col-md-8">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row vizen">
                        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                            <img src="${productsCart.image}"
                              class="w-100" alt="Blue Jeans Jacket" />
                            <a href="#!">
                              <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                            </a>
                          </div>
                        </div>
                        <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p><a href="product.html" class="text-decoration-none border-0 hover-0"><strong>${productsCart.title}</strong></a></p>
                          <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                            title="Remove item" onclick="deleteUser(${productsCart.id})">
                            <i class="fas fa-trash"></i>
                          </button>
                          <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                            title="Move to the wish list">
                            <i class="fas fa-heart"></i>
                          </button>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <!-- Quantity -->
                <div class="d-flex mb-4" style="max-width: 300px">
                  <button class="btn btn-primary px-3 me-2" style="height:38px;"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>

                  <div class="form-outline text-center">
                    <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control text-center" />
                    <label class="form-label" for="form1">Qty</label>
                  </div>

                  <button class="btn btn-primary px-3 ms-2" style="height:38px;"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">  
                          <p class="text-start text-md-center">
                          <strong>$${productsCart.price}</strong>
                          </p>
                        </div>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> 
            `;
            $(".cartd").append(carts);
          },
        });
      }
      // for loop in products array
      // get single product api to get image title data of product using productid
      // create html for product and add in one variable
      // set html to div in cart.html
    },
    error: function (error) {
      console.log(error.responseJSON);
    },
  });
}

function deleteUser(id) {
  console.log(id);
  $.ajax({
    type: "delete",
    url: "https://fakestoreapi.com/products/" + id,
    success: function (data) {
      $().css("display", "none");
    },
    error: function (error) {
      console.log(error.responseJSON);
    },
  });
}
