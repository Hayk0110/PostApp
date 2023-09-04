const nodemailer = require("nodemailer")

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                // can not recognize from .env
                user: "hayk.abgaryan.0110@gmail.com",
                pass: "bvqyjcmekeptcdrv"
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Verfiy your account in PostApp",
            html:
                `
                <div>
                    <h1>To verify your account click on link down below</h1>
                    <p>Verify in 24 hours</p>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService();