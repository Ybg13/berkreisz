const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1 // Elemanın %10'u göründüğünde tetiklenir
});

// Reveal sınıfına sahip tüm elemanları izlemeye al
const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

// Firebase SDK'larını eklediğinizi varsayıyorum (İster CDN ister modül)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


 const firebaseConfig = {
    apiKey: "AIzaSyBzB59QQDTDZmf4AoRCrqPoxPIDDm7w_oM",
    authDomain: "ybg13lab.firebaseapp.com",
    projectId: "ybg13lab",
    storageBucket: "ybg13lab.firebasestorage.app",
    messagingSenderId: "735845573440",
    appId: "1:735845573440:web:8daab4b3727cc78fdc90a5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Formu yakalayalım
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.querySelector('#submit-btn');
    btn.innerText = "Gönderiliyor...";
    
    try {
        await addDoc(collection(db, "messages"), {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            message: document.querySelector('#message').value,
            timestamp: new Date()
        });
        
        document.querySelector('#form-status').innerText = "Mesajınız başarıyla iletildi!";
        contactForm.reset();
    } catch (error) {
        document.querySelector('#form-status').innerText = "Bir hata oluştu. Tekrar deneyin.";
    }
    btn.innerText = "Gönder";
});

/**
 * AEGIS-JS ENGINE v5.0 - UNIFIED DEFENSE SYSTEM
 * Kapsam: SQLi, XSS, Clickjacking, Anti-Debug, Bot Protection
 */

const AegisJS = (function() {
    'use strict';

    const config = {
        name: "AegisJS Engine",
        version: "5.0",
        alertOnAttack: true
    };

    const securityRules = {
        sqlPattern: /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND|--|#)\b/gi,
        xssPattern: /[<>\"\'\(\)]/g
    };

    // 1. Çekirdek Koruma (XSS & DOM Injection)
    const initDOMGuard = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                m.addedNodes.forEach((node) => {
                    if (node.nodeName === 'SCRIPT' || node.nodeName === 'IFRAME') {
                        node.remove();
                        console.error(`${config.name}: Zararlı yapı engellendi.`);
                    }
                });
            });
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    };

    // 2. Veri Güvenliği (SQL Injection & Input Sanitization)
    const initDataGuard = () => {
        const filterInput = (e) => {
            const val = e.target.value;
            if (securityRules.sqlPattern.test(val)) {
                e.target.value = val.replace(securityRules.sqlPattern, "[SECURE]");
                if(config.alertOnAttack) alert("Güvenlik Uyarısı: Geçersiz karakter girdiniz!");
            }
        };

        document.querySelectorAll('input, textarea').forEach(el => {
            el.addEventListener('blur', filterInput);
        });

        // URL Kontrolü
        const params = new URLSearchParams(window.location.search);
        params.forEach((value) => {
            if (securityRules.sqlPattern.test(value)) window.location.href = "/";
        });
    };

    // 3. Tarayıcı ve Arayüz Koruması (Clickjacking & Debugging)
    const initSystemGuard = () => {
        // Frame Busting
        if (window.self !== window.top) window.top.location = window.self.location;

        // Anti-Debugger
        setInterval(() => {
            (function() { return false; constructor('debugger')(); })();
        }, 1000);

        // Global Fonksiyon Dondurma
        Object.freeze(window.eval);
    };

    // 4. Davranış Analizi (Bot & Anti-Keylogger)
    const initBehaviorGuard = () => {
        let lastKey = 0;
        document.addEventListener('keydown', () => {
            let now = Date.now();
            if (now - lastKey < 20) console.warn("AegisJS: Bot şüphesi.");
            lastKey = now;
        });

        document.addEventListener('copy', (e) => {
            if (window.getSelection().toString().length > 100) e.preventDefault();
        });
    };

    return {
        start: function() {
            initDOMGuard();
            initDataGuard();
            initSystemGuard();
            initBehaviorGuard();
            console.log(`%c ${config.name} v${config.version} : SİSTEM AKTİF `, 
                        "background: #111; color: #00ff00; font-weight: bold; padding: 10px; border: 2px solid #00ff00;");
        }
    };
})();

// Yazılımı Tek Komutla Başlat
AegisJS.start();
