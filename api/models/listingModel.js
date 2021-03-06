var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
    shortId: { type: String, 'default': shortid.generate, unique: true },
    title: String,
    price: String,
    description: String,
    img: [
      {
        url: String,
      }
    ],
    buyer: { type: String, ref: 'User', indexed: true },
    buyersInPro: [{type: String, ref: 'User'}],
    seller: { type: String, ref: 'User', indexed: true },
	  created_at: { type: Date },
    status: { type: String, enum: ['active', 'inProgress', 'purchased'], default: 'active'}
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
