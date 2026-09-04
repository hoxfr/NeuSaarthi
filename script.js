let stats = { cog: 0, hyd: 0, phy: 0 };
const langData = {
    "en": { 
        label: "English", 
        changeLang: "Change Language",
        landing: { greeting: "Welcome", next: "Next" },
        login: { title: "Welcome", sub: "Enter details to continue", phone: "Phone Number (Required)*", email: "Email ID (Optional)", btn: "Send OTP" },
        otp: { title: "Verify Phone", sub: "OTP sent to your number", btn: "Verify & Secure" },
        role: { title: "Who is using this?", sub: "We will adapt the experience for you.", self_title: "Set up for myself", self_desc: "I want to maintain a healthy routine.", loved_title: "Set up for a loved one", loved_desc: "I am managing care for a family member." },
        home: { greeting: "Good Morning", btn1: "Play Game", btn2: "Family", btn3: "Routine", btn4: "SOS Alert" },
        gauntlet: {
            level_easy: "Level 1: Easy", level_med: "Level 2: Medium", level_hard: "Level 3: Hard",
            skip: "Skip to Results", analyzing: "Analyzing your interactions...",
            btn_left: "LEFT", btn_right: "RIGHT", btn_match: "MATCH!", btn_yes: "YES", btn_no: "NO",
            g0_title: "Game 1: Sequence Memory", g0_watch: "Watch the sequence...", g0_tap: "Tap the sequence in order:",
            g1_title: "Game 2: Grid Memory", g1_rem: "Remember the green squares", g1_tap: "Tap the squares that were green",
            g2_title: "Game 3: Target Detection", g2_inst: "Tap the Blue Circle (&#x1F535;) as soon as it appears!",
            g3_title: "Game 4: Attention Switching", g3_even_odd: "If EVEN tap Left, If ODD tap Right", g3_red_blue: "If RED tap Left, If BLUE tap Right",
            g4_title: "Game 5: Quick Match", g4_inst: "Find the matching animal:",
            g5_title: "Game 6: Pattern Completion", g5_inst: "What number comes next?",
            g6_title: "Game 7: Matrix Reasoning", g6_inst: "Complete the logic:",
            g7_title: "Game 8: N-Back Memory", g7_inst: "Tap Match if the current shape is EXACTLY the same as the PREVIOUS shape.",
            g8_title: "Game 9: Go/No-Go", g8_inst: "Tap GREEN (&#x1F7E2;). DO NOT tap RED (&#x1F534;).",
            g9_title: "Game 10: Rule Learning", g9_rule: "Rule: Apple Left, Banana Right", g9_rev_rule: "Reverse Rule: Apple Right, Banana Left",
            g10_title: "Game 11: Memory Recognition", g10_memo: "Memorize these symbols...", g10_see: "Did you just see this symbol?",
            g11_title: "Game 12: Delayed Recall", g11_inst: "Which shape was the very FIRST one you saw at the start?",
            g12_title: "Game 13: Order Planning", g12_inst: "Tap the numbers from Smallest to Largest"
        }
    },
    "hi": { 
        label: "Hindi (हिंदी)", 
        changeLang: "भाषा बदलें",
        landing: { greeting: "नमस्ते", next: "अगला" },
        login: { title: "स्वागत है", sub: "जारी रखने के लिए विवरण दर्ज करें", phone: "फोन नंबर (आवश्यक)*", email: "ईमेल (वैकल्पिक)", btn: "OTP भेजें" },
        otp: { title: "फोन सत्यापित करें", sub: "आपके नंबर पर OTP भेजा गया", btn: "सत्यापित करें" },
        role: { title: "इसका उपयोग कौन कर रहा है?", sub: "हम आपके लिए अनुभव को अनुकूलित करेंगे।", self_title: "मेरे लिए सेट अप करें", self_desc: "मैं एक स्वस्थ दिनचर्या बनाए रखना चाहता हूँ।", loved_title: "प्रियजन के लिए सेट अप करें", loved_desc: "मैं परिवार के सदस्य की देखभाल प्रबंधित कर रहा हूँ।" },
        home: { greeting: "नमस्ते", btn1: "खेल खेलें", btn2: "परिवार", btn3: "दिनचर्या", btn4: "आपातकालीन" },
        gauntlet: {
            level_easy: "स्तर 1: आसान", level_med: "स्तर 2: मध्यम", level_hard: "स्तर 3: कठिन",
            skip: "परिणाम देखें", analyzing: "आपके प्रदर्शन का विश्लेषण हो रहा है...",
            btn_left: "बायाँ", btn_right: "दायाँ", btn_match: "समान है!", btn_yes: "हाँ", btn_no: "नहीं",
            g0_title: "खेल 1: क्रम स्मृति", g0_watch: "क्रम को ध्यान से देखें...", g0_tap: "क्रम के अनुसार आकारों को दबाएं:",
            g1_title: "खेल 2: ग्रिड स्मृति", g1_rem: "हरे खानों को याद रखें", g1_tap: "हरे रंग वाले खानों को दबाएं",
            g2_title: "खेल 3: लक्ष्य पहचान", g2_inst: "नीला गोला (&#x1F535;) दिखते ही तुरंत दबाएं!",
            g3_title: "खेल 4: ध्यान परिवर्तन", g3_even_odd: "सम (EVEN) है तो बायाँ, विषम (ODD) है तो दायाँ", g3_red_blue: "लाल (&#x1F534;) है तो बायाँ, नीला (&#x1F535;) है तो दायाँ",
            g4_title: "खेल 5: त्वरित मिलान", g4_inst: "समान जानवर को खोजें:",
            g5_title: "खेल 6: पैटर्न पूरा करें", g5_inst: "अगला नंबर कौन सा आएगा?",
            g6_title: "खेल 7: तार्किक पहेली", g6_inst: "तर्क को पूरा करें:",
            g7_title: "खेल 8: पिछली आकृति याद रखें", g7_inst: "अगर वर्तमान आकार पिछले आकार जैसा ही है तो 'समान है!' दबाएं।",
            g8_title: "खेल 9: संयम और नियंत्रण", g8_inst: "हरे (&#x1F7E2;) को दबाएं। लाल (&#x1F534;) को मत दबाएं।",
            g9_title: "खेल 10: नियम पालन", g9_rule: "नियम: सेब बायाँ, केला दायाँ", g9_rev_rule: "उल्टा नियम: सेब दायाँ, केला बायाँ",
            g10_title: "खेल 11: स्मृति पहचान", g10_memo: "इन प्रतीकों को याद रखें...", g10_see: "क्या आपने अभी यह प्रतीक देखा था?",
            g11_title: "खेल 12: विलंबित स्मरण", g11_inst: "शुरुआत में आपने सबसे पहला आकार कौन सा देखा था?",
            g12_title: "खेल 13: क्रमबद्ध योजना", g12_inst: "संख्याओं को सबसे छोटे से सबसे बड़े क्रम में दबाएं"
        }
    },
    "as": { 
        label: "Assamese (অসমীয়া)", 
        changeLang: "ভাষা সলনি কৰক",
        landing: { greeting: "স্বাগতম", next: "পৰৱৰ্তী" },
        login: { title: "স্বাগতম", sub: "আগবাঢ়িবলৈ সবিশেষ দিয়ক", phone: "ফোন নম্বৰ (প্ৰয়োজনীয়)*", email: "ইমেইল (বৈকল্পিক)", btn: "OTP পঠিয়াওক" },
        otp: { title: "ফোন প্ৰমাণিত কৰক", sub: "আপোনাৰ নম্বৰলৈ OTP পঠিওৱা হৈছে", btn: "প্ৰমাণিত কৰক" },
        role: { title: "কোনে ব্যৱহাৰ কৰিছে?", sub: "আমি আপোনাৰ বাবে অভিজ্ঞতা সলনি কৰিম।", self_title: "মোৰ বাবে ছেট আপ কৰক", self_desc: "মই এটা সুস্থ ৰুটিন বজাই ৰাখিব বিচাৰো।", loved_title: "প্ৰিয়জনৰ বাবে ছেট আপ কৰক", loved_desc: "মই পৰিয়ালৰ সদস্যৰ বাবে যতন পৰিচালনা কৰি আছো।" },
        home: { greeting: "সুপ্ৰভাত", btn1: "খেল খেলক", btn2: "পৰিয়াল", btn3: "ৰুটিন", btn4: "জৰুৰীকালীন" },
        gauntlet: {
            level_easy: "স্তৰ ১: সহজ", level_med: "স্তৰ ২: মধ্যম", level_hard: "স্তৰ ৩: কঠিন",
            skip: "ফলাফল চাওক", analyzing: "আপোনাৰ প্ৰদৰ্শন বিশ্লেষণ কৰা হৈছে...",
            btn_left: "বাওঁফালে", btn_right: "সোঁফালে", btn_match: "মিলে!", btn_yes: "হয়", btn_no: "নহয়",
            g0_title: "খেল ১: অনুক্ৰম স্মৃতি", g0_watch: "ক্ৰমটো মন দি চাওক...", g0_tap: "ক্ৰম অনুসাৰে স্পৰ্শ কৰক:",
            g1_title: "খেল ২: গ্ৰিড স্মৃতি", g1_rem: "সেউজীয়া বাকচবোৰ মনত ৰাখক", g1_tap: "সেউজীয়া আছিল সেইবোৰত স্পৰ্শ কৰক",
            g2_title: "খেল ৩: লক্ষ্য চিনাক্তকৰণ", g2_inst: "নীলা বৃত্তটো (&#x1F535;) দেখাৰ লগে লগে স্পৰ্শ কৰক!",
            g3_title: "খেল ৪: মনোযোগ পৰিৱৰ্তন", g3_even_odd: "যুগ্ম হ'লে বাওঁফালে, অযুগ্ম হ'লে সোঁফালে", g3_red_blue: "ৰঙা হ'লে বাওঁফালে, নীলা হ'লে সোঁফালে",
            g4_title: "খেল ৫: ক্ষিপ্ৰ মিল", g4_inst: "একে ধৰণৰ প্ৰাণীটো বিচাৰক:",
            g5_title: "খেল ৬: পেটাৰ্ণ সম্পূৰ্ণ কৰক", g5_inst: "ইয়াৰ পিছত কোনটো সংখ্যা আহিব?",
            g6_title: "খেল ৭: তৰ্কসংগত সাঁথৰ", g6_inst: "যুক্তি সম্পূৰ্ণ কৰক:",
            g7_title: "খেল ৮: পূৰ্বৰ আকৃতি মনত ৰাখক", g7_inst: "বৰ্তমানৰ আকৃতিটো পূৰ্বৰ সৈতে একে হ'লে 'মিলে!' স্পৰ্শ কৰক।",
            g8_title: "খেল ৯: নিয়ন্ত্ৰণ পৰীক্ষা", g8_inst: "সেউজীয়াত (&#x1F7E2;) স্পৰ্শ কৰক। ৰঙাত (&#x1F534;) নকৰিব।",
            g9_title: "খেল ১০: নিয়ম শিকা", g9_rule: "নিয়ম: আপেল বাওঁফালে, কল সোঁফালে", g9_rev_rule: "বিপৰীত নিয়ম: আপেল সোঁফালে, কল বাওঁফালে",
            g10_title: "খেল ১১: স্মৃতি চিনাক্তকৰণ", g10_memo: "এই চিহ্নবোৰ মনত ৰাখক...", g10_see: "আপুনি এইমাত্র এই চিহ্নটো দেখিছিল নেকি?",
            g11_title: "খেল ১২: পলমকৈ মনত পেলোৱা", g11_inst: "আৰম্ভণিতে আপুনি প্ৰথমে কোনটো আকৃতি দেখিছিল?",
            g12_title: "খেল ১৩: ক্ৰম পৰিকল্পনা", g12_inst: "আটাইতকৈ সৰুৰ পৰা ডাঙৰলৈ সংখ্যাবোৰ স্পৰ্শ কৰক"
        }
    },
    "bn": { 
        label: "Bengali (বাংলা)", 
        changeLang: "ভাষা পরিবর্তন করুন",
        landing: { greeting: "স্বাগতম", next: "পরবর্তী" },
        login: { title: "স্বাগতম", sub: "এগিয়ে যেতে বিবরণ দিন", phone: "ফোন নম্বর (প্রয়োজনীয়)*", email: "ইমেইল (ঐচ্ছিক)", btn: "OTP পাঠান" },
        otp: { title: "ফোন যাচাই করুন", sub: "আপনার নম্বরে OTP পাঠানো হয়েছে", btn: "যাচাই করুন" },
        role: { title: "কে এটি ব্যবহার করছেন?", sub: "আমরা আপনার জন্য অভিজ্ঞতা সাজাব।", self_title: "আমার জন্য সেট আপ করুন", self_desc: "আমি একটি স্বাস্থ্যকর রুটিন রাখতে চাই।", loved_title: "প্রিয়জনের জন্য সেট আপ করুন", loved_desc: "আমি পরিবারের সদস্যের যত্ন নিচ্ছি।" },
        home: { greeting: "শুভ সকাল", btn1: "খেলা খেলুন", btn2: "পরিবার", btn3: "রুটিন", btn4: "জরুরি" },
        gauntlet: {
            level_easy: "লেভেল ১: সহজ", level_med: "লেভেল ২: মাঝারি", level_hard: "লেভেল ৩: কঠিন",
            skip: "ফলাফল দেখুন", analyzing: "আপনার পারফরম্যান্স বিশ্লেষণ করা হচ্ছে...",
            btn_left: "বাম", btn_right: "ডান", btn_match: "একই!", btn_yes: "হ্যাঁ", btn_no: "না",
            g0_title: "খেলা ১: অনুক্রম স্মৃতি", g0_watch: "ক্রমটি মনোযোগ দিয়ে দেখুন...", g0_tap: "ক্রম অনুসারে ট্যাপ করুন:",
            g1_title: "খেলা ২: গ্রিড স্মৃতি", g1_rem: "সবুজ বাক্সগুলি মনে রাখুন", g1_tap: "যেগুলো সবুজ ছিল সেগুলি ট্যাপ করুন",
            g2_title: "খেলা ৩: লক্ষ্য সনাক্তকরণ", g2_inst: "নীল বৃত্তটি (&#x1F535;) দেখতে পেলেই দ্রুত ট্যাপ করুন!",
            g3_title: "খেলা ৪: মনোযোগ পরিবর্তন", g3_even_odd: "জোড় হলে বামে, বিজোড় হলে ডানে", g3_red_blue: "লাল হলে বামে, নীল হলে ডানে",
            g4_title: "খেলা ৫: দ্রুত মিল", g4_inst: "একই প্রাণীটি খুঁজুন:",
            g5_title: "খেলা ৬: প্যাটার্ন সম্পূর্ণ করুন", g5_inst: "এরপর কোন সংখ্যাটি আসবে?",
            g6_title: "খেলা ৭: লজিক ধাঁধা", g6_inst: "যুক্তিটি পূরণ করুন:",
            g7_title: "খেলা ৮: পূর্ববর্তী আকৃতি", g7_inst: "বর্তমান আকারটি আগেরটির সাথে হুবহু মিললে 'একই!' চাপুন।",
            g8_title: "খেলা ৯: আত্মনিয়ন্ত্রণ পরীক্ষা", g8_inst: "সবুজ (&#x1F7E2;) ট্যাপ করুন। লাল (&#x1F534;) ট্যাপ করবেন না।",
            g9_title: "খেলা ১০: নিয়ম অনুসরণ", g9_rule: "নিয়ম: আপেল বামে, কলা ডানে", g9_rev_rule: "বিপরীত নিয়ম: আপেল ডানে, কলা বামে",
            g10_title: "খেলা ১১: স্মৃতি সনাক্তকরণ", g10_memo: "এই প্রতীকগুলো মনে রাখুন...", g10_see: "আপনি কি এইমাত্র এই প্রতীকটি দেখেছিলেন?",
            g11_title: "খেলা ১২: দীর্ঘমেয়াদী স্মৃতি", g11_inst: "শুরুতে আপনি সর্বপ্রথম কোন আকৃতিটি দেখেছিলেন?",
            g12_title: "খেলা ১৩: ক্রম সাজানো", g12_inst: "সবচেয়ে ছোট থেকে বড় ক্রমে সংখ্যাগুলো ট্যাপ করুন"
        }
    },
    "mni": { 
        label: "Manipuri (ꯃꯤꯇꯩꯂꯣꯟ)",
        changeLang: "ꯂꯣꯟ ꯍꯣꯡꯗꯣꯛꯎ",
        landing: { greeting: "ꯈꯨꯔꯨꯝꯖꯔꯤ", next: "ꯃꯊꯪ" },
        login: { title: "ꯈꯨꯔꯨꯝꯖꯔꯤ", sub: "ꯃꯈꯥ ꯆꯠꯊꯅꯕꯥ ꯑꯀꯨꯞꯄꯥ ꯃꯔꯣꯜ ꯍꯥꯞꯆꯤꯟꯕꯤꯌꯨ", phone: "ꯐꯣꯟ ꯅꯝꯕꯔ (ꯃꯊꯧ ꯇꯥꯕꯥ)*", email: "ꯏꯃꯦꯜ (ꯑꯄꯥꯝꯕ)", btn: "OTP ꯊꯥꯕꯤꯌꯨ" },
        otp: { title: "ꯐꯣꯟ ꯌꯦꯡꯁꯤꯟꯕꯤꯌꯨ", sub: "ꯅꯍꯥꯛꯀꯤ ꯅꯝꯕꯔꯗꯥ OTP ꯊꯥꯈ꯭ꯔꯦ", btn: "ꯌꯦꯡꯁꯤꯟꯕꯤꯌꯨ" },
        role: { title: "ꯃꯁꯤ ꯀꯅꯥꯅꯥ ꯁꯤꯖꯤꯟꯅꯔꯤꯕꯅꯣ?", sub: "ꯑꯩꯈꯣꯌꯅꯥ ꯅꯍꯥꯛꯀꯤꯗꯃꯛ ꯑꯦꯛꯁꯄꯤꯔꯤꯌꯦꯟꯁ ꯑꯗꯨ ꯁꯦꯝꯒꯅꯤ꯫", self_title: "ꯏꯁꯥꯒꯤꯗꯃꯛ ꯁꯦꯠ ꯑꯞ ꯇꯧꯕꯤꯌꯨ", self_desc: "ꯑꯩꯅꯥ ꯍꯛꯆꯥꯡ ꯐꯕꯥ ꯔꯨꯇꯤꯟ ꯑꯃꯥ ꯊꯝꯅꯤꯡꯏ꯫", loved_title: "ꯅꯨꯡꯁꯤꯔꯕꯥ ꯃꯤꯑꯣꯏ ꯑꯃꯒꯤꯗꯃꯛ ꯁꯦꯠ ꯑꯞ ꯇꯧꯕꯤꯌꯨ", loved_desc: "ꯑꯩꯅꯥ ꯏꯃꯨꯡꯒꯤ ꯃꯤꯑꯣꯏ ꯑꯃꯒꯤ ꯌꯦꯡꯁꯤꯟꯕꯒꯤ ꯊꯕꯛ ꯇꯧꯔꯤ꯫" },
        home: { greeting: "ꯈꯨꯔꯨꯝꯖꯔꯤ", btn1: "ꯁꯥꯟꯅꯕ", btn2: "ꯏꯃꯨꯡ", btn3: "ꯊꯧꯔꯝ", btn4: "ꯆꯦꯛꯁꯤꯟ" },
        gauntlet: {
            level_easy: "ꯊꯥꯛ ১: ꯂꯥꯏꯕ", level_med: "ꯊꯥꯛ ২: ꯃꯌꯥꯏ ꯑꯣꯏꯕ", level_hard: "ꯊꯥꯛ ৩: ꯑꯀꯟꯕ",
            skip: "ꯐꯜ ꯌꯦꯡꯕ", analyzing: "ꯅꯍꯥꯛꯀꯤ ꯊꯕꯛ ꯌꯦꯡꯁꯤꯟꯂꯤ...",
            btn_left: "ꯂꯦꯡꯕ", btn_right: "ꯌꯦꯠ", btn_match: "ꯃꯥꯟꯅꯩ!", btn_yes: "ꯍꯣꯌ", btn_no: "ꯅꯠꯇꯦ",
            g0_title: "ꯁꯥꯟꯅꯕ ১: ꯃꯊꯪ-ꯃꯅꯥꯎ ꯅꯤꯡꯁꯤꯡꯕ", g0_watch: "ꯃꯊꯪ-ꯃꯅꯥꯎ ꯑꯗꯨ ꯌꯦꯡꯕꯤꯌꯨ...", g0_tap: "ꯃꯊꯪ-ꯃꯅꯥꯎ ꯑꯣꯏꯅꯥ ꯅꯝꯕꯤꯌꯨ:",
            g1_title: "ꯁꯥꯟꯅꯕ ২: ꯒ꯭ꯔꯤꯗ ꯅꯤꯡꯁꯤꯡꯕ", g1_rem: "ꯑꯁꯪꯕ ꯁꯦꯜꯁꯤꯡ ꯅꯤꯡꯁꯤꯡꯕꯤꯌꯨ", g1_tap: "ꯑꯁꯪꯕ ꯑꯣꯏꯔꯝꯕ ꯁꯦꯜꯁꯤꯡꯗꯥ ꯅꯝꯕꯤꯌꯨ",
            g2_title: "ꯁꯥꯟꯅꯕ ৩: ꯄꯥꯟꯗꯝ ꯈꯪꯗꯣꯛꯄ", g2_inst: "ꯍꯤꯒꯣꯛ (&#x1F535;) ꯎꯕꯥ ꯃꯇꯝꯗꯥ ꯌꯥꯡꯅꯥ ꯅꯝꯕꯤꯌꯨ!",
            g3_title: "ꯁꯥꯟꯅꯕ ৪: ꯋꯥꯈꯜ ꯍꯣꯡꯗꯣꯛꯄ", g3_even_odd: "ꯌꯨꯒ꯭ꯃ ꯑꯣꯏꯔꯒꯥ ꯂꯦꯡꯕ, ꯑꯌꯨꯒ꯭ꯃ ꯑꯣꯏꯔꯒꯥ ꯌꯦꯠ", g3_red_blue: "ꯑꯉꯥꯡꯕ ꯑꯣꯏꯔꯒꯥ ꯂꯦꯡꯕ, ꯍꯤꯒꯣꯛ ꯑꯣꯏꯔꯒꯥ ꯌꯦꯠ",
            g4_title: "ꯁꯥꯟꯅꯕ ৫: ꯌꯥꯡꯅꯥ ꯃꯥꯟꯅꯍꯟꯕ", g4_inst: "ꯃꯥꯟꯅꯕꯥ ꯁꯥ ꯑꯗꯨ ꯊꯤꯕꯤꯌꯨ:",
            g5_title: "ꯁꯥꯟꯅꯕ ৬: ꯃꯊꯪ ꯃꯅꯥꯎ ꯃꯄꯨꯡ ꯐꯥꯍꯟꯕ", g5_inst: "ꯃꯊꯪꯗꯥ ꯀꯔꯤ ꯃꯁꯤꯡ ꯂꯥꯛꯀꯅꯤ?",
            g6_title: "ꯁꯥꯟꯅꯕ ৭: ꯂꯣꯖꯤꯛ ꯃꯄꯨꯡ ꯐꯥꯍꯟꯕ", g6_inst: "ꯂꯣꯖꯤꯛ ꯑꯗꯨ ꯃꯄꯨꯡ ꯐꯥꯍꯟꯕꯤꯌꯨ:",
            g7_title: "ꯁꯥꯟꯅꯕ ৮: ꯃꯃꯥꯡꯒꯤ ꯃꯑꯣꯡ ꯅꯤꯡꯁꯤꯡꯕ", g7_inst: "ꯍꯧꯖꯤꯛꯀꯤ ꯃꯑꯣꯡ ꯃꯃꯥꯡꯒꯤꯒꯥ ꯃꯥꯟꯅꯔꯕꯗꯤ 'ꯃꯥꯟꯅꯩ!' ꯅꯝꯕꯤꯌꯨ꯫",
            g8_title: "ꯁꯥꯟꯅꯕ ৯: ꯆꯦꯛꯁꯤꯟ ꯊꯧꯔꯥꯡ", g8_inst: "ꯑꯁꯪꯕꯗꯥ (&#x1F7E2;) ꯅꯝꯕꯤꯌꯨ꯫ ꯑꯉꯥꯡꯕꯗꯥ (&#x1F534;) ꯅꯝꯒꯅꯨ꯫",
            g9_title: "ꯁꯥꯟꯅꯕ ১০: ꯅꯤꯌꯝ ꯇꯝꯕ", g9_rule: "ꯅꯤꯌꯝ: ꯁꯦꯕ ꯂꯦꯡꯕ, ꯂꯐꯣꯏ ꯌꯦꯠ", g9_rev_rule: "ꯅꯣꯡꯂꯩ: ꯁꯦꯕ ꯌꯦꯠ, ꯂꯐꯣꯏ ꯂꯦꯡꯕ",
            g10_title: "ꯁꯥꯟꯅꯕ ১১: ꯅꯤꯡꯁꯤꯡ ꯈꯪꯗꯣꯛꯄ", g10_memo: "ꯃꯁꯤꯒꯤ ꯈꯨꯗꯝꯁꯤꯡ ꯑꯁꯤ ꯅꯤꯡꯁꯤꯡꯕꯤꯌꯨ...", g10_see: "ꯅꯍꯥꯛꯅꯥ ꯍꯟꯗꯛ ꯃꯁꯤ ꯎꯈ꯭ꯔꯕ꯭ꯔꯥ?",
            g11_title: "ꯁꯥꯟꯅꯕ ১২: ꯑꯍꯥꯟꯕ ꯅꯤꯡꯁꯤꯡꯕ", g11_inst: "ꯑꯍꯥꯟꯕꯗꯥ ꯅꯍꯥꯛꯅꯥ ꯈ꯭ꯕꯥꯏꯗꯒꯤ ꯑꯍꯥꯟꯕ ꯎꯈꯤꯕ ꯃꯑꯣꯡ ꯑꯗꯨ ꯀꯔꯤꯅꯣ?",
            g12_title: "ꯁꯥꯟꯅꯕ ১৩: ꯃꯊꯪ-ꯃꯅꯥꯎ ꯊꯧꯔꯥꯡ", g12_inst: "ꯈ꯭ꯕꯥꯏꯗꯒꯤ ꯑꯄꯤꯛꯄꯗꯒꯤ ꯑꯆꯧꯕꯥ ꯃꯁꯤꯡꯗꯥ ꯅꯝꯕꯤꯌꯨ"
        }
    },
    "ne": { 
        label: "Nepali (नेपाली)", 
        changeLang: "भाषा बदल्नुहोस्",
        landing: { greeting: "नमस्ते", next: "अर्को" },
        login: { title: "स्वागत छ", sub: "जारी राख्न विवरण दिनुहोस्", phone: "फोन नम्बर (आवश्यक)*", email: "इमेल (वैकल्पिक)", btn: "OTP पठाउनुहोस्" },
        otp: { title: "फोन प्रमाणीकरण", sub: "तपाईंको नम्बरमा OTP पठाइयो", btn: "प्रमाणीकरण गर्नुहोस्" },
        role: { title: "यो कसले प्रयोग गर्दैछ?", sub: "हामी तपाईंको लागि अनुभव अनुकूलित गर्नेछौं।", self_title: "मेरो लागि सेट अप गर्नुहोस्", self_desc: "म स्वस्थ दिनचर्या कायम राख्न चाहन्छु।", loved_title: "प्रियजनको लागि सेट अप गर्नुहोस्", loved_desc: "म परिवारको सदस्यको हेरचाह गर्दैछु।" },
        home: { greeting: "शुभ प्रभात", btn1: "खेल खेल्नुहोस्", btn2: "परिवार", btn3: "दिनचर्या", btn4: "आपतकालीन" },
        gauntlet: {
            level_easy: "तह १: सजिलो", level_med: "तह २: मध्यम", level_hard: "तह ३: गाह्रो",
            skip: "नतिजा हेर्नुहोस्", analyzing: "तपाईंको प्रदर्शन विश्लेषण गरिँदैछ...",
            btn_left: "बायाँ", btn_right: "दायाँ", btn_match: "मिल्छ!", btn_yes: "हो", btn_no: "होइन",
            g0_title: "खेल १: क्रम स्मरण", g0_watch: "क्रम ध्यान दिएर हेर्नुहोस्...", g0_tap: "क्रम अनुसार ट्याप गर्नुहोस्:",
            g1_title: "खेल २: ग्रिड स्मरण", g1_rem: "हरियो वर्गहरू सम्झनुहोस्", g1_tap: "हरियो भएका वर्गहरूमा ट्याप गर्नुहोस्",
            g2_title: "खेल ३: लक्ष्य पहिचान", g2_inst: "नीलो वृत्त (&#x1F535;) देखिने बित्तिकै तुरुन्त ट्याप गर्नुहोस्!",
            g3_title: "खेल ४: ध्यान परिवर्तन", g3_even_odd: "जोड भए बायाँ, बिजोर भए दायाँ", g3_red_blue: "रातो भए बायाँ, नीलो भए दायाँ",
            g4_title: "खेल ५: छिटो मिलाउने", g4_inst: "मिल्दोजुल्दो जनावर खोज्नुहोस्:",
            g5_title: "खेल ६: ढाँचा पूरा गर्नुहोस्", g5_inst: "अर्को नम्बर कुन आउँछ?",
            g6_title: "खेल ७: तार्किक तर्क", g6_inst: "तर्क पूरा गर्नुहोस्:",
            g7_title: "खेल ८: अघिल्लो आकार स्मरण", g7_inst: "यदि हालको आकार अघिल्लो आकार जस्तै छ भने 'मिल्छ!' ट्याप गर्नुहोस्।",
            g8_title: "खेल ९: नियन्त्रण परीक्षण", g8_inst: "हरियो (&#x1F7E2;) मा ट्याप गर्नुहोस्। रातो (&#x1F534;) मा ट्याप नगर्नुहोस्।",
            g9_title: "खेल १०: नियम सिकाइ", g9_rule: "नियम: स्याउ बायाँ, केरा दायाँ", g9_rev_rule: "उल्टो नियम: स्याउ दायाँ, केरा बायाँ",
            g10_title: "खेल ११: स्मरण पहिचान", g10_memo: "यी प्रतीकहरू सम्झनुहोस्...", g10_see: "के तपाईंले भर्खरै यो प्रतीक देख्नुभएको थियो?",
            g11_title: "खेल १२: स्मरण पुनरावलोकन", g11_inst: "सुरुमा तपाईंले सबैभन्दा पहिले कुन आकार देख्नुभएको थियो?",
            g12_title: "खेल १३: क्रमबद्ध योजना", g12_inst: "सबैभन्दा सानोबाट ठूलो क्रममा नम्बरहरू ट्याप गर्नुहोस्"
        }
    },
    "kha": { 
        label: "Khasi (Ka Ktien Khasi)", 
        changeLang: "Pynkylla Ktien",
        landing: { greeting: "Khublei", next: "Budge" },
        login: { title: "Khublei", sub: "Thep ki jingtip ban bteng", phone: "Number Phone*", email: "Email ID", btn: "Phah OTP" },
        otp: { title: "Pynskhem Phone", sub: "La phah OTP sha u number", btn: "Pynskhem" },
        role: { title: "Mano ba pyndonkam?", sub: "Ngin pyniahap na ka bynta jong phi.", self_title: "Na ka bynta ialade", self_desc: "Nga kwah ban ri ia ka jingkoit jingkhiah.", loved_title: "Na ka bynta ba ieit", loved_desc: "Nga sumar ia uba ha iing." },
        home: { greeting: "Khublei mynstep", btn1: "Lehkai Game", btn2: "Iing", btn3: "Rukom Trei", btn4: "Khyllah Ding" }
    },
    "mz": { 
        label: "Mizo (Mizo ṭawng)", 
        changeLang: "Ṭawng Thlakna",
        landing: { greeting: "Chibai", next: "A dawt" },
        login: { title: "Chibai", sub: "Hma sawn zel turin chhu lut rawh", phone: "Phone Number*", email: "Email ID", btn: "OTP Thawn rawh" },
        otp: { title: "Phone Nemngheh", sub: "I number-ah OTP kan thawn e", btn: "Nemngheh rawh" },
        role: { title: "Tunge hmang dawn?", sub: "I tan kan siamrem ang.", self_title: "Keima tan", self_desc: "Hrisel taka awm ka duh.", loved_title: "Chhungte tan", loved_desc: "Ka chhungte enkawlna atan a ni." },
        home: { greeting: "Chibai zing chibai", btn1: "Game Khelh", btn2: "Chhungkua", btn3: "Nitintih", btn4: "Chhiatrupna" }
    },
    "nag": { 
        label: "Nagamese (Nagamiz)", 
        changeLang: "Bhasa Bodli Kora",
        landing: { greeting: "Bhal Ase", next: "Agete" },
        login: { title: "Bhal Ase", sub: "Agete jabole details dabi", phone: "Phone Number*", email: "Email ID", btn: "OTP Pathabi" },
        otp: { title: "Phone Check Kora", sub: "Tumar number te OTP pathaise", btn: "Check Kora" },
        role: { title: "Kune use korise?", sub: "Ami tumar karone bhal bonabo.", self_title: "Nijer karone", self_desc: "Bhal routine thakibo mon ase.", loved_title: "Ghor manu karone", loved_desc: "Ghor manu ke help korise." },
        home: { greeting: "Bhal Morning", btn1: "Game Khela", btn2: "Family", btn3: "Daily Kaam", btn4: "Emergency" }
    }
};

