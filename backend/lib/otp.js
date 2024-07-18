function uniqueotp(){
    return Math.floor(100000 + Math.random() * 900000);
}
const otp = uniqueotp();

module.exports = otp;