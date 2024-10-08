const mongoose = require('mongoose');
const categories = require('../models/category');


async function createCategory(req,res){
    const { CategoryName, createdBy, createdAt } = req.body;
    const user =req.user._id;
    console.log(req.body);
    try{
        const category = await categories.findOne({CategoryName})
        if(category){
            return res.status(400).send({message:'Category already exists'});
            
        }else{
            const newCategory = new categories({
                CategoryName,
                createdBy:user,
                createdAt
            })
            await newCategory.save();
            res.status(201).send({msg:"Category created successfully"});
        }
    }catch (error){
        res.status(400).send(error);
    }
}

async function updateCategoryById(req,res){
    const id = req.params.id;
    console.log(id)
    const category = await categories.findByIdAndUpdate(id, req.body);
    if(!category){
        return res.status(404).send('Category not found');
    }
    res.send(category);
}

async function deleteCategoryById(req,res){
    const  id  = req.params.id;
    const category = await categories.findByIdAndRemove(id);
    if(!category){
        return res.status(404).send('Category not found');
    }
    res.send(category);
}

async function getCategories(req,res){
    try{
        const category = await categories.find();
        res.send(category);
    }catch (error){
        res.status(400).send(error);
    }
}

module.exports = {
    createCategory,
    updateCategoryById,
    deleteCategoryById,
    getCategories
}