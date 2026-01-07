// Small interactions: copy profile link to clipboard and show temporary feedback.

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const shareBtn = document.getElementById('shareBtn');
  if (!shareBtn) return;

  const originalText = shareBtn.textContent;

  shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      shareBtn.textContent = 'Link copied!';
      setTimeout(() => { shareBtn.textContent = originalText; }, 2000);
    } catch (err) {
      shareBtn.textContent = 'Copy failed';
      setTimeout(() => { shareBtn.textContent = originalText; }, 2000);
    }
  });
});
