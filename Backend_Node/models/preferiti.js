import { Sequelize } from "sequelize"; 
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const FilmPreferito = db.define('favmovie', {
  movie_id: {
    type: DataTypes.INTEGER
  },
  
}, {
  freezeTableName: true
});

 
export default FilmPreferito;