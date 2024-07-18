const nodemailer = require("nodemailer");
const { Resend } = require("resend");

let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'd3vz122@gmail.com', // Your email address
        pass: 'dxrh hnmj mtau knkd' 
    }
});
async function sendmail (to,otp,id){
    const resend = new Resend("re_LuQMBvdg_BW3vZcHdRj1pWGPPfkig3tzA");
    
    return  await transporter.sendMail({
        from: "t91564368@gmail.com",
        to: [to],
        subject: "OTP VERIFICATION",
        html: `<h1 style="font-family: Arial, sans-serif; color: #333;">OTP Verification</h1>
            <p style="font-size: 16px; font-family: Arial, sans-serif; color: #666;">Please use the following OTP to verify your signup on Leetcode Clone:</p>
            <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
                <p style="font-size: 24px; font-weight: bold; color: #333;">${otp}</p>
                <a href="http://localhost:5173/otp-verification/${id}">Link</a>
            </div>
            <p style="font-size: 14px; font-family: Arial, sans-serif; color: #666;">This OTP will expire in 1 hour.</p>
        `,
    });
}


module.exports={
    sendmail
}