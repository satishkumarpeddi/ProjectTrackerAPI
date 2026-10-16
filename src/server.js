const express = require('express');
const zod = require('zod')
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;
app.use(express.json());

const findIndex = (array,id) =>{
    // return array.filter((element,id) => element.id===id);
    for(let i=0;i<array.length;i++)
        if(array[i].id==id) return i;
    return -1;
}

app.get('/projects',(req,res)=>{
    fs.readFile('./track.json',"utf-8",(err,data)=>{
        if(err) throw err;
        let list = JSON.parse(data);
        res.status(200).send(list);
    })
})

app.get('/projects/:id',(req,res)=>{
    fs.readFile('./track.json',"utf-8",(err,data)=>{
        if(err) throw err;
        let list = JSON.parse(data);
        let index = findIndex(list,parseInt(req.params.id));
        if(index===-1) return res.status(404).send({
            message:"Not found!!"
        })
        res.status(200).send(list[index]);
    })
})

app.post('/projects',(req,res)=>{
    const newProject = {
        id:Math.floor(Math.random()*100000),
        title:req.body.title,
        description:req.body.description,
        status:req.body.status
    }
    fs.readFile('./track.json',"utf-8",(err,data)=>{
        if(err) throw err;
        let list = JSON.parse(data);
        list.push(newProject);
        fs.writeFile('./track.json',JSON.stringify(list),(err,data)=>{
            if(err) throw err;
            res.status(200).send(newProject);
        })
    })
})

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server is running on the port : ${PORT}`)
})