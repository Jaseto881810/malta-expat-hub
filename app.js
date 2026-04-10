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
                <p>Living in Malta comes with a unique mix of Mediterranean charm and modern convenience. English is one of the official languages (alongside Maltese), which makes settling in easier for most expats. The island is very small — you can drive from one end to the other in under an hour — but it’s packed with history, beaches, and lively towns.</p>
                <p>The country has seen an inflow of foreign nationals moving to Malta to work in the iGaming and Fintech sectors. This has also led to an inflow of foreigners working in transportation, delivery, and hospitality. This has caused some Maltese nationals to become concerned about cultural identity and the rising cost of housing.</p>
                <p>The cost of living has been increasing each year. Areas like Sliema, Swieqi, and St. Julian’s are popular with expats but expensive, while places like Mosta, Żebbuġ, or parts of Gozo offer more budget-friendly options (roughly €1000 to €1200 a month for rent). Note that Gozo is a separate island accessible only by ferry. Public transport is free for residents with a personalized Tallinja card, though punctuality varies.</p>
            `
        },
        {
            id: 'useful-apps',
            title: 'Useful Apps for living in Malta',
            img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600',
            text: 'While there are many apps you can use, a few will become essential daily habits while living in Malta.',
            fullContent: `
                <h2>Transportation: Bolt and Uber</h2>
                <p>Probably the most popular apps in Malta. Given the unreliability of the bus service, Bolt and Uber have become mainstays. Prices are competitive, though they increase during summer peak periods.</p>
                <h2>Delivery: Wolt, Bolt Food, and Uber Eats</h2>
                <p>These are the go-to apps for food and groceries. They have expanded to cover pet supplies, electronics, and more. Note that prices on these apps are often higher than in-store to compensate for platform commissions.</p>
                <h2>Banking: Revolut</h2>
                <p>The most popular digital banking service in Malta. It is quick to open (usually 48 hours) and offers savings, stocks, and easy currency exchange.</p>
                <p>Register here: <a href="https://revolut.com/referral/?referral-code=jasoneat!APR1-25-AR-H1" target="_blank" class="text-blue-600 underline">Revolut Registration</a></p>
                <h2>Shopping & Social: Amazon and Facebook</h2>
                <p>Amazon (UK, DE, IT) is vital for electronics and niche items. Facebook Groups remain the primary way to find rentals and used cars, though caution is advised regarding scams and unlicensed agents.</p>
            `
        },
        {
            id: 'weather-climate',
            title: 'Weather and Climate in Malta',
            img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600',
            text: 'Malta boasts a Mediterranean climate with over 300 days of sunshine. However, the summer heat can be a shock if you aren\'t prepared.',
            fullContent: `
                <h2>Seasonal Breakdown</h2>
                <p><b>Summer (June – Sept):</b> Hot and dry (32°C–37°C). Humidity is high and AC is essential.</p>
                <p><b>Autumn (Oct – Nov):</b> Warm and pleasant (22°C–28°C) with occasional heavy rain bursts.</p>
                <p><b>Winter (Dec – Feb):</b> Mild (10°C–17°C) but can feel damp indoors.</p>
                <p><b>Spring (March – May):</b> Ideal weather (17°C–24°C) as the island turns green.</p>
                <h3>Weather Characteristics</h3>
                <p>Rain often leads to road chaos and localized flooding due to poor drainage. Strong winds like the "Majjistral" are common, and "Medicanes" (Mediterranean hurricanes) occur rarely in autumn.</p>
            `
        },
        {
            id: 'third-country-nationals',
            title: 'Advice for Third Country Nationals (TCN)',
            img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600',
            text: 'For TCNs moving to Malta, it’s important to have a clear picture of the reality regarding salary vs. cost of living.',
            fullContent: `
                <p>Many TCNs are recruited for hospitality, caregiving, and delivery. Wages often range from €800 to €1,200 per month. Given that a shared room can cost €500–€600, saving money is extremely difficult.</p>
                <p><b>2026 Regulations:</b> Entry is now tougher. A mandatory €250 pre-departure course ("Living and Working in Malta") is required. You can no longer switch from a Tourist Visa to a Work Visa while on the island.</p>
                <p>Salaries must now be paid digitally through licensed institutions to ensure a paper trail. Before moving, research thoroughly; for low-wage roles, the financial reward may be lower than expected compared to other regions.</p>
            `
        },
        {
            id: 'cost-living',
            title: 'Cost of Living in Malta',
            img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600',
            text: 'The cost of living has risen steadily. While more affordable than London, Malta is no longer a "cheap" destination.',
            fullContent: `
                <h2>Monthly Estimates</h2>
                <p><b>Housing:</b> €1,000–€1,500 for a 1-bed in central areas. €400–€700 for a room.</p>
                <p><b>Daily Expenses:</b> €250–€400 for groceries. Utilities average €50–€100 but spike in summer.</p>
                <p><b>Transport:</b> Tallinja cards make buses cheap or free for residents. Bolt/Uber are affordable but add up.</p>
                <p><b>Bottom Line:</b> A single person needs roughly €1,300–€1,800/month to live comfortably in 2026.</p>
            `
        }
    ],

    'getting-started': [
        {
            id: 'pre-departure',
            title: 'Pre-Departure Check',
            img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600',
            text: 'Verify your visa type. TCNs should apply via the new VFS Global portal specific to Malta.',
            fullContent: '<h2>Visa Checklist</h2><p>Ensure your passport is valid for at least 6 months and you have your job offer letter ready.</p>'
        },
        {
            id: 'banking-setup',
            title: 'Banking Setup',
            img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=600',
            text: 'Setting up a local bank (BOV or HSBC) can take weeks. Consider digital alternatives like Revolut or MeDirect for immediate use.',
            fullContent: '<h2>Opening an Account</h2><p>Most banks require a proof of address and a copy of your work contract.</p>'
        }
    ]
};

/** UI Functions **/

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

    const items = contentDatabase[id] || [{ title: 'Under Construction', img: '', text: 'Detailed wiki articles for this section are arriving soon.' }];
    
    grid.innerHTML = items.map(item => `
        <div class="wiki-card flex flex-col gap-4">
            <img src="${item.img}" class="w-full h-40 object-cover rounded-lg" alt="${item.title}">
            <div>
                <h3 class="text-xl font-bold mb-2 text-[#003366]">${item.title}</h3>
                <p class="text-slate-600 leading-relaxed text-sm">${item.text}</p>
                ${item.id ? `
                <button onclick="openDetail('${id}', '${item.id}')" 
                        class="mt-4 text-[#CF142B] text-xs font-bold uppercase tracking-wider hover:underline">
                    Full Details & Links
                </button>` : ''}
            </div>
        </div>
    `).join('');

    window.scrollTo(0, 0);
}

window.openDetail = function(sectionId, itemId) {
    const section = contentDatabase[sectionId];
    if (!section) return;
    const item = section.find(i => i.id === itemId);
    if (!item) return;

    const grid = document.getElementById('wiki-content');
    grid.style.display = 'none';

    let detailView = document.getElementById('detail-view');
    if (!detailView) {
        detailView = document.createElement('div');
        detailView.id = 'detail-view';
        detailView.className = 'bg-white p-8 rounded-2xl border border-slate-200 shadow-sm';
        grid.parentNode.appendChild(detailView);
    }
    detailView.style.display = 'block';

    detailView.innerHTML = `
        <button onclick="closeDetail()" class="text-[#CF142B] font-bold mb-6 flex items-center gap-2">
            ← Back to ${sectionId.replace('-', ' ')}
        </button>
        <img src="${item.img}" class="w-full h-64 object-cover rounded-xl mb-8">
        <div class="prose prose-lg max-w-none">
            ${item.fullContent || '<p>Detailed content is being updated.</p>'}
        </div>
    `;
    window.scrollTo(0, 0);
};

window.closeDetail = function() {
    const detailView = document.getElementById('detail-view');
    if (detailView) detailView.style.display = 'none';
    document.getElementById('wiki-content').style.display = 'grid';
};

window.toggleLangModal = function() {
    const modal = document.getElementById('langModal');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
};

window.updateLang = function(code, name) {
    document.getElementById('langDisplay').innerText = name;
    window.toggleLangModal();
};

window.onload = () => {
    renderSidebar();
    loadSection('home');
};
