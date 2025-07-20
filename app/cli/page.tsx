'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { getCommand, cliCommands } from '@/lib/cli-commands';

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
}

export default function CLIPage() {
  const { settings, toggleTheme, updateSettings } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isDeveloper = settings.theme === 'developer';

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = `
Welcome to CodeChemist Terminal v2.0.1
Type 'help' to see available commands.

 ██████╗ ██████╗ ██████╗ ███████╗ ██████╗██╗  ██╗███████╗███╗   ███╗██╗███████╗████████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██║  ██║██╔════╝████╗ ████║██║██╔════╝╚══██╔══╝
██║     ██║   ██║██║  ██║█████╗  ██║     ███████║█████╗  ██╔████╔██║██║███████╗   ██║   
██║     ██║   ██║██║  ██║██╔══╝  ██║     ██╔══██║██╔══╝  ██║╚██╔╝██║██║╚════██║   ██║   
╚██████╗╚██████╔╝██████╔╝███████╗╚██████╗██║  ██║███████╗██║ ╚═╝ ██║██║███████║   ██║   
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚══════╝   ╚═╝   

Current theme: ${settings.theme}
Matrix rain: ${settings.matrixRain ? 'enabled' : 'disabled'}
`;

    setHistory([
      {
        command: 'system_init',
        output: welcomeMessage,
        timestamp: new Date()
      }
    ]);
  }, [settings.theme, settings.matrixRain]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    let output = '';
    
    // Handle special commands
    switch (trimmedCmd) {
      case 'clear':
        setHistory([]);
        return;
      
      case 'matrix':
        updateSettings({ matrixRain: !settings.matrixRain });
        output = `Matrix rain ${!settings.matrixRain ? 'enabled' : 'disabled'}!`;
        break;
      
      case 'theme':
        toggleTheme();
        output = `Switched to ${settings.theme === 'developer' ? 'entrepreneur' : 'developer'} theme!`;
        break;
      
      default:
        const command = getCommand(trimmedCmd);
        if (command) {
          output = command.execute();
        } else {
          output = `Command not found: ${trimmedCmd}\nType 'help' to see available commands.`;
        }
    }

    const newEntry: CommandHistory = {
      command: cmd,
      output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newEntry]);
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
    const userCommands = history.filter(h => h.command !== 'system_init').map(h => h.command);
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandIndex < userCommands.length - 1) {
        const newIndex = commandIndex + 1;
        setCommandIndex(newIndex);
        setInput(userCommands[userCommands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(userCommands[userCommands.length - 1 - newIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`mb-4 ${
              isDeveloper ? 'text-green-400 neon-text font-mono' : 'text-gray-900'
            }`}>
              {isDeveloper ? '// CLI Playground' : 'Interactive Terminal'}
            </h1>
            <p className={`text-lg ${
              isDeveloper ? 'text-gray-300 font-mono' : 'text-gray-600'
            }`}>
              {isDeveloper ? 'root@codechemist:~$' : 'Explore my skills and projects through commands'}
            </p>
          </div>

          {/* Terminal */}
          <motion.div
            className={`rounded-xl overflow-hidden shadow-2xl ${
              isDeveloper ? 'bg-black border-2 border-green-500 neon-border' : 'bg-white border border-gray-200'
            }`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Terminal Header */}
            <div className={`flex items-center justify-between px-4 py-2 ${
              isDeveloper ? 'bg-gray-900 border-b border-green-500' : 'bg-gray-100 border-b border-gray-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className={`text-sm font-mono ml-4 ${
                  isDeveloper ? 'text-green-400' : 'text-gray-600'
                }`}>
                  {isDeveloper ? 'codechemist@terminal' : 'sayman@portfolio'}
                </span>
              </div>
              <div className={`text-xs ${
                isDeveloper ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Theme: {settings.theme}
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              className={`p-4 h-96 overflow-y-auto font-mono text-sm ${
                isDeveloper ? 'bg-black text-green-400' : 'bg-gray-50 text-gray-800'
              }`}
            >
              {/* Command History */}
              {history.map((entry, index) => (
                <div key={index} className="mb-4">
                  {entry.command !== 'system_init' && (
                    <div className={`mb-1 ${
                      isDeveloper ? 'text-green-300' : 'text-blue-600'
                    }`}>
                      <span className={isDeveloper ? 'text-green-500' : 'text-gray-500'}>
                        {isDeveloper ? 'root@codechemist:~$ ' : 'user@portfolio:~$ '}
                      </span>
                      {entry.command}
                    </div>
                  )}
                  <pre className={`whitespace-pre-wrap ${
                    isDeveloper ? 'text-green-400' : 'text-gray-700'
                  }`}>
                    {entry.output}
                  </pre>
                </div>
              ))}

              {/* Current Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className={`mr-2 ${
                  isDeveloper ? 'text-green-500' : 'text-gray-500'
                }`}>
                  {isDeveloper ? 'root@codechemist:~$ ' : 'user@portfolio:~$ '}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 bg-transparent outline-none ${
                    isDeveloper ? 'text-green-400' : 'text-gray-800'
                  }`}
                  placeholder="Type a command..."
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>

          {/* Command Reference */}
          <motion.div
            className={`mt-8 p-6 rounded-xl ${
              isDeveloper 
                ? 'glass-dark border-green-500/30' 
                : 'bg-white border border-gray-200 shadow-lg'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              isDeveloper ? 'text-green-400' : 'text-gray-900'
            }`}>
              {isDeveloper ? '// Available Commands' : 'Quick Reference'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cliCommands.map((cmd) => (
                <div
                  key={cmd.command}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isDeveloper ? 'bg-gray-800/30' : 'bg-gray-50'
                  }`}
                >
                  <code className={`font-mono font-semibold ${
                    isDeveloper ? 'text-green-400' : 'text-blue-600'
                  }`}>
                    {cmd.command}
                  </code>
                  <span className={`text-sm ${
                    isDeveloper ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    - {cmd.description}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}