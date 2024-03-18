import nodemailer from 'nodemailer';

export const sendOtp = async(email,otp)=> {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });

      const mailOptions = {
        from:'riteshkumar411552@gmail.com',
        to:email,
        subject:'Reset your password',
        html:`OTP:${otp}`
        // 
      }

      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse
}