
(function(){
  const root = document.documentElement;
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (prefersLight) root.classList.add('light');

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn){
    themeBtn.addEventListener('click', () => {
      const isLight = root.classList.toggle('light');
      themeBtn.setAttribute('aria-pressed', String(isLight));
    });
  }

  // mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  // elevate header on scroll
  const header = document.querySelector('[data-elevate]');
  const elev = () => {
    if (window.scrollY > 4) header.classList.add('elevated');
    else header.classList.remove('elevated');
  };
  window.addEventListener('scroll', elev); elev();

  // Back to top
  const toTop = document.getElementById('toTop');
  if (toTop){
    toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  // Generator logic
  const form = document.getElementById('policyForm');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const output = document.getElementById('output');

  function buildPolicy(values){
    const now = new Date();
    const dateStr = now.toISOString().slice(0,10);
    const cookiesLine = values.cookies === 'yes'
      ? `We use cookies and similar technologies for essential site functionality and (where you consent) analytics.`
      : `We do not use cookies other than strictly necessary technical cookies.`;

    return `PRIVACY & COOKIE POLICY\n\n` +
`Who we are\n` +
`${values.company} (“we”, “us”) is the controller of your personal data. You can contact us at ${values.email}.\n\n` +
`What we collect\n` +
`${values.dataTypes || 'contact details, usage data'} — collected to support ${values.purposes || 'account setup and support'}.\n\n` +
`Cookies\n` +
`${cookiesLine}\n\n` +
`Legal bases & purposes\n` +
`We rely on consent (where applicable), contract performance, and our legitimate interests to provide and improve our services.\n\n` +
`Retention\n` +
`We keep data only as long as necessary for the purposes described above, then delete or anonymize it.\n\n` +
`Your rights\n` +
`Depending on your location (${values.location || 'your jurisdiction'}), you may have rights to access, correct, delete, restrict or object to processing, and data portability. You can exercise these rights by contacting ${values.email}.\n\n` +
`Security\n` +
`We apply reasonable technical and organizational measures to protect personal data.\n\n` +
`Contact & complaints\n` +
`Questions or concerns? Email ${values.email}. If unresolved, you may contact your local data protection authority.\n\n` +
`Last updated: ${dateStr}`;
  }

  function getValues(){
    return {
      company: document.getElementById('company').value.trim() || 'Your Company',
      email: document.getElementById('email').value.trim() || 'privacy@example.com',
      location: document.getElementById('location').value.trim(),
      cookies: document.getElementById('cookies').value,
      dataTypes: document.getElementById('dataTypes').value.trim(),
      purposes: document.getElementById('purposes').value.trim()
    };
  }

  if (generateBtn){
    generateBtn.addEventListener('click', () => {
      const values = getValues();
      const text = buildPolicy(values);
      output.value = text;
      downloadBtn.disabled = false;
    });
  }

  if (downloadBtn){
    downloadBtn.addEventListener('click', () => {
      const blob = new Blob([output.value || ''], {type:'text/plain'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'privacy-policy.txt';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 500);
    });
  }
})();
