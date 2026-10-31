---
section: expat-info
menuName: Taxation
title: Taxation in Malta
heroText: Understand progressive tax brackets, National Insurance, and calculate your exact net take-home pay.
image: /assets/images/Taxation.jpg
order: 10
description: A complete guide to the Maltese tax system, including income tax brackets, National Insurance, and an interactive net salary calculator for expats.
cardText: ''
draft: false
blocks:
  - heading: ''
    text: ''
    html: ''
    custom: |-
      <div class="bg-gradient-to-br from-[#003366] to-[#002244] p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
      <h2 class="text-2xl font-bold mb-2">Malta Net Salary Calculator</h2>
      <p class="text-blue-200 text-sm mb-6">Calculate your estimated take-home pay based on 2026 tax and National Insurance rates.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      <!-- Inputs -->
      <div class="space-y-5 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
      <div>
      <label class="block text-sm font-semibold mb-2 text-blue-100">Annual Gross Salary (€)</label>
      <div class="relative">
      <span class="absolute left-4 top-3 text-slate-800 font-bold">€</span>
      <input class="w-full bg-white text-slate-800 font-bold rounded-xl py-3 pl-8 pr-4 focus:ring-4 focus:ring-blue-400 outline-none" id="calc-gross" oninput="calculateSalary()" placeholder="e.g. 35000" type="number"/>
      </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
      <div>
      <label class="block text-sm font-semibold mb-2 text-blue-100">Tax Status</label>
      <select class="w-full bg-white text-slate-800 font-semibold rounded-xl py-3 px-4 focus:ring-4 focus:ring-blue-400 outline-none" id="calc-status" onchange="calculateSalary()">
      <option value="single">Single</option>
      <option value="married">Married</option>
      <option value="parent">Parent</option>
      </select>
      </div>
      <div>
      <label class="block text-sm font-semibold mb-2 text-blue-100">Dependents</label>
      <input class="w-full bg-white text-slate-800 font-semibold rounded-xl py-3 px-4 focus:ring-4 focus:ring-blue-400 outline-none" id="calc-dependents" min="0" oninput="calculateSalary()" type="number" value="0"/>
      </div>
      </div>
      <div class="pt-2 border-t border-white/20 space-y-3">
      <label class="flex items-center space-x-3 text-sm text-blue-100 cursor-pointer">
      <input class="w-5 h-5 rounded border-none text-blue-600 focus:ring-0" id="calc-student" onchange="calculateSalary()" type="checkbox"/>
      <span>Full-time Student (NI Exempt)</span>
      </label>
      <label class="flex items-center space-x-3 text-sm text-blue-100 cursor-pointer">
      <input class="w-5 h-5 rounded border-none text-blue-600 focus:ring-0" id="calc-age" onchange="calculateSalary()" type="checkbox"/>
      <span>Born before 31 Dec 1961 (Reduced NI Cap)</span>
      </label>
      </div>
      </div>
      <!-- Results -->
      <div class="flex flex-col justify-center space-y-4">
      <div class="flex justify-between items-center border-b border-white/20 pb-3">
      <span class="text-blue-200">Gross Salary</span>
      <span class="font-semibold text-lg" id="res-gross">€0.00</span>
      </div>
      <div class="flex justify-between items-center border-b border-white/20 pb-3">
      <span class="text-blue-200">Statutory Bonus / COLA</span>
      <span class="font-semibold text-lg text-emerald-300" id="res-bonus">+ €0.00</span>
      </div>
      <div class="flex justify-between items-center border-b border-white/20 pb-3">
      <span class="text-blue-200">National Insurance (10%)</span>
      <span class="font-semibold text-lg text-red-300" id="res-ni">- €0.00</span>
      </div>
      <div class="flex justify-between items-center border-b border-white/20 pb-3">
      <span class="text-blue-200">Income Tax (PAYE)</span>
      <span class="font-semibold text-lg text-red-300" id="res-tax">- €0.00</span>
      </div>
      <div class="bg-blue-600/50 p-4 rounded-xl border border-blue-400/30">
      <div class="flex justify-between items-center mb-1">
      <span class="text-sm text-blue-100 uppercase tracking-wider font-semibold">Net Annual</span>
      <span class="font-bold text-2xl text-emerald-400" id="res-net">€0.00</span>
      </div>
      <div class="flex justify-between items-center">
      <span class="text-sm text-blue-100 uppercase tracking-wider font-semibold">Net Monthly</span>
      <span class="font-bold text-3xl text-white" id="res-net-monthly">€0.00</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      <script>
      // --- SALARY CALCULATOR LOGIC ---
      function calculateSalary() {
          const grossStr = document.getElementById('calc-gross').value;
          const gross = parseFloat(grossStr) || 0;
          let status = document.getElementById('calc-status').value;
          const dependents = parseInt(document.getElementById('calc-dependents').value) || 0;
          const isStudent = document.getElementById('calc-student').checked;
          const bornBefore1962 = document.getElementById('calc-age').checked;

          // Enforce tax status rules
          if (status === 'parent' && dependents === 0) {
              status = 'single'; // Parent status requires at least 1 dependent
          }

          // Malta Statutory Bonus / COLA (Approx €512.52 annually)
          const statutoryBonus = gross > 0 ? 512.52 : 0;
          const totalGross = gross + statutoryBonus;

          // 1. National Insurance (10% up to cap)
          let ni = 0;
          if (!isStudent && gross > 0) {
              ni = totalGross * 0.10;
              // Standard Cap (Category C/D) vs Older Cap (Category A/B)
              const maxNi = bornBefore1962 ? 2096.64 : 2767.96; 
              if (ni > maxNi) {
                  ni = maxNi;
              }
          }

          // 2. Tax Calculation based on 2026 approximate brackets
          let tax = 0;
          if (status === 'single') {
              if (totalGross <= 9100) tax = 0;
              else if (totalGross <= 14500) tax = (totalGross * 0.15) - 1365;
              else if (totalGross <= 19500) tax = (totalGross * 0.25) - 2815;
              else if (totalGross <= 60000) tax = (totalGross * 0.25) - 2725;
              else tax = (totalGross * 0.35) - 8725;
          } else if (status === 'married') {
              if (totalGross <= 12700) tax = 0;
              else if (totalGross <= 21200) tax = (totalGross * 0.15) - 1905;
              else if (totalGross <= 28700) tax = (totalGross * 0.25) - 4025;
              else if (totalGross <= 60000) tax = (totalGross * 0.25) - 3905;
              else tax = (totalGross * 0.35) - 9905;
          } else if (status === 'parent') {
              if (totalGross <= 10500) tax = 0;
              else if (totalGross <= 15800) tax = (totalGross * 0.15) - 1575;
              else if (totalGross <= 21200) tax = (totalGross * 0.25) - 3155;
              else if (totalGross <= 60000) tax = (totalGross * 0.25) - 3050;
              else tax = (totalGross * 0.35) - 9050;
          }

          // Prevent negative tax
          if (tax < 0) tax = 0;

          const net = totalGross - tax - ni;

          // Update UI
          document.getElementById('res-gross').innerText = '€' + gross.toFixed(2);
          document.getElementById('res-bonus').innerText = '+ €' + statutoryBonus.toFixed(2);
          document.getElementById('res-ni').innerText = '- €' + ni.toFixed(2);
          document.getElementById('res-tax').innerText = '- €' + tax.toFixed(2);
          document.getElementById('res-net').innerText = '€' + net.toFixed(2);
          document.getElementById('res-net-monthly').innerText = '€' + (net / 12).toFixed(2);
      }

      // Run calculation on page load in case of browser autofill
      window.onload = function() {
          calculateSalary();
      };
      // -------------------------------

      </script>
  - heading: How Income Tax Works in Malta
    text: |-
      Malta operates a progressive income tax system, meaning the more you earn, the higher the tax rate applied to those higher earnings. Taxes and social security are automatically deducted from your salary by your employer through a system known as **Final Settlement System (FSS)** (similar to PAYE in the UK).

      Your tax brackets depend entirely on your chosen **Status**:

      - **Single Rate:** Applies by default to unmarried individuals, or married couples who choose to file separately. The tax-free threshold is €9,100.
      - **Married Rate:** Applies to couples who are legally married and opt to file their taxes jointly. The tax-free threshold is higher (€12,700), making it beneficial if one spouse does not work or earns very little.
      - **Parent Rate:** Applies to individuals who maintain a child (under 18, or under 21 if in tertiary education). The tax-free threshold is €10,500. This is highly advantageous for single working parents.

      At the end of February each year, your employer will issue an **FS3 form**. This crucial document summarizes your total gross income, tax paid, and National Insurance contributions for the previous calendar year.
    html: ''
    custom: ''
  - heading: National Insurance (Social Security)
    text: |-
      In addition to income tax, you are legally required to pay National Insurance (NI) / Social Security Contributions (SSC). This contribution is what entitles you to free public healthcare, sickness benefits, maternity benefits, and eventually a Maltese state pension.

      **How it's calculated:**

      - Employees pay **10% of their basic weekly wage**.
      - The employer *also* pays a matching 10% on your behalf (this employer portion is not deducted from your gross salary; it is an additional cost to the company).
      - **The Cap:** NI contributions are capped. For 2026, the maximum contribution an employee makes is roughly €53.23 per week (approximately **€2,768 per year**). Once your salary exceeds roughly €27,000, your NI deduction maxes out, and you will not pay more than the cap regardless of how high your salary goes.
    html: ''
    custom: ''
  - heading: Tax Refunds & Special Rates
    text: |-
      **Government Tax Refund Cheques:**

      Every year (usually between April and June), the Maltese government mails a physical tax refund cheque to all workers earning under €60,000. Depending on your income bracket and tax status, this ranges from €60 to €140. *Make sure your address is updated with Identità so you receive this cheque in the mail!*

      **Highly Qualified Persons (HQP) Rules:**

      To attract top-tier international talent to specific growing sectors (Gaming, Aviation, and Financial Services), Malta offers the HQP scheme. If an expatriate works in an eligible senior role (e.g., CEO, Chief Risk Officer, Lead Actuary) and earns a gross salary exceeding a statutory minimum (approx. €75,000 for 2026), they can opt for a flat income tax rate of just **15%** on all earnings up to €5,000,000.
    html: ''
    custom: ''
imageAlt: ''
cardImage: /assets/images/Taxation.jpg
seoTitle: Taxation in Malta
shareImage: /assets/images/Taxation.jpg
---
