// Yoonverse — Site Interactions & Scroll Animation Engine
document.addEventListener('DOMContentLoaded', () => {
  // 1. Global Scroll Progress Gauge (Pinned top bar)
  const globalBar = document.getElementById('globalProgress');
  const updateGlobalProgress = () => {
    if (!globalBar) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    globalBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateGlobalProgress, { passive: true });
  updateGlobalProgress();

  // 2. Sticky Header Border
  const header = document.querySelector('.site-header');
  const onHeaderScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  // 3. Hero Parallax & Smooth Float Physics
  const heroSerp = document.getElementById('heroSerp');
  const float1 = document.getElementById('floatChip1');
  const float2 = document.getElementById('floatChip2');
  let ticking = false;

  const onHeroScroll = () => {
    const sy = window.scrollY;
    if (sy < 800) {
      if (float1) float1.style.transform = `translateY(${sy * 0.08}px)`;
      if (float2) float2.style.transform = `translateY(${-sy * 0.06}px)`;
      if (heroSerp) heroSerp.style.transform = `translateY(${sy * 0.03}px)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onHeroScroll);
      ticking = true;
    }
  }, { passive: true });

  // 4. Interactive Scroll Journey Engine ("The SEO Climb")
  const simCard = document.getElementById('simCard');
  const steps = document.querySelectorAll('.journey-step');
  const railBar = document.getElementById('journeyRailBar');
  const simStatusPill = document.getElementById('simStatusPill');
  const simStatusText = document.getElementById('simStatusText');
  const climbBadge = document.getElementById('climbBadge');
  const yoonRankNum = document.getElementById('yoonRankNum');
  const metricRank = document.getElementById('metricRank');
  const metricIntent = document.getElementById('metricIntent');
  const metricClicks = document.getElementById('metricClicks');
  const serpLadder = document.getElementById('serpLadder');
  const serpYoonItem = document.getElementById('serpYoonItem');
  const serpComp1 = document.getElementById('serpComp1');
  const serpComp2 = document.getElementById('serpComp2');

  let currentStage = '1';

  const setJourneyStage = (stage) => {
    if (currentStage === stage) return;
    currentStage = stage;

    if (simCard) simCard.dataset.stage = stage;

    // Update active class on steps
    steps.forEach(s => {
      s.classList.toggle('is-active', s.dataset.step === stage);
    });

    // Update progress rail bar
    if (railBar) {
      railBar.style.height = stage === '1' ? '33%' : stage === '2' ? '66%' : '100%';
    }

    // Dynamic UI states
    if (stage === '1') {
      if (simStatusPill) {
        simStatusPill.className = 'sim-status-pill';
        simStatusText.textContent = 'Crawling URL…';
      }
      if (climbBadge) climbBadge.textContent = 'Crawling…';
      if (yoonRankNum) yoonRankNum.textContent = '#48';
      if (metricRank) { metricRank.textContent = 'Pos #48'; metricRank.className = 'sim-m-val'; }
      if (metricIntent) metricIntent.textContent = '74%';
      if (metricClicks) metricClicks.textContent = '+0 / mo';

      if (serpLadder && serpYoonItem && serpComp2) {
        serpLadder.appendChild(serpYoonItem); // placed at bottom
      }
    } else if (stage === '2') {
      if (simStatusPill) {
        simStatusPill.className = 'sim-status-pill';
        simStatusText.textContent = 'Indexed ✓ Intent Matched';
      }
      if (climbBadge) climbBadge.textContent = 'Rising ↑';
      if (yoonRankNum) yoonRankNum.textContent = '#6';
      if (metricRank) { metricRank.textContent = 'Pos #6'; metricRank.className = 'sim-m-val highlight'; }
      if (metricIntent) metricIntent.textContent = '96%';
      if (metricClicks) metricClicks.textContent = '+1,840 / mo';

      // Move Yoonverse above Competitor 2
      if (serpLadder && serpYoonItem && serpComp2) {
        serpLadder.insertBefore(serpYoonItem, serpComp2);
      }
    } else if (stage === '3') {
      if (simStatusPill) {
        simStatusPill.className = 'sim-status-pill pill-rank';
        simStatusText.textContent = '🏆 Rank #1 Featured Snippet';
      }
      if (climbBadge) climbBadge.textContent = '★ #1 Snippet';
      if (yoonRankNum) yoonRankNum.textContent = '#1';
      if (metricRank) { metricRank.textContent = '👑 Pos #1'; metricRank.className = 'sim-m-val highlight'; }
      if (metricIntent) metricIntent.textContent = '100%';
      if (metricClicks) metricClicks.textContent = '+14,620 / mo';

      // Move Yoonverse to the very top (above Competitor 1)
      if (serpLadder && serpYoonItem && serpComp1) {
        serpLadder.insertBefore(serpYoonItem, serpComp1);
      }
    }
  };

  // Scroll detection for Journey steps
  if (steps.length > 0) {
    const handleJourneyScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let activeStep = '1';

      steps.forEach(step => {
        const rect = step.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= triggerY * 0.3) {
          activeStep = step.dataset.step;
        }
      });

      setJourneyStage(activeStep);
    };

    window.addEventListener('scroll', handleJourneyScroll, { passive: true });
    handleJourneyScroll();

    // Click on step cards to activate and jump
    steps.forEach(step => {
      step.addEventListener('click', () => {
        setJourneyStage(step.dataset.step);
        step.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // Mobile Menu
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !links.contains(e.target) && !btn.contains(e.target)) {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when tapping any link inside it
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active Nav Link
  const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (href !== '/' && path.startsWith(href))) a.classList.add('active');
  });

  // Reveal On Scroll (Intersection Observer)
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Blog Filters
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const cat = chip.dataset.filter;
    document.querySelectorAll('.posts .post-card').forEach(card => {
      card.classList.toggle('hide', cat !== 'all' && card.dataset.cat !== cat);
    });
  }));

  // Reading Progress for Blog Articles
  const articleBar = document.querySelector('.progress');
  if (articleBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      articleBar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
    }, { passive: true });
  }

  // Mailto Form Handler
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = data.get('subject') || 'Hello from yoonverse.in';
      const body = [...data.entries()].filter(([k]) => k !== 'subject').map(([k, v]) => `${k}: ${v}`).join('\n');
      location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const msg = form.querySelector('.form-msg');
      if (msg) msg.textContent = 'Opening your email app… thank you!';
    });
  });

  // Year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Copy to clipboard buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      const text = targetEl.value || targetEl.innerText || targetEl.textContent;
      navigator.clipboard.writeText(text.trim()).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('copied');
        }, 2200);
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text.trim();
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('copied');
        }, 2200);
      });
    });
  });

  // 5. The SEO Cosmos Interactive Engine
  const cosmosCanvas = document.getElementById('cosmosCanvas');
  const cosmosZone = document.getElementById('seoCosmos');
  const cosmosTooltip = document.getElementById('cosmosTooltip');
  const ttTitle = cosmosTooltip ? cosmosTooltip.querySelector('.tooltip-title') : null;
  const ttDesc = cosmosTooltip ? cosmosTooltip.querySelector('.tooltip-desc') : null;

  if (cosmosCanvas && cosmosZone) {
    const ctx = cosmosCanvas.getContext('2d');
    let width = 0, height = 0;
    let stars = [];
    let comets = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let isVisible = false;

    const resizeCanvas = () => {
      const stage = cosmosZone.querySelector('.cosmos-stage');
      if (!stage) return;
      width = stage.offsetWidth;
      height = stage.offsetHeight || 320;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cosmosCanvas.width = width * dpr;
      cosmosCanvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initStars();
    };

    const colors = ['rgba(192, 83, 42, ', 'rgba(212, 136, 23, ', 'rgba(79, 93, 63, ', 'rgba(29, 27, 24, '];

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor(width / 12), 70);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.6,
          colorBase: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.45 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const addComet = (startX, startY) => {
      const angle = (Math.random() * 0.6 - 0.3) - Math.PI / 4;
      const speed = Math.random() * 4.5 + 3.5;
      comets.push({
        x: startX != null ? startX : Math.random() * width * 0.8,
        y: startY != null ? startY : height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1
      });
    };

    let animId = null;
    const renderCosmos = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Draw Constellation Lines between nearby stars
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.12;
            ctx.strokeStyle = `rgba(192, 83, 42, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Cursor magnetic constellation lines
      if (mouse.active) {
        for (let i = 0; i < stars.length; i++) {
          const dx = stars[i].x - mouse.x;
          const dy = stars[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 105) {
            const alpha = (1 - dist / 105) * 0.28;
            ctx.strokeStyle = `rgba(212, 136, 23, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.speed;
        const currentAlpha = s.alpha + Math.sin(s.phase) * 0.22;
        ctx.fillStyle = `${s.colorBase}${Math.max(0.1, Math.min(currentAlpha, 0.85))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.016;

        if (c.life <= 0) {
          comets.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 10, c.y - c.vy * 10);
        grad.addColorStop(0, `rgba(229, 169, 60, ${c.life})`);
        grad.addColorStop(1, 'rgba(192, 83, 42, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * 10, c.y - c.vy * 10);
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderCosmos);
    };

    // IntersectionObserver to save resources when footer is not in view
    const cosmosObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        resizeCanvas();
        if (!animId) animId = requestAnimationFrame(renderCosmos);
      } else if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0.05 });
    cosmosObserver.observe(cosmosZone);

    window.addEventListener('resize', () => { if (isVisible) resizeCanvas(); }, { passive: true });

    cosmosZone.addEventListener('mousemove', e => {
      const stage = cosmosZone.querySelector('.cosmos-stage');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    cosmosZone.addEventListener('touchmove', e => {
      const stage = cosmosZone.querySelector('.cosmos-stage');
      if (!stage || !e.touches[0]) return;
      const rect = stage.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    cosmosZone.addEventListener('mouseleave', () => {
      mouse.active = false;
    });
    cosmosZone.addEventListener('touchend', () => {
      setTimeout(() => { mouse.active = false; }, 800);
    });

    cosmosZone.addEventListener('click', e => {
      if (e.target.closest('.celestial-body')) return;
      const stage = cosmosZone.querySelector('.cosmos-stage');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addComet(x, y);
      if (cosmosTooltip) cosmosTooltip.classList.remove('show');
    });

    // Dismiss tooltip when tapping outside
    document.addEventListener('click', e => {
      if (cosmosTooltip && !e.target.closest('.celestial-body') && !e.target.closest('.cosmos-tooltip')) {
        cosmosTooltip.classList.remove('show');
      }
    });

    // Planet Tooltip & interaction
    document.querySelectorAll('.celestial-body').forEach(body => {
      const showTooltip = () => {
        if (!cosmosTooltip) return;
        const name = body.dataset.name;
        const desc = body.dataset.desc;
        if (ttTitle) ttTitle.textContent = name;
        if (ttDesc) ttDesc.textContent = desc;
        cosmosTooltip.classList.add('show');
      };
      const hideTooltip = () => {
        if (cosmosTooltip) cosmosTooltip.classList.remove('show');
      };

      body.addEventListener('mouseenter', showTooltip);
      body.addEventListener('mouseleave', hideTooltip);
      body.addEventListener('focus', showTooltip);
      body.addEventListener('blur', hideTooltip);
      body.addEventListener('click', e => {
        e.stopPropagation();
        showTooltip();
        addComet();
      });
    });
  }

  // 6. Theme Toggle (Midnight Reading Mode)
  const themeBtn = document.getElementById('themeBtn');
  const updateThemeIcon = (isDark) => {
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  };
  const isDarkCurrent = document.documentElement.getAttribute('data-theme') === 'dark';
  updateThemeIcon(isDarkCurrent);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        try { localStorage.setItem('yoonverse_theme', 'light'); } catch (e) { }
        updateThemeIcon(false);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('yoonverse_theme', 'dark'); } catch (e) { }
        updateThemeIcon(true);
      }
    });
  }

  // 7. Search Intent Decoder Engine
  const intentInput = document.getElementById('intentInput');
  const analyzeBtn = document.getElementById('analyzeIntentBtn');
  const presetChips = document.querySelectorAll('.preset-chip');
  const intentBadge = document.getElementById('intentBadge');
  const intentSummary = document.getElementById('intentSummary');
  const intentFormat = document.getElementById('intentFormat');
  const intentFormatDesc = document.getElementById('intentFormatDesc');
  const intentPsych = document.getElementById('intentPsychology');
  const intentPsychDesc = document.getElementById('intentPsychologyDesc');
  const intentStratTip = document.getElementById('intentStratTip');
  const intentTriple = document.getElementById('intentTriple');

  const analyzeIntent = (raw) => {
    const q = (raw || '').trim().toLowerCase();
    if (!q) return;

    let res = null;

    if (/\b(buy|price|cost|pricing|cheap|discount|order|purchase|hire|coupon|deal)\b/.test(q)) {
      res = {
        badge: 'Transactional (Do)',
        summary: 'The searcher is ready to take action, purchase, or sign up immediately. Wallets are out.',
        format: 'Conversion-Focused Product / Service Page',
        formatDesc: 'Clean pricing tables, clear CTA buttons, trust badges, transparent return/refund policies.',
        psych: `"I know what I want. Show me the price, proof, and fastest checkout."`,
        psychDesc: 'Eliminate friction. Do not force them to read a 3,000-word history lesson before buying.',
        tip: '💡 Transactional queries demand clear pricing, immediate availability, and fast mobile checkout.',
        triple: `[Searcher Entity] —(intends to acquire / hire)→ [${q}]`
      };
    } else if (/\b(best|top|vs|versus|review|reviews|comparison|alternatives|recommended|analyst|strategist)\b/.test(q)) {
      res = {
        badge: 'Commercial Investigation (Evaluate)',
        summary: 'The searcher is evaluating authority, credentials, pros/cons, and verifiable expertise before deciding.',
        format: 'Entity-Backed Authority & Comparison Hub',
        formatDesc: 'Verifiable E-E-A-T signals, Entity-Attribute-Value (EAV) tables, case telemetry, and transparent methodology.',
        psych: `"Show me verifiable proof of expertise, semantic depth, and real search outcomes."`,
        psychDesc: 'Search engines rank entities with the highest topical coverage, visual semantic proof, and Knowledge Graph salience.',
        tip: '💡 Rank for commercial evaluation queries via entity salience, EAV triples, and above-the-fold visual proof—not keyword stuffing.',
        triple: `[Evaluator] —(benchmarks authority of)→ [${q}]`
      };
    } else if (/\b(near me|in [a-z]+|india|city|doctor|lawyer|dentist|agency|services|shop|store)\b/.test(q)) {
      res = {
        badge: 'Geo-Entity & Local Search Intent',
        summary: 'The searcher is looking for a geographic entity, regional market specialist, or local provider.',
        format: 'Geo-Attributed Entity Page with Schema Graph',
        formatDesc: 'Explicit Country/Region schema (workLocation, areaServed), ccTLD (.in) alignment, and regional telemetry.',
        psych: `"I need a recognized specialist connected to my region and market context."`,
        psychDesc: 'Google resolves geographic queries by linking Person/Organization entities to Place Wikidata IDs (e.g., Q668 India).',
        tip: '💡 Connect Person/Organization schema to geographic Wikidata entities and regional search case studies.',
        triple: `[Regional Searcher] —(seeks verified entity in)→ [${q}]`
      };
    } else if (/\b(login|sign in|portal|dashboard|official|website|account|app)\b/.test(q)) {
      res = {
        badge: 'Navigational (Go)',
        summary: 'The searcher wants to reach a specific branded website or page directly.',
        format: 'Direct Branded Portal / Login Page',
        formatDesc: 'Prominent login box, password reset links, secure SSL verification.',
        psych: `"I already know where I am going. Just get me there as fast as possible."`,
        psychDesc: 'Navigational users rarely click secondary guides.',
        tip: '💡 Make sure brand title tags and sitelinks are properly structured in Google Search Console.',
        triple: `[User] —(navigates directly to)→ [Brand Entity: ${q}]`
      };
    } else {
      res = {
        badge: 'Informational (Know)',
        summary: 'The searcher is seeking knowledge, tutorials, answers, or deep explanations.',
        format: 'Comprehensive Step-by-Step Guide',
        formatDesc: 'Structured with clear H2 headings, real examples, illustrations, and zero paywall barriers.',
        psych: `"I have a question or problem. I need an answer I can trust without being sold to."`,
        psychDesc: 'High trust sensitivity. Answer the core question in the first 2 paragraphs before diving deeper.',
        tip: '💡 Answer the question directly using Subject-Predicate-Object triples in the opening paragraph to capture Featured Snippets.',
        triple: `[Learner] —(seeks extractive answer for)→ [${q}]`
      };
    }

    if (intentBadge) intentBadge.textContent = res.badge;
    if (intentSummary) intentSummary.textContent = res.summary;
    if (intentFormat) intentFormat.textContent = res.format;
    if (intentFormatDesc) intentFormatDesc.textContent = res.formatDesc;
    if (intentPsych) intentPsych.textContent = res.psych;
    if (intentPsychDesc) intentPsychDesc.textContent = res.psychDesc;
    if (intentStratTip) intentStratTip.textContent = res.tip;
    if (intentTriple) intentTriple.textContent = res.triple;
  };

  if (intentInput && analyzeBtn) {
    analyzeBtn.addEventListener('click', () => analyzeIntent(intentInput.value));
    intentInput.addEventListener('keydown', e => { if (e.key === 'Enter') analyzeIntent(intentInput.value); });

    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const q = chip.dataset.q;
        intentInput.value = q;
        analyzeIntent(q);
      });
    });
  }

  // 8. Article TOC ScrollSpy
  const tocLinks = document.querySelectorAll('.toc a');
  const headings = Array.from(document.querySelectorAll('article h2[id]'));

  if (tocLinks.length > 0 && headings.length > 0) {
    const onTocScroll = () => {
      const scrollPos = window.scrollY + 130;
      let currentId = '';

      headings.forEach(h => {
        if (h.offsetTop <= scrollPos) {
          currentId = h.id;
        }
      });

      tocLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active-toc', href === currentId);
      });
    };
    window.addEventListener('scroll', onTocScroll, { passive: true });
    onTocScroll();
  }

  // 9. The SEO Cosmos Interactive Stage (Planets, Stars, Tooltips & Comets)
  function initCosmosStage() {
    const cosmosZone = document.getElementById('seoCosmos');
    if (!cosmosZone) return;

    // A. Celestial Bodies & Interactive Tooltip
    const planets = cosmosZone.querySelectorAll('.celestial-body');
    const tooltip = document.getElementById('cosmosTooltip');
    const tooltipTitle = tooltip ? tooltip.querySelector('.tooltip-title') : null;
    const tooltipDesc = tooltip ? tooltip.querySelector('.tooltip-desc') : null;

    planets.forEach(p => {
      const show = () => {
        if (!tooltip) return;
        if (tooltipTitle) tooltipTitle.textContent = p.dataset.name || '';
        if (tooltipDesc) tooltipDesc.textContent = p.dataset.desc || '';
        tooltip.classList.add('show');
      };
      const hide = () => {
        if (!tooltip) return;
        tooltip.classList.remove('show');
      };
      p.addEventListener('mouseenter', show);
      p.addEventListener('mouseleave', hide);
      p.addEventListener('focus', show);
      p.addEventListener('blur', hide);
      p.addEventListener('click', (e) => {
        e.stopPropagation();
        show();
      });
    });

    document.addEventListener('click', (e) => {
      if (tooltip && !e.target.closest('.celestial-body')) {
        tooltip.classList.remove('show');
      }
    });

    // B. Interactive Starfield, Constellation Mesh & Crawl Comets
    const canvas = document.getElementById('cosmosCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;
    let stars = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let comets = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      stars = [];
      const count = Math.floor(Math.max(26, (width * height) / 7500));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.6 + 0.25,
          speed: Math.random() * 0.02 + 0.006,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.6 ? '#c0532a' : Math.random() > 0.4 ? '#e5a93c' : Math.random() > 0.2 ? '#4f5d3f' : '#1d1b18'
        });
      }
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    cosmosZone.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    cosmosZone.addEventListener('pointerleave', () => {
      mouse.active = false;
    });

    cosmosZone.addEventListener('click', (e) => {
      if (e.target.closest('.celestial-body') || e.target.closest('#cosmicWord')) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      comets.push({
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 8 + 4,
        vy: (Math.random() - 0.5) * 4 - 2,
        life: 1.0,
        trail: []
      });
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.speed;
        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? (s.color === '#1d1b18' ? '#f5eee3' : s.color) : s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Constellation lines to mouse
        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark ? 'rgba(226, 109, 66, 0.35)' : 'rgba(192, 83, 42, 0.22)';
            ctx.lineWidth = 1;
            ctx.globalAlpha = (1 - dist / 90) * 0.6;
            ctx.stroke();
          }
        }
      }

      // Crawl Comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.trail.push({ x: c.x, y: c.y, alpha: c.life });
        if (c.trail.length > 15) c.trail.shift();
        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.025;

        for (let j = 0; j < c.trail.length - 1; j++) {
          const p1 = c.trail[j];
          const p2 = c.trail[j + 1];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#c0532a';
          ctx.lineWidth = (j / c.trail.length) * 2.5 + 0.5;
          ctx.globalAlpha = p1.alpha * 0.8;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffbd2e';
        ctx.globalAlpha = c.life;
        ctx.fill();

        if (c.life <= 0 || c.x < -50 || c.x > width + 50 || c.y < -50 || c.y > height + 50) {
          comets.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(render);
    };
    render();
  }

  // 10. Grand Wordmark Liquid Water Flow Engine (WebGL Wave Refraction & Specular Physics)
  function initLiquidWordmark() {
    const cosmicWord = document.getElementById('cosmicWord');
    const canvas = document.getElementById('liquidWordCanvas');
    if (!cosmicWord || !canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, depth: false, antialias: true, premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl', { alpha: true, depth: false });

    if (!gl) {
      console.warn('WebGL not supported for liquid wordmark');
      return;
    }

    const extFloat = gl.getExtension('OES_texture_float');
    const extHalf = gl.getExtension('OES_texture_half_float');

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    function createProgram(vsSrc, fsSrc) {
      const vs = createShader(gl.VERTEX_SHADER, vsSrc);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.warn(gl.getProgramInfoLog(p));
        return null;
      }
      return p;
    }

    const baseVS = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_pos + 1.0) * 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const waveFS = `
      precision highp float;
      uniform sampler2D u_curr;
      uniform sampler2D u_prev;
      uniform vec2 u_texel;
      uniform float u_damping;
      uniform vec2 u_drop;
      uniform float u_dropRadius;
      uniform float u_dropStrength;
      varying vec2 v_uv;

      void main() {
        float n = texture2D(u_curr, v_uv + vec2(0.0, u_texel.y)).r;
        float s = texture2D(u_curr, v_uv - vec2(0.0, u_texel.y)).r;
        float e = texture2D(u_curr, v_uv + vec2(u_texel.x, 0.0)).r;
        float w = texture2D(u_curr, v_uv - vec2(u_texel.x, 0.0)).r;
        float prev = texture2D(u_prev, v_uv).r;

        float next = (n + s + e + w) * 0.5 - prev;
        next *= u_damping;

        if (u_dropStrength > 0.0001) {
          float d = distance(v_uv, u_drop);
          if (d < u_dropRadius) {
            float f = 1.0 - smoothstep(0.0, u_dropRadius, d);
            next += f * u_dropStrength;
          }
        }

        gl_FragColor = vec4(next, 0.0, 0.0, 1.0);
      }
    `;

    const renderFS = `
      precision highp float;
      uniform sampler2D u_height;
      uniform sampler2D u_texture;
      uniform vec2 u_texel;
      uniform float u_refraction;
      uniform float u_specular;
      varying vec2 v_uv;

      void main() {
        float hL = texture2D(u_height, v_uv - vec2(u_texel.x, 0.0)).r;
        float hR = texture2D(u_height, v_uv + vec2(u_texel.x, 0.0)).r;
        float hD = texture2D(u_height, v_uv - vec2(0.0, u_texel.y)).r;
        float hU = texture2D(u_height, v_uv + vec2(0.0, u_texel.y)).r;

        vec2 normal = vec2(hR - hL, hU - hD);

        vec2 dispR = v_uv + normal * (u_refraction * 1.15);
        vec2 dispG = v_uv + normal * u_refraction;
        vec2 dispB = v_uv + normal * (u_refraction * 0.85);

        vec2 uvR = clamp(vec2(dispR.x, 1.0 - dispR.y), 0.001, 0.999);
        vec2 uvG = clamp(vec2(dispG.x, 1.0 - dispG.y), 0.001, 0.999);
        vec2 uvB = clamp(vec2(dispB.x, 1.0 - dispB.y), 0.001, 0.999);

        vec4 texR = texture2D(u_texture, uvR);
        vec4 texG = texture2D(u_texture, uvG);
        vec4 texB = texture2D(u_texture, uvB);

        vec3 color = vec3(texR.r, texG.g, texB.b);
        float alpha = max(texR.a, max(texG.a, texB.a));

        vec3 lightDir = normalize(vec3(-0.35, 0.65, 0.68));
        vec3 surfNorm = normalize(vec3(normal * 14.0, 1.0));
        vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));
        float spec = pow(max(dot(surfNorm, halfDir), 0.0), 28.0) * u_specular;

        color += vec3(0.98, 0.96, 0.92) * spec;
        alpha = max(alpha, spec * 0.88);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const waveProg = createProgram(baseVS, waveFS);
    const renderProg = createProgram(baseVS, renderFS);
    if (!waveProg || !renderProg) return;

    const quadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ]), gl.STATIC_DRAW);

    const SIM_W = 256;
    const SIM_H = 128;

    function createFBO(type) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIM_W, SIM_H, 0, gl.RGBA, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      if (status !== gl.FRAMEBUFFER_COMPLETE) return null;
      return { fbo, tex };
    }

    let texType = extFloat ? gl.FLOAT : gl.UNSIGNED_BYTE;
    let testFBO = createFBO(texType);
    if (!testFBO && extHalf) {
      texType = extHalf.HALF_FLOAT_OES;
      testFBO = createFBO(texType);
    }
    if (!testFBO) {
      texType = gl.UNSIGNED_BYTE;
      testFBO = createFBO(texType);
    }
    if (!testFBO) return;

    let fboA = testFBO;
    let fboB = createFBO(texType);
    let fboC = createFBO(texType);

    [fboA, fboB, fboC].forEach(f => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, f.fbo);
      gl.viewport(0, 0, SIM_W, SIM_H);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Offscreen 2D canvas for wordmark texture
    const textCanvas = document.createElement('canvas');
    const textCtx = textCanvas.getContext('2d');
    const wordTex = gl.createTexture();

    function updateWordTexture(cssWidth, cssHeight) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(200, Math.floor(cssWidth * dpr));
      const h = Math.max(100, Math.floor(cssHeight * dpr));
      textCanvas.width = w;
      textCanvas.height = h;

      textCtx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      const fontSize = Math.min(w * 0.17, h * 0.78);
      textCtx.font = `italic 400 ${fontSize}px "Fraunces", Georgia, serif`;
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';

      const cx = w * 0.5;
      const cy = h * 0.52;

      // Translucent fill for liquid refraction
      textCtx.fillStyle = isDark ? 'rgba(246, 241, 232, 0.08)' : 'rgba(29, 27, 24, 0.05)';
      textCtx.fillText('yoonverse', cx, cy);

      // Signature crisp serif stroke
      textCtx.strokeStyle = isDark ? 'rgba(246, 241, 232, 0.32)' : 'rgba(29, 27, 24, 0.26)';
      textCtx.lineWidth = Math.max(1.8, fontSize * 0.015);
      textCtx.strokeText('yoonverse', cx, cy);

      gl.bindTexture(gl.TEXTURE_2D, wordTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    }

    cosmicWord.classList.add('canvas-active');

    let dropX = 0, dropY = 0, dropRadius = 0, dropStrength = 0;
    let hasPendingDrop = false;

    function addDrop(normX, normY, radius, strength) {
      dropX = Math.max(0.01, Math.min(0.99, normX));
      dropY = Math.max(0.01, Math.min(0.99, 1.0 - normY));
      dropRadius = radius;
      dropStrength = strength;
      hasPendingDrop = true;
    }

    let lastX = -1, lastY = -1;
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;

      let strength = 0.32;
      if (lastX >= 0) {
        const dx = x - lastX;
        const dy = y - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        strength = Math.min(0.65, 0.28 + speed * 4.0);
      }
      lastX = x;
      lastY = y;
      addDrop(x, y, 0.045, strength);
    };

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      addDrop(x, y, 0.08, 0.75);
    });

    const stage = document.getElementById('cosmosStage') || document.getElementById('seoCosmos');
    if (stage) {
      stage.addEventListener('pointermove', (e) => {
        const rect = canvas.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
          onPointerMove(e);
        }
      }, { passive: true });
    }

    let viewWidth = 0, viewHeight = 0;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      viewWidth = rect.width;
      viewHeight = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewWidth * dpr);
      canvas.height = Math.floor(viewHeight * dpr);
      updateWordTexture(viewWidth, viewHeight);
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const themeObserver = new MutationObserver(() => {
      updateWordTexture(viewWidth, viewHeight);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function bindQuad(prog) {
      const aPos = gl.getAttribLocation(prog, 'a_pos');
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    }

    function render() {
      // Step wave simulation
      gl.useProgram(waveProg);
      bindQuad(waveProg);

      gl.bindFramebuffer(gl.FRAMEBUFFER, fboC.fbo);
      gl.viewport(0, 0, SIM_W, SIM_H);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboB.tex);
      gl.uniform1i(gl.getUniformLocation(waveProg, 'u_curr'), 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, fboA.tex);
      gl.uniform1i(gl.getUniformLocation(waveProg, 'u_prev'), 1);

      gl.uniform2f(gl.getUniformLocation(waveProg, 'u_texel'), 1.0 / SIM_W, 1.0 / SIM_H);
      gl.uniform1f(gl.getUniformLocation(waveProg, 'u_damping'), 0.963);

      if (hasPendingDrop) {
        gl.uniform2f(gl.getUniformLocation(waveProg, 'u_drop'), dropX, dropY);
        gl.uniform1f(gl.getUniformLocation(waveProg, 'u_dropRadius'), dropRadius);
        gl.uniform1f(gl.getUniformLocation(waveProg, 'u_dropStrength'), dropStrength);
        hasPendingDrop = false;
      } else {
        gl.uniform1f(gl.getUniformLocation(waveProg, 'u_dropStrength'), 0.0);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      const temp = fboA;
      fboA = fboB;
      fboB = fboC;
      fboC = temp;

      // Render water refraction to screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(renderProg);
      bindQuad(renderProg);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboB.tex);
      gl.uniform1i(gl.getUniformLocation(renderProg, 'u_height'), 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, wordTex);
      gl.uniform1i(gl.getUniformLocation(renderProg, 'u_texture'), 1);

      gl.uniform2f(gl.getUniformLocation(renderProg, 'u_texel'), 1.0 / SIM_W, 1.0 / SIM_H);
      gl.uniform1f(gl.getUniformLocation(renderProg, 'u_refraction'), 0.038);
      gl.uniform1f(gl.getUniformLocation(renderProg, 'u_specular'), 0.42);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    }
    render();
  }

  // 8. Interactive Semantic Triple & JSON-LD Schema Builder
  function initTripleSchemaBuilder() {
    const subInput = document.getElementById('sbSubject');
    const typeInput = document.getElementById('sbType');
    const predInput = document.getElementById('sbPredicate');
    const objInput = document.getElementById('sbObject');
    const objWikiInput = document.getElementById('sbObjectWiki');
    const specInput = document.getElementById('sbSpecialty');
    const specWikiInput = document.getElementById('sbSpecialtyWiki');
    const idInput = document.getElementById('sbEntityId');
    const sameAsInput = document.getElementById('sbSameAs');

    const outSub = document.getElementById('sbOutSub');
    const outPred = document.getElementById('sbOutPred');
    const outObj = document.getElementById('sbOutObj');
    const outProse = document.getElementById('sbOutProse');
    const codeOutput = document.getElementById('sbCodeOutput');
    const codeFilename = document.getElementById('sbCodeFilename');
    const copyBtn = document.getElementById('sbCopyBtn');
    const tabs = document.querySelectorAll('.builder-tab');
    const presets = document.querySelectorAll('.sb-preset');

    if (!subInput || !codeOutput) return;

    let currentTab = 'jsonld';

    const templates = {
      analyst: {
        subject: 'Ashiq',
        type: 'Person',
        predicate: 'operates as SEO Strategist & Organic Search Analyst in',
        object: 'India',
        objWiki: 'https://www.wikidata.org/wiki/Q668',
        specialty: 'Search Engine Optimization & Semantic Web',
        specWiki: 'https://www.wikidata.org/wiki/Q180711',
        entityId: 'https://yoonverse.in/#ashiq',
        sameAs: 'https://www.instagram.com/yoonu_verse/'
      },
      saas: {
        subject: 'Yoonverse Search Telemetry',
        type: 'SoftwareApplication',
        predicate: 'automates Semantic Triple & Search Intent diagnostics for',
        object: 'Organic Search Teams',
        objWiki: 'https://www.wikidata.org/wiki/Q816826',
        specialty: 'Knowledge Graph Entity Extraction',
        specWiki: 'https://www.wikidata.org/wiki/Q33002955',
        entityId: 'https://yoonverse.in/#triple-schema-builder',
        sameAs: 'https://www.instagram.com/yoonu_verse/'
      },
      agency: {
        subject: 'Yoonverse',
        type: 'EducationalOrganization',
        predicate: 'publishes open-access Semantic SEO & Topical Authority research in',
        object: 'India',
        objWiki: 'https://www.wikidata.org/wiki/Q668',
        specialty: 'Semantic Web & Search Analytics',
        specWiki: 'https://www.wikidata.org/wiki/Q54837',
        entityId: 'https://yoonverse.in/#organization',
        sameAs: 'https://www.instagram.com/yoonu_verse/'
      },
      article: {
        subject: 'Semantic SEO & Knowledge Graph Triples Guide',
        type: 'TechArticle',
        predicate: 'explains Subject-Predicate-Object entity engineering for',
        object: 'Google Knowledge Graph',
        objWiki: 'https://www.wikidata.org/wiki/Q33002955',
        specialty: 'Search Engine Optimization',
        specWiki: 'https://www.wikidata.org/wiki/Q180711',
        entityId: 'https://yoonverse.in/blog/semantic-seo-triples-knowledge-graph#article',
        sameAs: 'https://yoonverse.in/#ashiq'
      }
    };

    function renderBuilder() {
      const sub = (subInput.value || 'Entity').trim();
      const type = typeInput.value || 'Person';
      const pred = (predInput.value || 'operates in').trim();
      const obj = (objInput.value || 'India').trim();
      const objWiki = (objWikiInput.value || 'https://www.wikidata.org/wiki/Q668').trim();
      const spec = (specInput.value || 'Search Engine Optimization').trim();
      const specWiki = (specWikiInput.value || 'https://www.wikidata.org/wiki/Q180711').trim();
      const entityId = (idInput.value || 'https://yoonverse.in/#ashiq').trim();
      const sameAs = (sameAsInput.value || '').trim();

      outSub.textContent = `[Subject: ${sub}]`;
      outPred.textContent = `[Predicate: ${pred}]`;
      outObj.textContent = `[Object: ${obj}]`;
      outProse.innerHTML = `<strong>Extractive Lead Sentence:</strong> "${sub} ${pred} ${obj}, specializing in ${spec}."`;

      if (currentTab === 'jsonld') {
        codeFilename.textContent = 'schema-graph.jsonld';
        const graphNode = {
          '@type': type,
          '@id': entityId,
          'name': sub,
          'description': `${sub} ${pred} ${obj}, specializing in ${spec}.`,
          'url': entityId.split('#')[0] || entityId
        };

        if (type === 'Person') {
          graphNode.jobTitle = pred.replace(/^operates as\s+/i, '').replace(/\s+in$/i, '');
          graphNode.workLocation = {
            '@type': 'Country',
            'name': obj,
            'sameAs': objWiki
          };
        } else if (type === 'Organization' || type === 'EducationalOrganization') {
          graphNode.areaServed = {
            '@type': 'Country',
            'name': obj,
            'sameAs': objWiki
          };
        } else {
          graphNode.about = {
            '@type': 'Thing',
            'name': obj,
            'sameAs': objWiki
          };
        }

        graphNode.knowsAbout = [
          {
            '@type': 'Thing',
            'name': spec,
            'sameAs': specWiki
          }
        ];

        if (sameAs) {
          graphNode.sameAs = [sameAs];
        }

        const schemaObj = {
          '@context': 'https://schema.org',
          '@graph': [graphNode]
        };

        codeOutput.textContent = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n<\/script>`;
      } else {
        codeFilename.textContent = 'semantic-eav-matrix.html';
        codeOutput.textContent =
`<dl class="eav-dl" itemscope itemtype="https://schema.org/${type}" itemid="${entityId}">
  <div class="eav-pair">
    <dt>Entity Subject (@type: ${type})</dt>
    <dd itemprop="name">${sub}</dd>
  </div>
  <div class="eav-pair">
    <dt>Predicate &amp; Object Scope</dt>
    <dd>${pred} <strong>${obj}</strong> (<code>${objWiki}</code>)</dd>
  </div>
  <div class="eav-pair">
    <dt>Core Topical Authority (knowsAbout)</dt>
    <dd itemprop="knowsAbout">${spec} (<code>${specWiki}</code>)</dd>
  </div>${sameAs ? `\n  <div class="eav-pair">\n    <dt>Verified Entity Reconciliation (sameAs)</dt>\n    <dd><a href="${sameAs}" itemprop="sameAs" rel="noopener me">${sameAs}</a></dd>\n  </div>` : ''}
</dl>`;
      }
    }

    [subInput, typeInput, predInput, objInput, objWikiInput, specInput, specWikiInput, idInput, sameAsInput].forEach(el => {
      if (el) {
        el.addEventListener('input', renderBuilder);
        el.addEventListener('change', renderBuilder);
      }
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.tab;
        renderBuilder();
      });
    });

    presets.forEach(btn => {
      btn.addEventListener('click', () => {
        presets.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const t = templates[btn.dataset.template];
        if (!t) return;
        subInput.value = t.subject;
        typeInput.value = t.type;
        predInput.value = t.predicate;
        objInput.value = t.object;
        objWikiInput.value = t.objWiki;
        specInput.value = t.specialty;
        specWikiInput.value = t.specWiki;
        idInput.value = t.entityId;
        sameAsInput.value = t.sameAs;
        renderBuilder();
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = codeOutput.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          const orig = copyBtn.textContent;
          copyBtn.textContent = '✓ Copied to Clipboard!';
          setTimeout(() => { copyBtn.textContent = orig; }, 2000);
        });
      });
    }

    renderBuilder();
  }

  // Initialize Cosmos Stage, Liquid Wordmark, and Triple Schema Builder
  initCosmosStage();
  initLiquidWordmark();
  initTripleSchemaBuilder();
});

