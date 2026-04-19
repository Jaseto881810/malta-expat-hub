/**
 * MALTA EXPAT GUIDE - MASTER COMPONENT CONTROLLER
 * This file manages the Sidebar, Mobile Menu, and AI Translation globally.
 */

const apiKey = ""; // Gemini API Key

// 1. THE MASTER MENU NAVIGATION
// Add new pages here once, and they appear everywhere!
const navigationLinks = [
    { label: "🏠 Home", href: "/index.html" },
    { label: "🚀 Getting Started", href: "/getting-started.html" },
    { 
        label: "🛂 Expat Info", 
        id: "expat-menu", 
        sublinks: [
            { label: "Benefits and Allowances", href: "/expat-info/benefits-allowances.html" },
            { label: "Consumer Rights", href: "/expat-info/consumer-rights.html" },
            { label: "Driving License", href: "/expat-info/driving-license.html" },
            { label: "Embassies in Malta", href: "/expat-info/embassies.html" },
            { label: "Employment in Malta", href: "/expat-info/employment.html" },
            { label: "Healthcare", href: "/expat-info/healthcare.html" },
            { label: "International Money Transfers", href: "/expat-info/money-transfers.html" },
            { label: "Permits and IDs", href: "/expat-info/permits-ids.html" },
            { label: "Policing", href: "/expat-info/policing.html" },
            { label: "Raising Children in Malta", href: "/expat-info/raising-children.html" },
            { label: "Taxation", href: "/expat-info/taxation.html" },
            { label: "Voting and Elections", href: "/expat-info/voting-elections.html" }
        ]
    },
    {
        label: "ℹ️ Basic Info",
        id: "basic-menu",
        sublinks: [
            { label: "Local Etiquette", href: "/basic-info/etiquette.html" },
            { label: "Local Drinks", href: "/basic-info/drinks.html" },
            { label: "Languages", href: "/basic-info/languages.html" },
            { label: "Local Food and Snacks", href: "/basic-info/food-snacks.html" },
            { label: "Local News Sources", href: "/basic-info/news.html" },
            { label: "Maltese Customs", href: "/basic-info/customs.html" },
            { label: "Political Landscapes", href: "/basic-info/politics.html" },
            { label: "Professional Sports in Malta", href: "/basic-info/sports.html" },
            { label: "Public Holidays", href: "/basic-info/holidays.html" },
            { label: "Religion", href: "/basic-info/religion.html" }
        ]
    },
    {
        label: "🏠 Accommodation",
        id: "housing-menu",
        sublinks: [
            { label: "Buying Properties", href: "/accommodation/buying.html" },
            { label: "Housing Authority", href: "/accommodation/authority.html" },
            { label: "Mortgages", href: "/accommodation/mortgages.html" },
            { label: "Renting Properties", href: "/accommodation/renting.html" }
        ]
    },
    {
        label: "🎓 Education",
        id: "edu-menu",
        sublinks: [
            { label: "Higher Education", href: "/education/higher-education.html" },
            { label: "High Schools", href: "/education/high-schools.html" },
            { label: "International Schools", href: "/education/international-schools.html" },
            { label: "Language Schools", href: "/education/language-schools.html" },
            { label: "Nursery Schools", href: "/education/nursery-schools.html" },
            { label: "Primary Schools", href: "/education/primary-schools.html" }
        ]
    },
    {
        label: "🏥 Services",
        id: "serv-menu",
        sublinks: [
            { label: "Car Insurance", href: "/services/car-insurance.html" },
            { label: "Health Insurance", href: "/services/health-insurance.html" },
            { label: "Household Insurance", href: "/services/household-insurance.html" },
            { label: "Internet and Mobile Services", href: "/services/internet-mobile.html" },
            { label: "Investment and Pensions", href: "/services/investment-pensions.html" },
            { label: "Moving Companies", href: "/services/moving-companies.html" },
            { label: "Water Delivery", href: "/services/water-delivery.html" }
        ]
    },
    { label: "🛡️ Safety in Malta", href: "/safety.html" },
    {
        label: "☀️ Lifestyle",
        id: "life-menu",
        sublinks: [
            { label: "Gyms and Fitness Clubs", href: "/lifestyle/gyms.html" },
            { label: "Annual Festivals", href: "/lifestyle/festivals.html" },
            { label: "Beach Clubs", href: "/lifestyle/beach-clubs.html" },
            { label: "Boat Rentals", href: "/lifestyle/boat-rentals.html" },
            { label: "Movie Theatres", href: "/lifestyle/movie-theatres.html" },
            { label: "Nightlife", href: "/lifestyle/nightlife.html" },
            { label: "Paceville", href: "/lifestyle/paceville.html" },
            { label: "Popular Restaurants", href: "/lifestyle/restaurants.html" },
            { label: "Shopping Malls", href: "/lifestyle/shopping-malls.html" },
            { label: "Sports Clubs", href: "/lifestyle/sports-clubs.html" }
        ]
    },
    {
        label: "📍 Locations",
        id: "loc-menu",
        sublinks: [
            { label: "Gozo", href: "/locations/gozo.html" },
            { label: "Hiking", href: "/locations/hiking.html" },
            { label: "Historical Locations", href: "/locations/historical.html" },
            { label: "Swimming", href: "/locations/swimming.html" },
            { label: "Towns", href: "/locations/towns.html" },
            { label: "Tourist Locations", href: "/locations/tourists.html" },
            { label: "Trips to Sicily", href: "/locations/sicily.html" }
        ]
    }
];

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
    { code: 'pt-br', name: 'Português', flag: '🇧🇷' }
];

