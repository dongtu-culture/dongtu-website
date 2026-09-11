// ========================================
// 湖南东图文化发展有限公司 - 官网脚本
// ========================================

// 页面加载完成后隐藏 loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 800);
});

// ========================================
// 导航栏滚动效果
// ========================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// 移动端菜单切换
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击菜单项后关闭菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// 平滑滚动
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// 回到顶部按钮
// ========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// 数字计数动画
// ========================================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// 使用 Intersection Observer 触发数字动画
const observerOptions = {
    threshold: 0.5
};

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            numberObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有数字元素
document.querySelectorAll('[data-count]').forEach(el => {
    numberObserver.observe(el);
});

// ========================================
// 案例筛选功能
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // 筛选项目
        workItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// 表单提交处理
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // 简单的表单验证
    if (!data.name || !data.phone || !data.service) {
        alert('请填写必填项 / Please fill in required fields');
        return;
    }
    
    // 模拟提交
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-en">SUBMITTING...</span><span class="btn-cn">提交中...</span>';
    submitBtn.disabled = true;
    
    // 模拟 API 调用
    setTimeout(() => {
        alert('感谢您的咨询！我们会尽快与您联系。\nThank you for your inquiry! We will contact you soon.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// ========================================
// 滚动动画
// ========================================
const fadeInElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(el => {
    fadeInObserver.observe(el);
});

// ========================================
// 导航高亮当前区域
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 服务卡片悬停效果增强
// ========================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// 鼠标跟随效果
// ========================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 为 hero 区域的 orb 添加鼠标跟随效果
const heroOrbs = document.querySelectorAll('.hero-orb');

function animateOrbs() {
    heroOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.01;
        const x = (window.innerWidth / 2 - mouseX) * speed;
        const y = (window.innerHeight / 2 - mouseY) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ========================================
// 图片加载错误处理
// ========================================
document.querySelectorAll('.work-image img').forEach(img => {
    img.addEventListener('error', function() {
        this.parentElement.innerHTML = '<div class="work-placeholder"><span>图片加载中</span></div>';
    });
});

// ========================================
// 性能优化：防抖和节流
// ========================================
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ========================================
// 控制台输出
// ========================================
console.log('%c湖南东图文化发展有限公司', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cHUNAN DONGTU CULTURE DEVELOPMENT CO., LTD', 'font-size: 12px; color: #a0a8c0;');
console.log('%c创意驱动 · 品牌增长 · 数字赋能', 'font-size: 12px; color: #6a7090;');
