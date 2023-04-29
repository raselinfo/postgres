const express=require("express")
const {v4:uuid} =require("uuid")
const pool =require("./db")
const app=express()
app.use(express.json())
app.get("/books",async(req,res)=>{
    // Return all Books
    try{
        const books=await pool.query("SELECT * FROM book")
        return res.status(200).json({message:"OK",data:books.rows})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})

app.get("/books/:id",async(req,res)=>{
    // Return single book by id
    try{
        const {id}=req.params
        const book=await pool.query("SELECT * FROM book WHERE id=$1",[id])
        res.status(200).json({message:``,data:{name:"books1",description:"book description"}})
        return res.status(200).json({message:"OK",data:book})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})

app.post("/books",async(req,res)=>{
    // Create a book
    try{
        const {name,description}=req.body
        const id=uuid()
        // insert book data into database
       const newBook= await pool.query("INSERT INTO book (id,name,description) VALUES ($1,$2,$3) RETURNING *",[id,name,description])

        res.status(201).json({message:`books create`,data:newBook.rows})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
})

app.delete("/books/:id",async(req,res)=>{
    // Delete a books
    try{
        const {id}=req.params
        const deletedItem=await pool.query(`DELETE FROM book WHERE id=$1`,[id])
        return res.status(200).json({message:`Books delte`,data:deletedItem.rows})
        
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})

app.put("/books/:id",async(req,res)=>{
    // Update a book
    try{
        const {id}=req.params
        const updatedItem=await pool.query(`UPDATE book SET name=$1,description=$2 WHERE id=$3`,["Sakib book","Sakib new books333",id])

        return res.status(200).json({message:`Books updated`,data:updatedItem.rows})
        
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})




app.listen(4000,()=>{
    console.log("http://localhost:4000")
})