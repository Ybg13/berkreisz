/**
 * AEGIS-JS ENGINE v1.0 [EXTREME]
 * Slogan: "Enter if you can, stay if you're allowed."
 */

const AegisJS = (function() {
    'use strict';

    // KRİTİK: Saldırganın bu yazılımı konsoldan durdurmasını engellemek için donduruyoruz.
    const lockdown = (obj) => Object.freeze(obj);

    const config = lockdown({
        name: "AegisJS Ultra",
        version: "1.0",
        forbiddenKeywords: ["<script", "javascript:", "union select", "drop table", "--", "alert(", "eval("]
    });

    // 1. Gelişmiş Anti-Tamper (Kurcalama Karşıtı)
    const preventInspection = () => {
        // DevTools açıldığında tarayıcıyı kilitler
        const t = new Date();
        const check = () => {
            if (new Date() - t > 100) {
                document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20%; font-family:sans-serif;'>GÜVENLİK İHLALİ TESPİT EDİLDİ!</h1>";
                window.location.reload();
            }
        };
        
        // Debugger tuzağı
        setInterval(() => {
            (function(){}.constructor("debugger")());
            check();
        }, 50);
    };

    // 2. Proaktif Veri Filtreleme (Deep Scan)
    const deepScan = () => {
        const scanner = (input) => {
            const lowInput = input.toLowerCase();
            if (config.forbiddenKeywords.some(key => lowInput.includes(key))) {
                console.warn("AegisJS: Saldırı engellendi!");
                return true;
            }
            return false;
        };

        // Form gönderimini en tepeden yakalar
        window.addEventListener('submit', (e) => {
            const formData = new FormData(e.target);
            for (let value of formData.values()) {
                if (scanner(value)) {
                    e.preventDefault();
                    alert("Zararlı veri girişi engellendi!");
                    return false;
                }
            }
        }, true);
    };

    // 3. Global Nesne Koruması (Sandboxing)
    const sandbox = () => {
        // Hackerların console.log veya alert'i kendi kodları için kullanmasını zorlaştırır
        const noop = () => { console.warn("Güvenli modda bu işlem kısıtlıdır."); };
        
        // Tehlikeli olabilecek noktaları kapatıyoruz
        const rawEval = window.eval;
        window.eval = noop;
        window.Function = noop;
        
        // Sağ tık ve kopyalamayı komple kapat (v1.0 kuralı)
        document.oncontextmenu = (e) => e.preventDefault();
        document.onkeydown = (e) => {
            if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i' || e.key === 'j')) {
                return false;
            }
        };
    };

    return {
        ignite: function() {
            preventInspection();
            deepScan();
            sandbox();
            console.log(`%c ${config.name} v${config.version} DEVRİYE GEZİYOR `, 
                "background: #111; color: #ff0000; font-size: 14px; font-weight: bold; border: 1px solid red; padding: 5px;");
        }
    };
})();

// ATEŞLE!
AegisJS.ignite();

// --- BURADAN SONRA SENİN DİĞER KODLARIN (Firebase vb.) GELEBİLİR ---