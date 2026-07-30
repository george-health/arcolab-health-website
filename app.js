/* Arcolab Health — signal-wave background.
   A flowing ribbon of phase-shifted signal lines drifting on a faint grid,
   with a traveling marker on the center line. Calm, ambient, responsive. */
(function () {
  var canvas = document.querySelector('.fx');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var BLUE = [46, 125, 255];
  var TEAL = [47, 212, 196];
  function mix(a, b, t) { t = Math.max(0, Math.min(1, t)); return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]; }
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

  var N = 10, MID = (N - 1) / 2;

  function yAt(x, off, ph, t) {
    return H * 0.72 + off - (
      Math.sin(x * 0.010 + t * 0.005 + ph) * 20 +
      Math.sin(x * 0.026 - t * 0.003 + ph) * 10 +
      Math.sin(x * 0.048 + t * 0.007) * 4
    );
  }

  function frame(t) {
    var w = W, h = H, x, y, k;
    ctx.fillStyle = '#f6f8fb';
    ctx.fillRect(0, 0, w, h);

    // faint grid
    ctx.strokeStyle = 'rgba(40,70,110,.05)';
    ctx.lineWidth = 1;
    for (x = 0; x < w; x += 38) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (y = 0; y < h; y += 38) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // ribbon of phase-shifted lines
    for (k = 0; k < N; k++) {
      var off = (k - MID) * 7;
      var ph = k * 0.45;
      var near = 1 - Math.abs(k - MID) / MID;
      var c = mix(BLUE, TEAL, k / (N - 1));
      ctx.strokeStyle = rgba(c, 0.12 + near * 0.55);
      ctx.lineWidth = (k === Math.round(MID)) ? 2 : 1.1;
      ctx.beginPath();
      for (x = 0; x <= w; x += 4) {
        y = yAt(x, off, ph, t);
        if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.stroke();
    }

    // traveling marker on the center line
    var sx = (t * 0.14) % w, sy = yAt(sx, 0, Math.round(MID) * 0.45, t), b = 8;
    ctx.strokeStyle = rgba(TEAL, .85);
    ctx.lineWidth = 1.3;
    ctx.strokeRect(sx - b, sy - b, b * 2, b * 2);
    ctx.fillStyle = '#0a2540';
    ctx.shadowColor = rgba(TEAL, .8);
    ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(sx, sy, 2.6, 0, 7); ctx.fill();
    ctx.shadowBlur = 0;
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    frame(600); // one calm static composition
    window.addEventListener('resize', function () { frame(600); });
    return;
  }

  // Drive by real elapsed time (refresh-rate independent, matches the prototype).
  var t = 0, last = null, running = true;
  function loop(ts) {
    if (!running) return;
    if (last === null) last = ts;
    t += (ts - last) * 0.72;
    last = ts;
    frame(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // pause when tab hidden; avoid a time jump on resume
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true; last = null; requestAnimationFrame(loop);
    }
  });
})();
