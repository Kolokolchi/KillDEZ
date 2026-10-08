/**
 * Dis Cleaning — Pest Hunter Mini-Game & Sandbox Engine
 * Vanilla JavaScript (ES6+), self-contained with Web Audio API sound synthesis.
 * Features:
 * - Flies (erratic flight, wing flutter)
 * - Cockroaches (scurrying, antennae wiggle)
 * - Boss: Rat (5 hits, health bar, squeak, screen shake, damage flash)
 * - Combo Multiplier System (x2, x3, x4, x5 🔥)
 * - Power-up: Spray Can / «Дихлофос» (Cold fog screen wipe)
 * - Conversion modal with promo code ЧИСТОТА and WhatsApp CTA
 * - Sandbox Dev Controls Drawer
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Web Audio API Sound Synthesizer (Zero External Assets Required)
  // =========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('pest_sound_muted') === 'true';
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    setMuted(muted) {
      this.muted = muted;
      localStorage.setItem('pest_sound_muted', muted ? 'true' : 'false');
    }

    // Realistic swatter slap (punchy noise burst + filtered snap)
    playSlap() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Noise burst for the physical impact
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);

      // 2. Thump body
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.09);

      oscGain.gain.setValueAtTime(0.6, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    }

    // Squishy splat sound
    playSplat() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    }

    // Rat startled screech/squeak
    playRatSqueak() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.linearRampToValueAtTime(1450, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.18);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.45, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.19);
    }

    // Rat Boss defeat boom + chime
    playRatDefeat() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);

      gain.gain.setValueAtTime(0.85, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);

      setTimeout(() => this.playVictory(), 180);
    }

    // Aerosol Spray hiss ("Tsssssss!")
    playSpray() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.65));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2200, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    }

    // Combo escalation chime
    playCombo(combo) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const baseFreq = 480;
      const freq = baseFreq + Math.min(combo, 5) * 110;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    }

    // Cheerful victory jingle
    playVictory() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const notes = [440, 554.37, 659.25, 880];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.36);
      });
    }
  }

  // =========================================================================
  // 2. Vector SVG Templates
  // =========================================================================
  const SPRITES = {
    fly: `
      <svg viewBox="0 0 40 40" class="pest-fly" xmlns="http://www.w3.org/2000/svg">
        <!-- Legs -->
        <g stroke="#1e293b" stroke-width="1.5" stroke-linecap="round" fill="none">
          <path d="M12 18 Q6 14 4 10" />
          <path d="M28 18 Q34 14 36 10" />
          <path d="M11 22 Q4 22 2 24" />
          <path d="M29 22 Q36 22 38 24" />
          <path d="M13 26 Q7 31 6 35" />
          <path d="M27 26 Q33 31 34 35" />
        </g>
        <!-- Body -->
        <ellipse cx="20" cy="22" rx="6" ry="9" fill="#1e293b" />
        <ellipse cx="20" cy="22" rx="4.5" ry="7.5" fill="#334155" />
        <!-- Head -->
        <circle cx="20" cy="12" r="5" fill="#0f172a" />
        <!-- Eyes -->
        <ellipse cx="17" cy="11" rx="2.5" ry="3" fill="#dc2626" />
        <ellipse cx="23" cy="11" rx="2.5" ry="3" fill="#dc2626" />
        <circle cx="16.5" cy="10.5" r="0.8" fill="#ffffff" />
        <circle cx="23.5" cy="10.5" r="0.8" fill="#ffffff" />
        <!-- Fluttering Wings -->
        <g class="pest-fly-wings">
          <ellipse cx="14" cy="18" rx="6" ry="10" transform="rotate(-32 14 18)" fill="rgba(226, 232, 240, 0.75)" stroke="rgba(148, 163, 184, 0.8)" stroke-width="0.8" />
          <path d="M14 10 Q14 18 13 26" stroke="rgba(100, 116, 139, 0.4)" stroke-width="0.6" fill="none" />
          <ellipse cx="26" cy="18" rx="6" ry="10" transform="rotate(32 26 18)" fill="rgba(226, 232, 240, 0.75)" stroke="rgba(148, 163, 184, 0.8)" stroke-width="0.8" />
          <path d="M26 10 Q26 18 27 26" stroke="rgba(100, 116, 139, 0.4)" stroke-width="0.6" fill="none" />
        </g>
      </svg>
    `,
    cockroach: `
      <svg viewBox="0 0 50 50" class="pest-roach" xmlns="http://www.w3.org/2000/svg">
        <!-- Long Wiggling Antennae -->
        <g class="pest-roach-antennae" stroke="#78350f" stroke-width="1.2" stroke-linecap="round" fill="none">
          <path d="M23 10 Q16 2 8 1" />
          <path d="M27 10 Q34 2 42 1" />
        </g>
        <!-- Left Crawling Legs -->
        <g class="pest-roach-legs-left" stroke="#92400e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M18 18 L10 14 L4 10" />
          <path d="M17 25 L8 25 L3 29" />
          <path d="M18 32 L10 37 L5 44" />
        </g>
        <!-- Right Crawling Legs -->
        <g class="pest-roach-legs-right" stroke="#92400e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M32 18 L40 14 L46 10" />
          <path d="M33 25 L42 25 L47 29" />
          <path d="M32 32 L40 37 L45 44" />
        </g>
        <!-- Shiny Carapace (Body) -->
        <ellipse cx="25" cy="27" rx="7.5" ry="14" fill="#78350f" />
        <ellipse cx="25" cy="27" rx="6" ry="12.5" fill="#9a3412" />
        <!-- Carapace Segments -->
        <path d="M19 22 Q25 24 31 22 M18.5 27 Q25 29 31.5 27 M19.5 32 Q25 34 30.5 32" stroke="#451a03" stroke-width="1" fill="none" opacity="0.6" />
        <!-- Pronotum (Head Shield) -->
        <ellipse cx="25" cy="14" rx="6" ry="4.5" fill="#451a03" />
        <!-- Head -->
        <circle cx="25" cy="10" r="3" fill="#270e02" />
        <!-- Specular Highlight -->
        <ellipse cx="23.5" cy="24" rx="2" ry="7" fill="rgba(255, 255, 255, 0.25)" />
      </svg>
    `,
    rat: `
      <div class="pest-rat-hp-bar"><div class="pest-rat-hp-fill" style="width: 100%;"></div></div>
      <div class="pest-rat-label">БОСС: КРЫСА</div>
      <svg viewBox="0 0 100 65" class="pest-rat" xmlns="http://www.w3.org/2000/svg">
        <!-- Wiggling Whip Tail at rear -->
        <g class="pest-rat-tail">
          <path d="M18 35 Q10 20 2 28 Q-6 36 2 48" stroke="#f472b6" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9" />
        </g>
        <!-- Back Paws -->
        <ellipse cx="28" cy="48" rx="8" ry="4" fill="#fda4af" />
        <ellipse cx="32" cy="18" rx="7" ry="4" fill="#fda4af" />
        <!-- Big Fur Body -->
        <ellipse cx="48" cy="34" rx="26" ry="17" fill="#475569" />
        <ellipse cx="46" cy="34" rx="22" ry="14" fill="#334155" />
        <!-- Spine Contour -->
        <path d="M30 32 Q48 24 68 31" stroke="#1e293b" stroke-width="2.5" fill="none" opacity="0.6" />
        <!-- Head -->
        <ellipse cx="74" cy="34" rx="15" ry="11" fill="#475569" />
        <ellipse cx="75" cy="34" rx="12" ry="9" fill="#334155" />
        <!-- Pink Snout -->
        <path d="M86 34 L92 32 L92 36 Z" fill="#f43f5e" />
        <circle cx="92" cy="34" r="2.5" fill="#f43f5e" />
        <!-- Whiskers -->
        <g stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.8">
          <path d="M88 32 L98 25 M88 34 L100 34 M88 36 L98 43" />
        </g>
        <!-- Ears -->
        <ellipse cx="65" cy="22" rx="5" ry="7" transform="rotate(-15 65 22)" fill="#334155" />
        <ellipse cx="65" cy="22" rx="3" ry="5" transform="rotate(-15 65 22)" fill="#fda4af" />
        <!-- Front Paws -->
        <ellipse cx="70" cy="46" rx="6" ry="3.5" fill="#fda4af" />
        <!-- Evil Glowing Red Eyes -->
        <circle cx="78" cy="29" r="3" fill="#dc2626" />
        <circle cx="79" cy="28.5" r="1.2" fill="#ffffff" />
      </svg>
    `,
    sprayCan: `
      <svg viewBox="0 0 50 50" class="pest-powerup-spray" xmlns="http://www.w3.org/2000/svg">
        <!-- Can Body -->
        <rect x="14" y="14" width="22" height="30" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
        <rect x="16" y="20" width="18" height="18" rx="2" fill="#0ea5e9" />
        <text x="25" y="32" font-size="8" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">DIS</text>
        <!-- Nozzle & Cap -->
        <rect x="21" y="9" width="8" height="6" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
        <rect x="26" y="11" width="6" height="3" rx="1" fill="#f43f5e" />
        <!-- Mist Spray Particles -->
        <g stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.85">
          <path d="M34 11 Q42 8 46 5" />
          <path d="M34 12 Q44 12 48 12" />
          <path d="M34 13 Q42 16 46 19" />
        </g>
        <circle cx="44" cy="7" r="1.5" fill="#7dd3fc" />
        <circle cx="48" cy="15" r="1.5" fill="#7dd3fc" />
      </svg>
    `,
    splat: `
      <svg viewBox="0 0 60 60" class="pest-splat" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 18 Q35 12 40 16 Q45 20 42 26 Q48 30 46 36 Q44 42 38 43 Q35 48 29 46 Q22 47 20 41 Q13 40 15 32 Q12 26 17 21 Q20 15 26 17 Z" fill="#2d6a4f" opacity="0.95" />
        <circle cx="16" cy="15" r="2.5" fill="#1b4332" />
        <circle cx="45" cy="12" r="2" fill="#2d6a4f" />
        <circle cx="50" cy="38" r="3" fill="#1b4332" />
        <circle cx="12" cy="44" r="2" fill="#2d6a4f" />
        <circle cx="34" cy="51" r="2.5" fill="#1b4332" />
        <circle cx="28" cy="11" r="1.5" fill="#40916c" />
        <ellipse cx="30" cy="30" rx="9" ry="8" fill="#1b4332" />
      </svg>
    `,
    swatterCursor: `
      <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <!-- Handle -->
        <path d="M12 48 L28 32" stroke="#475569" stroke-width="4" stroke-linecap="round" />
        <path d="M10 50 L16 44" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
        <!-- Swatter Mesh Head -->
        <rect x="25" y="6" width="28" height="28" rx="5" fill="rgba(16, 185, 129, 0.75)" stroke="#059669" stroke-width="2.5" />
        <!-- Grid pattern inside swatter head -->
        <line x1="32" y1="7" x2="32" y2="33" stroke="#047857" stroke-width="1.5" />
        <line x1="39" y1="7" x2="39" y2="33" stroke="#047857" stroke-width="1.5" />
        <line x1="46" y1="7" x2="46" y2="33" stroke="#047857" stroke-width="1.5" />
        <line x1="26" y1="13" x2="52" y2="13" stroke="#047857" stroke-width="1.5" />
        <line x1="26" y1="20" x2="52" y2="20" stroke="#047857" stroke-width="1.5" />
        <line x1="26" y1="27" x2="52" y2="27" stroke="#047857" stroke-width="1.5" />
      </svg>
    `
  };

  // =========================================================================
  // 3. Pest Entities (Fly, Cockroach, Boss Rat, Spray Power-up)
  // =========================================================================
  class PestEntity {
    constructor(game, type) {
      this.game = game;
      this.type = type; // 'fly', 'cockroach', 'rat', 'spray'
      this.dom = document.createElement('div');

      if (type === 'rat') {
        this.dom.className = 'pest-entity pest-rat-wrap';
        this.dom.innerHTML = SPRITES.rat;
        this.width = 96;
        this.height = 60;
        this.maxHp = this.game.config.ratHp || 5;
        this.hp = this.maxHp;
        this.points = 100;
        this.speed = 70 * this.game.config.speedMultiplier;
      } else if (type === 'spray') {
        this.dom.className = 'pest-entity pest-spray-wrap';
        this.dom.innerHTML = SPRITES.sprayCan;
        this.width = 48;
        this.height = 48;
        this.points = 50;
        this.speed = 35 * this.game.config.speedMultiplier;
      } else {
        this.dom.className = `pest-entity pest-${type === 'fly' ? 'fly' : 'roach'}-wrap`;
        this.dom.innerHTML = type === 'fly' ? SPRITES.fly : SPRITES.cockroach;
        this.width = type === 'fly' ? 36 : 44;
        this.height = type === 'fly' ? 36 : 44;
        this.points = type === 'fly' ? 10 : 15;
        this.speed = (type === 'fly' ? 50 : 60) * this.game.config.speedMultiplier;
      }

      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.rotation = 0;

      this.timer = 0;
      this.pauseTimer = 0;
      this.isAlive = true;

      this.initPosition();
      this.bindEvents();
    }

    initPosition() {
      const bounds = this.game.getBounds();

      if (this.type === 'fly') {
        // Flies appear inside visible bounds
        this.x = bounds.left + 40 + Math.random() * Math.max(10, bounds.width - this.width - 80);
        this.y = bounds.top + 50 + Math.random() * Math.max(10, bounds.height - this.height - 100);
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.rotation = angle * (180 / Math.PI) + 90;
        // 40% chance fly starts sitting/hovering calmly
        if (Math.random() < 0.4) {
          this.pauseTimer = 0.8 + Math.random() * 1.0;
        }
      } else if (this.type === 'spray') {
        this.x = bounds.left + 50 + Math.random() * Math.max(10, bounds.width - 150);
        this.y = bounds.top + 10;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = this.speed;
        this.rotation = 0;
      } else if (this.type === 'rat') {
        // Rat Boss spawns at the perimeter and enters smoothly
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) {
          this.x = bounds.left + bounds.width * 0.5 - this.width * 0.5;
          this.y = bounds.top + 25;
        } else if (edge === 1) {
          this.x = bounds.left + bounds.width - this.width - 25;
          this.y = bounds.top + bounds.height * 0.5 - this.height * 0.5;
        } else if (edge === 2) {
          this.x = bounds.left + bounds.width * 0.5 - this.width * 0.5;
          this.y = bounds.top + bounds.height - this.height - 25;
        } else {
          this.x = bounds.left + 25;
          this.y = bounds.top + bounds.height * 0.5 - this.height * 0.5;
        }

        const targetX = bounds.left + bounds.width * 0.5;
        const targetY = bounds.top + bounds.height * 0.5;
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.rotation = angle * (180 / Math.PI);
        this.pauseTimer = 0.5; // brief pause to sniff the area
      } else {
        // Cockroaches spawn along inner borders and crawl inward
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) {
          this.x = bounds.left + 30 + Math.random() * Math.max(10, bounds.width - this.width - 60);
          this.y = bounds.top + 15;
        } else if (edge === 1) {
          this.x = bounds.left + bounds.width - this.width - 15;
          this.y = bounds.top + 30 + Math.random() * Math.max(10, bounds.height - this.height - 60);
        } else if (edge === 2) {
          this.x = bounds.left + 30 + Math.random() * Math.max(10, bounds.width - this.width - 60);
          this.y = bounds.top + bounds.height - this.height - 15;
        } else {
          this.x = bounds.left + 15;
          this.y = bounds.top + 30 + Math.random() * Math.max(10, bounds.height - this.height - 60);
        }

        const targetX = bounds.left + bounds.width * 0.5 + (Math.random() - 0.5) * 200;
        const targetY = bounds.top + bounds.height * 0.5 + (Math.random() - 0.5) * 200;
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.rotation = angle * (180 / Math.PI) + 90;
      }

      this.updateDOM();
    }

    bindEvents() {
      const handleHit = (e) => {
        if (!this.isAlive || this.game.state !== 'PLAYING') return;
        e.preventDefault();
        e.stopPropagation();

        const rect = this.dom.getBoundingClientRect();
        const hitX = rect.left + rect.width / 2;
        const hitY = rect.top + rect.height / 2;

        this.squash(hitX, hitY);
      };

      this.dom.addEventListener('pointerdown', handleHit, { passive: false });
    }

    squash(x, y) {
      if (!this.isAlive) return;

      // Handle Spray Power-up click
      if (this.type === 'spray') {
        this.isAlive = false;
        this.dom.remove();
        this.game.pests = this.game.pests.filter(p => p !== this);
        this.game.triggerSprayPowerUp(x, y);
        return;
      }

      // Handle Rat Boss Hit
      if (this.type === 'rat') {
        this.hp--;

        // Update health bar fill
        const hpFill = this.dom.querySelector('.pest-rat-hp-fill');
        if (hpFill) {
          hpFill.style.width = `${Math.max(0, (this.hp / this.maxHp) * 100)}%`;
        }

        if (this.hp > 0) {
          // Boss damaged, not dead yet!
          this.game.sound.playRatSqueak();
          this.game.sound.playSlap();
          this.game.shakeScreen();

          const ratSvg = this.dom.querySelector('.pest-rat');
          if (ratSvg) {
            ratSvg.classList.add('is-damaged');
            setTimeout(() => ratSvg.classList.remove('is-damaged'), 220);
          }

          // Darts startled in a new direction with realistic burst
          const angle = Math.random() * Math.PI * 2;
          const burstSpeed = this.speed * 1.7;
          this.vx = Math.cos(angle) * burstSpeed;
          this.vy = Math.sin(angle) * burstSpeed;
          this.rotation = angle * (180 / Math.PI);

          this.game.createScorePopup(x, y, `💥 -1 HP (${this.hp}/${this.maxHp})`);
          this.game.registerHit(5, x, y, false);
          return;
        }

        // Boss Defeated!
        this.isAlive = false;
        this.game.sound.playRatDefeat();
        this.game.shakeScreen();
        this.game.createSplat(x, y);
        this.game.createScorePopup(x, y, `🏆 БОСС ПОВЕРЖЕН! +100`);
        this.game.ratsKilled++;
        this.game.registerHit(this.points, x, y, true);
        this.game.showBanner('🐀 БОСС-КРЫСА УНИЧТОЖЕНА! +100 ОЧКОВ');
        this.dom.remove();
        this.game.pests = this.game.pests.filter(p => p !== this);
        return;
      }

      // Regular Pests (Fly / Cockroach)
      this.isAlive = false;
      this.game.onPestKilled(this, x, y);
      this.dom.remove();
    }

    update(dt, bounds) {
      if (!this.isAlive) return;

      this.timer += dt;

      if (this.type === 'fly') {
        // Fly behavior: gentle hovering, pauses, short wander steps
        if (this.pauseTimer > 0) {
          this.pauseTimer -= dt;
          return;
        }

        // Pause to rub legs or hover
        if (Math.random() < 0.015) {
          this.pauseTimer = 0.5 + Math.random() * 0.9;
          return;
        }

        if (Math.random() < 0.04) {
          const turn = (Math.random() - 0.5) * 1.5;
          const currentAngle = Math.atan2(this.vy, this.vx) + turn;
          const currentSpeed = (60 + Math.random() * 40) * this.game.config.speedMultiplier;
          this.vx = Math.cos(currentAngle) * currentSpeed;
          this.vy = Math.sin(currentAngle) * currentSpeed;
        }

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Bounce off bounds
        if (this.x < bounds.left) { this.x = bounds.left; this.vx = Math.abs(this.vx); }
        if (this.x > bounds.left + bounds.width - this.width) {
          this.x = bounds.left + bounds.width - this.width;
          this.vx = -Math.abs(this.vx);
        }
        if (this.y < bounds.top) { this.y = bounds.top; this.vy = Math.abs(this.vy); }
        if (this.y > bounds.top + bounds.height - this.height) {
          this.y = bounds.top + bounds.height - this.height;
          this.vy = -Math.abs(this.vy);
        }

        this.rotation = Math.atan2(this.vy, this.vx) * (180 / Math.PI) + 90;
      } else if (this.type === 'rat') {
        // Rat Boss behavior: creeping, pauses to sniff, realistic trot
        if (this.pauseTimer > 0) {
          this.pauseTimer -= dt;
          return;
        }

        if (Math.random() < 0.012) {
          this.pauseTimer = 0.4 + Math.random() * 0.7; // stops and sniffs
          return;
        }

        if (Math.random() < 0.03) {
          const turn = (Math.random() - 0.5) * 0.9;
          const currentAngle = Math.atan2(this.vy, this.vx) + turn;
          const currentSpeed = (85 + Math.random() * 35) * this.game.config.speedMultiplier;
          this.vx = Math.cos(currentAngle) * currentSpeed;
          this.vy = Math.sin(currentAngle) * currentSpeed;
        }

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Bounce inside screen bounds so the boss stays in play
        if (this.x < bounds.left + 20) { this.x = bounds.left + 20; this.vx = Math.abs(this.vx); }
        if (this.x > bounds.left + bounds.width - this.width - 20) {
          this.x = bounds.left + bounds.width - this.width - 20;
          this.vx = -Math.abs(this.vx);
        }
        if (this.y < bounds.top + 20) { this.y = bounds.top + 20; this.vy = Math.abs(this.vy); }
        if (this.y > bounds.top + bounds.height - this.height - 20) {
          this.y = bounds.top + bounds.height - this.height - 20;
          this.vy = -Math.abs(this.vy);
        }

        this.rotation = Math.atan2(this.vy, this.vx) * (180 / Math.PI);
      } else if (this.type === 'spray') {
        // Spray Can gently drifts downwards
        this.x += Math.sin(this.timer * 2.5) * 0.6;
        this.y += this.vy * dt;

        if (this.y > bounds.top + bounds.height + 60) {
          this.isAlive = false;
          this.dom.remove();
          this.game.pests = this.game.pests.filter(p => p !== this);
        }
      } else {
        // Cockroach behavior: steady crawl with pauses to twitch antennae
        if (this.pauseTimer > 0) {
          this.pauseTimer -= dt;
          return;
        }

        if (Math.random() < 0.01) {
          this.pauseTimer = 0.3 + Math.random() * 0.5;
          return;
        }

        if (Math.random() < 0.03) {
          const turn = (Math.random() - 0.5) * 0.7;
          const currentAngle = Math.atan2(this.vy, this.vx) + turn;
          const currentSpeed = (75 + Math.random() * 35) * this.game.config.speedMultiplier;
          this.vx = Math.cos(currentAngle) * currentSpeed;
          this.vy = Math.sin(currentAngle) * currentSpeed;
        }

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        const margin = 100;
        if (this.x < bounds.left - margin || this.x > bounds.left + bounds.width + margin ||
            this.y < bounds.top - margin || this.y > bounds.top + bounds.height + margin) {
          this.initPosition();
        }

        this.rotation = Math.atan2(this.vy, this.vx) * (180 / Math.PI) + 90;
      }

      this.updateDOM();
    }

    updateDOM() {
      if (this.type === 'rat') {
        this.dom.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
        const svg = this.dom.querySelector('.pest-rat');
        if (svg) {
          svg.style.transform = `rotate(${this.rotation}deg)`;
          svg.style.transformOrigin = 'center center';
        }
      } else {
        this.dom.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg)`;
      }
    }
  }

  // =========================================================================
  // 4. Main Game Engine & Controller
  // =========================================================================
  class PestHunterGame {
    constructor() {
      this.sound = new SoundEngine();
      this.pests = [];
      this.state = 'IDLE'; // IDLE, PLAYING, ENDED
      this.score = 0;
      this.fliesKilled = 0;
      this.roachesKilled = 0;
      this.ratsKilled = 0;
      this.timeLeft = 30;
      this.lastTimestamp = 0;
      this.spawnTimerFly = 0;
      this.spawnTimerRoach = 0;
      this.bossSpawnedThisRound = false;
      this.spraySpawnedThisRound = false;

      // Combo system
      this.combo = 1;
      this.comboTimer = null;

      // Configurable tuning parameters (can be adjusted via Sandbox Drawer)
      this.config = {
        gameDuration: 30,       // seconds
        maxPests: 14,           // max concurrent pests
        flySpawnInterval: 1.8,  // seconds between fly spawns
        roachSpawnInterval: 2.4,// seconds between roach spawns
        speedMultiplier: 1.0,   // speed factor
        ratHp: 5                // boss hits to defeat
      };

      this.cacheDOM();
      this.bindTrigger();
      this.bindOverlayEvents();
      this.initCustomCursor();
      this.initSandboxControls();
    }

    cacheDOM() {
      this.triggerBtn = document.getElementById('pestGameTrigger');
      this.overlay = document.getElementById('pestGameOverlay');
      this.hud = document.getElementById('pestGameHud');
      this.hudScore = document.getElementById('pestHudScore');
      this.hudCombo = document.getElementById('pestHudCombo');
      this.hudTimer = document.getElementById('pestHudTimer');
      this.hudSoundBtn = document.getElementById('pestHudSoundBtn');
      this.hudExitBtn = document.getElementById('pestHudExitBtn');
      this.bossAlert = document.getElementById('pestBossAlert');

      this.resultModal = document.getElementById('pestResultModal');
      this.resScore = document.getElementById('pestResScore');
      this.resFlies = document.getElementById('pestResFlies');
      this.resRoaches = document.getElementById('pestResRoaches');
      this.resRats = document.getElementById('pestResRats');

      this.btnPlayAgain = document.getElementById('pestBtnPlayAgain');
      this.btnBackSite = document.getElementById('pestBtnBackSite');
      this.btnCopyPromo = document.getElementById('pestBtnCopyPromo');
      this.promoCodeText = document.getElementById('pestPromoCode');
      this.viewportWrapper = document.getElementById('sandboxViewportWrapper');
    }

    getBounds() {
      const rect = this.viewportWrapper ? this.viewportWrapper.getBoundingClientRect() : {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
      return {
        left: Math.max(0, rect.left),
        top: Math.max(0, rect.top),
        width: rect.width || window.innerWidth,
        height: rect.height || window.innerHeight
      };
    }

    bindTrigger() {
      if (this.triggerBtn) {
        this.triggerBtn.addEventListener('click', () => {
          this.startGame();
        });
      }
    }

    bindOverlayEvents() {
      if (this.hudSoundBtn) {
        this.updateSoundIcon();
        this.hudSoundBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.sound.setMuted(!this.sound.muted);
          this.updateSoundIcon();
        });
      }

      if (this.hudExitBtn) {
        this.hudExitBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.endGame();
        });
      }

      if (this.btnPlayAgain) {
        this.btnPlayAgain.addEventListener('click', () => {
          this.closeModal();
          this.startGame();
        });
      }

      if (this.btnBackSite) {
        this.btnBackSite.addEventListener('click', () => {
          this.closeModal();
          this.stopGameOverlay();
        });
      }

      if (this.btnCopyPromo) {
        this.btnCopyPromo.addEventListener('click', () => {
          const code = this.promoCodeText ? this.promoCodeText.textContent.trim() : 'ЧИСТОТА';
          if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
              this.btnCopyPromo.textContent = 'Скопировано!';
              setTimeout(() => {
                this.btnCopyPromo.textContent = 'Копировать';
              }, 2000);
            });
          }
        });
      }
    }

    updateSoundIcon() {
      if (!this.hudSoundBtn) return;
      const isMuted = this.sound.muted;
      this.hudSoundBtn.innerHTML = isMuted ? `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ` : `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
    }

    initCustomCursor() {
      const swatter = document.createElement('div');
      swatter.className = 'pest-swatter-cursor';
      swatter.innerHTML = SPRITES.swatterCursor;
      document.body.appendChild(swatter);
      this.swatterCursor = swatter;

      window.addEventListener('pointermove', (e) => {
        if (this.state === 'PLAYING') {
          swatter.style.left = `${e.clientX}px`;
          swatter.style.top = `${e.clientY}px`;
        }
      });

      window.addEventListener('pointerdown', (e) => {
        if (this.state === 'PLAYING') {
          this.sound.init();
          swatter.classList.add('is-smashing');
          setTimeout(() => swatter.classList.remove('is-smashing'), 120);
        }
      });
    }

    // Screen Shake effect
    shakeScreen() {
      if (!this.overlay) return;
      this.overlay.classList.add('is-shaking');
      setTimeout(() => this.overlay.classList.remove('is-shaking'), 180);
    }

    // Boss Warning Banner
    showBanner(text) {
      if (!this.bossAlert) return;
      this.bossAlert.innerHTML = `<span>⚠️</span> ${text}`;
      this.bossAlert.style.display = 'flex';
      setTimeout(() => {
        if (this.bossAlert) this.bossAlert.style.display = 'none';
      }, 2500);
    }

    // Hit Registration & Combo Multiplier
    registerHit(basePoints, x, y, isBig) {
      // Manage combo
      if (this.comboTimer) clearTimeout(this.comboTimer);
      if (this.combo < 5) this.combo++;

      this.sound.playCombo(this.combo);

      const earned = basePoints * this.combo;
      this.score += earned;

      // Update Combo HUD badge
      if (this.hudCombo) {
        if (this.combo > 1) {
          this.hudCombo.textContent = `${this.combo}x 🔥`;
          this.hudCombo.style.display = 'inline-flex';
        } else {
          this.hudCombo.style.display = 'none';
        }
      }

      // Reset combo after 1.8 seconds of inactivity
      this.comboTimer = setTimeout(() => {
        this.combo = 1;
        if (this.hudCombo) this.hudCombo.style.display = 'none';
      }, 1800);

      this.updateHud();
    }

    startGame() {
      this.sound.init();
      this.state = 'PLAYING';
      this.score = 0;
      this.fliesKilled = 0;
      this.roachesKilled = 0;
      this.ratsKilled = 0;
      this.combo = 1;
      this.timeLeft = this.config.gameDuration;
      this.lastTimestamp = performance.now();
      this.spawnTimerFly = 0;
      this.spawnTimerRoach = 0;
      this.bossSpawnedThisRound = false;
      this.spraySpawnedThisRound = false;

      // Reset Combo HUD
      if (this.hudCombo) this.hudCombo.style.display = 'none';
      if (this.bossAlert) this.bossAlert.style.display = 'none';

      // Clean existing pests
      this.clearAllPests();

      // UI updates
      this.updateHud();
      this.overlay.classList.add('is-active', 'cursor-swatter');
      document.body.style.overflow = 'hidden';

      // Initial batch of pests
      this.spawnPest('fly');
      this.spawnPest('fly');
      this.spawnPest('cockroach');

      // Start main game loop
      requestAnimationFrame((ts) => this.gameLoop(ts));
    }

    gameLoop(timestamp) {
      if (this.state !== 'PLAYING') return;

      const dt = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1);
      this.lastTimestamp = timestamp;

      // Countdown timer
      if (this.config.gameDuration > 0) {
        this.timeLeft -= dt;

        // Auto spawn Spray Can power-up at 75% time remaining
        if (this.timeLeft <= this.config.gameDuration * 0.75 && !this.spraySpawnedThisRound) {
          this.spraySpawnedThisRound = true;
          this.spawnPest('spray');
        }

        // Auto spawn Boss Rat at 50% time remaining
        if (this.timeLeft <= this.config.gameDuration * 0.5 && !this.bossSpawnedThisRound) {
          this.bossSpawnedThisRound = true;
          this.spawnBoss();
        }

        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.updateHud();
          this.endGame();
          return;
        }
      }

      // Spawning timers for regular pests
      this.spawnTimerFly += dt;
      this.spawnTimerRoach += dt;

      if (this.pests.length < this.config.maxPests) {
        if (this.spawnTimerFly >= this.config.flySpawnInterval) {
          this.spawnTimerFly = 0;
          this.spawnPest('fly');
        }
        if (this.spawnTimerRoach >= this.config.roachSpawnInterval) {
          this.spawnTimerRoach = 0;
          this.spawnPest('cockroach');
        }
      }

      // Update pests
      const bounds = this.getBounds();
      for (let i = 0; i < this.pests.length; i++) {
        this.pests[i].update(dt, bounds);
      }

      this.updateHud();
      requestAnimationFrame((ts) => this.gameLoop(ts));
    }

    spawnPest(type) {
      if (this.pests.length >= this.config.maxPests + 3) return;
      const pest = new PestEntity(this, type);
      this.overlay.appendChild(pest.dom);
      this.pests.push(pest);
    }

    spawnBoss() {
      this.sound.playRatSqueak();
      this.shakeScreen();
      this.showBanner('БОСС: ПОЯВИЛАСЬ КРЫСА! (5 ударов) 🐀');
      this.spawnPest('rat');
    }

    triggerSprayPowerUp(x, y) {
      this.sound.playSpray();
      this.shakeScreen();

      // Fog Blast wave animation across screen
      const fog = document.createElement('div');
      fog.className = 'pest-fog-blast';
      this.overlay.appendChild(fog);
      setTimeout(() => fog.remove(), 1200);

      // Wipe out all active flies and roaches
      const targets = this.pests.filter(p => p.type === 'fly' || p.type === 'cockroach');
      targets.forEach(p => {
        const rect = p.dom.getBoundingClientRect();
        p.squash(rect.left + rect.width / 2, rect.top + rect.height / 2);
      });

      // Damage active rat boss by 2 HP
      const rats = this.pests.filter(p => p.type === 'rat');
      rats.forEach(r => {
        const rect = r.dom.getBoundingClientRect();
        r.squash(rect.left + rect.width / 2, rect.top + rect.height / 2);
      });

      this.createScorePopup(x, y, '💨 ЗАЧИСТКА ДИХЛОФОСОМ! +50');
      this.registerHit(50, x, y, true);
    }

    onPestKilled(pest, x, y) {
      this.sound.playSlap();
      this.sound.playSplat();

      if (pest.type === 'fly') {
        this.fliesKilled++;
      } else if (pest.type === 'cockroach') {
        this.roachesKilled++;
      }

      this.createSplat(x, y);
      const points = pest.points * (this.combo > 1 ? this.combo : 1);
      this.createScorePopup(x, y, `+${points}${this.combo > 1 ? ` (${this.combo}x)` : ''}`);

      this.registerHit(pest.points, x, y, false);

      this.pests = this.pests.filter(p => p !== pest);

      // Auto trigger boss if player killed 10 pests and boss hasn't spawned yet
      if (this.fliesKilled + this.roachesKilled >= 10 && !this.bossSpawnedThisRound) {
        this.bossSpawnedThisRound = true;
        this.spawnBoss();
      }

      // Replenish board if too few pests remain
      if (this.pests.length < 3) {
        setTimeout(() => {
          if (this.state === 'PLAYING') {
            this.spawnPest(Math.random() < 0.5 ? 'fly' : 'cockroach');
          }
        }, 300);
      }

      this.updateHud();
    }

    createSplat(x, y) {
      const splat = document.createElement('div');
      splat.className = 'pest-splat';
      splat.innerHTML = SPRITES.splat;
      splat.style.left = `${x}px`;
      splat.style.top = `${y}px`;
      this.overlay.appendChild(splat);

      setTimeout(() => {
        splat.remove();
      }, 1800);
    }

    createScorePopup(x, y, text) {
      const popup = document.createElement('div');
      popup.className = 'pest-score-popup';
      popup.textContent = text;
      popup.style.left = `${x}px`;
      popup.style.top = `${y}px`;
      this.overlay.appendChild(popup);

      setTimeout(() => {
        popup.remove();
      }, 850);
    }

    updateHud() {
      if (this.hudScore) {
        this.hudScore.textContent = this.score;
      }
      if (this.hudTimer) {
        const secs = Math.ceil(this.timeLeft);
        const mins = Math.floor(secs / 60);
        const rem = secs % 60;
        this.hudTimer.textContent = `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
        if (secs <= 5 && secs > 0) {
          this.hudTimer.classList.add('is-warning');
        } else {
          this.hudTimer.classList.remove('is-warning');
        }
      }
    }

    endGame() {
      this.state = 'ENDED';
      this.sound.playVictory();
      this.clearAllPests();

      if (this.hudCombo) this.hudCombo.style.display = 'none';
      if (this.bossAlert) this.bossAlert.style.display = 'none';

      // Populate results modal
      if (this.resScore) this.resScore.textContent = this.score;
      if (this.resFlies) this.resFlies.textContent = this.fliesKilled;
      if (this.resRoaches) this.resRoaches.textContent = this.roachesKilled;
      if (this.resRats) this.resRats.textContent = this.ratsKilled;

      // Custom badge if rat boss was killed
      const badge = document.querySelector('.pest-card-badge');
      const title = document.querySelector('.pest-card-title');
      if (this.ratsKilled > 0) {
        if (badge) badge.textContent = '👑 БОСС ПОВЕРЖЕН!';
        if (title) title.textContent = 'Объект полностью зачищен!';
      } else {
        if (badge) badge.textContent = '🏆 Миссия выполнена!';
        if (title) title.textContent = 'Объект зачищен!';
      }

      if (this.resultModal) {
        this.resultModal.classList.add('is-open');
      }
    }

    closeModal() {
      if (this.resultModal) {
        this.resultModal.classList.remove('is-open');
      }
    }

    stopGameOverlay() {
      this.state = 'IDLE';
      this.clearAllPests();
      this.overlay.classList.remove('is-active', 'cursor-swatter');
      document.body.style.overflow = '';
    }

    clearAllPests() {
      this.pests.forEach(p => p.dom.remove());
      this.pests = [];
    }

    // =======================================================================
    // 5. Sandbox Dev & Tuning Panel
    // =======================================================================
    initSandboxControls() {
      const toggleBtn = document.getElementById('sandboxToggle');
      const panel = document.getElementById('sandboxPanel');
      if (!toggleBtn || !panel) return;

      toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('is-open');
      });

      // Bind Sliders
      const bindSlider = (id, valId, key, formatFn) => {
        const input = document.getElementById(id);
        const display = document.getElementById(valId);
        if (!input || !display) return;
        input.value = this.config[key];
        display.textContent = formatFn ? formatFn(input.value) : input.value;

        input.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          this.config[key] = val;
          display.textContent = formatFn ? formatFn(val) : val;
        });
      };

      bindSlider('cfgFlyInterval', 'valFlyInterval', 'flySpawnInterval', v => `${v}s`);
      bindSlider('cfgRoachInterval', 'valRoachInterval', 'roachSpawnInterval', v => `${v}s`);
      bindSlider('cfgMaxPests', 'valMaxPests', 'maxPests', v => v);
      bindSlider('cfgSpeed', 'valSpeed', 'speedMultiplier', v => `${v}x`);
      bindSlider('cfgDuration', 'valDuration', 'gameDuration', v => `${v}s`);
      bindSlider('cfgRatHp', 'valRatHp', 'ratHp', v => `${v}`);

      // Action buttons
      const btnAddFlies = document.getElementById('sbAddFlies');
      if (btnAddFlies) {
        btnAddFlies.addEventListener('click', () => {
          if (this.state !== 'PLAYING') this.startGame();
          for (let i = 0; i < 5; i++) this.spawnPest('fly');
        });
      }

      const btnAddRoaches = document.getElementById('sbAddRoaches');
      if (btnAddRoaches) {
        btnAddRoaches.addEventListener('click', () => {
          if (this.state !== 'PLAYING') this.startGame();
          for (let i = 0; i < 5; i++) this.spawnPest('cockroach');
        });
      }

      const btnSpawnBoss = document.getElementById('sbSpawnBoss');
      if (btnSpawnBoss) {
        btnSpawnBoss.addEventListener('click', () => {
          if (this.state !== 'PLAYING') this.startGame();
          this.spawnBoss();
        });
      }

      const btnSpawnSpray = document.getElementById('sbSpawnSpray');
      if (btnSpawnSpray) {
        btnSpawnSpray.addEventListener('click', () => {
          if (this.state !== 'PLAYING') this.startGame();
          this.spawnPest('spray');
        });
      }

      const btnKillAll = document.getElementById('sbKillAll');
      if (btnKillAll) {
        btnKillAll.addEventListener('click', () => {
          const pestsToKill = [...this.pests];
          pestsToKill.forEach(p => {
            const rect = p.dom.getBoundingClientRect();
            p.squash(rect.left + rect.width / 2, rect.top + rect.height / 2);
          });
        });
      }

      const btnTestModal = document.getElementById('sbTestModal');
      if (btnTestModal) {
        btnTestModal.addEventListener('click', () => {
          this.fliesKilled = 12;
          this.roachesKilled = 8;
          this.ratsKilled = 1;
          this.score = 380;
          this.endGame();
        });
      }

      // Viewport Switcher
      const vpBtns = document.querySelectorAll('.sandbox-vp-btn');
      vpBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          vpBtns.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');

          const mode = btn.dataset.vp;
          if (this.viewportWrapper) {
            this.viewportWrapper.classList.remove('vp-tablet', 'vp-mobile');
            if (mode === 'tablet') this.viewportWrapper.classList.add('vp-tablet');
            if (mode === 'mobile') this.viewportWrapper.classList.add('vp-mobile');
          }
        });
      });
    }
  }

  // Self initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__pestHunterGame = new PestHunterGame();
    });
  } else {
    window.__pestHunterGame = new PestHunterGame();
  }
})();
