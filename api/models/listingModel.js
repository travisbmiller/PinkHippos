var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
    _id: { type: String, unique: true, 'default': shortid.generate },
    title: String,
    price: String,
    description: String,
    img: [ Object ],
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true },
	created_at : { type: Date },
	status: { type: String, enum: }
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