// ==========================================
// MODULE 1: AUTHENTICATION & CORE NAVIGATION
// Lead: Member 1 (Auth & Telecom Gateway)
// ==========================================

let stats = { cog: 0, hyd: 0, phy: 0 };
const langData = {
    "en": { 
        label: "English", 
        changeLang: "Change Language",
        landing: { greeting: "Welcome", next: "Next" },
        login: { title: "Welcome", sub: "Enter details to continue", phone: "Phone Number (Required)*", email: "Email ID (Optional)", btn: "Send OTP" },
        otp: { title: "Verify Phone", sub: "OTP sent to your number", btn: "Verify & Secure" },
        role: { title: "Who is using this?", sub: "We will adapt the experience for you.", self_title: "Set up for myself", self_desc: "I want to maintain a healthy routine.", loved_title: "Set up for a loved one", loved_desc: "I am managing care for a family member." },
        home: { greeting: "Good Morning", btn1: "Play Game", btn2: "Family", btn3: "Routine", btn4: "SOS Alert" }
    },
    "as": { 
        label: "Assamese (Ã Â¦â€¦Ã Â¦Â¸Ã Â¦Â®Ã Â§â‚¬Ã Â¦Â¯Ã Â¦Â¼Ã Â¦Â¾)", 
        changeLang: "Ã Â¦Â­Ã Â¦Â¾Ã Â¦Â·Ã Â¦Â¾ Ã Â¦Â¸Ã Â¦Â²Ã Â¦Â¨Ã Â¦Â¿ Ã Â¦â€¢Ã Â§Â°Ã Â¦â€¢",
        landing: { greeting: "Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¾Ã Â¦â€”Ã Â¦Â¤Ã Â¦Â®", next: "Ã Â¦ÂªÃ Â§Â°Ã Â§Â±Ã Â§Â°Ã Â§ÂÃ Â¦Â¤Ã Â§â‚¬" },
        login: { title: "Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¬Ã Â¦Â¾Ã Â¦â€”Ã Â¦Â¤Ã Â¦Â®", sub: "Ã Â¦â€ Ã Â¦â€”Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â¢Ã Â¦Â¼Ã Â¦Â¿Ã Â¦Â¬Ã Â¦Â²Ã Â§Ë† Ã Â¦Â¸Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Â¶Ã Â§â€¡Ã Â¦Â· Ã Â¦Â¦Ã Â¦Â¿Ã Â¦Â¯Ã Â¦Â¼Ã Â¦â€¢", phone: "Ã Â¦Â«Ã Â§â€¹Ã Â¦Â¨ Ã Â¦Â¨Ã Â¦Â®Ã Â§ÂÃ Â¦Â¬Ã Â§Â° (Ã Â¦ÂªÃ Â§ÂÃ Â§Â°Ã Â¦Â¯Ã Â¦Â¼Ã Â§â€¹Ã Â¦Å“Ã Â¦Â¨Ã Â§â‚¬Ã Â¦Â¯Ã Â¦Â¼)*", email: "Ã Â¦â€¡Ã Â¦Â®Ã Â§â€¡Ã Â¦â€¡Ã Â¦Â² (Ã Â¦Â¬Ã Â§Ë†Ã Â¦â€¢Ã Â¦Â²Ã Â§ÂÃ Â¦ÂªÃ Â¦Â¿Ã Â¦â€¢)", btn: "OTP Ã Â¦ÂªÃ Â¦Â Ã Â¦Â¿Ã Â¦Â¯Ã Â¦Â¼Ã Â¦Â¾Ã Â¦â€œÃ Â¦â€¢" },
        otp: { title: "Ã Â¦Â«Ã Â§â€¹Ã Â¦Â¨ Ã Â¦ÂªÃ Â§ÂÃ Â§Â°Ã Â¦Â®Ã Â¦Â¾Ã Â¦Â£Ã Â¦Â¿Ã Â¦Â¤ Ã Â¦â€¢Ã Â§Â°Ã Â¦â€¢", sub: "Ã Â¦â€ Ã Â¦ÂªÃ Â§â€¹Ã Â¦Â¨Ã Â¦Â¾Ã Â§Â° Ã Â¦Â¨Ã Â¦Â®Ã Â§ÂÃ Â¦Â¬Ã Â§Â°Ã Â¦Â²Ã Â§Ë† OTP Ã Â¦ÂªÃ Â¦Â Ã Â¦Â¿Ã Â¦â€œÃ Â§Â±Ã Â¦Â¾ Ã Â¦Â¹Ã Â§Ë†Ã Â¦â€ºÃ Â§â€¡", btn: "Ã Â¦ÂªÃ Â§ÂÃ Â§Â°Ã Â¦Â®Ã Â¦Â¾Ã Â¦Â£Ã Â¦Â¿Ã Â¦Â¤ Ã Â¦â€¢Ã Â§Â°Ã Â¦â€¢" },
        role: { title: "Ã Â¦â€¢Ã Â§â€¹Ã Â¦Â¨Ã Â§â€¡ Ã Â¦Â¬Ã Â§ÂÃ Â¦Â¯Ã Â§Â±Ã Â¦Â¹Ã Â¦Â¾Ã Â§Â° Ã Â¦â€¢Ã Â§Â°Ã Â¦Â¿Ã Â¦â€ºÃ Â§â€¡?", sub: "Ã Â¦â€ Ã Â¦Â®Ã Â¦Â¿ Ã Â¦â€ Ã Â¦ÂªÃ Â§â€¹Ã Â¦Â¨Ã Â¦Â¾Ã Â§Â° Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â¬Ã Â§â€¡ Ã Â¦â€¦Ã Â¦Â­Ã Â¦Â¿Ã Â¦Å“Ã Â§ÂÃ Â¦Å¾Ã Â¦Â¤Ã Â¦Â¾ Ã Â¦Â¸Ã Â¦Â²Ã Â¦Â¨Ã Â¦Â¿ Ã Â¦â€¢Ã Â§Â°Ã Â¦Â¿Ã Â¦Â®Ã Â¥Â¤", self_title: "Ã Â¦Â®Ã Â§â€¹Ã Â§Â° Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â¬Ã Â§â€¡ Ã Â¦â€ºÃ Â§â€¡Ã Â¦Å¸ Ã Â¦â€ Ã Â¦Âª Ã Â¦â€¢Ã Â§Â°Ã Â¦â€¢", self_desc: "Ã Â¦Â®Ã Â¦â€¡ Ã Â¦ÂÃ Â¦Å¸Ã Â¦Â¾ Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¸Ã Â§ÂÃ Â¦Â¥ Ã Â§Â°Ã Â§ÂÃ Â¦Å¸Ã Â¦Â¿Ã Â¦Â¨ Ã Â¦Â¬Ã Â¦Å“Ã Â¦Â¾Ã Â¦â€¡ Ã Â§Â°Ã Â¦Â¾Ã Â¦â€“Ã Â¦Â¿Ã Â¦Â¬ Ã Â¦Â¬Ã Â¦Â¿Ã Â¦Å¡Ã Â¦Â¾Ã Â§Â°Ã Â§â€¹Ã Â¥Â¤", loved_title: "Ã Â¦ÂªÃ Â§ÂÃ Â§Â°Ã Â¦Â¿Ã Â¦Â¯Ã Â¦Â¼Ã Â¦Å“Ã Â¦Â¨Ã Â§Â° Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â¬Ã Â§â€¡ Ã Â¦â€ºÃ Â§â€¡Ã Â¦Å¸ Ã Â¦â€ Ã Â¦Âª Ã Â¦â€¢Ã Â§Â°Ã Â¦â€¢", loved_desc: "Ã Â¦Â®Ã Â¦â€¡ Ã Â¦ÂªÃ Â§Â°Ã Â¦Â¿Ã Â¦Â¯Ã Â¦Â¼Ã Â¦Â¾Ã Â¦Â²Ã Â§Â° Ã Â¦Â¸Ã Â¦Â¦Ã Â¦Â¸Ã Â§ÂÃ Â¦Â¯Ã Â§Â° Ã Â¦Â¬Ã Â¦Â¾Ã Â¦Â¬Ã Â§â€¡ Ã Â¦Â¯Ã Â¦Â¤Ã Â¦Â¨ Ã Â¦ÂªÃ Â§Â°Ã Â¦Â¿Ã Â¦Å¡Ã Â¦Â¾Ã Â¦Â²Ã Â¦Â¨Ã Â¦Â¾ Ã Â¦â€¢Ã Â§Â°Ã Â¦Â¿ Ã Â¦â€ Ã Â¦â€ºÃ Â§â€¹Ã Â¥Â¤" },
        home: { greeting: "Ã Â¦Â¸Ã Â§ÂÃ Â¦ÂªÃ Â§ÂÃ Â§Â°Ã Â¦Â­Ã Â¦Â¾Ã Â¦Â¤", btn1: "Ã Â¦â€“Ã Â§â€¡Ã Â¦Â² Ã Â¦â€“Ã Â§â€¡Ã Â¦Â²Ã Â¦â€¢", btn2: "Ã Â¦ÂªÃ Â§Â°Ã Â¦Â¿Ã Â¦Â¯Ã Â¦Â¼Ã Â¦Â¾Ã Â¦Â²", btn3: "Ã Â§Â°Ã Â§ÂÃ Â¦Å¸Ã Â¦Â¿Ã Â¦Â¨", btn4: "Ã Â¦Å“Ã Â§Â°Ã Â§ÂÃ Â§Â°Ã Â§â‚¬Ã Â¦â€¢Ã Â¦Â¾Ã Â¦Â²Ã Â§â‚¬Ã Â¦Â¨" }
    },
    "hi": { 
        label: "Hindi (Ã Â¤Â¹Ã Â¤Â¿Ã Â¤â€šÃ Â¤Â¦Ã Â¥â‚¬)", 
        changeLang: "Ã Â¤Â­Ã Â¤Â¾Ã Â¤Â·Ã Â¤Â¾ Ã Â¤Â¬Ã Â¤Â¦Ã Â¤Â²Ã Â¥â€¡Ã Â¤â€š",
        landing: { greeting: "Ã Â¤Â¨Ã Â¤Â®Ã Â¤Â¸Ã Â¥ÂÃ Â¤Â¤Ã Â¥â€¡", next: "Ã Â¤â€¦Ã Â¤â€”Ã Â¤Â²Ã Â¤Â¾" },
        login: { title: "Ã Â¤Â¸Ã Â¥ÂÃ Â¤ÂµÃ Â¤Â¾Ã Â¤â€”Ã Â¤Â¤ Ã Â¤Â¹Ã Â¥Ë†", sub: "Ã Â¤Å“Ã Â¤Â¾Ã Â¤Â°Ã Â¥â‚¬ Ã Â¤Â°Ã Â¤â€“Ã Â¤Â¨Ã Â¥â€¡ Ã Â¤â€¢Ã Â¥â€¡ Ã Â¤Â²Ã Â¤Â¿Ã Â¤Â Ã Â¤ÂµÃ Â¤Â¿Ã Â¤ÂµÃ Â¤Â°Ã Â¤Â£ Ã Â¤Â¦Ã Â¤Â°Ã Â¥ÂÃ Â¤Å“ Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€š", phone: "Ã Â¤Â«Ã Â¥â€¹Ã Â¤Â¨ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¬Ã Â¤Â° (Ã Â¤â€ Ã Â¤ÂµÃ Â¤Â¶Ã Â¥ÂÃ Â¤Â¯Ã Â¤â€¢)*", email: "Ã Â¤Ë†Ã Â¤Â®Ã Â¥â€¡Ã Â¤Â² (Ã Â¤ÂµÃ Â¥Ë†Ã Â¤â€¢Ã Â¤Â²Ã Â¥ÂÃ Â¤ÂªÃ Â¤Â¿Ã Â¤â€¢)", btn: "OTP Ã Â¤Â­Ã Â¥â€¡Ã Â¤Å“Ã Â¥â€¡Ã Â¤â€š" },
        otp: { title: "Ã Â¤Â«Ã Â¥â€¹Ã Â¤Â¨ Ã Â¤Â¸Ã Â¤Â¤Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾Ã Â¤ÂªÃ Â¤Â¿Ã Â¤Â¤ Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€š", sub: "Ã Â¤â€ Ã Â¤ÂªÃ Â¤â€¢Ã Â¥â€¡ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¬Ã Â¤Â° Ã Â¤ÂªÃ Â¤Â° OTP Ã Â¤Â­Ã Â¥â€¡Ã Â¤Å“Ã Â¤Â¾ Ã Â¤â€”Ã Â¤Â¯Ã Â¤Â¾", btn: "Ã Â¤Â¸Ã Â¤Â¤Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾Ã Â¤ÂªÃ Â¤Â¿Ã Â¤Â¤ Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€š" },
        role: { title: "Ã Â¤â€¡Ã Â¤Â¸Ã Â¤â€¢Ã Â¤Â¾ Ã Â¤â€°Ã Â¤ÂªÃ Â¤Â¯Ã Â¥â€¹Ã Â¤â€” Ã Â¤â€¢Ã Â¥Å’Ã Â¤Â¨ Ã Â¤â€¢Ã Â¤Â° Ã Â¤Â°Ã Â¤Â¹Ã Â¤Â¾ Ã Â¤Â¹Ã Â¥Ë†?", sub: "Ã Â¤Â¹Ã Â¤Â® Ã Â¤â€ Ã Â¤ÂªÃ Â¤â€¢Ã Â¥â€¡ Ã Â¤Â²Ã Â¤Â¿Ã Â¤Â Ã Â¤â€¦Ã Â¤Â¨Ã Â¥ÂÃ Â¤Â­Ã Â¤Âµ Ã Â¤â€¢Ã Â¥â€¹ Ã Â¤â€¦Ã Â¤Â¨Ã Â¥ÂÃ Â¤â€¢Ã Â¥â€šÃ Â¤Â²Ã Â¤Â¿Ã Â¤Â¤ Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€šÃ Â¤â€”Ã Â¥â€¡Ã Â¥Â¤", self_title: "Ã Â¤Â®Ã Â¥â€¡Ã Â¤Â°Ã Â¥â€¡ Ã Â¤Â²Ã Â¤Â¿Ã Â¤Â Ã Â¤Â¸Ã Â¥â€¡Ã Â¤Å¸ Ã Â¤â€¦Ã Â¤Âª Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€š", self_desc: "Ã Â¤Â®Ã Â¥Ë†Ã Â¤â€š Ã Â¤ÂÃ Â¤â€¢ Ã Â¤Â¸Ã Â¥ÂÃ Â¤ÂµÃ Â¤Â¸Ã Â¥ÂÃ Â¤Â¥ Ã Â¤Â¦Ã Â¤Â¿Ã Â¤Â¨Ã Â¤Å¡Ã Â¤Â°Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾ Ã Â¤Â¬Ã Â¤Â¨Ã Â¤Â¾Ã Â¤Â Ã Â¤Â°Ã Â¤â€“Ã Â¤Â¨Ã Â¤Â¾ Ã Â¤Å¡Ã Â¤Â¾Ã Â¤Â¹Ã Â¤Â¤Ã Â¤Â¾ Ã Â¤Â¹Ã Â¥â€šÃ Â¤ÂÃ Â¥Â¤", loved_title: "Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¤Â¿Ã Â¤Â¯Ã Â¤Å“Ã Â¤Â¨ Ã Â¤â€¢Ã Â¥â€¡ Ã Â¤Â²Ã Â¤Â¿Ã Â¤Â Ã Â¤Â¸Ã Â¥â€¡Ã Â¤Å¸ Ã Â¤â€¦Ã Â¤Âª Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€š", loved_desc: "Ã Â¤Â®Ã Â¥Ë†Ã Â¤â€š Ã Â¤ÂªÃ Â¤Â°Ã Â¤Â¿Ã Â¤ÂµÃ Â¤Â¾Ã Â¤Â° Ã Â¤â€¢Ã Â¥â€¡ Ã Â¤Â¸Ã Â¤Â¦Ã Â¤Â¸Ã Â¥ÂÃ Â¤Â¯ Ã Â¤â€¢Ã Â¥â‚¬ Ã Â¤Â¦Ã Â¥â€¡Ã Â¤â€“Ã Â¤Â­Ã Â¤Â¾Ã Â¤Â² Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¤Â¬Ã Â¤â€šÃ Â¤Â§Ã Â¤Â¿Ã Â¤Â¤ Ã Â¤â€¢Ã Â¤Â° Ã Â¤Â°Ã Â¤Â¹Ã Â¤Â¾ Ã Â¤Â¹Ã Â¥â€šÃ Â¤ÂÃ Â¥Â¤" },
        home: { greeting: "Ã Â¤Â¨Ã Â¤Â®Ã Â¤Â¸Ã Â¥ÂÃ Â¤Â¤Ã Â¥â€¡", btn1: "Ã Â¤â€“Ã Â¥â€¡Ã Â¤Â² Ã Â¤â€“Ã Â¥â€¡Ã Â¤Â²Ã Â¥â€¡Ã Â¤â€š", btn2: "Ã Â¤ÂªÃ Â¤Â°Ã Â¤Â¿Ã Â¤ÂµÃ Â¤Â¾Ã Â¤Â°", btn3: "Ã Â¤Â¦Ã Â¤Â¿Ã Â¤Â¨Ã Â¤Å¡Ã Â¤Â°Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾", btn4: "Ã Â¤â€ Ã Â¤ÂªÃ Â¤Â¾Ã Â¤Â¤Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â²Ã Â¥â‚¬Ã Â¤Â¨" }
    },
    "mni": { 
        label: "Manipuri (ÃªÂ¯Æ’ÃªÂ¯Â¤ÃªÂ¯â€¡ÃªÂ¯Â©ÃªÂ¯â€šÃªÂ¯Â£ÃªÂ¯Å¸)",
        changeLang: "ÃªÂ¯â€šÃªÂ¯Â£ÃªÂ¯Å¸ ÃªÂ¯ÂÃªÂ¯Â£ÃªÂ¯Â¡ÃªÂ¯â€”ÃªÂ¯Â£ÃªÂ¯â€ºÃªÂ¯Å½",
        landing: { greeting: "ÃªÂ¯Ë†ÃªÂ¯Â¨ÃªÂ¯â€ÃªÂ¯Â¨ÃªÂ¯ÂÃªÂ¯â€“ÃªÂ¯â€ÃªÂ¯Â¤", next: "ÃªÂ¯Æ’ÃªÂ¯Å ÃªÂ¯Âª" },
        login: { title: "ÃªÂ¯Ë†ÃªÂ¯Â¨ÃªÂ¯â€ÃªÂ¯Â¨ÃªÂ¯ÂÃªÂ¯â€“ÃªÂ¯â€ÃªÂ¯Â¤", sub: "ÃªÂ¯Æ’ÃªÂ¯Ë†ÃªÂ¯Â¥ ÃªÂ¯â€ ÃªÂ¯Â ÃªÂ¯Å ÃªÂ¯â€¦ÃªÂ¯â€¢ÃªÂ¯Â¥ ÃªÂ¯â€˜ÃªÂ¯â‚¬ÃªÂ¯Â¨ÃªÂ¯Å¾ÃªÂ¯â€žÃªÂ¯Â¥ ÃªÂ¯Æ’ÃªÂ¯â€ÃªÂ¯Â£ÃªÂ¯Å“ ÃªÂ¯ÂÃªÂ¯Â¥ÃªÂ¯Å¾ÃªÂ¯â€ ÃªÂ¯Â¤ÃªÂ¯Å¸ÃªÂ¯â€¢ÃªÂ¯Â¤ÃªÂ¯Å’ÃªÂ¯Â¨", phone: "ÃªÂ¯ÂÃªÂ¯Â£ÃªÂ¯Å¸ ÃªÂ¯â€¦ÃªÂ¯ÂÃªÂ¯â€¢ÃªÂ¯â€ (ÃªÂ¯Æ’ÃªÂ¯Å ÃªÂ¯Â§ ÃªÂ¯â€¡ÃªÂ¯Â¥ÃªÂ¯â€¢ÃªÂ¯Â¥)*", email: "ÃªÂ¯ÂÃªÂ¯Æ’ÃªÂ¯Â¦ÃªÂ¯Å“ (ÃªÂ¯â€˜ÃªÂ¯â€žÃªÂ¯Â¥ÃªÂ¯ÂÃªÂ¯â€¢)", btn: "OTP ÃªÂ¯Å ÃªÂ¯Â¥ÃªÂ¯â€¢ÃªÂ¯Â¤ÃªÂ¯Å’ÃªÂ¯Â¨" },
        otp: { title: "ÃªÂ¯ÂÃªÂ¯Â£ÃªÂ¯Å¸ ÃªÂ¯Å’ÃªÂ¯Â¦ÃªÂ¯Â¡ÃªÂ¯ÂÃªÂ¯Â¤ÃªÂ¯Å¸ÃªÂ¯â€¢ÃªÂ¯Â¤ÃªÂ¯Å’ÃªÂ¯Â¨", sub: "ÃªÂ¯â€¦ÃªÂ¯ÂÃªÂ¯Â¥ÃªÂ¯â€ºÃªÂ¯â‚¬ÃªÂ¯Â¤ ÃªÂ¯â€¦ÃªÂ¯ÂÃªÂ¯â€¢ÃªÂ¯â€ÃªÂ¯â€”ÃªÂ¯Â¥ OTP ÃªÂ¯Å ÃªÂ¯Â¥ÃªÂ¯Ë†ÃªÂ¯Â­ÃªÂ¯â€ÃªÂ¯Â¦", btn: "ÃªÂ¯Å’ÃªÂ¯Â¦ÃªÂ¯Â¡ÃªÂ¯ÂÃªÂ¯Â¤ÃªÂ¯Å¸ÃªÂ¯â€¢ÃªÂ¯Â¤ÃªÂ¯Å’ÃªÂ¯Â¨" },
        role: { title: "ÃªÂ¯Æ’ÃªÂ¯ÂÃªÂ¯Â¤ ÃªÂ¯â‚¬ÃªÂ¯â€¦ÃªÂ¯Â¥ÃªÂ¯â€¦ÃªÂ¯Â¥ ÃªÂ¯ÂÃªÂ¯Â¤ÃªÂ¯â€“ÃªÂ¯Â¤ÃªÂ¯Å¸ÃªÂ¯â€¦ÃªÂ¯â€ÃªÂ¯Â¤ÃªÂ¯â€¢ÃªÂ¯â€¦ÃªÂ¯Â£?", sub: "ÃªÂ¯â€˜ÃªÂ¯Â©ÃªÂ¯Ë†ÃªÂ¯Â£ÃªÂ¯Å’ÃªÂ¯â€¦ÃªÂ¯Â¥ ÃªÂ¯â€¦ÃªÂ¯ÂÃªÂ¯Â¥ÃªÂ¯â€ºÃªÂ¯â‚¬ÃªÂ¯Â¤ÃªÂ¯â€”ÃªÂ¯Æ’ÃªÂ¯â€º ÃªÂ¯â€˜ÃªÂ¯Â¦ÃªÂ¯â€ºÃªÂ¯ÂÃªÂ¯â€žÃªÂ¯Â¤ÃªÂ¯â€ÃªÂ¯Â¤ÃªÂ¯Å’ÃªÂ¯Â¦ÃªÂ¯Å¸ÃªÂ¯Â ÃªÂ¯â€˜ÃªÂ¯â€”ÃªÂ¯Â¨ ÃªÂ¯ÂÃªÂ¯Â¦ÃªÂ¯ÂÃªÂ¯â€™ÃªÂ¯â€¦ÃªÂ¯Â¤ÃªÂ¯Â«", self_title: "ÃªÂ¯ÂÃªÂ¯ÂÃªÂ¯Â¥ÃªÂ¯â€™ÃªÂ¯Â¤ÃªÂ¯â€”ÃªÂ¯Æ’ÃªÂ¯â€º ÃªÂ¯ÂÃªÂ¯Â¦ÃªÂ¯Â  ÃªÂ¯â€˜ÃªÂ¯Å¾ ÃªÂ¯â€¡ÃªÂ¯Â§ÃªÂ¯â€¢ÃªÂ¯Â¤ÃªÂ¯Å’ÃªÂ¯Â¨", self_desc: "ÃªÂ¯â€˜ÃªÂ¯Â©ÃªÂ¯â€¦ÃªÂ¯Â¥ ÃªÂ¯ÂÃªÂ¯â€ºÃªÂ¯â€ ÃªÂ¯Â¥ÃªÂ¯Â¡ ÃªÂ¯ÂÃªÂ¯â€¢ÃªÂ¯Â¥ ÃªÂ¯â€ÃªÂ¯Â¨ÃªÂ¯â€¡ÃªÂ¯Â¤ÃªÂ¯Å¸ ÃªÂ¯â€˜ÃªÂ¯Æ’ÃªÂ¯Â¥ ÃªÂ¯Å ÃªÂ¯ÂÃªÂ¯â€¦ÃªÂ¯Â¤ÃªÂ¯Â¡ÃªÂ¯ÂÃªÂ¯Â«", loved_title: "ÃªÂ¯â€¦ÃªÂ¯Â¨ÃªÂ¯Â¡ÃªÂ¯ÂÃªÂ¯Â¤ÃªÂ¯â€ÃªÂ¯â€¢ÃªÂ¯Â¥ ÃªÂ¯Æ’ÃªÂ¯Â¤ÃªÂ¯â€˜ÃªÂ¯Â£ÃªÂ¯Â ÃªÂ¯â€˜ÃªÂ¯Æ’ÃªÂ¯â€™ÃªÂ¯Â¤ÃªÂ¯â€”ÃªÂ¯Æ’ÃªÂ¯â€º ÃªÂ¯ÂÃªÂ¯Â¦ÃªÂ¯Â  ÃªÂ¯â€˜ÃªÂ¯Å¾ ÃªÂ¯â€¡ÃªÂ¯Â§ÃªÂ¯â€¢ÃªÂ¯Â¤ÃªÂ¯Å’ÃªÂ¯Â¨", loved_desc: "ÃªÂ¯â€˜ÃªÂ¯Â©ÃªÂ¯â€¦ÃªÂ¯Â¥ ÃªÂ¯ÂÃªÂ¯Æ’ÃªÂ¯Â¨ÃªÂ¯Â¡ÃªÂ¯â€™ÃªÂ¯Â¤ ÃªÂ¯Æ’ÃªÂ¯Â¤ÃªÂ¯â€˜ÃªÂ¯Â£ÃªÂ¯Â ÃªÂ¯â€˜ÃªÂ¯Æ’ÃªÂ¯â€™ÃªÂ¯Â¤ ÃªÂ¯Å’ÃªÂ¯Â¦ÃªÂ¯Â¡ÃªÂ¯ÂÃªÂ¯Â¤ÃªÂ¯Å¸ÃªÂ¯â€¢ÃªÂ¯â€™ÃªÂ¯Â¤ ÃªÂ¯Å ÃªÂ¯â€¢ÃªÂ¯â€º ÃªÂ¯â€¡ÃªÂ¯Â§ÃªÂ¯â€ÃªÂ¯Â¤ÃªÂ¯Â«" },
        home: { greeting: "ÃªÂ¯Ë†ÃªÂ¯Â¨ÃªÂ¯â€ÃªÂ¯Â¨ÃªÂ¯ÂÃªÂ¯â€“ÃªÂ¯â€ÃªÂ¯Â¤", btn1: "ÃªÂ¯ÂÃªÂ¯Â¥ÃªÂ¯Å¸ÃªÂ¯â€¦ÃªÂ¯â€¢", btn2: "ÃªÂ¯ÂÃªÂ¯Æ’ÃªÂ¯Â¨ÃªÂ¯Â¡", btn3: "ÃªÂ¯Å ÃªÂ¯Â§ÃªÂ¯â€ÃªÂ¯Â", btn4: "ÃªÂ¯â€ ÃªÂ¯Â¦ÃªÂ¯â€ºÃªÂ¯ÂÃªÂ¯Â¤ÃªÂ¯Å¸" }
    }
    // Note: Other languages omitted in this snippet for brevity but should follow same structure
};

