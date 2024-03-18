import nodemailer from 'nodemailer';

export const sendOtp = async(email,otp)=> {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "97ab2c3926377b",
          pass: "b3e70b839f4354"
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