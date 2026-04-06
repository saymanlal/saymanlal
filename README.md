<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>SAYMAN LAL • DIGITAL ALCHEMIST • CINEMATIC README</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #03050b;
            font-family: 'Space Grotesk', monospace;
            color: #e2e8ff;
            overflow-x: hidden;
        }
        .readme-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
            position: relative;
            z-index: 2;
        }
        /* holographic animated background */
        .hologram-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 10%, #0a0a1a, #010004);
            z-index: 0;
            pointer-events: none;
        }
        .hologram-bg::before {
            content: "";
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background: repeating-linear-gradient(45deg, rgba(0,255,255,0.02) 0px, rgba(0,255,255,0.02) 2px, transparent 2px, transparent 8px);
            animation: drift 20s linear infinite;
        }
        @keyframes drift {
            0% { transform: translate(0,0); }
            100% { transform: translate(50px,50px); }
        }
        /* glitch header - fully visible */
        .neon-header {
            text-align: center;
            margin-bottom: 2rem;
            position: relative;
            z-index: 5;
        }
        .glitch-name {
            font-family: 'Orbitron', monospace;
            font-size: clamp(3rem, 12vw, 5.5rem);
            font-weight: 900;
            background: linear-gradient(135deg, #00f5ff, #b624ff, #ff00cc);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 15px rgba(0,245,255,0.6);
            letter-spacing: 0.08em;
            animation: glitch 2.5s infinite;
        }
        @keyframes glitch {
            0%, 100% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.5), -0.05em -0.025em 0 rgba(0,255,255,0.5); }
            25% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.5), 0.05em 0.05em 0 rgba(0,255,255,0.5);}
            50% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.5), -0.025em -0.05em 0 rgba(0,255,255,0.5);}
        }
        .sub-glow {
            font-size: 1.2rem;
            letter-spacing: 3px;
            background: rgba(0,0,0,0.6);
            display: inline-block;
            backdrop-filter: blur(8px);
            padding: 0.3rem 1.5rem;
            border-radius: 40px;
            border-left: 2px solid cyan;
            border-right: 2px solid magenta;
        }
        /* movie stage */
        .movie-stage {
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(12px);
            border-radius: 48px;
            border: 1px solid rgba(0, 255, 255, 0.3);
            padding: 1.5rem;
            margin: 2rem 0;
            box-shadow: 0 25px 45px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,255,0.2);
        }
        .movie-title {
            font-family: 'Orbitron';
            text-align: center;
            font-size: 1.7rem;
            margin-bottom: 1rem;
            color: #6ee7ff;
        }
        #cartoonMovieCanvas {
            width: 100%;
            background: #03030f;
            border-radius: 28px;
            display: block;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(0,255,200,0.2);
            cursor: pointer;
        }
        /* hacktoberfest badges - all levels visible */
        .badge-gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
        }
        .hack-badge {
            background: linear-gradient(145deg, #0f172a, #030712);
            border-radius: 60px;
            padding: 0.7rem 1.5rem;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-weight: bold;
            border: 1px solid #38bdf8;
            box-shadow: 0 0 12px rgba(56,189,248,0.3);
            transition: transform 0.2s;
        }
        .hack-badge i { font-size: 1.8rem; color: #facc15; }
        .level-badge {
            background: #f59e0b20;
            border-radius: 30px;
            padding: 0.2rem 0.8rem;
            font-family: monospace;
        }
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
        }
        .tech-item {
            background: #111827aa;
            backdrop-filter: blur(8px);
            padding: 0.5rem 1.2rem;
            border-radius: 40px;
            border: 1px solid cyan;
            font-weight: 500;
            font-size: 0.9rem;
        }
        .tech-item i { margin-right: 8px; color: #0ff; }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        .stat-card {
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(5px);
            border-radius: 28px;
            padding: 1.2rem;
            border: 1px solid rgba(100,100,255,0.4);
            text-align: center;
        }
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px dashed cyan;
        }
        .footer-links a {
            color: #b9f3ff;
            text-decoration: none;
            font-weight: 500;
            transition: 0.2s;
        }
        .footer-links a i { margin-right: 6px; }
        @media (max-width: 680px) {
            .readme-container { padding: 1rem; }
            .tech-item { font-size: 0.7rem; }
        }
    </style>
