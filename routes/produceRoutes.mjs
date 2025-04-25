//imports
import express from 'express';
import Produce from '../models/produceSchema.mjs';
const router = express.Router();

//Expensive route
router.get('/expensive/:price', async (req, res) => {

  let result = await Produce.priceAbove(req.params.price);

  res.json(result);
});

// category route
router.get('/category/:id', async (req, res) => {
  let oneProduce = await Produce.findOne({ _id: req.params.id });

  let result = await oneProduce.getCategory();

  res.json(result);
});

// Create
router.post('/', async (req, res) => {
  // Specify Action
  let newProduce = await Produce.create(req.body);

  // Return new object
  res.json(newProduce);
});

// Read -GetAll Route
router.get('/', async (req, res) => {
  // Specify Action
  let allProduce = await Produce.find({});

  // Return result
  res.json(allProduce);
});

// update
router.put('/:id', async (req, res) => {
  // Specify Action
  const updatedProduce = await Produce.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // will return the newly updated document
  );

  // return result
  res.json(updatedProduce);
});

// Delete
router.delete('/:id', async (req, res) => {
  // Specify Action
  const deletedProduce = await Produce.findByIdAndDelete(req.params.id);

  // return result
  res.json(deletedProduce); // return deleted itm. optional. can return delete message
});

export default router;