// 2. INJECT UI COMPONENTS
function injectLayout() {
    const body = document.body;
    
    // Create Sidebar Structure
    const sidebarHTML = `
        <div id="mobile-header" class="lg:hidden bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-[60] shadow-sm">
            <div class="text-xl font-bold text-[#003366]"><span class="text-[#CF142B]">Malta</span> Expat Guide</div>
            <button onclick="toggleMobileMenu()" class="text-slate-600 p-2 border rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>

        <aside id="sidebar" class="fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 lg:sticky lg:flex w-full lg:w-80 bg-white border-r border-slate-200 flex flex-col z-[100] transition-transform duration-300 h-screen">
            <div class="p-6 border-b flex justify-between items-center bg-white shrink-0">
                <div class="text-2xl font-bold text-[#003366]"><span class="text-[#CF142B]">Malta</span> Expat Guide</div>
                <button onclick="toggleMobileMenu()" class="lg:hidden text-slate-400 p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <nav id="nav-scroll" class="p-4 space-y-1 flex-grow overflow-y-auto">
                <!-- ✨ AI Expat Assistant Button -->
                <button onclick="toggleAiModal()" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 font-bold mb-4 hover:shadow-md transition">
                    <span>✨</span> AI Expat Assistant
                </button>

                ${navigationLinks.map(link => {
                    if (link.sublinks) {
                        return `
                            <div class="mb-1">
                                <button onclick="toggleMenu('${link.id}')" class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition text-left font-medium">
                                    <span class="flex items-center gap-3">${link.label}</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div id="${link.id}" class="submenu hidden pl-10 space-y-1 text-sm border-l ml-6 mt-1 border-slate-100">
                                    ${link.sublinks.map(sub => `<a href="${sub.href}" class="block py-2 text-slate-500 hover:text-[#CF142B] transition">${sub.label}</a>`).join('')}
                                </div>
                            </div>
                        `;
                    }
                    return `<a href="${link.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition font-medium">${link.label}</a>`;
                }).join('')}
            </nav>

            <div class="p-6 border-t bg-white shrink-0">
                <button onclick="toggleLangModal()" class="w-full bg-[#003366] text-white p-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#002244] transition">
                    🌐 Switch Language
                </button>
            </div>
        </aside>
        <div id="sidebarOverlay" class="fixed inset-0 bg-black/50 z-[90] hidden" onclick="toggleMobileMenu()"></div>
    `;

    // Language Modal HTML
    const modalHTML = `
        <div id="langModal" class="fixed inset-0 bg-slate-900/60 z-[110] hidden items-center justify-center p-4 backdrop-blur-sm" onclick="toggleLangModal()">
            <div class="bg-white rounded-[2rem] p-8 md:p-10 max-w-2xl w-full shadow-2xl relative" onclick="event.stopPropagation()">
                <button onclick="toggleLangModal()" class="absolute top-6 right-6 text-slate-400"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                <h2 class="text-2xl font-bold mb-6 text-[#003366]">Select Language</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    ${languages.map(l => `<button onclick="changeLang('${l.code}', '${l.name}')" class="p-4 border rounded-2xl hover:border-[#CF142B] transition-all text-left flex items-center gap-3 font-medium"><span>${l.flag}</span> ${l.name}</button>`).join('')}
                </div>
            </div>
        </div>

        <!-- AI Assistant Modal Placeholder -->
        <div id="aiModal" class="fixed inset-0 bg-slate-900/60 z-[110] hidden items-center justify-center p-4 backdrop-blur-sm" onclick="toggleAiModal()">
            <div class="bg-white rounded-[2rem] p-6 md:p-8 max-w-2xl w-full h-[80vh] shadow-2xl relative flex flex-col" onclick="event.stopPropagation()">
                <button onclick="toggleAiModal()" class="absolute top-6 right-6 text-slate-400"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                <div class="flex items-center gap-3 mb-6"><div class="bg-blue-600 text-white p-3 rounded-2xl">✨</div><div><h2 class="text-xl font-bold text-[#003366]">Expat Assistant</h2><p class="text-xs text-slate-400">Powered by Gemini AI</p></div></div>
                <div id="ai-chat-history" class="flex-grow overflow-y-auto space-y-4 mb-6 p-2 scroll-smooth"><div class="bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm max-w-[85%] border border-slate-100">Hello! I'm your AI guide for Malta. Ask me anything about visas, the Skills Pass, or local life.</div></div>
                <div class="flex gap-2"><input type="text" id="ai-user-input" placeholder="Type your question..." class="flex-grow bg-slate-100 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" onkeypress="if(event.key === 'Enter') sendAiMessage()"><button onclick="sendAiMessage()" id="ai-send-btn" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition">Send</button></div>
            </div>
        </div>
    `;

    // Inject into page
    const wrapper = document.createElement('div');
    wrapper.innerHTML = sidebarHTML + modalHTML;
    body.prepend(wrapper);
}

