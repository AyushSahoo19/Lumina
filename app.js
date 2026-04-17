const linksData = [
    {
        id: "design",
        title: "Design Inspirations",
        iconClass: "cat-icon-design",
        icon: "🎨",
        links: [
            { url: "https://www.awwwards.com/websites/culture-education/", title: "Awwwards Culture & Edu", sub: "Showcase" },
            { url: "https://larsonstudio.com/", title: "Larson Studio", sub: "Studio" },
            { url: "https://www.zenda.com/", title: "Zenda", sub: "Studio" },
            { url: "https://readymag.com/readymag/tiktok/?utm_source=awwwards&utm_medium=partnership_submission&utm_campaign=tiktok", title: "Readymag TikTok", sub: "Showcase" },
            { url: "https://watchgorillascience.com/", title: "Gorilla Science", sub: "Showcase" },
            { url: "https://uglyuiclub.figma.site/", title: "Ugly UI Club", sub: "Community" },
            { url: "https://www.osmo.supply/", title: "Osmo Supply", sub: "Tools" },
            { url: "https://www.westbournegrammar.com/", title: "Westbourne Grammar", sub: "Edu" },
            { url: "https://aidesign-os.com/", title: "AI Design OS", sub: "Tools" },
            { url: "https://mathaf.org.qa/en/encyclopedia/", title: "Mathaf Encyclopedia", sub: "Edu" },
            { url: "https://sleep-well-creatives.com/", title: "Sleep Well Creatives", sub: "Studio" },
            { url: "https://abroadsocial.com/contact", title: "Abroad Social", sub: "Studio" },
            { url: "https://interface.fh-potsdam.de/ma-speculative-software/", title: "Speculative Software", sub: "Edu" },
            { url: "https://www.eticalgarve.com/", title: "ETIC Algarve", sub: "Edu" },
            { url: "https://www.mutwerk.org/", title: "Mutwerk", sub: "Studio" },
            { url: "https://www.ancestry.com/stories-of-us", title: "Ancestry Stories of Us", sub: "Showcase" },
            { url: "https://www.framer.com/domains/?utm_source=dribbble&utm_medium=paid&utm_campaign=freedomains&dub_id=bnrKPNz5mx488N0U", title: "Framer Domains", sub: "Tools" },
            { url: "https://dataclay.com/landing/try-dataclay-templater/?utm_source=dribbble&utm_medium=sponsorship&utm_campaign=templater&utm_content=t_logo", title: "Dataclay Templater", sub: "Tools" },
            { url: "https://chromewebstore.google.com/detail/save-all-tab-urls/bgjfbcjoaghcfdhnnnnaofkjbnelkkcm", title: "Save Tabs Extension", sub: "Tools" }
        ]
    },
    {
        id: "llm",
        title: "LLM Portals",
        iconClass: "cat-icon-llm",
        icon: "🧠",
        links: [
            { url: "https://chatgpt.com", title: "ChatGPT", sub: "Chat" },
            { url: "https://claude.ai", title: "Claude AI", sub: "Chat" },
            { url: "https://gemini.google.com", title: "Google Gemini", sub: "Chat" },
            { url: "https://perplexity.ai", title: "Perplexity AI", sub: "Search" },
            { url: "https://huggingface.co/chat", title: "HuggingChat", sub: "Chat" },
            { url: "https://meta.ai", title: "Meta AI", sub: "Chat" }
        ]
    },
    {
        id: "resources",
        title: "Dev Resources",
        iconClass: "cat-icon-resources",
        icon: "🛠️",
        links: [
            { url: "https://github.com", title: "GitHub", sub: "Dev" },
            { url: "https://developer.mozilla.org", title: "MDN Web Docs", sub: "Docs" },
            { url: "https://stackoverflow.com", title: "Stack Overflow", sub: "Community" },
            { url: "https://vercel.com", title: "Vercel Deployment", sub: "Dev" },
            { url: "https://figma.com", title: "Figma Design", sub: "Dev" },
            { url: "https://css-tricks.com", title: "CSS Tricks", sub: "Docs" }
        ]
    },
    {
        id: "aiml",
        title: "AI & ML",
        iconClass: "cat-icon-aiml",
        icon: "📊",
        links: [
            { url: "https://huggingface.co", title: "Hugging Face Hub", sub: "Community" },
            { url: "https://paperswithcode.com", title: "Papers With Code", sub: "Research" },
            { url: "https://kaggle.com", title: "Kaggle", sub: "Community" },
            { url: "https://replicate.com", title: "Replicate", sub: "Models" },
            { url: "https://pytorch.org", title: "PyTorch Deep Learning", sub: "Research" },
            { url: "https://civitai.com", title: "Civitai Models", sub: "Models" }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const filterBar = document.getElementById('filter-bar');
    const subFilterBar = document.getElementById('sub-filter-bar');
    const container = document.getElementById('links-container');
    
    // Check if we are on the dashboard page
    if (!filterBar || !container) {
        console.log("Subpage detected: Dashboard logic disabled.");
        return;
    }
    
    let allLinks = [];
    let currentMainFilter = 'all';
    let currentSubFilter = 'all';
    
    // Create 'All' filter button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.innerText = 'All Tabs';
    filterBar.appendChild(allBtn);

    // Flatten data and create filter buttons
    linksData.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = category.id;
        btn.innerHTML = category.title;
        filterBar.appendChild(btn);

        category.links.forEach(link => {
            allLinks.push({
                ...link,
                categoryId: category.id,
                categoryTitle: category.title,
                categoryIcon: category.icon,
                categoryIconClass: category.iconClass
            });
        });
    });

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const renderSubFilters = (mainFilterId) => {
        if (!subFilterBar) return;
        subFilterBar.innerHTML = '';
        currentSubFilter = 'all';

        if (mainFilterId === 'all') {
            subFilterBar.style.display = 'none';
            return;
        }

        subFilterBar.style.display = 'flex';
        
        // Get unique subcategories for this main category
        const subCats = [...new Set(allLinks.filter(l => l.categoryId === mainFilterId).map(l => l.sub))].sort();
        
        // Add 'All' sub-filter
        const allBtn = document.createElement('button');
        allBtn.className = 'sub-filter-btn active';
        allBtn.innerText = 'Everything';
        allBtn.onclick = () => updateSubFilter('all', allBtn);
        subFilterBar.appendChild(allBtn);

        subCats.forEach(sub => {
            if (sub) {
                const btn = document.createElement('button');
                btn.className = 'sub-filter-btn';
                btn.innerText = sub;
                btn.onclick = () => updateSubFilter(sub, btn);
                subFilterBar.appendChild(btn);
            }
        });
    };

    const updateSubFilter = (subId, btn) => {
        currentSubFilter = subId;
        document.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLinks();
    };

    const renderLinks = () => {
        container.innerHTML = '';
        
        let filtered = allLinks;
        if (currentMainFilter !== 'all') {
            filtered = filtered.filter(l => l.categoryId === currentMainFilter);
        }
        if (currentSubFilter !== 'all') {
            filtered = filtered.filter(l => l.sub === currentSubFilter);
        }

        filtered.forEach((link, index) => {
            const card = document.createElement('a');
            card.className = 'link-card';
            card.href = link.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.style.transitionDelay = `${(index % 10) * 0.05}s`;

            let domain = "";
            try {
                domain = new URL(link.url).hostname.replace('www.', '');
            } catch(e) { domain = link.url; }

            const thumbnailSrc = `https://image.thum.io/get/width/600/crop/800/${link.url}`;
            const fallbackSrc = `https://www.google.com/s2/favicons?domain=${link.url}&sz=128`;

            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${thumbnailSrc}" onerror="this.onerror=null; this.src='${fallbackSrc}'; this.classList.add('fallback-icon');" alt="${link.title}" loading="lazy">
                    <div class="category-badge">
                        ${link.sub || link.categoryTitle}
                    </div>
                </div>
                <div class="card-content">
                    <h3>${link.title}</h3>
                    <p class="url-display">${domain}</p>
                </div>
            `;
            container.appendChild(card);
            scrollObserver.observe(card);
        });
    };

    // Initial render
    renderLinks();

    // Filter event listeners
    filterBar.addEventListener('click', (e) => {
        const clickedBtn = e.target.closest('.filter-btn');
        if (clickedBtn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            clickedBtn.classList.add('active');
            
            currentMainFilter = clickedBtn.dataset.filter;
            renderSubFilters(currentMainFilter);
            renderLinks();
        }
    });
});
