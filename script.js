document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. 3D PARALLAX TILT EFFECT & MOUSE GLOW
    // ==========================================================================
    const tiltCards = document.querySelectorAll('.clickable-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set mouse coordinates for radial glass highlight
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // 3D Parallax angle calculation (max 8 degrees tilt)
            const width = rect.width;
            const height = rect.height;
            const centerX = rect.left + width / 2;
            const centerY = rect.top + height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            const rotateX = (+6 * (mouseY / (height / 2))).toFixed(2);
            const rotateY = (-6 * (mouseX / (width / 2))).toFixed(2);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ==========================================================================
    // 2. INTERACTIVE TERMINAL SIMULATOR (CLI MOTORU)
    // ==========================================================================
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    const initialBootLogs = [
        { text: 'ARFCODE System Terminal v2.6.0 Booting...', type: 'cyan' },
        { text: 'Connecting to AWS Frankfurt nodes (eu-central-1)...', type: 'text' },
        { text: 'Initialising Docker containers & redis cluster... [OK]', type: 'success' },
        { text: 'Establishing secure client SLA monitor connection...', type: 'text' },
        { text: 'ARFCODE AI NLP Chatbot Engine initialised successfully.', type: 'success' },
        { text: 'System status: ONLINE. All services responding.', type: 'success' },
        { text: 'Tip: Komut listesini görmek için "help" yazıp Enter\'a basın.', type: 'warning' }
    ];

    let logIndex = 0;
    const writeLogLine = (lineText, type) => {
        if (!terminalOutput) return;
        const line = document.createElement('div');
        line.className = 'log-line';
        if (type === 'success') line.classList.add('log-success');
        if (type === 'cyan') line.classList.add('log-cyan');
        if (type === 'purple') line.classList.add('log-purple');
        if (type === 'warning') line.classList.add('log-warning');
        
        line.innerHTML = lineText;
        terminalOutput.appendChild(line);
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    };

    const streamInitialLogs = () => {
        if (logIndex < initialBootLogs.length) {
            writeLogLine(initialBootLogs[logIndex].text, initialBootLogs[logIndex].type);
            logIndex++;
            setTimeout(streamInitialLogs, 400);
        }
    };

    // Auto-boot terminal
    if (terminalOutput) {
        setTimeout(streamInitialLogs, 300);
    }

    // Command parser
    if (terminalInput) {
        terminalInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                // Echo user input
                writeLogLine(`<span style="color:#38bdf8">guest@arfcode:~$</span> ${command}`);

                if (command === '') return;

                switch (command) {
                    case 'help':
                        writeLogLine('Mevcut komut listesi:', 'warning');
                        writeLogLine('  <span style="color:#6366f1">about</span>     - ARFCODE ve Arda Berkay Demirci hakkında bilgi.');
                        writeLogLine('  <span style="color:#6366f1">projects</span>  - Geliştirilen başlıca SaaS ürünleri.');
                        writeLogLine('  <span style="color:#6366f1">skills</span>    - Teknolojik uzmanlıklarımız.');
                        writeLogLine('  <span style="color:#6366f1">contact</span>   - İletişim e-posta ve WhatsApp bilgisi.');
                        writeLogLine('  <span style="color:#6366f1">clear</span>     - Terminal ekranını temizler.');
                        writeLogLine('  İpucu: Komutlar haricinde doğrudan sorularınızı yazarak yapay zekamızla sohbet edebilirsiniz!', 'warning');
                        break;
                    case 'about':
                        writeLogLine('ARFCODE, Arda Berkay Demirci tarafından kurulan bir teknoloji ve yazılım geliştirme markasıdır.');
                        writeLogLine('2026 yılı standartlarında kurumsal okul/dershane ERP yönetim otomasyonları, akıllı bulut tabanlı stok takip sistemleri, tarımsal IoT çözümleri ve otonom yapay zeka entegrasyonları inşa ediyoruz.');
                        break;
                    case 'projects':
                        writeLogLine('Aktif SaaS Projelerimiz:', 'cyan');
                        writeLogLine('  - <strong style="color:#f4f4f7">Yapay Zeka Destekli Sipariş Hattı</strong> (NLP Sipariş Ajanı)');
                        writeLogLine('  - <strong style="color:#f4f4f7">Dershane & Okul ERP</strong> (Kurs ve Kolej Kontrol Paneli)');
                        writeLogLine('  - <strong style="color:#f4f4f7">Akıllı Stok Takip</strong> (Bulut Depo & Envanter Çözümü)');
                        writeLogLine('  - <strong style="color:#f4f4f7">AgroVision OS</strong> (IoT Tarımsal Sulama Otomasyonu)');
                        writeLogLine('  - <strong style="color:#f4f4f7">Stylist AI</strong> (Kuaför & Berber Randevu Ajanı)');
                        writeLogLine('  - <strong style="color:#f4f4f7">Ödev & Soru Bankası AI</strong> (Eğitim Kazanım Analizi)');
                        writeLogLine('  - <strong style="color:#f4f4f7">Web / Mobil Geliştirme</strong> (Next.js & React Native)');
                        break;
                    case 'skills':
                        writeLogLine('Uzmanlık Stackimiz:', 'purple');
                        writeLogLine('  - Frontend: React, Next.js, TypeScript, TailwindCSS');
                        writeLogLine('  - Backend: Node.js, Python FastAPI, Go (Golang), Rust');
                        writeLogLine('  - AI: OpenAI API, LangChain, RAG, Ajan Yapıları');
                        writeLogLine('  - DevOps: Docker, AWS Cloud, PostgreSQL, Redis, InfluxDB');
                        break;
                    case 'contact':
                        writeLogLine('Kurumsal İletişim:', 'success');
                        writeLogLine('  E-posta: hello@arfcode.com');
                        writeLogLine('  Telefon / WhatsApp: +90 538 447 80 18');
                        writeLogLine('  Detaylı teklif formu için sayfanın altına kaydırabilirsiniz.');
                        break;
                    case 'clear':
                        if (terminalOutput) terminalOutput.innerHTML = '';
                        break;
                    default:
                        // Simple NLP AI response simulation
                        let reply = "";
                        const query = command.trim().toLowerCase();
                        if (query.includes("fiyat") || query.includes("ücret") || query.includes("tutar") || query.includes("paket") || query.includes("maliyet")) {
                            reply = "ARFCODE SaaS çözümleri (DershaneERP, AkıllıStok vb.) kurumuzun büyüklüğüne ve şube sayısına göre modüler olarak fiyatlandırılır. hello@arfcode.com e-posta adresinden veya sağ alttaki WhatsApp butonundan anında özel fiyat alabilirsiniz.";
                        } else if (query.includes("dershane") || query.includes("okul") || query.includes("erp") || query.includes("öğrenci") || query.includes("veli") || query.includes("akadem")) {
                            reply = "ARFCODE DershaneERP, kurs ve kolejlerin öğrenci kaydı, taksit takibi, etüt/ders programı ve otomatik veli bilgilendirme süreçlerini bulutta birleştirir. Detaylar için 'SaaS & Çözümler' alanımızı inceleyin.";
                        } else if (query.includes("stok") || query.includes("envanter") || query.includes("depo") || query.includes("ürün")) {
                            reply = "Akıllı Stok takip sistemimiz, barkod/QR kod entegrasyonu ve otonom talep tahmin motoruna sahiptir. Depolar arası transferleri ve kritik stok seviyelerini yapay zeka ile kontrol eder.";
                        } else if (query.includes("yapay zeka") || query.includes("ai") || query.includes("ajan") || query.includes("chatbot") || query.includes("bot")) {
                            reply = "Sipariş ve randevu süreçlerinizi 7/24 otonom olarak yöneten ses/metin tabanlı WhatsApp & Web chatbot ajanları geliştiriyoruz. AWS ve LLM entegrasyonuyla çalışırlar.";
                        } else if (query.includes("tarım") || query.includes("agro") || query.includes("sulama") || query.includes("vana") || query.includes("su")) {
                            reply = "AgroVision OS projemiz, toprak nem sensörleri ve vana rölelerini yöneten Rust tabanlı bir IoT otomasyonudur. Buharlaşma tahminlerine göre otonom sulama yapar.";
                        } else if (query.includes("berber") || query.includes("kuaför") || query.includes("stylist") || query.includes("saç")) {
                            reply = "Stylist AI projemiz, güzellik salonları ve kuaförler için WhatsApp Cloud API üzerinden randevu yönetimi ve yapay zeka destekli saç/sakal analizleri sunar.";
                        } else if (query.includes("soru bankası") || query.includes("ödev") || query.includes("karn")) {
                            reply = "Ödev & Soru Bankası AI çözümümüz, deneme sınavı sonuçlarına dayanarak otonom konu eksikliği tespiti ve kişiye özel ödev föyü hazırlama imkanı sağlar.";
                        } else if (query.includes("merhaba") || query.includes("selam") || query.includes("hello") || query.includes("hey")) {
                            reply = "Merhaba! Ben ARFCODE AI. Sizlere DershaneERP, AkıllıStok, AgroVision OS ve yapay zeka ajanlarımız hakkında bilgi verebilirim. Ne hakkında konuşmak istersiniz?";
                        } else {
                            const replies = [
                                "Sorgunuz analiz ediliyor... AWS Frankfurt düğümlerimiz ve NLP motorumuz entegrasyon süreçlerinizi hızlandırabilir. Bize hello@arfcode.com adresinden ulaşabilirsiniz.",
                                "Bu konuda size yardımcı olmaktan memnuniyet duyarım. ARFCODE otonom ajanları ve SaaS ürünleriyle ilgili sormak istediğiniz başka bir şey var mı?",
                                "Verdiğiniz girdiyi analiz ettim. Özel projelerde Next.js (SSR) ve FastAPI / Go altyapılarıyla ölçeklenebilir çözümler sunuyoruz. Detaylar için WhatsApp hattımızı deneyebilirsiniz!"
                            ];
                            reply = replies[Math.floor(Math.random() * replies.length)];
                        }
                        writeLogLine(`<span style="color:#fbbf24">[AI Assistant]:</span> ${reply}`, 'purple');
                }

                if (terminalBody) {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }
        });
    }

    // ==========================================================================
    // 3. CANLI SİSTEM METRİKLERİ VE SAYAÇLAR (WHY US BOARD)
    // ==========================================================================
    // Live SLA Timer Counter down
    const timerElement = document.getElementById('sla-timer');
    if (timerElement) {
        let seconds = 12 * 60 + 45; // 12 min 45 sec
        setInterval(() => {
            seconds--;
            if (seconds < 0) seconds = 15 * 60; // reset to 15 min
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            timerElement.textContent = `00:${m}:${s}`;
        }, 1000);
    }

    // Live Uptime Fluctuation
    const uptimeElement = document.getElementById('uptime-value');
    if (uptimeElement) {
        setInterval(() => {
            const rand = (99.981 + Math.random() * 0.007).toFixed(3);
            uptimeElement.textContent = `%${rand}`;
        }, 3000);
    }

    // Live CI/CD Deployments Incrementor
    const deploymentsElement = document.getElementById('deployments-counter');
    if (deploymentsElement) {
        let deplCount = 1424;
        setInterval(() => {
            deplCount += Math.floor(Math.random() * 2);
            deploymentsElement.textContent = deplCount.toLocaleString('tr-TR');
        }, 15000);
    }

    // ==========================================================================
    // 4. IDE TABS CODE WORKSPACE MANAGER (SERVICES)
    // ==========================================================================
    const ideFilesData = {
        'dershane': {
            filename: 'DershaneERP.ts',
            language: 'Yönetim Paneli Görünümü',
            code: `<div class="erp-table-mockup">
    <div class="erp-mock-header">
        <span class="erp-mock-title"><i data-feather="book-open" class="inline-icon" style="color:var(--accent-cyan);"></i> Öğrenci Kayıt & Taksit Paneli</span>
        <span class="erp-status-badge paid" style="font-size:0.65rem;">GÜNCEL: 1,420 ÖĞRENCİ</span>
    </div>
    <div class="erp-table-container">
        <table class="erp-mock-table">
            <thead>
                <tr>
                    <th>Öğrenci Adı</th>
                    <th>Sınıf / Ders Düzeyi</th>
                    <th>Ödeme Durumu</th>
                    <th>Son İşlem</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="font-weight:600; color:#fff;">Kamil Can Demirci</td>
                    <td>12. Sınıf (YKS Sayısal)</td>
                    <td><span class="erp-status-badge paid">Ödendi</span></td>
                    <td>Veli Bilgilendirme SMS'i Atıldı</td>
                </tr>
                <tr>
                    <td style="font-weight:600; color:#fff;">Zeynep Sude Yılmaz</td>
                    <td>11. Sınıf (Hazırlık)</td>
                    <td><span class="erp-status-badge pending">1 Gün Gecikti</span></td>
                    <td>Otomatik Taksit Uyarısı Açık</td>
                </tr>
                <tr>
                    <td style="font-weight:600; color:#fff;">Efe Öztürk</td>
                    <td>Mezun Grup (YKS Sözel)</td>
                    <td><span class="erp-status-badge paid">Ödendi</span></td>
                    <td>Fatura E-Arşiv olarak Kesildi</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`,
            title: 'Kurumsal Dershane & Okul ERP',
            desc: 'Eğitim kurumlarının idari, akademik ve finansal süreçlerini tek merkezden yöneten, veli entegrasyonu ve e-fatura altyapısı sunan bulut tabanlı ERP çözümü.',
            features: [
                'Taksit takibi, tahsilat, gider yönetimi ve otomatik faturalandırma modülleri.',
                'Yapay zeka destekli haftalık ders ve etüt programı optimizasyonu.',
                'Otonom veli SMS/Push bilgilendirme ve canlı öğrenci performans takibi.'
            ]
        },
        'stok': {
            filename: 'AkilliStok.go',
            language: 'Envanter Arayüzü',
            code: `<div class="stock-mockup">
    <div class="stock-grid">
        <div class="stock-card">
            <h5>Toplam Envanter</h5>
            <p>14,284 Ürün</p>
        </div>
        <div class="stock-card">
            <h5>Kritik Stok Uyarısı</h5>
            <p style="color:#ef4444;">2 Ürün Azaldı</p>
        </div>
    </div>
    <div class="stock-chart-simulation">
        <div class="stock-bar-row">
            <div class="stock-bar-info">
                <span>Fotokopi Kağıdı (A4)</span>
                <span style="color:#ef4444; font-weight:600;">5 Koli kaldı (Kritik!)</span>
            </div>
            <div class="stock-bar-outer">
                <div class="stock-bar-inner warning" style="width: 5%;"></div>
            </div>
        </div>
        <div class="stock-bar-row">
            <div class="stock-bar-info">
                <span>YKS Deneme Kitapçığı</span>
                <span>840 Adet</span>
            </div>
            <div class="stock-bar-outer">
                <div class="stock-bar-inner" style="width: 84%;"></div>
            </div>
        </div>
    </div>
</div>`,
            title: 'Akıllı Stok & Depo Otomasyonu',
            desc: 'Çoklu lokasyon desteğine ve otonom talep tahmin motoruna sahip, barkod/QR kod entegrasyonu barındıran akıllı envanter kontrol sistemi.',
            features: [
                'Mobil cihazlar üzerinden anlık QR/Barkod tarama ve stok sayım altyapısı.',
                'Yapay zeka modelleri ile kritik stok seviyesi ve otonom sipariş emri.',
                'Depolar arası entegre transfer, sayım eşitleme ve maliyet raporları.'
            ]
        },
        'yapayzekabot': {
            filename: 'SiparisAI.py',
            language: 'Canlı Sohbet Simülatörü',
            code: `<div class="wa-chat-mockup">
    <div class="wa-chat-header">
        <div class="wa-chat-avatar"><i data-feather="message-square" style="width:16px;height:16px;"></i></div>
        <div class="wa-chat-status">
            <span class="wa-chat-name">ARFCODE Yapay Zeka Ajanı</span>
            <span class="wa-chat-online">Çevrimiçi (Otomatik Asistan)</span>
        </div>
    </div>
    <div class="wa-chat-messages" id="wa-chat-messages-container">
        <!-- Messages stream dynamically -->
    </div>
</div>`,
            title: 'Otonom Yapay Zeka Ajanları',
            desc: 'Büyük Dil Modelleri (LLM) altyapısı kullanarak müşteri taleplerini, siparişlerini ve randevularını 7/24 otonom olarak yöneten entegre yapay zeka çözümleri.',
            features: [
                'WhatsApp Business Cloud API, Telegram ve WebChat ile tam uyum.',
                'Whisper entegrasyonu ile sesli mesajları anlık anlama ve işleme kapasitesi.',
                'Şirket içi veri tabanları ve ERP programları ile tam API senkronizasyonu.'
            ]
        },
        'mobilweb': {
            filename: 'KurumsalApp.js',
            language: 'Performans Denetimi',
            code: `<div class="ui-panel-mockup" style="text-align:center; justify-content:center; align-items:center; display:flex; flex-direction:column; height:100%;">
    <div class="erp-mock-header" style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
        <span class="erp-mock-title">Google Performance Audit</span>
        <span class="erp-status-badge paid">A+ SKOR (%99+)</span>
    </div>
    <div style="display:flex; align-items:center; gap:1.5rem; margin:1.2rem 0; text-align:left;">
        <div style="width:64px; height:64px; border-radius:50%; border:5px solid #10b981; display:flex; align-items:center; justify-content:center; font-weight:700; color:#10b981; font-size:1.2rem; background:rgba(16,185,129,0.05); flex-shrink:0;">99</div>
        <div style="display:flex; flex-direction:column; justify-content:center;">
            <p style="font-size:0.85rem; font-weight:600; color:#fff; margin:0;">Core Web Vitals Ölçümü</p>
            <p style="font-size:0.72rem; color:var(--text-secondary); margin:0;">Yüklenme Süresi: 1.1 Saniye (Maksimum Hız)</p>
        </div>
    </div>
    <div style="width:100%; background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.04); padding:0.6rem; border-radius:8px; text-align:left; font-size:0.72rem; line-height:1.5;">
        <p style="color:var(--text-secondary); margin:0;">✔ <strong>Arama Motoru Uyumlu:</strong> Temiz kod yapısı ve Google semantik etiketleri.</p>
        <p style="color:var(--text-secondary); margin:3px 0 0 0;">✔ <strong>Siber Güvenlik:</strong> Veriler AES-256 ve SSL sertifikaları ile korunur.</p>
    </div>
</div>`,
            title: 'Kurumsal Web & Mobil Çözümler',
            desc: 'Next.js (SSR) ve React Native (iOS/Android) mimarileriyle geliştirilmiş, yüksek hız odaklı ve SEO altyapılı premium web ve mobil platformlar.',
            features: [
                'Core Web Vitals standartlarına tam uyum ve en yüksek Google PageSpeed skorları.',
                'Tek kod tabanı üzerinden yerel (native) performans sunan mobil uygulamalar.',
                'SSL/TLS, JWT kimlik doğrulaması ve AWS mimarisiyle maksimum siber güvenlik.'
            ]
        },
        'agrovision': {
            filename: 'AgroVision.rs',
            language: 'IoT Vana Kontrolü',
            code: `<div class="ui-panel-mockup" style="display:flex; flex-direction:column; height:100%;">
    <div class="erp-mock-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
        <span class="erp-mock-title">AgroVision OS // Akıllı IoT Vana Kontrolü</span>
        <span class="erp-status-badge paid" style="font-size:0.65rem; background:rgba(16,185,129,0.08); color:var(--accent-emerald);">● SENSÖRLER AKTİF</span>
    </div>
    <div class="stock-grid" style="margin-top:10px; display:grid; grid-template-columns: repeat(2, 1fr); gap:10px;">
        <div class="stock-card" style="text-align:left;">
            <h5 style="font-size:0.65rem; color:var(--text-muted); margin:0;">Toprak Nemi (Zone 5)</h5>
            <p style="color:#ef4444; font-size:1rem; font-weight:700; margin:4px 0 0 0;">%28.4 (Kritik Düşük)</p>
        </div>
        <div class="stock-card" style="text-align:left;">
            <h5 style="font-size:0.65rem; color:var(--text-muted); margin:0;">Solenoid Vana-09</h5>
            <p style="color:#10b981; font-size:1.0rem; font-weight:700; margin:4px 0 0 0;">SULAMA AÇIK (1.2 m³/h)</p>
        </div>
    </div>
    <div style="margin-top:1rem; text-align:left; font-size:0.72rem; color:var(--text-secondary); line-height:1.5;">
        <p style="margin:0;">• <strong>Buharlaşma Tahmini:</strong> Hava 32°C. Sulama süresi: 45 dk olarak hesaplandı.</p>
        <p style="margin:4px 0 0 0;">• <strong>Enerji Tasarrufu:</strong> Akıllı IoT sulama kontrolü ile bugün %34 su tasarrufu sağlandı.</p>
    </div>
</div>`,
            title: 'AgroVision IoT Tarımsal Sulama',
            desc: 'Tarımsal sulama kooperatifleri ve büyük araziler için IoT sensör entegrasyonu sunan, nem ve buharlaşma tahminlerine göre otonom vana kontrolü sağlayan Rust tabanlı IoT mimarisi.',
            features: [
                'Toprak nem, sıcaklık ve rüzgar hızı verilerini MQTT protokolü üzerinden anlık işleme.',
                'Yapay zeka modelleri ile bölgeye özel buharlaşma ve optimum sulama süresi hesabı.',
                'Edge-IoT cihazları ile internet kesintilerinde dahi kesintisiz çalışan lokal otomasyon.'
            ]
        }
    };

    const ideTabs = document.querySelectorAll('.ide-tab');
    const ideFilename = document.getElementById('ide-filename');
    const ideCodeContent = document.getElementById('ide-code-content');
    const ideDescPanel = document.getElementById('ide-desc-panel');

    const startWhatsAppSimulation = () => {
        const chatContainer = document.getElementById('wa-chat-messages-container');
        if (!chatContainer) return;

        const conversation = [
            { sender: 'user', text: 'Merhaba, okul yönetim programı hakkında bilgi alabilir miyim?' },
            { sender: 'bot', text: 'Merhaba! Tabii ki. Dershane, kurs ve kolejlere özel öğrenci taksit takibi, etüt programlama ve otomatik veli bilgilendirme modüllerimiz mevcuttur. Kaç öğrenciniz bulunuyor?' },
            { sender: 'user', text: '500 civarında öğrencimiz var.' },
            { sender: 'bot', text: '500 öğrenci için DershaneERP sistemimiz harika bir verimlilik sağlar; ödeme kaçaklarını sıfırlar. Size özel fiyat teklifini iletmemiz için telefon numaranızı alabilir miyim?' },
            { sender: 'user', text: '0538 447 80 18' },
            { sender: 'bot', text: 'Harika! Bilgilerinizi kaydettim. Satış danışmanımız en kısa sürede detaylı katalog ve fiyat teklifiyle size WhatsApp üzerinden dönüş yapacaktır. Teşekkürler! 🚀' }
        ];

        chatContainer.innerHTML = '';
        let step = 0;

        const renderNextMessage = () => {
            if (step < conversation.length) {
                const msgData = conversation[step];
                const msgDiv = document.createElement('div');
                msgDiv.className = `wa-msg ${msgData.sender}`;
                msgDiv.innerHTML = msgData.text;
                chatContainer.appendChild(msgDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                step++;
                const nextDelay = msgData.sender === 'user' ? 1800 : 3200;
                const t = setTimeout(renderNextMessage, nextDelay);
                window.chatSimulationTimeouts.push(t);
            } else {
                const t = setTimeout(() => {
                    chatContainer.innerHTML = '';
                    step = 0;
                    renderNextMessage();
                }, 6000);
                window.chatSimulationTimeouts.push(t);
            }
        };

        const tInitial = setTimeout(renderNextMessage, 500);
        window.chatSimulationTimeouts.push(tInitial);
    };

    const loadIDEFile = (fileKey) => {
        const fileData = ideFilesData[fileKey];
        if (!fileData) return;

        if (ideFilename) ideFilename.textContent = fileData.filename;
        if (ideCodeContent) ideCodeContent.innerHTML = fileData.code;
        
        const ideBadge = document.querySelector('.ide-badge');
        if (ideBadge) ideBadge.textContent = fileData.language;

        // Clear any active chat simulation timeouts
        if (window.chatSimulationInterval) clearInterval(window.chatSimulationInterval);
        if (window.chatSimulationTimeouts) {
            window.chatSimulationTimeouts.forEach(t => clearTimeout(t));
            window.chatSimulationTimeouts = [];
        } else {
            window.chatSimulationTimeouts = [];
        }

        if (fileKey === 'yapayzekabot') {
            startWhatsAppSimulation();
        }

        // Render Description panel
        if (ideDescPanel) {
            const listHtml = fileData.features.map(f => `<li>${f}</li>`).join('');
            ideDescPanel.innerHTML = `
                <h3>${fileData.title}</h3>
                <p>${fileData.desc}</p>
                <ul class="ide-features-list">
                    ${listHtml}
                </ul>
                <a href="#contact" class="btn btn-primary btn-sm" style="margin-top: 1.5rem; border-radius: 8px;">
                    Bu Hizmet İçin Görüşelim
                </a>
            `;
        }

        // Update active tab styles
        ideTabs.forEach(tab => {
            if (tab.getAttribute('data-file') === fileKey) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        if (typeof feather !== 'undefined') feather.replace();
    };

    // Load initial tab file or auto-start WhatsApp simulation if the container exists
    if (document.getElementById('wa-chat-messages-container')) {
        window.chatSimulationTimeouts = [];
        startWhatsAppSimulation();
    }

    // ==========================================================================
    // 5. COLLAPSIBLE LOCAL SEO ACCORDION (SITEMAP)
    // ==========================================================================
    const seoCard = document.querySelector('.seo-collapsible-card');
    const seoToggleBtn = document.querySelector('.seo-toggle-btn');
    const seoContent = document.querySelector('.seo-collapsible-content');

    if (seoCard && seoToggleBtn && seoContent) {
        seoToggleBtn.addEventListener('click', () => {
            const isActive = seoCard.classList.contains('active');
            
            if (isActive) {
                seoCard.classList.remove('active');
                seoContent.style.maxHeight = '0';
            } else {
                seoCard.classList.add('active');
                seoContent.style.maxHeight = seoContent.scrollHeight + 'px';
            }
        });
    }

    // ==========================================================================
    // 6. DYNAMIC CASE STUDY DETAILS MODAL LOGIC
    // ==========================================================================
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = modal ? modal.querySelector('.modal-close') : null;
    
    // DOM Elements inside Modal
    const modalImg = document.getElementById('modal-img');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDescLong = document.getElementById('modal-desc-long');
    const modalFeaturesList = document.getElementById('modal-features-list');
    const modalTechTags = document.getElementById('modal-tech-tags');
    const modalProblemSolved = document.getElementById('modal-problem-solved');
    const modalImpactText = document.getElementById('modal-impact-text');

    const projectsData = {
        'ai-chatbot': {
            title: 'Yapay Zeka Destekli Sipariş Hattı',
            category: 'Yapay Zeka & Otomasyon',
            image: 'images/ai_chatbot.png',
            descLong: 'Bu proje, e-ticaret siteleri, restoran zincirleri ve hizmet sağlayıcılar için müşteri siparişlerini tamamen otonom şekilde işleyen yapay zeka entegrasyonudur. WhatsApp, Telegram ve web tabanlı canlı destek kanalları üzerinden gelen müşteri mesajlarını doğal dil işleme (NLP) ile analiz ederek siparişleri kaydeder, ödeme aşamasına yönlendirir ve kurye takip sistemlerine otomatik aktarır.',
            features: [
                'RAG (Retrieval-Augmented Generation) destekli akıllı menü ve ürün sorgulama.',
                'Sesli mesajları metne dönüştürerek (Whisper API) sipariş alma yeteneği.',
                'Popüler ERP ve sipariş entegrasyon servisleri ile tam API entegrasyonu.',
                'Gelişmiş admin paneli ile bot konuşmalarını anlık takip etme ve müdahale arayüzü.'
            ],
            techs: ['OpenAI API', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Docker'],
            problem: 'Telefonla sipariş alımında yaşanan yoğunluklar, hatalı sipariş girişleri ve mesai saatleri dışındaki müşteri kayıpları işletmeler için ciddi ciro kaybına sebep oluyordu.',
            impact: 'Sipariş karşılama oranı 7/24 kesintisiz hizmet sayesinde %35 artış gösterdi ve personel yükü %60 azaldı.'
        },
        'web-mobile': {
            title: 'Web & Mobil Geliştirme',
            category: 'Tasarım & Web/Mobil',
            image: 'images/mobile_app.png',
            descLong: 'Şirketlerin operasyonel süreçlerini dijitalleştiren, yüksek performanslı ve modern tasarıma sahip kurumsal web uygulamaları ile cross-platform (iOS/Android) mobil uygulamaların geliştirilmesidir. Kullanıcı odaklı arayüz tasarımlarıyla, verilerin anlık akışını ve senkronizasyonunu en üst seviyede tutuyoruz.',
            features: [
                'React ve Next.js tabanlı Server-Side Rendering (SSR) ile üstün SEO performansı.',
                'React Native kullanarak tek kod tabanıyla yerel performanslı iOS ve Android uygulamaları.',
                'WebSocket kullanarak anlık veri senkronizasyonu ve anlık bildirim (Push) sistemleri.',
                'Modern UI/UX prensipleri ile minimalist, şık ve dönüştürücü tasarımlar.'
            ],
            techs: ['React', 'Next.js', 'React Native', 'Node.js', 'TailwindCSS', 'GraphQL', 'AWS'],
            problem: 'Mevcut sistemlerin yavaş çalışması, mobil cihazlarla tam uyumlu olmaması ve eski teknolojiler yüzünden ölçeklenme problemleri yaşanması müşteri memnuniyetini düşürüyordu.',
            impact: 'Sayfa yüklenme hızları %200 oranında artırıldı, kullanıcıların uygulama içerisinde kalma süresi %45 yükseldi.'
        },
        'school-system': {
            title: 'Okul & Dershane Yönetim Yazılımı',
            category: 'SaaS & Eğitim',
            image: 'images/school_dashboard.png',
            descLong: 'Eğitim kurumlarının akademik, idari ve finansal tüm süreçlerini tek bir çatı altında yönetmesini sağlayan kapsamlı bir ERP platformudur. Öğretmenler, öğrenciler ve veliler için ayrı paneller sunarak ödev takibini, etüt planlamalarını, devamsızlık durumlarını ve taksitli ödemeleri takip etmeyi sağlar.',
            features: [
                'Otomatik haftalık ders ve etüt programı oluşturma algoritması.',
                'Veliler için anlık bildirim (SMS & Push Notification) altyapısı.',
                'Muhasebe entegrasyonu ile taksit takibi, faturalandırma ve gelir-gider analizi raporları.',
                'Online deneme sınavı giriş sistemi ve detaylı kazanım/konu analiz karnesi.'
            ],
            techs: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
            problem: 'Eğitim kurumlarında veli-okul-öğretmen iletişiminin kopuk olması ve mali takiplere dair verilerin excel dosyalarında kaybolması idari yükü artırıyordu.',
            impact: 'İdari yönetim süreçlerindeki bürokrasi %50 oranında azaltıldı, veli geri bildirim memnuniyeti %92 seviyesine ulaştı.'
        },
        'inventory-system': {
            title: 'Akıllı Stok Takip',
            category: 'Bulut Tabanlı SaaS',
            image: 'images/inventory.png',
            descLong: 'Çoklu depo yapısına sahip işletmeler için tasarlanmış bulut tabanlı bir envanter yönetim platformudur. Barkod/QR kod okuyucu entegrasyonu ile ürün giriş-çıkış süreçlerini saniyeler içinde kaydeder. Yapay zeka tabanlı talep tahminleme motoru sayesinde, kritik stok seviyelerini önceden bildirerek eksik veya fazla stok riskini azaltır.',
            features: [
                'Gerçek zamanlı stok takibi ve depolar arası hızlı transfer yönetimi.',
                'Kamera üzerinden barkod/QR kod okutarak anında ürün arama ve stok güncelleme.',
                'Önceki satış verilerini analiz ederek gelecek dönem stok ihtiyacını tahmin eden yapay zeka modeli.',
                'Excel ile kolay ürün aktarımı ve kapsamlı stok maliyeti raporları.'
            ],
            techs: ['Vue.js', 'Go (Golang)', 'MongoDB', 'REST APIs', 'Chart.js'],
            problem: 'Depolardaki ürün sayım hataları, stokta kalmayan popüler ürünler nedeniyle sipariş iptalleri ve gereksiz depolama maliyetleri ciro verimliliğini düşürüyordu.',
            impact: 'Envanter sayım hataları sıfıra indirildi, gereksiz stok bulundurma maliyeti %25 düşürüldü.'
        },
        'coaching': {
            title: 'Teknik Koçluk & Danışmanlık',
            category: 'Mentörlük',
            image: 'images/coaching.jpg',
            descLong: 'Yazılım ekiplerinin mühendislik kalitesini artırmak, sistem mimarilerini modern standartlara taşımak ve yapay zeka entegrasyonlarını en doğru yöntemlerle hayata geçirmek için sunulan profesyonel danışmanlık hizmetidir. Kod standartlarının belirlenmesinden, CI/CD süreçlerinin kurulmasına kadar geniş bir teknik mentörlük sunulur.',
            features: [
                'Birebir kod incelemesi (Code Review) ve refactoring pratiklerinin geliştirilmesi.',
                'Domain-Driven Design (DDD) ve Clean Architecture ilkelerinin takımlara benimsetilmesi.',
                'Şirket içi yapay zeka ve otomasyon hackathonları düzenleyerek inovasyonun tetiklenmesi.',
                'Mikroservis mimarisine geçiş ve veritabanı ölçekleme stratejilerinin belirlenmesi.'
            ],
            techs: ['Software Architecture', 'CI/CD Pipelines', 'System Design', 'Agile/Scrum', 'AI Integration'],
            problem: 'Geliştirme ekiplerinde mimari standart eksikliği nedeniyle kod tabanının karmaşıklaşması (Technical Debt) ve yapay zeka dönüşümüne ayak uyduramama.',
            impact: 'Ekiplerin kod üretim kalitesi ve standartlaşma hızı artırıldı; projelerin canlıya çıkma süreleri (Time to Market) ortalama %40 hızlandı.'
        },
        'agro-vision': {
            title: 'AgroVision OS Tarımsal Sulama',
            category: 'Tarımsal Teknoloji & IOT',
            image: 'images/agro_vision.jpg',
            descLong: 'AgroVision OS, geniş tarım arazileri ve sulama birlikleri için tasarlanmış IoT tabanlı otonom bir vana ve nem kontrol sistemidir. Topraktaki kablosuz nem sensörlerinden gelen verileri anlık olarak analiz ederek, buharlaşma oranları ve hava durumuna göre optimum sulama planlaması yapar ve solenoid vanaları otonom yönetir.',
            features: [
                'Toprak nem, sıcaklık ve tuzluluk oranlarını ölçen pilli kablosuz IoT sensör entegrasyonu.',
                'Hava durumu API verileri ve nem trendleriyle otonom vana açılış/kapanış süresi belirleme.',
                'AWS IoT Core ve MQTT protokolü üzerinden gecikmesiz, güvenli vana açıp kapatma komutları.',
                'Pompa istasyonlarında enerji tüketim takibi, kaçak tespiti ve acil durum vana kapatma altyapısı.'
            ],
            techs: ['Rust', 'Python', 'FastAPI', 'MQTT', 'InfluxDB', 'AWS IoT Core'],
            problem: 'Tarımsal sulama birliklerinde su kaynaklarının kontrolsüz tüketilmesi, hatalı vana açma/kapama zamanlamaları ve yüksek elektrik maliyetleri.',
            impact: 'Su tasarrufu %40 oranında optimize edildi, pompa enerji maliyetlerinde %30 tasarruf sağlandı ve otonom vanalarla insan hatası sıfırlandı.'
        },
        'stylist-ai': {
            title: 'Stylist AI Yapay Zeka Randevu Ajanı',
            category: 'Yapay Zeka & Rezervasyon',
            image: 'images/stylist_ai.jpg',
            descLong: 'Stylist AI, kuaför ve güzellik salonları için tasarlanmış, otonom bir yapay zeka asistanıdır. WhatsApp Business Cloud API entegrasyonu sayesinde müşterilerle 7/24 konuşarak boş saatleri listeler, randevuları kaydeder ve salon sahiplerinin randevu takvimini yönetir. Ayrıca, bilgisayarlı görü (computer vision) ile saç analiz önerileri sunar.',
            features: [
                'WhatsApp üzerinden gelen randevu taleplerini otonom anlama ve Google Takvim ile çift yönlü eşleme.',
                'OpenAI Vision API entegrasyonu ile yüklenen fotoğraflardan yüz şekli analizi yapma.',
                'Kullanıcının yüz yapısına uygun saç modeli ve sakal stili önerileri sunan yapay zeka motoru.',
                'Randevudan 2 saat önce müşteriye otonom hatırlatma mesajı ve randevu iptal/erteleme yönetimi.'
            ],
            techs: ['Next.js', 'Python', 'OpenAI Vision', 'WhatsApp Cloud API', 'Node.js'],
            problem: 'Kuaför ve güzellik salonlarında randevu kaçırma oranları, telefon trafiği ve müşterilere kişiselleştirilmiş saç analizi sunamama.',
            impact: 'Randevu doluluk oranları %45 arttı, telefonda harcanan zaman %80 azaldı ve yapay zeka saç analizi ile müşteri memnuniyeti %95\'e ulaştı.'
        },
        'edtech-labs': {
            title: 'Akıllı Ödev & Soru Bankası AI',
            category: 'SaaS & Eğitim',
            image: 'images/edtech_labs.jpg',
            descLong: 'Dershane ve etüt merkezlerinde öğrencilerin deneme sınavı performanslarını konu bazlı analiz eden ve eksik kazanımlarına göre otomatik yapay zeka ödevlendirmeleri yapan bir EdTech SaaS ürünüdür. Öğretmenlerin soru bankası havuzundan saniyeler içinde seviyeye özel fasikül oluşturmasını sağlar.',
            features: [
                'Öğrencinin geçmiş deneme sınavı sonuçlarına göre eksik kazanımlarını belirleyen yapay zeka analitiği.',
                'Öğretmenlerin tek tıkla konu ve zorluk seviyesine göre kişiselleştirilmiş PDF ödev föyü oluşturma modülü.',
                'Optik okuyucu ve mobil kamera üzerinden deneme sınavı sonuçlarını anlık okuyup veri tabanına işleme.',
                'Gelişmiş veli bilgilendirme karnesi ve öğrenci başarı grafiği üzerinden otonom yönlendirme motoru.'
            ],
            techs: ['React', 'Node.js', 'PostgreSQL', 'Python AI', 'PyTorch'],
            problem: 'Eğitimcilerin kişiye özel ödev hazırlamakta zorlanması ve öğrencilerin zayıf kaldığı kazanımları tespit etmekte gecikmesi.',
            impact: 'Öğrencilerin konu eksikleri %35 daha hızlı kapatıldı, öğretmenlerin ödev hazırlama yükü haftalık 6 saat azaldı.'
        }
    };

    const openModal = (projectKey) => {
        const data = projectsData[projectKey];
        if (!data || !modal) return;

        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalBadge.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDescLong.textContent = data.descLong;
        modalProblemSolved.textContent = data.problem;
        modalImpactText.textContent = data.impact;

        modalFeaturesList.innerHTML = '';
        data.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            modalFeaturesList.appendChild(li);
        });

        modalTechTags.innerHTML = '';
        data.techs.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            modalTechTags.appendChild(span);
        });

        modal.classList.add('open');
        document.body.classList.add('modal-open');
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    };

    const bentoCards = document.querySelectorAll('.clickable-card');
    bentoCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            if (projectKey) {
                openModal(projectKey);
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ==========================================================================
    // 7. NAVBAR SCROLL EFFECT
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 8. MOBILE DRAWER NAVIGATION
    // ==========================================================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const drawerClose = document.querySelector('.mobile-drawer-close');
    const drawer = document.querySelector('.mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-links a');

    if (menuToggle && drawer) {
        menuToggle.addEventListener('click', () => {
            drawer.classList.add('open');
        });
    }

    if (drawerClose && drawer) {
        drawerClose.addEventListener('click', () => {
            drawer.classList.remove('open');
        });
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
        });
    });

    // ==========================================================================
    // 9. FAQ ACCORDION LOGIC
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all FAQ items
                faqItems.forEach(innerItem => {
                    innerItem.classList.remove('active');
                    const innerAnswer = innerItem.querySelector('.faq-answer');
                    if (innerAnswer) innerAnswer.style.maxHeight = '0';
                });

                // Toggle selected
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // ==========================================================================
    // 10. ELEGANT INTERSECTION OBSERVER (FADE-UP)
    // ==========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.08
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // ==========================================================================
    // 11. FORM SUBMISSION INTERACTIVE ANIMATION
    // ==========================================================================
    const form = document.querySelector('.clean-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Gönderiliyor... <i data-feather="loader" class="btn-icon spin"></i>';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
            
            setTimeout(() => {
                btn.innerHTML = 'Talep Alındı! <i data-feather="check-circle" class="btn-icon"></i>';
                btn.style.opacity = '1';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)'; 
                btn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
                
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.boxShadow = '';
                    btn.style.opacity = '';
                    btn.disabled = false;
                    form.reset();
                    if (typeof feather !== 'undefined') {
                        feather.replace();
                    }
                }, 3000);
            }, 1800);
        });
    }

    // ==========================================================================
    // 12. SMOOTH ANCHOR LINK NAVIGATION
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================================================
    // 14. SCROLL PROGRESS INDICATOR
    // ==========================================================================
    const scrollBar = document.querySelector('.scroll-progress');
    if (scrollBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            scrollBar.style.width = `${scrolled}%`;
        });
    }

    // ==========================================================================
    // 15. LIVE HERO DASHBOARD METRICS ANIMATION
    // ==========================================================================
    const heroCpu = document.getElementById('hero-cpu');
    if (heroCpu) {
        setInterval(() => {
            const load = Math.floor(12 + Math.random() * 10);
            heroCpu.textContent = `%${load}`;
        }, 2000);
    }
    const heroSessions = document.getElementById('hero-sessions');
    if (heroSessions) {
        setInterval(() => {
            const drift = Math.floor(Math.random() * 31) - 15;
            const currentVal = parseInt(heroSessions.textContent.replace(/\D/g, '')) || 2840;
            heroSessions.textContent = (currentVal + drift).toLocaleString('tr-TR');
        }, 3000);
    }
    const heroUptime = document.getElementById('hero-uptime');
    if (heroUptime) {
        setInterval(() => {
            const upt = (99.988 + Math.random() * 0.011).toFixed(3);
            heroUptime.textContent = `%${upt}`;
        }, 4000);
    }

    // ==========================================================================
    // 16. INTERACTIVE ROI & VERİMLİLİK HESAPLAYICI
    // ==========================================================================
    const estTabs = document.querySelectorAll('.estimator-tab');
    const estGroups = document.querySelectorAll('.est-input-group');
    
    const sliderStudents = document.getElementById('slider-students');
    const sliderStaff = document.getElementById('slider-staff');
    const sliderSkus = document.getElementById('slider-skus');
    const sliderDepots = document.getElementById('slider-depots');
    const sliderChats = document.getElementById('slider-chats');
    const sliderAgents = document.getElementById('slider-agents');
    
    const valStudents = document.getElementById('val-students');
    const valStaff = document.getElementById('val-staff');
    const valSkus = document.getElementById('val-skus');
    const valDepots = document.getElementById('val-depots');
    const valChats = document.getElementById('val-chats');
    const valAgents = document.getElementById('val-agents');
    
    const outTime = document.getElementById('est-out-time');
    const outCost = document.getElementById('est-out-cost');
    const outPerf = document.getElementById('est-out-perf');
    
    let currentEstTab = 'erp';
    
    const updateEstimator = () => {
        if (currentEstTab === 'erp') {
            if (!sliderStudents || !sliderStaff) return;
            const students = parseInt(sliderStudents.value);
            const staff = parseInt(sliderStaff.value);
            
            if (valStudents) valStudents.textContent = students.toLocaleString('tr-TR');
            if (valStaff) valStaff.textContent = staff;
            
            const savedHours = Math.round(staff * 15 + students * 0.18);
            const costRed = Math.min(65, Math.round(25 + (students / 200) + (staff * 1.5)));
            const perfScore = Math.max(95, 99 - Math.round(students / 1500));
            
            if (outTime) outTime.textContent = savedHours;
            if (outCost) outCost.textContent = `%${costRed}`;
            if (outPerf) outPerf.textContent = perfScore;
        } else if (currentEstTab === 'stok') {
            if (!sliderSkus || !sliderDepots) return;
            const skus = parseInt(sliderSkus.value);
            const depots = parseInt(sliderDepots.value);
            
            if (valSkus) valSkus.textContent = skus.toLocaleString('tr-TR');
            if (valDepots) valDepots.textContent = depots;
            
            const savedHours = Math.round((skus * 0.04) + (depots * 25));
            const costRed = Math.min(55, Math.round(18 + (skus / 800) + (depots * 2.2)));
            const perfScore = Math.max(96, 99 - Math.round(skus / 8000));
            
            if (outTime) outTime.textContent = savedHours;
            if (outCost) outCost.textContent = `%${costRed}`;
            if (outPerf) outPerf.textContent = perfScore;
        } else if (currentEstTab === 'ai') {
            if (!sliderChats || !sliderAgents) return;
            const chats = parseInt(sliderChats.value);
            const agents = parseInt(sliderAgents.value);
            
            if (valChats) valChats.textContent = chats.toLocaleString('tr-TR');
            if (valAgents) valAgents.textContent = agents;
            
            const savedHours = Math.round(chats * 0.12);
            const costRed = Math.min(78, Math.round(35 + (chats / 5000) + (agents * 1.8)));
            const perfScore = Math.max(94, 99 - Math.round(chats / 25000));
            
            if (outTime) outTime.textContent = savedHours;
            if (outCost) outCost.textContent = `%${costRed}`;
            if (outPerf) outPerf.textContent = perfScore;
        }
    };
    
    estTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            estTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentEstTab = tab.getAttribute('data-est');
            
            estGroups.forEach(g => g.classList.remove('active'));
            const matchedGroup = document.getElementById(`est-group-${currentEstTab}`);
            if (matchedGroup) matchedGroup.classList.add('active');
            
            updateEstimator();
        });
    });
    
    [sliderStudents, sliderStaff, sliderSkus, sliderDepots, sliderChats, sliderAgents].forEach(sl => {
        if (sl) {
            sl.addEventListener('input', updateEstimator);
        }
    });
    
    updateEstimator();

    // ==========================================================================
    // 17. LABS R&D INTERACTIVE SANDBOX SIMULATORS
    // ==========================================================================
    const sandboxTabs = document.querySelectorAll('.sandbox-tab');
    const sandboxPanels = document.querySelectorAll('.sandbox-panel');
    
    sandboxTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sandboxTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabKey = tab.getAttribute('data-sandbox-tab');
            sandboxPanels.forEach(p => p.classList.remove('active'));
            const matchedPanel = document.getElementById(`panel-${tabKey}`);
            if (matchedPanel) matchedPanel.classList.add('active');
            
            if (tabKey === 'neural-net') {
                initNeuralNetCanvas();
            }
        });
    });
    
    const btnRunAgent = document.getElementById('btn-run-agent');
    const agentConsoleBody = document.getElementById('agent-console-body');
    const agentNodes = [
        document.getElementById('node-prompt'),
        document.getElementById('node-embedding'),
        document.getElementById('node-vector-search'),
        document.getElementById('node-llm'),
        document.getElementById('node-action')
    ];
    
    const agentLogs = [
        "[SYSTEM] Girdi algılandı: 'Son fatura durumunu listele ve muhasebeye SMS at.'",
        "[EMBEDDING] Cümle vektör uzayına izdüşürülüyor... Vektör boyutu: 1536. [OK]",
        "[VECTOR SEARCH] HNSW indeksi taranıyor... %98.2 cosine similarity ile en yakın 3 döküman chunk'ı getirildi.",
        "[CONTEXT RETRIEVED] 'DershaneERP_taksit_kuralları.txt' ve 'VeliSMS_API_docs.ts' bağlamları yüklendi.",
        "[LLM EVALUATION] Ajan karar modeli (GPT-4o-arf) çalıştırılıyor... Düşünme adımları tamamlandı.",
        "[LLM ACTION PLAN] Geciken taksitler için 'taksitUyarisiGonder' fonksiyonu tetikleniyor...",
        "[SYSTEM ACTION] SMS kuyruğa gönderildi. Alıcı: +90 538 *** ** 18. Durum: BAŞARILI.",
        "[SYSTEM] İşlem tamamlandı. Ajan bekleme durumunda."
    ];
    
    let isRunningAgent = false;
    if (btnRunAgent && agentConsoleBody) {
        btnRunAgent.addEventListener('click', () => {
            if (isRunningAgent) return;
            isRunningAgent = true;
            btnRunAgent.disabled = true;
            btnRunAgent.textContent = "Simüle Ediliyor...";
            
            agentConsoleBody.innerHTML = '';
            
            agentNodes.forEach(node => {
                if (node) {
                    node.classList.remove('active');
                    node.classList.remove('pulsing');
                }
            });
            
            let step = 0;
            const runStep = () => {
                if (step < agentLogs.length) {
                    const line = document.createElement('div');
                    line.style.marginBottom = '0.3rem';
                    
                    let logText = agentLogs[step];
                    if (logText.includes('[SYSTEM]')) logText = `<span style="color:#10b981">${logText}</span>`;
                    else if (logText.includes('[EMBEDDING]')) logText = `<span style="color:#a855f7">${logText}</span>`;
                    else if (logText.includes('[VECTOR SEARCH]')) logText = `<span style="color:#38bdf8">${logText}</span>`;
                    else if (logText.includes('[LLM')) logText = `<span style="color:#fbbf24">${logText}</span>`;
                    
                    line.innerHTML = logText;
                    agentConsoleBody.appendChild(line);
                    agentConsoleBody.scrollTop = agentConsoleBody.scrollHeight;
                    
                    if (step === 0 && agentNodes[0]) {
                        agentNodes[0].classList.add('active');
                        agentNodes[0].classList.add('pulsing');
                    } else if (step === 1) {
                        if (agentNodes[0]) agentNodes[0].classList.remove('pulsing');
                        if (agentNodes[1]) {
                            agentNodes[1].classList.add('active');
                            agentNodes[1].classList.add('pulsing');
                        }
                    } else if (step === 2) {
                        if (agentNodes[1]) agentNodes[1].classList.remove('pulsing');
                        if (agentNodes[2]) {
                            agentNodes[2].classList.add('active');
                            agentNodes[2].classList.add('pulsing');
                        }
                    } else if (step === 4) {
                        if (agentNodes[2]) agentNodes[2].classList.remove('pulsing');
                        if (agentNodes[3]) {
                            agentNodes[3].classList.add('active');
                            agentNodes[3].classList.add('pulsing');
                        }
                    } else if (step === 5 || step === 6) {
                        if (agentNodes[3]) agentNodes[3].classList.remove('pulsing');
                        if (agentNodes[4]) {
                            agentNodes[4].classList.add('active');
                            agentNodes[4].classList.add('pulsing');
                        }
                    } else if (step === 7) {
                        if (agentNodes[4]) agentNodes[4].classList.remove('pulsing');
                    }
                    
                    step++;
                    setTimeout(runStep, 1000);
                } else {
                    isRunningAgent = false;
                    btnRunAgent.disabled = false;
                    btnRunAgent.innerHTML = 'Ajanı Tetikle <i data-feather="play" class="btn-icon"></i>';
                    if (typeof feather !== 'undefined') feather.replace();
                }
            };
            runStep();
        });
    }
    
    const nnCanvas = document.getElementById('neural-net-canvas');
    let nnCtx = null;
    let nnAnimationId = null;
    let isTrainingNN = false;
    let nnEpochVal = 0;
    
    const initNeuralNetCanvas = () => {
        if (!nnCanvas) return;
        nnCtx = nnCanvas.getContext('2d');
    };
    
    const drawNNStructure = (offset) => {
        if (!nnCtx || !nnCanvas) return;
        nnCtx.clearRect(0, 0, nnCanvas.width, nnCanvas.height);
        
        const layers = [3, 4, 4, 2];
        const layerX = [40, 140, 240, 340];
        const layerNodes = [];
        
        for (let i = 0; i < layers.length; i++) {
            const count = layers[i];
            const positions = [];
            const spacing = (nnCanvas.height - 40) / (count - 1 || 1);
            const startY = count === 1 ? nnCanvas.height / 2 : 20;
            
            for (let j = 0; j < count; j++) {
                positions.push({
                    x: layerX[i],
                    y: startY + j * spacing
                });
            }
            layerNodes.push(positions);
        }
        
        for (let i = 0; i < layerNodes.length - 1; i++) {
            const currentLayer = layerNodes[i];
            const nextLayer = layerNodes[i+1];
            
            for (let j = 0; j < currentLayer.length; j++) {
                for (let k = 0; k < nextLayer.length; k++) {
                    const alpha = 0.05 + Math.sin(offset + j * 0.5 + k * 0.8) * 0.04;
                    nnCtx.strokeStyle = isTrainingNN 
                        ? `rgba(168, 85, 247, ${alpha * 4})` 
                        : `rgba(99, 102, 241, ${alpha * 1.5})`;
                    nnCtx.lineWidth = isTrainingNN ? 1.5 : 1;
                    nnCtx.beginPath();
                    nnCtx.moveTo(currentLayer[j].x, currentLayer[j].y);
                    nnCtx.lineTo(nextLayer[k].x, nextLayer[k].y);
                    nnCtx.stroke();
                }
            }
        }
        
        for (let i = 0; i < layerNodes.length; i++) {
            const nodes = layerNodes[i];
            for (let j = 0; j < nodes.length; j++) {
                const p = nodes[j];
                const pulseSize = 4 + Math.sin(offset * 2 + i + j) * 1.5;
                
                nnCtx.beginPath();
                nnCtx.arc(p.x, p.y, 8, 0, Math.PI * 2);
                nnCtx.fillStyle = '#070709';
                nnCtx.fill();
                nnCtx.strokeStyle = i === 0 ? '#38bdf8' : (i === layers.length - 1 ? '#10b981' : '#a855f7');
                nnCtx.lineWidth = 2;
                nnCtx.stroke();
                
                nnCtx.beginPath();
                nnCtx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
                nnCtx.fillStyle = i === 0 ? 'rgba(56, 189, 248, 0.8)' : (i === layers.length - 1 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(168, 85, 247, 0.8)');
                nnCtx.fill();
            }
        }
    };
    
    let animationOffset = 0;
    const animateNN = () => {
        animationOffset += isTrainingNN ? 0.15 : 0.03;
        drawNNStructure(animationOffset);
        nnAnimationId = requestAnimationFrame(animateNN);
    };
    
    initNeuralNetCanvas();
    animateNN();
    
    const btnTrainNN = document.getElementById('btn-train-nn');
    const nnEpoch = document.getElementById('nn-epoch');
    const nnLoss = document.getElementById('nn-loss');
    const nnAcc = document.getElementById('nn-acc');
    
    if (btnTrainNN) {
        btnTrainNN.addEventListener('click', () => {
            if (isTrainingNN) return;
            isTrainingNN = true;
            btnTrainNN.disabled = true;
            btnTrainNN.textContent = "Model Eğitiliyor...";
            
            let epoch = 0;
            let loss = 0.984;
            let acc = 12.4;
            
            const trainInterval = setInterval(() => {
                epoch += 5;
                loss = Math.max(0.041, loss - (loss * 0.08) - Math.random() * 0.02);
                acc = Math.min(99.6, acc + ((100 - acc) * 0.08) + Math.random() * 0.5);
                
                if (nnEpoch) nnEpoch.textContent = `${epoch}/200`;
                if (nnLoss) nnLoss.textContent = loss.toFixed(4);
                if (nnAcc) nnAcc.textContent = `%${acc.toFixed(1)}`;
                
                if (epoch >= 200) {
                    clearInterval(trainInterval);
                    isTrainingNN = false;
                    btnTrainNN.disabled = false;
                    btnTrainNN.innerHTML = 'Modeli Eğit (SGD) <i data-feather="cpu" class="btn-icon"></i>';
                    if (typeof feather !== 'undefined') feather.replace();
                }
            }, 100);
        });
    }

    // ==========================================================================
    // 18. CLIENT TESTIMONIALS SLIDER
    // ==========================================================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testDots = document.querySelectorAll('.slider-dot');
    const testPrev = document.querySelector('.prev-btn');
    const testNext = document.querySelector('.next-btn');
    let activeTestIdx = 0;
    
    const showTestimonial = (idx) => {
        if (testimonialCards.length === 0) return;
        testimonialCards.forEach(t => t.classList.remove('active'));
        testDots.forEach(d => d.classList.remove('active'));
        
        activeTestIdx = (idx + testimonialCards.length) % testimonialCards.length;
        testimonialCards[activeTestIdx].classList.add('active');
        if (testDots[activeTestIdx]) testDots[activeTestIdx].classList.add('active');
    };
    
    if (testPrev && testNext) {
        testPrev.addEventListener('click', () => showTestimonial(activeTestIdx - 1));
        testNext.addEventListener('click', () => showTestimonial(activeTestIdx + 1));
        
        testDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'));
                showTestimonial(idx);
            });
        });
        
        setInterval(() => {
            const container = document.querySelector('.testimonials-slider-container');
            if (container && !container.matches(':hover')) {
                showTestimonial(activeTestIdx + 1);
            }
        }, 8000);
    }

    // ==========================================================================
    // 17. INTERACTIVE BACKGROUND PARTICLE NODE NETWORK
    // ==========================================================================
    const canvas = document.getElementById('bg-particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 160 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.5 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Mouse interaction (attraction)
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 0.3;
                        this.y += (dy / dist) * force * 0.3;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(5, 21, 117, 0.35)';
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();
        window.addEventListener('resize', initParticles);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(5, 21, 117, ${0.08 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    // ==========================================================================
    // 18. INTERACTIVE IDE LIVE RUNNER / COMPILED CONSOLE LOGS
    // ==========================================================================
    const runBtn = document.getElementById('ide-run-btn');
    const terminal = document.getElementById('ide-terminal');
    const terminalClose = document.getElementById('terminal-close');
    const logBody = document.getElementById('terminal-log-body');
    let runTimeout = null;

    if (runBtn && terminal && logBody) {
        const streamLogs = (fileKey) => {
            logBody.innerHTML = '';
            
            const logsData = {
                'dershane': [
                    { type: 'cmd', text: '> ts-node DershaneERP.ts' },
                    { type: 'info', text: 'INFO: Compiling TypeScript source files...' },
                    { type: 'info', text: 'LINT: ES-Lint syntax check passed (0 warnings, 0 errors).' },
                    { type: 'info', text: 'TEST: Executing Jest Unit Tests (Suite: DershaneERP)...' },
                    { type: 'success', text: 'PASS: tests/billing_automation.test.ts (24ms)' },
                    { type: 'success', text: 'PASS: tests/parent_alert_dispatcher.test.ts (18ms)' },
                    { type: 'info', text: 'DOCKER: Building container image arfcode/school-erp:prod...' },
                    { type: 'info', text: 'AWS: Deploying container stack using ECS Fargate...' },
                    { type: 'success', text: 'ONLINE: Deployed successfully! Live at https://erp.arfcode.com [Uptime: 100%]' }
                ],
                'stok': [
                    { type: 'cmd', text: '> go run AkilliStok.go' },
                    { type: 'info', text: 'GO: Compiling Go packages for smart-inventory...' },
                    { type: 'info', text: 'TEST: Running inventory test suite: go test ./predict/...' },
                    { type: 'success', text: 'PASS: CheckStockLimits (0.008s)' },
                    { type: 'info', text: 'POSTGRES: Fetching depot #4 stock levels...' },
                    { type: 'info', text: 'AI PREDICT: Low stock detected! Triggering demand forecasting model...' },
                    { type: 'info', text: 'PREDICTED: Next 30 days demand quantity = 140.' },
                    { type: 'success', text: 'AUTO ORDER: TriggerAutoPurchaseOrder successfully fired! Status code: 201' }
                ],
                'yapayzekabot': [
                    { type: 'cmd', text: '> python SiparisAI.py' },
                    { type: 'info', text: 'VENV: Activating Python Virtual Environment...' },
                    { type: 'info', text: 'FAISS: Initializing local HNSW vector index...' },
                    { type: 'info', text: 'INDEX: 10,240 documents successfully embedded into memory (0.12s)' },
                    { type: 'info', text: 'LLM: Connecting to GPT-4o-Arf OpenAI model instance...' },
                    { type: 'info', text: 'INPUT: "2 adet pizza ve kola sipariş etmek istiyorum."' },
                    { type: 'success', text: 'PARSED ENTITIES: { "pizza": 2, "cola": 1 }' },
                    { type: 'success', text: 'REPLY: "Siparişinizi sepetinize ekledim. Onaylıyor musunuz?"' }
                ],
                'mobilweb': [
                    { type: 'cmd', text: '> node KurumsalApp.js' },
                    { type: 'info', text: 'SYSTEM: Initializing Express server on port 3000...' },
                    { type: 'info', text: 'SSR: Next.js Server-Side Renderer online.' },
                    { type: 'info', text: 'REDIS: Distributed cache cluster connected.' },
                    { type: 'info', text: 'LIGHTHOUSE: Running Core Web Vitals audit check...' },
                    { type: 'success', text: 'AUDIT METRICS: LCP = 1.1s, FID = 12ms, CLS = 0.01' },
                    { type: 'success', text: 'SCORE: PageSpeed Score = 99/100 (A+ Performance)' },
                    { type: 'success', text: 'LISTENING: Production server online at http://localhost:3000' }
                ],
                'agrovision': [
                    { type: 'cmd', text: '> cargo run --bin agrovision' },
                    { type: 'info', text: 'CARGO: Fetching dependencies (tokio, InfluxDB, MQTT)...' },
                    { type: 'info', text: 'CARGO: Compiling core-iot-driver v0.4.2...' },
                    { type: 'info', text: 'TEST: Executing unit tests (cargo test)...' },
                    { type: 'success', text: 'PASS: tests/mqtt_handshake.rs (0.012s)' },
                    { type: 'success', text: 'PASS: tests/valve_actuator.rs (0.009s)' },
                    { type: 'info', text: 'MQTT: Connecting to AWS IoT Core Broker...' },
                    { type: 'info', text: 'IOT: Reading soil moisture status for [zone-5]...' },
                    { type: 'warning', text: 'WARN: Soil moisture at 32.4% (Threshold: 35.0%).' },
                    { type: 'info', text: 'VALVE: Executing vana_ac("valve-09") command...' },
                    { type: 'success', text: 'RELAY: Valve-09 successfully opened. Status: WATERING (Flow: 1.2m³/h)' }
                ]
            };

            const lines = logsData[fileKey] || logsData['dershane'];
            let delay = 0;
            
            // Clear any active running log timers
            if (runTimeout) clearTimeout(runTimeout);

            const printLine = (index) => {
                if (index >= lines.length) {
                    runBtn.innerHTML = '<i data-feather="play" class="run-icon" style="width: 14px; height: 14px; margin-right: 4px; vertical-align: middle;"></i> Çalıştır';
                    if (typeof feather !== 'undefined') feather.replace();
                    return;
                }

                const line = lines[index];
                const p = document.createElement('p');
                p.className = `terminal-log-line ${line.type}`;
                p.textContent = line.text;
                logBody.appendChild(p);
                logBody.scrollTop = logBody.scrollHeight;

                runTimeout = setTimeout(() => {
                    printLine(index + 1);
                }, index === 0 ? 300 : 450);
            };

            printLine(0);
        };

        runBtn.addEventListener('click', () => {
            terminal.classList.add('open');
            runBtn.innerHTML = '<span class="pulse-led" style="background-color:#10b981; width:8px; height:8px; display:inline-block; border-radius:50%; margin-right:6px; vertical-align:middle;"></span> Çalışıyor...';
            
            const activeTab = document.querySelector('.ide-tab.active');
            const fileKey = activeTab ? activeTab.getAttribute('data-file') : 'dershane';
            streamLogs(fileKey);
        });

        if (terminalClose) {
            terminalClose.addEventListener('click', () => {
                terminal.classList.remove('open');
                if (runTimeout) clearTimeout(runTimeout);
                runBtn.innerHTML = '<i data-feather="play" class="run-icon" style="width: 14px; height: 14px; margin-right: 4px; vertical-align: middle;"></i> Çalıştır';
                if (typeof feather !== 'undefined') feather.replace();
            });
        }
    }

    // ==========================================================================
    // 18.5 HERO PRODUCT SWITCHER & WHATSAPP SIMULATION
    // ==========================================================================
    const tabHeroErp = document.getElementById('hero-tab-erp');
    const tabHeroStock = document.getElementById('hero-tab-stock');
    const tabHeroBot = document.getElementById('hero-tab-bot');
    
    const viewHeroErp = document.getElementById('hero-view-erp');
    const viewHeroStock = document.getElementById('hero-view-stock');
    const viewHeroBot = document.getElementById('hero-view-bot');

    const startHeroWhatsAppSimulation = () => {
        const chatContainer = document.getElementById('hero-wa-messages-container');
        if (!chatContainer) return;

        const isEnglish = document.documentElement.lang === 'en';
        const conversation = isEnglish ? [
            { sender: 'user', text: 'Hi, do you have an automated student tracking system with automatic parent notifications?' },
            { sender: 'bot', text: 'Hello! Yes, our DershaneERP system does exactly that. It notifies parents via SMS for overdue balances and manages your billing 24/7. May I have your phone number?' },
            { sender: 'user', text: '0538 447 80 18' },
            { sender: 'bot', text: 'Thank you! I have saved your details. Our founder Arda Berkay Demirci will get in touch with you shortly. 🚀' }
        ] : [
            { sender: 'user', text: 'Merhaba, dershanemiz için otomatik veli bilgilendirmeli taksit takip sisteminiz var mı?' },
            { sender: 'bot', text: 'Merhaba! Evet, DershaneERP sistemimiz tam olarak bu işi yapmaktadır. Velilere geciken ödemeleri otomatik SMS ile uyarır ve muhasebenizi 7/24 düzenler. İletişim numaranızı alabilir miyim?' },
            { sender: 'user', text: '0538 447 80 18' },
            { sender: 'bot', text: 'Teşekkürler! Bilgilerinizi sistemimize kaydettim. Kurucumuz Arda Berkay Demirci en kısa sürede sizinle iletişime geçecektir. 🚀' }
        ];

        chatContainer.innerHTML = '';
        let step = 0;

        if (window.heroChatSimulationTimeouts) {
            window.heroChatSimulationTimeouts.forEach(t => clearTimeout(t));
        }
        window.heroChatSimulationTimeouts = [];

        const renderNextMessage = () => {
            if (step < conversation.length) {
                const msgData = conversation[step];
                const msgDiv = document.createElement('div');
                msgDiv.className = `wa-msg ${msgData.sender}`;
                msgDiv.innerHTML = msgData.text;
                chatContainer.appendChild(msgDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                step++;
                const nextDelay = msgData.sender === 'user' ? 1500 : 3000;
                const t = setTimeout(renderNextMessage, nextDelay);
                window.heroChatSimulationTimeouts.push(t);
            } else {
                const t = setTimeout(() => {
                    chatContainer.innerHTML = '';
                    step = 0;
                    renderNextMessage();
                }, 5000);
                window.heroChatSimulationTimeouts.push(t);
            }
        };

        const tInitial = setTimeout(renderNextMessage, 500);
        window.heroChatSimulationTimeouts.push(tInitial);
    };

    if (tabHeroErp && tabHeroStock && tabHeroBot) {
        const switchView = (activeTab, activeView) => {
            [tabHeroErp, tabHeroStock, tabHeroBot].forEach(t => t.classList.remove('active'));
            [viewHeroErp, viewHeroStock, viewHeroBot].forEach(v => {
                if (v) v.style.display = 'none';
            });
            
            activeTab.classList.add('active');
            if (activeView) activeView.style.display = 'block';
            
            if (activeTab === tabHeroBot) {
                startHeroWhatsAppSimulation();
            }
        };

        tabHeroErp.addEventListener('click', () => switchView(tabHeroErp, viewHeroErp));
        tabHeroStock.addEventListener('click', () => switchView(tabHeroStock, viewHeroStock));
        tabHeroBot.addEventListener('click', () => switchView(tabHeroBot, viewHeroBot));
    }

    if (document.getElementById('hero-wa-messages-container')) {
        startHeroWhatsAppSimulation();
    }

    // ==========================================================================
    // 19. DYNAMIC AI FORM ANALYSER
    // ==========================================================================
    const formNameInput = document.getElementById('name');
    const formCompanyInput = document.getElementById('company');
    const formTypeInput = document.getElementById('service');
    const formMsgInput = document.getElementById('message');
    const aiAnalyserDiv = document.getElementById('form-ai-analyser');
    const aiAnalyserText = document.getElementById('analyser-text');

    const updateFormAIAnalysis = () => {
        const name = formNameInput ? formNameInput.value.trim() : '';
        const company = formCompanyInput ? formCompanyInput.value.trim() : '';
        const type = formTypeInput ? formTypeInput.value : '';
        const msg = formMsgInput ? formMsgInput.value.trim() : '';

        if (!name && !company && !type && !msg) {
            if (aiAnalyserDiv) aiAnalyserDiv.style.display = 'none';
            return;
        }

        if (aiAnalyserDiv) aiAnalyserDiv.style.display = 'block';

        const isEnglish = document.documentElement.lang === 'en';
        let analysis = "";
        
        if (isEnglish) {
            if (name) {
                analysis += `Hello <strong>${name}</strong>, your form input has been registered in the ARFCODE system. `;
            }
            
            if (company) {
                analysis += `Your request on behalf of <strong>${company}</strong> will be routed directly to Arda Berkay Demirci's high-priority SLA queue. `;
            }

            if (type) {
                analysis += "<br><br><strong>OUR ARCHITECTURAL RECOMMENDATION:</strong><br>";
                if (type === 'whatsapp') {
                    analysis += "⚡ For this project, we recommend an autonomous WhatsApp sales/booking assistant using a <strong>FastAPI (Python)</strong> backend, <strong>LangChain</strong>, and <strong>RAG (Retrieval-Augmented Generation)</strong> database memory. The infrastructure can scale automatically on AWS ECS Fargate.";
                } else if (type === 'web') {
                    analysis += "📱 For mobile & web development, we recommend using <strong>Next.js (SSR)</strong> to maximize search engine optimization (SEO) and load times, alongside <strong>React Native</strong> for native performance on iOS & Android.";
                } else if (type === 'erp') {
                    analysis += "🎓 For academy/school automation, our **DershaneERP** system will be deployed with multi-branch class calendars, an automated parent SMS billing gateway, and a high-availability PostgreSQL/Redis cluster.";
                } else if (type === 'stock') {
                    analysis += "📦 For inventory tracking, we recommend QR/Barcode mobile scanning modules, multi-warehouse stock transfer APIs, and a custom AI-driven demand forecasting dashboard.";
                } else if (type === 'iot') {
                    analysis += "🌱 For hardware/IoT automation, we recommend micro-controller soil telemetry, weather forecast predictive algorithms, and local Edge-IoT fallbacks for network resilience.";
                } else if (type === 'consulting') {
                    analysis += "🧠 For software architecture and consulting, we will plan high-impact coaching covering SOLID, Clean Architecture standards, DevOps CI/CD pipeline automation, and serverless cost optimizations.";
                } else if (type === 'social_consult') {
                    analysis += "📊 For social media strategy, we will conduct an audit of your ad accounts (Meta, Google), configure pixel conversion goals, and design a custom motion graphic/video funnel plan.";
                } else if (type === 'qrmenu') {
                    analysis += "🍔 For QR Menu systems, we recommend our serverless layout optimized for instant mobile rendering, featuring custom upsell engine APIs and a table-based waiter call gateway.";
                } else {
                    analysis += "🛠️ Your project will be designed with a custom microservices architecture or leveraging our pre-built enterprise cloud modules tailored to your requirements.";
                }
            }

            if (msg.length > 5) {
                analysis += "<br><br><strong>ANALYZED CONTEXT:</strong><br><em>";
                let matched = false;
                const lowerMsg = msg.toLowerCase();
                if (lowerMsg.includes("fast") || lowerMsg.includes("speed") || lowerMsg.includes("hız")) {
                    analysis += "• Performance and low-latency requests detected. We will use Redis caching and Cloudflare CDN nodes. ";
                    matched = true;
                }
                if (lowerMsg.includes("integr") || lowerMsg.includes("api")) {
                    analysis += "• API integration need detected. Secure connections with Stripe, iyzico, Logo, or local databases will be configured. ";
                    matched = true;
                }
                if (lowerMsg.includes("budget") || lowerMsg.includes("cost") || lowerMsg.includes("price") || lowerMsg.includes("fiyat")) {
                    analysis += "• Budget optimization requested. We will implement Serverless (AWS Lambda) triggers to minimize hosting costs. ";
                    matched = true;
                }
                if (lowerMsg.includes("secur") || lowerMsg.includes("data") || lowerMsg.includes("gdpr")) {
                    analysis += "• High security and GDPR requirements detected. AES-256 data encryption and automated daily backups on AWS Frankfurt will be active. ";
                    matched = true;
                }
                if (!matched) {
                    analysis += "• Custom requirements are being analyzed. The software structure will be optimized according to this description. ";
                }
                analysis += "Drafting your project architecture schematics based on these details...</em>";
            }
        } else {
            if (name) {
                analysis += `Merhaba <strong>${name}</strong>, ARFCODE sistemine form girişiniz algılandı. `;
            }
            
            if (company) {
                analysis += `<strong>${company}</strong> şirketi/kurumu adına yaptığınız bu talep doğrudan Arda Berkay Demirci'nin öncelikli SLA havuzuna yönlendirilecektir. `;
            }

            if (type) {
                analysis += "<br><br><strong>MİMARİ TAVSİYEMİZ:</strong><br>";
                if (type === 'whatsapp') {
                    analysis += "⚡ Bu proje için <strong>FastAPI (Python)</strong>, <strong>LangChain</strong> ve <strong>RAG (Retrieval-Augmented Generation)</strong> mimarisi ile otonom WhatsApp sipariş veya randevu asistanı geliştirmesi önerilecektir. Altyapı AWS ECS Fargate üzerinde ölçeklenebilir.";
                } else if (type === 'web') {
                    analysis += "📱 Mobil & Web geliştirmesi için tek kod tabanından yerel performans sunan <strong>React Native</strong> ve arama motoru optimizasyonu (SEO) en yüksek seviyede olan <strong>Next.js (SSR)</strong> kullanılacaktır.";
                } else if (type === 'erp') {
                    analysis += "🎓 Okul/Kurs otomasyonu için DershaneERP sistemimizin modüler ders etüt planlama algoritmaları, otomatik veli SMS gateway entegrasyonu ve PostgreSQL/Redis kümesi devreye alınacaktır.";
                } else if (type === 'stock') {
                    analysis += "📦 Depo ve envanter takibi için barkod/QR kod okuyucu modülleri, çoklu depo transfer API'leri ve AI tabanlı envanter tahmin modülü sunulacaktır.";
                } else if (type === 'iot') {
                    analysis += "🌱 Tarımsal otomasyon için toprak nemi telemetrisi, hava durumuna göre sulama kararı veren öngörüsel algoritmalar ve Edge-IoT çevrimdışı güvenlik mantığı uygulanacaktır.";
                } else if (type === 'consulting') {
                    analysis += "🧠 Yazılım ve mimari danışmanlık kapsamında ekibinizin SOLID, Clean Architecture standartları, CI/CD otomasyon hatları ve bulut sunucu maliyet düşürme yöntemleri için koçluk planlanacaktır.";
                } else if (type === 'social_consult') {
                    analysis += "📊 Sosyal medya reklam stratejiniz için Meta ve Google reklam hesap denetimi, dönüşüm pikselleri kurulumu ve etkileşim odaklı kurgu/tasarım hunisi kurgulanacaktır.";
                } else if (type === 'qrmenu') {
                    analysis += "🍔 QR Menü sistemimiz için anlık fiyat paneli, AI destekli çapraz satış (upsell) önerme algoritmaları ve tek tıkla garson çağırma servisleri entegre edilecektir.";
                } else {
                    analysis += "🛠️ Projeniz özel gereksinimlerinize göre özelleştirilmiş mikroservis mimarisi veya hazır bulut modüllerimiz ile tasarlanacaktır.";
                }
            }

            if (msg.length > 5) {
                analysis += "<br><br><strong>ANALİZ EDİLEN BAĞLAM:</strong><br><em>";
                let matched = false;
                const lowerMsg = msg.toLowerCase();
                if (lowerMsg.includes("hızlı") || lowerMsg.includes("hız") || lowerMsg.includes("fast")) {
                    analysis += "• Performans ve düşük gecikme talebi tespit edildi. Sunucu yanıt süresi için Redis önbellekleme ve Cloudflare CDN kullanılacaktır. ";
                    matched = true;
                }
                if (lowerMsg.includes("entegr") || lowerMsg.includes("api")) {
                    analysis += "• Sistem entegrasyonu veya harici API ihtiyacı algılandı. Logo, Paraşüt, iyzico veya Stripe entegrasyonu sağlanabilir. ";
                    matched = true;
                }
                if (lowerMsg.includes("bütçe") || lowerMsg.includes("fiyat") || lowerMsg.includes("maliyet") || lowerMsg.includes("ucuz")) {
                    analysis += "• Fiyat/maliyet optimizasyonu talebi algılandı. Sunucu maliyetlerini düşürmek için Edge-AI ve Serverless (AWS Lambda) yönlendirmesi değerlendirilecektir. ";
                    matched = true;
                }
                if (lowerMsg.includes("güvenli") || lowerMsg.includes("kvkk") || lowerMsg.includes("veri") || lowerMsg.includes("data")) {
                    analysis += "• KVKK ve yüksek güvenlik hassasiyeti algılandı. AWS Frankfurt sunucularında veri şifreleme ve otonom günlük yedekleme devrede olacaktır. ";
                    matched = true;
                }
                if (!matched) {
                    analysis += "• Özel detaylar analiz ediliyor. Sistem mimarisi bu açıklama doğrultusunda optimize edilecektir. ";
                }
                analysis += "Girdiğiniz detaylara göre projenizin taslak mimari şeması hazırlanmaya başlandı.</em>";
            }
        }

        if (aiAnalyserText) aiAnalyserText.innerHTML = analysis || (isEnglish ? "Our AI analyser will draft real-time recommendations here." : "Formu doldurdukça yapay zeka analizimiz burada anlık güncellenecektir.");
        
        const flowchartDiv = document.getElementById('analyser-flowchart');
        if (flowchartDiv) {
            if (type) {
                flowchartDiv.style.display = 'block';
                let flowchartHTML = '<div class="flowchart-container">';
                
                let nodes = [];
                if (isEnglish) {
                    if (type === 'whatsapp') {
                        nodes = [
                            { text: 'WhatsApp client', icon: 'message-circle' },
                            { text: 'Meta API gateway', icon: 'server' },
                            { text: 'FastAPI AI agent', icon: 'cpu' },
                            { text: 'RAG vector db', icon: 'database' }
                        ];
                    } else if (type === 'erp') {
                        nodes = [
                            { text: 'Web portal client', icon: 'users' },
                            { text: 'AWS load balancer', icon: 'git-commit' },
                            { text: 'Node/Go backend API', icon: 'cpu' },
                            { text: 'PostgreSQL + Redis', icon: 'database' }
                        ];
                    } else if (type === 'stock') {
                        nodes = [
                            { text: 'QR/Barcode scanner', icon: 'camera' },
                            { text: 'Inventory sync API', icon: 'activity' },
                            { text: 'Demand forecaster', icon: 'bar-chart-2' },
                            { text: 'AWS RDS DB instance', icon: 'database' }
                        ];
                    } else if (type === 'web') {
                        nodes = [
                            { text: 'Mobile (React Native)', icon: 'smartphone' },
                            { text: 'Web (Next.js SSR)', icon: 'globe' },
                            { text: 'REST API service', icon: 'server' },
                            { text: 'Cloudflare Edge CDN', icon: 'cloud' }
                        ];
                    } else if (type === 'iot') {
                        nodes = [
                            { text: 'Soil humidity sensor', icon: 'droplet' },
                            { text: 'Edge ESP32 controller', icon: 'cpu' },
                            { text: 'Cloud API telemetry', icon: 'cloud-rain' },
                            { text: 'Solenoid water valve', icon: 'activity' }
                        ];
                    } else if (type === 'consulting') {
                        nodes = [
                            { text: 'Git repository', icon: 'git-branch' },
                            { text: 'CI/CD pipeline build', icon: 'settings' },
                            { text: 'SonarQube static audit', icon: 'shield' },
                            { text: 'AWS/GCP Cloud deploy', icon: 'cloud' }
                        ];
                    } else if (type === 'social_consult') {
                        nodes = [
                            { text: 'Meta & Google Ads', icon: 'trending-up' },
                            { text: 'Conversion funnel API', icon: 'filter' },
                            { text: 'Reels video metrics', icon: 'video' },
                            { text: 'Uptime ROI monitor', icon: 'activity' }
                        ];
                    } else if (type === 'qrmenu') {
                        nodes = [
                            { text: 'Table QR code scan', icon: 'grid' },
                            { text: 'Client mobile view', icon: 'smartphone' },
                            { text: 'AI Upsell engine', icon: 'shopping-bag' },
                            { text: 'Waiter call dispatch', icon: 'bell' }
                        ];
                    } else {
                        nodes = [
                            { text: 'Project requirements', icon: 'file-text' },
                            { text: 'Architectural blueprint', icon: 'layout' },
                            { text: 'Custom microservice', icon: 'cpu' },
                            { text: 'AWS Cloud cluster', icon: 'cloud' }
                        ];
                    }
                } else {
                    if (type === 'whatsapp') {
                        nodes = [
                            { text: 'WhatsApp İletişim', icon: 'message-circle' },
                            { text: 'Meta API ağ geçidi', icon: 'server' },
                            { text: 'FastAPI AI ajanı', icon: 'cpu' },
                            { text: 'RAG vektör bellek', icon: 'database' }
                        ];
                    } else if (type === 'erp') {
                        nodes = [
                            { text: 'Öğretmen/Veli portalı', icon: 'users' },
                            { text: 'AWS yük dengeleyici', icon: 'git-commit' },
                            { text: 'Node/Go API motoru', icon: 'cpu' },
                            { text: 'PostgreSQL + Redis', icon: 'database' }
                        ];
                    } else if (type === 'stock') {
                        nodes = [
                            { text: 'QR/Barkod kamera oku', icon: 'camera' },
                            { text: 'Envanter eşitleme API', icon: 'activity' },
                            { text: 'AI talep tahmincisi', icon: 'bar-chart-2' },
                            { text: 'AWS RDS DB sunucusu', icon: 'database' }
                        ];
                    } else if (type === 'web') {
                        nodes = [
                            { text: 'Mobil (React Native)', icon: 'smartphone' },
                            { text: 'Web (Next.js SSR)', icon: 'globe' },
                            { text: 'REST API sunucusu', icon: 'server' },
                            { text: 'Cloudflare CDN ağı', icon: 'cloud' }
                        ];
                    } else if (type === 'iot') {
                        nodes = [
                            { text: 'Toprak nem sensörü', icon: 'droplet' },
                            { text: 'Edge ESP32 işlemci', icon: 'cpu' },
                            { text: 'Bulut API telemetrisi', icon: 'cloud-rain' },
                            { text: 'Otomatik sulama vanası', icon: 'activity' }
                        ];
                    } else if (type === 'consulting') {
                        nodes = [
                            { text: 'Git kaynak kodu', icon: 'git-branch' },
                            { text: 'CI/CD otonom derleme', icon: 'settings' },
                            { text: 'SonarQube kod analizi', icon: 'shield' },
                            { text: 'AWS/GCP bulut canlı', icon: 'cloud' }
                        ];
                    } else if (type === 'social_consult') {
                        nodes = [
                            { text: 'Meta & Google reklam', icon: 'trending-up' },
                            { text: 'Dönüşüm hunisi (Pixel)', icon: 'filter' },
                            { text: 'Video & Reels içerik', icon: 'video' },
                            { text: 'Yatırım getirisi (ROI)', icon: 'activity' }
                        ];
                    } else if (type === 'qrmenu') {
                        nodes = [
                            { text: 'Masa QR kodu tara', icon: 'grid' },
                            { text: 'Ziyaretçi mobil menü', icon: 'smartphone' },
                            { text: 'AI satış (Upsell)', icon: 'shopping-bag' },
                            { text: 'Garson & Hesap çağırma', icon: 'bell' }
                        ];
                    } else {
                        nodes = [
                            { text: 'Proje gereksinimleri', icon: 'file-text' },
                            { text: 'Teknik mimari şema', icon: 'layout' },
                            { text: 'Özel mikroservisler', icon: 'cpu' },
                            { text: 'AWS bulut kümeleri', icon: 'cloud' }
                        ];
                    }
                }

                nodes.forEach((node, idx) => {
                    flowchartHTML += `
                        <div class="flow-node">
                            <i data-feather="${node.icon}" style="width: 14px; height: 14px;"></i>
                            <span>${node.text}</span>
                        </div>
                    `;
                    if (idx < nodes.length - 1) {
                        flowchartHTML += '<div class="flow-arrow">➔</div>';
                    }
                });
                
                flowchartHTML += '</div>';
                flowchartDiv.innerHTML = flowchartHTML;
            } else {
                flowchartDiv.style.display = 'none';
                flowchartDiv.innerHTML = '';
            }
        }
        
        // Dynamically call feather replacement for icons loaded dynamically
        if (typeof feather !== 'undefined') feather.replace();
    };

    [formNameInput, formCompanyInput, formTypeInput, formMsgInput].forEach(input => {
        if (input) {
            input.addEventListener('input', updateFormAIAnalysis);
            input.addEventListener('change', updateFormAIAnalysis);
        }
    });

    // ==========================================================================
    // TYPEWRITER EFFECT IN HERO
    // ==========================================================================
    const typewriterElement = document.getElementById('hero-typewriter');
    if (typewriterElement) {
        const words = [
            'özel yazılımlar',
            'barkodlu stok takip sistemleri',
            'okul & dershane yönetim programları',
            'otomatik WhatsApp sipariş botları',
            'ultra hızlı web tasarımları',
            'iOS & Android mobil uygulamaları'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 60;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1800; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // ==========================================================================
    // HERO INTERACTIVE PARTICLE CANVAS
    // ==========================================================================
    const heroCanvas = document.getElementById('hero-particle-canvas');
    if (heroCanvas) {
        const heroCtx = heroCanvas.getContext('2d');
        let width = heroCanvas.width = heroCanvas.offsetWidth;
        let height = heroCanvas.height = heroCanvas.offsetHeight;

        const particles = [];
        const maxParticles = 50;
        const connectionDistance = 110;
        const mouse = { x: null, y: null, radius: 130 };

        // Handle resize
        window.addEventListener('resize', () => {
            if (heroCanvas.offsetWidth && heroCanvas.offsetHeight) {
                width = heroCanvas.width = heroCanvas.offsetWidth;
                height = heroCanvas.height = heroCanvas.offsetHeight;
            }
        });

        // Track mouse
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroCanvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            heroSection.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
            draw() {
                heroCtx.fillStyle = 'rgba(5, 21, 117, 0.4)';
                heroCtx.beginPath();
                heroCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                heroCtx.fill();
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            heroCtx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * 0.12;
                        heroCtx.strokeStyle = `rgba(5, 21, 117, ${alpha})`;
                        heroCtx.lineWidth = 0.8;
                        heroCtx.beginPath();
                        heroCtx.moveTo(particles[i].x, particles[i].y);
                        heroCtx.lineTo(particles[j].x, particles[j].y);
                        heroCtx.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.2;
                        heroCtx.strokeStyle = `rgba(5, 21, 117, ${alpha})`;
                        heroCtx.lineWidth = 1;
                        heroCtx.beginPath();
                        heroCtx.moveTo(particles[i].x, particles[i].y);
                        heroCtx.lineTo(mouse.x, mouse.y);
                        heroCtx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================================================
    // 20. SCROLL PROGRESS INDICATOR
    // ==========================================================================
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const indicator = document.getElementById('scroll-indicator');
        if (indicator) {
            indicator.style.width = scrolled + '%';
        }
    });

    // ==========================================================================
    // 21. PRICING TOGGLE SWITCH LOGIC (Öneri 3)
    // ==========================================================================
    const pricingSwitch = document.getElementById('pricing-toggle-switch');
    const labelMonthly = document.getElementById('pricing-label-monthly');
    const labelYearly = document.getElementById('pricing-label-yearly');
    const basicPrice = document.getElementById('basic-price-val');
    const growthPrice = document.getElementById('growth-price-val');

    if (pricingSwitch) {
        pricingSwitch.addEventListener('click', () => {
            pricingSwitch.classList.toggle('yearly');
            const isYearly = pricingSwitch.classList.contains('yearly');
            const isEnglish = document.documentElement.lang === 'en';
            
            if (isYearly) {
                labelYearly?.classList.add('active');
                labelMonthly?.classList.remove('active');
                if (basicPrice) basicPrice.textContent = isEnglish ? '39' : '1.200';
                if (growthPrice) growthPrice.textContent = isEnglish ? '79' : '2.400';
            } else {
                labelMonthly?.classList.add('active');
                labelYearly?.classList.remove('active');
                if (basicPrice) basicPrice.textContent = isEnglish ? '49' : '1.500';
                if (growthPrice) growthPrice.textContent = isEnglish ? '99' : '3.000';
            }
        });
    }
});

// Smooth Scroll & Pre-fill Form for Bento Card Interactions
window.selectServiceAndScroll = function(serviceValue, messageText) {
    const serviceSelect = document.getElementById('service');
    const messageInput = document.getElementById('message');
    if (serviceSelect) {
        serviceSelect.value = serviceValue;
        serviceSelect.dispatchEvent(new Event('change'));
    }
    if (messageInput && messageText) {
        messageInput.value = messageText;
        messageInput.dispatchEvent(new Event('input'));
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
};

