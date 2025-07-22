'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../lib/theme-context';

interface CommandHistory {
  command: string;
  output: string;
  timestamp: string;
}

export default function CLIPage() {
  const { settings } = useTheme();
  const isDeveloper = settings.theme === 'developer';

  if (isDeveloper) {
    return <CyberTerminal />;
  } else {
    return <BookPage />;
  }
}

function CyberTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [visualMode, setVisualMode] = useState<'matrix' | 'binary' | 'circuit' | 'neon'>('neon');
  const [powerLevel, setPowerLevel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Visual effects
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let animationFrame: number;
    let particles: Particle[] = [];
    const particleCount = visualMode === 'neon' ? 100 : 50;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 150}, 100%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (visualMode === 'matrix') {
        const chars = "01█▓▒░│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        for (let i = 0; i < columns; i++) {
          const y = Math.random() * canvas.height;
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.5 + 0.3})`;
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.fillText(char, i * fontSize, y);
        }
      }
      else if (visualMode === 'binary') {
        ctx.fillStyle = `rgba(0, 255, 0, ${0.3 + powerLevel * 0.02})`;
        ctx.font = 'bold 12px monospace';
        for (let i = 0; i < 100 + powerLevel * 2; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
        }
      }
      else if (visualMode === 'circuit') {
        ctx.strokeStyle = `rgba(0, 255, 0, ${0.1 + powerLevel * 0.01})`;
        ctx.lineWidth = 1;

        for (let y = 0; y < canvas.height; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        for (let x = 0; x < canvas.width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(0, 255, 0, ${0.3 + powerLevel * 0.01})`;
        for (let i = 0; i < 50 + powerLevel; i++) {
          const x = Math.floor(Math.random() * canvas.width / 30) * 30;
          const y = Math.floor(Math.random() * canvas.height / 20) * 20;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      else if (visualMode === 'neon') {
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });

        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.strokeStyle = `rgba(0, 255, 127, ${1 - distance / 100})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        if (powerLevel > 50) {
          ctx.fillStyle = `rgba(0, 255, 127, ${0.05})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.strokeStyle = `rgba(0, 255, 127, ${0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            100 + powerLevel,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [visualMode, powerLevel]);

  // Power level management
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerLevel(prev => {
        const newLevel = Math.min(prev + Math.random() * 5, 100);
        return newLevel;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // High power level effect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (powerLevel > 80) {
      const interval = setInterval(() => {
        setPowerLevel(prev => Math.max(prev - 1, 80));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [powerLevel]);// Now powerLevel is properly included in dependencies

  // Terminal initialization
  useEffect(() => {
    const welcomeMessage = `
 ██████╗ ██████╗ ██████╗ ███████╗ ██████╗██╗  ██╗███████╗███╗   ███╗██╗███████╗████████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██║  ██║██╔════╝████╗ ████║██║██╔════╝╚══██╔══╝
██║     ██║   ██║██║  ██║█████╗  ██║     ███████║█████╗  ██╔████╔██║██║███████╗   ██║   
██║     ██║   ██║██║  ██║██╔══╝  ██║     ██╔══██║██╔══╝  ██║╚██╔╝██║██║╚════██║   ██║   
╚██████╗╚██████╔╝██████╔╝███████╗╚██████╗██║  ██║███████╗██║ ╚═╝ ██║██║███████║   ██║   
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚══════╝   ╚═╝   