let currentLang = 'en';

function changeLanguage(langCode, btnElement = null) {
    currentLang = langCode;
    const data = langData[langCode] || langData['en'];
    
    if (langCode === 'mni') {
        document.body.classList.add('font-manipuri');
    } else {
        document.body.classList.remove('font-manipuri');
    }
    
    // Landing
    if(document.getElementById('greeting-text')) document.getElementById('greeting-text').innerText = data.landing.greeting;
    if(document.getElementById('next-btn-text')) document.getElementById('next-btn-text').innerText = data.landing.next;
    
    // Login
    if(document.getElementById('login-title')) document.getElementById('login-title').innerText = data.login.title;
    if(document.getElementById('login-subtitle')) document.getElementById('login-subtitle').innerText = data.login.sub;
    if(document.getElementById('label-phone')) document.getElementById('label-phone').innerText = data.login.phone;
    if(document.getElementById('label-email')) document.getElementById('label-email').innerText = data.login.email;
    if(document.getElementById('btn-send-otp')) document.getElementById('btn-send-otp').innerText = data.login.btn;

    // OTP
    if(document.getElementById('otp-title')) document.getElementById('otp-title').innerText = data.otp.title;
    if(document.getElementById('otp-subtitle')) document.getElementById('otp-subtitle').innerText = data.otp.sub;
    if(document.getElementById('btn-verify-otp')) document.getElementById('btn-verify-otp').innerText = data.otp.btn;

    // Role
    if(document.getElementById('role-title')) document.getElementById('role-title').innerText = data.role.title;
    if(document.getElementById('role-subtitle')) document.getElementById('role-subtitle').innerText = data.role.sub;
    if(document.getElementById('role-self-title')) document.getElementById('role-self-title').innerText = data.role.self_title;
    if(document.getElementById('role-self-desc')) document.getElementById('role-self-desc').innerText = data.role.self_desc;
    if(document.getElementById('role-loved-title')) document.getElementById('role-loved-title').innerText = data.role.loved_title;
    if(document.getElementById('role-loved-desc')) document.getElementById('role-loved-desc').innerText = data.role.loved_desc;

    // Home
    if(document.getElementById('home-greeting')) document.getElementById('home-greeting').innerText = data.home.greeting;
    if(document.getElementById('btn-game')) document.getElementById('btn-game').innerText = data.home.btn1;
    if(document.getElementById('btn-family')) document.getElementById('btn-family').innerText = data.home.btn2;
    if(document.getElementById('btn-routine')) document.getElementById('btn-routine').innerText = data.home.btn3;
    if(document.getElementById('btn-sos')) document.getElementById('btn-sos').innerText = data.home.btn4;
    
    if(document.getElementById('change-lang-text')) document.getElementById('change-lang-text').innerText = data.changeLang;
    
    if (btnElement) {
        document.querySelectorAll('.lang-card').forEach(card => card.classList.remove('active-lang'));
        btnElement.classList.add('active-lang');
    }
}

