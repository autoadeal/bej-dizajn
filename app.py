from flask import Flask, render_template, request, session, redirect, url_for, Response 
from flask import request as flask_request
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'fallback-dev-key')

@app.context_processor
def inject_translations():
    return dict(
        t=translations[session['lang']],
        current_lang=session['lang'],
        request=flask_request  # expose request to templates
    )

@app.route('/sitemap.xml')
def sitemap():
    pages = ['', '/services', '/packages', '/about', '/contact', '/estimate']
    urls = ''.join([
        f'<url><loc>https://bejdizajn.al{p}</loc><changefreq>monthly</changefreq><priority>{"1.0" if p == "" else "0.8"}</priority></url>'
        for p in pages
    ])
    xml = f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>'
    return Response(xml, mimetype='application/xml')

@app.route('/robots.txt')
def robots():
    content = "User-agent: *\nAllow: /\nSitemap: https://bejdizajn.al/sitemap.xml"
    return Response(content, mimetype='text/plain')

translations = {
    'en': {
        'nav_home': 'Home', 'nav_services': 'Services', 'nav_packages': 'Packages',
        'nav_about': 'About', 'nav_contact': 'Contact', 'nav_estimate': 'Estimate',
        'hero_title': 'Elevate your business with Bej Dizajn',
        'hero_sub': 'Where aesthetics meet functionality. Specializing in bespoke brand identities and responsive web design that elevates your digital presence',
        'serv_hero': 'Our Services',
        'serv_sub': 'Bringing your ideas to life through design and code.',
        'pack_hero': 'Choose Your Plan',
        'pack_sub': 'Select a package that fits your goals and lets start building your digital presence today.',
        'contact_header': "Contact Us",
        'contact_title': "Let's Work Together",
        'contact_subtitle': "Have a project in mind? Let's discuss how we can bring it to life",
        'contact_submit': 'Send Message',
        'contact_location': 'Location',
        'error_title': '404 - Lost in Space',
        'back_home': 'Return to Reality',
        'about_header': 'About Us',
        'packages_header': 'Choose Your Plan',
        'services_header': 'Our Sercvices',
        'error_subtitle' : 'The page you are looking for has been moved to another dimension.',
        'about_subtitle' : 'Two minds, one vision. We are a design and development duo bringing a fresh perspective to the digital landscape. We combine bold creativity with clean code to help modern brands stand out and scale.',
        'about_creative': 'The Creative Lead',
        'about_technical': 'The Technical Lead',
        'creative_desc': "Focusing on your brand's visual soul. She creates purposeful, high-end designs that ensure your vision is felt in every pixel.",
        'technical_desc': "Turning design into digital reality. He builds fast, secure, & responsive websites using clean code and smart technical strategy.",
        'process_head': 'Our Process',
        'step1': 'Step 01',
        'step2': 'Step 02',
        'step3': 'Step 03',
        'step4': 'Step 04',
        'step5': 'Step 05',
        'step1_title': 'Discovery & Strategy',
        'step2_title': 'Creative Concept',
        'step3_title': 'Technical Build',
        'step4_title': 'Testing & Refinement',
        'step5_title': 'Launch & Support',
        'step1_desc': "We dive deep into your brand's DNA to define the project goals and technical roadmap.",
        'step2_desc': 'Developing the visual soul of your brand through high-end design and purposeful aesthetics.',
        'step3_desc': 'Turning pixels into performance. We build fast, secure, and responsive digital experiences.',
        'step4_desc': 'Meticulous quality assurance to ensure everything runs perfectly across all devices.',
        'step5_desc': 'The final deployment and ongoing optimization to ensure your brand scales effectively.',
        #Services Page Translations
        'services_header': 'Services',
        'services_subtitle': 'Bringing your ideas to life through code and design.',
        'web_title': 'Web',
        'web_design': 'Web Design',
        'web_dev': 'Web Development',
        'web_maintenance': 'Site Maintenance',
        'branding_title': 'Branding',
        'logo_design': 'Logo Design',
        'brand_identity': 'Brand Identity',
        'business_cards': 'Business Cards',
        'design_title': 'Design',
        'graphic_design': 'Graphic Design',
        'poster_design': 'Poster Design',
        'product_design': 'Product Design',
        'digital_title': 'Digital',
        'digital_menus': 'Digital Menus',
        'brochures': 'Brochures',
        'social_media': 'Social Media',
        'strategy_title': 'Strategy',
        'landing_pages': 'Landing Pages',
        'ui_ux': 'UI / UX',
        'style_guides': 'Style Guides',
        'setup_title': 'Setup',
        'seo': 'SEO',
        'domain_setup': 'Domain Setup',
        'admin_panels': 'Admin Panels',
        #Packages Page Translations
        'packages_subtitle': 'Select a package that fits your goals and let\'s start building your digital presence today.',
        'btn_select_plan': 'Select Plan',
        'pkg_quick_launch': 'Quick Launch',
        'pkg_digital_growth': 'Digital Growth',
        'pkg_creative_kit': 'Creative Kit',
        'pkg_business_growth': 'Business Growth',
        'pkg_signature_exp': 'Signature Experience',
        'pkg_custom_project': 'Custom Project',
        'feat_single_page': 'Single Page Site',
        'feat_multi_page': '2-5 Page Website',
        'feat_custom_site': "5–8 Page Custom Site",
        'feat_ecommerce': 'Full E-commerce Shop',
        'feat_basic_seo': 'Basic SEO Setup',
        'feat_advanced_seo': 'Advanced SEO Setup',
        'feat_mobile_responsive': 'Mobile Responsive',
        'feat_logo_palette': 'Logo + Color Palette',
        'feat_full_identity': 'Full Brand Identity',
        'feat_social_kit': 'Social Media Kit',
        'feat_business_cards': 'Business Card Design',
        'feat_inventory_mgmt': 'Inventory Management',
        'feat_admin_panel': 'Admin Panel',
        'custom_subtitle': 'Looking for something entirely unique?',
        'price_tailored': 'Tailored',
        'custom_desc': 'Build a project based on your specific requirements and budget.',
        'btn_build_custom': 'Build Custom Plan',
        #Estimate Page Translations
        'est_page_header': 'Estimate Your Project',
        'calc_title': 'Project Calculator',
        'est_sub': 'Get an instant estimate for your custom project based on your needs.',
        'label_project_type': 'Project Type',
        'label_specific_project': 'Specific Project',
        'label_estimated_pages': 'Estimated Pages',
        'label_pages_unit': 'Pages',
        'label_addons_features': 'Add-ons & Features',
        'type_website_title': 'Website',
        'type_website_desc': 'Modern, responsive and secure custom websites',
        'type_digital_title': 'Digital',
        'type_digital_desc': 'Interactive digital assets for modern screens',
        'type_design_title': 'Design',
        'type_design_desc': 'High-end visual identities and graphic design',
        'type_growth_title': 'Growth',
        'type_growth_desc': 'SEO, social media and marketing automation',
        'estimate_result_title': 'Project Estimate',
        'est_currency_eur': 'EUR',
        'est_currency_all': 'LEK',
        'est_base_cost': 'Base Cost',
        'est_pages_cost': 'Pages Cost',
        'est_addons_cost': 'Add-ons Cost',
        'est_get_quote': 'Get a Free Quote',
        #Home Page Translations
        'hero_title_main': 'Elevate your business with',
        'hero_brand': 'Bej Dizajn.',
        'hero_subtitle': 'Where aesthetics meet functionality. Specializing in bespoke responsive web design and brand identities that elevate your digital presence.',
        'btn_estimate_cost': 'Estimate Your Cost',
        'btn_chat_us': 'Chat with us',
        'pkg_quick_sub': 'Best for fast & professional online presence.',
        'pkg_digital_sub': 'Best for startups building complete foundations.',
        'btn_get_started': 'Get Started',
        'services_title': 'Our Services',
        'services_sub': 'Specialized skills to make your business stand out.',
        'srv_web_dev_title': 'Custom Web Development',
        'srv_web_dev_desc': 'Blazing-fast, highly secure digital architecture tailored to your exact business logic and scalability needs.',
        'srv_ui_ux_title': 'UI/UX Design',
        'srv_ui_ux_desc': 'Immersive, high-fidelity digital interfaces designed to captivate users and elevate your brand\'s aesthetic.',
        'srv_ecom_title': 'E-Commerce',
        'srv_ecom_desc': 'Premium digital storefronts engineered to maximize conversions and deliver a luxury shopping experience.',
        'srv_brand_title': 'Brand Identity & Strategy',
        'srv_brand_desc': 'Cohesive visual systems—from logo design to complete brand guidelines—built to establish market authority.',
        'work_title': 'Our Work',
        'work_sub': 'Selected highlights from our full portfolio.',
        'work_cat_ecom': 'E-Commerce',
        'work_cat_branding': 'Branding',
        'work_cat_auto': 'Auto Marketplace',
        'work_cat_logo': 'Logo',
        'testim_title': 'What Our Partners Say',
        'testim_subtitle': "Real feedback from the brands we've helped grow.",
        'testim_1_text': 'Our new e-commerce platform completely transformed how we sell car parts and accessories. The site is fast and gives our customers that premium, luxury shopping experience we were looking for. Highly recommend!',
        'testim_2_text': 'They took our vision for a car buying and selling marketplace and turned it into a high-performance digital platform. The seamless user flow, combined with a striking visual identity, gave our brand instant credibility in the automotive market from day one.',
        'testim_3_text': 'The social media assets created for our villa perfectly captured the high-end, exclusive vibe of our property. The visual storytelling and immersive grid layouts completely elevated our digital presence and immediately drove higher booking inquiries.',
        'testim_4_text': 'Stunning minimalist design and flawless responsiveness. The attention to details completely elevated our digital presence.',
        'cta_title': "Don't know where to start?",
        'cta_sub': 'Use our advanced project estimator to get a rough idea.',
        'btn_calc_cost': 'Calculate Cost',
    },
    'sq': {
        'nav_home': 'Kreu', 'nav_services': 'Shërbimet', 'nav_packages': 'Paketat',
        'nav_about': 'Rreth Nesh', 'nav_contact': 'Kontakt', 'nav_estimate': 'Vlerësimi',
        'hero_title': 'Ngrini biznesin tuaj me Bej Dizajn',
        'hero_sub': 'Sjellim idetë tuaja në jetë përmes dizajnit dhe kodit.',
        'serv_hero': 'Shërbimet Tona',
        'serv_sub': 'Sjellim idetë tuaja në jetë përmes dizajnit dhe kodit.',
        'pack_hero': 'Zgjidhni Planin Tuaj',
        'pack_sub': 'Zgjidhni një paketë që i përshtatet qëllimeve tuaja dhe le të fillojmë sot.',
        'contact_header': "Na Kontaktoni",
        'contact_title': 'Le të punojmë bashkë',
        'contact_subtitle': "Keni një projekt në mendje? Le të diskutojmë si mund ta realizojmë.",
        'contact_submit': 'Dërgo Mesazhin',
        'contact_location': 'Vendndodhja',
        'error_title': '404 - Humbur në Hapësirë',
        'back_home': 'Kthehu në Realitet',
        'about_header': 'Rreth Nesh',
        'packages_header': 'Zgjidhni Planin Tuaj',
        'services_header': 'Sherbimet tona',
        'error_subtitle' : 'Faqja që po kërkoni është zhvendosur në një dimension tjetër.',
        'about_subtitle' : 'Dy mendje, një vizion. Ne jemi një duo dizajni dhe programimi që sjellim një perspektivë të re në peizazhin dixhital. Ne kombinojmë kreativitetin e guximshëm me kodin e pastër për të ndihmuar brandet moderne të dallohen dhe të zgjerohen.',
        'about_creative': 'Udhëheqësi Krijues',
        'about_technical': 'Udhëheqësi Teknik',
        'creative_desc': "Duke u përqendruar në shpirtin vizual të markës suaj. Ajo krijon dizajne me pikësynim dhe të nivelit të lartë që sigurojnë që vizioni juaj të ndihet në çdo piksel.",
        'technical_desc': "Duke e kthyer dizajnin në realitet dixhital. Ai ndërton faqe interneti të shpejta, të sigurta dhe që i përgjigjen nevojave të përdoruesit duke përdorur kod të pastër dhe strategji teknike të zgjuar.",
        'process_head' : 'Procesi Ynë',
        'step1': 'Hapi 01',
        'step2': 'Hapi 02',
        'step3': 'Hapi 03',
        'step4': 'Hapi 04',
        'step5': 'Hapi 05',
        'step1_title': 'Zbulim & Strategji',
        'step2_title': 'Koncepti Krijues',
        'step3_title': 'Ndërtim Teknik',
        'step4_title': 'Testim dhe Përmirësim',
        'step5_title': 'Dorëzim dhe Mbështetje',
        'step1_desc': "Ne zhytemi thellë në ADN-në e markës suaj për të përcaktuar qëllimet e projektit dhe planin teknik.",
        'step2_desc': 'Zhvillimi i shpirtit vizual të markës suaj përmes dizajnit të nivelit të lartë dhe estetikës së qëllimshme.',
        'step3_desc': 'Shndërrimi i pikselëve në performancë. Ne ndërtojmë përvoja dixhitale të shpejta, të sigurta dhe reaguese.',
        'step4_desc': 'Sigurim i kujdesshëm i cilësisë për të siguruar që gjithçka të funksionojë në mënyrë të përsosur në të gjitha pajisjet.',
        'step5_desc': 'Dorëzimi përfundimtarë dhe optimizimi i vazhdueshëm për të siguruar që marka juaj të shkallëzohet në mënyrë efektive.',
        #Services Page Translations
        'services_header': 'Shërbimet',
        'services_subtitle': 'Jetësojmë idetë tuaja përmes kodit dhe dizajnit.',
        'web_title': 'Web',
        'web_design': 'Dizajn Web',
        'web_dev': 'Zhvillim Web',
        'web_maintenance': 'Mirëmbajtje',
        'branding_title': 'Branding',
        'logo_design': 'Dizajn Logoje',
        'brand_identity': 'Identitet Brandi',
        'business_cards': 'Kartëvizita',
        'design_title': 'Dizajn',
        'graphic_design': 'Dizajn Grafik',
        'poster_design': 'Dizajn Posterash',
        'product_design': 'Dizajn Produkti',
        'digital_title': 'Dixhital',
        'digital_menus': 'Menu Dixhitale',
        'brochures': 'Broshura',
        'social_media': 'Rrjete Sociale',
        'strategy_title': 'Strategji',
        'landing_pages': 'Faqe Hyrëse',
        'ui_ux': 'UI / UX',
        'style_guides': 'Udhëzues Stili',
        'setup_title': 'Konfigurim',
        'seo': 'SEO',
        'domain_setup': 'Konfigurim Domain-i',
        'admin_panels': 'Panele Administratori',
        #Packages Page Translations
        'packages_subtitle': 'Zgjidhni një paketë që përshtatet me qëllimet tuaja dhe le të fillojmë ndërtimin e pranisë suaj dixhitale sot.',
        'btn_select_plan': 'Zgjidh Planin',
        'pkg_quick_launch': 'Quick Launch',
        'pkg_digital_growth': 'Digital Growth',
        'pkg_creative_kit': 'Creative Kit',
        'pkg_business_growth': 'Business Growth',
        'pkg_signature_exp': 'Signature Experience',
        'pkg_custom_project': 'Projekt i Personalizuar',
        'feat_single_page': 'Web me 1 Faqe',
        'feat_multi_page': 'Web me 2-5 Faqe',
        'feat_custom_site': 'Web i Personalizuar me 5–8 Faqe',
        'feat_ecommerce': 'Dizajnim Dyqani E-commerce',
        'feat_basic_seo': 'Konfigurim Bazë i SEO',
        'feat_advanced_seo': 'Konfigurim i Avancuar i SEO',
        'feat_mobile_responsive': 'I Përshtatshëm për Telefonë',
        'feat_logo_palette': 'Logo + Paletë Ngjyrash',
        'feat_full_identity': 'Identitet i Plotë Brandi',
        'feat_social_kit': 'Kit për Rrjetet Sociale',
        'feat_business_cards': 'Dizajn për Kartëvizita',
        'feat_inventory_mgmt': 'Menaxhim i Inventarit',
        'feat_admin_panel': 'Panel Administratori',
        'custom_subtitle': 'Po kërkoni diçka plotësisht unike?',
        'price_tailored': 'Tailored',
        'custom_desc': 'Ndërtoni një projekt të bazuar në buxhetin dhe kërkesat tuaja specifike.',
        'btn_build_custom': 'Plan i Personalizuar',
        #Estimate Page Translations
        'est_page_header': 'Llogarit Projektin',
        'calc_title': 'Kalkulatori i Projektit',
        'est_sub': 'Merrni një vlerësim të menjëhershëm për projektin tuaj bazuar në nevojat tuaja.',
        'label_project_type': 'Lloji i Projektit',
        'label_specific_project': 'Projekti Specifik',
        'label_estimated_pages': 'Faqet e Parashikuara',
        'label_pages_unit': 'Faqe',
        'label_addons_features': 'Shtesa & Funksionalitete',
        'type_website_title': 'Website',
        'type_website_desc': 'Faqe interneti moderne, të përshtatshme për telefonë dhe të sigurta',
        'type_digital_title': 'Dixhital',
        'type_digital_desc': 'Asete dixhitale interaktive për ekranet moderne',
        'type_design_title': 'Dizajn',
        'type_design_desc': 'Identitete vizuale të nivelit të lartë dhe dizajn grafik',
        'type_growth_title': 'Rritje',
        'type_growth_desc': 'SEO, rrjete sociale dhe automatizim i marketingut',
        'estimate_result_title': 'Vlerësimi i Projektit',
        'est_currency_eur': 'EUR',
        'est_currency_all': 'LEK',
        'est_base_cost': 'Kostoja Bazë',
        'est_pages_cost': 'Kostoja e Faqeve',
        'est_addons_cost': 'Kostoja e Shtesave',
        'est_get_quote': 'Merrni një Ofertë Falas',
        #Home Page Translations
        'hero_title_main': 'Ngrijeni biznesin tuaj me',
        'hero_brand': 'Bej Dizajn.',
        'hero_subtitle': 'Ku estetika takon funksionalitetin. Të specializuar në dizajn web-i të personalizuar dhe identitete brandi që lartësojnë praninë tuaj dixhitale.',
        'btn_estimate_cost': 'Llogarit Kostot',
        'btn_chat_us': 'Bisedo me ne',
        'pkg_quick_sub': 'Më e mira për një prani online të shpejtë dhe profesionale.',
        'pkg_digital_sub': 'Më e mira për startup-et që po ndërtojnë themele të forta.',
        'btn_get_started': 'Fillo Tani',
        'services_title': 'Shërbimet Tona',
        'services_sub': 'Aftësi të specializuara për ta bërë biznesin tuaj të dallohet.',
        'srv_web_dev_title': 'Web i Personalizuar',
        'srv_web_dev_desc': 'Arkitekturë dixhitale tepër e shpejtë dhe shumë e sigurt, e përshtatur saktësisht me logjikën e biznesit dhe nevojat tuaja për rritje.',
        'srv_ui_ux_title': 'Dizajn UI/UX',
        'srv_ui_ux_desc': 'Ndërfaqe dixhitale gjithëpërfshirëse, të dizajnuara për të tërhequr përdoruesit dhe për të ngritur estetikën e brandit tuaj.',
        'srv_ecom_title': 'E-Commerce',
        'srv_ecom_desc': 'Vitrina dixhitale premium të inxhinieruara për të maksimizuar konvertimet dhe për të ofruar një përvojë blerjeje luksoze.',
        'srv_brand_title': 'Identiteti & Strategjia',
        'srv_brand_desc': 'Sisteme vizuale kohezive — nga dizajni i logos te udhëzuesit e plotë të brandit — të ndërtuara për të vendosur autoritet në treg.',
        'work_title': 'Puna Jonë',
        'work_sub': 'Projekte të zgjedhura nga portofoli ynë i plotë.',
        'work_cat_ecom': 'E-Commerce',
        'work_cat_branding': 'Branding',
        'work_cat_auto': 'Treg Makinash',
        'work_cat_logo': 'Logo',
        'testim_title': 'Çfarë Thonë Partnerët Tanë',
        'testim_subtitle': 'Feedback real nga brandet që kemi ndihmuar.',
        'testim_1_text': 'Platforma jonë e re e-commerce transformoi plotësisht mënyrën se si ne shesim pjesë dhe aksesorë makinash. Sajti është i shpejtë dhe u jep klientëve tanë atë përvojë blerjeje premium dhe luksoze që po kërkonim. E rekomandojmë me shumë besim!',
        'testim_2_text': 'Ata morën vizionin tonë për një treg blerjeje dhe shitjeje makinash dhe e kthyen atë në një platformë dixhitale me performancë të lartë. Rrjedha e pandërprerë e përdoruesit, e kombinuar me një identitet vizual mbresëlënës, i dha brandit tonë besueshmëri të menjëhershme në tregun e automjeteve që nga dita e parë.',
        'testim_3_text': 'Asetet e rrjeteve sociale të krijuara për vilën tonë kapën në mënyrë perfekte atmosferën ekskluzive të pronës sonë. Tregimi vizual dhe formatimet gjithëpërfshirëse ngritën plotësisht praninë tonë dixhitale dhe sollën menjëherë një numër më të lartë kërkesash për rezervime.',
        'testim_4_text': 'Dizajn minimalist mahnitës dhe përshtatshmëri e përsosur. Vëmendja ndaj detajeve e ka lartësuar plotësisht praninë tonë dixhitale.',
        'cta_title': "Nuk e dini nga t'ia filloni?",
        'cta_sub': 'Përdorni kalkulatorin tonë të avancuar për të krijuar një ide paraprake.',
        'btn_calc_cost': 'Llogarit Koston'
    }
}

@app.before_request
def set_language():
    if 'lang' not in session:
        session['lang'] = 'en' # Default to English

@app.route('/switch-lang/<lang>')
def switch_lang(lang):
    if lang in ['en', 'sq']:
        session['lang'] = lang
    return redirect(request.referrer or url_for('home'))

@app.context_processor
def inject_translations():
    return dict(t=translations[session['lang']], current_lang=session['lang'])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/packages')
def packages():
    return render_template('packages.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/estimate')
def estimate():
    return render_template('estimate.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__': 
    app.run(debug=True, port=5000)