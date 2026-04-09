const config = {
    languages: {
        en: "English", it: "Italiano", es: "Español", fr: "Français", 
        de: "Deutsch", hi: "हिन्दी", pa: "ਪੰਜਾਬੀ", tl: "Filipino", "pt-br": "Português"
    },
    sections: [
        { id: 'getting-started', icon: '🚀', title: { en: 'Getting Started', it: 'Iniziare', pa: 'ਸ਼ੁਰੂ ਕਰਨਾ' } },
        { id: 'expat-info', icon: '🛂', title: { en: 'Expat Info', it: 'Info Espatriati', pa: 'ਪ੍ਰਵਾਸੀ ਜਾਣਕਾਰੀ' } },
        { id: 'basic-info', icon: '🇲🇹', title: { en: 'About Malta', it: 'Su Malta', pa: 'ਮਾਲਟਾ ਬਾਰੇ' } },
        { id: 'accommodation', icon: '🏠', title: { en: 'Accommodation', it: 'Alloggio', pa: 'ਰਿਹਾਇਸ਼' } },
        { id: 'education', icon: '🎓', title: { en: 'Education', it: 'Istruzione', pa: 'ਸਿੱਖਿਆ' } },
        { id: 'services', icon: '🏥', title: { en: 'Services', it: 'Servizi', pa: 'ਸੇਵਾਵਾਂ' } },
        { id: 'safety', icon: '🛡️', title: { en: 'Safety', it: 'Sicurezza', pa: 'ਸੁਰੱਖਿਆ' } },
        { id: 'lifestyle', icon: '☀️', title: { en: 'Lifestyle', it: 'Stile di vita', pa: 'ਜੀਵਨ ਸ਼ੈਲੀ' } },
        { id: 'locations', icon: '📍', title: { en: 'Locations', it: 'Località', pa: 'ਟਿਕਾਣੇ' } }
    ]
};

let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    document.getElementById('langLabel').innerText = config.languages[lang];
    toggleLangModal();
    renderGrid();
    showHome();
}

function renderGrid() {
    const grid = document.getElementById('home-grid');
    grid.innerHTML = config.sections.map(s => `
        <div onclick="showPage('${s.id}')" class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 card-hover transition-all cursor-pointer text-center">
            <div class="text-4xl mb-4">${s.icon}</div>
            <h3 class="text-xl font-bold text-slate-800">${s.title[currentLang] || s.title['en']}</h3>
            <p class="text-slate-400 text-sm mt-2">View Guide →</p>
        </div>
    `).join('');
}

function showPage(id) {
    document.getElementById('hero').classList.remove('active');
    document.getElementById('home-grid').classList.remove('active');
    document.getElementById('content-view').classList.add('active');
    
    // In a real app, you'd pull full text from a translation file. 
    // Here we'll generate a placeholder.
    document.getElementById('page-body').innerHTML = `
        <h1 class="text-4xl font-serif text-[#0055A4] mb-6">${id.replace('-', ' ').toUpperCase()}</h1>
        <p class="text-lg text-slate-600">This section provides comprehensive details about ${id.replace('-', ' ')} in Malta for 2026.</p>
        <div class="mt-8 p-6 bg-blue-50 rounded-2xl">
            <h4 class="font-bold">2026 Note:</h4>
            <p>Always verify visa and rental requirements with Identità Malta (formerly Identity Malta) before making payments.</p>
        </div>
    `;
    window.scrollTo(0,0);
}

function showHome() {
    document.getElementById('hero').classList.add('active');
    document.getElementById('home-grid').classList.add('active');
    document.getElementById('content-view').classList.remove('active');
}

function toggleLangModal() {
    const m = document.getElementById('langModal');
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
}

function scrollToContent() {
    document.getElementById('home-grid').scrollIntoView({ behavior: 'smooth' });
}

window.onload = () => { renderGrid(); };
