const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const sendMail = async (req, res) => {
    try {
        const { email, title, description } = req.body;
        console.log(req.body)
        var count = count + 1;
        await sequelize.query(`UPDATE email SET mailCounter = ?`, { replacements: [count] });  

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465, 
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD

                // user: 'ypatoriya.netclues@gmail.com',
                // pass: 'tspy dwni dqmm kibp'
               
            }
        });
        
        const mailOptions = { 
            from: process.env.EMAIL, 
            to:`${email}`,
            subject: `${title}`,
            html: `
            <h1>${title}</h1>
            <h3>Count: ${count}</h3>
            <p>${description}</p>
            `
        };

        cron.schedule('5 * * * * *', () => {
            transporter.sendMail(mailOptions, function (err, info) {
                
                if(err) 
                  console.log(err);
                else
                console.log('UPDATED COUNT : ',count);
                console.log(info);
                 });
            });
             
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


 module.exports = {sendMail}


















//     cron.schedule('5 * * * * *', () => {
//         transporter.sendMail(mailOptions, function (err, info) {
//             if(err) 
//               console.log(err);
//             else
//               console.log(info);
//              });
//         });






// cron.schedule('*/5 * * * *', async () => {
//     try {
//         const [users] = await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT });
//         const user = users[0];
//         const email = user.email;
//         mailOptions.to = email;
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// })