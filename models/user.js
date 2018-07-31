module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    User.associate = function(models) {
        // Add relationships here
    };
  
    return User;
  };

// -- EXAMPLE -- DELETE THIS -- 
//   module.exports = function(sequelize, DataTypes) {
//   var Author = sequelize.define("Author", {
//     // Giving the Author model a name of type STRING
//     name: DataTypes.STRING
//   });

//   Author.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     Author.hasMany(models.Post, {
//       onDelete: "cascade"
//     });
//   };
//   return Author;
// };