</head>
<body>
<div class="hologram-bg"></div>
<div class="readme-container">

    <!-- CYBERPUNK HEADER fully visible -->
    <div class="neon-header">
        <div class="glitch-name">SAYMAN LAL</div>
        <div class="sub-glow"><i class="fas fa-microchip"></i> DIGITAL ALCHEMIST  •  AI ARCHITECT  •  WEB3 BUILDER <i class="fas fa-cube"></i></div>
    </div>

    <!-- HACKTOBERFEST 2025 ALL LEVELS 0-3 VISIBLE -->
    <div class="badge-gallery">
        <div class="hack-badge"><i class="fab fa-github"></i> Hacktoberfest 2025 <span class="level-badge">Level 0</span> <i class="fas fa-check-circle" style="color:#22c55e;"></i></div>
        <div class="hack-badge"><i class="fab fa-github"></i> Hacktoberfest 2025 <span class="level-badge">Level 1</span> <i class="fas fa-star" style="color:#facc15;"></i></div>
        <div class="hack-badge"><i class="fab fa-github"></i> Hacktoberfest 2025 <span class="level-badge">Level 2</span> <i class="fas fa-trophy" style="color:#ffaa44;"></i></div>
        <div class="hack-badge"><i class="fab fa-github"></i> Hacktoberfest 2025 <span class="level-badge">Level 3</span> <i class="fas fa-crown" style="color:#ff66cc;"></i></div>
        <div class="hack-badge"><i class="fas fa-map-pin"></i> Indore, India <i class="fas fa-globe"></i></div>
        <div class="hack-badge"><i class="fas fa-rocket"></i> Building AI OS</div>
    </div>

    <!-- FULLY ANIMATED CARTOON MOVIE (real-time animated story) -->
    <div class="movie-stage">
        <div class="movie-title"><i class="fas fa-film"></i> THE DIGITAL ALCHEMIST • ANIMATED CHRONICLE <i class="fas fa-play"></i></div>
        <canvas id="cartoonMovieCanvas" width="1000" height="400" style="width:100%; height:auto; max-width:1000px; aspect-ratio:1000/400"></canvas>
        <div style="text-align:center; margin-top:12px; font-size:0.8rem; opacity:0.7"><i class="fas fa-mouse-pointer"></i> click canvas for magic spark | real-time commit pulse</div>
    </div>

    <!-- TECH ARSENAL minimal icons -->
    <div class="tech-stack">
        <div class="tech-item"><i class="fab fa-react"></i> React/Next</div>
        <div class="tech-item"><i class="fas fa-brain"></i> PyTorch/TF</div>
        <div class="tech-item"><i class="fas fa-link"></i> Web3/Solidity</div>
        <div class="tech-item"><i class="fab fa-python"></i> Django/FastAPI</div>
        <div class="tech-item"><i class="fab fa-docker"></i> Docker/K8s</div>
        <div class="tech-item"><i class="fas fa-cloud"></i> AWS/Azure</div>
        <div class="tech-item"><i class="fas fa-chart-line"></i> LangChain/LLM</div>
        <div class="tech-item"><i class="fas fa-database"></i> PostgreSQL/Mongo</div>
    </div>

    <!-- STATS & ACHIEVEMENTS -->
    <div class="stats-grid">
        <div class="stat-card">
            <i class="fab fa-github" style="font-size:2rem"></i>
            <h3>Commit Pulse</h3>
            <div id="commitSim" style="font-size:1.8rem; font-weight:bold">+1.2k</div>
            <div><i class="fas fa-code-branch"></i> 2025 contributions</div>
        </div>
        <div class="stat-card">
            <i class="fas fa-chart-simple"></i>
            <h3>GitHub Analytics</h3>
            <img src="https://github-readme-stats.vercel.app/api?username=saymanlal&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&icon_color=00ffff&title_color=00ffff" width="100%" alt="stats">
        </div>
        <div class="stat-card">
            <i class="fas fa-trophy"></i>
            <h3>Hall of Fame</h3>
            <ul style="text-align:left; margin-top:10px">
                <li><i class="fas fa-medal"></i> Genethon 2024 - 1st Runner Up</li>
                <li><i class="fas fa-chalkboard-user"></i> UiPath Speaker @ GGITS'25</li>
                <li><i class="fas fa-book"></i> Published Author (Poetry + Tech)</li>
                <li><i class="fas fa-users"></i> Founder @ AIALCHEMIST</li>
            </ul>
        </div>
    </div>

    <!-- PROJECT SHOWCASE -->
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; margin: 2rem 0">
        <div style="background:#0a0f1e; border-radius: 24px; padding: 1rem; width: 260px; text-align:center; border:1px solid #2dd4bf">
            <i class="fas fa-chart-simple" style="font-size:2rem"></i>
            <h3>ALGOVisualizer</h3>
            <p>10k+ users • DSA visual</p>
            <a href="#" style="color:#6ee7ff">Live Demo →</a>
        </div>
        <div style="background:#0a0f1e; border-radius: 24px; padding: 1rem; width: 260px; text-align:center; border:1px solid #a855f7">
            <i class="fas fa-store"></i>
            <h3>ArtMart</h3>
            <p>E‑commerce + Social</p>
            <a href="#" style="color:#d8b4fe">Explore →</a>
        </div>
        <div style="background:#0a0f1e; border-radius: 24px; padding: 1rem; width: 260px; text-align:center; border:1px solid #00ffff">
            <i class="fas fa-vote-yea"></i>
            <h3>VoteX</h3>
            <p>Blockchain voting</p>
            <a href="#" style="color:#22d3ee">Decentralized →</a>
        </div>
    </div>

    <!-- FOOTER CONNECT -->
    <div class="footer-links">
        <a href="#"><i class="fab fa-github"></i> GitHub</a>
        <a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a>
        <a href="#"><i class="fas fa-envelope"></i> businesssayman@gmail.com</a>
        <a href="#"><i class="fas fa-mug-hot"></i> BuyMeCoffee</a>
        <a href="#"><i class="fas fa-globe"></i> AIALCHEMIST.xyz</a>
    </div>
    <div style="text-align:center; margin-top:2rem; font-size:0.7rem; letter-spacing:1px">
        <i class="fas fa-infinity"></i> From Indore to the Metaverse • Building Tomorrow’s Intelligence
    </div>
