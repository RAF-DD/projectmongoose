const express=require('express')
const router=express.Router();
const Person=require('../models/usSchema.js')
const arrayOfPeople = [
    { name:"person1",age:25,favoriteFoods:["pizza"] },
    { name:"person2",age:30,favoriteFoods:["kafteji"] },
    { name:"person3",age:32,favoriteFoods:["kouskous"] },
];
//Person.create(arrayOfPeople);
router.post('/',async (req,res)=>{
   await Person.insertMany(arrayOfPeople)
   res.send('ok')
    
})
router.get('/test',(req,res)=>{
    res.send('hello')
})

/* function :Find all the people having a given name */

router.get("/getpersonbyname/:name",(req, res) => {
    Person.find({name:req.params.name},(err,data)=>{
        if (err) throw err;
        else 
        res.json(data);
    });
   });
   
 /*function that finds just one person which has a certain food in the person's favorites
  * Using the function argument food as a search key*/

  router.get("/getpersonbyfood/:food",(req, res) => {
    Person.findOne({favouriteFood:req.params.food},(err,data)=>{
        if (err) throw err;
        else 
        res.json(data);
    });
   });

 
  /*function that searches  person by id */

  router.get("/getpersonbyid/:id",(req, res) => {
    Person.findById({_id:req.params.id},(err,data)=>{ 
        if (err) throw err;
        else 
        res.json(data);
    });
   });
    
    /*function that Updates by Running Find, Edit, then Save */
    router.put("/edit/:Id", (req, res) => {
        Person.findById(req.params.Id, (err, data) => {
          if (err) {
            throw err
          } else {
            data.favouriteFood.push("hamberger"),
              data.save((err,person)=>{
                if (err) throw err;
                else 
                res.json(person)

            });
          }
        });
      });

      /*function that Performes new Updates on a Document Using model.findOneAndUpdate() */

    router.put("/findedit/:Id", (req, res) => {
      Person.findOneAndUpdate({_id:req.params.Id}, {$set: {age:1000000}}, {new: true}, function(err,doc) {
        if (err) { throw err; }
        else { res.send("Updated"); }
      });  
      });

      /*function that deletes a Document Using model.findByIdAndRemove() */

      router.delete("/delete/:Id",(req, res)=> {
        Person.findByIdAndRemove(req.params.Id, function (err,data) {
         if (err) throw err;
         res.send("deleted");
        });
       });

      
      /*function that  Delete Many Documents with model.remove() */

      router.delete("/deletemany/:name",(req, res)=> {
        Person.remove({name:req.params.name}, function(err){
          if(err) throw err;
          else
          res.send("deleted")
      });
       });

      /*function that list people and sort them by name and limit them to two documents */
      router.get("/listpeople", (req, res) => {
        Person.find({ favouriteFood: { $all: ["kafteji"] } })
          .sort({ name: "asc" })
          .limit(2)
          .select("-age")
          .exec((err, data) => {
           if (err) throw err 
           else 
           res.json(data)
          });
      });

module.exports=router;