// 3. LOGIC FUNCTIONS
window.toggleMenu = (id) => document.getElementById(id).classList.toggle('hidden');
window.toggleLangModal = () => document.getElementById('langModal').classList.toggle('hidden');
window.toggleAiModal = () => document.getElementById('aiModal').classList.toggle('hidden');
window.toggleMobileMenu = () => {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
    document.getElementById('sidebarOverlay').classList.toggle('hidden');
    document.body.style.overflow = document.getElementById('sidebarOverlay').classList.contains('hidden') ? 'auto' : 'hidden';
};

// 4. AI TRANSLATION ENGINE
async function changeLang(code, name) {
    localStorage.setItem('user_lang', code);
    toggleLangModal();
    
    if (code === 'en') {
        location.reload();
        return;
    }

    const blocks = document.querySelectorAll('.content-block');
    blocks.forEach(b => b.style.opacity = '0.5');
    
    for (let block of blocks) {
        try {
            const originalText = block.innerHTML;
            const prompt = `Translate the following HTML content of a Malta Expat Guide to ${name}. Keep the HTML tags (like <b>, <p>, <h3>) exactly as they are. Only translate the text: \n\n ${originalText}`;
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await response.json();
            const translated = data.candidates[0].content.parts[0].text;
            block.innerHTML = translated;
            block.style.opacity = '1';
        } catch (e) {
            console.error("Translation failed for block", e);
            block.style.opacity = '1';
        }
    }
}

// AI Chatbot Helper
window.sendAiMessage = async () => {
    const input = document.getElementById('ai-user-input');
    const history = document.getElementById('ai-chat-history');
    const userText = input.value.trim();
    if (!userText) return;
    
    const userDiv = document.createElement('div');
    userDiv.className = "bg-blue-600 text-white p-4 rounded-2xl text-sm max-w-[85%] self-end ml-auto";
    userDiv.innerText = userText;
    history.appendChild(userDiv);
    input.value = "";
    
    const botDiv = document.createElement('div');
    botDiv.className = "bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm max-w-[85%] border border-slate-100 italic";
    botDiv.innerText = "Typing...";
    history.appendChild(botDiv);
    history.scrollTop = history.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: userText }] }],
                systemInstruction: { parts: [{ text: "You are a professional Malta expat consultant. Answer using 2026 data. Be helpful and clear." }] }
            })
        });
        const data = await response.json();
        botDiv.innerText = data.candidates[0].content.parts[0].text;
        botDiv.classList.remove('italic');
    } catch (e) {
        botDiv.innerText = "Sorry, I'm having trouble connecting right now.";
    }
    history.scrollTop = history.scrollHeight;
};

// Auto-run on load
window.addEventListener('DOMContentLoaded', () => {
    injectLayout();
    const savedLang = localStorage.getItem('user_lang');
    if (savedLang && savedLang !== 'en') {
        const langObj = languages.find(l => l.code === savedLang);
        if(langObj) changeLang(savedLang, langObj.name);
    }
});
