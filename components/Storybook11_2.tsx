import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';

interface StorybookProps {
  onBack: () => void;
}

export const Storybook11_2: React.FC<StorybookProps> = ({ onBack }) => {
  const title = "One in four regrets messages on social networking sites";
  const subhead = "More than a quarter of all users of Twitter and other social networking sites send messages they later regret, according to research.";
  
  const p1 = "The fact that the communication is not face-to-face makes people online more likely to criticize and insult each other, a survey of 2,000 people has found.";
  const p2 = "While social media websites are becoming places for people to stand up for what they believe in, people can also often feel they shouldn’t have pressed the ‘send’ button so quickly.";
  const p3 = "More than half (55%) of the 2,000 people surveyed said that they felt social media had replaced face-to-face interaction; and nearly two in five (39%) people said they used social media to speak up about something they felt passionate about. Of these 39%, nearly half (44%) believed what they said had made a real difference because it led to people blogging or tweeting about the issue, or actual changes being made.";
  const p4 = "However, social media does have some problems. More than a quarter (26%) admitted they have said something nasty on a social media website they would never say to someone’s face.";
  const p5 = "Some 44% of those regretted it because what they said had been rude, while 27% regretted it because they thought it had upset someone.";
  const p6 = "The research also revealed that online bullying was a serious problem, with more than a third (36%) having seen someone become a victim of online bullying or been one themselves.";
  const p7 = "Professor Adrian Dunbar said: ‘Our research has shown that people are more likely to say something on social media that they later regret, because in these digital environments we don’t receive the immediate feedback that we get during face-to-face interactions. This can therefore result in a careless or unpleasant tweet, or at worst, cyberbullying.’";

  const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} — Comic Book</title>
  <style>
    :root {
      --ink:#121212;
      --paper:#fbf7ef;
      --panel:#ffffff;
      --accent:#ffb000;
      --accent2:#3b82f6;
      --muted:#6b7280;
      --border:4px solid var(--ink);
    }
    *{{box-sizing:border-box}}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "DejaVu Sans", sans-serif;
      background:
        radial-gradient(circle at 25px 25px, rgba(18,18,18,.06) 2px, transparent 2.5px) 0 0/20px 20px,
        radial-gradient(circle at 15px 15px, rgba(18,18,18,.05) 1.5px, transparent 2px) 0 0/18px 18px,
        var(--paper);
      color:var(--ink);
    }
    .book {
      max-width: 100%;
      margin: 0 auto;
      padding: 18px;
    }
    .page {
      background: linear-gradient(180deg, rgba(255,176,0,.10), rgba(59,130,246,.05));
      border: var(--border);
      border-radius: 18px;
      padding: 16px;
      margin: 16px auto 28px;
      box-shadow: 0 18px 0 rgba(18,18,18,.08);
      position: relative;
      overflow: hidden;
      max-width: 1000px;
    }
    .page:before {
      content:"";
      position:absolute;
      inset:-40px;
      background:
        radial-gradient(circle at 30% 20%, rgba(255,176,0,.22), transparent 55%),
        radial-gradient(circle at 80% 60%, rgba(59,130,246,.16), transparent 60%);
      pointer-events:none;
    }
    .page > * { position: relative; }
    .page-number {
      position:absolute;
      right: 14px;
      bottom: 10px;
      font-weight: 800;
      background: var(--panel);
      padding: 4px 10px;
      border: 3px solid var(--ink);
      border-radius: 999px;
      z-index: 2;
    }
    .cover {
      display:grid;
      grid-template-columns: 1fr;
      gap: 14px;
      align-items: stretch;
    }
    @media (min-width: 768px) {
      .cover { grid-template-columns: 1.2fr .8fr; }
    }
    .cover h1 {
      margin: 0 0 10px;
      font-size: clamp(28px, 3.2vw, 44px);
      line-height: 1.02;
      letter-spacing: -.02em;
      text-transform: none;
    }
    .cover .subhead {
      margin: 0;
      font-size: 18px;
      color: var(--ink);
      opacity: .92;
      line-height: 1.35;
      padding: 10px 12px;
      background: rgba(255,255,255,.85);
      border: 3px solid var(--ink);
      border-radius: 16px;
    }
    .cover .art {
      background: rgba(255,255,255,.85);
      border: var(--border);
      border-radius: 16px;
      padding: 12px;
      display:flex;
      align-items:center;
      justify-content:center;
      min-height: 220px;
    }
    .grid {
      display:grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    @media (min-width: 640px) {
      .grid { grid-template-columns: repeat(2, 1fr); }
    }
    .panel {
      background: rgba(255,255,255,.92);
      border: var(--border);
      border-radius: 16px;
      padding: 12px;
      min-height: 240px;
      position: relative;
      overflow: hidden;
    }
    .panel svg { width: 100%; height: auto; max-height: 300px; display: block; margin: 0 auto; }
    .panel .caption {
      position:absolute;
      left: 10px;
      right: 10px;
      bottom: 10px;
      background: rgba(255,255,255,.96);
      border: 3px solid var(--ink);
      border-radius: 14px;
      padding: 10px 12px;
      font-size: 14px;
      line-height: 1.35;
    }
    .panel .caption strong { font-weight: 900; }
    .bubble {
      position:absolute;
      left: 12px;
      top: 12px;
      max-width: 90%;
      background: #fff;
      border: 3px solid var(--ink);
      border-radius: 18px;
      padding: 10px 12px;
      font-weight: 700;
      line-height: 1.25;
      box-shadow: 0 8px 0 rgba(18,18,18,.10);
      z-index: 5;
    }
    .bubble:after {
      content:"";
      position:absolute;
      left: 18px;
      bottom: -14px;
      width: 0;
      height: 0;
      border: 14px solid transparent;
      border-top-color: var(--ink);
      transform: translateY(2px);
    }
    .bubble:before {
      content:"";
      position:absolute;
      left: 20px;
      bottom: -11px;
      width: 0;
      height: 0;
      border: 12px solid transparent;
      border-top-color: #fff;
      z-index: 1;
    }
    .bubble.small {
      font-size: 14px;
      font-weight: 800;
    }
    .note {
      font-size: 13px;
      color: var(--muted);
      margin: 10px 0 0;
    }
    .wide {
      grid-column: 1 / -1;
      min-height: 290px;
    }
    .quote {
      font-style: italic;
      font-weight: 700;
      font-size: 16px;
    }

    /* RESPONSIVE CSS */
    @media (max-width: 640px) {
      .book { padding: 12px; }
      .page { padding: 12px; margin: 12px 0 24px; }
      .panel { min-height: 280px; } /* Taller panels on mobile for stacking */
      .cover h1 { font-size: 28px; }
      .panel .caption { position: static; margin-top: 10px; }
    }

    /* print */
    @media print {
      body { background: #fff; }
      .book { padding: 0; max-width: none; }
      .page { break-after: page; page-break-after: always; box-shadow:none; margin:0; border-radius: 0; }
      .page:before { display:none; }
    }
  </style>
</head>
<body>
  <div class="book">

    <!-- PAGE 1: COVER -->
    <section class="page">
      <div class="page-number">1</div>
      <div class="cover">
        <div>
          <h1>${title}</h1>
          <p class="subhead">${subhead}</p>
          <p class="note">Comic layout with original text embedded verbatim.</p>
        </div>
        <div class="art" aria-label="Cover art">
          <svg viewBox="0 0 420 260" role="img" aria-label="Send button cover cartoon">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="0" flood-color="#121212" flood-opacity=".22"/>
              </filter>
              <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.3" fill="rgba(18,18,18,.18)"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="420" height="260" rx="18" fill="url(#dots)" opacity=".35"/>
            <rect x="50" y="70" width="250" height="90" rx="18" fill="#ffffff" stroke="#121212" stroke-width="6" filter="url(#shadow)"/>
            <text x="85" y="130" font-size="54" font-family="Georgia, serif" fill="#121212" font-weight="700">send it</text>
            <polygon points="305,152 345,195 332,204 314,180 300,210 290,206 304,176 278,176" fill="#121212"/>
            <rect x="320" y="88" width="58" height="58" rx="16" fill="rgba(255,176,0,.28)" stroke="#121212" stroke-width="6"/>
            <text x="332" y="125" font-size="26" font-family="Arial" font-weight="900" fill="#121212">!</text>
            <path d="M75 200 C135 165, 205 165, 265 200" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <circle cx="140" cy="205" r="6" fill="#121212"/>
            <circle cx="220" cy="205" r="6" fill="#121212"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- PAGE 2 -->
    <section class="page">
      <div class="page-number">2</div>
      <div class="grid">
        <div class="panel">
          <div class="bubble">Online chat vs. face-to-face</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="Online vs face-to-face cartoon">
            <rect x="12" y="18" width="185" height="220" rx="16" fill="rgba(59,130,246,.12)" stroke="#121212" stroke-width="6"/>
            <rect x="223" y="18" width="185" height="220" rx="16" fill="rgba(255,176,0,.14)" stroke="#121212" stroke-width="6"/>
            <!-- phone -->
            <rect x="42" y="52" width="125" height="160" rx="16" fill="#fff" stroke="#121212" stroke-width="6"/>
            <circle cx="105" cy="197" r="6" fill="#121212"/>
            <text x="62" y="98" font-size="22" font-family="Arial" font-weight="900" fill="#121212">...</text>
            <text x="62" y="132" font-size="20" font-family="Arial" font-weight="900" fill="#121212">💬</text>
            <text x="62" y="164" font-size="20" font-family="Arial" font-weight="900" fill="#121212">⚡</text>
            <!-- two people -->
            <circle cx="270" cy="90" r="24" fill="#fff" stroke="#121212" stroke-width="6"/>
            <circle cx="360" cy="90" r="24" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M250 205 C255 145, 290 135, 300 115 C310 135, 345 145, 350 205" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M340 205 C345 145, 380 135, 390 115 C400 135, 410 150, 410 205" fill="none" stroke="#121212" stroke-width="0"/>
            <path d="M315 135 C318 148, 312 160, 300 165" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M316 135 C314 148, 320 160, 332 165" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <!-- speech lines -->
            <path d="M292 70 C300 55, 318 55, 326 70" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
          </svg>
          <div class="caption">${p1}</div>
        </div>

        <div class="panel">
          <div class="bubble small">The keyboard is faster than the brain.</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="Typing and reactions cartoon">
            <rect x="24" y="24" width="372" height="212" rx="18" fill="rgba(18,18,18,.04)" stroke="#121212" stroke-width="6"/>
            <!-- laptop -->
            <rect x="78" y="70" width="170" height="92" rx="12" fill="#fff" stroke="#121212" stroke-width="6"/>
            <rect x="64" y="164" width="198" height="24" rx="10" fill="#fff" stroke="#121212" stroke-width="6"/>
            <rect x="274" y="98" width="110" height="76" rx="16" fill="rgba(255,176,0,.25)" stroke="#121212" stroke-width="6"/>
            <text x="292" y="145" font-size="22" font-family="Arial" font-weight="900" fill="#121212">SEND</text>
            <path d="M285 182 L330 212" stroke="#121212" stroke-width="8" stroke-linecap="round"/>
            <circle cx="343" cy="220" r="10" fill="#121212"/>
            <text x="92" y="105" font-size="18" font-family="Arial" font-weight="900" fill="#121212">critique</text>
            <text x="92" y="132" font-size="18" font-family="Arial" font-weight="900" fill="#121212">insult</text>
          </svg>
          <div class="caption">${p1}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 3 -->
    <section class="page">
      <div class="page-number">3</div>
      <div class="grid">
        <div class="panel wide">
          <div class="bubble">“Stand up for what you believe in” — but…</div>
          <svg viewBox="0 0 900 260" role="img" aria-label="Beliefs and send button cartoon">
            <rect x="16" y="16" width="868" height="228" rx="18" fill="rgba(59,130,246,.10)" stroke="#121212" stroke-width="6"/>
            <!-- person with megaphone -->
            <circle cx="140" cy="90" r="28" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M110 200 C120 140, 150 130, 160 110 C170 130, 205 140, 215 200" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <polygon points="195,110 265,92 265,126" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M270 92 C300 82, 320 92, 330 110" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M270 126 C300 136, 320 126, 330 110" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <!-- giant send button -->
            <rect x="520" y="72" width="300" height="88" rx="18" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="560" y="128" font-size="44" font-family="Georgia, serif" fill="#121212" font-weight="700">send</text>
            <polygon points="770,134 820,190 804,202 782,172 766,212 754,206 770,170 740,170" fill="#121212"/>
            <!-- thought bubble -->
            <circle cx="440" cy="66" r="18" fill="#fff" stroke="#121212" stroke-width="6"/>
            <circle cx="470" cy="46" r="14" fill="#fff" stroke="#121212" stroke-width="6"/>
            <circle cx="500" cy="34" r="10" fill="#fff" stroke="#121212" stroke-width="6"/>
            <rect x="350" y="82" width="180" height="72" rx="18" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="370" y="112" font-size="18" font-family="Arial" font-weight="900" fill="#121212">Think…</text>
            <text x="370" y="136" font-size="18" font-family="Arial" font-weight="900" fill="#121212">before “send”</text>
          </svg>
          <div class="caption">${p2}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 4 -->
    <section class="page">
      <div class="page-number">4</div>
      <div class="grid">
        <div class="panel">
          <div class="bubble">55%: “Online replaced face-to-face”</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="55 percent cartoon">
            <rect x="18" y="18" width="384" height="224" rx="18" fill="rgba(255,176,0,.14)" stroke="#121212" stroke-width="6"/>
            <circle cx="120" cy="110" r="26" fill="#fff" stroke="#121212" stroke-width="6"/>
            <circle cx="260" cy="110" r="26" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M95 208 C105 155, 132 145, 140 130 C148 145, 175 155, 185 208" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M235 208 C245 155, 272 145, 280 130 C288 145, 315 155, 325 208" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M180 78 L220 78" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <text x="62" y="76" font-size="18" font-family="Arial" font-weight="900" fill="#121212">face-to-face</text>
            <text x="210" y="76" font-size="18" font-family="Arial" font-weight="900" fill="#121212">online</text>
            <rect x="44" y="34" width="120" height="26" rx="10" fill="#fff" stroke="#121212" stroke-width="4"/>
            <text x="60" y="53" font-size="16" font-family="Arial" font-weight="900" fill="#121212">55%</text>
          </svg>
          <div class="caption">${p3}</div>
        </div>
        <div class="panel">
          <div class="bubble">39%: speaking up (and 44% felt it mattered)</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="39 and 44 percent cartoon">
            <rect x="18" y="18" width="384" height="224" rx="18" fill="rgba(59,130,246,.12)" stroke="#121212" stroke-width="6"/>
            <circle cx="120" cy="100" r="26" fill="#fff" stroke="#121212" stroke-width="6"/>
            <polygon points="150,104 220,86 220,122" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M220 104 C250 92, 270 96, 286 104" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <rect x="262" y="60" width="120" height="64" rx="16" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="282" y="95" font-size="22" font-family="Arial" font-weight="900" fill="#121212">BLOG</text>
            <rect x="52" y="34" width="120" height="26" rx="10" fill="#fff" stroke="#121212" stroke-width="4"/>
            <text x="64" y="53" font-size="16" font-family="Arial" font-weight="900" fill="#121212">39%</text>
            <rect x="242" y="34" width="120" height="26" rx="10" fill="#fff" stroke="#121212" stroke-width="4"/>
            <text x="254" y="53" font-size="16" font-family="Arial" font-weight="900" fill="#121212">44%</text>
            <path d="M80 210 L330 210" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <text x="92" y="236" font-size="14" font-family="Arial" font-weight="900" fill="#121212">tweeting → change</text>
          </svg>
          <div class="caption">${p3}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 5 -->
    <section class="page">
      <div class="page-number">5</div>
      <div class="grid">
        <div class="panel wide">
          <div class="bubble">Stats spill into real life</div>
          <svg viewBox="0 0 900 260" role="img" aria-label="Social media effects cartoon">
            <rect x="16" y="16" width="868" height="228" rx="18" fill="rgba(18,18,18,.03)" stroke="#121212" stroke-width="6"/>
            <!-- feed -->
            <rect x="60" y="52" width="260" height="170" rx="16" fill="#fff" stroke="#121212" stroke-width="6"/>
            <rect x="86" y="78" width="210" height="16" rx="8" fill="rgba(18,18,18,.12)"/>
            <rect x="86" y="108" width="190" height="16" rx="8" fill="rgba(18,18,18,.10)"/>
            <rect x="86" y="138" width="220" height="16" rx="8" fill="rgba(18,18,18,.10)"/>
            <rect x="86" y="168" width="140" height="16" rx="8" fill="rgba(18,18,18,.10)"/>
            <text x="90" y="210" font-size="14" font-family="Arial" font-weight="900" fill="#121212">“blogging / tweeting”</text>
            <!-- arrows to change -->
            <path d="M340 138 C420 138, 440 88, 520 88" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <polygon points="520,88 500,78 500,98" fill="#121212"/>
            <!-- change sign -->
            <rect x="540" y="50" width="300" height="86" rx="18" fill="rgba(255,176,0,.22)" stroke="#121212" stroke-width="6"/>
            <text x="565" y="102" font-size="28" font-family="Arial" font-weight="900" fill="#121212">actual changes</text>
            <!-- people -->
            <circle cx="610" cy="178" r="22" fill="#fff" stroke="#121212" stroke-width="6"/>
            <circle cx="700" cy="178" r="22" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M590 234 C596 206, 618 200, 622 188 C626 200, 648 206, 654 234" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M680 234 C686 206, 708 200, 712 188 C716 200, 738 206, 744 234" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
          </svg>
          <div class="caption">${p3}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 6 -->
    <section class="page">
      <div class="page-number">6</div>
      <div class="grid">
        <div class="panel">
          <div class="bubble">The “would you say this to their face?” test</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="Nasty message cartoon">
            <rect x="18" y="18" width="384" height="224" rx="18" fill="rgba(255,176,0,.12)" stroke="#121212" stroke-width="6"/>
            <rect x="62" y="58" width="160" height="140" rx="16" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="86" y="108" font-size="18" font-family="Arial" font-weight="900" fill="#121212">post</text>
            <text x="86" y="140" font-size="18" font-family="Arial" font-weight="900" fill="#121212">now</text>
            <rect x="248" y="58" width="110" height="70" rx="16" fill="rgba(18,18,18,.06)" stroke="#121212" stroke-width="6"/>
            <text x="270" y="100" font-size="22" font-family="Arial" font-weight="900" fill="#121212">😬</text>
            <circle cx="285" cy="175" r="22" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M258 232 C265 202, 288 196, 293 184 C298 196, 321 202, 328 232" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M298 165 C312 158, 320 160, 332 165" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
          </svg>
          <div class="caption">${p4}</div>
        </div>
        <div class="panel">
          <div class="bubble">26% admitted it.</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="26 percent badge cartoon">
            <rect x="18" y="18" width="384" height="224" rx="18" fill="rgba(59,130,246,.10)" stroke="#121212" stroke-width="6"/>
            <circle cx="210" cy="130" r="78" fill="#fff" stroke="#121212" stroke-width="8"/>
            <text x="175" y="145" font-size="44" font-family="Arial" font-weight="900" fill="#121212">26%</text>
            <path d="M110 64 L310 64" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M110 196 L310 196" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <rect x="60" y="206" width="300" height="36" rx="14" fill="rgba(255,176,0,.22)" stroke="#121212" stroke-width="6"/>
            <text x="88" y="232" font-size="16" font-family="Arial" font-weight="900" fill="#121212">“never say to someone’s face”</text>
          </svg>
          <div class="caption">${p4}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 7 -->
    <section class="page">
      <div class="page-number">7</div>
      <div class="grid">
        <div class="panel">
          <div class="bubble">Regret reasons</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="44 and 27 percent reasons cartoon">
            <rect x="18" y="18" width="384" height="224" rx="18" fill="rgba(255,176,0,.10)" stroke="#121212" stroke-width="6"/>
            <rect x="48" y="52" width="150" height="86" rx="16" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="74" y="104" font-size="26" font-family="Arial" font-weight="900" fill="#121212">44%</text>
            <text x="74" y="132" font-size="16" font-family="Arial" font-weight="900" fill="#121212">rude</text>
            <rect x="222" y="52" width="150" height="86" rx="16" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="250" y="104" font-size="26" font-family="Arial" font-weight="900" fill="#121212">27%</text>
            <text x="250" y="132" font-size="16" font-family="Arial" font-weight="900" fill="#121212">upset</text>
            <path d="M210 170 C170 150, 130 150, 90 170" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <text x="260" y="206" font-size="26" font-family="Arial" font-weight="900" fill="#121212">😔</text>
          </svg>
          <div class="caption">${p5}</div>
        </div>
        <div class="panel">
          <div class="bubble small">A message goes out… and you can’t “un-send” feelings.</div>
          <svg viewBox="0 0 420 260" role="img" aria-label="Message sent cartoon">
            <rect x="18" y="18" width="384" height="224" rx="18" fill="rgba(18,18,18,.03)" stroke="#121212" stroke-width="6"/>
            <rect x="54" y="70" width="150" height="120" rx="16" fill="#fff" stroke="#121212" stroke-width="6"/>
            <polygon points="68,84 129,128 190,84" fill="rgba(59,130,246,.14)" stroke="#121212" stroke-width="6"/>
            <path d="M210 128 C250 110, 270 110, 310 128" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <polygon points="310,128 288,118 288,138" fill="#121212"/>
            <circle cx="340" cy="160" r="26" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M316 216 C322 190, 342 184, 346 172 C350 184, 370 190, 376 216" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M330 152 C334 150, 346 150, 350 152" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <path d="M332 168 C340 172, 346 172, 354 168" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
          </svg>
          <div class="caption">${p5}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 8 -->
    <section class="page">
      <div class="page-number">8</div>
      <div class="grid">
        <div class="panel wide">
          <div class="bubble">Online bullying: seen or experienced</div>
          <svg viewBox="0 0 900 260" role="img" aria-label="Online bullying cartoon">
            <rect x="16" y="16" width="868" height="228" rx="18" fill="rgba(59,130,246,.10)" stroke="#121212" stroke-width="6"/>
            <!-- chat cloud -->
            <rect x="60" y="52" width="360" height="130" rx="18" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="92" y="96" font-size="18" font-family="Arial" font-weight="900" fill="#121212">...</text>
            <text x="92" y="126" font-size="18" font-family="Arial" font-weight="900" fill="#121212">!!!</text>
            <text x="92" y="156" font-size="18" font-family="Arial" font-weight="900" fill="#121212">???</text>
            <path d="M160 182 L140 210 L210 182" fill="#fff" stroke="#121212" stroke-width="6"/>
            <!-- victim -->
            <circle cx="560" cy="110" r="26" fill="#fff" stroke="#121212" stroke-width="6"/>
            <path d="M530 214 C540 160, 565 150, 574 132 C583 150, 610 160, 620 214" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <text x="650" y="128" font-size="40" font-family="Arial" font-weight="900" fill="#121212">36%</text>
            <rect x="640" y="154" width="210" height="56" rx="18" fill="rgba(255,176,0,.22)" stroke="#121212" stroke-width="6"/>
            <text x="660" y="190" font-size="18" font-family="Arial" font-weight="900" fill="#121212">victim of online bullying</text>
          </svg>
          <div class="caption">${p6}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 9 -->
    <section class="page">
      <div class="page-number">9</div>
      <div class="grid">
        <div class="panel wide">
          <div class="bubble">Professor Adrian Dunbar explains why regret happens</div>
          <svg viewBox="0 0 900 260" role="img" aria-label="Professor quote cartoon">
            <rect x="16" y="16" width="868" height="228" rx="18" fill="rgba(255,176,0,.10)" stroke="#121212" stroke-width="6"/>
            <!-- professor -->
            <circle cx="120" cy="110" r="30" fill="#fff" stroke="#121212" stroke-width="6"/>
            <rect x="82" y="144" width="76" height="22" rx="10" fill="rgba(18,18,18,.06)" stroke="#121212" stroke-width="6"/>
            <path d="M80 220 C88 176, 116 168, 120 156 C124 168, 152 176, 160 220" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round"/>
            <rect x="190" y="64" width="660" height="150" rx="18" fill="#fff" stroke="#121212" stroke-width="6"/>
            <text x="210" y="102" font-size="20" font-family="Arial" font-weight="900" fill="#121212">immediate feedback</text>
            <path d="M210 116 L820 116" stroke="rgba(18,18,18,.18)" stroke-width="4" stroke-linecap="round"/>
            <text x="210" y="148" font-size="18" font-family="Arial" font-weight="900" fill="#121212">face-to-face interactions</text>
            <path d="M210 162 L820 162" stroke="rgba(18,18,18,.18)" stroke-width="4" stroke-linecap="round"/>
            <text x="210" y="196" font-size="18" font-family="Arial" font-weight="900" fill="#121212">careless / unpleasant tweet → cyberbullying</text>
          </svg>
          <div class="caption quote">${p7}</div>
        </div>
      </div>
    </section>

    <!-- PAGE 10 -->
    <section class="page">
      <div class="page-number">10</div>
      <div class="grid">
        <div class="panel wide">
          <div class="bubble">Full text (verbatim)</div>
          <div style="padding:14px 10px 8px;">
            <div style="background:rgba(255,255,255,.92); border: var(--border); border-radius: 16px; padding: 14px;">
              <h2 style="margin:0 0 10px; font-size:22px; line-height:1.15;">${title}</h2>
              <p style="margin:0 0 10px; font-weight:700;">${subhead}</p>
              <p style="margin:0 0 10px;">${p1}</p>
              <p style="margin:0 0 10px;">${p2}</p>
              <p style="margin:0 0 10px;">${p3}</p>
              <p style="margin:0 0 10px;">${p4}</p>
              <p style="margin:0 0 10px;">${p5}</p>
              <p style="margin:0 0 10px;">${p6}</p>
              <p style="margin:0;">${p7}</p>
            </div>
          </div>
          <div class="caption">Print tip: In your browser, press Ctrl+P → “Save as PDF” to export the comic book.</div>
        </div>
      </div>
    </section>

  </div>
</body>
</html>`;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-900 flex flex-col animate-in fade-in duration-300">
      <div className="bg-black p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg border-b border-gray-800">
        <button 
          onClick={onBack} 
          className="text-white flex items-center gap-2 hover:text-noir-red transition-colors px-4 py-2 rounded-lg hover:bg-white/10 w-full sm:w-auto justify-center sm:justify-start touch-manipulation"
        >
          <ArrowLeft size={20} /> <span className="font-mono font-bold">BACK TO CASE FILE</span>
        </button>
        <span className="text-gray-500 font-mono text-xs md:text-sm hidden lg:inline">EVIDENCE #11-2-COMIC // SECURE VIEWER</span>
        <button 
           onClick={() => {
              const iframe = document.getElementById('storybook-frame') as HTMLIFrameElement;
              iframe?.contentWindow?.print();
           }}
           className="text-white flex items-center gap-2 hover:text-noir-tan transition-colors px-4 py-2 rounded-lg hover:bg-white/10 w-full sm:w-auto justify-center sm:justify-start touch-manipulation"
        >
          <Printer size={20} /> <span className="font-mono font-bold">PRINT EVIDENCE</span>
        </button>
      </div>
      <iframe 
        id="storybook-frame"
        srcDoc={htmlContent} 
        className="w-full flex-1 border-none bg-white"
        title="Comic Book Viewer"
      />
    </div>
  );
};