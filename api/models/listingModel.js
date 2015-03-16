var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
	
    title: String,
    price: String,
    description: String,
	  img: [ Object ],
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	  created_at : { type: Date }
});

listingSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



module.exports = mongoose.model('Listing', listingSchema);