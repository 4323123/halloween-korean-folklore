document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, setting things up');
    
    // Just setting up the basics
    setupScrollStuff();
    addProgressBar();
    handleKeyboard();
    addSomeEffects();
});

function setupScrollStuff() {
    const articles = document.querySelectorAll('.spirit-article');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(article);
    });
}

function addProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff6b35, #d90429);
        z-index: 1000;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

function handleKeyboard() {
    let currentIndex = -1;
    const articles = document.querySelectorAll('.spirit-article');
    
    document.addEventListener('keydown', function(e) {
        articles.forEach(article => article.classList.remove('keyboard-focus'));
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentIndex < articles.length - 1) {
                currentIndex++;
                articles[currentIndex].classList.add('keyboard-focus');
                articles[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentIndex > 0) {
                currentIndex--;
                articles[currentIndex].classList.add('keyboard-focus');
                articles[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    const style = document.createElement('style');
    style.textContent = '.keyboard-focus { outline: 3px solid #ff6b35 !important; }';
    document.head.appendChild(style);
}

function addSomeEffects() {
    const titles = document.querySelectorAll('.spirit-details h2');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px #ff6b35';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });
    
    const placeholders = document.querySelectorAll('.image-placeholder');
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    window.addEventListener('load', function() {
        const header = document.querySelector('.header');
        if (header) {
            header.style.opacity = '0.98';
            setTimeout(() => {
                header.style.opacity = '1';
            }, 100);
        }
    });
}

// Just some basic error handling
window.addEventListener('error', function(e) {
    console.log('Error:', e.error);
});