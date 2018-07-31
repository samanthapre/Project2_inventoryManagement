module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        type: DataTypes.STRING,
        model: DataTypes.STRING,
        size: DataTypes.DECIMAL(3,1),
        width: DataTypes.STRING
    });
  
    Product.associate = function(models) {
        // Add relationships here
    };
  
    return Product;
  };