[SYSTEM BOOT COMPLETE]
[VISUAL MODE: ${visualMode.toUpperCase()}]
[POWER LEVEL: ${powerLevel}%]
[STATUS: SECURE]
[SESSION: #${Math.floor(Math.random() * 1000)}]

Type 'help' for command list
`;

    setHistory([{
      command: 'system_init',
      output: welcomeMessage,
      timestamp: new Date().toISOString()
    }]);
  }, [visualMode, powerLevel]);

  // Cursor and focus management
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    inputRef.current?.focus();
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';
    let powerBoost = 0;

    switch (trimmedCmd) {
      case 'help':
        output = `AVAILABLE COMMANDS:
help       - Show this help
clear      - Clear terminal
visual     - Change visual mode (matrix/binary/circuit/neon)
scan       - Run system diagnostics
decrypt    - Attempt file decryption
inject     - Code injection sequence
override   - System override protocol
analyze    - Deep system analysis
upgrade    - Initiate core upgrade
firewall   - Check security status
ping       - Test network connections
power      - Show power levels
`;
        break;

      case 'clear':
        setHistory([]);
        return;

        case 'visual':
          const modes: Array<'matrix' | 'binary' | 'circuit' | 'neon'> = ['matrix', 'binary', 'circuit', 'neon'];
          const nextIndex = (modes.indexOf(visualMode) + 1) % modes.length;
          const nextMode = modes[nextIndex];
          setVisualMode(nextMode);
          output = `VISUAL MODE SET TO: ${nextMode.toUpperCase()}`;
          powerBoost = 10;
          break;

      case 'scan':
        output = `SYSTEM SCAN INITIATED...
[████████████████████] 100%
CPU: ${Math.floor(Math.random() * 30) + 70}% 
MEM: ${Math.floor(Math.random() * 30) + 60}% 
ENC: ACTIVE
THREAT LEVEL: ${['LOW', 'MODERATE', 'HIGH'][Math.floor(Math.random() * 3)]}`;
        powerBoost = 15;
        break;

      case 'decrypt':
        output = `DECRYPTION SEQUENCE:
[!] ACCESSING ENCRYPTED FILES...
[✓] CRACKING CIPHER (AES-256)
[!] ${Math.floor(Math.random() * 5) + 1} ATTEMPTS REMAINING
[✓] DECRYPTION SUCCESSFUL
[+] ${Math.floor(Math.random() * 5) + 1} FILES RECOVERED`;
        powerBoost = 25;
        break;

      case 'inject':
        output = `CODE INJECTION:
[!] WARNING: UNSAFE OPERATION
[✓] BYPASSING MEMORY PROTECTION
[✓] PAYLOAD DELIVERED
[!] SYSTEM INTEGRITY COMPROMISED
[+] PRIVILEGES ELEVATED`;
        powerBoost = 40;
        break;

      case 'override':
        output = `SYSTEM OVERRIDE:
[!] INITIATING PRIVILEGE ESCALATION
[✓] ROOT ACCESS OBTAINED
[!] WARNING: AUDIT TRAIL DELETED
[✓] FULL SYSTEM CONTROL ESTABLISHED

 ██████╗ ██████╗ ██████╗ ███████╗
██╔═══██╗██╔══██╗██╔══██╗██╔════╝
██║   ██║██████╔╝██████╔╝███████╗
██║   ██║██╔══██╗██╔══██╗╚════██║
╚██████╔╝██║  ██║██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝`;
        powerBoost = 60;
        break;

      case 'analyze':
        output = `DEEP ANALYSIS MODE:
[+] SCANNING MEMORY SECTORS...
[✓] ${Math.floor(Math.random() * 50) + 50}% UTILIZATION
[+] CHECKING NEURAL PATHS...
[✓] ${Math.floor(Math.random() * 30) + 70}% EFFICIENCY
[+] VERIFYING CORE INTEGRITY...
[✓] SYSTEM STABLE`;
        powerBoost = 20;
        break;

      case 'upgrade':
        output = `CORE UPGRADE SEQUENCE:
[!] WARNING: SYSTEM WILL REBOOT
[+] DOWNLOADING PACKAGES...
[✓] ${Math.floor(Math.random() * 50) + 50}MB/S
[+] INSTALLING UPDATES...
[✓] VERSION 3.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 20)} INSTALLED
[!] REBOOT REQUIRED`;
        powerBoost = 35;
        break;

      case 'firewall':
        output = `SECURITY STATUS:
[+] FIREWALL: ACTIVE
[+] INTRUSION DETECTION: ${['ONLINE', 'DEGRADED'][Math.floor(Math.random() * 2)]}
[+] ENCRYPTION: AES-256
[+] THREATS BLOCKED: ${Math.floor(Math.random() * 1000)}`;
        powerBoost = 10;
        break;

      case 'ping':
        output = `NETWORK DIAGNOSTICS:
PING 8.8.8.8: time=${Math.random().toFixed(2)}ms
PING github.com: time=${(Math.random() * 2).toFixed(2)}ms
PING neural-core: time=0.01ms
UPLOAD: ${(Math.random() * 100).toFixed(2)}Mbps
DOWNLOAD: ${(Math.random() * 200 + 100).toFixed(2)}Mbps`;
        powerBoost = 5;
        break;

      case 'power':
        output = `POWER SYSTEMS:
[+] CORE: ${powerLevel}%
[+] BACKUP: ${Math.floor(Math.random() * 30) + 70}%
[+] RESERVES: ${Math.floor(Math.random() * 50) + 50}%
[!] ${powerLevel > 80 ? 'WARNING: HIGH POWER USAGE' : 'SYSTEMS NOMINAL'}`;
        break;

      default:
        output = `Command not found: ${trimmedCmd}\nType 'help' for available commands`;
    }

    setHistory(prev => [...prev, {
      command: cmd,
      output,
      timestamp: new Date().toISOString()
    }]);

    if (powerBoost) {
      setPowerLevel(prev => Math.min(prev + powerBoost, 100));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
      setCommandIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const commands = history.filter(h => h.command !== 'system_init').map(h => h.command);

    if (e.key === 'ArrowUp' && commandIndex < commands.length - 1) {
      e.preventDefault();
      const newIndex = commandIndex + 1;
      setCommandIndex(newIndex);
      setInput(commands[commands.length - 1 - newIndex]);
    } else if (e.key === 'ArrowDown' && commandIndex > 0) {
      e.preventDefault();
      const newIndex = commandIndex - 1;
      setCommandIndex(newIndex);
      setInput(commands[commands.length - 1 - newIndex]);
    } else if (e.key === 'ArrowDown' && commandIndex === 0) {
      e.preventDefault();
      setCommandIndex(-1);
      setInput('');
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div
        ref={containerRef}
        className="relative z-20 container mx-auto px-4 py-12"
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80"
        />

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          <div className="absolute inset-0 border-4 border-green-500 opacity-10"></div>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500 opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 opacity-30"></div>
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green-500 opacity-10"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-500 opacity-10 transform -translate-x-1/2"></div>

          <div className="absolute bottom-4 left-4 right-4 h-1 bg-black/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
              initial={{ width: '0%' }}
              animate={{ width: `${powerLevel}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-20">
          <motion.div
            className="rounded-lg overflow-hidden border-2 border-green-500 shadow-lg shadow-green-500/20"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-black/80 border-b border-green-500/50">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-mono text-green-400 ml-2">
                  root@neural-core:~# [SESSION-{Math.floor(Math.random() * 1000)}]
                </span>
              </div>
              <div className="text-xs font-mono text-green-400">
                {new Date().toLocaleTimeString()} | POWER: {powerLevel}%
              </div>
            </div>

            <div
              ref={terminalRef}
              className="p-4 h-[32rem] overflow-y-auto font-mono text-sm bg-black/90 text-green-400"
            >
              <AnimatePresence>
                {history.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4"
                  >
                    {entry.command !== 'system_init' && (
                      <div className="mb-1 text-green-300">
                        <span className="text-green-500">root@neural-core:~# </span>
                        {entry.command}
                        <span className="text-gray-500 ml-2 text-xs">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                    <pre className="whitespace-pre-wrap break-words">
                      {entry.output}
                    </pre>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex items-center">
                <span className="mr-2 text-green-500">root@neural-core:~# </span>
                <form onSubmit={handleSubmit} className="flex-1 flex items-center relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-green-400 caret-transparent"
                    placeholder="Type command..."
                    autoComplete="off"
                    style={{ width: `${Math.max(input.length, 1)}ch` }}
                  />
                  {cursorVisible && (
                    <span
                      className="absolute h-5 w-0.5 bg-green-400 ml-1"
                      style={{ left: `${input.length}ch` }}
                    />
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 p-6 rounded-lg bg-black/50 border border-green-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-mono font-bold text-green-400 mb-4 flex items-center">
              <span className="mr-2">#QUICK COMMANDS</span>
              <span className="text-xs text-green-300">POWER: {powerLevel}%</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['help', 'visual', 'scan', 'decrypt', 'inject', 'override', 'analyze', 'upgrade', 'firewall', 'ping', 'power', 'clear'].map((cmd) => (
                <motion.button
                  key={cmd}
                  whileHover={{ y: -2, boxShadow: '0 0 8px rgba(0, 255, 127, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-xs font-mono bg-green-900/30 text-green-400 rounded border border-green-500/30 hover:bg-green-500/10 transition-colors relative overflow-hidden"
                  onClick={() => {
                    setInput(cmd);
                    inputRef.current?.focus();
                  }}
                >
                  {cmd}
                  <motion.span
                    className="absolute inset-0 bg-green-500/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Might Not The First, But Last</h1>
          <div className="w-24 h-1 bg-gray-800 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">by Sayman Lal</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-12"
        >
          <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
            <p className="text-gray-700 leading-relaxed">
              {`"Might Not The First, But Last" is a deeply personal collection of poems and reflections that explore the quiet, unshakable kind of love—the kind that never demands to be noticed, yet never fades.`}
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Themes</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Loneliness in a Crowded Age",
                "The Fragility of Connection",
                "Echoes of a Lost Humanity",
                "The Weight of Being Witness",
                "Unspoken Grief",
                "Existence Without Certainty",
                "Being the Last Without Knowing It"
              ].map((theme, index) => (
                <motion.li
                  key={theme}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <span className="text-gray-500 mr-2">▹</span>
                  <span className="text-gray-700">{theme}</span>
                </motion.li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Publication Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Date</h3>
                <p className="text-gray-600">May 2025</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">ISBN</h3>
                <p className="text-gray-600">979-8899296185</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Pages</h3>
                <p className="text-gray-600">60</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Format</h3>
                <p className="text-gray-600">Paperback</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}