let currentLang = 'en';

function changeLanguage(langCode, btnElement = null) {
    currentLang = langCode;
    try { localStorage.setItem('appLang', currentLang); } catch (e) {}
    const data = langData[langCode] || langData['en'];
    const gl = (data && data.gauntlet) || langData['en'].gauntlet;
    
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

    // Analyzing Screen
    if(document.getElementById('analyzing-text')) document.getElementById('analyzing-text').innerText = gl.analyzing;

    // Skip Button
    const skipBtn = document.getElementById('demo-skip');
    if(skipBtn) skipBtn.innerText = gl.skip;
    
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
        // User sets it up themselves -> run the light warm-up assessment
        showScreen('welcome-screen');
    } else {
        // Caregiver is setting it up -> open the Wellness Profile builder
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
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    
    if (screenId === 'game-menu-screen') {
        if(typeof renderGamesList === 'function') renderGamesList();
        document.getElementById(screenId).style.display = 'block';
    } else if (screenId === 'home-screen') {
        if(typeof updateProgressUI === 'function') updateProgressUI();
        if(typeof renderAiCareTrackBanner === 'function') renderAiCareTrackBanner();
        document.getElementById(screenId).style.display = 'block';
    } else if (screenId === 'family-screen') {
        if(typeof renderFamilyMenu === 'function') renderFamilyMenu();
        document.getElementById(screenId).style.display = 'block';
    } else if (screenId === 'routine-screen') {
        if(typeof initRoutineScreen === 'function') initRoutineScreen();
        document.getElementById(screenId).style.display = 'block';
    } else {
        const el = document.getElementById(screenId);
        if(el) el.style.display = 'flex';
    }

    const nav = document.querySelector('.bottom-nav');
    if (nav) {
        if (['home-screen', 'progress-screen', 'routine-screen'].includes(screenId)) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    }

    if (screenId === 'progress-screen') {
        if(typeof renderProgressTab === 'function') renderProgressTab();
        if(typeof renderAiComparisonCard === 'function') renderAiComparisonCard();
    }

    if (typeof updateSaarthiMicVisibility === 'function') updateSaarthiMicVisibility(screenId);
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
                // Intercept them if they closed app before finishing assessment.
                // If they specifically refreshed/reopened mid-gauntlet, offer to resume
                // instead of silently losing their progress.
                const snap = getAssessmentSnapshot();
                if (snap) {
                    showResumeAssessmentPrompt(snap);
                } else {
                    showScreen('welcome-screen');
                }
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






// ==========================================
// MODULE 2: GAUNTLET COGNITIVE ASSESSMENT
// Lead: Member 2 (Core Cognitive Engine)
// Contains 13 randomized cognitive games mapped to wellness focus areas
// ==========================================

var gauntletInterval = null;
var gauntletTimeLeft = 300;
var currentPhase = 0;
window.savedRecallItems = [];
window.gauntletTasksQueue = [];

// --- AI SCORING ENGINE: real per-game accuracy + reaction-time capture ---
// Crash-proof by design: every public method is wrapped so a missing/out-of-order
// call never throws and never blocks the game it's instrumenting.
window.GauntletScore = (function () {
    let current = null;   // in-progress task: { taskType, hits, misses, latencies, lastPrompt }
    const detail = {};    // finalized per-game detail, keyed by taskType

    function begin(taskType) {
        try {
            commit(); // auto-commit whatever task was running before this one
            current = { taskType: taskType, hits: 0, misses: 0, latencies: [], lastPrompt: performance.now() };
        } catch (e) { current = null; }
    }
    function prompted() { try { if (current) current.lastPrompt = performance.now(); } catch (e) {} }
    function hit() {
        try {
            if (!current) return;
            current.hits++;
            current.latencies.push(performance.now() - current.lastPrompt);
        } catch (e) {}
    }
    function miss() {
        try {
            if (!current) return;
            current.misses++;
            current.latencies.push(performance.now() - current.lastPrompt);
        } catch (e) {}
    }
    function commit() {
        try {
            if (!current) return;
            const total = current.hits + current.misses;
            let score, accuracyPct = null, speedPct = null;
            if (total === 0) {
                score = 60; // played but nothing scorable captured (e.g. time ran out) - neutral, never punishing
            } else {
                const accuracy = current.hits / total;
                const avgLatency = current.latencies.length
                    ? current.latencies.reduce((a, b) => a + b, 0) / current.latencies.length
                    : 1500;
                const latencyBonus = Math.max(0, Math.min(1, (2500 - avgLatency) / (2500 - 300))); // 300ms fast .. 2500ms slow
                accuracyPct = Math.round(accuracy * 100);
                speedPct = Math.round(latencyBonus * 100);
                score = Math.max(10, Math.min(100, Math.round(accuracy * 70 + latencyBonus * 30)));
            }
            detail[current.taskType] = {
                score: score, accuracyPct: accuracyPct, speedPct: speedPct,
                hits: current.hits, misses: current.misses
            };
            current = null;
        } catch (e) {}
    }
    function finalize() {
        try {
            commit();
            const scores = {};
            for (const k in detail) scores[k] = detail[k].score;
            return { scores: scores, detail: JSON.parse(JSON.stringify(detail)) };
        } catch (e) { return { scores: {}, detail: {} }; }
    }
    function reset() { try { current = null; for (const k in detail) delete detail[k]; } catch (e) {} }

    // For assessment persistence (see saveAssessmentSnapshot): snapshot the finalized
    // per-game results so far, and restore them after a refresh mid-assessment.
    // Deliberately does NOT call commit(): this is invoked right after begin() for a
    // brand-new task (see saveAssessmentSnapshot), so `current` must stay untouched
    // for that task's hit()/miss() calls to keep working. `detail` already reflects
    // everything finalized before this task started - that's all a snapshot needs.
    function serialize() { try { return JSON.parse(JSON.stringify(detail)); } catch (e) { return {}; } }
    function hydrate(savedDetail) {
        try {
            for (const k in detail) delete detail[k];
            for (const k in (savedDetail || {})) detail[k] = savedDetail[k];
        } catch (e) {}
    }

    return { begin: begin, prompted: prompted, hit: hit, miss: miss, commit: commit, finalize: finalize, reset: reset, serialize: serialize, hydrate: hydrate };
})();

// --- ASSESSMENT PERSISTENCE ---
// A refresh mid-assessment used to lose everything (in-memory state only). Snapshot
// enough to fully resume at the current task, with the timer and all previously
// scored games intact, using sessionStorage (scoped to this browser session - it
// won't resurrect a stale assessment days later, since the tab/window closing clears it).
const ASSESSMENT_SNAPSHOT_KEY = 'assessmentInProgress';
const ASSESSMENT_SNAPSHOT_MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours

function saveAssessmentSnapshot(currentTaskType) {
    try {
        if (window.isSingleGame) return; // only the real 13-game assessment needs this, not solo practice
        sessionStorage.setItem(ASSESSMENT_SNAPSHOT_KEY, JSON.stringify({
            v: 1,
            savedAt: Date.now(),
            // The current task was interrupted, not completed - put it back at the
            // front of the queue to resume so it's re-played (not skipped) on return.
            remainingQueue: [currentTaskType].concat(window.gauntletTasksQueue),
            currentPhase: currentPhase,
            gauntletTimeLeft: gauntletTimeLeft,
            savedRecallItems: window.savedRecallItems || [],
            scoreDetail: GauntletScore.serialize()
        }));
    } catch (e) {}
}

function getAssessmentSnapshot() {
    try {
        const raw = sessionStorage.getItem(ASSESSMENT_SNAPSHOT_KEY);
        if (!raw) return null;
        const snap = JSON.parse(raw);
        if (!snap || snap.v !== 1 || !Array.isArray(snap.remainingQueue) || !snap.remainingQueue.length) return null;
        if (!snap.savedAt || (Date.now() - snap.savedAt) > ASSESSMENT_SNAPSHOT_MAX_AGE_MS) return null;
        return snap;
    } catch (e) { return null; }
}

function clearAssessmentSnapshot() {
    try { sessionStorage.removeItem(ASSESSMENT_SNAPSHOT_KEY); } catch (e) {}
}

// Elderly-friendly "welcome back" prompt shown instead of silently restarting or
// silently resuming - the user explicitly chooses to continue or start over.
function showResumeAssessmentPrompt(snap) {
    try {
        const remaining = snap.remainingQueue.length;
        const wrap = document.createElement('div');
        wrap.id = 'resume-assessment-modal';
        wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9990;display:flex;align-items:center;justify-content:center;padding:20px;';
        wrap.innerHTML =
            '<div style="background:white;border-radius:20px;padding:28px 24px;max-width:380px;width:100%;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.25);">' +
                '<div style="font-size:44px;margin-bottom:10px;">&#x1F553;</div>' +
                '<h2 style="color:#00796B;font-size:20px;margin:0 0 10px;">Welcome back!</h2>' +
                '<p style="color:#37474F;font-size:16px;line-height:1.5;margin:0 0 22px;">You have an unfinished wellness check-in with ' + remaining + ' ' + (remaining === 1 ? 'activity' : 'activities') + ' left. Would you like to continue where you left off?</p>' +
                '<button id="resume-continue-btn" style="width:100%;min-height:55px;font-size:18px;font-weight:700;background:#00796B;color:white;border:none;border-radius:14px;margin-bottom:12px;cursor:pointer;">Continue</button>' +
                '<button id="resume-fresh-btn" style="width:100%;min-height:55px;font-size:16px;font-weight:600;background:#F4F7F6;color:#37474F;border:1px solid #ddd;border-radius:14px;cursor:pointer;">Start Fresh Instead</button>' +
            '</div>';
        document.body.appendChild(wrap);
        document.getElementById('resume-continue-btn').onclick = function () {
            wrap.remove();
            startAssessment(snap);
        };
        document.getElementById('resume-fresh-btn').onclick = function () {
            wrap.remove();
            clearAssessmentSnapshot();
            showScreen('welcome-screen');
        };
    } catch (e) { showScreen('welcome-screen'); }
}

// --- AI COGNITIVE BASELINE MATCHER ---
// Normative reference range for this age group, on the same 0-100 scale as gameScores.
// Internal engineering constant only - never rendered to the user as-is (see DOMAIN_LABEL).
const AI_CLINICAL_BASELINE = {
    memory: 78,       // Working memory & recall baseline (%)
    attention: 75,    // Selective attention & visual search (%)
    executive: 74,    // Logic, rule switching, and sequencing (%)
    visuospatial: 72, // Pattern & facial recognition (%)
    speed: 70         // Motor response latency index (%)
};

const AI_DOMAIN_LABEL = {
    memory: 'Memory & Recall',
    attention: 'Attention & Focus',
    executive: 'Reasoning & Planning',
    visuospatial: 'Visual Recognition',
    speed: 'Response Speed'
};

// Which gauntlet game ids feed each domain (mirrors the aggregation in
// runAICognitiveProfiler) - used by renderGamesList to pin/badge the right games.
const AI_DOMAIN_GAMES = {
    memory: [0, 1, 7, 10, 11],
    attention: [2, 3, 8],
    executive: [5, 6, 9, 12],
    visuospatial: [4],
    speed: [2, 3, 8]
};

function aiDomainAverage(values) {
    const v = values.filter(function (n) { return n !== null && n !== undefined && !isNaN(n); });
    return v.length ? v.reduce(function (a, b) { return a + b; }, 0) / v.length : null;
}

// Aggregates the 13 game scores into 5 domain vectors, matches them against
// AI_CLINICAL_BASELINE, and computes the gap vector (User - Baseline).
// Wellness-worded (Rule 1 applies to caregivers too - "primaryDeficit" is an
// internal variable name only; the rendered summary never says "deficit").
function runAICognitiveProfiler() {
    try {
        let gameScores = {}, detail = {}, familyStats = null;
        try { gameScores = JSON.parse(localStorage.getItem('gameScores')) || {}; } catch (e) {}
        try { detail = JSON.parse(localStorage.getItem('gameScoreDetail')) || {}; } catch (e) {}
        try { familyStats = JSON.parse(localStorage.getItem('familyQuizStats')); } catch (e) {}

        // Domain mapping: Memory[0,1,7,10,11] | Executive[5,6,9,12] |
        // Attention & Speed[2,3,8] (accuracy component -> attention, latency component -> speed) |
        // Visuospatial & Recognition[Game 4 + Family Face Quiz]
        const memory = aiDomainAverage([0, 1, 7, 10, 11].map(function (id) { return gameScores[id]; }));
        const executive = aiDomainAverage([5, 6, 9, 12].map(function (id) { return gameScores[id]; }));
        const attention = aiDomainAverage([2, 3, 8].map(function (id) { return detail[id] ? detail[id].accuracyPct : null; }));
        const speed = aiDomainAverage([2, 3, 8].map(function (id) { return detail[id] ? detail[id].speedPct : null; }));
        const familyAccuracy = (familyStats && familyStats.count > 0) ? (familyStats.score / familyStats.count) * 100 : null;
        const visuospatial = aiDomainAverage([gameScores[4], familyAccuracy]);

        const raw = { memory: memory, attention: attention, executive: executive, visuospatial: visuospatial, speed: speed };
        const user = {}, gap = {};
        for (const k in AI_CLINICAL_BASELINE) {
            // No data yet for a domain -> assume on-par with baseline (gap 0) rather than
            // flagging a growth area we have no evidence for.
            user[k] = (raw[k] !== null && raw[k] !== undefined) ? Math.round(raw[k]) : AI_CLINICAL_BASELINE[k];
            gap[k] = Math.round((user[k] - AI_CLINICAL_BASELINE[k]) * 10) / 10;
        }

        const measuredDomains = Object.keys(raw).filter(function (k) { return raw[k] !== null && raw[k] !== undefined; });
        let primaryDeficit = null, strengthDomain = null;
        if (measuredDomains.length) {
            primaryDeficit = measuredDomains.reduce(function (a, b) { return gap[a] <= gap[b] ? a : b; });
            strengthDomain = measuredDomains.reduce(function (a, b) { return gap[a] >= gap[b] ? a : b; });
        }

        const summary = measuredDomains.length
            ? buildAiCaregiverSummary(primaryDeficit, strengthDomain, gap)
            : "Complete a wellness assessment or play a few games to unlock personalized AI insights. Results will appear here once there's enough activity to compare. In the meantime, all 13 activities are ready whenever you are.";

        const profile = {
            user: user, baseline: AI_CLINICAL_BASELINE, gap: gap,
            primaryDeficit: primaryDeficit, strengthDomain: strengthDomain,
            primaryDeficitLabel: primaryDeficit ? AI_DOMAIN_LABEL[primaryDeficit] : null,
            strengthDomainLabel: strengthDomain ? AI_DOMAIN_LABEL[strengthDomain] : null,
            summary: summary, generatedAt: Date.now()
        };
        localStorage.setItem('neosaarthi_ai_profile', JSON.stringify(profile));
        return profile;
    } catch (e) { return null; }
}

// Automated 3-sentence caregiver-facing narrative. Deliberately avoids clinical/
// diagnostic wording (Rule 1) in favor of the app's wellness vocabulary.
function buildAiCaregiverSummary(deficitKey, strengthKey, gap) {
    try {
        const d = AI_DOMAIN_LABEL[deficitKey], s = AI_DOMAIN_LABEL[strengthKey];
        const dGap = Math.abs(gap[deficitKey]).toFixed(0);
        const sGap = Math.abs(gap[strengthKey]).toFixed(0);
        const s1 = "This week's activity shows steady engagement across the wellness games.";
        const s2 = (deficitKey === strengthKey)
            ? (d + " is the most consistent area right now, tracking close to the typical range for this age group.")
            : (s + " is tracking " + sGap + " points above the typical range, while " + d + " is " + dGap + " points below it and would benefit from a little extra practice.");
        const s3 = "We've prioritized " + d + "-focused activities in the Games menu to help build that skill through gentle, regular practice.";
        return s1 + ' ' + s2 + ' ' + s3;
    } catch (e) { return 'AI insights are being calibrated based on recent activity.'; }
}

// --- DYNAMIC UI: Home Screen "AI Personalized Care Track" banner ---
// Targets the #ai-care-track-banner / #ai-plan-title / #ai-plan-desc / #ai-plan-date
// markup in index.html. Hidden until we actually have a profile to show.
function renderAiCareTrackBanner() {
    try {
        const banner = document.getElementById('ai-care-track-banner');
        if (!banner) return;
        let profile = null;
        try { profile = JSON.parse(localStorage.getItem('neosaarthi_ai_profile')); } catch (e) {}
        if (!profile || !profile.primaryDeficitLabel) { banner.style.display = 'none'; return; }

        banner.style.display = 'block';
        const titleEl = document.getElementById('ai-plan-title');
        const dateEl = document.getElementById('ai-plan-date');
        if (titleEl) titleEl.innerText = 'AI Focus Track: ' + profile.primaryDeficitLabel;
        if (dateEl) {
            try { dateEl.innerText = new Date(profile.generatedAt).toLocaleDateString(); } catch (e) {}
        }
    } catch (e) {}
}

// --- DYNAMIC UI: Progress Screen "AI Focus Comparison" card ---
// Targets #ai-clinical-comparison-card / #ai-baseline-bars-container / #ai-summary-text.
function renderAiComparisonCard() {
    try {
        const barsContainer = document.getElementById('ai-baseline-bars-container');
        const summaryEl = document.getElementById('ai-summary-text');
        if (!barsContainer) return;

        let profile = null;
        try { profile = JSON.parse(localStorage.getItem('neosaarthi_ai_profile')); } catch (e) {}
        if (!profile && typeof runAICognitiveProfiler === 'function') profile = runAICognitiveProfiler();
        if (!profile) return;

        barsContainer.innerHTML = '';
        for (const key in AI_DOMAIN_LABEL) {
            const userVal = profile.user[key];
            const baseVal = profile.baseline[key];
            const isFocus = key === profile.primaryDeficit;
            const row = document.createElement('div');
            row.style.marginBottom = '6px';
            row.innerHTML =
                '<div style="display:flex;justify-content:space-between;font-size:12.5px;color:#37474F;font-weight:600;margin-bottom:3px;">' +
                    '<span>' + AI_DOMAIN_LABEL[key] + (isFocus ? ' &#x1F3AF;' : '') + '</span>' +
                    '<span style="color:#00796B;">' + userVal + '% <span style="color:#999;font-weight:400;">/ ' + baseVal + '% typical</span></span>' +
                '</div>' +
                '<div style="position:relative;height:10px;background:#EEF3F2;border-radius:6px;">' +
                    '<div style="height:100%;width:' + Math.max(2, Math.min(100, userVal)) + '%;background:' + (isFocus ? '#FF8A65' : '#00796B') + ';border-radius:6px;"></div>' +
                    '<div style="position:absolute;top:-3px;left:' + Math.max(0, Math.min(100, baseVal)) + '%;width:2px;height:16px;background:#37474F;"></div>' +
                '</div>';
            barsContainer.appendChild(row);
        }
        if (summaryEl) summaryEl.innerText = profile.summary;
    } catch (e) {}
}

// --- SAARTHI VOICE AI COMPANION ---
// Floating mic button already lives in index.html (#saarthi-ai-mic-btn). Everything
// else - the modal, the recognition/synthesis engine, and the intent router - is
// built here and is fully crash-proof: unsupported browsers and denied mic
// permission both degrade gracefully to the quick-tap prompt chips.
let saarthiRecognition = null;
let saarthiWrapEl = null;
let saarthiModalBuiltForLang = null;

// --- SAARTHI MULTILINGUAL LAYER ---
// Every reply, intent pattern, chip label, and voice/recognition choice is looked up
// through getSaarthiLang() (keyed on the app's existing currentLang, same selector
// used everywhere else). English, Hindi, and Bengali are fully translated (the three
// priority languages). Assamese, Manipuri, Khasi, Mizo, Nagamese, and Nepali aren't
// defined here yet - getSaarthiLang() falls back to English content for those, so
// Saarthi still works correctly (just not in-language) until native translations are
// added for them in a later pass.
const SAARTHI_I18N = {
    en: {
        voiceLangs: ['en-IN', 'en-GB', 'en-US'],
        recognitionLang: 'en-IN',
        yesWords: /\b(yes|yeah|yep|sure|okay|ok)\b/,
        noWords: /\b(no|nope|nah)\b/,
        domainLabels: { memory: 'Memory & Recall', attention: 'Attention & Focus', executive: 'Reasoning & Planning', visuospatial: 'Visual Recognition', speed: 'Response Speed' },
        labels: { familyAlbum: 'Family Album', relaxingMusic: 'Relaxing Music', justChat: 'Just chat', and: 'and' },
        t: {
            scoreKnown: function (overall, strength, deficit) { return 'Your overall wellness score is ' + overall + ' percent. ' + strength + ' is your strongest area, and ' + deficit + ' could use a little more practice.'; },
            scoreUnknown: function () { return "You haven't finished an assessment yet, but you're welcome to play any game whenever you like."; },
            takeThere: function () { return ' Would you like me to take you there now?'; },
            routineRemaining: function (n) { return 'You have ' + n + ' ' + (n === 1 ? 'activity' : 'activities') + " left in today's routine."; },
            routineDone: function () { return "You've completed today's whole routine — wonderful work!"; },
            family: function (names) { return 'Your family album has photos of your loved ones including ' + names + '. Would you like to practice your face recognition game?'; },
            lonely: function () { return 'I am right here with you! Would you like to practice identifying your family in the photo album, or shall we listen to some relaxing bamboo flute music together?'; },
            lonelyChatAck: function () { return "I'm here for you anytime you want to talk."; },
            relax: function () { return 'Take a slow, deep breath with me. Everything is peaceful. Would you like me to start your evening calming soundscape and breathing guide?'; },
            emergency: function () { return 'If you are feeling unwell or need immediate help, I can open your emergency SOS Alert right away. Would you like me to open SOS?'; },
            about: function () { return 'NeoSaarthi is your daily cognitive wellness companion. It exercises your memory through gentle brain games, keeps you hydrated, and helps you stay connected with your loved ones.'; },
            cognitive: function () { return "Daily active recall, regular gentle walking, and staying mentally engaged stimulate your brain's neuroplasticity. We focus on exercising your memory, not replacing it."; },
            wellness: function () { return 'Drinking water prevents sudden fatigue and keeps your brain alert, while a ten-minute walk boosts oxygen and blood flow to your memory centers.'; },
            identity: function () { return 'I am Saarthi, your personal cognitive wellness companion, built by Team NeoSaarthi to support your daily memory, health, and happiness.'; },
            thanks: function () { return 'You are most welcome! Always happy to be by your side.'; },
            howAreYou: function () { return "I am doing great, thank you for asking! I'm here and ready to help you with your daily routine or games."; },
            greeting: function (tg) { return 'Namaste! ' + tg + '. It is wonderful to talk with you today. How are you feeling?'; },
            timeGreet: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' },
            stayHere: function () { return 'Okay, staying right here.'; },
            offtopic: function () { return 'I am sorry, but I am specifically designed to assist you with your cognitive exercises, daily wellness, and family memories. Is there something about your routine or games I can help you with today?'; },
            unknownFallback: function () { return "I can help with your wellness score, today's routine, your family album, or a calming moment. You can also ask me what NeoSaarthi is, or how to improve your memory. Try tapping one of the prompts below, or ask me again."; },
            chips: { about: 'What is NeoSaarthi?', score: 'How was my test result?', routine: 'What should I do right now?', family: 'Open family album', relax: 'Help me relax' },
            listening: 'Listening... Speak to Saarthi in English or Hindi',
            notAvailable: "Voice input isn't available on this browser — try a quick-tap prompt below.",
            didntCatch: "Didn't catch that — try a quick-tap prompt below.",
            close: 'Close', send: 'Send', typePlaceholder: 'Or type your message here...'
        },
        intents: {
            score: /my score|my (test )?result|test result|wellness score|how (was|did) i (do|perform)|how am i doing|my progress|my performance/,
            routine: /routine|\btask\b|today'?s (schedule|plan)|what should i do|remind/,
            family: /family|photo|album|picture|remember my|who is in my/,
            lonely: /\blonely\b|\bbored\b|\bboring\b|nothing to do|feel(ing)? alone/,
            relax: /anxious|restless|help me sleep|can'?t sleep|i'?m tired|feel (tired|anxious|restless|stressed)|relax|\bcalm\b|breath(e|ing)|sound(scape)?|\bmusic\b/,
            emergency: /\bemergency\b|call someone|call for help|need help (now|immediately)|send help|i need help\b/,
            about: /what is (neosaarthi|this app)|what does this app do|how does this (app )?help|about (this app|neosaarthi)/,
            cognitive: /improve my memory|why (should i |do i need to )?play (games|the games)|cognitive scaffolding|brain (exercise|training)|neuroplasticity/,
            wellness: /why (is )?water|why do i need to walk|why (should i )?walk|hydration|drink(ing)? water/,
            who: /who are you|who (made|built|created) you|what('?s| is) your name/,
            thanks: /thank(s| you)|shukriya/,
            how: /how are you|how'?s your day/,
            greet: /^(hi|hello|hey|namaste)\b|good (morning|afternoon|evening)/
        }
    },
    hi: {
        voiceLangs: ['hi-IN'],
        recognitionLang: 'hi-IN',
        yesWords: /\b(हाँ|हां|जी हाँ|ठीक है)\b/,
        noWords: /\b(नहीं|ना)\b/,
        domainLabels: { memory: 'स्मृति और याद', attention: 'ध्यान और एकाग्रता', executive: 'तर्क और योजना', visuospatial: 'दृश्य पहचान', speed: 'प्रतिक्रिया गति' },
        labels: { familyAlbum: 'फैमिली एल्बम', relaxingMusic: 'शांत संगीत', justChat: 'बस बात करें', and: 'और' },
        t: {
            scoreKnown: function (overall, strength, deficit) { return 'आपका कुल वेलनेस स्कोर ' + overall + ' प्रतिशत है। ' + strength + ' आपका सबसे मजबूत क्षेत्र है, और ' + deficit + ' में थोड़ा और अभ्यास करना अच्छा रहेगा।'; },
            scoreUnknown: function () { return 'आपने अभी तक मूल्यांकन पूरा नहीं किया है, लेकिन आप जब चाहें कोई भी खेल खेल सकते हैं।'; },
            takeThere: function () { return ' क्या आप चाहेंगे कि मैं आपको अभी वहाँ ले चलूँ?'; },
            routineRemaining: function (n) { return 'आज की दिनचर्या में आपकी ' + n + ' ' + (n === 1 ? 'गतिविधि बाकी है' : 'गतिविधियाँ बाकी हैं') + '।'; },
            routineDone: function () { return 'आपने आज की पूरी दिनचर्या पूरी कर ली है — बहुत बढ़िया काम!'; },
            family: function (names) { return 'आपके पारिवारिक एल्बम में आपके प्रियजनों की तस्वीरें हैं, जिनमें ' + names + ' शामिल हैं। क्या आप अपना चेहरा पहचानने वाला खेल खेलना चाहेंगे?'; },
            lonely: function () { return 'मैं यहाँ आपके साथ हूँ! क्या आप फोटो एल्बम में अपने परिवार को पहचानने का अभ्यास करना चाहेंगे, या क्या हम साथ में शांत बांसुरी संगीत सुनें?'; },
            lonelyChatAck: function () { return 'मैं हमेशा आपसे बात करने के लिए यहाँ हूँ।'; },
            relax: function () { return 'मेरे साथ धीरे से गहरी सांस लें। सब कुछ शांत है। क्या आप चाहेंगे कि मैं आपका शाम का शांत संगीत और श्वास मार्गदर्शन शुरू करूँ?'; },
            emergency: function () { return 'अगर आपकी तबीयत ठीक नहीं है या आपको तुरंत मदद चाहिए, तो मैं अभी आपका आपातकालीन SOS अलर्ट खोल सकता हूँ। क्या आप चाहेंगे कि मैं SOS खोलूँ?'; },
            about: function () { return 'नियोसारथी आपका दैनिक संज्ञानात्मक वेलनेस साथी है। यह सौम्य दिमागी खेलों के जरिए आपकी याददाश्त को सक्रिय रखता है, आपको हाइड्रेटेड रखता है, और आपको अपने प्रियजनों से जोड़े रखता है।'; },
            cognitive: function () { return 'रोज सक्रिय याद करना, नियमित हल्की सैर, और दिमागी रूप से सक्रिय रहना आपके मस्तिष्क की न्यूरोप्लास्टिसिटी को बढ़ावा देता है। हम आपकी याददाश्त बदलने के बजाय उसे मजबूत बनाने पर ध्यान देते हैं।'; },
            wellness: function () { return 'पानी पीने से अचानक थकान नहीं होती और आपका दिमाग सतर्क रहता है, जबकि दस मिनट की सैर आपके याददाश्त केंद्रों तक ऑक्सीजन और रक्त प्रवाह बढ़ाती है।'; },
            identity: function () { return 'मैं सारथी हूँ, आपका व्यक्तिगत संज्ञानात्मक वेलनेस साथी, जिसे टीम नियोसारथी ने आपकी रोजाना याददाश्त, सेहत और खुशी के लिए बनाया है।'; },
            thanks: function () { return 'आपका बहुत-बहुत स्वागत है! आपके साथ रहना हमेशा मेरी खुशी है।'; },
            howAreYou: function () { return 'मैं बहुत अच्छा महसूस कर रहा हूँ, पूछने के लिए धन्यवाद! मैं यहाँ आपकी दिनचर्या या खेलों में मदद के लिए तैयार हूँ।'; },
            greeting: function (tg) { return 'नमस्ते! ' + tg + '। आज आपसे बात करके बहुत अच्छा लगा। आप कैसा महसूस कर रहे हैं?'; },
            timeGreet: { morning: 'सुप्रभात', afternoon: 'नमस्कार', evening: 'शुभ संध्या' },
            stayHere: function () { return 'ठीक है, मैं यहीं रुकता हूँ।'; },
            offtopic: function () { return 'माफ कीजिए, मैं खासतौर पर आपके दिमागी अभ्यास, दैनिक वेलनेस और पारिवारिक यादों में मदद के लिए बना हूँ। क्या आपकी दिनचर्या या खेलों से जुड़ी कोई बात है जिसमें मैं मदद कर सकता हूँ?'; },
            unknownFallback: function () { return 'मैं आपके वेलनेस स्कोर, आज की दिनचर्या, आपके पारिवारिक एल्बम, या शांत पल में मदद कर सकता हूँ। आप मुझसे यह भी पूछ सकते हैं कि नियोसारथी क्या है, या याददाश्त कैसे सुधारें। नीचे दिए गए किसी सुझाव पर टैप करें, या मुझसे फिर से पूछें।'; },
            chips: { about: 'नियोसारथी क्या है?', score: 'मेरा टेस्ट परिणाम कैसा रहा?', routine: 'मुझे अभी क्या करना चाहिए?', family: 'पारिवारिक एल्बम खोलें', relax: 'मुझे आराम करने में मदद करें' },
            listening: 'सुन रहा हूँ... अंग्रेज़ी या हिंदी में सारथी से बात करें',
            notAvailable: 'इस ब्राउज़र पर आवाज़ इनपुट उपलब्ध नहीं है — नीचे दिए गए सुझाव पर टैप करें।',
            didntCatch: 'समझ नहीं आया — नीचे दिए गए सुझाव पर टैप करें।',
            close: 'बंद करें', send: 'भेजें', typePlaceholder: 'या यहाँ अपना संदेश लिखें...'
        },
        intents: {
            score: /मेरा स्कोर|मेरा परिणाम|मेरा टेस्ट|मैंने कैसा किया|मेरी प्रगति|मेरा प्रदर्शन/,
            routine: /दिनचर्या|रूटीन|टास्क|क्या करूं|याद दिला/,
            family: /परिवार|फोटो|एलबम|तस्वीर/,
            lonely: /अकेला|अकेली|बोर\b|बोरियत|कुछ काम नहीं/,
            relax: /चिंता|बेचैन|नींद नहीं|थका|थकी|आराम|शांत|सांस|संगीत/,
            emergency: /आपातकाल|मदद चाहिए|किसी को बुलाओ|तुरंत मदद/,
            about: /नियोसारथी क्या है|यह ऐप क्या है|यह कैसे मदद करता है/,
            cognitive: /याददाश्त कैसे बढ़ाऊं|खेल क्यों खेलूं|दिमागी कसरत/,
            wellness: /पानी क्यों जरूरी|टहलना क्यों जरूरी|चलना क्यों जरूरी/,
            who: /तुम कौन हो|आप कौन हैं|आपको किसने बनाया/,
            thanks: /धन्यवाद|शुक्रिया/,
            how: /आप कैसे हैं|कैसी हो|कैसे हो/,
            greet: /^नमस्ते|^नमस्कार|^हैलो|सुप्रभात|शुभ प्रभात|शुभ संध्या/
        }
    },
    bn: {
        voiceLangs: ['bn-IN', 'bn-BD', 'bn'],
        recognitionLang: 'bn-IN',
        yesWords: /\b(হ্যাঁ|জি|ঠিক আছে)\b/,
        noWords: /\b(না)\b/,
        domainLabels: { memory: 'স্মৃতি ও মনে রাখা', attention: 'মনোযোগ ও ফোকাস', executive: 'যুক্তি ও পরিকল্পনা', visuospatial: 'ভিজ্যুয়াল রিকগনিশন', speed: 'প্রতিক্রিয়া গতি' },
        labels: { familyAlbum: 'ফ্যামিলি অ্যালবাম', relaxingMusic: 'শান্ত সুর', justChat: 'শুধু কথা বলি', and: 'এবং' },
        t: {
            scoreKnown: function (overall, strength, deficit) { return 'আপনার সামগ্রিক ওয়েলনেস স্কোর ' + overall + ' শতাংশ। ' + strength + ' আপনার সবচেয়ে শক্তিশালী ক্ষেত্র, এবং ' + deficit + '-এ আরেকটু অনুশীলন করলে ভালো হবে।'; },
            scoreUnknown: function () { return 'আপনি এখনও মূল্যায়ন শেষ করেননি, তবে আপনি যখন খুশি যেকোনো খেলা খেলতে পারেন।'; },
            takeThere: function () { return ' আপনি কি চান আমি এখনই আপনাকে সেখানে নিয়ে যাই?'; },
            routineRemaining: function (n) { return 'আজকের রুটিনে আপনার আর ' + n + 'টি কাজ বাকি আছে।'; },
            routineDone: function () { return 'আপনি আজকের পুরো রুটিন সম্পন্ন করেছেন — দারুণ কাজ!'; },
            family: function (names) { return 'আপনার পারিবারিক অ্যালবামে আপনার প্রিয়জনদের ছবি আছে, যার মধ্যে ' + names + ' রয়েছেন। আপনি কি মুখ চেনার খেলাটি অনুশীলন করতে চান?'; },
            lonely: function () { return 'আমি এখানে আপনার সাথেই আছি! আপনি কি ছবির অ্যালবামে আপনার পরিবারকে চেনার অনুশীলন করতে চান, নাকি আমরা একসাথে শান্ত বাঁশির সুর শুনি?'; },
            lonelyChatAck: function () { return 'আমি সবসময় আপনার সাথে কথা বলার জন্য এখানে আছি।'; },
            relax: function () { return 'আমার সাথে ধীরে গভীর শ্বাস নিন। সবকিছু শান্ত। আপনি কি চান আমি আপনার সন্ধ্যার শান্ত সুর ও শ্বাস-প্রশ্বাসের নির্দেশনা শুরু করি?'; },
            emergency: function () { return 'আপনি যদি অসুস্থ বোধ করেন বা তাৎক্ষণিক সাহায্য দরকার হয়, আমি এখনই আপনার জরুরি SOS অ্যালার্ট খুলতে পারি। আপনি কি চান আমি SOS খুলি?'; },
            about: function () { return 'নিওসারথী আপনার প্রতিদিনের কগনিটিভ ওয়েলনেস সঙ্গী। এটি মৃদু মস্তিষ্কের খেলার মাধ্যমে আপনার স্মৃতিশক্তিকে সক্রিয় রাখে, আপনাকে জলযোজিত রাখে, এবং আপনার প্রিয়জনদের সাথে সংযুক্ত রাখে।'; },
            cognitive: function () { return 'প্রতিদিন সক্রিয়ভাবে মনে করা, নিয়মিত হালকা হাঁটা, এবং মানসিকভাবে সক্রিয় থাকা আপনার মস্তিষ্কের নিউরোপ্লাস্টিসিটিকে উদ্দীপিত করে। আমরা আপনার স্মৃতিশক্তি প্রতিস্থাপন নয়, বরং তা অনুশীলন করানোর উপর গুরুত্ব দিই।'; },
            wellness: function () { return 'জল পান করলে হঠাৎ ক্লান্তি আসে না এবং মস্তিষ্ক সজাগ থাকে, আর দশ মিনিট হাঁটলে আপনার স্মৃতি কেন্দ্রে অক্সিজেন ও রক্ত সঞ্চালন বাড়ে।'; },
            identity: function () { return 'আমি সারথী, আপনার ব্যক্তিগত কগনিটিভ ওয়েলনেস সঙ্গী, যাকে টিম নিওসারথী তৈরি করেছে আপনার প্রতিদিনের স্মৃতি, স্বাস্থ্য এবং সুখের জন্য।'; },
            thanks: function () { return 'আপনাকে স্বাগতম! আপনার পাশে থাকতে পারা সবসময় আমার আনন্দের বিষয়।'; },
            howAreYou: function () { return 'আমি খুব ভালো আছি, জিজ্ঞাসা করার জন্য ধন্যবাদ! আমি আপনার রুটিন বা খেলায় সাহায্য করতে প্রস্তুত।'; },
            greeting: function (tg) { return 'নমস্কার! ' + tg + '। আজ আপনার সাথে কথা বলতে পেরে খুব ভালো লাগছে। আপনি কেমন অনুভব করছেন?'; },
            timeGreet: { morning: 'শুভ সকাল', afternoon: 'শুভ অপরাহ্ন', evening: 'শুভ সন্ধ্যা' },
            stayHere: function () { return 'ঠিক আছে, আমি এখানেই থাকছি।'; },
            offtopic: function () { return 'দুঃখিত, আমি বিশেষভাবে আপনার কগনিটিভ ব্যায়াম, দৈনিক সুস্থতা এবং পারিবারিক স্মৃতিতে সাহায্য করার জন্য তৈরি। আপনার রুটিন বা খেলা নিয়ে কি কিছু আছে যাতে আমি সাহায্য করতে পারি?'; },
            unknownFallback: function () { return 'আমি আপনার ওয়েলনেস স্কোর, আজকের রুটিন, পারিবারিক অ্যালবাম, অথবা শান্ত একটি মুহূর্তে সাহায্য করতে পারি। আপনি আমাকে জিজ্ঞাসা করতে পারেন নিওসারথী কী, অথবা স্মৃতিশক্তি কীভাবে বাড়ানো যায়। নিচের যেকোনো একটি অপশনে ট্যাপ করুন, অথবা আবার জিজ্ঞাসা করুন।'; },
            chips: { about: 'নিওসারথী কী?', score: 'আমার টেস্টের ফলাফল কেমন হয়েছে?', routine: 'আমার এখন কী করা উচিত?', family: 'পারিবারিক অ্যালবাম খুলুন', relax: 'আমাকে আরাম করতে সাহায্য করুন' },
            listening: 'শুনছি... ইংরেজি বা বাংলায় সারথীর সাথে কথা বলুন',
            notAvailable: 'এই ব্রাউজারে ভয়েস ইনপুট উপলব্ধ নেই — নিচের অপশনে ট্যাপ করুন।',
            didntCatch: 'বুঝতে পারিনি — নিচের অপশনে ট্যাপ করুন।',
            close: 'বন্ধ করুন', send: 'পাঠান', typePlaceholder: 'অথবা এখানে আপনার বার্তা লিখুন...'
        },
        intents: {
            score: /আমার স্কোর|আমার ফলাফল|আমার টেস্ট|আমি কেমন করলাম|আমার অগ্রগতি/,
            routine: /রুটিন|কী করব|মনে করিয়ে/,
            family: /পরিবার|ছবি|অ্যালবাম/,
            lonely: /একা\b|একাকী|বিরক্ত|করার কিছু নেই/,
            relax: /উদ্বিগ্ন|অস্থির|ঘুম আসছে না|ক্লান্ত|আরাম|শান্ত|শ্বাস|গান/,
            emergency: /জরুরি|সাহায্য দরকার|কাউকে ডাকো/,
            about: /নিওসারথী কী|এই অ্যাপ কী|এটা কীভাবে সাহায্য করে/,
            cognitive: /স্মৃতিশক্তি কীভাবে বাড়াবো|কেন গেম খেলব|মস্তিষ্কের ব্যায়াম/,
            wellness: /পানি কেন জরুরি|জল কেন জরুরি|হাঁটা কেন জরুরি/,
            who: /তুমি কে|আপনি কে|তোমাকে কে বানিয়েছে/,
            thanks: /ধন্যবাদ/,
            how: /কেমন আছো|কেমন আছেন/,
            greet: /^নমস্কার|^হ্যালো|শুভ সকাল|শুভ অপরাহ্ন|শুভ সন্ধ্যা/
        }
    }
};

function getSaarthiLang() {
    return SAARTHI_I18N[currentLang] || SAARTHI_I18N.en;
}

function ensureSaarthiModal() {
    if (saarthiWrapEl && saarthiModalBuiltForLang === currentLang) return;
    try {
        if (saarthiWrapEl && saarthiWrapEl.parentNode) saarthiWrapEl.parentNode.removeChild(saarthiWrapEl);
        const L = getSaarthiLang();
        const T = L.t;
        const wrap = document.createElement('div');
        wrap.innerHTML =
            '<style>' +
                '@keyframes saarthiRingPulse{0%{box-shadow:0 0 0 0 rgba(0,121,107,.5);}70%{box-shadow:0 0 0 22px rgba(0,121,107,0);}100%{box-shadow:0 0 0 0 rgba(0,121,107,0);}}' +
                '@keyframes saarthiMicPulse{0%{box-shadow:0 0 0 0 rgba(0,121,107,.5);}70%{box-shadow:0 0 0 14px rgba(0,121,107,0);}100%{box-shadow:0 0 0 0 rgba(0,121,107,0);}}' +
                '@keyframes saarthiPillIn{from{transform:translate(-50%,16px);opacity:0;}to{transform:translate(-50%,0);opacity:1;}}' +
                '.saarthi-ring{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#00796B,#00BFA5);display:flex;align-items:center;justify-content:center;color:white;margin:0 auto;animation:saarthiRingPulse 1.6s infinite;font-size:34px;}' +
                '.saarthi-chip{min-height:55px;padding:14px 16px;font-size:17px;text-align:left;border-radius:14px;border:1px solid #ddd;background:#F4F7F6;color:#37474F;font-weight:600;cursor:pointer;width:100%;}' +
                '.saarthi-chip:active{background:#E0F2F1;}' +
                '.saarthi-pill-icon{animation:saarthiMicPulse 2s infinite;}' +
                '.saarthi-text-input{flex:1;min-height:48px;padding:0 14px;border-radius:14px;border:1px solid #ddd;font-size:15px;font-family:"Poppins",sans-serif;color:#37474F;}' +
                '.saarthi-send-btn{min-height:48px;padding:0 18px;border-radius:14px;border:none;background:#00796B;color:white;font-weight:700;font-size:15px;cursor:pointer;}' +
            '</style>' +
            '<div id="saarthi-voice-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;align-items:flex-end;justify-content:center;">' +
                '<div style="background:white;width:100%;max-width:420px;border-radius:24px 24px 0 0;padding:26px 22px 30px;text-align:center;max-height:88vh;overflow-y:auto;">' +
                    '<div class="saarthi-ring"><span>&#x1F399;&#xFE0F;</span></div>' +
                    '<p id="saarthi-status-text" style="font-size:17px;font-weight:600;color:#37474F;margin:16px 0 6px;">Listening... Speak to Saarthi in English or Hindi</p>' +
                    '<div id="saarthi-transcript" style="min-height:24px;color:#00796B;font-size:15px;font-style:italic;margin-bottom:14px;"></div>' +
                    '<div style="display:flex;gap:8px;margin-bottom:16px;">' +
                        '<input id="saarthi-text-input" class="saarthi-text-input" type="text" placeholder="Or type your message here...">' +
                        '<button class="saarthi-send-btn" onclick="sendSaarthiTextQuery()">Send</button>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px;">' +
                        '<button class="saarthi-chip" onclick="processSaarthiQuery(\'What is NeoSaarthi?\')">&#x1F4AC; What is NeoSaarthi?</button>' +
                        '<button class="saarthi-chip" onclick="processSaarthiQuery(\'How was my test result?\')">&#x1F4AC; How was my test result?</button>' +
                        '<button class="saarthi-chip" onclick="processSaarthiQuery(\'What should I do right now?\')">&#x1F4AC; What should I do right now?</button>' +
                        '<button class="saarthi-chip" onclick="processSaarthiQuery(\'Open family album\')">&#x1F4AC; Open family album</button>' +
                        '<button class="saarthi-chip" onclick="processSaarthiQuery(\'Help me relax\')">&#x1F4AC; Help me relax</button>' +
                    '</div>' +
                    '<button onclick="closeSaarthiVoiceModal()" style="min-height:52px;width:100%;border-radius:14px;border:none;background:#eee;color:#37474F;font-weight:700;font-size:17px;cursor:pointer;">Close</button>' +
                '</div>' +
            '</div>' +
            '<div id="saarthi-pill" style="display:none;position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:9999;width:min(94vw,380px);background:linear-gradient(135deg,#00796B,#004D40);color:white;border-radius:26px;box-shadow:0 8px 24px rgba(0,0,0,0.3);padding:12px 16px;animation:saarthiPillIn .25s ease-out;">' +
                '<div style="display:flex;align-items:center;gap:10px;cursor:pointer;" onclick="reopenSaarthiFull()">' +
                    '<div class="saarthi-pill-icon" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;">&#x1F399;&#xFE0F;</div>' +
                    '<div style="flex:1;text-align:left;overflow:hidden;">' +
                        '<div id="saarthi-pill-user-line" style="font-size:10.5px;opacity:.8;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></div>' +
                        '<div id="saarthi-pill-reply-line" style="font-size:13.5px;font-weight:600;line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">Listening...</div>' +
                    '</div>' +
                '</div>' +
                '<div id="saarthi-pill-actions" style="display:none;gap:8px;margin-top:10px;flex-wrap:wrap;"></div>' +
            '</div>';
        document.body.appendChild(wrap);

        const textInput = document.getElementById('saarthi-text-input');
        if (textInput) {
            textInput.addEventListener('keydown', function (ev) {
                if (ev.key === 'Enter') { ev.preventDefault(); sendSaarthiTextQuery(); }
            });
        }

        saarthiModalReady = true;
    } catch (e) {}
}

function sendSaarthiTextQuery() {
    try {
        const input = document.getElementById('saarthi-text-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        stopSaarthiListening();
        processSaarthiQuery(text);
    } catch (e) {}
}

// Which .screen id (if any) is currently visible - used to restore the round mic
// button to the right state once an active conversation settles back to idle.
function getVisibleScreenId() {
    try {
        const els = document.querySelectorAll('.screen');
        for (let i = 0; i < els.length; i++) { if (els[i].style.display && els[i].style.display !== 'none') return els[i].id; }
        return null;
    } catch (e) { return null; }
}

// Controls the round idle mic button only. The pill/full-modal are owned by
// SaarthiUI and stay visible across screen changes while a conversation is active -
// that's what makes Saarthi "persistent" rather than tied to showScreen().
function updateSaarthiMicVisibility(screenId) {
    try {
        const btn = document.getElementById('saarthi-ai-mic-btn');
        if (!btn) return;
        if (typeof SaarthiUI !== 'undefined' && SaarthiUI.state !== 'idle') { btn.style.display = 'none'; return; }
        const visibleOn = ['home-screen', 'routine-screen', 'game-menu-screen', 'progress-screen'];
        btn.style.display = visibleOn.indexOf(screenId) !== -1 ? 'block' : 'none';
    } catch (e) {}
}

// --- Saarthi UI state machine: idle (round button) -> full (bottom-sheet dialogue)
// -> pill-speaking (compact, non-blocking, voice plays in background) -> pill-confirm
// (Yes/No for a navigational answer) -> back to idle. Never a blocking full-screen
// modal while Saarthi is just talking - only while actively capturing a question.
const SaarthiUI = {
    state: 'idle', // idle | full | pill-speaking | pill-confirm

    openFull: function () {
        try {
            ensureSaarthiModal();
            this.hidePill();
            const modal = document.getElementById('saarthi-voice-modal');
            if (modal) modal.style.display = 'flex';
            const t = document.getElementById('saarthi-transcript'); if (t) t.innerText = '';
            const st = document.getElementById('saarthi-status-text'); if (st) st.innerText = 'Listening... Speak to Saarthi in English or Hindi';
            const micBtn = document.getElementById('saarthi-ai-mic-btn'); if (micBtn) micBtn.style.display = 'none';
            this.state = 'full';
            startSaarthiListening();
        } catch (e) {}
    },

    closeFull: function () {
        try {
            stopSaarthiListening();
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            const modal = document.getElementById('saarthi-voice-modal');
            if (modal) modal.style.display = 'none';
            this.state = 'idle';
            updateSaarthiMicVisibility(getVisibleScreenId());
        } catch (e) {}
    },

    // Collapses the full dialogue into the compact floating pill the instant we
    // have something to say, so speech plays in the background while the user is
    // free to tap around the app - never a blocking modal for the answer itself.
    // Shows a tiny "You: ..." caption above the reply, like a chat bubble.
    collapseToPill: function (userText, replyText) {
        try {
            ensureSaarthiModal();
            stopSaarthiListening();
            const modal = document.getElementById('saarthi-voice-modal'); if (modal) modal.style.display = 'none';
            const pill = document.getElementById('saarthi-pill');
            const userLine = document.getElementById('saarthi-pill-user-line');
            const replyLine = document.getElementById('saarthi-pill-reply-line');
            const actions = document.getElementById('saarthi-pill-actions');
            if (userLine) userLine.innerText = userText ? ('You: ' + userText) : '';
            if (replyLine) replyLine.innerText = replyText;
            if (actions) { actions.innerHTML = ''; actions.style.display = 'none'; }
            if (pill) pill.style.display = 'block';
            const micBtn = document.getElementById('saarthi-ai-mic-btn'); if (micBtn) micBtn.style.display = 'none';
            this.state = 'pill-speaking';
        } catch (e) {}
    },

    // Updates just the reply line (used for short follow-up acknowledgments,
    // keeping the original "You: ..." question visible above it for context).
    showPillText: function (text) {
        try { const r = document.getElementById('saarthi-pill-reply-line'); if (r) r.innerText = text; } catch (e) {}
    },

    // Called once speech has FULLY finished (utterance.onend). Renders 2-4 compact
    // choice buttons in the pill - the classic Yes/No confirm is just a 2-choice
    // case of this, built by makeYesNoChoices(). `voice` (optional) is {yes, no}
    // for the simple binary case - listenForYesNo() layers spoken confirmation on
    // top of the buttons, which always remain the reliable path.
    showChoices: function (choices, voice) {
        try {
            const actions = document.getElementById('saarthi-pill-actions');
            if (!actions || !choices || !choices.length) return;
            actions.innerHTML = '';
            choices.forEach(function (c) {
                const btn = document.createElement('button');
                btn.innerHTML = c.label;
                btn.style.cssText = 'flex:1 1 45%;min-height:46px;border:none;border-radius:12px;background:' +
                    (c.primary ? '#4CAF50' : 'rgba(255,255,255,0.22)') +
                    ';color:white;font-weight:700;font-size:13px;cursor:pointer;padding:6px 10px;';
                btn.onclick = c.onSelect;
                actions.appendChild(btn);
            });
            actions.style.display = 'flex';
            this.state = 'pill-confirm';
            if (voice && voice.yes && voice.no) listenForYesNo(voice.yes, voice.no);
        } catch (e) {}
    },

    hideActions: function () {
        try { const a = document.getElementById('saarthi-pill-actions'); if (a) { a.style.display = 'none'; a.innerHTML = ''; } } catch (e) {}
    },

    // For informational answers (no choices offered) - let the reply stay
    // readable on the pill for a moment, then fade back to just the round mic button.
    settleIdle: function () {
        try {
            setTimeout(() => {
                this.hidePill();
                this.state = 'idle';
                updateSaarthiMicVisibility(getVisibleScreenId());
            }, 2600);
        } catch (e) {}
    },

    hidePill: function () {
        try { const pill = document.getElementById('saarthi-pill'); if (pill) pill.style.display = 'none'; } catch (e) {}
    }
};

// Standard "Yes, take me there / No, stay here" pair, shared by every navigational
// intent. Buttons own their full lifecycle (hide pill / settle / speak ack) so each
// intent doesn't have to repeat that plumbing.
function makeYesNoChoices(navScreen, onNav) {
    const goYes = function () {
        stopSaarthiListening();
        SaarthiUI.state = 'idle'; // set before showScreen() so its mic-visibility check applies the normal per-screen rule
        SaarthiUI.hidePill();
        showScreen(navScreen);
        if (typeof onNav === 'function') { try { onNav(); } catch (e) {} }
    };
    const goNo = function () {
        stopSaarthiListening();
        SaarthiUI.hideActions();
        const ack = 'Okay, staying right here.';
        SaarthiUI.showPillText(ack);
        speakSaarthi(ack, function () { SaarthiUI.settleIdle(); });
    };
    return {
        choices: [
            { label: '&#x2705; Yes, take me there', primary: true, onSelect: goYes },
            { label: '&#x274C; No, stay here', onSelect: goNo }
        ],
        voice: { yes: goYes, no: goNo }
    };
}

function openSaarthiVoiceModal() { SaarthiUI.openFull(); }
function closeSaarthiVoiceModal() { SaarthiUI.closeFull(); }
function reopenSaarthiFull() { SaarthiUI.openFull(); }

function startSaarthiListening() {
    try {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const st = document.getElementById('saarthi-status-text');
        if (!SR) {
            if (st) st.innerText = "Voice input isn't available on this browser — try a quick-tap prompt below.";
            return;
        }
        saarthiRecognition = new SR();
        saarthiRecognition.lang = 'en-IN';
        saarthiRecognition.interimResults = true;
        saarthiRecognition.continuous = false;
        saarthiRecognition.onresult = function (ev) {
            try {
                let text = '';
                for (let i = 0; i < ev.results.length; i++) text += ev.results[i][0].transcript;
                const t = document.getElementById('saarthi-transcript'); if (t) t.innerText = text;
                if (ev.results[ev.results.length - 1].isFinal) processSaarthiQuery(text);
            } catch (e) {}
        };
        saarthiRecognition.onerror = function () {
            const s = document.getElementById('saarthi-status-text');
            if (s) s.innerText = "Didn't catch that — try a quick-tap prompt below.";
        };
        saarthiRecognition.start();
    } catch (e) {}
}

// A short, separate recognition pass used only while the pill is showing the
// Yes/No confirmation - listens for a spoken "yes"/"no" on top of the buttons.
// Purely additive: if unsupported or nothing matches, the buttons still work.
function listenForYesNo(onYes, onNo) {
    try {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return;
        stopSaarthiListening();
        saarthiRecognition = new SR();
        saarthiRecognition.lang = 'en-IN';
        saarthiRecognition.interimResults = false;
        saarthiRecognition.continuous = false;
        saarthiRecognition.onresult = function (ev) {
            try {
                const said = ev.results[ev.results.length - 1][0].transcript.toLowerCase();
                if (/\b(yes|yeah|yep|sure|okay|ok|haan)\b/.test(said)) onYes();
                else if (/\b(no|nope|nah|nahi)\b/.test(said)) onNo();
            } catch (e) {}
        };
        saarthiRecognition.onerror = function () {};
        saarthiRecognition.start();
    } catch (e) {}
}

function stopSaarthiListening() {
    try {
        if (saarthiRecognition) {
            saarthiRecognition.onresult = null;
            saarthiRecognition.onerror = null;
            saarthiRecognition.onend = null;
            saarthiRecognition.stop();
            saarthiRecognition = null;
        }
    } catch (e) {}
}

// Calm, unhurried voice calibrated for elderly listening: slightly slower rate, en-IN
// voice when available. onEnd fires when speech truly finishes (utterance.onend) so
// callers can wait for the full answer before doing anything else - with a timed
// safety net in case a browser never fires onend, so the UI never gets stuck.
function speakSaarthi(text, onEnd) {
    try {
        if (!window.speechSynthesis) { if (typeof onEnd === 'function') onEnd(); return; }
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-IN'; u.rate = 0.88; u.pitch = 1.05; u.volume = 1;
        let finished = false;
        const finish = function () { if (finished) return; finished = true; if (typeof onEnd === 'function') { try { onEnd(); } catch (e) {} } };
        u.onend = finish;
        u.onerror = finish;
        setTimeout(finish, Math.max(2500, (text || '').length * 90)); // safety net
        const speakNow = function () {
            try {
                const voices = window.speechSynthesis.getVoices();
                const v = voices.find(function (v) { return v.lang === 'en-IN'; }) || voices.find(function (v) { return v.lang && v.lang.indexOf('en') === 0; });
                if (v) u.voice = v;
                window.speechSynthesis.speak(u);
            } catch (e) { finish(); }
        };
        if (window.speechSynthesis.getVoices().length) speakNow();
        else window.speechSynthesis.onvoiceschanged = speakNow;
    } catch (e) { if (typeof onEnd === 'function') onEnd(); }
}

// --- NLP intent router: broad cognitive-companion knowledge base ---
function classifySaarthiIntent(text) {
    const t = (text || '').toLowerCase();
    if (/my score|my (test )?result|test result|wellness score|how (was|did) i (do|perform)|how am i doing|my progress|my performance/.test(t)) return 'score';
    if (/routine|\btask\b|today'?s (schedule|plan)|what should i do|remind/.test(t)) return 'routine';
    if (/family|photo|album|picture|remember my|who is in my/.test(t)) return 'family';
    if (/\blonely\b|\bbored\b|\bboring\b|nothing to do|feel(ing)? alone/.test(t)) return 'lonely';
    if (/anxious|restless|help me sleep|can'?t sleep|i'?m tired|feel (tired|anxious|restless|stressed)|relax|\bcalm\b|breath(e|ing)|sound(scape)?|\bmusic\b/.test(t)) return 'relax';
    if (/\bemergency\b|call someone|call for help|need help (now|immediately)|send help|i need help\b/.test(t)) return 'emergency';
    if (/what is (neosaarthi|this app)|what does this app do|how does this (app )?help|about (this app|neosaarthi)/.test(t)) return 'about';
    if (/improve my memory|why (should i |do i need to )?play (games|the games)|cognitive scaffolding|brain (exercise|training)|neuroplasticity/.test(t)) return 'cognitive';
    if (/why (is )?water|why do i need to walk|why (should i )?walk|hydration|drink(ing)? water/.test(t)) return 'wellness';
    if (/^(hi|hello|hey|namaste)\b|good (morning|afternoon|evening)|how are you|how'?s your day|who are you|who (made|built|created) you|what('?s| is) your name|thank(s| you)|shukriya/.test(t)) return 'smalltalk';
    return 'offtopic';
}

// Builds { text, choices, voice } for a classified intent. `choices` is null for
// purely informational answers (nothing to confirm); otherwise an array of
// { label, primary?, onSelect } shown as compact pill buttons once speech finishes.
// `voice` (optional) is {yes, no} for the classic binary confirm - listenForYesNo()
// layers spoken "yes"/"no" on top of the buttons, which always remain the fallback.
function buildSaarthiReply(intent, rawText) {
    try {
        if (intent === 'score') {
            const profile = (typeof runAICognitiveProfiler === 'function') ? runAICognitiveProfiler() : null;
            let text;
            if (profile && profile.primaryDeficitLabel) {
                const vals = Object.keys(profile.user).map(function (k) { return profile.user[k]; });
                const overall = Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
                text = 'Your overall wellness score is ' + overall + ' percent. ' + profile.strengthDomainLabel +
                       ' is your strongest area, and ' + profile.primaryDeficitLabel + ' could use a little more practice.';
            } else {
                text = "You haven't finished an assessment yet, but you're welcome to play any game whenever you like.";
            }
            const yn = makeYesNoChoices('progress-screen');
            return { text: text + ' Would you like me to take you there now?', choices: yn.choices, voice: yn.voice };
        }
        if (intent === 'routine') {
            let remaining = 5;
            try {
                const d = (typeof getRoutineData === 'function') ? getRoutineData() : null;
                if (d) remaining = ['morning_brain', 'hydration', 'walk', 'afternoon_puzzle', 'evening_audio'].filter(function (k) { return !d[k]; }).length;
            } catch (e) {}
            const text = remaining > 0
                ? ('You have ' + remaining + ' ' + (remaining === 1 ? 'activity' : 'activities') + ' left in today\'s routine.')
                : "You've completed today's whole routine — wonderful work!";
            const yn = makeYesNoChoices('routine-screen');
            return { text: text + ' Would you like me to take you there now?', choices: yn.choices, voice: yn.voice };
        }
        if (intent === 'family') {
            let names = 'your loved ones';
            try {
                if (typeof familyMembers !== 'undefined' && familyMembers.length) {
                    const firstNames = familyMembers.map(function (m) { return m.name.split(' ')[0]; });
                    names = firstNames.length > 1
                        ? (firstNames.slice(0, -1).join(', ') + ' and ' + firstNames[firstNames.length - 1])
                        : firstNames[0];
                }
            } catch (e) {}
            const yn = makeYesNoChoices('family-screen');
            return { text: 'Your family album has photos of your loved ones including ' + names + '. Would you like to practice your face recognition game?', choices: yn.choices, voice: yn.voice };
        }
        if (intent === 'lonely') {
            const goFamily = function () {
                stopSaarthiListening(); SaarthiUI.state = 'idle'; SaarthiUI.hidePill();
                showScreen('family-screen');
            };
            const goMusic = function () {
                stopSaarthiListening(); SaarthiUI.state = 'idle'; SaarthiUI.hidePill();
                showScreen('routine-screen');
                if (typeof showAudioTherapyModal === 'function') { try { showAudioTherapyModal(); } catch (e) {} }
            };
            const justChat = function () {
                stopSaarthiListening(); SaarthiUI.hideActions();
                const ack = "I'm here for you anytime you want to talk.";
                SaarthiUI.showPillText(ack);
                speakSaarthi(ack, function () { SaarthiUI.settleIdle(); });
            };
            return {
                text: "I am right here with you! Would you like to practice identifying your family in the photo album, or shall we listen to some relaxing bamboo flute music together?",
                choices: [
                    { label: '&#x1F46A; Family Album', primary: true, onSelect: goFamily },
                    { label: '&#x1F3B6; Relaxing Music', onSelect: goMusic },
                    { label: '&#x1F4AC; Just chat', onSelect: justChat }
                ]
            };
        }
        if (intent === 'relax') {
            const yn = makeYesNoChoices('routine-screen', function () { if (typeof showAudioTherapyModal === 'function') { try { showAudioTherapyModal(); } catch (e) {} } });
            return { text: 'Take a slow, deep breath with me. Everything is peaceful. Would you like me to start your evening calming soundscape and breathing guide?', choices: yn.choices, voice: yn.voice };
        }
        if (intent === 'emergency') {
            const yn = makeYesNoChoices('sos-screen');
            return { text: 'If you are feeling unwell or need immediate help, I can open your emergency SOS Alert right away. Would you like me to open SOS?', choices: yn.choices, voice: yn.voice };
        }
        if (intent === 'about') {
            return { text: "NeoSaarthi is your daily cognitive wellness companion. It exercises your memory through gentle brain games, keeps you hydrated, and helps you stay connected with your loved ones.", choices: null };
        }
        if (intent === 'cognitive') {
            return { text: "Daily active recall, regular gentle walking, and staying mentally engaged stimulate your brain's neuroplasticity. We focus on exercising your memory, not replacing it.", choices: null };
        }
        if (intent === 'wellness') {
            return { text: "Drinking water prevents sudden fatigue and keeps your brain alert, while a ten-minute walk boosts oxygen and blood flow to your memory centers.", choices: null };
        }
        if (intent === 'smalltalk') {
            const t = (rawText || '').toLowerCase();
            if (/who are you|who (made|built|created) you|what('?s| is) your name/.test(t)) {
                return { text: "I am Saarthi, your personal cognitive wellness companion, built by Team NeoSaarthi to support your daily memory, health, and happiness.", choices: null };
            }
            if (/thank|shukriya/.test(t)) {
                return { text: "You are most welcome! Always happy to be by your side.", choices: null };
            }
            if (/how are you|how'?s your day/.test(t)) {
                return { text: "I am doing great, thank you for asking! I'm here and ready to help you with your daily routine or games.", choices: null };
            }
            let timeGreet = 'Hello';
            try {
                const hour = new Date().getHours();
                timeGreet = hour < 12 ? 'Good morning' : (hour < 17 ? 'Good afternoon' : 'Good evening');
            } catch (e) {}
            return { text: 'Namaste! ' + timeGreet + '. It is wonderful to talk with you today. How are you feeling?', choices: null };
        }
        // Out-of-scope: a gentle, elderly-friendly boundary rather than silence or a robotic error.
        return { text: "I am sorry, but I am specifically designed to assist you with your cognitive exercises, daily wellness, and family memories. Is there something about your routine or games I can help you with today?", choices: null };
    } catch (e) {
        return { text: 'I had a little trouble with that — please try again.', choices: null };
    }
}

function processSaarthiQuery(text) {
    try {
        const intent = classifySaarthiIntent(text);
        const reply = buildSaarthiReply(intent, text);

        SaarthiUI.collapseToPill(text, reply.text);
        speakSaarthi(reply.text, function () {
            try {
                if (reply.choices && reply.choices.length) SaarthiUI.showChoices(reply.choices, reply.voice);
                else SaarthiUI.settleIdle();
            } catch (e) {}
        });
    } catch (e) {}
}

// Pass a snapshot from getAssessmentSnapshot() to resume an interrupted assessment
// instead of starting a fresh one (see showResumeAssessmentPrompt).
function startAssessment(resumeSnap) {
    showScreen('assessment-screen');

    if (resumeSnap) {
        gauntletTimeLeft = resumeSnap.gauntletTimeLeft;
        currentPhase = resumeSnap.currentPhase;
        window.savedRecallItems = resumeSnap.savedRecallItems || [];
        GauntletScore.reset();
        GauntletScore.hydrate(resumeSnap.scoreDetail || {});
        window.gauntletTasksQueue = resumeSnap.remainingQueue.slice();
    } else {
        gauntletTimeLeft = 300;
        currentPhase = 0;
        window.savedRecallItems = [];
        GauntletScore.reset();

        // Shuffle 13 games
        window.gauntletTasksQueue = [0,1,2,3,4,5,6,7,8,9,10,11,12].sort(() => Math.random() - 0.5);
        let recallIdx = window.gauntletTasksQueue.indexOf(11);
        if (recallIdx < 5) {
            let swap = window.gauntletTasksQueue[12];
            window.gauntletTasksQueue[12] = 11;
            window.gauntletTasksQueue[recallIdx] = swap;
        }
    }

    let m0 = Math.floor(gauntletTimeLeft / 60).toString().padStart(2, '0');
    let s0 = (gauntletTimeLeft % 60).toString().padStart(2, '0');
    document.getElementById('gauntlet-timer').innerText = m0 + ':' + s0;
    document.getElementById('gauntlet-progress').style.width = (((300 - gauntletTimeLeft) / 300) * 100) + '%';

    const area = document.getElementById('gauntlet-area');
    if(!document.getElementById('demo-skip')) {
        const skipBtn = document.createElement('button');
        skipBtn.id = 'demo-skip';
        const _gl0 = (langData[currentLang] && langData[currentLang].gauntlet) || langData['en'].gauntlet; skipBtn.innerText = _gl0.skip;
        skipBtn.style.position = 'absolute'; skipBtn.style.bottom = '10px'; skipBtn.style.background = 'transparent';
        skipBtn.style.border = 'none'; skipBtn.style.textDecoration = 'underline'; skipBtn.style.color = '#999';
        skipBtn.onclick = finishAssessment;
        document.getElementById('assessment-screen').appendChild(skipBtn);
    }
    
    clearInterval(gauntletInterval);
    gauntletInterval = setInterval(() => {
        gauntletTimeLeft--;
        let m = Math.floor(gauntletTimeLeft / 60).toString().padStart(2, '0');
        let s = (gauntletTimeLeft % 60).toString().padStart(2, '0');
        document.getElementById('gauntlet-timer').innerText = m + ':' + s;
        
        let pct = ((300 - gauntletTimeLeft) / 300) * 100;
        document.getElementById('gauntlet-progress').style.width = pct + '%';

        if (gauntletTimeLeft <= 0) {
            clearInterval(gauntletInterval);
            finishAssessment();
        }
    }, 1000);

    loadNextGauntletTask();
}

// Procedurally generates a distinct-integer array for Order Planning, preserving the
// per-level difficulty shape (count/range) that used to be 3 hardcoded arrays - so
// replaying the game doesn't show the exact same puzzle every time.
function generateOrderPlanningArray(level) {
    let count, min, max;
    if (level === 1) { count = 4; min = 1; max = 99; }
    else if (level === 2) { count = 5; min = -20; max = 40; }
    else { count = 5; min = 10; max = 199; }

    const nums = new Set();
    let guard = 0;
    while (nums.size < count && guard++ < 200) {
        nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(nums);
}

// Procedurally generates an arithmetic (levels 1-2) or geometric (level 3) sequence
// for Pattern Completion, replacing the 3 fixed sequences that used to be identical
// every playthrough.
function generateNumberPattern(level) {
    if (level === 1) {
        const start = 1 + Math.floor(Math.random() * 5);   // 1-5
        const step = 2 + Math.floor(Math.random() * 3);    // 2-4
        return { seq: [start, start + step, start + 2*step, start + 3*step], ans: start + 4*step };
    }
    if (level === 2) {
        const start = 2 + Math.floor(Math.random() * 8);   // 2-9
        const step = 4 + Math.floor(Math.random() * 4);    // 4-7
        return { seq: [start, start + step, start + 2*step, start + 3*step], ans: start + 4*step };
    }
    const start = 1 + Math.floor(Math.random() * 3);       // 1-3, ×2 geometric
    return { seq: [start, start*2, start*4, start*8], ans: start*16 };
}

// A small, deliberately conservative pool of visual analogy puzzles for Matrix
// Reasoning, replacing the single fixed puzzle that used to be identical every
// playthrough. Kept small and hand-picked (unlike the two generators above) since
// these need to be unambiguous for a scored cognitive test, not just varied.
const MATRIX_REASONING_POOL = [
    { promptHTML: '&#x2600;&#xFE0F; -> &#x1F305; <br><br> &#x1F319; -> ?', correct: '&#x1F30C;', distractors: ['&#x1F327;&#xFE0F;', '&#x26C4;', '&#x1F308;'] },
    { promptHTML: '&#x2600;&#xFE0F; -> &#x1F319; <br><br> &#x1F525; -> ?', correct: '&#x2744;&#xFE0F;', distractors: ['&#x1F308;', '&#x1F4A7;', '&#x1F34E;'] },
    { promptHTML: '&#x1F95A; -> &#x1F423; <br><br> &#x1F41B; -> ?', correct: '&#x1F98B;', distractors: ['&#x1F41D;', '&#x1F420;', '&#x1F338;'] }
];
function getMatrixReasoningPuzzle() {
    return MATRIX_REASONING_POOL[Math.floor(Math.random() * MATRIX_REASONING_POOL.length)];
}

function loadNextGauntletTask() {
    if (gauntletTimeLeft <= 0) return;
    const area = document.getElementById('gauntlet-area');
    area.innerHTML = ''; 
    
    if (window.gauntletTasksQueue.length === 0) {
        finishAssessment();
        return;
    }

    let taskType = window.gauntletTasksQueue.shift();
    currentPhase++;
    GauntletScore.begin(taskType);
    saveAssessmentSnapshot(taskType);

    const gl = (langData[currentLang] && langData[currentLang].gauntlet) || langData['en'].gauntlet;
    let level = 1; let levelText = gl.level_easy;
    if (currentPhase > 4 && currentPhase <= 9) {
        level = 2; levelText = gl.level_med;
    } else if (currentPhase > 9) {
        level = 3; levelText = gl.level_hard;
    }
    const curSkipBtn = document.getElementById('demo-skip');
    if (curSkipBtn) curSkipBtn.innerText = gl.skip;
    
    const badge = document.createElement('div');
    badge.innerText = levelText;
    badge.style.padding = '4px 8px'; 
    badge.style.background = level === 1 ? '#4CAF50' : level === 2 ? '#FF9800' : '#F44336';
    badge.style.color = 'white'; badge.style.borderRadius = '8px'; badge.style.fontSize = '14px'; badge.style.fontWeight = 'bold';
    badge.style.marginBottom = '15px';
    badge.style.display = 'inline-block';
    area.appendChild(badge);

    const titleEl = document.getElementById('gauntlet-title');

    const emj = {
        fruits: ['&#x1F34E;','&#x1F34C;','&#x1F347;','&#x1F353;','&#x1F34A;'],
        shapes: ['&#x1F534;','&#x1F7E2;','&#x1F7E1;','&#x1F535;','&#x1F7E3;'],
        animals: ['&#x1F436;','&#x1F431;','&#x1F42D;','&#x1F430;','&#x1F43B;'],
        weather: ['&#x2600;&#xFE0F;','&#x1F327;&#xFE0F;','&#x26C4;','&#x1F308;','&#x26A1;']
    };

    function makeGrid(items, onSelect) {
        const grid = document.createElement('div');
        grid.style.display = 'grid'; 
        grid.style.gridTemplateColumns = items.length <= 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'; 
        grid.style.gap = '15px'; 
        grid.style.marginTop = '20px';
        grid.style.width = '100%';
        grid.style.maxWidth = '400px';
        items.forEach(obj => {
            const btn = document.createElement('button'); btn.innerHTML = obj; 
            btn.style.padding = '15px'; btn.style.fontSize = '35px'; 
            btn.style.borderRadius = '12px'; btn.style.border = '2px solid #ccc'; 
            btn.style.background = 'white'; btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            btn.style.cursor = 'pointer';
            btn.onclick = () => onSelect(obj, btn);
            grid.appendChild(btn);
        });
        area.appendChild(grid);
    }
    
    function makeInst(text) {
        const inst = document.createElement('p'); inst.innerHTML = text; inst.style.fontSize = '20px'; inst.style.fontWeight = '600'; inst.style.color = '#37474F'; inst.style.textAlign = 'center'; area.appendChild(inst);
    }

    if (taskType === 0) {
        titleEl.innerText = gl.g0_title;
        let seqLen = level === 1 ? 3 : 4; // user requested max 4 items for level 3
        let speed = level === 1 ? 2000 : level === 2 ? 1600 : 1300;
        let pool = emj.shapes;
        let seq = [];
        for(let i=0; i<seqLen; i++) seq.push(pool[Math.floor(Math.random()*pool.length)]);
        window.savedRecallItems.push(seq[0]); 
        
        makeInst(gl.g0_watch);
        const disp = document.createElement('h2'); disp.style.fontSize = '80px'; disp.style.margin = '30px 0'; area.appendChild(disp);
        
        let step = 0;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            if(step < seqLen) {
                disp.innerHTML = seq[step];
                setTimeout(() => { disp.innerHTML = ''; }, speed - 300);
                step++;
            } else {
                clearInterval(intv);
                area.innerHTML = ''; area.appendChild(badge); makeInst(gl.g0_tap);
                let userSeq = [];
                makeGrid(pool, (val, btn) => {
                    userSeq.push(val);
                    btn.style.background = '#E0F2F1';
                    if(userSeq.length === seqLen) {
                        for (let i = 0; i < seqLen; i++) GauntletScore[userSeq[i] === seq[i] ? 'hit' : 'miss']();
                        setTimeout(loadNextGauntletTask, 300);
                    }
                });
            }
        }, speed);
    }
    else if (taskType === 1) {
        titleEl.innerText = gl.g1_title;
        let count = level === 1 ? 3 : 4; // user requested max 4
        makeInst(gl.g1_rem);
        
        const grid = document.createElement('div');
        grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(3, 1fr)'; grid.style.gap = '15px'; grid.style.margin = '30px auto'; grid.style.width = '240px'; grid.style.height = '240px';
        let cells = [];
        let active = [];
        for(let i=0; i<9; i++) {
            let c = document.createElement('div'); c.style.background = '#eee'; c.style.borderRadius = '12px'; c.style.boxShadow = 'inset 0 0 5px rgba(0,0,0,0.1)';
            grid.appendChild(c); cells.push(c);
        }
        area.appendChild(grid);
        
        while(active.length < count) {
            let r = Math.floor(Math.random()*9);
            if(!active.includes(r)) active.push(r);
        }
        
        active.forEach(idx => cells[idx].style.background = '#00796B');
        
        setTimeout(() => {
            if(gauntletTimeLeft <= 0) return;
            cells.forEach(c => c.style.background = '#eee');
            makeInst(gl.g1_tap);
            let found = 0;
            cells.forEach((c, idx) => {
                c.onclick = () => {
                    if(active.includes(idx)) { c.style.background = '#4CAF50'; found++; GauntletScore.hit(); }
                    else { c.style.background = '#F44336'; GauntletScore.miss(); }
                    if(found === count) setTimeout(loadNextGauntletTask, 500);
                }
            });
        }, level === 1 ? 4000 : level === 2 ? 3000 : 2500);
    }
    else if (taskType === 2) {
        titleEl.innerText = gl.g2_title;
        makeInst(gl.g2_inst);
        const box = document.createElement('div'); box.style.height = '120px'; box.style.margin = '40px 0'; box.style.fontSize = '80px'; area.appendChild(box);
        let reps = 0;
        let everHitTarget = false;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            let isTarget = Math.random() < 0.3 || reps === 3;
            box.innerHTML = isTarget ? '&#x1F535;' : '&#x1F7E2;';
            GauntletScore.prompted();
            box.onclick = () => {
                if(isTarget) { everHitTarget = true; GauntletScore.hit(); clearInterval(intv); box.style.background = '#E8F5E9'; box.style.borderRadius = '50%'; setTimeout(loadNextGauntletTask, 500); }
                else { GauntletScore.miss(); }
            };
            reps++;
            if (reps > 6) { clearInterval(intv); if(!everHitTarget) GauntletScore.miss(); loadNextGauntletTask(); }
            setTimeout(() => { box.innerHTML = ''; }, level === 1 ? 1500 : level === 2 ? 1200 : 1000);
        }, level === 1 ? 2500 : level === 2 ? 2000 : 1500);
    }
    else if (taskType === 3) {
        titleEl.innerText = gl.g3_title;
        makeInst(level === 1 ? gl.g3_even_odd : gl.g3_red_blue);
        
        let target = document.createElement('h2'); target.style.fontSize = '100px'; target.style.margin = '30px 0'; area.appendChild(target);
        let val = level === 1 ? Math.floor(Math.random()*8)+2 : (Math.random() > 0.5 ? '&#x1F534;' : '&#x1F535;');
        target.innerHTML = val;
        let correctSide3 = level === 1 ? (val % 2 === 0 ? 'L' : 'R') : (val === '&#x1F534;' ? 'L' : 'R');

        const flex = document.createElement('div'); flex.style.display = 'flex'; flex.style.gap = '20px'; flex.style.justifyContent = 'center'; flex.style.width = '100%'; flex.style.maxWidth = '400px';
        let btnL = document.createElement('button'); btnL.innerText = gl.btn_left; btnL.style.padding = '25px'; btnL.style.fontSize = '24px'; btnL.style.flex = '1'; btnL.style.borderRadius = '16px'; btnL.style.border = '2px solid #ccc'; btnL.onclick = () => { GauntletScore[correctSide3 === 'L' ? 'hit' : 'miss'](); loadNextGauntletTask(); };
        let btnR = document.createElement('button'); btnR.innerText = gl.btn_right; btnR.style.padding = '25px'; btnR.style.fontSize = '24px'; btnR.style.flex = '1'; btnR.style.borderRadius = '16px'; btnR.style.border = '2px solid #ccc'; btnR.onclick = () => { GauntletScore[correctSide3 === 'R' ? 'hit' : 'miss'](); loadNextGauntletTask(); };
        flex.appendChild(btnL); flex.appendChild(btnR); area.appendChild(flex);
    }
    else if (taskType === 4) {
        titleEl.innerText = gl.g4_title;
        makeInst(gl.g4_inst);
        
        const targetDisp = document.createElement('div');
        targetDisp.innerHTML = '&#x1F431;'; // Cat
        targetDisp.style.fontSize = '60px';
        targetDisp.style.margin = '10px 0';
        area.appendChild(targetDisp);

        let count = level === 1 ? 4 : level === 2 ? 6 : 9;
        let pool = emj.animals.slice();
        let items = ['&#x1F431;'];
        while(items.length < count) {
            items.push(pool[Math.floor(Math.random()*pool.length)]);
        }
        items.sort(() => Math.random() - 0.5);
        makeGrid(items, (val) => {
            if(val === '&#x1F431;') { GauntletScore.hit(); loadNextGauntletTask(); }
            else { GauntletScore.miss(); }
        });
    }
    else if (taskType === 5) {
        titleEl.innerText = gl.g5_title;
        makeInst(gl.g5_inst);
        let genPat = generateNumberPattern(level);
        let pat = genPat.seq, ans = genPat.ans;
        let pText = document.createElement('h2'); pText.innerText = pat.join(', ') + ', ?'; pText.style.margin = '30px 0'; pText.style.letterSpacing = '2px'; pText.style.color = '#00796B'; area.appendChild(pText);

        let opts = [ans, ans+1, ans-1, ans+2].sort(() => Math.random()-0.5);
        makeGrid(opts, (val) => { GauntletScore[val === ans ? 'hit' : 'miss'](); loadNextGauntletTask(); });
    }
    else if (taskType === 6) {
        titleEl.innerText = gl.g6_title;
        makeInst(gl.g6_inst);
        const puzzle6 = getMatrixReasoningPuzzle();
        let pText = document.createElement('h2'); pText.innerHTML = puzzle6.promptHTML; pText.style.margin = '30px 0'; pText.style.fontSize = '40px'; area.appendChild(pText);

        let correctOpt6 = puzzle6.correct;
        let opts = [puzzle6.correct].concat(puzzle6.distractors).sort(() => Math.random()-0.5);
        makeGrid(opts, (val) => { GauntletScore[val === correctOpt6 ? 'hit' : 'miss'](); loadNextGauntletTask(); });
    }
    else if (taskType === 7) {
        titleEl.innerText = gl.g7_title;
        makeInst(gl.g7_inst);
        const box = document.createElement('div'); box.style.height = '120px'; box.style.margin = '20px 0'; box.style.fontSize = '80px'; area.appendChild(box);
        
        let btn = document.createElement('button'); btn.innerText = gl.btn_match; btn.style.padding = '20px'; btn.style.width = '100%'; btn.style.maxWidth = '300px'; btn.style.fontSize = '24px'; btn.style.fontWeight = 'bold'; btn.style.borderRadius = '16px'; btn.style.border = '2px solid #ccc'; btn.style.background = 'white'; area.appendChild(btn);
        
        let pool = emj.shapes;
        let last = '';
        let step = 0;
        let everMatched = false, matchOpportunities = 0;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            let cur = Math.random() < 0.4 && last !== '' ? last : pool[Math.floor(Math.random()*pool.length)];
            if (cur === last && last !== '') matchOpportunities++;
            box.innerHTML = cur;
            GauntletScore.prompted();
            btn.onclick = () => {
                if(cur === last) { everMatched = true; GauntletScore.hit(); clearInterval(intv); btn.style.background = '#C8E6C9'; setTimeout(loadNextGauntletTask, 500); }
                else { GauntletScore.miss(); }
            };
            last = cur;
            step++;
            if(step > 6) { clearInterval(intv); if(!everMatched && matchOpportunities > 0) GauntletScore.miss(); loadNextGauntletTask(); }
            setTimeout(() => { box.innerHTML = ''; }, level === 1 ? 2000 : 1500);
        }, level === 1 ? 3500 : 2500);
    }
    else if (taskType === 8) {
        titleEl.innerText = gl.g8_title;
        makeInst(gl.g8_inst);
        const box = document.createElement('div'); box.style.height = '120px'; box.style.margin = '40px 0'; box.style.fontSize = '100px'; box.style.cursor = 'pointer'; area.appendChild(box);
        let taps = 0; let step = 0;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            let isGreen = Math.random() > 0.4;
            box.innerHTML = isGreen ? '&#x1F7E2;' : '&#x1F534;';
            GauntletScore.prompted();
            box.onclick = () => {
                if(isGreen) { taps++; GauntletScore.hit(); }
                else { GauntletScore.miss(); }
            };
            step++;
            if(taps >= 3 || step > 6) { clearInterval(intv); loadNextGauntletTask(); }
            setTimeout(() => { box.innerHTML = ''; }, level === 1 ? 1500 : level === 2 ? 1200 : 1000);
        }, level === 1 ? 2500 : 1800);
    }
    else if (taskType === 9) {
        titleEl.innerText = gl.g9_title;
        let isReversed = level > 1;
        makeInst(isReversed ? gl.g9_rev_rule : gl.g9_rule);

        let target = document.createElement('h2'); target.style.fontSize = '100px'; target.style.margin = '30px 0'; area.appendChild(target);
        let val = Math.random() > 0.5 ? '&#x1F34E;' : '&#x1F34C;';
        target.innerHTML = val;
        let correctSide9 = isReversed ? (val === '&#x1F34E;' ? 'R' : 'L') : (val === '&#x1F34E;' ? 'L' : 'R');

        const flex = document.createElement('div'); flex.style.display = 'flex'; flex.style.gap = '20px'; flex.style.justifyContent = 'center'; flex.style.width = '100%'; flex.style.maxWidth = '400px';
        let btnL = document.createElement('button'); btnL.innerText = gl.btn_left; btnL.style.padding = '25px'; btnL.style.fontSize = '24px'; btnL.style.flex = '1'; btnL.style.borderRadius = '16px'; btnL.style.border = '2px solid #ccc'; btnL.onclick = () => { GauntletScore[correctSide9 === 'L' ? 'hit' : 'miss'](); loadNextGauntletTask(); };
        let btnR = document.createElement('button'); btnR.innerText = gl.btn_right; btnR.style.padding = '25px'; btnR.style.fontSize = '24px'; btnR.style.flex = '1'; btnR.style.borderRadius = '16px'; btnR.style.border = '2px solid #ccc'; btnR.onclick = () => { GauntletScore[correctSide9 === 'R' ? 'hit' : 'miss'](); loadNextGauntletTask(); };
        flex.appendChild(btnL); flex.appendChild(btnR); area.appendChild(flex);
    }
    else if (taskType === 10) {
        titleEl.innerText = gl.g10_title;
        
        makeInst(gl.g10_memo);
        const tempPool = ['&#x1F30E;', '&#x1F680;', '&#x1F3B2;', '&#x1F514;'];
        const disp = document.createElement('div');
        disp.innerHTML = tempPool.join(' &nbsp; ');
        disp.style.fontSize = '40px'; disp.style.margin = '30px 0';
        area.appendChild(disp);
        
        setTimeout(() => {
            if(gauntletTimeLeft <= 0) return;
            area.innerHTML = ''; area.appendChild(badge);
            makeInst(gl.g10_see);
            let isOld = Math.random() > 0.5;
            let val = isOld ? tempPool[Math.floor(Math.random()*tempPool.length)] : '&#x1F381;';
            
            let target = document.createElement('h2'); target.style.fontSize = '100px'; target.style.margin = '30px 0'; target.innerHTML = val; area.appendChild(target);

            const flex = document.createElement('div'); flex.style.display = 'flex'; flex.style.gap = '20px'; flex.style.justifyContent = 'center'; flex.style.width = '100%'; flex.style.maxWidth = '400px';
            let btnO = document.createElement('button'); btnO.innerText = gl.btn_yes; btnO.style.padding = '25px'; btnO.style.fontSize = '24px'; btnO.style.flex = '1'; btnO.style.borderRadius = '16px'; btnO.style.border = '2px solid #4CAF50'; btnO.onclick = () => { GauntletScore[isOld ? 'hit' : 'miss'](); loadNextGauntletTask(); };
            let btnN = document.createElement('button'); btnN.innerText = gl.btn_no; btnN.style.padding = '25px'; btnN.style.fontSize = '24px'; btnN.style.flex = '1'; btnN.style.borderRadius = '16px'; btnN.style.border = '2px solid #F44336'; btnN.onclick = () => { GauntletScore[!isOld ? 'hit' : 'miss'](); loadNextGauntletTask(); };
            flex.appendChild(btnO); flex.appendChild(btnN); area.appendChild(flex);
        }, 3000);
    }
    else if (taskType === 11) {
        titleEl.innerText = gl.g11_title;
        makeInst(gl.g11_inst);
        let correctShape11 = (window.savedRecallItems && window.savedRecallItems.length) ? window.savedRecallItems[0] : null;
        let opts = emj.shapes.slice().sort(() => Math.random() - 0.5);
        makeGrid(opts, (val, btn) => {
            GauntletScore[(correctShape11 !== null && val === correctShape11) ? 'hit' : 'miss']();
            btn.style.background = '#C8E6C9';
            setTimeout(loadNextGauntletTask, 500);
        });
    }
    else if (taskType === 12) {
        titleEl.innerText = gl.g12_title;
        makeInst(gl.g12_inst);
        let arr = generateOrderPlanningArray(level);
        let sorted = arr.slice().sort((a,b) => a-b);
        let currentIdx = 0;

        let shuffled = arr.slice().sort(() => Math.random() - 0.5);
        makeGrid(shuffled, (val, btn) => {
            if(val == sorted[currentIdx]) {
                GauntletScore.hit();
                btn.style.background = '#4CAF50'; btn.style.color = 'white';
                currentIdx++;
                if(currentIdx === arr.length) setTimeout(loadNextGauntletTask, 500);
            } else {
                GauntletScore.miss();
                btn.style.background = '#F44336'; btn.style.color = 'white';
            }
        });
    }
}

