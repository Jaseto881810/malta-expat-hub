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
            img: 'https://unsplash.com/photos/a-group-of-flags-flying-in-front-of-a-building-4mOZY9gubvc',
            text: 'All workers arriving after March 2026 must complete the mandatory Skills Pass course (€250) covering local hospitality and English basics.'
            fullContent: `
                <h2>Quick things to know about living in Malta</h2>
                <p>Living in Malta comes with a unique mix of Mediterranean charm and somewhat modern convenience. English is one of the official languages (alongside Maltese), which makes settling in easier for most expats. The island is verry small — you can drive from one end to the other in under an hour — but it’s packed with history, beaches, and lively towns. The country has seen an inflow foreign nationals moving to Malta to work in the iGaming and Fintech sectors. This has also lead to an inflow of foreigners to Malta who work as taxi drivers, delivery drivers, bus drivers, work in supermarkets and corners, and also work in the hospitality sector. This has caused the Maltese nationals to become, in general,  very upset, as they believe their culture and country's identity is being lost, and the cost of housing has become too high for them.</p>
                <p>The cost of living can vary depending on where you settle. But regardless of where you settle, the cost of living has been drastically increasing each year.. Areas like Sliema, Swieqi and St. Julian’s are popular with expats but also more expensive, while places like Mosta, Żebbuġ, or parts of Gozo offer more budget-friendly options (by budget friendly, we mean between €1000 to €1200 a month for an apartment to rent). However, Gozo is not a practical option, as it is a separate island, only accessible by ferry. The public transport bus service is free for residences with a personalized bus card (or €2 for a single trip if you don't have a personalized card), though not always punctual, and many locals rely on scooters or cars. Malta is part of the EU and the Schengen Area, making travel around Europe easy. With over 300 days of sunshine a year, a vibrant expat community, and easy access to sea, sun, and travel, Malta is a great place to build a new chapter — if you're up for a few quirks along the way.</p>
            `
        },

        {
            id: 'useful-apps',
            title: 'Useful Apps for living in Malta',
            img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600',
            text: 'While there are many apps that you can have and use, there are a few that will become a habit to use while living in Malta.'
            fullContent: `
                <h2>Bolt and Uber - Transportation:</h2>
                <p>Probably the most popular apps in Malta. Given the unreliability of the public transport bus service, Bolt has become a mainstay in transportation in Malta. The abundance of Bolt drivers means you don't have to wait long for a driver confirmation. The cost of Bolt is also extremely affordable, compared to mainland Europe, with a trip from the airport to Sliema costing between €12 to €15. However, in the summer holidays, you can expert an increase in price as the island becomes overloaded with tourists, with a limited supply of taxis.</p>
                <p>Much like Bolt, Uber has also become a mainstay in transportation in Malta. The Uber service is extremely competitive, and at a similar price. The rise of Uber and Bolt come at the expense of the traditional taxi service, which has priced itself out of the market.</p>
                <br><br>

                <h2>Wolt Delivery, Bolt Food and Uber Eats - Take-aways, Groceries and small shopping items:</h2>
                <p>Wolt and Bolt Food are the go to places for take-away food and grocery delivery. The country is covered in Wolt delivery drivers (much to the irk of the Maltese drivers). Both Wolt and Bolt Food also serves as a merchant to place food orders for pick-up, and both have now expanded its delivery service to now cover categories such as: gifts, pet supplies, hardware items, alcohol, electronics, flowers, cosmetics and sports nutrition.</p>
                <p>Much like Wolt Delivery and Bolt Food, Uber Eats covers various take-away and pick-up options and grocery stores. However, Bolt Food doesn't cover much non-food related items. As convenient as these apps are, please do consider the following negative aspects of them:</p>
                <ul>
                    <li>These platforms take a big commission on sales from the restaurants and shops, which has a huge impact on local and small operators.</li>
                    <li>In order to compensate for the commissions taken on sales, many shops and restaurants charge more per item on these apps, than if you went directly to them.</li>
                    <li>Delivery drivers don't work directly for these platforms, but for a local agency that collects the full revenue of the work and then pay a minimum wage to the workers, who most of the time work incredibly long hours.</li>
                </ul>
                <br><br>

                <h2>Revolut - Mobile Banking:</h2>
                <p>Revolut is the most popular banking service in Malta, with roughly 7 out of 10 adults using Revolut, despite not having a physical bank branch. The banking service is fully digital. Why is it so popular? It is cheap, has 5 different membership offers (ranging from free to €45 per month), quick and easy to open account (within 48 hours), has a powerful app, and offer services such as savings accounts, stock trading, crypto investing, virtual debit cards, exchanging and holding over 30 different currencies, seamlessly sending money abroad and creating accounts for your children.</p>
                <p>You can register for a Revolut account through this affiliate link: <a> https://revolut.com/referral/?referral-code=jasoneat!APR1-25-AR-H1</a>.</p>
                <br><br>

                <h2>Amazon Shopping - Online Shopping:</h2>
                <p2>Amazon shopping is hugely popular in Malta because the island has limited retail variety, especially for niche products, electronics, and specific brands. Heavily populated areas like Sliema and St Julian's have surprisingly limited electronic stores, resulting in residents either buying online or having to travel to towns such as Marsa, Qormi or Birkirkara to visit an electronics store. Many residents turn to Amazon (especially Amazon UK, Germany, or Italy) for better prices, wider selections, and fast international shipping. Despite Malta’s small size, delivery is usually smooth (usually taking a week to be fulfilled), and many people rely on it to access items that are either unavailable locally or significantly more expensive in local stores.</p2>
                <br><br>

                <h2>Tinder - Dating:</h2>
                <p2>Tinder is quite popular in Malta, especially among younger locals, expats, and digital nomads looking to meet new people. Given the island’s small size and close-knit social circles, many use Tinder not just for dating but also to connect socially or casually while traveling or living abroad. The app’s popularity is particularly noticeable in urban areas like Sliema, St. Julian’s, and Valletta, where there's a vibrant mix of locals and internationals.</p2>
                <br><br>

                <h2>Facebook - Social Network and Marketplace</h2>
                <p>Facebook is very popular in Malta, as many business lack their own website (or don't maintain it) and Facebook groups for property rentals, and buying and selling of used cars are extremely popular. Property agents make use of these Facebook groups (due to their websites not being maintained properly, and the speed of apartments going off the market) to push available places. The groups are very weak in moderation, and it often results in property agents, and the companies they work for, spamming groups multiple times a day. There are groups for properties available to rent directly from owners, but unfortunately, the property agents have also made their way into these groups (due to poor group moderation) and often lie about being an owner. Facebook groups fill the space where a lack of a marketplace solution or apps have yet to take hold off. As with any marketplace, a degree of caution is required to protect oneself from scams and fraudsters.</p>

                `
        },

        {
            id: 'weather-climate',
            title: 'Weather and Climate in Malta',
            img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600',
            text: 'Malta boasts a Mediterranean climate, meaning long, hot summers and mild, short winters. With over 300 days of sunshine a year, it’s one of the sunniest places in Europe. However, if you are coming to Malta during the summer, and you are not conditioned to hot weather, you are going to be in for quite a shock.'
            fullContent: `
                <h2>Summer (June – September):</h2>
                <p>Summers in Malta are hot and dry, with average daytime temperatures ranging from 32°C to 37°C. Be prepared for some humidity, especially in July and August — and air conditioning quickly becomes your best friend! The night times can be extremely uncomfortable for sleeping, with average overnight temperature being in the mid twenties.</p>
                <br><br>

                <h2>Autumn (October – November):</h2>
                <p>Autumn still feels pretty summery, especially in early October. Temperatures cool slightly but remain warm and pleasant, ranging from 22°C to 28°C. Rainfall starts to increase a bit toward November, often in the form of short but heavy showers. The overnight temperature starts to come down, falling to the high teens.</p>
                <br><br>

                <h2>Winter (December – February):</h2>
                <p>Winters are mild compared to much of Europe. Temperatures typically range between 10°C and 17°C. There’s more rain during this season, and it can feel damp, especially in older buildings without central heating.</p>
                <br><br>

                <h2>Spring (March – May):</h2>
                <p>Spring is one of the best times to be in Malta. The island turns green and vibrant, and the temperatures start to rise again, averaging 17°C to 24°C. There’s less rain, longer days, and the sea begins to warm up again. The overnight temperature is a bit chilly at between 11°C to 16°C.</p>
                <br><br>

                <h2>Weather characteristics:</h2>
                <ul>
                    <li>Rainfall is most common from late autumn through winter, often in quick, heavy bursts. When it does rain, it always leads to chaos on the roads. Pedestrians should be very careful, as drainage of rain water on the roads is not a thing in Malta, leading to flooded roads. The roads and pavements are also relatively smoothing, making them extremely slippery.</li>
                    <li>Winds can be strong, especially the north-westerly “majjistral” wind in winter, or the hot and dry “sirocco” blowing in from the Sahara.</li>
                    <li>Due to Malta's latitude location, humidity is a real issue, it can be quite high year-round.</li>
                    <li>While Malta generally enjoys calm Mediterranean weather, it can occasionally be affected by Medicanes — short for Mediterranean hurricanes. These are rare, tropical-like storms that form over the Mediterranean Sea, usually in autumn when the sea is still warm. Medicanes can bring heavy rain, strong winds, rough seas, and localized flooding. Malta has experienced a few in recent years, but they remain infrequent and short-lived, often lasting only a day or two.</li>
                </ul>

            `
        },

        {
            id: 'third-country-nationals',
            title: 'Advice for Third Country Nationals (TCN)',
            img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600',
            text: 'For third-country nationals considering a move to Malta, it’s important to have a clear picture of what life here is really like — especially when it comes to salary vs. cost of living.'
            fullContent: `
                <p>For third-country nationals considering a move to Malta, it’s important to have a clear picture of what life here is really like — especially when it comes to salary vs. cost of living. Many foreign workers, particularly from South Asia and Latin America, are recruited into jobs in sectors like hospitality, caregiving, cleaning, delivery services or construction. While these jobs offer legal employment and residency, the wages are often on the lower end (minimum wage levels) — typically around €800 to €1,200 per month. At first glance, that may seem like a fair amount, but when you factor in high rent prices, rising grocery costs, and transport, it's extremely difficult to save or support family back home.</p>
                <p>The reality is, you are seen as cheap and replaceable labour, and because of this, you will most likely won't be treated well or with respect by locals.</p>
                <p>Malta’s rental market has become expensive, especially in central areas like Sliema, Gżira, and St. Julian’s. Even a shared room in a basic apartment can cost €500–€600 monthly, and private rooms or studios can easily go over that, with studios in these towns now going over the €1,000 price mark. Many TCNs end up living in overcrowded flats just to afford the rent, often sharing rooms with strangers. There is an unfortunate trend now where landlords and property owners renting out beds in apartments, and renting out single bedroom apartments with 3 or 4 single beds. This, combined with long working hours, limited job mobility, and sometimes exploitative work conditions, can lead to physical and emotional exhaustion. While the sun, sea, and safety in Malta are often highlighted, the reality for many foreign workers is much more challenging than expected.</p>
                <p>Before deciding to move, ask yourself what your long-term goal is. If you're coming to Malta purely to earn and save money, it may not be the best choice — especially compared to other European or Gulf countries where salaries might be higher relative to living costs. If you plan to share an apartment with 1 or more people, you would need roughly €1,000 a month net (from your salary) in order to survive. However, there is a very strong possibility, that in a year's time, that won't be enough.</p>
                <p>As of 2026, the entry into Malta, to be a working Third Country National, is becoming thougher and more expensive. A pre-departure course covering 2 modules, will need to be completed. These 2 modules are "Living and Working in Malta" and Rights and Obligations at the Workplace". The cost comes in at €250. One of the biggest changes is that individuals coming into Malta on a Tourism Visa cannot convert it to a Work Visa, a loophole exploited for many years. Lastly, salaries have to be paid via digital payments only and through licensed financial institutions, to ensure a digital paper trail and that taxes are paid.</p>
                <p>Malta offers legal pathways and some job security, but not necessarily a comfortable or financially rewarding life for low-wage workers. The government  has also started listening to the complaints of the Maltese, regarding the number of Third Country Nationals, and has started not extend the residence and work permits of many Third Country Nationals (if they don't meet the desired skill requirements.</p>
                <p>Do your research, speak to people who are already here, and think carefully before making the leap. Sometimes, staying home or exploring other countries with better opportunities may be the smarter move in the long run.</p>

            `
        }

        {
            id: 'cost-living',
            title: 'Cost of Living in Malta',
            img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600',
            text: 'The cost of living in Malta has been steadily rising over the past few years, and in 2025, it’s something new residents should be prepared for — especially those coming on modest salaries. While Malta still remains more affordable than cities like London or Paris, it’s no longer a "cheap" destination, particularly when it comes to housing. ',
            fullContent: `
                <h2>Housing:</h2>
                <p>Rent is the biggest expense for most people. A one-bedroom apartment in central areas like Sliema, Gżira, or St. Julian’s can cost between €1,000–€1,500/month, while shared accommodation or renting a room can range from €400–€700/month. Prices are slightly lower in towns like Mosta, Żabbar, or Birkirkara, and significantly more affordable in Gozo, Malta’s smaller sister island.</p>
                <br><br>

                <h2>Daily Expenses:</h2>
                <p>Groceries for a single person typically cost around €250–€400/month, depending on diet and shopping habits. Eating out is relatively affordable: a basic meal at a casual restaurant may cost €12–€20, while a coffee averages around €2–€3. Utilities (electricity, water, internet) usually come to about €50–€100/month for a small flat, but bills can spike in summer due to air conditioning.</p>
                <br><br>

                <h2>Transport & Other Costs:</h2>
                <p>Public buses are affordable, with the Tallinja card offering discounted rates (as low as €0.75 per ride or even free for residents under some schemes). Owning a car adds costs like insurance, fuel, and parking, so many residents opt for buses, walking, or rideshares like Bolt and Uber. Health insurance, if not covered by an employer, can range from €20–€50/month for basic coverage. Entertainment, fitness, and leisure activities add extra — expect €30–€70/month for a gym membership.</p>
                <br><br>

                <h2>Bottom Line:</h2>
                <p>To live comfortably in Malta in 2025, a single person will likely need at least €1,300–€1,800/month, depending on lifestyle and housing choices. Couples or families will need more. It’s important to plan your budget carefully — and if you’re moving here for work, make sure your salary reflects the current cost of living.</p>
                
            `

        }
    ],

    'getting-started': [
        {
            title: 'Pre-Departure Check',
            img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600',
            text: 'Verify your visa type. TCNs should apply via the new VFS Global portal specific to Malta.'
        },

        {
            title: 'Banking Setup',
            img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=600',
            text: 'Setting up a local bank (BOV or HSBC) can take weeks. Consider digital alternatives like Revolut or MeDirect for immediate use.'
        },
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
            <img src="${item.img}" class="w-full h-40 object-cover rounded-lg">
            <div>
                <h3 class="text-xl font-bold mb-2 text-[#003366]">${item.title}</h3>
                <p class="text-slate-600 leading-relaxed text-sm">${item.text}</p>
                
                <button onclick="openDetail('${id}', '${item.id}')" 
                        class="mt-4 text-[#CF142B] text-xs font-bold uppercase tracking-wider hover:underline">
                    Full Details & Links
                </button>
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

/**
 * Opens a dedicated detailed page for a specific wiki item
 */
window.openDetail = function(sectionId, itemId) {
    // 1. Find the specific item data
    const section = contentDatabase[sectionId];
    const item = section.find(i => i.id === itemId);

    if (!item) return;

    // 2. Hide the Grid, show a "Detail Container"
    const grid = document.getElementById('wiki-content');
    grid.style.display = 'none';

    // 3. Create or Update the Detail View area
    let detailView = document.getElementById('detail-view');
    if (!detailView) {
        detailView = document.createElement('div');
        detailView.id = 'detail-view';
        detailView.className = 'bg-white p-8 rounded-2xl border border-slate-200 shadow-sm';
        grid.parentNode.appendChild(detailView);
    }
    detailView.style.display = 'block';

    // 4. Inject the full content
    detailView.innerHTML = `
        <button onclick="closeDetail()" class="text-[#CF142B] font-bold mb-6 flex items-center gap-2">
            ← Back to ${sectionId.replace('-', ' ')}
        </button>
        <img src="${item.img}" class="w-full h-64 object-cover rounded-xl mb-8">
        <div class="prose prose-lg max-w-none">
            ${item.fullContent}
        </div>
    `;
};

/**
 * Closes the detail view and returns to the grid
 */
window.closeDetail = function() {
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('wiki-content').style.display = 'grid';
};
