const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

router.post('/',async(req,res)=>{
    try{
            const data = req.body;

            const menuItem = new MenuItem(data);

            const response = await menuItem.save();
            console.log('data saved');
            res.status(200).json(response);
    }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/',async(req,res)=>{
    try{
            const data = await MenuItem.find();
            console.log('data fetched');
            res.status(200).json(data);
    }
    catch(err){
            console.log(err);
            res.status(500).json({error:'internal Server Error'});
    }
 }) 

 router.get('/:tasteType',async(req,res)=>{
    try{
           const tasteType = req.params.tasteType; // Extract the work type form the URL parameter
           if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour'){
                   
                   const response = await MenuItem.find({taste:tasteType});
                   console.log('response fetched');
                   res.status(200).json(response);
           }else{
                   res.status(404).json({error:'Invalid work type'})
           }
    }catch(err){
           console.log(err);
           res.status(500).json({error:'Interval Server Error'});
    }
})

router.put('/:id',async(req,res) =>{
    try{
         const menuId = req.params.id;
         const updateMenuData = req.body;

         const response = await MenuItem.findByIdAndUpdate(menuId,updateMenuData,{
                    new : true, // Return the updated document
                    runValidators: true, // Run Mongoose validation
         })

         if(!response){
            return res.status(404).json({error:'Item not found'})
         }

         console.log('data updated');
         res.status(200).json(response);

    }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id; // Extract the id from the URL parameter

    // Assuming you have a Person model
    const response = await MenuItem.findByIdAndDelete(menuId);

    if(!response){
        return res.status(404).json({error:'Person not found'})
     }
     console.log('data delete');
     res.status(200).json({messge:'menuItem deleted successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

 module.exports = router;