// Merge GauntletScore's real, captured results into localStorage['gameScores']
// (back-compat: id -> 0-100 int, used by renderGamesList/progress) plus a richer
// localStorage['gameScoreDetail'] (id -> {score, accuracyPct, speedPct, hits, misses})
// that the AI Cognitive Profiler reads for its domain vectors. Never throws.
function saveGauntletScores() {
    try {
        const result = GauntletScore.finalize();
        let gameScores = {};
        try { gameScores = JSON.parse(localStorage.getItem('gameScores')) || {}; } catch (e) { gameScores = {}; }
        let gameScoreDetail = {};
        try { gameScoreDetail = JSON.parse(localStorage.getItem('gameScoreDetail')) || {}; } catch (e) { gameScoreDetail = {}; }
        Object.assign(gameScores, result.scores);
        Object.assign(gameScoreDetail, result.detail);
        localStorage.setItem('gameScores', JSON.stringify(gameScores));
        localStorage.setItem('gameScoreDetail', JSON.stringify(gameScoreDetail));
        if (typeof runAICognitiveProfiler === 'function') runAICognitiveProfiler();
    } catch (e) {}
}

function finishAssessment() {
    clearInterval(gauntletInterval);
    
    if (window.isSingleGame) {
        window.isSingleGame = false;
        document.getElementById('gauntlet-timer').style.display = 'inline-block';
        document.getElementById('gauntlet-progress').parentElement.style.display = 'block';
        saveGauntletScores(); // record this one game's real result too
        if (typeof window.routineTaskCallback === 'function') {
            let cb = window.routineTaskCallback;
            window.routineTaskCallback = null;
            cb();
            return;
        }
        showScreen('game-menu-screen');
        return;
    }

    document.getElementById('gauntlet-title').innerText = 'Complete!';

    saveGauntletScores(); // real accuracy + reaction-time scores from GauntletScore, no mock data
    clearAssessmentSnapshot(); // finished for real - no resume prompt needed next time

    const skipBtn = document.getElementById('demo-skip');
    if(skipBtn) skipBtn.remove();

    // Wellness focus areas mapped to an adaptive UI mode. Framed as support areas,
    // never as a condition label (daily-wellness-companion framing).
    const matrix = [
        { focus: "Early Memory Changes", ui: "Standard" },
        { focus: "Memory Support", ui: "Anchor Mode" },
        { focus: "Memory & Focus Support", ui: "Focus Mode" },
        { focus: "Attention & Visual Support", ui: "High Contrast Mode" },
        { focus: "Planning & Language Support", ui: "Calm Mode" },
        { focus: "Language Support", ui: "Voice Mode" },
        { focus: "Movement & Coordination", ui: "Steady Mode" },
        { focus: "Evening Calm Support", ui: "Night Mode" },
        { focus: "Orientation & Wayfinding", ui: "Safety Mode" },
        { focus: "Sensory & Listening Support", ui: "Therapy Mode" }
    ];

    const profile = matrix[Math.floor(Math.random() * matrix.length)];
    localStorage.setItem('wellnessPlan', JSON.stringify(profile));
    
    setTimeout(() => {
        showScreen('analyzing-screen');
        const textEl = document.getElementById('analyzing-text');
        if (textEl) textEl.innerText = 'Personalizing your plan...';

        setTimeout(() => {
            if (textEl) textEl.innerText = 'Setting up ' + profile.ui + '...';
        }, 1500);
        
        setTimeout(() => {
            localStorage.setItem('hasCompletedAssessment', 'true');
            applyMatrixToHome(profile);
            showScreen('home-screen');
        }, 3000);
    }, 500);
}

