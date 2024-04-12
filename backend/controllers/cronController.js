const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const fs = require('fs');
const path = require('path');
const { resourceLimits } = require('worker_threads');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

let counter = 4; 

const sendMail = async (req, res) => {
    try {
        const { email, title, description } = req.body;
        const attachments = req.files.attachments;
        console.log(attachments)

        const dirExists = fs.existsSync(`public/assets/`);

        if (!dirExists) { 
            fs.mkdirSync(`public/assets/`, { recursive: true });
        }

        if (!attachments) return res.status(400).json({ message: 'No attachments found' });

        
            const savePath = `/public/assets/${Date.now()}.${attachments.name.split('.').pop()}`;

            attachments.mv(path.join(__dirname, '..', savePath), async (err) => {
                if (err) throw err;

             const result = await sequelize.query(`UPDATE email SET  mailCounter = ?, mailAttachment = ? WHERE id = 1 `, { replacements: [counter, savePath], type: QueryTypes.INSERT });
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: title,
                    html: `
                        <h2>${title}</h2>
                        <p>${description}</p>
                        <p>${counter = counter + 1}</p>
                    `,
                    attachments: [{
                        path: path.join(__dirname, '..', savePath),
                        filename: attachments.name
                    }]
                };

                cron.schedule('5 * * * * *', () => {
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) console.log(err);
                        else console.log('Email sent:', info);
                    });
                });
            });

        counter++;

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { sendMail };