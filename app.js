const hubData = {
    languages: [
        { id: 'en', name: 'English', flag: '🇬🇧' },
        { id: 'it', name: 'Italiano', flag: '🇮🇹' },
        { id: 'es', name: 'Español', flag: '🇪🇸' },
        { id: 'fr', name: 'Français', flag: '🇫🇷' },
        { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { id: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { id: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
        { id: 'tl', name: 'Filipino', flag: '🇵🇭' },
        { id: 'pt-br', name: 'Português', flag: '🇧🇷' }
    ],
    sections: [
        { id: 'getting-started', icon: '🚀', title: { en: 'Getting Started', pa: 'ਸ਼ੁਰੂ ਕਰਨਾ', hi: 'शुरू करना', 'pt-br': 'Primeiros Passos' } },
        { id: 'expat-info', icon: '🛂', title: { en: 'Expat Info', it: 'Info Espatriati', tl: 'Impormasyon sa Expat' } },
        { id: 'basic-info', icon: '🇲🇹', title: { en: 'Basic Info', fr: 'Infos de Base', de: 'Basisinfos' } },
        { id: 'accommodation', icon: '🏠', title: { en: 'Accommodation', es: 'Alojamiento', pa: 'ਰਿਹਾਇਸ਼' } },
        { id: 'education', icon: '🎓', title: { en: 'Education', hi: 'शिक्षा', tl: 'Edukasyon' } },
        { id: 'services', icon: '🏥', title: { en: 'Services', it: 'Servizi', 'pt-br': 'Serviços' } },
        { id: 'safety', icon: '🛡️', title: { en: 'Safety', es: 'Seguridad', de: 'Sicherheit' } },
        { id: 'lifestyle', icon: '☀️', title: { en: 'Lifestyle', fr: 'Mode de vie', hi: 'जीवन शैली' } },
        { id: 'locations', icon: '📍', title: { en: 'Locations', pa: 'ਟਿਕਾਣੇ', tl: 'Mga Lokasyon' } },
        { id: 'community', icon: '🤝', title: { en: 'Community', it: 'Comunità', 'pt-br': 'Comunidade' } }
    ]
};

let activeLang = 'en';

/** Initialize Grid */
function renderContent() {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = hubData.sections.map(section => `
        <div onclick="openSection('${section.id}')" class="bg-white p-10 rounded-[2rem] sun-shadow border border-orange-50 hover:border-[#CF142B] transition-all cursor-pointer group">
            <div class="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">${section.icon}</div>
            <h3 class="text-2xl font-bold text-[#003366] mb-3">${section.title[activeLang] || section.title['en']}</h3>
            <div class="flex items-center gap-2 text-[#CF142B] font-bold text-sm uppercase tracking-widest">
                Learn More <span>→</span>
            </div>
        </div>
    `).join('');

    // Render Language Options in Modal
    const langOptions = document.getElementById('langOptions');
    langOptions.innerHTML = hubData.languages.map(l => `
        <button onclick="setLanguage('${l.id}', '${l.name}')" class="lang-card p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all">
            <span class="text-2xl">${l.flag}</span>
            <span class="font-bold text-sm text-[#003366]">${l.name}</span>
        </button>
    `).join('');
}

/** Navigation Functions */
window.openSection = function(id) {
    document.getElementById('hero').classList.remove('active-view');
    document.getElementById('main-grid').classList.remove('active-view');
    document.getElementById('article-view').classList.add('active-view');

    const title = id.replace('-', ' ').toUpperCase();
    document.getElementById('article-body').innerHTML = `
        <h1 class="text-5xl font-extrabold mb-8">${title}</h1>
        <div class="p-8 bg-orange-50 rounded-3xl border border-orange-200 mb-8">
            <h4 class="text-[#CF142B] font-bold text-xl mb-2">2026 Updates</h4>
            <p>We are currently updating our <b>${title}</b> guides to reflect the latest April 2026 regulations regarding the Skills Pass and Digital ID Wallet. Check back daily for local updates.</p>
        </div>
        <p class="text-xl leading-relaxed">Detailed information about the Maltese ${id} landscape goes here...</p>
    `;
    window.scrollTo(0,0);
};

window.showHome = function() {
    document.getElementById('hero').classList.add('active-view');
    document.getElementById('main-grid').classList.add('active-view');
    document.getElementById('article-view').classList.remove('active-view');
};

/** Language Logic */
window.setLanguage = function(id, name) {
    activeLang = id;
    document.getElementById('currentLang').innerText = name;
    toggleLangModal();
    renderContent();
    
    // Example Hero change for visual feedback
    const heroText = document.getElementById('hero-text');
    if (id === 'pa') heroText.innerText = "ਮਾਲਟਾ ਦੀ ਧੁੱਪ ਤੁਹਾਡਾ ਇੰਤਜ਼ਾਰ ਕਰ ਰਹੀ ਹੈ! ਭਾਈਚਾਰੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ।";
    else if (id === 'hi') heroText.innerText = "माल्टा की धूप आपका इंतज़ार कर रही है! समुदाय में शामिल हों।";
    else heroText.innerText = "Your Maltese Sunshine awaits! Join the Community.";
};

window.toggleLangModal = function() {
    const modal = document.getElementById('langModal');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
};

/** Load */
document.addEventListener('DOMContentLoaded', renderContent);
