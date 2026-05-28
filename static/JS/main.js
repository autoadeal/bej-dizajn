document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Fade-in & Hero Animations
    gsap.to('body', { opacity: 1, duration: 0.5 });

    const heroTitle = document.querySelector("#heroTitle");
    if (heroTitle) {
        const tl = gsap.timeline();
        tl.fromTo("#heroTitle", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
          .fromTo("#heroSub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .fromTo("#heroBtns", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
    }

    // 2. Testimonials Scroll Line (Only if elements exist)
    const testimonialsSection = document.querySelector('.testimonials-section');
    const scrollLineFill = document.getElementById('testimFill');
    if (testimonialsSection && scrollLineFill) {
        gsap.to(scrollLineFill, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: testimonialsSection,
                start: "top 70%",
                end: "bottom 30%",
                scrub: true,
            }
        });
    }

    // 3. Project Estimator (Only runs on Estimate Page)
    if (document.getElementById('estimator-form')) {
        initEstimator();
    }

    // 4. Initialize Background, Reveals, and the New Process Stacking
    new LiquidBackground();
    initScrollTriggers();
    initProcessStacking(); // FIXED: This line was missing!
});

window.onload = () => {
    const track = document.getElementById('workTrack');
    
    // Updated selection: Find the new project wrappers (which now have the margin)
    const items = track ? track.querySelectorAll('.project-item') : [];
    
    if (track && items.length > 0) {
        // Calculate half the items more accurately for the seamless loop
        const halfIndex = items.length / 2;
        
        // Use getComputedStyle on the item to get its exact margin
        const itemStyle = getComputedStyle(items[0]);
        // Total width of one project item = element width + right margin
        const itemWidth = items[0].offsetWidth + parseFloat(itemStyle.marginRight);
        
        // Total distance to slide left before snapping back to 0
        // We need to move exactly by the width of the original 4 projects.
        const loopDistance = itemWidth * halfIndex;

        // Create and store the tween in a variable to pause/play specific timeline
        const loopTween = gsap.to(track, {
            x: -loopDistance, 
            duration: 25, 
            ease: "none", 
            repeat: -1,
            onReverseComplete: () => {
                // Keep the forward loop correct
                gsap.set(track, { x: -loopDistance });
            }
        });
        // PAUSE ON HOVER (Important for usability, only pause this specific animation)
        track.addEventListener('mouseenter', () => loopTween.pause());
        track.addEventListener('mouseleave', () => loopTween.play());
    }
};
// --- CORE FUNCTIONS ---

/**
 * Handles the stacking animation for the "Our Process" cards
 */
function initProcessStacking() {
    const cards = gsap.utils.toArray('.process-card');
    
    // Safety check to ensure we are on the About page where cards exist
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
        // We only animate cards that are NOT the last one (nothing stacks on the last one)
        if (i !== cards.length - 1) {
            gsap.to(card, {
                scale: 0.95 - (i * 0.01), 
                opacity: 0.3,
                scrollTrigger: {
                    trigger: card,
                    start: "top 120px", // Should match your CSS 'top' value
                  endTrigger: card.parentElement,
                    end: "bottom center",
                    scrub: true,
                    pinSpacing: false
                }
            });
        }
    });
}

