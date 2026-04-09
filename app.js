/**
 * Malta Expat Hub 2026 Logic
 * Handles 9 languages and 10 dynamic pages
 */

const siteConfig = {
    sections: [
        { id: 'getting-started', icon: '🚀', title: { en: 'Getting Started', pa: 'ਸ਼ੁਰੂ ਕਰਨਾ', 'pt-br': 'Iniciando', hi: 'शुरू करना' } },
        { id: 'expat-info', icon: '🛂', title: { en: 'Expat Info', pa: 'ਪ੍ਰਵਾਸੀ ਜਾਣਕਾਰੀ', 'pt-br': 'Info Expats', it: 'Info Espatriati' } },
        { id: 'basic-info', icon: '🇲🇹', title: { en: 'Basic Info', pa: 'ਮੁੱਢਲੀ ਜਾਣਕਾਰੀ', 'pt-br': 'Informação Básica' } },
        { id: 'accommodation', icon: '🏠', title: { en: 'Accommodation', pa: 'ਰਿਹਾਇਸ਼', 'pt-br': 'Acomodação' } },
        { id: 'education', icon: '🎓', title: { en: 'Education', pa: 'ਸਿੱਖਿਆ', 'pt-br': 'Educação' } },
        { id: 'services', icon: '🏥', title: { en: 'Services', pa: 'ਸੇਵਾਵਾਂ', 'pt-br': 'Serviços' } },
        { id: 'safety', icon: '🛡️', title: { en: 'Safety', pa: 'ਸੁਰੱਖਿਆ', 'pt-br': 'Segurança' } },
        { id: 'lifestyle', icon: '☀️', title: { en: 'Lifestyle', pa: 'ਜੀਵਨ ਸ਼ੈਲੀ', 'pt-br': 'Estilo de Vida' } },
        { id: 'locations', icon: '📍', title: { en: 'Locations', pa: 'ਟਿਕਾਣੇ', 'pt-br': 'Localizações' } }
    ]
};

let currentLanguage = 'en';

/**
 * Renders the main 10-section navigation grid
 */
window.renderGrid = function() {
    const grid = document.getElementById('home-grid');
    if (!grid) return;

    grid.innerHTML = siteConfig.sections.map(s => `
        <div onclick="showPage('${s.id}')" class="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 card-hover transition-all cursor-pointer text-center group">
            <div class="text-5xl mb-6 transform group-hover:scale-110 transition-transform">${s.icon}</div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">${s.title[currentLanguage] || s.title['en']}</h3>
            <p class="text-[#CF142B] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Explore</p>
        </div>
    `).join('');
};

/**
 * Navigates to a specific content page
 */
window.showPage = function(id) {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('home-grid').style.display = 'none';
    const contentView = document.getElementById('content-view');
    contentView.classList.add('active');
    
    // 2026 Specific Content Logic
    let pageHtml = `<h1 class="text-4xl md:text-5xl font-serif text-[#0055A4] mb-8 leading-tight">${id.replace('-', ' ').toUpperCase()}</h1>`;
    
    if (id === 'getting-started') {
        pageHtml += `
            <div class="space-y-6">
                <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                    <h4 class="text-red-800 font-bold text-lg mb-2">Mandatory: 2026 Skills Pass</h4>
                    <p class="text-red-700">Since March 1, 2026, all new Third Country Nationals must complete the <b>€250 Pre-Departure Course</b> before applying for a work permit.</p>
                </div>
                <p>To move to Malta, you generally follow these steps:</p>
                <ol class="list-decimal pl-6 space-y-3">
                    <li>Secure a job offer or apply as a Digital Nomad.</li>
                    <li>Complete the mandatory online integration course (20 hours).</li>
                    <li>Pass the English proficiency interview.</li>
                    <li>Apply for the Single Permit (€600 fee).</li>
                </ol>
            </div>
        `;
    } else {
        pageHtml += `<p class='text-lg text-slate-600'>Our 2026 guide for <b>${id}</b> is being finalized with the latest local regulations. Check back for full details on taxes, banking, and neighborhood vibes.</p>`;
    }
    
    document.getElementById('page-body').innerHTML = pageHtml;
    window.scrollTo(0, 0);
};

/**
 * Returns to the Home/Grid view
 */
window.showHome = function() {
    document.getElementById('hero').style.display = 'flex';
    document.getElementById('home-grid').style.display = 'grid';
    document.getElementById('content-view').classList.remove('active');
};

/**
 * Changes the site language
 */
window.setLang = function(lang, name) {
    currentLanguage = lang;
    document.getElementById('langLabel').innerText = name;
    document.getElementById('langModal').classList.remove('modal-active');
    
    // Update the UI
    document.getElementById('hero-title').innerText = (lang === 'pa') ? "ਮਾਲਟਾ ਵਿੱਚ ਤੁਹਾਡੀ ਜ਼ਿੰਦਗੀ ਇੱਥੇ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ" : "Your Life in Malta Starts Here";
    
    renderGrid();
};

/**
 * Toggles the language selection overlay
 */
window.toggleLangModal = function() {
    document.getElementById('langModal').classList.toggle('modal-active');
};

/**
 * Smooth scrolls to the navigation cards
 */
window.scrollToGrid = function() {
    document.getElementById('home-grid').scrollIntoView({ behavior: 'smooth' });
};

// INITIALIZATION: Run when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    window.renderGrid();
});
