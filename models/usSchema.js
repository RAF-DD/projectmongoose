const mongoose=require('mongoose');
const schema=mongoose.Schema;
const usSchema= new schema(
  {
      name:{
          type: String,
          require: true,
      },
      age:{
          type: Number,
      },
      favoriteFoods:{
          type: [String],
      },
  }
)
const Person=mongoose.model("user",usSchema)



module.exports=Person;