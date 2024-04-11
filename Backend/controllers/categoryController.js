const Category = require('../models/category');


const getAllCategories = async (req,res) => {
    try {
        const category = await Category.find()
        if (!category) {
            return res.status(400).json({message: 'Category not found'})
        }
        return res.status(200).json(category)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const categories = await Category.findById(id);
        if (categories) {
            return res.json(comments);
        }
        return res.status(404).json({message: 'Category not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createCategory = async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name
        })

        await newCategory.save();
        return res.status(201).json({message: "Category created successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed to create category"});
    }
}

const updateCategory = async (req, res) => {
    const CategoryId = req.params.id
    const updateFields = req.body
    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateFields, { new: true })
        if (!updatedCategory) {
            return res.status(404).json({message: 'Category unable to update'})
        }
        return res.status(200).json(updatedCategory)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error.message);
    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId)
        if (!deletedCategory) {
            return res.status(404).json({message: "Category not found"});
        }
        return res.status(200).json(deletedCategory)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}


module.exports = {
    getAllCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
    createCategory
}