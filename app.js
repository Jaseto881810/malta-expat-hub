const siteData = {
    pages: ["home", "getting-started", "expat-info", "basic-info", "accommodation", "education", "services", "safety", "lifestyle", "locations"],
    content: {
        en: {
            "home": "<h1>Welcome to Malta</h1><p>The ultimate guide for moving to the Mediterranean.</p>",
            "getting-started": "<h1>2026 Checklist</h1><ul><li>Apply for Mandatory Pre-Departure Course (€250)</li><li>Get €100k Health Insurance coverage</li><li>Register on Skills Pass Portal</li></ul>",
            "expat-info": "<h1>Visa & Residency</h1><p>Fees for 2026: Single Permit €600. Visit-to-Work switching is now prohibited.</p>"
        },
        pa: {
            "home": "<h1>ਮਾਲਟਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ</h1><p>ਮੈਡੀਟੇਰੀਅਨ ਜਾਣ ਲਈ ਅੰਤਮ ਗਾਈਡ।</p>",
            "getting-started": "<h1>2026 ਚੈੱਕਲਿਸਟ</h1><p>ਲਾਜ਼ਮੀ ਪ੍ਰੀ-ਡਿਪਾਰਚਰ ਕੋਰਸ (€250) ਲਈ ਅਪਲਾਈ ਕਰੋ।</p>"
        },
        "pt-br": {
            "home": "<h1>Bem-vindo a Malta</h1><p>O guia definitivo para sua mudança.</p>",
            "getting-started": "<h1>Checklist 2026</h1><p>Curso pré-partida obrigatório e Seguro saúde de €100k.</p>"
        }
        // Add other languages here following the same pattern
    }
};

let currentLang = 'en';

function showPage(pageId) {
    const container = document.getElementById('content-area');
    const pageContent = siteData.content[currentLang][pageId] || `<h1>${pageId.replace('-', ' ')}</h1><p>Content coming soon in ${currentLang}...</p>`;
    
    container.innerHTML = `
        <div class="max-w-4xl mx-auto py-12 px-6 active page">
            <div class="mb-8 flex space-x-2 overflow-x-auto pb-2">
                ${siteData.pages.map(p => `<button onclick="showPage('${p}')" class="whitespace-nowrap px-4 py-2 rounded-full bg-white border text-xs uppercase font-bold">${p.replace('-', ' ')}</button>`).join('')}
            </div>
            <div class="prose lg:prose-xl">
                ${pageContent}
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function toggleModal() {
    document.getElementById('langModal').classList.toggle('active');
}

function changeLang(lang, name) {
    currentLang = lang;
    document.getElementById('currentLangDisplay').innerText = name;
    toggleModal();
    showPage('home'); // Refresh view with new language
}

// Initialize
window.onload = () => showPage('home');