// --- Navigation Flow ---

function goToLogin() {
    localStorage.setItem('appLang', currentLang);
    showScreen('login-screen');
}

let currentAuthPhone = '';

async function sendOTP() {
    const phoneInput = document.getElementById('phone-input');
    const phone = phoneInput ? phoneInput.value.replace(/\D/g, '').slice(-10) : '';
    if (!phone || phone.length < 10) {
        alert("Please enter a valid 10-digit Indian phone number.");
        return;
    }
    currentAuthPhone = phone;

    const btn = document.getElementById('btn-send-otp');
    const originalText = btn.innerText;
    btn.innerText = "Sending SMS...";
    btn.disabled = true;

    try {
        const res = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        const data = await res.json();

        if (data.success) {
            showScreen('otp-screen');
            const subTitle = document.getElementById('otp-subtitle');
            if (subTitle) {
                subTitle.innerText = "OTP sent to +91 " + phone;
            }

            // Clear inputs & focus
            ['otp1', 'otp2', 'otp3', 'otp4'].forEach((id, idx) => {
                const el = idx === 0 ? document.querySelector('.otp-group .otp-input:first-child') : document.getElementById(id);
                if (el) el.value = '';
            });
            const firstInput = document.querySelector('.otp-group .otp-input:first-child');
            if (firstInput) firstInput.focus();

            if (data.delivered) {
                console.log("[Fast2SMS] Real SMS dispatched via Fast2SMS (0.20 INR). Check your phone!");
            } else if (data.fallback_otp) {
                // If website verification is still pending on Fast2SMS dashboard, alert user nicely
                alert("Fast2SMS Notice: " + data.gateway_error + "\n\nFor this test, your verification OTP is: " + data.fallback_otp);
            }
        } else {
            alert(data.message || "Failed to send OTP. Please try again.");
        }
    } catch (err) {
        console.warn("Backend not running or offline, using fallback:", err);
        // Direct UI transition fallback
        showScreen('otp-screen');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

function moveToNext(current, nextFieldID) {
    if (current.value.length >= 1 && nextFieldID) {
        document.getElementById(nextFieldID).focus();
    }
}

async function verifyOTP() {
    const inputs = document.querySelectorAll('.otp-group .otp-input');
    let enteredOTP = '';
    inputs.forEach(input => enteredOTP += input.value.trim());

    if (enteredOTP.length < 4) {
        alert("Please enter the complete 4-digit OTP.");
        return;
    }

    const btn = document.getElementById('btn-verify-otp');
    const originalText = btn.innerHTML;
    btn.innerText = "Verifying...";
    btn.disabled = true;

    try {
        const res = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: currentAuthPhone, otp: enteredOTP })
        });
        const data = await res.json();

        if (data.success) {
            localStorage.setItem('isAuthenticated', 'true');
            showScreen('role-screen');
        } else {
            alert(data.message || "Invalid OTP. Please check the code and try again.");
            inputs.forEach(input => input.value = '');
            if (inputs[0]) inputs[0].focus();
        }
    } catch (err) {
        console.warn("Verify endpoint offline, allowing demo:", err);
        localStorage.setItem('isAuthenticated', 'true');
        showScreen('role-screen');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function selectRole(role) {
    localStorage.setItem('userRole', role);
    
    if(role === 'self') {
        // Patient uses it themselves -> Run the invisible assessment
        showScreen('welcome-screen');
    } else {
        // Caregiver is setting it up -> Open the deep Profile Builder (starts at Clinical)
        localStorage.setItem('hasCompletedAssessment', 'true');
        showScreen('screen-clinical');
    }
}


// Universal Reset Function
function resetLanguage() {
    localStorage.clear(); // Clear all memory to test flow again
    location.reload(); 
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    // Manage bottom navigation visibility
    const nav = document.querySelector('.bottom-nav');
    if (nav) {
        if (screenId === 'home-screen' || screenId === 'routine-screen' || screenId === 'progress-screen') {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    }

    if (screenId === 'progress-screen') {
        renderProgressTab();
    }
}

window.onload = () => {
    const savedLang = localStorage.getItem('appLang');
    const isAuth = localStorage.getItem('isAuthenticated');
    const hasRole = localStorage.getItem('userRole');
    const hasAssessed = localStorage.getItem('hasCompletedAssessment');

    if (savedLang) {
        changeLanguage(savedLang);
        
        // Strict Flow Routing based on offline state
        if(isAuth && hasRole) {
            if (hasRole === 'self' && !hasAssessed) {
                // Intercept them if they closed app before finishing assessment
                showScreen('welcome-screen');
            } else {
                showScreen('home-screen');
            }
        } else if (isAuth) {
            showScreen('role-screen');
        } else {
            showScreen('login-screen');
        }
    } else {
        // Default to English Landing Page
        changeLanguage('en');
    }
};

// --- Side Drawer Functions ---
function toggleDrawer() {
    const overlay = document.getElementById('drawer-overlay');
    const drawer = document.getElementById('side-drawer');
    if (overlay && drawer) {
        overlay.classList.toggle('active');
        drawer.classList.toggle('open');
    }
}

function openProfileSection(sectionId) {
    toggleDrawer(); // close drawer
    showScreen('screen-' + sectionId);
}






// --- DYNAMIC GAUNTLET (5-Minute Continuous Loop) ---
let currentPhase = 0;
let gauntletTimeLeft = 300; // 5 minutes (300 seconds)
let gauntletInterval = null;