function applyMatrixToHome(profile) {
    const home = document.getElementById('home-screen');
    const header = home.querySelector('.app-header');
    
    home.style.background = '#FDFCF0';
    home.style.color = '#37474F';
    header.style.background = 'linear-gradient(135deg, #00796B, #004D40)';
    header.style.borderBottom = 'none';
    
    if (profile.ui === 'High Contrast Mode') {
        home.style.background = '#000000';
        document.querySelectorAll('.quest-text h2').forEach(h => h.style.color = '#FFEB3B');
        document.querySelectorAll('.quest-text p').forEach(p => p.style.color = '#FFF');
        header.style.background = '#000';
        header.style.borderBottom = '4px solid #FFEB3B';
    } else if (profile.ui === 'Night Mode') {
        home.style.background = '#1a1a2e';
        header.style.background = '#16213e';
        document.querySelectorAll('.quest-text h2').forEach(h => h.style.color = '#FFF');
    } else if (profile.ui === 'Calm Mode') {
        home.style.background = '#E8F5E9';
        header.style.background = '#A5D6A7';
    } else if (profile.ui === 'Steady Mode') {
        document.querySelectorAll('.quest-card').forEach(c => c.style.padding = '30px');
    }
    
    // Adaptive greeting only. The home cards keep their authored navigation
    // (Cognitive Exercise / Family / Routine) so nothing dead-ends after the assessment.
    const greetingEl = document.getElementById('home-greeting');
    if (greetingEl) greetingEl.innerText = 'Your Wellness Plan';
    const subtitle = header.querySelector('p');
    if (subtitle) {
        subtitle.innerText = profile.focus + ' • ' + profile.ui;
        subtitle.style.fontWeight = 'bold';
        subtitle.style.color = '#FFC107';
    }
}


