const express = require("express");
const { createClient } = require("redis");
const axios = require("axios");
const { PrismaClient } = require('@prisma/client');
const { middleware } = require("../../middleware");

const db = new PrismaClient();

const app = express();


const router = express.Router();



const codeexec = process.env.Exec_Link;

router.post("/subm",middleware, async (req, res) => {
    const { code, language,probid,userid } = req.body;
  
    
    try {
        inputs =  await db.testCase.findMany({
            where:{
                problemId:probid
            }
        });
      
        const resp = await axios.post(codeexec+"/run/" + language, { code, inputs });
        const data = resp.data;
        await db.submission.create({
            data:{
                code:code,
                problem_id:probid,
                userId:userid,
                testcases:data.testcases,
                status:data.status,
                language:language
            }
        })
        return res.json({ data });
    } catch (error) {
        console.error('Error running code:', error);
        return res.status(500).json({ success: false, message: 'Error running code', error: error.message });
    }
});

    



module.exports = router;
