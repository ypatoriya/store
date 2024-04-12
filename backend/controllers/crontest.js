let nodemailer = require("nodemailer");

let sender = nodemailer.createTransport({
	service: 'gmail',
	auth: {
    user: 'ypatoriya.netclues@gmail.com',
		pass: 'tspy dwni dqmm kibp'
	}
});

let mail = {
	from: 'ypatoriya.netclues@gmail.com',
	to:
    'yagupatel2009@gmail.com',
	subject: 'Sending Email using Node.js',
  text: ' Hey there!',
	html:
    '<h1>Mail</h1>',
attachments: [
	{
		filename: 'name.txt',
    filepath: process.cwd() + '/name.txt'
	}
]
};

sender.sendMail(mail, function (error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent successfully: '
			+ info.response);
	}
});