function finishFamilyQuiz(btn) {
    btn.style.background = '#4CAF50';
    btn.style.color = 'white';
    setTimeout(() => {
        if (window.pendingRoutineTask) {
            verifyPendingGame();
        } else {
            showScreen('home-screen');
        }
        btn.style.background = 'white';
        btn.style.color = '#37474F';
    }, 1000);
}

// --- ROUTINE & NAV LOGIC ---
function switchNav(screenId) {
    if(!localStorage.getItem('hasCompletedAssessment') || localStorage.getItem('hasCompletedAssessment') !== 'true') return;
    
    // Only switch if trying to go to valid tabs
    if(screenId !== 'home-screen' && screenId !== 'routine-screen' && screenId !== 'progress-screen') return;
    
    showScreen(screenId);
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    if(screenId === 'home-screen') {
        const n = document.getElementById('nav-home');
        if(n) n.classList.add('active');
    }
    if(screenId === 'routine-screen') {
        const n = document.getElementById('nav-routine');
        if(n) n.classList.add('active');
    }
    if(screenId === 'progress-screen') {
        const n = document.getElementById('nav-progress');
        if(n) n.classList.add('active');
    }
}

let completedTasks = 0;
window.pendingRoutineTask = null;

function verifyPendingGame() {
    if (window.pendingRoutineTask && !window.pendingRoutineTask.classList.contains('done')) {
        window.pendingRoutineTask.classList.add('done');
        completedTasks++;
        const progText = document.getElementById('routine-progress-text');
        if(progText) progText.innerText = completedTasks + ' / 5 Completed';
        
        // Update Stats
        const taskText = window.pendingRoutineTask.innerText.toLowerCase();
        if(taskText.includes('walk') || taskText.includes('mobility')) {
            stats.phy = 1;
        } else {
            stats.cog = Math.min(3, stats.cog + 1);
        }
        renderProgressTab();
        
        window.pendingRoutineTask = null;
    }
    showScreen('routine-screen');
}



