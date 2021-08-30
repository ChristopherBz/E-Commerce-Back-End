const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData) //If no error return json of categories with products
  }
  catch (err) {
    res.status(400).json(err) //If error catch error and status 400
  }
});

// find category by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Nothing found with this ID' });
      return;
    }
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!categoryData) {
      res.status(404).json({ message: 'Nothing found with this ID' });
      return;
    }
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Nothing found with this ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
