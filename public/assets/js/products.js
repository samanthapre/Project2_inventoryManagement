$(document).ready(function() {
    // productsContainer holds all of our products
    var productsContainer = $("#productContainer");
    
    
    
  
    // This function grabs posts from the database and updates the view
    function getProducts(products) {
      $.get("/api/products", function(data) {
        console.log("Products", data);
        products = data;
        if (!products || !products.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
      });
    }
    

getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // productsContainer
  function initializeRows() {
    productsContainer.empty();
    var productsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      productsToAdd.push(createNewRow(products[i]));
    }
    productsContainer.append(productsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(product) {
    var tbody = $("<tbody>");
    var trname = $("<tr>");
    trname.addClass("name");
    var trsize = $("<tr>");
    trsize.addClass("size");
    var trquantity = $("<tr>");
    trquantity.addClass("quantity");
    var trcolor = $("<tr>");
    trcolor.addClass("color");
    trname.text(product.name);
    trnsize.text(product.size);
    trquantity.text(product.quantity);
    tbody.append(trname);
    tbody.append(trsize);
    tbody.append(trquantity);
    tbody.append(trcolor);
    newPostCard.data("product", product);
    return tbody;

  }
});