// ============================================================
// WALK TRACKER — GPS + Accelerometer Sensor Fusion
// Steps only count when GPS confirms real physical movement.
// Shaking/vibrating the phone while stationary = REJECTED.
// ============================================================

// ── State ──────────────────────────────────────────────────
let walkInterval       = null;
let walkActiveSecs     = 0;
let walkSteps          = 0;
let walkActive         = false;
let walkMoving         = false;
let walkInactivityTimer= null;
let walkMotionBound    = false;
let walkGpsWatchId     = null;

// Gravity-isolation state — a heavy, slow-adapting low-pass filter tracks the true
// gravity vector so it can be subtracted out, regardless of how the phone is tilted.
let walkGravity = { x: 0, y: 0, z: 0 };
let walkGravityReady = false;

// Vertical-acceleration peak/trough state (last 2 samples, for local-extrema detection)
let walkPrevV = 0, walkPrevPrevV = 0;
let walkAwaitingTrough = false;
let walkPeakValue = 0, walkPeakTimeMs = 0;
let walkLastStepMs = 0;

// Cadence gate — a footfall is only credited as a step once WALK_CADENCE_GATE
// consecutive footfalls land inside the human-walking frequency band in a row;
// any interval outside that band discards the whole buffer.
let walkCadenceBuffer = [];
let walkCadenceLocked = false;

// GPS state
let walkGpsSpeed       = 0;          // m/s from GPS
let walkGpsLastLat     = null;
let walkGpsLastLon     = null;
let walkGpsLastMovedMs = 0;          // when GPS last confirmed movement

// ── Constants ──────────────────────────────────────────────
const WALK_GRAVITY_ALPHA   = 0.1;     // heavy low-pass to isolate true gravity (slow-adapting so a quick tilt can't fake a gravity shift)
const WALK_VERTICAL_THRESH = 1.5;     // m/s² minimum peak-to-trough swing, in the gravity-aligned axis only, for a real footfall
const WALK_PEAK_TIMEOUT_MS = 600;     // a peak must be followed by its trough within this window or it's discarded
const WALK_MIN_STEP_MS     = 250;     // physically-impossible-to-repeat-faster-than floor (rejects double-counting one footfall)
const WALK_CADENCE_MIN_HZ  = 1.0;
const WALK_CADENCE_MAX_HZ  = 2.2;
const WALK_CADENCE_MIN_MS  = 1000 / WALK_CADENCE_MAX_HZ; // ≈454ms — fastest allowed step interval
const WALK_CADENCE_MAX_MS  = 1000 / WALK_CADENCE_MIN_HZ; // 1000ms — slowest allowed step interval
const WALK_CADENCE_GATE    = 3;       // consecutive rhythmic footfalls required before any step is credited
const WALK_STRIDE_M     = 0.68;       // metres per step (elderly avg)
const WALK_GOAL_SECS    = 600;        // 10-minute goal
const WALK_ARC_LEN      = 678.6;      // SVG circle circumference (2π × 108)

// GPS movement threshold — must be moving faster than this to validate steps
const GPS_SPEED_MIN_MS  = 0.3;       // 0.3 m/s ≈ very slow shuffle
const GPS_GRACE_MS      = 4000;      // allow steps 4s after GPS last confirmed movement

// ── Haversine distance (metres) ─────────────────────────────
function haversineM(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ── GPS handler ─────────────────────────────────────────────
function onWalkGpsUpdate(pos) {
    const { latitude: lat, longitude: lon, speed } = pos.coords;

    // Update GPS speed (may be null on some devices)
    if (speed != null) {
        walkGpsSpeed = speed;
    }

    // Calculate displacement since last GPS point
    if (walkGpsLastLat !== null) {
        const dist = haversineM(walkGpsLastLat, walkGpsLastLon, lat, lon);
        // If moved more than 1.5 metres between GPS updates → real movement
        if (dist > 1.5 || walkGpsSpeed >= GPS_SPEED_MIN_MS) {
            walkGpsLastMovedMs = performance.now();
        }
    }

    walkGpsLastLat = lat;
    walkGpsLastLon = lon;
}

// ── Check: is device currently moving? ─────────────────────
function isDeviceMoving() {
    // GPS speed is reliable (if available)
    if (walkGpsSpeed >= GPS_SPEED_MIN_MS) return true;
    // Grace window: still moving if GPS said so within last 4 s
    if (walkGpsLastMovedMs && (performance.now() - walkGpsLastMovedMs) < GPS_GRACE_MS) return true;
    // No GPS at all (indoor / no fix) — allow steps through (best-effort)
    if (walkGpsLastLat === null) return true;
    return false;
}

// ── DOM update ──────────────────────────────────────────────
function updateWalkUI() {
    const stepsEl = document.getElementById('walk-steps');
    if (stepsEl) stepsEl.innerText = walkSteps;

    const distEl = document.getElementById('walk-distance');
    if (distEl) distEl.innerText = ((walkSteps * WALK_STRIDE_M) / 1000).toFixed(2) + ' km';

    const m = Math.floor(walkActiveSecs / 60).toString().padStart(2, '0');
    const s = (walkActiveSecs % 60).toString().padStart(2, '0');
    const timeEl = document.getElementById('walk-time');
    if (timeEl) timeEl.innerText = `${m}:${s}`;

    // Update SVG arc (stroke-dashoffset) — no rotation, content stays upright
    const arc = document.getElementById('walk-arc');
    if (arc) {
        const progress = Math.min(1, walkActiveSecs / WALK_GOAL_SECS);
        arc.style.strokeDashoffset = WALK_ARC_LEN * (1 - progress);
    }
}

function setWalkStatus(msg, color) {
    const hint = document.getElementById('walk-status-hint');
    if (hint) { hint.innerText = msg; hint.style.color = color || '#93C5FD'; }
}

// ── Cadence gate ──────────────────────────
// A confirmed peak-to-trough impact (a "footfall") only becomes a counted step once
// WALK_CADENCE_GATE of them in a row land inside the human-walking frequency band
// (1.0-2.2 Hz). One shake, one tilt-triggered blip, or an irregular jostle can produce
// at most one or two footfalls before the timing fails this check and resets the
// buffer to zero - so it can never accumulate into counted steps.
function registerFootfall(now) {
    if (walkCadenceBuffer.length > 0) {
        const interval = now - walkCadenceBuffer[walkCadenceBuffer.length - 1];

        if (interval < WALK_MIN_STEP_MS) return; // can't physically be a distinct footfall this fast - ignore, keep rhythm intact

        if (interval < WALK_CADENCE_MIN_MS || interval > WALK_CADENCE_MAX_MS) {
            // Cadence broken - too fast, too slow, or too long a gap to be a human gait.
            const wasLocked = walkCadenceLocked;
            walkCadenceBuffer = [];
            walkCadenceLocked = false;
            if (wasLocked) setWalkStatus('Irregular motion \u2014 steps paused', '#FFB74D');
        }
    }

    walkCadenceBuffer.push(now);
    if (walkCadenceBuffer.length > WALK_CADENCE_GATE) walkCadenceBuffer.shift();

    if (!walkCadenceLocked) {
        if (walkCadenceBuffer.length >= WALK_CADENCE_GATE) {
            // Rhythm confirmed - credit the footfalls that already happened while we
            // were busy confirming the pattern, then keep counting live from here.
            walkCadenceLocked = true;
            for (let i = 0; i < WALK_CADENCE_GATE; i++) recordWalkStep();
        } else {
            setWalkStatus('Confirming your walking rhythm… (' + walkCadenceBuffer.length + '/' + WALK_CADENCE_GATE + ')', '#93C5FD');
        }
    } else {
        recordWalkStep();
    }
}

// ── Step recording (called only after the cadence gate confirms a real gait) ──
function recordWalkStep() {
    walkSteps++;
    walkLastStepMs = performance.now();

    if (!walkMoving && walkActive) {
        walkMoving = true;
        startWalkTicker();
    }
    setWalkStatus('Walking \u2714  Timer running', '#4CAF50');

    clearTimeout(walkInactivityTimer);
    walkInactivityTimer = setTimeout(pauseWalkInactivity, 3000);
    updateWalkUI();
}

// ── Timer ─────────────────────────────
function startWalkTicker() {
    if (walkInterval) clearInterval(walkInterval);
    walkInterval = setInterval(() => {
        if (!walkActive || !walkMoving) return;
        walkActiveSecs++;
        updateWalkUI();
        if (walkActiveSecs >= WALK_GOAL_SECS) finishWalk();
    }, 1000);
}

function pauseWalkInactivity() {
    if (!walkActive) return;
    walkMoving = false;
    clearInterval(walkInterval);
    walkInterval = null;
    setWalkStatus('Paused \u2014 timer stopped. Walk again to resume.', '#FFB74D');
}

// ── Accelerometer handler - physics-based, tilt- and shake-proof step detection ──
function handleWalkMotion(event) {
    if (!walkActive) return;
    // accelerationIncludingGravity is what makes gravity-vector isolation possible;
    // it's also far more widely supported across devices than gravity-free `acceleration`.
    const acc = event.accelerationIncludingGravity;
    if (!acc || acc.x == null) return;

    const rawX = acc.x || 0, rawY = acc.y || 0, rawZ = acc.z || 0;

    // 1. GRAVITY VECTOR ISOLATION - a heavy, slow-adapting low-pass filter (alpha=0.1)
    //    tracks the true gravity vector. Because it adapts slowly, a quick wrist tilt
    //    shifts the RAW reading immediately but barely moves this filtered estimate -
    //    which is exactly what stops "tilting the phone" from registering as a step.
    if (!walkGravityReady) {
        walkGravity.x = rawX; walkGravity.y = rawY; walkGravity.z = rawZ;
        walkGravityReady = true;
    } else {
        walkGravity.x = WALK_GRAVITY_ALPHA * rawX + (1 - WALK_GRAVITY_ALPHA) * walkGravity.x;
        walkGravity.y = WALK_GRAVITY_ALPHA * rawY + (1 - WALK_GRAVITY_ALPHA) * walkGravity.y;
        walkGravity.z = WALK_GRAVITY_ALPHA * rawZ + (1 - WALK_GRAVITY_ALPHA) * walkGravity.z;
    }

    // 2. LINEAR (USER) ACCELERATION - subtract the isolated gravity vector from the
    //    raw signal, leaving only the acceleration caused by the body's own movement.
    const linX = rawX - walkGravity.x;
    const linY = rawY - walkGravity.y;
    const linZ = rawZ - walkGravity.z;

    // 3. VERTICAL PROJECTION - dot the linear acceleration with the *unit* gravity
    //    vector to isolate just its component along "down": the true up/down bounce
    //    of a walking gait, independent of how the phone is tilted or rotated in the
    //    hand. Rotations and lateral shakes are largely orthogonal to gravity and
    //    mostly cancel out of this dot product instead of registering as motion.
    const gMag = Math.sqrt(walkGravity.x ** 2 + walkGravity.y ** 2 + walkGravity.z ** 2) || 1;
    const unitGx = walkGravity.x / gMag, unitGy = walkGravity.y / gMag, unitGz = walkGravity.z / gMag;
    const verticalAccel = (linX * unitGx) + (linY * unitGy) + (linZ * unitGz);

    const now = performance.now();

    // 4. PEAK-TO-TROUGH IMPACT ANALYSIS - real walking is a rhythmic wave: a positive
    //    vertical peak (the foot lifting) must be followed closely by a negative
    //    trough (the foot striking the ground). A single spike from a shake produces
    //    a peak, or a trough, but essentially never a matched, correctly-signed pair.
    const isPeak   = walkPrevV > walkPrevPrevV && walkPrevV > verticalAccel;
    const isTrough = walkPrevV < walkPrevPrevV && walkPrevV < verticalAccel;

    if (!walkAwaitingTrough && isPeak && walkPrevV > 0) {
        walkAwaitingTrough = true;
        walkPeakValue = walkPrevV;
        walkPeakTimeMs = now;
    } else if (walkAwaitingTrough) {
        if (now - walkPeakTimeMs > WALK_PEAK_TIMEOUT_MS) {
            walkAwaitingTrough = false; // trough never arrived in time - not a real step
        } else if (isTrough && walkPrevV < 0) {
            walkAwaitingTrough = false;
            const impact = walkPeakValue - walkPrevV; // full peak-to-trough swing, m/s²
            if (impact > WALK_VERTICAL_THRESH) {
                // 5. CADENCE GATE - only a rhythmic sequence of these impacts is
                //    actually credited as steps. See registerFootfall().
                registerFootfall(now);
            }
        }
    }

    walkPrevPrevV = walkPrevV;
    walkPrevV     = verticalAccel;
}


// ── iOS 13+ permission ──────────────────────────────────────
async function requestMotionPermissionIfNeeded() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try { return (await DeviceMotionEvent.requestPermission()) === 'granted'; }
        catch(e) { return false; }
    }
    return true;
}

