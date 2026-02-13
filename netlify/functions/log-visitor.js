// Netlify Function to log visitor IPs
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse the incoming data
        const data = JSON.parse(event.body);
        
        // Extract IP and other info
        const visitorData = {
            ip: data.ip,
            timestamp: data.timestamp,
            url: data.url,
            userAgent: data.userAgent
        };

        // Log to console (visible in Netlify logs)
        console.log('Visitor logged:', visitorData);

        // Return success response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                success: true,
                message: 'Visitor IP logged successfully'
            })
        };
    } catch (error) {
        console.error('Error logging visitor:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to log visitor' })
        };
    }
};
