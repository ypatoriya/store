const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { sequelize } = require('../config/database');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yagupatel2009@gmail.com',
        pass: 'yagu2009patel'
        // user: process.env.EMAIL,
        // pass: process.env.PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'ypatoriya.netclues@gmail.com',
    subject: 'Cron Job Testing',
    text: 'Cron Job Testing'
};

cron.schedule('*/5 * * * *' ,() => {
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) 
          console.log(err);
        else
          console.log(info);
         });
    });


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