// ── Start / Pause toggle ────────────────────────────────────
async function toggleWalk() {
    const btn  = document.getElementById('btn-walk-action');
    const icon = document.getElementById('icon-walk-action');
    const text = document.getElementById('text-walk-action');

    if (walkActive) {
        pauseWalk();
        if (btn)  btn.style.background = '#4CAF50';
        if (icon) icon.innerText = 'play_arrow';
        if (text) text.innerText = 'Resume Walk';
        setWalkStatus('Walk paused', '#93C5FD');
    } else {
        await requestMotionPermissionIfNeeded();

        // Start GPS tracking (anti-cheat)
        if (!walkGpsWatchId && navigator.geolocation) {
            walkGpsWatchId = navigator.geolocation.watchPosition(
                onWalkGpsUpdate,
                () => { /* GPS unavailable — fallback to accel-only, indoor mode */ },
                { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
            );
        }

        // Start accelerometer
        if (!walkMotionBound) {
            window.addEventListener('devicemotion', handleWalkMotion, { passive: true });
            walkMotionBound = true;
        }

        walkActive  = true;
        walkMoving  = false;
        if (btn)  btn.style.background = '#F44336';
        if (icon) icon.innerText = 'pause';
        if (text) text.innerText = 'Pause';
        setWalkStatus('Start walking \u2014 timer counts only while moving', '#93C5FD');
        updateWalkUI();
    }
}

function pauseWalk() {
    walkActive  = false;
    walkMoving  = false;
    clearInterval(walkInterval);
    walkInterval = null;
    clearTimeout(walkInactivityTimer);
}

function finishWalk() {
    pauseWalk();

    // Stop GPS watch
    if (walkGpsWatchId) {
        navigator.geolocation.clearWatch(walkGpsWatchId);
        walkGpsWatchId = null;
    }

    const overlay = document.getElementById('walk-confetti');
    if (overlay) overlay.style.display = 'flex';

    // Save real session to localStorage
    try {
        const hist = JSON.parse(localStorage.getItem('mobilityHistory') || '[]');
        hist.push({ ts: Date.now(), steps: walkSteps, activeSecs: walkActiveSecs,
                    distanceKm: ((walkSteps * WALK_STRIDE_M) / 1000).toFixed(2) });
        localStorage.setItem('mobilityHistory', JSON.stringify(hist));
    } catch(e) {}

    setTimeout(() => {
        if (overlay) overlay.style.display = 'none';
        walkActiveSecs = 0; walkSteps = 0;
        walkGpsSpeed = 0;
        walkGpsLastLat = null; walkGpsLastLon = null;
        walkGpsLastMovedMs = 0;
        // Reset step-detection state for the next session (fresh gravity estimate,
        // cleared cadence gate) rather than carrying stale readings forward.
        walkGravity = { x: 0, y: 0, z: 0 };
        walkGravityReady = false;
        walkPrevV = 0; walkPrevPrevV = 0;
        walkAwaitingTrough = false;
        walkCadenceBuffer = []; walkCadenceLocked = false;
        updateWalkUI();
        const arc = document.getElementById('walk-arc');
        if (arc) arc.style.strokeDashoffset = WALK_ARC_LEN;
        const btn  = document.getElementById('btn-walk-action');
        if (btn)  btn.style.background = '#4CAF50';
        const icon = document.getElementById('icon-walk-action');
        if (icon) icon.innerText = 'play_arrow';
        const text = document.getElementById('text-walk-action');
        if (text) text.innerText = 'Start Walk';
        setWalkStatus('Active pedometer \u2014 GPS + motion fusion, auto-pause when still', '#93C5FD');
        verifyPendingGame();
    }, 3000);
}

// ====================================================
// MODULE 4: ACCURATE REAL-TIME PROGRESS & ANALYTICS ENGINE
// ====================================================

function getAccurateProgressMetrics() {
    const routine = typeof getRoutineData === 'function' ? getRoutineData() : {
        morning_brain: false,
        hydration: false,
        water_count: 0,
        walk: false,
        afternoon_puzzle: false,
        evening_audio: false
    };

    // 1. Routine Tasks (5 total)
    let routineCompleted = 0;
    if (routine.morning_brain) routineCompleted++;
    if (routine.hydration) routineCompleted++;
    if (routine.walk) routineCompleted++;
    if (routine.afternoon_puzzle) routineCompleted++;
    if (routine.evening_audio) routineCompleted++;

    // 2. Hydration: Goal is 6 glasses
    const waterGoal = 6;
    const waterCompleted = Math.min(waterGoal, routine.water_count || 0);

    // 3. Mobility: Goal is 1 walk session (10 mins)
    const walkGoal = 1;
    const walkCompleted = routine.walk ? 1 : 0;

    // 4. Cognitive Domains:
    let scores = {};
    try {
        scores = JSON.parse(localStorage.getItem('gameScores')) || {};
    } catch(e) { scores = {}; }

    // Family Therapy quiz count
    const familyPlayed = (typeof familyQuizCount !== 'undefined' && familyQuizCount > 0) ? Math.min(4, familyQuizCount) : 0;

    // Cognitive Domain Breakdown:
    // Memory: Morning brain + Sequence(0), Grid(1), N-Back(7), Old/New(10), Recall(11)
    const memTasksTotal = 3;
    let memTasksDone = 0;
    if (routine.morning_brain) memTasksDone++;
    if (scores[0] !== undefined || scores[1] !== undefined) memTasksDone++;
    if (scores[10] !== undefined || scores[11] !== undefined) memTasksDone++;
    memTasksDone = Math.min(memTasksTotal, memTasksDone);

    // Attention & Speed: Target(2), Switch(3), Go/No-Go(8)
    const attTasksTotal = 2;
    let attTasksDone = 0;
    if (scores[2] !== undefined || scores[3] !== undefined) attTasksDone++;
    if (scores[8] !== undefined) attTasksDone++;
    attTasksDone = Math.min(attTasksTotal, attTasksDone);

    // Reasoning & Logic: Match(4), Pattern(5), Matrix(6), Rule(9), Order(12)
    const reasTasksTotal = 2;
    let reasTasksDone = 0;
    if (routine.afternoon_puzzle || scores[4] !== undefined) reasTasksDone++;
    if (scores[5] !== undefined || scores[6] !== undefined || scores[12] !== undefined) reasTasksDone++;
    reasTasksDone = Math.min(reasTasksTotal, reasTasksDone);

    // Family & Social Reminiscence:
    const famTasksTotal = 2;
    let famTasksDone = 0;
    if (familyPlayed >= 1) famTasksDone++;
    if (familyPlayed >= 3) famTasksDone++;

    // Audio Therapy & Relaxation:
    const audioTasksTotal = 1;
    const audioTasksDone = routine.evening_audio ? 1 : 0;

    // Overall Adherence Percentage (Accurately computed from 5 daily routine tasks):
    const overallPct = Math.min(100, Math.round((routineCompleted / 5) * 100));

    return {
        routineCompleted,
        routineTotal: 5,
        waterCompleted,
        waterGoal,
        walkCompleted,
        walkGoal,
        overallPct,
        cognitive: {
            "Memory & Recall": { done: memTasksDone, total: memTasksTotal },
            "Attention & Reflexes": { done: attTasksDone, total: attTasksTotal },
            "Reasoning & Executive Logic": { done: reasTasksDone, total: reasTasksTotal },
            "Family & Face Recognition": { done: famTasksDone, total: famTasksTotal },
            "Calming Audio & Breathing": { done: audioTasksDone, total: audioTasksTotal }
        }
    };
}

function updateProgressUI() {
    const metrics = getAccurateProgressMetrics();

    // 1. Home Screen Progress Widget
    const homeFill = document.getElementById('home-progress-fill');
    const homePct = document.getElementById('home-progress-pct');
    if (homeFill) {
        homeFill.style.width = `${metrics.overallPct}%`;
        homeFill.style.background = metrics.overallPct >= 80 ? '#4CAF50' : (metrics.overallPct >= 40 ? '#FFC107' : '#FF8A65');
    }
    if (homePct) {
        homePct.innerText = `${metrics.overallPct}% (${metrics.routineCompleted} / ${metrics.routineTotal} Tasks)`;
    }

    // 2. Routine Screen Progress Widget
    const rBar = document.getElementById('routine-progress-bar');
    const rText = document.getElementById('routine-progress-text');
    if (rBar) rBar.style.width = `${metrics.overallPct}%`;
    if (rText) rText.innerText = `${metrics.routineCompleted} / ${metrics.routineTotal} Completed`;
}

function renderProgressTab() {
    const metrics = getAccurateProgressMetrics();
    updateProgressUI();

    const overallPct = metrics.overallPct;

    let themeColor = '';
    if (overallPct < 40) {
        themeColor = '#FF8A65';
    } else if (overallPct <= 70) {
        themeColor = '#FFC107';
    } else {
        themeColor = '#4CAF50';
    }

    // 1. Hero Circular Ring
    const ring = document.getElementById('overall-ring');
    if (ring) {
        const radius = ring.r.baseVal.value || 70;
        const circumference = radius * 2 * Math.PI;
        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (overallPct / 100) * circumference;
        ring.style.strokeDashoffset = offset;
        ring.style.stroke = themeColor;
        ring.style.transition = 'stroke-dashoffset 0.6s ease-out, stroke 0.4s ease';
    }

    const pctText = document.getElementById('overall-percentage');
    if (pctText) {
        pctText.innerText = `${overallPct}%`;
        pctText.style.color = themeColor;
    }

    // 2. Physical & Routine Cards
    const hydText = document.getElementById('hyd-text');
    const hydBar = document.getElementById('hyd-bar');
    if (hydText) hydText.innerText = `${metrics.waterCompleted} / ${metrics.waterGoal} Glasses`;
    if (hydBar) {
        const hydPct = (metrics.waterCompleted / metrics.waterGoal) * 100;
        hydBar.style.width = `${hydPct}%`;
        hydBar.style.background = '#0288D1';
        hydBar.style.transition = 'width 0.5s ease-out';
    }

    const mobText = document.getElementById('mob-text');
    const mobBar = document.getElementById('mob-bar');
    if (mobText) mobText.innerText = `${metrics.walkCompleted} / ${metrics.walkGoal} Session`;
    if (mobBar) {
        const mobPct = (metrics.walkCompleted / metrics.walkGoal) * 100;
        mobBar.style.width = `${mobPct}%`;
        mobBar.style.background = '#FF9800';
        mobBar.style.transition = 'width 0.5s ease-out';
    }

    // 3. Cognitive Domain Breakdown
    const cogContainer = document.getElementById('cognitive-progress-list');
    if (cogContainer) {
        cogContainer.innerHTML = '';
        for (let cat in metrics.cognitive) {
            const item = metrics.cognitive[cat];
            const pct = item.total === 0 ? 0 : Math.round((item.done / item.total) * 100);
            const card = document.createElement('div');
            card.className = 'progress-card';
            card.style.background = 'white';
            card.style.borderRadius = '14px';
            card.style.padding = '14px 16px';
            card.style.marginBottom = '12px';
            card.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-weight: 700; font-size: 14px; color: #37474F;">${cat}</span>
                    <span style="font-size: 13px; font-weight: 700; color: ${pct >= 100 ? '#4CAF50' : '#00796B'};">${item.done} / ${item.total}</span>
                </div>
                <div class="bar-bg" style="width: 100%; height: 8px; background: #eee; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${pct}%; height: 100%; background: ${pct >= 100 ? '#4CAF50' : (pct >= 50 ? '#00796B' : '#FF9800')}; border-radius: 4px; transition: 0.5s ease-out;"></div>
                </div>
            `;
            cogContainer.appendChild(card);
        }
    }
}

// --- Games Menu Logic ---
const GAME_NAMES = [
    { id: 0, name: "Sequence Memory", desc: "Remember the order of shapes", icon: "&#x1F534;" },
    { id: 1, name: "Grid Memory", desc: "Recall the green squares", icon: "&#x1F7E9;" },
    { id: 2, name: "Target Detection", desc: "Tap the blue circle quickly", icon: "&#x1F535;" },
    { id: 3, name: "Attention Switching", desc: "Follow changing rules", icon: "&#x2194;&#xFE0F;" },
    { id: 4, name: "Quick Match", desc: "Find the matching animal", icon: "&#x1F431;" },
    { id: 5, name: "Pattern Completion", desc: "Find the missing number", icon: "&#x1F522;" },
    { id: 6, name: "Matrix Reasoning", desc: "Complete the visual logic", icon: "&#x1F9E9;" },
    { id: 7, name: "N-Back Memory", desc: "Match current with previous", icon: "&#x23EA;" },
    { id: 8, name: "Go/No-Go", desc: "Inhibit incorrect responses", icon: "&#x1F6A6;" },
    { id: 9, name: "Rule Learning", desc: "Learn and reverse rules", icon: "&#x1F4D6;" },
    { id: 10, name: "Memory Recognition", desc: "Identify symbols you saw", icon: "&#x1F441;&#xFE0F;" },
    { id: 11, name: "Delayed Recall", desc: "Remember the first shape", icon: "&#x23F3;" },
    { id: 12, name: "Order Planning", desc: "Sort numbers in order", icon: "&#x1F4CA;" }
];

function renderGamesList() {
    const container = document.getElementById('games-list-container');
    if (!container) return;
    container.innerHTML = '';
    
    let scores = JSON.parse(localStorage.getItem('gameScores')) || {};

    let aiProfile = null;
    try { aiProfile = JSON.parse(localStorage.getItem('neosaarthi_ai_profile')); } catch (e) {}
    let prescribedIds = (aiProfile && aiProfile.primaryDeficit && typeof AI_DOMAIN_GAMES !== 'undefined' && AI_DOMAIN_GAMES[aiProfile.primaryDeficit])
        ? AI_DOMAIN_GAMES[aiProfile.primaryDeficit] : [];

    let sortedGames = GAME_NAMES.slice().sort((a, b) => {
        let scoreA = scores[a.id] !== undefined ? scores[a.id] : 100;
        let scoreB = scores[b.id] !== undefined ? scores[b.id] : 100;
        return scoreA - scoreB;
    });
    // AI-prescribed games (this run's primary focus area) are pinned to the very top,
    // above everything else, while keeping the existing score-based order within each group.
    sortedGames.sort((a, b) => (prescribedIds.includes(b.id) ? 1 : 0) - (prescribedIds.includes(a.id) ? 1 : 0));

    sortedGames.forEach(game => {
        let score = scores[game.id];
        let tag = '';
        if (score !== undefined) {
            if (score <= 40) tag = '<span style="background: #F44336; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 10px; display: inline-block;">Must Play</span>';
            else if (score <= 70) tag = '<span style="background: #FF9800; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 10px; display: inline-block;">Recommended</span>';
            else tag = '<span style="background: #4CAF50; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 10px; display: inline-block;">Good</span>';
        }
        let aiTag = prescribedIds.includes(game.id)
            ? '<span style="background: linear-gradient(135deg,#FF8A65,#FF7043); color: white; padding: 3px 9px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 8px; display: inline-block; box-shadow: 0 0 8px rgba(255,138,101,0.55);">&#x1F3AF; AI Prescribed</span>'
            : '';

        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.padding = '15px';
        card.style.cursor = 'pointer';
        card.style.marginBottom = '10px';
        if (prescribedIds.includes(game.id)) { card.style.border = '2px solid #FF8A65'; }
        card.onclick = () => startSingleGame(game.id);

        const glGames = (langData[currentLang] && langData[currentLang].gauntlet) || langData['en'].gauntlet;
        let localizedName = (glGames && glGames['g' + game.id + '_title']) ? glGames['g' + game.id + '_title'].replace(/^[^:]+:\s*/, '') : game.name;
        card.innerHTML = `
            <div class="icon-box" style="background: #E0F2F1; color: #00796B; font-size: 24px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px;">
                ${game.icon}
            </div>
            <div style="flex: 1; margin-left: 15px; text-align: left;">
                <h3 style="color: #37474F; font-size: 16px; margin: 0 0 4px 0; display: flex; align-items: center; flex-wrap: wrap; gap: 4px;">${localizedName} ${aiTag}${tag}</h3>
                <p style="color: #78909C; font-size: 13px; margin: 0;">${game.desc}</p>
            </div>
            <span style="color: #B0BEC5;">&#x25B6;</span>
        `;
        container.appendChild(card);
    });
}

window.isSingleGame = false;
function startSingleGame(taskType) {
    showScreen('assessment-screen');
    window.savedRecallItems = ['&#x1F7E2;']; // Mock for memory game
    gauntletTimeLeft = 9999;
    document.getElementById('gauntlet-timer').style.display = 'none';
    document.getElementById('gauntlet-progress').parentElement.style.display = 'none';
    
    window.gauntletTasksQueue = [taskType];
    window.isSingleGame = true;
    currentPhase = 8; // Force medium/hard level randomly for standalone
    loadNextGauntletTask();
}

function quitAssessment() {
    window.isQuitting = true;
    clearAssessmentSnapshot(); // deliberate quit, not an accidental refresh - don't offer to resume this one
    if (typeof gauntletInterval !== 'undefined') clearInterval(gauntletInterval);
    gauntletTimeLeft = 0; // Signals local game intervals to terminate
    
    // Clear the active game area to prevent rogue clicks
    const area = document.getElementById('gauntlet-area');
    if(area) area.innerHTML = '';
    
    setTimeout(() => {
        if (window.isSingleGame) {
            window.isSingleGame = false;
            // Restore UI elements for next full assessment
            document.getElementById('gauntlet-timer').style.display = 'inline-block';
            document.getElementById('gauntlet-progress').parentElement.style.display = 'block';
            if (typeof window.routineTaskCallback === 'function') {
                window.routineTaskCallback = null;
                showScreen('routine-screen');
                return;
            }
            showScreen('game-menu-screen');
        } else {
            showScreen('home-screen');
        }
        window.isQuitting = false;
    }, 150);
}

// --- Family Targeted Therapy Module ---
const familyMembers = [
    { id: 1, name: "Kalyani (Grandmother)", relation: "Mother / Grandmother", image: "face_1.jpg", zoom: "54% 43%", desc: "Sitting center in purple sweater" },
    { id: 2, name: "Ramesh (Grandfather)", relation: "Father / Grandfather", image: "face_2.jpg", zoom: "49% 22%", desc: "Standing top-center in gold tie" },
    { id: 3, name: "Rahul (Son)", relation: "Son", image: "face_3.jpg", zoom: "42% 35%", desc: "Standing mid-left in black suit" },
    { id: 4, name: "Priya (Daughter-in-law)", relation: "Daughter-in-law", image: "face_4.jpg", zoom: "28% 42%", desc: "Sitting left in cream dress" },
    { id: 5, name: "Sunita (Daughter)", relation: "Daughter", image: "face_5.jpg", zoom: "73% 40%", desc: "Sitting right in dark navy dress" },
    { id: 6, name: "Amit (Elder Son)", relation: "Elder Son", image: "face_6.jpg", zoom: "70% 21%", desc: "Standing top-right in glasses" },
    { id: 7, name: "Kavita (Elder Daughter-in-law)", relation: "Elder Daughter-in-law", image: "face_7.jpg", zoom: "31% 26%", desc: "Standing top-left in white cardigan" }
];

function renderFamilyMenu() {
    const area = document.getElementById('family-game-area');
    if(!area) return;
    area.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 20px; width: 100%; max-width: 420px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: center;">
            <div style="width: 100%; height: 210px; border-radius: 12px; overflow: hidden; margin-bottom: 15px; border: 3px solid #FF8A65; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <img src="family_group.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
            </div>
            <h3 style="color: #37474F; margin-bottom: 8px; font-size: 22px;">Family Memory Album</h3>
            <p style="color: #78909C; margin-bottom: 20px; font-size: 14px;">Look at your family picture. Test your memory by identifying each family member!</p>
            <button onclick="startFamilyQuiz()" style="background: #FF8A65; color: white; border: none; padding: 15px 30px; font-size: 20px; border-radius: 30px; font-weight: bold; cursor: pointer; width: 100%; box-shadow: 0 4px 6px rgba(255, 138, 101, 0.3);">Start Recognition Game</button>
        </div>
    `;
}

function startFamilyQuiz() {
    const area = document.getElementById('family-game-area');
    
    // Random target
    let target = familyMembers[Math.floor(Math.random() * familyMembers.length)];
    
    // 1 correct + 2 random choices
    let others = familyMembers.filter(m => m.id !== target.id).sort(() => Math.random() - 0.5);
    let options = [target, others[0], others[1]].sort(() => Math.random() - 0.5);
    
    let html = `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 400px;">
            <!-- Group view with Zoom/Crop Focus -->
            <div style="position: relative; width: 190px; height: 190px; border-radius: 50%; overflow: hidden; border: 5px solid #FF8A65; box-shadow: 0 6px 15px rgba(0,0,0,0.15); margin-bottom: 12px; background: #fff;">
                <img src="${target.image}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            
            <div style="background: #FFF3E0; border: 1px solid #FFE0B2; border-radius: 12px; padding: 6px 16px; margin-bottom: 20px;">
                <span style="color: #E65100; font-size: 13px; font-weight: 600;">&#x1F50D; Clue: ${target.desc}</span>
            </div>

            <h2 style="color: #37474F; font-size: 24px; margin: 0 0 20px 0; font-weight: 700;">Who is this person in the family?</h2>
            
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
    `;
    
    options.forEach(opt => {
        html += `<button class="family-opt-btn" onclick="checkFamilyAnswer(${opt.id}, ${target.id}, this)" style="background: white; border: 2px solid #ddd; padding: 18px 20px; font-size: 19px; border-radius: 14px; color: #37474F; font-weight: bold; cursor: pointer; text-align: left; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: 0.2s;">
            <span style="display: block; font-size: 13px; color: #FF8A65; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">${opt.relation}</span>
            ${opt.name}
        </button>`;
    });
    
    html += `
            </div>
            
            <button onclick="renderFamilyMenu()" style="margin-top: 25px; background: none; border: none; color: #90A4AE; font-size: 14px; cursor: pointer; text-decoration: underline;">
                &#x21A9; Back to Family Album
            </button>
        </div>
    `;
    area.innerHTML = html;
}

let familyQuizScore = 0;
let familyQuizCount = 0;

function checkFamilyAnswer(selectedId, targetId, btnEl) {
    const allBtns = document.querySelectorAll('.family-opt-btn');
    allBtns.forEach(b => b.disabled = true);
    
    const targetObj = familyMembers.find(m => m.id === targetId);

    if (selectedId === targetId) {
        familyQuizScore++;
        familyQuizCount++;
        btnEl.style.background = '#E8F5E9';
        btnEl.style.borderColor = '#4CAF50';
        btnEl.innerHTML += '<span style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 26px;">&#x2705;</span>';
        
        // Show celebratory popup
        showFamilyCongratsPopup(targetObj, true);
    } else {
        familyQuizCount++;
        btnEl.style.background = '#FFEBEE';
        btnEl.style.borderColor = '#F44336';
        btnEl.innerHTML += '<span style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 26px;">&#x274C;</span>';
        
        showFamilyCongratsPopup(targetObj, false);
    }

    // Persist so the AI Cognitive Profiler's Visuospatial & Recognition domain
    // survives a page reload, not just this in-memory session.
    try { localStorage.setItem('familyQuizStats', JSON.stringify({ score: familyQuizScore, count: familyQuizCount })); } catch (e) {}
    if (typeof runAICognitiveProfiler === 'function') { try { runAICognitiveProfiler(); } catch (e) {} }
}

function showFamilyCongratsPopup(member, isCorrect) {
    // Remove existing modal if any
    const existing = document.getElementById('family-congrats-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'family-congrats-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0, 0, 0, 0.65)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.style.animation = 'fadeIn 0.25s ease-out';

    const card = document.createElement('div');
    card.style.background = 'white';
    card.style.borderRadius = '24px';
    card.style.padding = '30px 24px';
    card.style.width = '90%';
    card.style.maxWidth = '360px';
    card.style.textAlign = 'center';
    card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    card.style.transform = 'scale(0.9)';
    card.style.transition = '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    if (isCorrect) {
        card.innerHTML = `
            <div style="font-size: 60px; line-height: 1; margin-bottom: 12px; animation: bounce 0.6s ease;">&#x1F389;</div>
            <h2 style="color: #2E7D32; font-size: 26px; margin: 0 0 6px 0; font-weight: 800;">Wonderful!</h2>
            <p style="color: #666; font-size: 15px; margin: 0 0 18px 0;">You remembered correctly!</p>
            
            <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 16px; border-radius: 50%; overflow: hidden; border: 4px solid #4CAF50; box-shadow: 0 6px 14px rgba(76, 175, 80, 0.3);">
                <img src="${member.image}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <h3 style="color: #37474F; font-size: 20px; margin: 0 0 4px 0;">${member.name}</h3>
            <p style="color: #FF8A65; font-weight: 700; font-size: 14px; text-transform: uppercase; margin: 0 0 20px 0;">${member.relation}</p>
            
            <button id="next-family-btn" style="background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; border: none; padding: 14px 28px; font-size: 17px; font-weight: 700; border-radius: 30px; cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(46, 125, 50, 0.35);">
                Next Family Member &#x27A1;
            </button>
        `;
    } else {
        card.innerHTML = `
            <div style="font-size: 55px; line-height: 1; margin-bottom: 12px;">&#x1F49B;</div>
            <h2 style="color: #E65100; font-size: 24px; margin: 0 0 6px 0; font-weight: 800;">Good Try!</h2>
            <p style="color: #666; font-size: 14px; margin: 0 0 16px 0;">Here is a gentle reminder:</p>
            
            <div style="position: relative; width: 110px; height: 110px; margin: 0 auto 14px; border-radius: 50%; overflow: hidden; border: 4px solid #FF9800; box-shadow: 0 6px 14px rgba(255, 152, 0, 0.3);">
                <img src="${member.image}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <h3 style="color: #37474F; font-size: 19px; margin: 0 0 4px 0;">${member.name}</h3>
            <p style="color: #E65100; font-weight: 700; font-size: 14px; text-transform: uppercase; margin: 0 0 18px 0;">${member.relation}</p>
            
            <button id="next-family-btn" style="background: linear-gradient(135deg, #FF9800, #F57C00); color: white; border: none; padding: 14px 28px; font-size: 17px; font-weight: 700; border-radius: 30px; cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(245, 124, 0, 0.35);">
                Try Next &#x27A1;
            </button>
        `;
    }

    modal.appendChild(card);
    document.body.appendChild(modal);

    // Animate pop-in
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 20);

    document.getElementById('next-family-btn').onclick = () => {
        modal.remove();
        startFamilyQuiz();
    };
}

// ====================================================
// MODULE 3: DAILY WELLNESS ROUTINE & AUDIO THERAPY
// ====================================================

const DEFAULT_ROUTINE = {
    morning_brain: false,
    hydration: false,
    water_count: 0,
    walk: false,
    afternoon_puzzle: false,
    evening_audio: false,
    date: new Date().toDateString()
};

function getRoutineData() {
    let saved = localStorage.getItem('neosaarthi_routine_v2');
    if (!saved) return { ...DEFAULT_ROUTINE };
    try {
        let parsed = JSON.parse(saved);
        // Reset if new calendar day (ethical, realistic daily routine)
        if (parsed.date !== new Date().toDateString()) {
            return { ...DEFAULT_ROUTINE, date: new Date().toDateString() };
        }
        return parsed;
    } catch(e) {
        return { ...DEFAULT_ROUTINE };
    }
}

function saveRoutineData(data) {
    localStorage.setItem('neosaarthi_routine_v2', JSON.stringify(data));
}

function initRoutineScreen() {
    const data = getRoutineData();
    const taskMap = {
        'morning_brain': 'routine-task-morning',
        'hydration': 'routine-task-water',
        'walk': 'routine-task-walk',
        'afternoon_puzzle': 'routine-task-puzzle',
        'evening_audio': 'routine-task-audio'
    };

    let completedCount = 0;
    for (let key in taskMap) {
        const el = document.getElementById(taskMap[key]);
        if (el) {
            if (data[key]) {
                el.classList.add('done');
                completedCount++;
            } else {
                el.classList.remove('done');
            }
        }
    }

    // Hydration glass text
    const waterDesc = document.getElementById('routine-water-desc');
    if (waterDesc) {
        waterDesc.innerHTML = `11:00 AM &bull; ${data.water_count} / 6 Glasses Tracked Today`;
    }

    // Progress counter and bar
    const progText = document.getElementById('routine-progress-text');
    if (progText) {
        progText.innerText = `${completedCount} / 5 Completed`;
    }

    const progBar = document.getElementById('routine-progress-bar');
    if (progBar) {
        progBar.style.width = `${(completedCount / 5) * 100}%`;
    }
}

function markRoutineTaskDone(taskKey) {
    const data = getRoutineData();
    data[taskKey] = true;
    saveRoutineData(data);
    initRoutineScreen();
    playGentleChime();
}

function resetRoutineTasks() {
    const fresh = { ...DEFAULT_ROUTINE, date: new Date().toDateString() };
    saveRoutineData(fresh);
    initRoutineScreen();
    playGentleChime();
}

// --- ETHICAL MODAL & INTERACTION HANDLERS ---

function handleRoutineClick(taskKey) {
    const data = getRoutineData();
    
    if (taskKey === 'morning_brain') {
        showRoutineActionModal({
            icon: '&#x1F9E0;',
            badge: 'Prospective Memory Check',
            title: 'Morning Brain Warmup',
            desc: '<strong>Active Retrieval Practice:</strong> Take 10 seconds to recall: What day is today, and what is one goal you have? Actively retrieving memories primes your prefrontal cortex before playing your warmup game.',
            isDone: data.morning_brain,
            primaryBtnText: 'Play Quick Memory Game &#x25B6;',
            onPrimary: () => {
                closeRoutineModal();
                window.routineTaskCallback = () => {
                    markRoutineTaskDone('morning_brain');
                    showScreen('routine-screen');
                    showRoutineCongrats('Brain Warmup Complete! Great job actively challenging your working memory.');
                };
                startSingleGame(0); // Sequence Memory
            },
            onOffline: () => {
                closeRoutineModal();
                markRoutineTaskDone('morning_brain');
                showRoutineCongrats('Memory check-in logged! Daily self-recall keeps neural pathways active.');
            }
        });
    } else if (taskKey === 'hydration') {
        showHydrationModal();
    } else if (taskKey === 'walk') {
        showRoutineActionModal({
            icon: '&#x1F6B6;',
            badge: 'Mental Navigation & Movement',
            title: 'Gentle Walk & Movement',
            desc: '<strong>Spatial Recall Exercise:</strong> Can you mentally picture the route of your walk or garden stroll? Mental navigation exercises the parietal and hippocampal regions of the brain.',
            isDone: data.walk,
            primaryBtnText: 'Start Walk Tracker &#x25B6;',
            onPrimary: () => {
                closeRoutineModal();
                showScreen('walk-screen');
            },
            onOffline: () => {
                closeRoutineModal();
                markRoutineTaskDone('walk');
                showRoutineCongrats('Movement logged! Light movement increases oxygen and blood flow to memory centers.');
            }
        });
    } else if (taskKey === 'afternoon_puzzle') {
        showRoutineActionModal({
            icon: '&#x1F9E9;',
            badge: 'Working Memory Refresh',
            title: 'Afternoon Mind Refresh',
            desc: '<strong>Visual Recognition Check:</strong> A quick, relaxing matching game to counteract afternoon fatigue and train visual attention.',
            isDone: data.afternoon_puzzle,
            primaryBtnText: 'Play Quick Match &#x25B6;',
            onPrimary: () => {
                closeRoutineModal();
                window.routineTaskCallback = () => {
                    markRoutineTaskDone('afternoon_puzzle');
                    showScreen('routine-screen');
                    showRoutineCongrats('Afternoon Refresh Complete! Active visual discrimination strengthens memory.');
                };
                startSingleGame(4); // Animal Quick Match
            },
            onOffline: () => {
                closeRoutineModal();
                markRoutineTaskDone('afternoon_puzzle');
                showRoutineCongrats('Logged! Taking time for mental stimulation keeps the day balanced.');
            }
        });
    } else if (taskKey === 'evening_audio') {
        showAudioTherapyModal();
    }
}

function closeRoutineModal() {
    const existing = document.getElementById('routine-action-modal');
    if (existing) existing.remove();
}

function showRoutineActionModal(config) {
    closeRoutineModal();

    const modal = document.createElement('div');
    modal.id = 'routine-action-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';
    modal.style.animation = 'fadeIn 0.2s ease-out';

    modal.innerHTML = `
        <div style="background: white; border-radius: 24px; padding: 26px 22px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.25);">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: #E0F2F1; color: #00796B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 12px;">
                <span class="material-symbols-rounded" style="font-size: 15px;">psychology</span> ${config.badge || 'Cognitive Scaffolding'}
            </div>
            
            <div style="font-size: 48px; margin-bottom: 8px;">${config.icon}</div>
            <h2 style="color: #37474F; font-size: 21px; margin: 0 0 8px 0; font-weight: 800;">${config.title}</h2>
            <p style="color: #555; font-size: 13.5px; margin: 0 0 20px 0; line-height: 1.5;">${config.desc}</p>
            
            ${config.isDone ? `
                <div style="background: #E8F5E9; color: #2E7D32; padding: 10px; border-radius: 14px; font-weight: bold; margin-bottom: 16px; font-size: 14px;">
                    &#x2705; Already completed for today!
                </div>
            ` : ''}

            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="routine-modal-primary" style="background: #00796B; color: white; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,121,107,0.3);">
                    ${config.primaryBtnText}
                </button>
                
                <button id="routine-modal-offline" style="background: #F1F8E9; border: 2px solid #81C784; color: #2E7D32; padding: 13px; font-size: 14px; font-weight: 700; border-radius: 16px; cursor: pointer;">
                    &#x2714; Mark as Done (Self-Reflected Offline)
                </button>
                
                <button onclick="closeRoutineModal()" style="background: none; border: none; color: #90A4AE; padding: 8px; font-size: 13px; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('routine-modal-primary').onclick = config.onPrimary;
    document.getElementById('routine-modal-offline').onclick = config.onOffline;
}

// --- COGNITIVE SCAFFOLDING HYDRATION RECALL MODAL ---

function showHydrationModal() {
    closeRoutineModal();
    const data = getRoutineData();

    const modal = document.createElement('div');
    modal.id = 'routine-action-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';

    modal.innerHTML = `
        <div style="background: white; border-radius: 24px; padding: 26px 20px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.25);">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: #E0F2F1; color: #00796B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 10px;">
                <span class="material-symbols-rounded" style="font-size: 15px;">psychology</span> Active Recall Check
            </div>
            
            <div style="font-size: 44px; margin-bottom: 4px;">&#x1F4A7;</div>
            <h2 style="color: #0277BD; font-size: 21px; margin: 0 0 6px 0; font-weight: 800;">Hydration & Memory</h2>
            <p style="color: #555; font-size: 13.5px; margin: 0 0 16px 0; line-height: 1.4;">
                <strong>Test your recent memory:</strong> Can you recall when you last drank a glass of water today?
            </p>

            <!-- Active Retrieval Buttons -->
            <div id="recall-options-box" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                <button class="recall-btn" onclick="submitHydrationRecall('recent', this)" style="background: #F1F8E9; border: 2px solid #AED581; color: #33691E; padding: 11px 14px; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; text-align: left; transition: 0.2s;">
                    &#x2600;&#xFE0F; Recently (Past 1-2 hours)
                </button>
                <button class="recall-btn" onclick="submitHydrationRecall('meal', this)" style="background: #FFF8E1; border: 2px solid #FFE082; color: #F57F17; padding: 11px 14px; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; text-align: left; transition: 0.2s;">
                    &#x1F374; Around mealtime earlier
                </button>
                <button class="recall-btn" onclick="submitHydrationRecall('not_sure', this)" style="background: #E3F2FD; border: 2px solid #90CAF9; color: #0D47A1; padding: 11px 14px; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; text-align: left; transition: 0.2s;">
                    &#x1F914; Not sure / Need a fresh glass now!
                </button>
            </div>

            <!-- Recall Feedback Box -->
            <div id="recall-feedback-box" style="display: none; background: #E8F5E9; border: 1px solid #A5D6A7; border-radius: 12px; padding: 10px 12px; margin-bottom: 14px; font-size: 12.5px; color: #2E7D32; line-height: 1.4; text-align: left;">
                <strong>&#x1F9E0; Brain Stimulated!</strong> Actively reflecting on recent events exercises your episodic memory and strengthens hippocampal recall.
            </div>
            
            <div style="background: #F1F8E9; border-radius: 14px; padding: 10px 14px; margin-bottom: 14px; border: 1px solid #C5E1A5; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; color: #33691E; font-weight: 700;">Glasses Tracked Today:</span>
                <span id="modal-water-count" style="font-size: 20px; font-weight: 800; color: #0277BD;">${data.water_count} / 6</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="btn-drink-water" style="background: linear-gradient(135deg, #0288D1, #01579B); color: white; border: none; padding: 14px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(2,136,209,0.3);">
                    &#x1F4A7; Log Glass & Check Off Task
                </button>
                
                <button onclick="closeRoutineModal()" style="background: none; border: none; color: #90A4AE; padding: 6px; font-size: 13px; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('btn-drink-water').onclick = () => {
        const cur = getRoutineData();
        cur.water_count = (cur.water_count || 0) + 1;
        cur.hydration = true;
        saveRoutineData(cur);
        initRoutineScreen();
        playGentleWaterDropSound();
        closeRoutineModal();
        showRoutineCongrats('Recall & Hydration Tracked! Self-reflection and hydration both keep your brain resilient.');
    };
}

