'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Send,
  Square,
  Sparkles,
  Bot
} from 'lucide-react';
import ChatMessage, { MessageProps } from './ChatMessage';
import { QUICK_PROMPTS } from './knowledge-base';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [thinkingStep, setThinkingStep] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: `👋 **สวัสดีครับ! ผมคือผู้ช่วยอัจฉริยะ GO CARES by AIKCHOL NEXT**

ยินดีให้ข้อมูลและตอบคำถามเกี่ยวกับบริการรับ-ส่งผู้สูงอายุ พาไปโรงพยาบาล แพ็กเกจราคา และการดูแลตลอดเส้นทางครับ

ท่านสามารถเลือกคลิกดู **คำถามแนะนำด้านล่าง** หรือพิมพ์คำถามที่ต้องการได้เลยครับ!`,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'อัตราค่าบริการและแพ็กเกจมีอะไรบ้าง?',
        'มีบริการรับ-ส่งผู้ป่วยฟอกไตไหม?',
        'พื้นที่ให้บริการครอบคลุมที่ไหนบ้างในชลบุรี?',
        'ต้องจองล่วงหน้ากี่วันและติดต่อช่องทางไหน?'
      ]
    }
  ]);

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const quickPromptsRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom inside the chat messages container only
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinkingStep]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Trap mouse wheel inside chat window to prevent scrolling the main page
  useEffect(() => {
    const chatWin = chatWindowRef.current;
    if (!chatWin || !isOpen || isMinimized) return;

    const handleWheel = (e: WheelEvent) => {
      const msgContainer = messagesContainerRef.current;
      const quickPrompts = quickPromptsRef.current;
      const target = e.target as HTMLElement | null;

      // If user is wheeling over horizontal quick prompts bar, scroll it horizontally
      if (quickPrompts && (quickPrompts === target || quickPrompts.contains(target))) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          quickPrompts.scrollLeft += e.deltaY;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      // If inside horizontally scrollable table inside message with sideways swipe
      const tableWrapper = target?.closest('.table-scroll-container') as HTMLElement | null;
      if (tableWrapper && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.stopPropagation();
        return;
      }

      // Scroll the messages container directly and prevent page scrolling
      if (msgContainer) {
        msgContainer.scrollTop += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    chatWin.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      chatWin.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, isMinimized]);

  // Handle Form Submit
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isStreaming) return;

    setInputMessage('');
    const userTimestamp = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const newUserMessage: MessageProps = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: userTimestamp
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simulated Thinking State
    setThinkingStep('กำลังค้นหาข้อมูลในระบบ...');
    const delay1 = Promise.withResolvers<void>();
    setTimeout(delay1.resolve, 200);
    await delay1.promise;
    setThinkingStep('กำลังสรุปคำตอบ...');
    const delay2 = Promise.withResolvers<void>();
    setTimeout(delay2.resolve, 200);
    await delay2.promise;
    setThinkingStep(null);

    // Prepare assistant message
    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantTimestamp = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: assistantMsgId,
        sender: 'assistant',
        content: '',
        timestamp: assistantTimestamp
      }
    ]);

    setIsStreaming(true);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat-widget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          currentPathname: typeof window !== 'undefined' ? window.location.pathname : '/'
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }

      let suggestions: string[] = [];
      let actionLabel = '';
      let actionUrl = '';
      let actionType: 'booking' | 'line' | 'call' | 'url' | undefined;

      try {
        const sugHeader = response.headers.get('x-suggestions');
        if (sugHeader) suggestions = JSON.parse(decodeURIComponent(sugHeader));
        actionLabel = decodeURIComponent(response.headers.get('x-action-label') || '');
        actionUrl = decodeURIComponent(response.headers.get('x-action-url') || '');
        const rawActionType = response.headers.get('x-action-type');
        if (rawActionType === 'booking' || rawActionType === 'line' || rawActionType === 'call' || rawActionType === 'url') {
          actionType = rawActionType;
        }
      } catch (e: unknown) {
        console.error('Header parsing error:', e);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: accumulatedText,
                  suggestions,
                  actionLabel,
                  actionUrl,
                  actionType
                }
              : msg
          )
        );
      }
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === 'AbortError';
      if (isAbort) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: msg.content + ' *(หยุดการพิมพ์แล้ว)*' }
              : msg
          )
        );
      } else {
        console.error('Streaming error:', err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาสอบถามทาง LINE Official: [@407eqbwl](https://lin.ee/RbECVC5) หรือโทร 063 920 4765'
                }
              : msg
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleClearChat = () => {
    if (isStreaming) handleStopGenerating();
    setMessages([
      {
        id: 'welcome-msg-reset',
        sender: 'assistant',
        content: `🔄 **ล้างประวัติการสนทนาเรียบร้อยครับ**\n\nสามารถเลือกคลิกดูคำถามแนะนำด้านล่าง หรือพิมพ์สอบถามบริการได้เลยครับ!`,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'อัตราค่าบริการและแพ็กเกจมีอะไรบ้าง?',
          'มีบริการรับ-ส่งผู้ป่วยฟอกไตไหม?',
          'พื้นที่ให้บริการครอบคลุมที่ไหนบ้างในชลบุรี?',
          'ต้องจองล่วงหน้ากี่วันและติดต่อช่องทางไหน?'
        ]
      }
    ]);
  };

  const handleTriggerAction = (actionUrl: string, actionType?: string) => {
    if (!actionUrl) return;

    if (actionType === 'booking' || actionUrl === '#booking') {
      const bookingTrigger = document.querySelector('[data-open-booking]') as HTMLElement | null;
      if (bookingTrigger) {
        bookingTrigger.click();
      } else {
        const el = document.getElementById('pricing') || document.getElementById('ahcBookingModal');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (actionType === 'line' || actionUrl.startsWith('https://lin.ee') || actionUrl.startsWith('https://line.me')) {
      window.open(actionUrl, '_blank');
      return;
    }

    if (actionType === 'call' || actionUrl.startsWith('tel:')) {
      window.location.href = actionUrl;
      return;
    }

    if (actionUrl.startsWith('http')) {
      window.open(actionUrl, '_blank');
    } else if (actionUrl.startsWith('#')) {
      const targetEl = document.querySelector(actionUrl);
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Action Button (bottom-right) */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          fontFamily: 'inherit'
        }}
      >
        {/* Chat Window */}
        {isOpen && (
          <div
            ref={chatWindowRef}
            style={{
              position: 'fixed',
              bottom: isMinimized ? '90px' : '96px',
              right: '24px',
              width: isExpanded ? 'min(680px, calc(100vw - 32px))' : 'min(400px, calc(100vw - 32px))',
              height: isMinimized ? '60px' : isExpanded ? 'min(720px, calc(100vh - 120px))' : '560px',
              maxHeight: 'calc(100vh - 120px)',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 20px 48px -8px rgba(0, 45, 84, 0.22), 0 8px 16px -4px rgba(0, 0, 0, 0.08)',
              border: '1.5px solid rgba(0, 70, 128, 0.14)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              overscrollBehavior: 'contain',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 9999
            }}
            role="dialog"
            aria-label="หน้าต่างสนทนา AI"
          >
            {/* Window Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #004680 0%, #002d54 100%)',
                color: '#ffffff',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                userSelect: 'none',
                cursor: 'pointer'
              }}
              onClick={() => isMinimized && setIsMinimized(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #2DCCD3 0%, #004680 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(45, 204, 211, 0.35)'
                  }}
                >
                  <Bot size={20} color="#ffffff" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: 600, color: '#ffffff' }}>
                      GO CARES Assistant
                    </h3>
                    <span
                      style={{
                        fontSize: '9.5px',
                        background: '#2DCCD3',
                        color: '#002d54',
                        padding: '1px 6px',
                        borderRadius: '999px',
                        fontWeight: 700
                      }}
                    >
                      AI Sim
                    </span>
                  </div>
                  <p style={{ margin: '1px 0 0 0', fontSize: '11px', color: '#93c5fd' }}>
                    {isStreaming ? 'กำลังพิมพ์ตอบ...' : 'ออนไลน์ • สอบถามได้ตลอด 24 ชม.'}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.stopPropagation()}>
                {/* Clear chat */}
                <button
                  type="button"
                  onClick={handleClearChat}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.75)',
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}
                  title="ล้างการสนทนา"
                >
                  <RotateCcw size={14} />
                </button>

                {/* Minimize / Maximize Height */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.75)',
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}
                  title={isMinimized ? 'เปิดหน้าต่าง' : 'ย่อหน้าต่าง'}
                >
                  <Minimize2 size={14} />
                </button>

                {/* Expand / Shrink Width */}
                {!isMinimized && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.75)',
                      padding: '6px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s'
                    }}
                    title={isExpanded ? 'ขนาดปกติ' : 'ขยายเต็มหน้าต่าง'}
                  >
                    <Maximize2 size={14} />
                  </button>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '2px',
                    transition: 'all 0.15s'
                  }}
                  title="ปิดหน้าต่างแชท"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Window Body (hidden if minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Scroll Area */}
                <div
                  ref={messagesContainerRef}
                  style={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                    padding: '16px',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      onSelectSuggestion={handleSendMessage}
                      onTriggerAction={handleTriggerAction}
                    />
                  ))}

                  {/* Thinking Status Indicator */}
                  {thinkingStep && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        padding: '8px 14px',
                        borderRadius: '16px 16px 16px 4px',
                        fontSize: '12.5px',
                        color: '#004680',
                        maxWidth: 'fit-content',
                        marginBottom: '10px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                      }}
                    >
                      <Sparkles size={14} color="#2DCCD3" className="animate-spin" />
                      <span>{thinkingStep}</span>
                      <span style={{ display: 'inline-flex', gap: '3px' }}>
                        <span style={{ width: '4px', height: '4px', background: '#004680', borderRadius: '50%' }} />
                        <span style={{ width: '4px', height: '4px', background: '#2DCCD3', borderRadius: '50%' }} />
                        <span style={{ width: '4px', height: '4px', background: '#FFB81C', borderRadius: '50%' }} />
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts (shown when user is not streaming) */}
                <div
                  ref={quickPromptsRef}
                  style={{
                    padding: '8px 12px',
                    background: '#ffffff',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    gap: '6px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    scrollbarWidth: 'none',
                    overscrollBehavior: 'contain'
                  }}
                >
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled={isStreaming}
                      onClick={() => handleSendMessage(prompt)}
                      style={{
                        fontSize: '11.5px',
                        color: '#004680',
                        background: '#eaf2fa',
                        border: '1px solid rgba(0, 70, 128, 0.15)',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        cursor: isStreaming ? 'not-allowed' : 'pointer',
                        opacity: isStreaming ? 0.6 : 1,
                        flexShrink: 0,
                        transition: 'all 0.15s'
                      }}
                    >
                      💬 {prompt}
                    </button>
                  ))}
                </div>

                {/* Input & Control Bar */}
                <div
                  style={{
                    padding: '12px 14px',
                    background: '#ffffff',
                    borderTop: '1px solid #f1f5f9'
                  }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      position: 'relative'
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={isStreaming ? 'กำลังสร้างคำตอบ...' : 'พิมพ์คำถามของคุณที่นี่...'}
                      disabled={isStreaming}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '24px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        outline: 'none',
                        color: '#0f172a',
                        background: isStreaming ? '#f1f5f9' : '#ffffff',
                        transition: 'border-color 0.18s'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#004680')}
                      onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                    />

                    {isStreaming ? (
                      <button
                        type="button"
                        onClick={handleStopGenerating}
                        style={{
                          background: '#dc2626',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
                          flexShrink: 0
                        }}
                        title="หยุดพิมพ์ (Stop Generating)"
                      >
                        <Square size={14} fill="#ffffff" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        style={{
                          background: inputMessage.trim() ? '#004680' : '#e2e8f0',
                          color: inputMessage.trim() ? '#ffffff' : '#94a3b8',
                          border: 'none',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: inputMessage.trim() ? 'pointer' : 'default',
                          boxShadow: inputMessage.trim() ? '0 2px 8px rgba(0, 70, 128, 0.25)' : 'none',
                          transition: 'all 0.18s',
                          flexShrink: 0
                        }}
                        title="ส่งข้อความ"
                      >
                        <Send size={16} />
                      </button>
                    )}
                  </form>
                  <div
                    style={{
                      fontSize: '10.5px',
                      color: '#94a3b8',
                      textAlign: 'center',
                      marginTop: '6px'
                    }}
                  >
                    AI-Like Assistant • โรงพยาบาลเอกชล ชลบุรี
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (isMinimized) setIsMinimized(false);
          }}
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #004680 0%, #2DCCD3 100%)',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 12px 28px -4px rgba(0, 70, 128, 0.38), 0 4px 10px rgba(45, 204, 211, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s',
            outline: 'none',
            position: 'relative'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label={isOpen ? 'ปิดหน้าต่างแชท' : 'เปิดแชทผู้ช่วย AI'}
          title={isOpen ? 'ปิดหน้าต่างแชท' : 'เปิดแชทผู้ช่วย AI'}
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={28} />}

          {/* Pulse notification dot */}
          {!isOpen && (
            <span
              style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                width: '14px',
                height: '14px',
                background: '#FFB81C',
                borderRadius: '50%',
                border: '2px solid #ffffff'
              }}
            />
          )}
        </button>
      </div>
    </>
  );
}

