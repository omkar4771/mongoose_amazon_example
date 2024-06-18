//require mongoose
const mongoose = require("mongoose");
main().then(()=>{
    console.log("connection sucessfull");
}).catch((err)=>{
    console.log(err);
});
//connect mongoose
async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

//define schema
const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        maxLength : 20,
    },
    author : {
        type : String,
    },
    price : {
        type : Number,
        min : [1,"price is too low for amazon selling "],//set error msg
    },
    discount :{
        type : Number,
        default : 10 
    },
    category :{
        type : String,
        enum : ["friction", "non-friction"],
    }
});
//define model
const Book = mongoose.model("Book", bookSchema);

let book1 = new Book({
    title : "marvel comices",
    price : 510,
    category : "friction"
});

// book1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

Book.findByIdAndUpdate("666ff061043721a40858f694",{price :-20},{runValidators:true})// runvalidator true means its follow all schemas in updates times
.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});