function submitHydrationRecall(choice, btn) {
    document.querySelectorAll('.recall-btn').forEach(b => {
        b.style.opacity = '0.4';
        b.style.pointerEvents = 'none';
    });
    btn.style.opacity = '1';
    btn.style.borderColor = '#2E7D32';
    btn.style.borderWidth = '3px';
    const fb = document.getElementById('recall-feedback-box');
    if (fb) {
        fb.style.display = 'block';
        playGentleChime();
    }
}


// --- AUDIO THERAPY & CALMING SOUNDSCAPE MODULE ---

let activeAudioNodes = null;
let breathingInterval = null;

function showAudioTherapyModal() {
    closeRoutineModal();
    const data = getRoutineData();

    const modal = document.createElement('div');
    modal.id = 'routine-action-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(10, 25, 47, 0.85)';
    modal.style.backdropFilter = 'blur(8px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';

    modal.innerHTML = `
        <div style="background: #1A2B42; color: white; border-radius: 28px; padding: 30px 22px; width: 92%; max-width: 400px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 40px; margin-bottom: 6px;">&#x1F3A7;</div>
            <h2 style="color: #90CAF9; font-size: 22px; margin: 0 0 6px 0; font-weight: 800;">Evening Audio Therapy</h2>
            <p style="color: #B0BEC5; font-size: 13px; margin: 0 0 20px 0;">Soothing soundscapes & guided breathing to ease evening restlessness and support deep sleep.</p>

            <!-- Breathing Circle -->
            <div style="position: relative; width: 170px; height: 170px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                <div id="breathing-ring" style="position: absolute; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle, rgba(100,181,246,0.35) 0%, rgba(30,136,229,0.1) 70%); border: 3px solid #64B5F6; transition: 4s ease-in-out;"></div>
                <div id="breathing-text" style="position: relative; z-index: 2; font-size: 17px; font-weight: 700; color: white;">Breathe In</div>
            </div>

            <!-- Sound Selection -->
            <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 22px;">
                <button class="sound-chip active-chip" onclick="switchSoundscape('rain', this)" style="background: #283E58; color: #90CAF9; border: 1px solid #64B5F6; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">
                    &#x1F327;&#xFE0F; Rain
                </button>
                <button class="sound-chip" onclick="switchSoundscape('bowl', this)" style="background: #283E58; color: #B0BEC5; border: 1px solid rgba(255,255,255,0.15); padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">
                    &#x1F9D8; Singing Bowl
                </button>
                <button class="sound-chip" onclick="switchSoundscape('flute', this)" style="background: #283E58; color: #B0BEC5; border: 1px solid rgba(255,255,255,0.15); padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">
                    &#x1FA84; Flute Drone
                </button>
            </div>

            <!-- Audio Toggle & Complete -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button id="btn-toggle-sound" onclick="toggleSoundscapePlay()" style="background: #0288D1; color: white; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span id="sound-play-icon">&#x25B6;</span> <span id="sound-play-text">Start Calming Soundscape</span>
                </button>

                <button onclick="finishAudioTherapySession()" style="background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(76,175,80,0.3);">
                    &#x2714; Complete Session & Mark Done
                </button>

                <button onclick="closeAudioTherapyModal()" style="background: none; border: none; color: #90A4AE; padding: 8px; font-size: 13px; cursor: pointer;">
                    Exit
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    startBreathingAnimation();
}

function closeAudioTherapyModal() {
    stopSoundscape();
    if (breathingInterval) clearInterval(breathingInterval);
    closeRoutineModal();
}

function finishAudioTherapySession() {
    stopSoundscape();
    if (breathingInterval) clearInterval(breathingInterval);
    closeRoutineModal();
    markRoutineTaskDone('evening_audio');
    showRoutineCongrats('Evening Relaxation Complete! May you have a peaceful, deep, and restful night.');
}

function startBreathingAnimation() {
    if (breathingInterval) clearInterval(breathingInterval);
    const ring = document.getElementById('breathing-ring');
    const text = document.getElementById('breathing-text');
    if (!ring || !text) return;

    let state = 0; // 0: inhale (4s), 1: hold (2s), 2: exhale (4s), 3: rest (2s)
    function cycle() {
        if (!document.getElementById('breathing-ring')) {
            clearInterval(breathingInterval);
            return;
        }
        if (state === 0) {
            text.innerText = 'Breathe In...';
            ring.style.transform = 'scale(1.4)';
            ring.style.opacity = '1';
            setTimeout(cycle, 4000);
            state = 1;
        } else if (state === 1) {
            text.innerText = 'Hold Gently...';
            setTimeout(cycle, 2000);
            state = 2;
        } else if (state === 2) {
            text.innerText = 'Slowly Breathe Out...';
            ring.style.transform = 'scale(1.0)';
            ring.style.opacity = '0.6';
            setTimeout(cycle, 4000);
            state = 3;
        } else {
            text.innerText = 'Rest...';
            setTimeout(cycle, 2000);
            state = 0;
        }
    }
    cycle();
}

// --- WEB AUDIO API REAL-TIME SYNTHESIS (Zero External File Dependencies) ---
let audioCtx = null;
let currentSoundType = 'rain';
let isSoundPlaying = false;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function switchSoundscape(type, btn) {
    currentSoundType = type;
    document.querySelectorAll('.sound-chip').forEach(b => {
        b.style.color = '#B0BEC5';
        b.style.borderColor = 'rgba(255,255,255,0.15)';
    });
    if (btn) {
        btn.style.color = '#90CAF9';
        btn.style.borderColor = '#64B5F6';
    }
    if (isSoundPlaying) {
        stopSoundscape();
        startSoundscape(currentSoundType);
    }
}

function toggleSoundscapePlay() {
    if (isSoundPlaying) {
        stopSoundscape();
        const icon = document.getElementById('sound-play-icon');
        const text = document.getElementById('sound-play-text');
        if (icon) icon.innerText = '&#x25B6;';
        if (text) text.innerText = 'Start Calming Soundscape';
    } else {
        startSoundscape(currentSoundType);
        const icon = document.getElementById('sound-play-icon');
        const text = document.getElementById('sound-play-text');
        if (icon) icon.innerText = '&#x23F8;';
        if (text) text.innerText = 'Pause Soundscape';
    }
}

function startSoundscape(type) {
    try {
        const ctx = getAudioContext();
        stopSoundscape();
        isSoundPlaying = true;

        if (type === 'rain') {
            // Synthesized Pink Noise with low-pass filter
            const bufferSize = ctx.sampleRate * 2;
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            let b0 = 0, b1 = 0, b2 = 0;
            for (let i = 0; i < bufferSize; i++) {
                let white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                output[i] = (b0 + b1 + b2) * 0.08;
            }
            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 1.5);

            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            whiteNoise.start();

            activeAudioNodes = { source: whiteNoise, gain: gain };
        } else if (type === 'bowl') {
            // Harmonic Singing Bowl tones (216Hz, 432Hz)
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sine'; osc1.frequency.setValueAtTime(216, ctx.currentTime);
            osc2.type = 'sine'; osc2.frequency.setValueAtTime(432, ctx.currentTime);

            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start();
            osc2.start();

            activeAudioNodes = { source: osc1, source2: osc2, gain: gain };
        } else if (type === 'flute') {
            // Warm Tanpura / Meditative Flute Drone (144Hz with gentle tremolo)
            const osc = ctx.createOscillator();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(144, ctx.currentTime);

            lfo.frequency.setValueAtTime(4.5, ctx.currentTime);
            lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
            lfo.connect(osc.frequency);

            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            lfo.start();

            activeAudioNodes = { source: osc, lfo: lfo, gain: gain };
        }
    } catch(e) {
        console.log('Audio Context Error:', e);
    }
}

function stopSoundscape() {
    isSoundPlaying = false;
    if (activeAudioNodes && audioCtx) {
        try {
            if (activeAudioNodes.gain) {
                activeAudioNodes.gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            }
            setTimeout(() => {
                if (activeAudioNodes && activeAudioNodes.source) {
                    try { activeAudioNodes.source.stop(); } catch(e) {}
                }
                if (activeAudioNodes && activeAudioNodes.source2) {
                    try { activeAudioNodes.source2.stop(); } catch(e) {}
                }
                if (activeAudioNodes && activeAudioNodes.lfo) {
                    try { activeAudioNodes.lfo.stop(); } catch(e) {}
                }
                activeAudioNodes = null;
            }, 350);
        } catch(e) {
            activeAudioNodes = null;
        }
    }
}

function playGentleChime() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio Love/Healing tone
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.9);
    } catch(e) {}
}

function playGentleWaterDropSound() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    } catch(e) {}
}

function showRoutineCongrats(message) {
    const existing = document.getElementById('routine-congrats-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'routine-congrats-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10001';
    modal.style.animation = 'fadeIn 0.2s ease-out';

    modal.innerHTML = `
        <div style="background: white; border-radius: 24px; padding: 28px 24px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.25);">
            <div style="font-size: 55px; margin-bottom: 12px;">&#x1F31F;</div>
            <h2 style="color: #00796B; font-size: 22px; margin: 0 0 8px 0; font-weight: 800;">Wonderful Progress!</h2>
            <p style="color: #555; font-size: 15px; margin: 0 0 22px 0; line-height: 1.5;">${message}</p>
            
            <button onclick="document.getElementById('routine-congrats-modal').remove()" style="background: #00796B; color: white; border: none; padding: 14px 28px; font-size: 16px; font-weight: bold; border-radius: 24px; cursor: pointer; width: 100%; box-shadow: 0 4px 10px rgba(0,121,107,0.3);">
                Continue Routine &#x2714;
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}
