/* Arcolab Health — calibration signal background.
   A measured curve drifting inside reference bands, on a faint grid,
   with a traveling marker. Calm, ambient, responsive. */
(function () {
  var canvas = document.querySelector('.fx');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var BLUE = [46, 125, 255];
  var TEAL = [47, 212, 196];
  function rgba(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a + ')'; }

  var W = 0, H = 0;
  function resize() {
    var r = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function frame(t) {
    var w = W, h = H, y0 = h * 0.74;
    ctx.fillStyle = '#f6f8fb';
    ctx.fillRect(0, 0, w, h);

    // faint grid
    ctx.strokeStyle = 'rgba(40,70,110,.05)';
    ctx.lineWidth = 1;
    for (var x = 0; x < w; x += 38) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (var y = 0; y < h; y += 38) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // reference band
    var band = 38;
    ctx.fillStyle = rgba(TEAL, .06);
    ctx.fillRect(0, y0 - band, w, band * 2);
    ctx.strokeStyle = rgba(TEAL, .22);
    ctx.setLineDash([5, 8]); ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y0 - band); ctx.lineTo(w, y0 - band);
    ctx.moveTo(0, y0 + band); ctx.lineTo(w, y0 + band);
    ctx.stroke(); ctx.setLineDash([]);

    // signal
    function yAt(x) {
      return y0 - (Math.sin(x * 0.010 + t * 0.005) * 20 +
                   Math.sin(x * 0.026 - t * 0.003) * 10 +
                   Math.sin(x * 0.048 + t * 0.007) * 4);
    }
    var grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, rgba(BLUE, .85));
    grad.addColorStop(1, rgba(TEAL, .85));
    ctx.strokeStyle = grad; ctx.lineWidth = 2;
    ctx.shadowColor = rgba(TEAL, .25); ctx.shadowBlur = 4;
    ctx.beginPath();
    for (var px = 0; px <= w; px += 4) {
      var py = yAt(px);
      if (px) ctx.lineTo(px, py); else ctx.moveTo(px, py);
    }
    ctx.stroke(); ctx.shadowBlur = 0;

    // traveling marker (bracket + dot), no vertical line
    var sx = (t * 0.14) % w, sy = yAt(sx), b = 8;
    ctx.strokeStyle = rgba(TEAL, .85); ctx.lineWidth = 1.3;
    ctx.strokeRect(sx - b, sy - b, b * 2, b * 2);
    ctx.fillStyle = '#0a2540';
    ctx.shadowColor = rgba(TEAL, .8); ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(sx, sy, 2.6, 0, 7); ctx.fill();
    ctx.shadowBlur = 0;
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    frame(600); // one calm static composition
    window.addEventListener('resize', function () { frame(600); });
    return;
  }

  var t = 0, running = true;
  function loop() { if (!running) return; frame(t); t += 4; requestAnimationFrame(loop); }
  requestAnimationFrame(loop);

  // pause when tab hidden (saves battery, avoids time jumps)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { running = false; }
    else if (!running) { running = true; requestAnimationFrame(loop); }
  });
})();
