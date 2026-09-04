const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env if present
try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
        for (const line of envLines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                const idx = trimmed.indexOf('=');
                const k = trimmed.slice(0, idx).trim();
                const v = trimmed.slice(idx + 1).trim();
                if (!process.env[k]) process.env[k] = v;
            }
        }
    }
} catch (e) {}

const FAST2SMS_KEY = process.env.FAST2SMS_KEY || '';
const SARVAM_API_KEY = process.env.SARVAM_API_KEY || 'sk_vwdpeqy0_kAUcIsDfqfeLlAPagRhXpvNA';
const PORT = process.env.PORT || 3000;

function callSarvamChat(prompt, chatHistory = []) {
    return new Promise((resolve, reject) => {
        const messages = [
            {
                role: 'system',
                content: 'You are Saarthi (सारथी), an affectionate, warm, patient, and polite daily cognitive wellness companion for an Indian elder/grandparent (part of the NeoSaarthi app). Always reply in warm, simple, natural conversational Hindi (Devanagari script). Keep your replies concise (1 to 2 short sentences). Encourage their memory, hydration, light walking, family connections, and peaceful mind. Never diagnose or use clinical terms like Dementia or Alzheimer\'s. If they ask about their score, routine, or family, encourage them warmly.'
            }
        ];
        
        if (Array.isArray(chatHistory)) {
            for (const h of chatHistory.slice(-4)) {
                if (h && h.role && h.content) messages.push({ role: h.role, content: h.content });
            }
        }
        
        messages.push({ role: 'user', content: String(prompt || '').trim() });

        const postData = JSON.stringify({
            model: 'sarvam-105b-conversations',
            messages: messages,
            temperature: 0.3
        });

        const req = https.request('https://api.sarvam.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-subscription-key': SARVAM_API_KEY,
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 12000
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
                        resolve(parsed.choices[0].message.content.trim());
                    } else {
                        reject(new Error(data));
                    }
                } catch (e) { reject(e); }
            });
        });

        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Sarvam chat timeout')); });
        req.write(postData);
        req.end();
    });
}

function callSarvamTTS(text) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            inputs: [String(text || '').slice(0, 500)],
            target_language_code: 'hi-IN',
            speaker: 'ritu',
            model: 'bulbul:v3'
        });

        const req = https.request('https://api.sarvam.ai/text-to-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-subscription-key': SARVAM_API_KEY,
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 10000
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.audios && parsed.audios[0]) {
                        resolve(parsed.audios[0]);
                    } else {
                        resolve(null);
                    }
                } catch (e) { resolve(null); }
            });
        });

        req.on('error', () => resolve(null));
        req.on('timeout', () => { req.destroy(); resolve(null); });
        req.write(postData);
        req.end();
    });
}

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

    // API: Sarvam AI Hindi Chat & Voice
    if (req.method === 'POST' && url.pathname === '/api/sarvam-chat') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { prompt, history } = JSON.parse(body || '{}');
                if (!prompt) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Prompt is required' }));
                    return;
                }

                console.log('[Sarvam AI] Hindi query:', prompt);
                const hindiReply = await callSarvamChat(prompt, history);
                console.log('[Sarvam AI] Hindi reply:', hindiReply);

                let audioBase64 = null;
                try {
                    audioBase64 = await callSarvamTTS(hindiReply);
                } catch (ttsErr) {
                    console.error('[Sarvam TTS Error]:', ttsErr.message);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    reply: hindiReply,
                    audio: audioBase64
                }));
            } catch (err) {
                console.error('[Sarvam Chat Error]:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

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

