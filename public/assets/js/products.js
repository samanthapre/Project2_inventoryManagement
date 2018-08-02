$(document).ready(function() {
  console.log("doc ready")
    // productsContainer holds all of our products
    var productsTable = $("#productTable");
    
    
    
  
    // This function grabs posts from the database and updates the view
    function getProducts(products) {
      console.log("get products")
      $.get("/api/products", function(data) {
        console.log("Products", data);
        products = data;
        if (!products || !products.length) {
          displayEmpty();
        }
        else {
          initializeRows(products);
        }
      });
    }
    


  // InitializeRows handles appending all of our constructed post HTML inside
  // productsContainer
  function initializeRows(products) {
    productsTable.empty();
    var productsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      productsToAdd.push(createNewRow(products[i]));
    }
    productsTable.append(productsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(products) {
    
    var tr = $("<tr scope='row'>");
    var tdtype = $("<td class='type'>")
    
    var tdmodel = $("<td class='model'>")
    var tdsize = $("<td class='size'>")
    var tdwidth = $("<td class='width'>")
    tdtype.text(products.type);
    tdmodel.text(products.model);
    tdsize.text(products.size);
    tdwidth.text(products.width);
    tr.append(tdtype);
    tr.append(tdmodel);
    tr.append(tdsize);
    tr.append(tdwidth);
    return tr;

  }
  getProducts();
});