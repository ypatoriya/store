const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const fs = require('fs');
const path = require('path');

const sendMail = async (req, res) => {
    try {
        const { email, title, description } = req.body;
        const attachments = req.files.attachments;
        console.log(attachments)

        const dirExists = fs.existsSync(`public/assets/`);

        if (!dirExists) {
            fs.mkdirSync(`public/assets/`, { recursive: true });
        }

        if (attachments == undefined || attachments == null) throw new Error("file not found!");
            
        
        let savePath = `/public/assets/${Date.now()}.${attachments.name.split(".").pop()}`

        attachments.mv(path.join(__dirname, ".." + savePath), async (err) => {
            console.log(req.body)
            let counter = 0
            console.log('Updated counter', counter)
            await sequelize.query(`INSERT INTO email ( mailCounter, mailAttachment) VALUES (?, ?)`, { replacements: [counter, attachments], type: QueryTypes.INSERT });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
          
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: `${email}`,
            subject: `${title}`,
            html: `
                <h2>${title}</h2>
                <p>${description}</p>
                `,
            attachments: [{
                filepath: process.cwd() + `${__dirname}, ".." + ${savePath}`,
                filename: attachments.name.split(".").pop()
            }]
        }

        cron.schedule('5 * * * * *', () => {
            transporter.sendMail(mailOptions, function (err, info) {

                if (err)
                    console.log(err);
                else
                console.log('UPDATED COUNT : ', count);
                console.log(info);
            });
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

module.exports = { sendMail }