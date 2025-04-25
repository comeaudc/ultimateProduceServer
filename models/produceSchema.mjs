import mongoose from 'mongoose';

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Vegetables', 'Fruits'],
    message: 'Submitted an incorrect value, try again',
  },
  price: {
    type: Number,
    required: true,
  },
  stocked: {
    type: Boolean,
    default: false,
  },
});

// Index for the name in ascending order
// produceSchema.index({ name: 1 });

// Instance Method - will look at an instance of produce (apple) and get all other produce in the same category
produceSchema.methods.getCategory = function (cb) {
  return mongoose.model('Produce').find({ category: this.category }, cb);
};

// Static method - is run on the collection itself. return all vegetable above price
produceSchema.statics.priceAbove = function (value) {
  return this.find({ price: { $gt: value } });
};

// Virtual - a doc property that does not exist in the DB, but we want for the server/front end
produceSchema.virtual('expensive').get(function () {
  return this.price > 10;
});

produceSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Produce', produceSchema);
