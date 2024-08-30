// pages/api/myApiRequest.js

export default async function handler(req, res) {
    const apiKey = process.env.API_KEY;
  
    // Example: Making a request to an external API
    const response = await fetch('https://example.com/api/data', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  