const express = require("express");

const router = express.Router();

const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

router.get("/all",async(req,res)=>{
    const {page} = req.query;
    
   const resp = await db.problems.findMany({orderBy:{created_at:"desc"},skip:9*page,take:9,select:{    
    id:true,
    question:true,
   
   }});

   return res.json(resp);
    
});

router.get("/:id",async(req,res)=>{
        const {id}  = req.params;
        const resp = await db.problems.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                question:true,
                description:true,
                testCases:{
                    take:2 ,
                    select:{
                        input:true,
                        output:true
                    }
                }
            }
        })
        if(resp){
        return res.json(resp);
        }
        else{
            return res.status(400).json({message:"Not present"});
        }
})

router.post("/add",async(req,res)=>{
    const {question,description,testCases} = req.body;
    const resp = await db.problems.create({data:{
        question,
        description,
        testCases:{
            create:testCases.map(x=>({
                input:x.input,
                output:x.output
            }))
                
                
            
        }
    },include:{testCases:true}},)

    return res.json({resp});
})


module.exports=router;