function initEstimator() {
    const form = document.getElementById('estimator-form');
    if (!form) return;

    const EUR_TO_ALL = 102.04;

    // ── DATA MODEL ──────────────────────────────────────────────────────────
    const PROJECTS = {
        website: [
            { id: 'landing',      name: 'Landing Page',      base: 100, priceLabel: '€100',       hasPages: true,
              addons: [
                { name: 'Contact Form',       desc: 'Custom inquiry form', icon: 'fa-envelope',  price: 20 },
                { name: 'Custom Analytics',   desc: 'Detailed traffic insights', icon: 'fa-chart-bar', price: 30 },
                { name: 'Social Proof',       desc: 'Reviews & trust badges', icon: 'fa-star', price: 10 },
                { name: 'Animations',         desc: 'Smooth scroll animations', icon: 'fa-wand-magic-sparkles', price: 30 },
                { name: 'Theme Toggle',       desc: 'Light / dark mode switch', icon: 'fa-circle-half-stroke', price: 10 },
                { name: 'Dual-Language',      desc: 'Full bilingual support', icon: 'fa-language', price: 10 },
                { name: 'Mobile Responsive',  desc: 'Mobile Friendly', icon: 'fa-mobile', price: 20 },
                { name: 'Basic SEO',  desc: 'Search Engine Optimization', icon: 'fa-magnifying-glass', price: 10 },
              ]},
            { id: 'multipage',    name: 'Multi-Page Site',   base: 180, priceLabel: '€180',       hasPages: true,
              addons: [
                { name: 'Contact Form',       desc: 'Custom inquiry form', icon: 'fa-envelope', price: 20 },
                { name: 'Custom Analytics',   desc: 'Detailed traffic insights', icon: 'fa-chart-bar', price: 20 },
                { name: 'Social Proof',       desc: 'Reviews & trust badges', icon: 'fa-star', price: 10 },
                { name: 'Animations',         desc: 'Smooth scroll animations', icon: 'fa-wand-magic-sparkles', price: 50 },
                { name: 'Theme Toggle',       desc: 'Light / dark mode switch', icon: 'fa-circle-half-stroke', price: 20 },
                { name: 'Dual-Language',      desc: 'Full bilingual support', icon: 'fa-language', price: 25 },
                { name: 'Blog',               desc: 'Full CMS blog section', icon: 'fa-newspaper', price: 40 },
                { name: 'Advanced SEO',       desc: 'Schema, sitemaps & meta', icon: 'fa-magnifying-glass', price: 20 },
                { name: 'Bot Chat',           desc: 'AI-powered chatbot', icon: 'fa-robot', price: 80 },
                { name: 'Live Chat',          desc: 'Real-time support chat', icon: 'fa-comments', price: 60 },
              ]},
            { id: 'marketplace',  name: 'Marketplace',       base: 220, priceLabel: '€220',       hasPages: true,
              addons: [
                { name: 'Contact Form',       desc: 'Custom inquiry form', icon: 'fa-envelope', price: 20 },
                { name: 'Custom Analytics',   desc: 'Detailed traffic insights', icon: 'fa-chart-bar', price: 30 },
                { name: 'Social Proof',       desc: 'Reviews & trust badges', icon: 'fa-star', price: 10 },
                { name: 'Animations',         desc: 'Smooth scroll animations', icon: 'fa-wand-magic-sparkles', price: 60 },
                { name: 'Theme Toggle',       desc: 'Light / dark mode switch', icon: 'fa-circle-half-stroke', price: 25 },
                { name: 'Dual-Language',      desc: 'Full bilingual support', icon: 'fa-language', price: 30 },
                { name: 'Blog',               desc: 'Full CMS blog section', icon: 'fa-newspaper', price: 40 },
                { name: 'Advanced SEO',       desc: 'Schema, sitemaps & meta', icon: 'fa-magnifying-glass', price: 20 },
                { name: 'Bot Chat',           desc: 'AI-powered chatbot', icon: 'fa-robot', price: 80 },
                { name: 'Live Chat',          desc: 'Real-time support chat', icon: 'fa-comments', price: 60 },
                { name: 'Multi-Currency',     desc: 'Support multiple currencies', icon: 'fa-coins', price: 20 },
                { name: 'Advanced Filtering', desc: 'Smart search & filters', icon: 'fa-filter', price: 20 },
                { name: 'User Rating System', desc: 'Ratings & reviews engine', icon: 'fa-thumbs-up', price: 50 },
                { name: 'Admin Panel',        desc: 'Full backend dashboard', icon: 'fa-gauge', price: 80 },
                { name: 'Advanced Auth',      desc: 'OAuth & secure login flows', icon: 'fa-shield-halved', price: 20 },
              ]},
            { id: 'ecommerce',    name: 'E-Commerce',        base: 260, priceLabel: '€260',       hasPages: true,
              addons: [
                { name: 'Contact Form',       desc: 'Custom inquiry form', icon: 'fa-envelope', price: 20 },
                { name: 'Custom Analytics',   desc: 'Detailed traffic insights', icon: 'fa-chart-bar', price: 30 },
                { name: 'Social Proof',       desc: 'Reviews & trust badges', icon: 'fa-star', price: 10 },
                { name: 'Animations',         desc: 'Smooth scroll animations', icon: 'fa-wand-magic-sparkles', price: 60 },
                { name: 'Theme Toggle',       desc: 'Light / dark mode switch', icon: 'fa-circle-half-stroke', price: 25 },
                { name: 'Dual-Language',      desc: 'Full bilingual support', icon: 'fa-language', price: 30 },
                { name: 'Blog',               desc: 'Full CMS blog section', icon: 'fa-newspaper', price: 40 },
                { name: 'Advanced SEO',       desc: 'Schema, sitemaps & meta', icon: 'fa-magnifying-glass', price: 20 },
                { name: 'Bot Chat',           desc: 'AI-powered chatbot', icon: 'fa-robot', price: 80 },
                { name: 'Live Chat',          desc: 'Real-time support chat', icon: 'fa-comments', price: 60 },
                { name: 'Multi-Currency',     desc: 'Support multiple currencies', icon: 'fa-coins', price: 20 },
                { name: 'Advanced Filtering', desc: 'Smart search & filters', icon: 'fa-filter', price: 20 },
                { name: 'User Rating System', desc: 'Ratings & reviews engine', icon: 'fa-thumbs-up', price: 50 },
                { name: 'Payment Gateway',    desc: 'Stripe / PayPal integration', icon: 'fa-credit-card', price: 70 },
                { name: 'Wishlist',           desc: 'Save items for later', icon: 'fa-heart', price: 10 },
                { name: 'Order Tracking',     desc: 'Real-time order status', icon: 'fa-truck', price: 50 },
                { name: 'FAQ Section',        desc: 'Collapsible FAQ module', icon: 'fa-circle-question', price: 10 },
                { name: 'Admin Panel',        desc: 'Full backend dashboard', icon: 'fa-gauge', price: 100 },
                { name: 'Inventory Mgmt',     desc: 'Stock tracking & alerts', icon: 'fa-boxes-stacked', price: 40 },
                { name: 'Promo & Gift Cards', desc: 'Discount codes & vouchers', icon: 'fa-tag', price: 25 },
                { name: 'Advanced Auth',      desc: 'OAuth & secure login flows', icon: 'fa-code', price: 20 },
              ]},
            { id: 'maintenance',  name: 'Site Maintenance',  base: 0,   priceLabel: 'Custom',     hasPages: false,
              addons: [
                { name: 'Cloud Backups',      desc: 'Automated backup system', icon: 'fa-cloud', price: 30 },
                { name: 'Performance Monitoring', desc: '24/7 uptime & alerts', icon: 'fa-bell', price: 30 },
                { name: 'Domain & DNS Mgmt', desc: 'Full DNS management', icon: 'fa-globe', price: 30 },
                { name: 'Broken Link Fixes',  desc: 'Link scanning & repairs', icon: 'fa-link-slash', price: 30 },
                { name: 'Content Updates',    desc: 'Basic content edits', icon: 'fa-pen-to-square', price: 20 },
                { name: 'Analytics Reporting',desc: 'Monthly traffic reports', icon: 'fa-chart-line', price: 30 },
                { name: 'Speed Optimization', desc: 'Core Web Vitals tuning', icon: 'fa-bolt', price: 50 },
                { name: 'SEO Audit',          desc: 'Full SEO health check', icon: 'fa-magnifying-glass', price: 20 },
                { name: 'DB Optimization',    desc: 'Database performance tuning', icon: 'fa-database', price: 50 },
                { name: 'Inventory Syncing',  desc: 'External inventory sync', icon: 'fa-rotate', price: 30 },
              ]},
            { id: 'custompanel',  name: 'Custom Panel',      base: 100, priceLabel: '€100–€900', hasPages: false, addons: [] },
        ],
        digital: [
            { id: 'menu',       name: 'Digital Menu',           base: 60,  priceLabel: '€60 / yr',  hasPages: false,
              addons: [{ name: 'Editing Panel', desc: 'Price & product management (one-time)', icon: 'fa-sliders', price: 40 }] },
            { id: 'catalog',    name: 'Digital Catalog',        base: 40,  priceLabel: '€40',        hasPages: false, addons: [] },
            { id: 'inventory',  name: 'Inventory Management',   base: 50,  priceLabel: '€50',        hasPages: false, addons: [] },
            { id: 'pos',        name: 'POS System',             base: 52,  priceLabel: '€52–€136/yr',hasPages: false, addons: [] },
            { id: 'dealership', name: 'Dealership Membership',  base: 36,  priceLabel: '€36–€365/yr',hasPages: false, addons: [] },
        ],
        design: [
            { id: 'logo',       name: 'Logo Design',            base: 40,  priceLabel: '€40–€80',   hasPages: false, addons: [] },
            { id: 'poster',     name: 'Poster Design',          base: 40,  priceLabel: '€40',        hasPages: false, addons: [] },
            { id: 'bizcard',    name: 'Business Cards',         base: 30,  priceLabel: '€30',        hasPages: false, addons: [] },
            { id: 'brochure',   name: 'Brochures',              base: 25,  priceLabel: '€25',        hasPages: false, addons: [] },
            { id: 'packaging',  name: 'Packaging Design',       base: 30,  priceLabel: '€30–€150',  hasPages: false, addons: [] },
            { id: 'brand',      name: 'Brand Identity',         base: 250, priceLabel: '€250',       hasPages: false, addons: [] },
        ],
        growth: [
            { id: 'seo',        name: 'Full SEO',               base: 50,  priceLabel: '€50',        hasPages: false, addons: [] },
            { id: 'social',     name: 'Social Media Management',      base: 100, priceLabel: '€100 / mo',  hasPages: false, addons: [] },
            { id: 'email',      name: 'Email Marketing',        base: 30,  priceLabel: '€30–€60/mo', hasPages: false, addons: [] },
        ],
    };

    // ── STATE ────────────────────────────────────────────────────────────────
    let currentCategory = 'website';
    let currentProject = null;

    // ── DOM REFS ─────────────────────────────────────────────────────────────
    const specificSection  = document.getElementById('specific-project-section');
    const specificGrid     = document.getElementById('specific-project-grid');
    const pagesSection     = document.getElementById('pages-section');
    const pageInput        = document.getElementById('page-count');
    const addonsSection    = document.getElementById('addons-section');
    const addonGrid        = document.getElementById('addon-list-grid');
    const currencyToggle   = document.getElementById('currency-toggle');
    const totalDisplay     = document.getElementById('total-price');
    const projectNameEl    = document.getElementById('selected-project-name');

    // ── RENDER SPECIFIC PROJECTS ─────────────────────────────────────────────
    function renderSpecificProjects(category) {
        const projects = PROJECTS[category] || [];
        specificGrid.innerHTML = '';
        currentProject = null;

        projects.forEach((proj, i) => {
            const id = `sp-${proj.id}`;
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'specific_project';
            input.id = id;
            input.value = proj.id;
            if (i === 0) { input.checked = true; }

            const label = document.createElement('label');
            label.htmlFor = id;
            label.className = 'specific-tile';
            label.innerHTML = `<span class="sp-name">${proj.name}</span><span class="sp-price">${proj.priceLabel}</span>`;

            input.addEventListener('change', () => {
                selectProject(proj);
            });

            specificGrid.appendChild(input);
            specificGrid.appendChild(label);
        });

        if (projects.length > 0) selectProject(projects[0]);
    }

    // ── SELECT A SPECIFIC PROJECT ────────────────────────────────────────────
    function selectProject(proj) {
        currentProject = proj;

        // Pages slider: only show for website projects with hasPages
        pagesSection.style.display = proj.hasPages ? 'block' : 'none';
        if (!proj.hasPages && pageInput) pageInput.value = 1;

        // Add-ons
        if (proj.addons && proj.addons.length > 0) {
            renderAddons(proj.addons);
            addonsSection.style.display = 'block';
        } else {
            addonGrid.innerHTML = '';
            addonsSection.style.display = 'none';
        }

        calculate();
    }
    

    // ── RENDER ADD-ONS ───────────────────────────────────────────────────────
    function renderAddons(addons) {
        addonGrid.innerHTML = '';
        addons.forEach(addon => {
            const item = document.createElement('div');
            item.className = 'addon-item';
            const uid = `addon-${addon.name.replace(/\s+/g, '-').toLowerCase()}`;
            item.innerHTML = `
                <div class="addon-info">
                    <i class="fas ${addon.icon} addon-icon"></i>
                    <div>
                        <span class="addon-name">${addon.name}</span>
                        <span class="addon-desc">${addon.desc} — <strong style="color:var(--primary-purple)">+€${addon.price}</strong></span>
                    </div>
                </div>
                <label class="switch">
                    <input type="checkbox" id="${uid}" name="addon" value="${addon.price}">
                    <span class="slider round"></span>
                </label>`;
            item.querySelector('input[type="checkbox"]').addEventListener('change', calculate);
            addonGrid.appendChild(item);
        });
    }

    // ── CALCULATE ────────────────────────────────────────────────────────────
    function calculate() {
        if (!currentProject) return;

        const isLek = currencyToggle && currencyToggle.checked;
        const rate   = isLek ? EUR_TO_ALL : 1;
        const symbol = isLek ? 'ALL' : '€';

        const base = currentProject.base || 0;
        const baseCost = base * rate;

        const pages = parseInt(pageInput ? pageInput.value : 1) || 1;
        const pagesVal = currentProject.hasPages && pages > 1 ? (pages - 1) * 5 : 0;
        const pagesCost = pagesVal * rate;

        let addonsVal = 0;
        form.querySelectorAll('input[name="addon"]:checked').forEach(inp => {
            addonsVal += parseInt(inp.value);
        });
        const addonsCost = addonsVal * rate;

        const total = baseCost + pagesCost + addonsCost;

        document.getElementById('base-cost-display').innerText  = Math.round(baseCost).toLocaleString('en-US');
        document.getElementById('pages-cost-display').innerText = Math.round(pagesCost).toLocaleString('en-US');
        document.getElementById('addons-cost-display').innerText = Math.round(addonsCost).toLocaleString('en-US');

        if (projectNameEl) projectNameEl.innerText = currentProject.name;

        const currentVal = { val: parseFloat(totalDisplay.innerHTML.replace(/,/g, '')) || 0 };
        gsap.to(currentVal, {
            val: total,
            duration: 0.5,
            onUpdate: () => { totalDisplay.innerHTML = Math.round(currentVal.val).toLocaleString('en-US'); }
        });

        document.querySelectorAll('.currency-symbol, .cur-break').forEach(el => el.innerText = symbol);

        const pageLabel = document.getElementById('page-count-display');
        if (pageLabel && pageInput) pageLabel.innerText = (parseInt(pageInput.value) >= 20) ? '20+' : pageInput.value;

        // Currency label active state
        if (currencyToggle) {
            const parent = currencyToggle.parentElement;
            if (parent) {
                const lekLabel = parent.nextElementSibling;
                const eurLabel = parent.previousElementSibling;
                if (isLek) { lekLabel && lekLabel.classList.add('active'); eurLabel && eurLabel.classList.remove('active'); }
                else        { eurLabel && eurLabel.classList.add('active'); lekLabel && lekLabel.classList.remove('active'); }
            }
        }
    }

    // ── EVENT LISTENERS ──────────────────────────────────────────────────────
    form.querySelectorAll('input[name="project_category"]').forEach(radio => {
        radio.addEventListener('change', () => {
            currentCategory = radio.value;
            renderSpecificProjects(currentCategory);
        });
    });

    if (pageInput) pageInput.addEventListener('input', calculate);
    if (currencyToggle) currencyToggle.addEventListener('change', calculate);

    // ── INIT ─────────────────────────────────────────────────────────────────
    renderSpecificProjects('website');
}