</div>

<script>
    (function() {
        // CINEMATIC ANIMATED CARTOON MOVIE - realtime story based on Sayman's journey
        const canvas = document.getElementById('cartoonMovieCanvas');
        const ctx = canvas.getContext('2d');
        let width = 1000, height = 400;
        function resizeCanvas() {
            const container = canvas.parentElement;
            const containerWidth = container.clientWidth;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${containerWidth}px`;
            canvas.style.height = 'auto';
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let scene = 0;
        let frame = 0;
        let heroX = 100, heroY = 200;
        let commitParticles = [];
        let sparkles = [];
        let mouseX = -100, mouseY = -100;
        
        // timeline data based on real projects & hacktoberfest
        const acts = [
            { title: "THE AWAKENING", year: "2020", desc: "First commit • Python • DSA 100+", icon: "code", color: "#00ffff" },
            { title: "THE TRANSFORMATION", year: "2022", desc: "Web3 • React • Genethon 2024", icon: "gem", color: "#ff44ff" },
            { title: "ALCHEMIST EMERGES", year: "2023", desc: "AIALCHEMIST founded • ArtMart • VoteX", icon: "fire", color: "#ffaa44" },
            { title: "MENTOR & SPEAKER", year: "2024", desc: "UiPath @ GGITS • 200+ mentored", icon: "chalkboard", color: "#44ffaa" },
            { title: "BUILDING AI OS", year: "2025", desc: "AI Operating System • Global vision", icon: "microchip", color: "#ff66cc" },
            { title: "HACKTOBERFEST CHAMPION", year: "2025", desc: "Level 0-3 completed • Open source", icon: "crown", color: "#ffcc44" }
        ];
        
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            mouseX = (e.clientX - rect.left) * scaleX;
            mouseY = (e.clientY - rect.top) * scaleY;
        });
        
        canvas.addEventListener('click', () => {
            for(let i=0;i<20;i++) {
                sparkles.push({
                    x: heroX + (Math.random() - 0.5)*50,
                    y: heroY - 20 + (Math.random() - 0.5)*40,
                    vx: (Math.random() - 0.5)*6,
                    vy: (Math.random() - 1.5)*4 - 2,
                    life: 1,
                    size: Math.random()*4+2
                });
            }
        });
        
        function drawStars() {
            for(let i=0;i<200;i++) {
                let sx = (i*1313)%width, sy = (i*757)%height;
                let twinkle = 0.3 + Math.sin(Date.now()*0.002 + i)*0.2;
                ctx.fillStyle = `rgba(255,240,200,${twinkle})`;
                ctx.fillRect(sx, sy, 1.5,1.5);
            }
        }
        
        function drawGround(t) {
            ctx.beginPath();
            ctx.strokeStyle = '#0ff3';
            ctx.lineWidth = 1;
            for(let i=0;i<15;i++) {
                let y = height-50 + Math.sin(t*0.8 + i)*6;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y + Math.sin(t*0.5 + i)*4);
                ctx.stroke();
            }
        }
        
        function drawHero(t) {
            // dynamic bob
            let bobY = Math.sin(t*2)*2;
            let bodyY = heroY + bobY;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#0ff';
            // head
            ctx.fillStyle = '#6ee7ff';
            ctx.beginPath();
            ctx.arc(heroX, bodyY-12, 18, 0, Math.PI*2);
            ctx.fill();
            // eyes
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(heroX-8, bodyY-20, 5, 5);
            ctx.fillRect(heroX+3, bodyY-20, 5, 5);
            ctx.fillStyle = '#0a0a2a';
            ctx.beginPath();
            ctx.arc(heroX-5.5, bodyY-17.5, 2, 0, Math.PI*2);
            ctx.arc(heroX+5.5, bodyY-17.5, 2, 0, Math.PI*2);
            ctx.fill();
            // smile
            ctx.beginPath();
            ctx.arc(heroX, bodyY-10, 6, 0.1, Math.PI - 0.1);
            ctx.strokeStyle = '#ffaa66';
            ctx.lineWidth = 2;
            ctx.stroke();
            // body
            ctx.fillStyle = '#2c2c6e';
            ctx.fillRect(heroX-12, bodyY-6, 24, 32);
            ctx.fillStyle = '#aaaaff';
            ctx.fillRect(heroX-4, bodyY+6, 8, 12);
            // floating code aura
            ctx.font = "bold 16px 'Fira Code'";
            ctx.fillStyle = `rgba(0,255,200,0.8)`;
            ctx.fillText("</>", heroX+22, bodyY-8);
            ctx.fillText("{}", heroX-30, bodyY+2);
            ctx.fillText("→", heroX+30, bodyY+5);
        }
        
        function drawScene() {
            const t = Date.now() * 0.0025;
            scene = Math.floor((t % (acts.length * 5)) / 5);
            const currentAct = acts[scene];
            
            ctx.clearRect(0,0,width,height);
            let grad = ctx.createLinearGradient(0,0,width,height);
            grad.addColorStop(0,'#010015');
            grad.addColorStop(1,'#0a0a2a');
            ctx.fillStyle=grad;
            ctx.fillRect(0,0,width,height);
            drawStars();
            drawGround(t);
            
            // floating commit particles (simulating real github activity)
            for(let i=0;i<commitParticles.length;i++) {
                let p = commitParticles[i];
                ctx.fillStyle = `rgba(0,255,200,${p.life})`;
                ctx.fillRect(p.x, p.y, 5,5);
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
            }
            commitParticles = commitParticles.filter(p=>p.life>0);
            if(frame % 25 === 0) {
                for(let i=0;i<3;i++) {
                    commitParticles.push({
                        x: heroX + 25,
                        y: heroY - 5,
                        vx: (Math.random()-0.5)*2,
                        vy: -Math.random()*4-1,
                        life: 1
                    });
                }
            }
            
            // sparkles on click
            for(let i=0;i<sparkles.length;i++) {
                let s = sparkles[i];
                ctx.fillStyle = `rgba(255, 100, 200, ${s.life})`;
                ctx.fillRect(s.x, s.y, s.size, s.size);
                s.x += s.vx;
                s.y += s.vy;
                s.life -= 0.03;
            }
            sparkles = sparkles.filter(s=>s.life>0);
            
            // mouse interactive glow
            if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height) {
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 12, 0, Math.PI*2);
                ctx.fillStyle = '#ff44ff44';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 6, 0, Math.PI*2);
                ctx.fillStyle = '#ffffffaa';
                ctx.fill();
            }
            
            drawHero(t);
            
            // cinematic text overlay
            ctx.font = "bold 26px 'Orbitron'";
            ctx.fillStyle = currentAct.color;
            ctx.shadowBlur = 0;
            ctx.fillText(`${currentAct.title} (${currentAct.year})`, width/2-170, 55);
            ctx.font = "16px 'Space Grotesk'";
            ctx.fillStyle = "#b9f3ff";
            ctx.fillText(currentAct.desc, width/2-150, 95);
            ctx.font = "12px monospace";
            ctx.fillStyle = "#88aaff";
            ctx.fillText(`⚡ real-time commit burst | hacktoberfest level ${scene+1} of 6`, width/2-180, 135);
            
            // additional animated timeline indicator
            let progress = (t % 5) / 5;
            ctx.fillStyle = "#00ffff88";
            ctx.fillRect(width/2-100, 150, 200*progress, 4);
            
            heroX = 100 + Math.sin(t*0.7)*6;
            heroY = 190 + Math.sin(t*1.3)*2;
            frame++;
            requestAnimationFrame(drawScene);
        }
        
        function updateCommitCounter() {
            const commitDiv = document.getElementById('commitSim');
            if(commitDiv) {
                let base = 1380;
                let increment = Math.floor(Date.now() / 8000) % 87;
                commitDiv.innerText = `+${base + increment}`;
            }
            setTimeout(updateCommitCounter, 3800);
        }
        
        drawScene();
        updateCommitCounter();
        
        // ensure all hacktober badges are emphasized
        const badges = document.querySelectorAll('.hack-badge');
        badges.forEach(b => {
            b.style.opacity = '1';
            b.style.transform = 'scale(1)';
        });
    })();
</script>
</body>
</html>
