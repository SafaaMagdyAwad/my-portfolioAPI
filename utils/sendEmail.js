import nodemailer from 'nodemailer';
const sendEmail = async (userName, userEmail, message) => {

    try {

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or any email service you prefer
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        // Send the email
        const mailOptions = {
            from: userEmail, // sender address
            to: 'safaa.magdy.awad.mohammad@gmail.com', // recipient address
            subject: 'New Message Received',
            text: `You have received a new message from ${userName} (${userEmail}):\n\n${message}`,
            // You can also use html: '<b>HTML version</b>' if you prefer HTML email
        };

        await transporter.sendMail(mailOptions);


    } catch (error) {
        console.error('Error sending message or email:', error);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export default sendEmail