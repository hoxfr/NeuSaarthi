const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const FAST2SMS_KEY = process.env.FAST2SMS_KEY || '';
const PORT = process.env.PORT || 3000;

// In-memory store for OTPs: phone -> { otp, expiresAt }
const otpStore = new Map();

function sendFast2SMS(phone, otp) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            route: 'otp',
            variables_values: String(otp),
            numbers: String(phone)
        });

        const options = {
            hostname: 'www.fast2sms.com',
            path: '/dev/bulkV2',
            method: 'POST',
            headers: {
                'authorization': FAST2SMS_KEY,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (e) {
                    resolve({ return: false, raw: data });
                }
            });
        });

        req.on('error', err => reject(err));
        req.write(postData);
        req.end();
    });
}

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);

    // API: Send OTP
    if (req.method === 'POST' && url.pathname === '/api/send-otp') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { phone } = JSON.parse(body || '{}');
                const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

                if (cleanPhone.length !== 10) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Invalid 10-digit Indian phone number.' }));
                    return;
                }

                // Generate random 4-digit OTP
                const otp = Math.floor(1000 + Math.random() * 9000);
                otpStore.set(cleanPhone, {
                    otp: String(otp),
                    expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins
                });

                console.log(`[NeoSaarthi Auth] Generated OTP ${otp} for +91${cleanPhone}`);

                // Call Fast2SMS Dev API with OTP route
                const smsResult = await sendFast2SMS(cleanPhone, otp);
                console.log(`[Fast2SMS Response]:`, smsResult);

                if (smsResult.return === true) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        delivered: true,
                        message: `OTP sent successfully to +91${cleanPhone} via Fast2SMS (0.20 INR).`
                    }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        delivered: false,
                        gateway_error: smsResult.message || 'Fast2SMS returned error',
                        status_code: smsResult.status_code,
                        message: smsResult.message || 'Gateway verification pending.',
                        // For fallback in case website verification is pending:
                        fallback_otp: String(otp)
                    }));
                }
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // API: Verify OTP
    if (req.method === 'POST' && url.pathname === '/api/verify-otp') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { phone, otp } = JSON.parse(body || '{}');
                const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);
                const stored = otpStore.get(cleanPhone);

                if (!stored) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'No OTP requested for this phone number.' }));
                    return;
                }

                if (Date.now() > stored.expiresAt) {
                    otpStore.delete(cleanPhone);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'OTP has expired. Please request a new one.' }));
                    return;
                }

                if (String(stored.otp).trim() === String(otp).trim()) {
                    otpStore.delete(cleanPhone);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: 'Phone verified successfully!' }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Incorrect OTP. Please try again.' }));
                }
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // Static file server
    let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.js': 'application/javascript; charset=utf-8',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg'
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`NeoSaarthi Fast2SMS OTP Server running at http://localhost:${PORT}`);
});
// CMT_feat(server):_Add_Express
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE'] }));
app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });


// CMT_feat(api):_Implement_/api
app.post('/api/user/register', async (req, res) => {
  const { name, age, phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  await db.createUser({ name, age, phone, otp });
  res.json({ success: true, message: 'OTP sent' });
});
app.post('/api/user/login', async (req, res) => {
  const user = await db.findByPhone(req.body.phone);
  if (!user || user.otp !== req.body.otp) return res.status(401).json({ error: 'Invalid OTP' });
  res.json({ success: true, userId: user.id });
});

