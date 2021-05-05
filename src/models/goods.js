const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

/*mongoose
	.connect( 'mongodb://localhost/newsapp', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	} )
	.then( () => console.log( 'MongoDB Connected' ) )
	.catch( err => console.log( err ) );
*/
// create find data schema 
const goodsSchema = new Schema( {
	id: String,
	name: String,
	type: String,
	imgurl: String,
	buylink: String,
	price: String
} )
// register schema
const Goods = mongoose.model( 'Goods', goodsSchema )

module.exports = { Goods }