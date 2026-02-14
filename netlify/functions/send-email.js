const handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { name, email, subject, message } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Get Resend API key from environment
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY not set in environment variables');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Email service not configured. Please contact administrator.' })
            };
        }

        // Prepare email data for Resend
        const emailData = {
            from: 'noreply@ritusmin-portfolio.netlify.app',
            to: 'ritusminwebsite@gmail.com',
            reply_to: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Message from ${name}</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send email via Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify(emailData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Resend API error:', responseData);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to send email' })
            };
        }

        console.log('Email sent successfully:', responseData.id);
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true,
                message: 'Message sent successfully!',
                emailId: responseData.id
            })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

module.exports = { handler };
