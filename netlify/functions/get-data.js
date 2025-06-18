// لا حاجة لـ: const fetch = require('node-fetch');

// ضع روابط Google Sheets هنا بأمان.
const DEBT_DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR5S_tBHdPsAVsg7TcEIKJCAc_I_wrV-h4EhPZGBscn6X-mzhQRqUCaeTjBbsUlZnZKTf4sTzpnbaiT/pub?gid=1701687838&single=true&output=csv';
const BANK_DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR5S_tBHdPsAVsg7TcEIKJCAc_I_wrV-h4EhPZGBscn6X-mzhQRqUCaeTjBbsUlZnZKTf4sTzpnbaiT/pub?gid=766967915&single=true&output=csv';

exports.handler = async function(event, context) {
  const sheet = event.queryStringParameters.sheet;
  
  if (sheet !== 'debt' && sheet !== 'bank') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid sheet parameter' }),
    };
  }

  const url = sheet === 'debt' ? DEBT_DATA_URL : BANK_DATA_URL;

  try {
    const response = await fetch(url); // استخدم fetch المدمجة مباشرة
    if (!response.ok) {
      // إذا فشل جلب البيانات من Google Sheets، أرجع رسالة خطأ واضحة
      return {
        statusCode: response.status,
        body: `Failed to fetch from Google Sheets: ${response.statusText}`,
      };
    }
    const data = await response.text();
    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Function execution error' }),
    };
  }
};