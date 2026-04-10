const wikiSections = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'getting-started', icon: '🚀', label: 'Getting Started' },
    { id: 'expat-info', icon: '🛂', label: 'Expat Info' },
    { id: 'basic-info', icon: '🇲🇹', label: 'Basic Info' },
    { id: 'accommodation', icon: '🏠', label: 'Accommodation' },
    { id: 'education', icon: '🎓', label: 'Education' },
    { id: 'services', icon: '🏥', label: 'Services' },
    { id: 'safety', icon: '🛡️', label: 'Safety' },
    { id: 'lifestyle', icon: '☀️', label: 'Lifestyle' },
    { id: 'locations', icon: '📍', label: 'Locations' }
];

const contentDatabase = {
    'home': [
        { title: 'The 2026 Skills Pass', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600', text: 'All workers arriving after March 2026 must complete the mandatory Skills Pass course (€250) covering local hospitality and English basics.' },
        { title: 'Digital ID Wallet', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600', text: 'Malta now uses the E-ID Wallet app for all identity verifications. Paper work permits are being phased out in favor of biometric smartphone passes.' },
        { title: 'Housing Authority Rules', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', text: 'Every rental contract must be registered online by the landlord within 10 days of signing. Unregistered contracts are illegal and block ID applications.' },
        { title: 'Healthcare Access', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600', text: 'Public healthcare is free for EU citizens and TCNs paying social security. Private health insurance remains mandatory for initial residency permits.' }
    ],
    'getting-started': [
        { title: 'Pre-Departure Check', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600', text: 'Verify your visa type. TCNs should apply via the new VFS Global portal specific to Malta.' },
        { title: 'Banking Setup', img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=600', text: 'Setting up a local bank (BOV or HSBC) can take weeks. Consider digital alternatives like Revolut or MeDirect for immediate use.' }
    ]
    // Add other sections here similarly...
};

function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = wikiSections.map(s => `
        <button onclick="loadSection('${s.id}')" id="btn-${s.id}" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition">
            <span>${s.icon}</span> ${s.label}
        </button>
    `).join('');
}

function loadSection(id) {
    // Update Sidebar Styling
    document.querySelectorAll('#sidebar-nav button').forEach(b => b.classList.remove('sidebar-active'));
    document.getElementById(`btn-${id}`).classList.add('sidebar-active');

    // Update Titles
    const sectionData = wikiSections.find(s => s.id === id);
    document.getElementById('main-title').innerText = sectionData.label;
    
    // Update Wiki Grid
    const grid = document.getElementById('wiki-content');
    const items = contentDatabase[id] || [{ title: 'Under Construction', img: '', text: 'Detailed wiki articles for this section are arriving soon.' }];
    
    grid.innerHTML = items.map(item => `
        <div class="wiki-card flex flex-col gap-4">
            ${item.img ? `<img src="${item.img}" class="w-full h-40 object-cover rounded-lg">` : ''}
            <div>
                <h3 class="text-xl font-bold mb-2 text-[#003366]">${item.title}</h3>
                <p class="text-slate-600 leading-relaxed text-sm">${item.text}</p>
                <button class="mt-4 text-[#CF142B] text-xs font-bold uppercase tracking-wider hover:underline">Full Details & Links</button>
            </div>
        </div>
    `).join('');

    window.scrollTo(0, 0);
}

/** Language Modal Logic **/
function toggleLangModal() {
    document.getElementById('langModal').classList.toggle('hidden');
    document.getElementById('langModal').classList.toggle('flex');
}

function updateLang(code, name) {
    document.getElementById('langDisplay').innerText = name;
    toggleLangModal();
    // In a full app, you would swap text content based on the 'code' here.
}

// Initial Run
window.onload = () => {
    renderSidebar();
    loadSection('home');
};
