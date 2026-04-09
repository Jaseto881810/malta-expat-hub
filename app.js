const translations = {
    en: {
        "nav-residency": "Residency",
        "nav-housing": "Housing",
        "nav-jobs": "Jobs",
        "nav-community": "Community",
        "hero-title": "Your Life in Malta Starts Here",
        "hero-btn": "Start My Move Checklist",
        "essentials-title": "The Essentials",
        "card-res-title": "Residency",
        "card-res-desc": "Visas, ID cards, and Nomad Residence Permits.",
        "card-house-title": "Housing",
        "card-house-desc": "Finding the right rental in Sliema, St. Paul's, or Gozo.",
        "card-jobs-title": "Jobs",
        "card-jobs-desc": "Tax registrations and the local job market."
    },
    it: {
        "nav-residency": "Residenza",
        "nav-housing": "Alloggio",
        "nav-jobs": "Lavoro",
        "nav-community": "Comunità",
        "hero-title": "La tua vita a Malta inizia qui",
        "hero-btn": "Inizia la tua Checklist",
        "essentials-title": "Gli Essenziali",
        "card-res-title": "Residenza",
        "card-res-desc": "Visti, carte d'identità e permessi per nomadi.",
        "card-house-title": "Alloggio",
        "card-house-desc": "Trovare l'affitto giusto a Sliema o Gozo.",
        "card-jobs-title": "Lavoro",
        "card-jobs-desc": "Registrazione fiscale e mercato del lavoro."
    }
    // Add DE and FR translations here similarly
};

const langSwitcher = document.getElementById('langSwitcher');

langSwitcher.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Store preference
    localStorage.setItem('preferredLang', lang);
}

// Load saved language on start
window.onload = () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    langSwitcher.value = savedLang;
    setLanguage(savedLang);
};