function initScrollTriggers() {
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        ScrollTrigger.create({
            trigger: elem,
            start: "top 85%",
            onEnter: () => elem.classList.add('active'),
            once: true 
        });
    });

    const scrollBtn = document.getElementById("scrollToTop");
    if (scrollBtn) {
        ScrollTrigger.create({
            start: "400px top",
            onEnter: () => {
                scrollBtn.style.display = "block";
                gsap.to(scrollBtn, { opacity: 1, duration: 0.3 });
            },
            onLeaveBack: () => {
                gsap.to(scrollBtn, { 
                    opacity: 0, 
                    duration: 0.3, 
                    onComplete: () => scrollBtn.style.display = "none" 
                });
            }
        });
        scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// --- VISUAL CLASSES ---

class LiquidBackground {
    constructor() {
        this.canvas = document.getElementById('liquid-canvas');
        if (!this.canvas) return;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.scene = new THREE.Scene();
        this.colors = { purple: new THREE.Color(0x7f57f9), dark: new THREE.Color(0x010103), white: new THREE.Color(0xffffff) };
        this.isVisible = true; 
            if (window.innerWidth > 768) {
            this.init();
        } else {
            if (this.canvas) this.canvas.style.display = 'none';
        }
    }

    init() {
        const fov = (this.camera.fov * Math.PI) / 180;
        const h = Math.abs(this.camera.position.z * Math.tan(fov / 2) * 2);
        const geometry = new THREE.PlaneGeometry(h * this.camera.aspect * 1.3, h * 1.3, 128, 128);
        
        this.material = new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 }, uColorPurple: { value: this.colors.purple }, uColorDark: { value: this.colors.dark }, uColorWhite: { value: this.colors.white } },
            vertexShader: `varying vec2 vUv; uniform float uTime; void main() { vUv = uv; vec3 pos = position; pos.z += sin(pos.x * 1.2 + uTime * 0.3) * cos(pos.y * 1.2 + uTime * 0.3) * 0.7; gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0); }`,
            fragmentShader: `varying vec2 vUv; uniform float uTime; uniform vec3 uColorPurple; uniform vec3 uColorDark; uniform vec3 uColorWhite; void main() { vec2 uv = vUv; vec2 warp = uv; warp.x += sin(uv.y * 3.0 + uTime * 0.4) * 0.2; warp.y += cos(uv.x * 3.0 + uTime * 0.4) * 0.2; float combined = mix(sin(warp.x * 4.0 + warp.y * 2.0 + uTime * 0.5) * 0.5 + 0.5, sin(warp.y * 5.0 - warp.x * 3.0 + uTime * 0.7) * 0.5 + 0.5, 0.5); vec3 finalColor = mix(uColorDark, uColorPurple, combined * 0.8); finalColor = mix(finalColor, uColorWhite, smoothstep(0.75, 0.95, combined) * 0.4); gl_FragColor = vec4(finalColor, 1.0); }`
        });

        this.scene.add(new THREE.Mesh(geometry, this.material));
        window.addEventListener('resize', () => this.onResize());
        
        const observer = new IntersectionObserver((entries) => {
            this.isVisible = entries[0].isIntersecting;
        });
        observer.observe(this.canvas);

        this.animate();
    }

    onResize() {
        if (!this.canvas || !this.canvas.parentElement) return;
        const width = this.canvas.parentElement.clientWidth;
        const height = this.canvas.parentElement.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (!this.isVisible) return; 
        
        this.material.uniforms.uTime.value += 0.05;
        this.renderer.render(this.scene, this.camera);
    }
}