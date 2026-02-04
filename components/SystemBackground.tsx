
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const SystemBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let artifacts: Artifact[] = [];
      const particleCount = 45;
      const connectionDistance = 200;
      let gridStep = 80;

      // Color Palette: Deep Blues and Purples
      const colors = [
        { r: 66, g: 84, b: 255 },  // Electric Blue
        { r: 138, g: 63, b: 252 }, // Soft Purple
        { r: 43, g: 45, b: 124 },  // Navy
        { r: 88, g: 28, b: 135 }   // Deep Violet
      ];

      class Artifact {
        x: number;
        y: number;
        val: string;
        opacity: number;
        speed: number;

        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.val = '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
          this.opacity = p.random(5, 20);
          this.speed = p.random(0.05, 0.15);
        }

        update() {
          this.y -= this.speed;
          if (this.y < -20) {
            this.y = p.height + 20;
            this.x = p.random(p.width);
          }
        }

        draw() {
          p.fill(100, 120, 255, this.opacity);
          p.noStroke();
          p.textSize(7);
          p.textFont('JetBrains Mono, monospace');
          p.text(this.val, this.x, this.y);
        }
      }

      class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        baseSize: number;
        noiseOffset: number;
        color: { r: number, g: number, b: number };
        pulseOffset: number;

        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          // Ethereal slow drift
          this.vx = p.random(-0.15, 0.15);
          this.vy = p.random(-0.15, 0.15);
          this.baseSize = p.random(0.8, 2.5);
          this.size = this.baseSize;
          this.noiseOffset = p.random(2000);
          this.pulseOffset = p.random(p.TWO_PI);
          this.color = p.random(colors);
        }

        update() {
          const n = p.noise(this.x * 0.002, this.y * 0.002, p.frameCount * 0.002 + this.noiseOffset);
          const angle = n * p.TWO_PI * 1.5;
          this.vx += p.cos(angle) * 0.002;
          this.vy += p.sin(angle) * 0.002;

          // Velocity cap for high subtleness
          const speedCap = 0.35;
          const currentSpeed = p.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (currentSpeed > speedCap) {
            this.vx = (this.vx / currentSpeed) * speedCap;
            this.vy = (this.vy / currentSpeed) * speedCap;
          }

          this.x += this.vx;
          this.y += this.vy;

          // Gentle Mouse attraction
          const md = p.dist(p.mouseX, p.mouseY, this.x, this.y);
          if (md < 250) {
            const force = p.map(md, 0, 250, 0.1, 0);
            const ang = p.atan2(p.mouseY - this.y, p.mouseX - this.x);
            this.vx += p.cos(ang) * force;
            this.vy += p.sin(ang) * force;
          }

          // Wrap around edges
          if (this.x < 0) this.x = p.width;
          if (this.x > p.width) this.x = 0;
          if (this.y < 0) this.y = p.height;
          if (this.y > p.height) this.y = 0;
        }

        draw() {
          const pulse = p.sin(p.frameCount * 0.01 + this.pulseOffset);
          const currentOpacity = p.map(pulse, -1, 1, 20, 80);
          p.noStroke();
          p.fill(this.color.r, this.color.g, this.color.b, currentOpacity);
          p.circle(this.x, this.y, this.size + pulse * 0.5);
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.style('display', 'block');
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
        for (let i = 0; i < 6; i++) {
          artifacts.push(new Artifact());
        }
      };

      p.draw = () => {
        p.clear(0, 0, 0, 0);

        // Minimal grid
        p.stroke(80, 80, 150, 6);
        p.strokeWeight(0.5);
        for (let x = 0; x < p.width; x += gridStep) {
          p.line(x, 0, x, p.height);
        }
        for (let y = 0; y < p.height; y += gridStep) {
          p.line(0, y, p.width, y);
        }

        // Faint Artifacts
        artifacts.forEach(a => {
          a.update();
          a.draw();
        });
        
        // Ethereal connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < connectionDistance) {
              const alpha = p.map(d, 0, connectionDistance, 30, 0);
              // Use a weighted color for the line
              p.stroke(particles[i].color.r, particles[i].color.g, particles[i].color.b, alpha);
              p.strokeWeight(0.4);
              p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
          }
        }

        particles.forEach(pt => {
          pt.update();
          pt.draw();
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const myP5 = new p5(sketch, containerRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none opacity-40" />;
};

export default SystemBackground;
