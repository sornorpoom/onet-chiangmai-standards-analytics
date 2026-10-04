const fs = require('fs');
const path = require('path');

const parsedData = JSON.parse(fs.readFileSync('data_parsed.json', 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="th" class="font-medium theme-indigo">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>O-NET Analytics Dashboard (2565 - 2568) | สำนักงานศึกษาธิการจังหวัด เชียงใหม่</title>
  
  <!-- Google Fonts: Prompt & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Prompt:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Chart.js & Datalabels Plugin -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Tailwind Custom Config -->
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Prompt"', '"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            brand: {
              50: 'var(--color-brand-50)',
              100: 'var(--color-brand-100)',
              200: 'var(--color-brand-200)',
              500: 'var(--color-brand-500)',
              600: 'var(--color-brand-600)',
              700: 'var(--color-brand-700)',
              800: 'var(--color-brand-800)',
              900: 'var(--color-brand-900)',
              accent: 'var(--color-brand-accent)',
            }
          }
        }
      }
    }
  </script>

  <style>
    /* CSS Variables for 2027 Trend Color Palettes with Soft Pastel Banner Backgrounds */
    :root {
      --font-scale: 1rem;
      --color-brand-50: #eef2ff;
      --color-brand-100: #e0e7ff;
      --color-brand-200: #c7d2fe;
      --color-brand-500: #6366f1;
      --color-brand-600: #4f46e5;
      --color-brand-700: #4338ca;
      --color-brand-800: #3730a3;
      --color-brand-900: #312e81;
      --color-brand-accent: #06b6d4;
      --theme-banner-bg: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ecfeff 100%);
      --theme-banner-border: #e0e7ff;
      --theme-banner-title: #1e1b4b;
      --theme-banner-sub: #4338ca;
      --theme-badge-bg: #e0e7ff;
      --theme-badge-text: #4338ca;
    }

    /* Theme 1: 2027 Digital Indigo (Soft Pastel Top Banner) */
    html.theme-indigo {
      --color-brand-50: #eef2ff;
      --color-brand-100: #e0e7ff;
      --color-brand-200: #c7d2fe;
      --color-brand-500: #6366f1;
      --color-brand-600: #4f46e5;
      --color-brand-700: #4338ca;
      --color-brand-800: #3730a3;
      --color-brand-900: #312e81;
      --color-brand-accent: #06b6d4;
      --theme-banner-bg: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ecfeff 100%);
      --theme-banner-border: #e0e7ff;
      --theme-banner-title: #1e1b4b;
      --theme-banner-sub: #4338ca;
      --theme-badge-bg: #e0e7ff;
      --theme-badge-text: #4338ca;
    }

    /* Theme 2: 2027 Neo Terracotta (Soft Pastel Warm Banner) */
    html.theme-terracotta {
      --color-brand-50: #fff7ed;
      --color-brand-100: #ffedd5;
      --color-brand-200: #fed7aa;
      --color-brand-500: #f97316;
      --color-brand-600: #ea580c;
      --color-brand-700: #c2410c;
      --color-brand-800: #9a3412;
      --color-brand-900: #7c2d12;
      --color-brand-accent: #eab308;
      --theme-banner-bg: linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fef3c7 100%);
      --theme-banner-border: #fed7aa;
      --theme-banner-title: #7c2d12;
      --theme-banner-sub: #9a3412;
      --theme-badge-bg: #ffedd5;
      --theme-badge-text: #c2410c;
    }

    /* Theme 3: 2027 Tech Teal (Soft Pastel Mint Banner) */
    html.theme-emerald {
      --color-brand-50: #f0fdf4;
      --color-brand-100: #dcfce7;
      --color-brand-200: #bbf7d0;
      --color-brand-500: #10b981;
      --color-brand-600: #059669;
      --color-brand-700: #047857;
      --color-brand-800: #065f46;
      --color-brand-900: #064e3b;
      --color-brand-accent: #0d9488;
      --theme-banner-bg: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%);
      --theme-banner-border: #bbf7d0;
      --theme-banner-title: #064e3b;
      --theme-banner-sub: #047857;
      --theme-badge-bg: #dcfce7;
      --theme-badge-text: #065f46;
    }

    /* Font Sizes */
    html.font-small { font-size: 14px; }
    html.font-medium { font-size: 16px; }
    html.font-large { font-size: 18.5px; }

    body {
      background-color: #f8fafc;
      color: #1e293b;
      transition: background-color 0.3s ease, color 0.3s ease, font-size 0.2s ease;
    }

    /* Standard Card Styling */
    .std-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 1.25rem;
      box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05);
      transition: all 0.25s ease;
    }
    .std-card:hover {
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
      border-color: #cbd5e1;
    }

    /* White Background Macro Card Styling */
    .macro-white-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 1.5rem;
      box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.06);
    }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">

  <!-- ================= TOP UTILITY & NAVIGATION BAR ================= -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Logo & Title -->
        <div class="flex items-center space-x-3 sm:space-x-4">
          <button id="btnHome" onclick="goHome()" class="flex items-center space-x-3 group text-left focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl p-1">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <i data-lucide="award" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">O-NET Trend Matrix</span>
                <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-brand-100 text-brand-700 border border-brand-200">2565-2568</span>
              </div>
              <p class="text-xs text-slate-500 hidden sm:block">สำนักงานศึกษาธิการจังหวัด เชียงใหม่ • วิเคราะห์คะแนนเฉลี่ยถ่วงน้ำหนักรายมาตรฐาน</p>
            </div>
          </button>
        </div>

        <!-- Customization Controls -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          
          <!-- Home Button (Desktop) -->
          <button onclick="goHome()" class="px-3.5 py-1.5 rounded-xl hover:text-brand-600 hover:bg-slate-100 transition hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-700 border border-slate-200">
            <i data-lucide="home" class="w-4 h-4 text-brand-600"></i> หน้าหลัก
          </button>

          <!-- Divider -->
          <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>

          <!-- Font Size Selector (เล็ก / กลาง / ใหญ่) -->
          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200" title="ปรับขนาดตัวอักษร">
            <button onclick="setFontSize('small')" id="btnFontSmall" class="px-2 py-1 text-xs font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900">ก-</button>
            <button onclick="setFontSize('medium')" id="btnFontMedium" class="px-2 py-1 text-xs font-semibold rounded-lg transition-all bg-white shadow-sm text-brand-700 font-bold">ก</button>
            <button onclick="setFontSize('large')" id="btnFontLarge" class="px-2 py-1 text-xs font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900">ก+</button>
          </div>

          <!-- 2027 Theme Selector (Clickable Dropdown) -->
          <div class="relative">
            <button onclick="toggleThemeDropdown(event)" id="btnThemeToggle" class="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition">
              <i data-lucide="palette" class="w-4 h-4 text-brand-600"></i>
              <span class="hidden sm:inline">ธีม 2027</span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 opacity-60"></i>
            </button>
            <div id="themeDropdownMenu" class="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 hidden z-50 animate-fadeIn">
              <div class="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">ชุดสีเทรนด์ 2027</div>
              <button onclick="setTheme('theme-indigo')" class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full bg-indigo-600 shadow-sm"></span>
                  Digital Indigo 2027
                </span>
                <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-600 theme-check-indigo"></i>
              </button>
              <button onclick="setTheme('theme-terracotta')" class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full bg-orange-600 shadow-sm"></span>
                  Neo Terracotta 2027
                </span>
                <i data-lucide="check" class="w-3.5 h-3.5 opacity-0 text-orange-600 theme-check-terracotta"></i>
              </button>
              <button onclick="setTheme('theme-emerald')" class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-sm"></span>
                  Tech Teal 2027
                </span>
                <i data-lucide="check" class="w-3.5 h-3.5 opacity-0 text-emerald-600 theme-check-emerald"></i>
              </button>
            </div>
          </div>

          <!-- Home Button (Mobile) -->
          <button onclick="goHome()" class="p-2 text-slate-600 hover:text-brand-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition sm:hidden" title="กลับหน้าหลัก">
            <i data-lucide="home" class="w-5 h-5"></i>
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- ================= TOP BANNER (SOFT PASTEL TINT CHANGING WITH THEME) ================= -->
  <section id="topBannerSection" class="border-b transition-all duration-300 py-6 px-4 sm:px-6 lg:px-8" style="background: var(--theme-banner-bg); border-color: var(--theme-banner-border);">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold transition-all" style="background: var(--theme-badge-bg); color: var(--theme-badge-text);">
            รายงานผล O-NET ปี 2565 - 2568
          </span>
          <span class="text-xs font-semibold text-slate-500">
            สำนักงานศึกษาธิการจังหวัด เชียงใหม่
          </span>
        </div>
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight transition-all" style="color: var(--theme-banner-title);">
          การวิเคราะห์แนวโน้มคะแนนเฉลี่ยถ่วงน้ำหนักรายมาตรฐานการเรียนรู้
        </h1>
        <p class="text-xs sm:text-sm font-medium mt-1 transition-all" style="color: var(--theme-banner-sub);">
          เจาะลึกพัฒนาการ 4 ปีการศึกษา จำแนกตามระดับชั้น สาระวิชา และสังกัดสถานศึกษา
        </p>
      </div>
    </div>
  </section>

  <!-- ================= SMART INTERACTIVE FILTER BAR ================= -->
  <section class="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        
        <!-- 1. Level Filter Tabs: P.6 (Blue) vs M.3 (Green) -->
        <div class="lg:col-span-3 flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button onclick="setLevelFilter('ป.6')" id="btnLevelP6" class="flex-1 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition text-white bg-blue-600 shadow-sm">
            ประถมศึกษาปีที่ 6 (ป.6)
          </button>
          <button onclick="setLevelFilter('ม.3')" id="btnLevelM3" class="flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition text-slate-600 hover:text-slate-900">
            มัธยมศึกษาปีที่ 3 (ม.3)
          </button>
        </div>

        <!-- 2. Subject Filter Dropdown (3 cols) -->
        <div class="lg:col-span-3">
          <select id="subjectSelect" onchange="handleSubjectChange()" class="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800">
            <option value="">-- เลือกวิชา --</option>
            <option value="คณิตศาสตร์">📐 คณิตศาสตร์</option>
            <option value="ภาษาไทย">🇹🇭 ภาษาไทย</option>
            <option value="ภาษาอังกฤษ">🇬🇧 ภาษาอังกฤษ</option>
            <option value="วิทยาศาสตร์">🔬 วิทยาศาสตร์</option>
          </select>
        </div>

        <!-- 3. Affiliation Filter Dropdown (3 cols) -->
        <div class="lg:col-span-3">
          <select id="affiliationSelect" onchange="handleAffiliationChange()" class="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800">
            <option value="">-- เลือกสังกัด --</option>
          </select>
        </div>

        <!-- 4. Standard Filter Dropdown -->
        <div class="lg:col-span-3">
          <select id="standardSelect" onchange="handleStandardChange()" class="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800">
            <option value="ทั้งหมด">-- ทุกมาตรฐานการเรียนรู้ --</option>
          </select>
        </div>

      </div>

    </div>
  </section>

  <!-- ================= MAIN CONTENT ================= -->
  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">

    <!-- EMPTY / PROMPT STATE (เริ่มต้นที่ ป.6 และให้เลือกระดับชั้น วิชา สังกัด) -->
    <div id="selectionPromptCard" class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-sm hidden">
      <div class="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto text-2xl">
        <i data-lucide="mouse-pointer-click" class="w-8 h-8"></i>
      </div>
      <h3 class="text-lg sm:text-xl font-extrabold text-slate-900">กรุณาเลือกระดับชั้น วิชา และสังกัดสถานศึกษา</h3>
      <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
        เพื่อเริ่มต้นการวิเคราะห์แนวโน้มคะแนนเฉลี่ยถ่วงน้ำหนักและแสดงสารสนเทศรายมาตรฐานการเรียนรู้ O-NET (2565 - 2568)
      </p>
      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <button onclick="quickSelect('ป.6', 'คณิตศาสตร์', 'สำนักงานศึกษาธิการจังหวัด เชียงใหม่')" class="px-4 py-2 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl border border-blue-200 transition">
          ดูตัวอย่าง: ป.6 คณิตศาสตร์ (ภาพรวมจังหวัด)
        </button>
        <button onclick="quickSelect('ม.3', 'ภาษาอังกฤษ', 'สำนักงานศึกษาธิการจังหวัด เชียงใหม่')" class="px-4 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition">
          ดูตัวอย่าง: ม.3 ภาษาอังกฤษ (ภาพรวมจังหวัด)
        </button>
      </div>
    </div>

    <!-- MAIN DASHBOARD CONTENT AREA -->
    <div id="dashboardContentArea" class="space-y-10">
      
      <!-- 1. HEADER SECTION -->
      <section class="space-y-1 border-l-4 border-brand-600 pl-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-md bg-brand-100 text-brand-600 flex items-center justify-center">
            <i data-lucide="line-chart" class="w-4 h-4"></i>
          </div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight" id="mainSectionTitle">
            แนวโน้มคะแนนเฉลี่ยถ่วงน้ำหนักและการวิเคราะห์รายมาตรฐานสาระการเรียนรู้ (2565 - 2568)
          </h2>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 font-normal">
          ค่าเฉลี่ยจะปรากฏลอยเด่นชัดอยู่บนจุดหมุดในแต่ละปีการศึกษาเพื่อสะท้อนพัฒนาการที่ชัดเจน
        </p>
      </section>

      <!-- 2. INDIVIDUAL STANDARDS TREND CARDS GRID -->
      <section>
        <div id="standardsCardsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Dynamic Cards Injected via JS -->
        </div>
      </section>

      <!-- 3. MACRO TREND ANALYSIS & ACTION PLAN (White Background) -->
      <section id="macroAnalysisSection">
        <div class="macro-white-card p-6 sm:p-8 space-y-6">
          
          <!-- Header -->
          <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div class="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-extrabold text-base tracking-wider border border-brand-200" id="macroBadgeCode">
              GB
            </div>
            <div>
              <h3 class="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                บทสรุปและข้อเสนอแนะเชิงลึกทางการศึกษา (Macro Trend Analysis)
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 font-normal">
                ประมวลผลและสกัดภาพรวมเฉลี่ยสะสมของกลุ่มโรงเรียนตามเงื่อนไขที่ท่านเลือก
              </p>
            </div>
          </div>

          <!-- 3 Columns Inside -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <!-- Column 1: Highlights (จุดแข็ง) -->
            <div class="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
              <div class="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span id="macroHighlightTitle">จุดแข็งกระบวนการสาระ (Highlights)</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal" id="macroHighlightText">
                กำลังประมวลผล...
              </p>
            </div>

            <!-- Column 2: Critical Areas (จุดวิกฤตที่สมควรได้รับการเร่งพัฒนา) -->
            <div class="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 space-y-3">
              <div class="flex items-center gap-2 text-amber-800 font-bold text-sm sm:text-base">
                <span class="text-amber-600 font-extrabold text-base">⚠</span>
                <span id="macroCriticalTitle">จุดวิกฤตที่สมควรได้รับการเร่งพัฒนา (Critical Areas)</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal" id="macroCriticalText">
                กำลังประมวลผล...
              </p>
            </div>

            <!-- Column 3: Action Plan (แผนปฏิบัติการนโยบายรายสถานศึกษา) -->
            <div class="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 space-y-3">
              <div class="flex items-center gap-2 text-rose-800 font-bold text-sm sm:text-base">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>แผนปฏิบัติการนโยบายรายสถานศึกษา (Action Plan)</span>
              </div>
              <div class="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal space-y-2" id="macroActionPlanText">
                <!-- Dynamically generated action plan points -->
              </div>
            </div>

          </div>

        </div>

        <!-- 4. DISCLAIMER NOTE -->
        <div class="mt-4 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs sm:text-sm flex items-start gap-2.5">
          <i data-lucide="info" class="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0"></i>
          <span>
            <strong>หมายเหตุ:</strong> สารสนเทศด้านบนคือ ผลการวิเคราะห์ที่เกิดจากการประยุกต์ใช้ปัญญาประดิษฐ์ สารสนเทศอาจมีความคลาดเคลื่อนได้ ผู้ใช้ต้องตรวจสอบความถูกต้องอีกครั้ง
          </span>
        </div>
      </section>

    </div>

  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="bg-white border-t border-slate-200 mt-16 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white text-[10px] font-bold">ONET</div>
        <span class="font-semibold text-slate-700">ระบบรายงานสารสนเทศ O-NET สำนักงานศึกษาธิการจังหวัด เชียงใหม่</span>
      </div>
      <div>
        รองรับการแสดงผลทุกอุปกรณ์ (Responsive UX/UI) • พร้อมนำขึ้น GitHub และเชื่อมต่อ Vercel
      </div>
    </div>
  </footer>

  <!-- ================= EMBEDDED DATASET & SCRIPT ================= -->
  <script>
    // Register ChartDataLabels plugin globally
    Chart.register(ChartDataLabels);

    const MASTER_DATA = ${JSON.stringify(parsedData.records)};
    const STANDARD_DESCRIPTIONS = ${JSON.stringify(parsedData.standardDescriptions)};

    // Initial State: Start at ป.6, Subject and Affiliation empty
    let currentLevel = 'ป.6';
    let currentSubject = ''; 
    let currentAffiliation = ''; 
    let currentStandard = 'ทั้งหมด';

    // Chart instances store
    const chartInstances = {};

    const SUBJECT_CODES = {
      'ภาษาอังกฤษ': 'GB',
      'คณิตศาสตร์': 'MA',
      'ภาษาไทย': 'TH',
      'วิทยาศาสตร์': 'SC'
    };

    // Close theme dropdown when clicked outside
    document.addEventListener('click', function(e) {
      const toggleBtn = document.getElementById('btnThemeToggle');
      const menu = document.getElementById('themeDropdownMenu');
      if (toggleBtn && menu && !toggleBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      initThemeAndFont();
      updateLevelButtonUI();
      populateAffiliationDropdown();
      populateStandardDropdown();
      renderDashboard();
    });

    // Theme Selector Dropdown Toggle
    function toggleThemeDropdown(event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('themeDropdownMenu');
      if (menu) {
        menu.classList.toggle('hidden');
      }
    }

    function setTheme(themeClass) {
      document.documentElement.classList.remove('theme-indigo', 'theme-terracotta', 'theme-emerald');
      document.documentElement.classList.add(themeClass);

      // Hide menu after selection
      const menu = document.getElementById('themeDropdownMenu');
      if (menu) menu.classList.add('hidden');

      // Update check icons
      document.querySelectorAll('.theme-check-indigo, .theme-check-terracotta, .theme-check-emerald').forEach(el => el.classList.add('opacity-0'));
      const activeCheck = document.querySelector('.theme-check-' + themeClass.replace('theme-', ''));
      if (activeCheck) activeCheck.classList.remove('opacity-0');

      renderDashboard();
    }

    function setFontSize(size) {
      document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
      document.documentElement.classList.add('font-' + size);

      const btns = { small: 'btnFontSmall', medium: 'btnFontMedium', large: 'btnFontLarge' };
      Object.keys(btns).forEach(k => {
        const el = document.getElementById(btns[k]);
        if (k === size) {
          el.className = 'px-2 py-1 text-xs font-bold rounded-lg transition-all bg-white shadow-sm text-brand-700';
        } else {
          el.className = 'px-2 py-1 text-xs font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900';
        }
      });
    }

    function initThemeAndFont() {
      setTheme('theme-indigo');
      setFontSize('medium');
    }

    // Level Button Active UI (P6 Blue, M3 Green)
    function updateLevelButtonUI() {
      const btnP6 = document.getElementById('btnLevelP6');
      const btnM3 = document.getElementById('btnLevelM3');

      if (currentLevel === 'ป.6') {
        btnP6.className = 'flex-1 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition text-white bg-blue-600 shadow-sm';
        btnM3.className = 'flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition text-slate-600 hover:text-slate-900';
      } else {
        btnP6.className = 'flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition text-slate-600 hover:text-slate-900';
        btnM3.className = 'flex-1 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition text-white bg-emerald-600 shadow-sm';
      }
    }

    // Reset to Home: Starts at P.6 with empty subject & affiliation
    function goHome() {
      currentLevel = 'ป.6';
      currentSubject = '';
      currentAffiliation = '';
      currentStandard = 'ทั้งหมด';

      updateLevelButtonUI();
      document.getElementById('subjectSelect').value = '';

      populateAffiliationDropdown();
      populateStandardDropdown();
      renderDashboard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function quickSelect(lvl, subj, aff) {
      currentLevel = lvl;
      currentSubject = subj;
      currentAffiliation = aff;
      currentStandard = 'ทั้งหมด';

      updateLevelButtonUI();
      document.getElementById('subjectSelect').value = subj;
      populateAffiliationDropdown();
      document.getElementById('affiliationSelect').value = aff;
      populateStandardDropdown();
      renderDashboard();
    }

    function setLevelFilter(lvl) {
      currentLevel = lvl;
      updateLevelButtonUI();
      populateAffiliationDropdown();
      populateStandardDropdown();
      renderDashboard();
    }

    function handleSubjectChange() {
      currentSubject = document.getElementById('subjectSelect').value;
      populateStandardDropdown();
      renderDashboard();
    }

    function handleAffiliationChange() {
      currentAffiliation = document.getElementById('affiliationSelect').value;
      renderDashboard();
    }

    function handleStandardChange() {
      currentStandard = document.getElementById('standardSelect').value;
      renderDashboard();
    }

    // Dynamically populate affiliations available for current level
    function populateAffiliationDropdown() {
      const select = document.getElementById('affiliationSelect');
      const filtered = MASTER_DATA.filter(r => r.level === currentLevel);
      const uniqueAffils = [...new Set(filtered.map(r => r.affiliation))];

      let html = '<option value="">-- เลือกสังกัด --</option>';
      if (uniqueAffils.includes('สำนักงานศึกษาธิการจังหวัด เชียงใหม่')) {
        html += '<option value="สำนักงานศึกษาธิการจังหวัด เชียงใหม่">📍 สำนักงานศึกษาธิการจังหวัด เชียงใหม่ (ภาพรวม)</option>';
      }

      uniqueAffils.forEach(aff => {
        if (aff === 'สำนักงานศึกษาธิการจังหวัด เชียงใหม่') return;
        let icon = '🏫';
        if (aff.includes('เอกชน')) icon = '🏛️';
        else if (aff.includes('อุดมศึกษา')) icon = '🎓';
        else if (aff.includes('ท้องถิ่น')) icon = '🏢';
        else if (aff.includes('ตำรวจตระเวนชายแดน')) icon = '⛰️';
        else if (aff.includes('พิเศษ')) icon = '🌟';

        html += \`<option value="\${aff}">\${icon} \${aff}</option>\`;
      });

      select.innerHTML = html;
      select.value = currentAffiliation;
    }

    // Dynamically populate standards dropdown for current level and subject
    function populateStandardDropdown() {
      const select = document.getElementById('standardSelect');
      if (!currentSubject) {
        select.innerHTML = '<option value="ทั้งหมด">-- ทุกมาตรฐานการเรียนรู้ --</option>';
        currentStandard = 'ทั้งหมด';
        return;
      }

      const filtered = MASTER_DATA.filter(r => r.level === currentLevel && r.subject === currentSubject);
      const standardCodes = new Set();
      filtered.forEach(r => {
        Object.keys(r.standards).forEach(c => standardCodes.add(c));
      });

      const sortedCodes = Array.from(standardCodes).sort((a, b) => a.localeCompare(b, 'th'));

      let html = '<option value="ทั้งหมด">-- ทุกมาตรฐานการเรียนรู้ --</option>';
      sortedCodes.forEach(code => {
        const desc = STANDARD_DESCRIPTIONS[code] || '';
        const shortDesc = desc.length > 35 ? desc.substring(0, 35) + '...' : desc;
        html += \`<option value="\${code}">มาตรฐาน \${code}: \${shortDesc}</option>\`;
      });

      select.innerHTML = html;
      select.value = currentStandard || 'ทั้งหมด';
    }

    // Main Render Routine
    function renderDashboard() {
      const promptCard = document.getElementById('selectionPromptCard');
      const contentArea = document.getElementById('dashboardContentArea');

      // Check if both Subject and Affiliation are selected
      if (!currentSubject || !currentAffiliation) {
        promptCard.classList.remove('hidden');
        contentArea.classList.add('hidden');
        lucide.createIcons();
        return;
      }

      promptCard.classList.add('hidden');
      contentArea.classList.remove('hidden');

      // 1. Update Title Header
      document.getElementById('mainSectionTitle').innerText = 
        \`แนวโน้มคะแนนเฉลี่ยถ่วงน้ำหนักและการวิเคราะห์รายมาตรฐานสาระการเรียนรู้\${currentSubject} (2565 - 2568)\`;

      document.getElementById('macroBadgeCode').innerText = SUBJECT_CODES[currentSubject] || 'ONET';

      // 2. Filter Records
      const filtered = MASTER_DATA.filter(r => 
        r.level === currentLevel && 
        r.subject === currentSubject && 
        r.affiliation === currentAffiliation
      );

      // Student counts by year
      const studentCounts = { 2565: 0, 2566: 0, 2567: 0, 2568: 0 };
      filtered.forEach(r => {
        studentCounts[r.year] = r.studentCount || 0;
      });

      // Group Standards
      const standardsMap = {};
      filtered.forEach(r => {
        const yr = r.year;
        Object.keys(r.standards).forEach(stdCode => {
          const item = r.standards[stdCode];
          if (item && item.mean !== null) {
            if (!standardsMap[stdCode]) {
              standardsMap[stdCode] = {
                code: stdCode,
                subject: currentSubject,
                desc: item.desc || STANDARD_DESCRIPTIONS[stdCode] || '',
                years: {}
              };
            }
            standardsMap[stdCode].years[yr] = item.mean;
          }
        });
      });

      let stdList = Object.values(standardsMap);

      // Filter by standard dropdown selection
      if (currentStandard && currentStandard !== 'ทั้งหมด') {
        stdList = stdList.filter(s => s.code === currentStandard);
      }

      // Sort by Standard Code (e.g. ต 1.1, ต 1.2, ต 1.3)
      stdList.sort((a, b) => a.code.localeCompare(b.code, 'th'));

      // Calculate statistics for each standard
      stdList.forEach(s => {
        const v65 = s.years[2565];
        const v66 = s.years[2566];
        const v67 = s.years[2567];
        const v68 = s.years[2568];

        const baseVal = v65 !== undefined ? v65 : (v66 || v67 || v68);
        const latestVal = v68 !== undefined ? v68 : (v67 || v66 || v65);
        s.delta = latestVal - baseVal;
        s.isUpward = s.delta >= 0;

        // Cumulative Average across 4 years
        const validScores = [v65, v66, v67, v68].filter(x => x !== undefined && x !== null);
        s.cumAvg = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
      });

      // 3. Render Cards Grid
      renderStandardsCards(stdList, studentCounts);

      // 4. Render Macro Trend Analysis
      const allSubjectStandards = Object.values(standardsMap);
      allSubjectStandards.forEach(s => {
        const v65 = s.years[2565];
        const v66 = s.years[2566];
        const v67 = s.years[2567];
        const v68 = s.years[2568];
        const baseVal = v65 !== undefined ? v65 : (v66 || v67 || v68);
        const latestVal = v68 !== undefined ? v68 : (v67 || v66 || v65);
        s.delta = latestVal - baseVal;
        const validScores = [v65, v66, v67, v68].filter(x => x !== undefined && x !== null);
        s.cumAvg = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
      });

      renderMacroAnalysis(allSubjectStandards);

      lucide.createIcons();
    }

    // Render Individual Standard Cards (P6 Blue, M3 Green)
    function renderStandardsCards(stdList, studentCounts) {
      const container = document.getElementById('standardsCardsGrid');
      
      // Destroy old chart instances
      Object.keys(chartInstances).forEach(k => {
        if (chartInstances[k]) chartInstances[k].destroy();
        delete chartInstances[k];
      });

      if (stdList.length === 0) {
        container.innerHTML = \`<div class="col-span-full py-12 text-center text-slate-400 text-sm">ไม่พบข้อมูลมาตรฐานตามเงื่อนไขที่เลือก</div>\`;
        return;
      }

      container.innerHTML = stdList.map((s, idx) => {
        const canvasId = 'chart_std_' + idx;
        const deltaFormatted = s.delta >= 0 ? \`+\${s.delta.toFixed(2)}\` : s.delta.toFixed(2);
        
        let summaryTextHtml = '';
        if (s.isUpward) {
          summaryTextHtml = \`
            <div class="flex items-start gap-2">
              <span class="text-blue-500 font-bold mt-0.5">↗</span>
              <p class="text-xs text-slate-700 leading-relaxed">
                ทิศทางสถิติเฉลี่ย\${currentSubject} \${currentLevel} ตลอดช่วง 4 ปี <strong class="font-bold text-slate-900">**มีการปรับตัวเพิ่มขึ้น**</strong> ดีกว่าปีฐานแรกเริ่มเท่ากับ <strong class="text-emerald-600 font-extrabold">\${deltaFormatted}</strong> คะแนน
              </p>
            </div>
          \`;
        } else {
          summaryTextHtml = \`
            <div class="flex items-start gap-2">
              <span class="text-rose-500 font-bold mt-0.5">↘</span>
              <p class="text-xs text-slate-700 leading-relaxed">
                สถิติเฉลี่ยรายปี <strong class="font-bold text-slate-900">**มีแนวโน้มชะลอตัวและหดตัวลง**</strong> โดยตัวเลขปีล่าสุดลดลงสะสมห่างจากปีฐานแรกเริ่มเท่ากับ <strong class="text-rose-600 font-extrabold">\${deltaFormatted}</strong> คะแนน
              </p>
            </div>
          \`;
        }

        return \`
          <div class="std-card p-5 flex flex-col justify-between space-y-4">
            
            <!-- Card Header -->
            <div>
              <div class="flex items-center justify-between">
                <span class="text-sm sm:text-base font-extrabold text-slate-900">
                  มาตรฐาน \${s.code}
                </span>
                <span class="text-[11px] font-medium text-slate-400">
                  สถิติถ่วงน้ำหนัก 4 ปี
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1 line-clamp-1" title="\${s.desc}">
                เนื้อหา: \${s.desc}
              </p>
            </div>

            <!-- Individual Line Chart Canvas -->
            <div class="relative w-full h-[180px] sm:h-[190px]">
              <canvas id="\${canvasId}"></canvas>
            </div>

            <!-- Card Footer: Summary Box -->
            <div class="bg-slate-50/80 border border-slate-200/90 rounded-xl p-3 space-y-1.5">
              <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>📋</span> สรุปทิศทางตัวชี้วัด:
              </div>
              \${summaryTextHtml}
            </div>

          </div>
        \`;
      }).join('');

      // Colors for P.6 (Blue) vs M.3 (Green)
      const isP6 = currentLevel === 'ป.6';
      const chartLineColor = isP6 ? '#2563eb' : '#16a34a';       // Blue for P.6, Green for M.3
      const chartPointBg = isP6 ? '#3b82f6' : '#22c55e';         // Point Fill
      const chartPointBorder = isP6 ? '#1d4ed8' : '#15803d';     // Point Border

      stdList.forEach((s, idx) => {
        const canvasId = 'chart_std_' + idx;
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const labels = [
          \`2565 (\${(studentCounts[2565] || 0).toLocaleString()} คน)\`,
          \`2566 (\${(studentCounts[2566] || 0).toLocaleString()} คน)\`,
          \`2567 (\${(studentCounts[2567] || 0).toLocaleString()} คน)\`,
          \`2568 (\${(studentCounts[2568] || 0).toLocaleString()} คน)\`
        ];

        const dataVals = [
          s.years[2565] !== undefined ? s.years[2565] : null,
          s.years[2566] !== undefined ? s.years[2566] : null,
          s.years[2567] !== undefined ? s.years[2567] : null,
          s.years[2568] !== undefined ? s.years[2568] : null
        ];

        chartInstances[canvasId] = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              data: dataVals,
              borderColor: chartLineColor,
              backgroundColor: chartLineColor,
              borderWidth: 2.2,
              tension: 0.1,
              pointBackgroundColor: chartPointBg,
              pointBorderColor: chartPointBorder,
              pointBorderWidth: 2,
              pointRadius: 5.5,
              pointHoverRadius: 7.5,
              spanGaps: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: { top: 22, bottom: 4, left: 4, right: 10 }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                padding: 8,
                titleFont: { family: 'Prompt', size: 11 },
                bodyFont: { family: 'Prompt', size: 11 },
                callbacks: {
                  label: function(ctx) {
                    return \` คะแนนเฉลี่ย: \${ctx.parsed.y !== null ? ctx.parsed.y.toFixed(2) : '-'} คะแนน\`;
                  }
                }
              },
              datalabels: {
                align: 'top',
                anchor: 'end',
                offset: 4,
                font: { family: 'Prompt', size: 10.5, weight: 'bold' },
                color: '#1e293b',
                formatter: function(value) {
                  return value !== null && value !== undefined ? Number(value).toFixed(2) : '';
                }
              }
            },
            scales: {
              y: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 20,
                  font: { family: 'Prompt', size: 9 },
                  color: '#64748b'
                },
                grid: {
                  color: '#f1f5f9',
                  drawBorder: false
                }
              },
              x: {
                ticks: {
                  font: { family: 'Prompt', size: 8.5 },
                  color: '#475569',
                  maxRotation: 0,
                  autoSkip: false
                },
                grid: {
                  display: false
                }
              }
            }
          }
        });
      });
    }

    // Render Macro Trend Analysis
    function renderMacroAnalysis(stdList) {
      if (!stdList || stdList.length === 0) return;

      const sortedByAvg = [...stdList].sort((a, b) => b.cumAvg - a.cumAvg);
      const highlightStd = sortedByAvg[0];

      const sortedByGrowth = [...stdList].sort((a, b) => b.delta - a.delta);
      const fastestGrowStd = sortedByGrowth[0];

      const criticalStd = sortedByAvg[sortedByAvg.length - 1];

      // Update Column 1: Highlights
      document.getElementById('macroHighlightTitle').innerText = 
        \`จุดแข็งกระบวนการสาระ\${currentSubject} (Highlights)\`;
      
      let highlightGrowthClause = '';
      if (fastestGrowStd && fastestGrowStd.code !== highlightStd.code && fastestGrowStd.delta > 0) {
        highlightGrowthClause = \` และพบอัตราเร่งเติบโตที่ดีขึ้นอย่างต่อเนื่องในตัวชี้วัด **\${fastestGrowStd.code}** (+\${fastestGrowStd.delta.toFixed(2)} คะแนน)\`;
      } else if (highlightStd.delta > 0) {
        highlightGrowthClause = \` และมีแนวโน้มพัฒนาการเชิงบวกเพิ่มขึ้นอย่างต่อเนื่อง (+\${highlightStd.delta.toFixed(2)} คะแนน)\`;
      }

      document.getElementById('macroHighlightText').innerHTML = 
        \`สาระวิชาที่เป็นจุดแข็งโดดเด่นของกลุ่มสถานศึกษาที่เลือกที่ทำคะแนนสะสมสูงสุดคือ <strong class="text-slate-900 font-bold">**มาตรฐาน \${highlightStd.code}**</strong> (เฉลี่ยภาพรวมอยู่ที่ \${highlightStd.cumAvg.toFixed(1)} คะแนน) เกี่ยวกับเรื่อง "\${highlightStd.desc}"\${highlightGrowthClause}\`;

      // Update Column 2: Critical Areas
      document.getElementById('macroCriticalTitle').innerText = 
        \`จุดวิกฤตที่สมควรได้รับการเร่งพัฒนา (Critical Areas)\`;
      
      document.getElementById('macroCriticalText').innerHTML = 
        \`ตัวชี้วัดที่เป็นจุดวิกฤตซึ่งทำคะแนนเฉลี่ยรั้งท้ายในโครงสร้างของกลุ่มสถานศึกษาที่เลือก คือ <strong class="text-slate-900 font-bold">**มาตรฐาน \${criticalStd.code}**</strong> (ทำคะแนนเฉลี่ยสะสมได้เพียง \${criticalStd.cumAvg.toFixed(1)} คะแนน) มุ่งเน้นเรื่องเกี่ยวกับ "\${criticalStd.desc}"\`;

      // Update Column 3: Action Plan
      document.getElementById('macroActionPlanText').innerHTML = \`
        <p>1. <strong class="text-slate-900 font-semibold">**จัดแผนพัฒนาเร่งด่วน:**</strong> มุ่งเน้นการเพิ่มทักษะกระบวนการสื่อสารและจัดการเรียนรู้เชิงรุก (Active Learning) ในสาระมาตรฐานวิกฤต <strong class="text-slate-900 font-bold">**\${criticalStd.code}**</strong> เป็นอันดับแรก</p>
        <p>2. <strong class="text-slate-900 font-semibold">**บูรณาการเทคนิค:**</strong> นำแนวทางการสอนหรือเทคนิคที่คิดได้ดีจากกลุ่มตัวชี้วัดคะแนนสูงอย่าง <strong class="text-slate-900 font-bold">**\${highlightStd.code}**</strong> มาปรับประยุกต์ร่วมกัน</p>
        <p>3. <strong class="text-slate-900 font-semibold">**ออกรูปเล่มรายงาน:**</strong> หลังจากตรวจสอบข้อมูลบนหน้าจอจนมั่นใจแล้ว ให้คุณครูนำผลวิเคราะห์แนวโน้ม 4 ปีนี้ไปจัดทำเล่มรายงานและแผนปฏิบัติการส่งฝ่ายบริหารได้ทันที</p>
      \`;
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent, 'utf8');

console.log('Successfully generated index.html and public/index.html for Vercel!');
