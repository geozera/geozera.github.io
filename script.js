
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const translations = {
        en: {
            'nav.projects': 'Projects',
            'nav.blog': 'Blog',
            'nav.contact': 'Contact',
            'hero.title': 'Welcome!',
            'hero.subtitle': "Hi, I'm Geovany Bezerra, Fullstack Developer since 2020. I build digital experiences with a focus on efficiency, quality and user experience, besides robust and scalable integrations.",
            'hero.cta': 'View Work',
            'section.projects': 'Projects',
            'project.fleet_control': 'Real-Time Vehicle Tracking using SignalR and WebSockets.',
            'project.how_id_do': 'Collection of interesting features I observe on other apps, and how I would implement it.',
            'section.thoughts': 'Thoughts',
            'footer.rights': 'All rights reserved.',
            'project.blog': 'Simple blog'
        },
        pt: {
            'nav.projects': 'Projetos',
            'nav.blog': 'Blog',
            'nav.contact': 'Contato',
            'hero.title': 'Bem-vindo!',
            'hero.subtitle': "Olá, sou Geovany Bezerra, desenvolvedor Fullstack desde 2020. Crio experiências digitais com foco em eficiência, qualidade e experiência do usuário, além de integrações robustas e escaláveis.",
            'hero.cta': 'Ver Projetos',
            'section.projects': 'Projetos',
            'project.fleet_control': 'Rastreamento Veicular em Tempo Real utilizando SignalR e WebSockets.',
            'project.how_id_do': 'Coleção de funcionalidades interessantes que observo em outros apps e como eu as implementaria.',
            'section.thoughts': 'Reflexões',
            'footer.rights': 'Todos os direitos reservados.',
            'project.blog': 'Blog simples'
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    
    function setLanguage(lang) {
        if (!translations[lang]) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        if (langToggle) {
            langToggle.textContent = lang === 'en' ? 'PT' : 'EN';
        }

        document.documentElement.setAttribute('lang', lang);
    }

    function getPreferredLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;  
        if (browserLang && browserLang.toLowerCase().startsWith('pt')) {
            return 'pt';
        }
        
        return 'en';
    }

    setLanguage(getPreferredLanguage());

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = document.documentElement.getAttribute('lang') || 'en';
            const newLang = currentLang === 'en' ? 'pt' : 'en';
            setLanguage(newLang);
        });
    }

    const toggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function getPreferredTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        return prefersDark.matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    setTheme(getPreferredTheme());

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .blog-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    const modal = document.getElementById('blog-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDate = modal.querySelector('.modal-date');
    const modalBody = modal.querySelector('.modal-body');
    const closeModalBtn = modal.querySelector('.close-modal');

    function openModal(item) {
        const title = item.querySelector('.blog-title').textContent;
        const date = item.querySelector('.blog-date').textContent;
        const content = item.querySelector('.blog-excerpt').innerHTML;

        modalTitle.textContent = title;
        modalDate.textContent = date;
        modalBody.innerHTML = content;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.blog-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(item);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
