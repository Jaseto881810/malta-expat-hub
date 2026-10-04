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
        {
            id: 'quick-things',
            title: 'Quick things to know about living in Malta',
            img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=600',
            text: 'All workers arriving after March 2026 must complete the mandatory Skills Pass course (€250) covering local hospitality and English basics.',
            fullContent: `
                <h2>Quick things to know about living in Malta</h2>
                <p>Living in Malta comes with a unique mix of Mediterranean charm and modern convenience. English is one of the official languages (alongside Maltese), which makes settling in easier for most expats.</p>
                <p>The country has seen an inflow of foreign nationals moving to Malta to work in the iGaming and Fintech sectors. This has also led to an inflow of foreigners working in transportation, delivery, and hospitality. This has caused some local concerns regarding cultural identity and the rising cost of housing.</p>
            `
        },
        {
            id: 'useful-apps',
            title: 'Useful Apps for living in Malta',
            img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600',
            text: 'While there are many apps that you can use, there are a few that will become a habit to use while living in Malta.',
            fullContent: `
                <h2>Transportation: Bolt and Uber</h2>
                <p>Probably the most popular apps in Malta. Given the unreliability of the public transport bus service, Bolt and Uber have become mainstays.</p>
                <h2>Revolut - Mobile Banking</h2>
                <p>Revolut is the most popular banking service in Malta. You can register through this link: <a href="https://revolut.com/referral/?referral-code=jasoneat!APR1-25-AR-H1" target="_blank" class="text-blue-600 underline">Revolut Malta</a>.</p>
            `
        },
        {
            id: 'weather-climate',
            title: 'Weather and Climate in Malta',
            img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600',
            text: 'Malta boasts a Mediterranean climate, meaning long, hot summers and mild, short winters. Air conditioning quickly becomes your best friend!',
            fullContent: `
                <h2>Seasonal Breakdown</h2>
                <p><b>Summer:</b> Hot and dry (32°C to 37°C). <b>Winter:</b> Mild but damp (10°C to 17°C).</p>
                <p>Rainfall is common in autumn and winter, often leading to chaos on the roads due to poor drainage.</p>
            `
        },
        {
            id: 'third-country-nationals',
            title: 'Advice for Third Country Nationals (TCN)',
            img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600',
            text: 'For TCNs moving to Malta, it’s important to have a clear picture of the reality regarding salary vs. cost of living.',
            fullContent: `
                <h2>The Reality for TCNs</h2>
                <p>Wages for many delivery and hospitality roles range from €800 to €1,200 per month. High rent makes saving difficult. As of 2026, a mandatory €250 pre-departure course is required.</p>
            `
        },
        {
            id: 'cost-living',
            title: 'Cost of Living in Malta',
            img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600',
            text: 'The cost of living has risen steadily. While more affordable than London, Malta is no longer a cheap destination.',
            fullContent: `
                <h2>2026 Monthly Estimates</h2>
                <p><b>Rent:</b> €1,000–€1,500 for a 1-bed in central areas. <b>Groceries:</b> €250–€400/month.</p>
                <p>To live comfortably, a single person needs roughly €1,300–€1,800/month.</p>
            `
        }
    ],
    'getting-started': [
        {
            id: 'pre-departure',
            title: 'Pre-Departure Check',
            img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600',
            text: 'Verify your visa type. TCNs should apply via the new VFS Global portal specific to Malta.',
            fullContent: '<h2>Visa Checklist</h2><p>Ensure your passport is valid and you have your job offer letter ready.</p>'
        }
    ]
};

/** UI LOGIC - DO NOT CHANGE BELOW THIS LINE **/

function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = wikiSections.map(s => `
        <button onclick="loadSection('${s.id}')" id="btn-${s.id}" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition">
            <span>${s.icon}</span> ${s.label}
        </button>
    `).join('');
}

function loadSection(id) {
    document.querySelectorAll('#sidebar-nav button').forEach(b => b.classList.remove('sidebar-active'));
    const activeBtn = document.getElementById(`btn-${id}`);
    if (activeBtn) activeBtn.classList.add('sidebar-active');

    const sectionData = wikiSections.find(s => s.id === id);
    document.getElementById('main-title').innerText = sectionData ? sectionData.label : 'Wiki';
    
    const grid = document.getElementById('wiki-content');
    grid.style.display = 'grid';
    
    const detailView = document.getElementById('detail-view');
    if (detailView) detailView.style.display = 'none';

    const items = contentDatabase[id] || [{ title: 'Under Construction', img: '', text: 'Detailed wiki articles coming soon.' }];
    
    grid.innerHTML = items.map(item => `
        <div class="wiki-card flex flex-col gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            ${item.img ? `<img src="${item.img}" class="w-full h-40 object-cover rounded-lg">` : ''}
            <div>
                <h3 class="text-xl font-bold mb-2 text-[#003366]">${item.title}</h3>
                <p class="text-slate-600 leading-relaxed text-sm">${item.text}</p>
                ${item.id ? `<button onclick="openDetail('${id}', '${item.id}')" class="mt-4 text-[#CF142B] text-xs font-bold uppercase tracking-wider hover:underline">Full Details & Links</button>` : ''}
            </div>
        </div>
    `).join('');
}

window.openDetail = function(sectionId, itemId) {
    const item = contentDatabase[sectionId].find(i => i.id === itemId);
    if (!item) return;

    document.getElementById('wiki-content').style.display = 'none';

    let detailView = document.getElementById('detail-view');
    if (!detailView) {
        detailView = document.createElement('div');
        detailView.id = 'detail-view';
        detailView.className = 'bg-white p-8 rounded-2xl border border-slate-200 shadow-sm';
        document.getElementById('wiki-content').parentNode.appendChild(detailView);
    }
    detailView.style.display = 'block';

    detailView.innerHTML = `
        <button onclick="closeDetail()" class="text-[#CF142B] font-bold mb-6 flex items-center gap-2">← Back</button>
        <div class="prose prose-lg max-w-none">
            ${item.fullContent}
        </div>
    `;
    window.scrollTo(0, 0);
};

window.closeDetail = function() {
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('wiki-content').style.display = 'grid';
};

window.onload = () => {
    renderSidebar();
    loadSection('home');
};
