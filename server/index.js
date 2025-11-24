const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const user=require('./routes/userRoute')
const task=require('./routes/taskRoute')
const cors=require('cors')
dotenv.config()

const port=process.env.PORT||3000

mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('Connected to MongoDB')}).catch((err)=>{console.log(err)})
   


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use(cors())
app.use(express.json())
app.use('/api/users',user)
app.use('/api/tasks',task)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
}
)
