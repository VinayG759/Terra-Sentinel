import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MessageCircle, X, Send, Mic } from 'lucide-react';

const sampleMessages = [
  { role: 'assistant', text: 'Hello! How can I assist you with disaster management today?' },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', text: input }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on current data, I recommend prioritizing evacuation in Zone A.',
        'I can help you optimize resource allocation. What specific area needs attention?',
        'Weather patterns suggest increased flood risk in the next 6 hours.',
        'All emergency response teams are currently deployed. Would you like to see their status?',
      ];
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: responses[Math.floor(Math.random() * responses.length)] },
      ]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 8px 32px rgba(16, 185, 129, 0.3)',
            '0 8px 32px rgba(14, 165, 233, 0.3)',
            '0 8px 32px rgba(16, 185, 129, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                        : 'bg-white shadow-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 rounded-xl glass-card border-2 border-transparent focus:border-emerald-500 outline-none"
                />
                <motion.button
                  onClick={handleSend}
                  className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-xl glass-card hover:bg-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
