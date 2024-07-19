const express = require("express");
const z = require("zod");
const jwt  = require("jsonwebtoken");


const { PrismaClient } = require('@prisma/client');

const otp = require("../../lib/otp");
const { sendmail } = require("../../email/sendmail");

const router = express.Router();


const signupbody = z.object({
    username: z.string().email(),
    name: z.string(),
    password: z.string().min(6, "minimum 6 Length Required")
})

const db = new PrismaClient();

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { success, error } = signupbody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ sucess: false , message: "pls give minimum of 6 lenght password and valid email"})
    }

    const alreadyexists = await db.user.findFirst({
        where: {
            username: req.body.username,
        }
    })
    

    if (alreadyexists) {
        if (alreadyexists.isverified) {
            return res.json({ success:false,message: "Email Already Exists" })
        } else if (!alreadyexists.isverified && alreadyexists.otpExpiry > new Date()) {
            return res.json({success:true, message: "Otp Already Sent" })
        } else {
            const { data, error } = sendmail(req.body.username,otp,alreadyexists.id);

            if (error) {
                return res.status(400).json({ success:false,message:"Unable to Send Otp at this movement" });
            } else {
                const otpExpiry = new Date();
                otpExpiry.setHours(otpExpiry.getHours() + 1);

                await db.user.update({
                    where: {
                        id: alreadyexists.id
                    },
                    data: {
                        otp: otp.toString(),
                        otpExpiry: otpExpiry
                    }
                });

                return res.status(200).json({ success:true, message: "New OTP Sent to Email. Check Email for the same." });
            }
        }
    } else {
        const otpExpiry = new Date();
        otpExpiry.setHours(otpExpiry.getHours() + 1);

     const rep =   await db.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                otp:otp.toString(),
                otpExpiry: otpExpiry
            }
        })

        const { data, errorr } = sendmail(req.body.username,otp,rep.id);

        if (errorr) {
            return res.status(400).json({success:false,message: error });
        }
        console.log(data);
        return res.json({success:true, message: "Please Verify your OTP in 1 hour" });
    }
})

router.post("/otp-verification", async (req, res) => {
    const { id, otp } = req.body;
    const found = await db.user.findFirst({
        where: {
            id
        }
    });
    if (!found) {
       
        return res.status(201).json({
            success: false,
            message: "Wrong Link"
        });
    } else if (found.isverified) {
        
        return res.status(201).json({
            success: false,
            message: "Already Verified"
        });
    } else {
        if (found.otpExpiry < new Date()) {
           
            return res.status(201).json({
                success: false,
                message: "OTP Expired"
            });
        } else {
            if (found.otp === otp) {
                await db.user.update({
                    where: {
                        id: found.id
                    },
                    data: {
                        isverified: true
                    }
                });
             
                return res.status(200).json({
                    success: true,
                    message: "Verified"
                });
            } else {
                
                return res.status(201).json({
                    success: false,
                    message: "Wrong OTP Entered"
                });
            }
        }
    }
});


router.post("/signin",async(req,res)=>{
    
    const {username,password} = req.body;
    const resp = await db.user.findFirst({
        where:{
            username:username
        }
    })
    if(resp&&resp.isverified){
        if(resp.password==password){
            const token = jwt.sign(resp.id,process.env.jwt_secret);
            
            res.cookie('token',token,{
                secure:true,
                sameSite:'none'
            });
            return res.status(200).json({
                success:true
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"wrong password"
            })
        }
    }
    else{
        res.status(401).json({
            success:false,
            message:"Pls singup"
        })
    }
})

module.exports = router;
