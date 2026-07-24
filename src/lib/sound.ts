/**
 * Procedural ambience + sound effects via the Web Audio API.
 *
 * No audio files are shipped — everything is synthesised, so the whole
 * experience stays offline and lightweight. The goal is a *very subtle*
 * "forgotten library" bed: a low cello-like drone, occasional fireplace
 * crackle, and the sound of aged paper on every page turn.
 *
 * All functions are guarded and no-op safely when audio is unavailable.
 */

type Ctx = AudioContext & { createGain: () => GainNode };

let ctx: Ctx | null = null;
let master: GainNode | null = null;
let started = false;
let voices: (OscillatorNode | AudioBufferSourceNode)[] = [];
let crackleTimer: ReturnType<typeof setTimeout> | null = null;

function ensure(): Ctx | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC() as Ctx;
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
    } catch {
      return null;
    }
  }
  return ctx;
}

export async function resumeAudio(): Promise<void> {
  const c = ensure();
  if (c && c.state === "suspended") {
    try {
      await c.resume();
    } catch {
      /* ignore */
    }
  }
}

function noiseBuffer(c: Ctx, seconds: number): AudioBuffer {
  const len = Math.max(1, Math.floor(c.sampleRate * seconds));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

/** Start the continuous ambient bed (drone + crackle). Idempotent. */
export function startAmbience(): void {
  const c = ensure();
  if (!c || !master || started) return;
  started = true;
  void resumeAudio();

  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 360;
  lp.Q.value = 0.6;
  lp.connect(master);

  // Low drones — a monastery/cello bed (A1, E2, A2, C#3).
  const freqs = [55, 82.41, 110, 138.59];
  freqs.forEach((f, i) => {
    const o = c.createOscillator();
    o.type = i < 2 ? "sine" : "triangle";
    o.frequency.value = f;
    o.detune.value = (i - 1.5) * 5;

    const g = c.createGain();
    g.gain.value = 0.14 - i * 0.02;

    // slow tremolo for gentle movement
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.04 + i * 0.015;
    const lg = c.createGain();
    lg.gain.value = 0.05;
    lfo.connect(lg);
    lg.connect(g.gain);

    o.connect(g);
    g.connect(lp);
    o.start();
    lfo.start();
    voices.push(o, lfo);
  });

  // Faint airy high pad (a breath of choir).
  const hp = c.createOscillator();
  hp.type = "sine";
  hp.frequency.value = 440;
  const hg = c.createGain();
  hg.gain.value = 0.015;
  hp.connect(hg);
  hg.connect(master);
  hp.start();
  voices.push(hp);

  // Master fade-in.
  const t = c.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(0.0001, t);
  master.gain.linearRampToValueAtTime(0.5, t + 3.5);

  scheduleCrackle();
}

function scheduleCrackle(): void {
  const c = ctx;
  if (!c || !master || !started) return;
  const tick = () => {
    if (!c || !master || !started) return;
    const dur = 0.03 + Math.random() * 0.05;
    const src = c.createBufferSource();
    src.buffer = noiseBuffer(c, dur);
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 700 + Math.random() * 1400;
    bp.Q.value = 1.4;
    const g = c.createGain();
    const t = c.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.04 + Math.random() * 0.05, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp);
    bp.connect(g);
    g.connect(master);
    src.start(t);
    src.stop(t + dur + 0.02);
    crackleTimer = setTimeout(tick, 500 + Math.random() * 3200);
  };
  crackleTimer = setTimeout(tick, 1200 + Math.random() * 2000);
}

export function stopAmbience(): void {
  const c = ctx;
  if (!c || !master || !started) return;
  const t = c.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(0.0001, t + 1.2);
  if (crackleTimer) clearTimeout(crackleTimer);
  crackleTimer = null;
  const toStop = voices;
  voices = [];
  started = false;
  setTimeout(() => {
    toStop.forEach((v) => {
      try {
        v.stop();
      } catch {
        /* already stopped */
      }
    });
  }, 1400);
}

/** The soft rush of an aged page being turned. Plays regardless of ambience. */
export function playPageTurn(): void {
  const c = ensure();
  if (!c) return;
  void resumeAudio();
  const dur = 0.34;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, dur);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  const t = c.currentTime;
  bp.frequency.setValueAtTime(1300, t);
  bp.frequency.exponentialRampToValueAtTime(350, t + dur);
  bp.Q.value = 0.7;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.14, t + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0006, t + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t);
  src.stop(t + dur + 0.02);
}

/** A brief quill scratch, for title reveals. */
export function playQuill(): void {
  const c = ensure();
  if (!c) return;
  void resumeAudio();
  const dur = 0.5;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, dur);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2600;
  bp.Q.value = 2.2;
  const g = c.createGain();
  const t = c.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.03, t + 0.05);
  g.gain.linearRampToValueAtTime(0.02, t + dur - 0.1);
  g.gain.exponentialRampToValueAtTime(0.0004, t + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t);
  src.stop(t + dur + 0.02);
}
