import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;
    let time = 0;

    const mouse = {
      x: -9999,
      y: -9999,
    };

    const PARTICLE_COUNT = 35;
    const CONNECT_DISTANCE = 120;
    const REPULSE_RADIUS = 140;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,

      baseX: 0,
      baseY: 0,

      r: Math.random() * 2 + 0.6,

      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,

      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    function draw() {
      time += 0.01;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(124,58,237,${
              0.18 * (1 - dist / CONNECT_DISTANCE)
            })`;

            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        // Floating
        p.x += p.vx;
        p.y += p.vy;

        p.x += Math.sin(time + p.pulse) * 0.12;
        p.y += Math.cos(time + p.pulse) * 0.12;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS) {
          const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;

          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Twinkle
        const alpha = p.alpha + Math.sin(time * 2 + p.pulse) * 0.12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(124,58,237,${alpha})`;
        ctx.shadowColor = "#7C3AED";
        ctx.shadowBlur = 10 + Math.sin(time * 2 + p.pulse) * 3;

        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReduced) draw();

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}