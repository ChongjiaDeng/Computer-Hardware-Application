const express = require( 'express' )
 //const mongoose = require( 'mongoose' )
const cheerio = require( 'cheerio' )
const superagent = require( 'superagent' )
 //const Schema = mongoose.Schema
const searchRouter = express.Router()
const Schema = require('../models/goods.js')
const Goods = Schema.Goods

/* mongoose
	.connect( 'mongodb://localhost/newsapp', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	} )
	.then( () => console.log( 'MongoDB Connected' ) )
	.catch( err => console.log( err ) );

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
const Goods = mongoose.model( 'Goods', goodsSchema ) */

searchRouter.get( '/', ( req, res ) => res.render( 'search' ) )

// search the commodity
searchRouter.get( '/:text', async ( req, res ) => {
	const stext = req.params.text
	// const page = req.params.page
	let saveData = await reptile( stext )
	// find data from db
	Goods.find({type: stext}, function(error, data) {
		if ( data.length !== 0 ) {
			res.render( 'searchResult', {
				data: data,
				title: stext
			})
		} else {
			// reptile data and save to db
			saveData.map( item => {
				let g = new Goods( item )
				g.save(function( err ) {
					if ( err ) {
						console.log(err)
					}
				})
			})
		}
	})
} )



function reptile( key ) {
	return new Promise((resolve, reject) => {
		let url = `https://www.amazon.com/s?i=aps&k=${key}&ref=nb_sb_noss_2&url=search-alias%3Daps`
		
		superagent.get( url ).end( ( err, res ) => {
			if ( err ) {
				reject(err)
			} else {
				resolve(getGoods(res.text))
			}
		} )
		
		// filter data
		let getGoods = ( html ) => {
			const $ = cheerio.load( html )
			let result = []
			$( '.s-asin' ).each( function( idx, ele ) {
				let obj = {
					id: $( ele ).attr( 'data-uuid' ),
					type: key,
					imgurl: $( ele ).find( '.s-image' ).attr( 'src' ),
					name: $( ele ).find( '.s-image' ).attr( 'alt' ),
					price: $( ele ).find( '.a-offscreen' ).text(),
					buylink: 'https://www.amazon.com' + $( ele ).find( '.a-link-normal' ).attr( 'href' )
				}
				result.push( obj )
			} )
			return result
		}
	})	
}

module.exports = searchRouter