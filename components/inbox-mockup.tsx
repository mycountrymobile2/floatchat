"use client"

import { useEffect, useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Wand2, 
  Check, 
  Zap, 
  MessageSquare, 
  Mail, 
  Phone,
  Bot,
  Languages,
  ShieldCheck,
  Send,
  Instagram,
  Facebook
} from "lucide-react"

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// Telegram icon component
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

export function InboxMockup() {
  const [phase, setPhase] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [showSpellingPopup, setShowSpellingPopup] = useState(false)
  const [spellingFixed, setSpellingFixed] = useState(false)
  const [copilotText, setCopilotText] = useState("")
  const [showCopilotAccept, setShowCopilotAccept] = useState(false)
  const [copilotAccepted, setCopilotAccepted] = useState(false)
  const [showSmartReplies, setShowSmartReplies] = useState(false)
  const [selectedReply, setSelectedReply] = useState<number | null>(null)
  const [messageSent, setMessageSent] = useState(false)
  const [showSentAnimation, setShowSentAnimation] = useState(false)
  
  const typoText = "I'll chek the trakking detials"
  const fixedText = "I'll check the tracking details"
  const copilotCompletion = " for order #12345 and arrange a replacement shipment right away."
  
  const smartReplies = [
    { text: "Package found at neighbor's", icon: Check },
    { text: "Initiating replacement now", icon: Zap },
    { text: "Filing carrier claim", icon: ShieldCheck },
  ]

  // Main animation orchestrator
  useEffect(() => {
    const runAnimation = async () => {
      // Phase 1: Typing with typos
      setPhase(1)
      for (let i = 0; i <= typoText.length; i++) {
        await new Promise(r => setTimeout(r, 50))
        setTypingText(typoText.slice(0, i))
      }
      
      // Phase 2: Show spelling popup
      await new Promise(r => setTimeout(r, 600))
      setPhase(2)
      setShowSpellingPopup(true)
      
      // Phase 3: Fix spelling with animation
      await new Promise(r => setTimeout(r, 1200))
      setPhase(3)
      setSpellingFixed(true)
      setShowSpellingPopup(false)
      setTypingText(fixedText)
      
      // Phase 4: AI Copilot suggestion
      await new Promise(r => setTimeout(r, 800))
      setPhase(4)
      for (let i = 0; i <= copilotCompletion.length; i++) {
        await new Promise(r => setTimeout(r, 20))
        setCopilotText(copilotCompletion.slice(0, i))
      }
      setShowCopilotAccept(true)
      
      // Phase 5: Accept copilot
      await new Promise(r => setTimeout(r, 1500))
      setPhase(5)
      setCopilotAccepted(true)
      setTypingText(fixedText + copilotCompletion)
      
      // Phase 6: Show smart replies
      await new Promise(r => setTimeout(r, 800))
      setPhase(6)
      setShowSmartReplies(true)
      
      // Phase 7: Select reply
      await new Promise(r => setTimeout(r, 1200))
      setPhase(7)
      setSelectedReply(1)
      
      // Phase 8: Send message
      await new Promise(r => setTimeout(r, 800))
      setPhase(8)
      setMessageSent(true)
      setShowSentAnimation(true)
      
      // Reset after showing sent state
      await new Promise(r => setTimeout(r, 3000))
      
      // Reset all states
      setPhase(0)
      setTypingText("")
      setShowSpellingPopup(false)
      setSpellingFixed(false)
      setCopilotText("")
      setShowCopilotAccept(false)
      setCopilotAccepted(false)
      setShowSmartReplies(false)
      setSelectedReply(null)
      setMessageSent(false)
      setShowSentAnimation(false)
    }

    const timeout = setTimeout(runAnimation, 1000)
    return () => clearTimeout(timeout)
  }, [phase === 0 ? Date.now() : null])

  return (
    <div className="relative">
      {/* Floating feature badges */}
      <div className="absolute -left-4 top-20 z-10 animate-float-slow hidden xl:block">
        <div className="bg-card border border-border shadow-lg rounded-xl p-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-medium">AI Copilot</p>
            <p className="text-[10px] text-muted-foreground">Writes 50% faster</p>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-4 top-32 z-10 animate-float-medium hidden xl:block">
        <div className="bg-card border border-border shadow-lg rounded-xl p-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Languages className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-medium">Auto-Translate</p>
            <p className="text-[10px] text-muted-foreground">95+ languages</p>
          </div>
        </div>
      </div>
      
      <div className="absolute -left-8 bottom-24 z-10 animate-float-fast hidden xl:block">
        <div className="bg-card border border-border shadow-lg rounded-xl p-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Wand2 className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-medium">Smart Spelling</p>
            <p className="text-[10px] text-muted-foreground">Zero typos</p>
          </div>
        </div>
      </div>

      {/* Main inbox card */}
      <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-muted/80 to-muted/40">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors" />
            </div>
            <span className="text-xs font-medium text-foreground">FloatChat</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] gap-1 border-primary/30 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </Badge>
            <Badge variant="secondary" className="text-[10px] gap-1 bg-primary/10 text-primary border-0">
              <Sparkles className="h-3 w-3" />
              AI Active
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] min-h-[450px]">
          {/* Sidebar */}
          <div className="border-r border-border bg-muted/20 hidden lg:flex flex-col">
            {/* Channel tabs */}
            <div className="flex border-b border-border">
              {[
                { icon: MessageSquare, label: "Chat", count: 3 },
                { icon: Mail, label: "Email", count: 2 },
                { icon: Phone, label: "Voice", count: 0 },
              ].map((tab, i) => (
                <button 
                  key={i}
                  className={`flex-1 py-2.5 text-center text-xs font-medium transition-colors relative ${
                    i === 0 ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mx-auto mb-0.5" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="absolute top-1.5 right-2 w-4 h-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                      {tab.count}
                    </span>
                  )}
                  {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
              ))}
            </div>
            
            {/* Conversations */}
            <div className="flex-1 p-3 space-y-1 overflow-auto">
              {[
                { name: "Sarah Johnson", channel: "WhatsApp", icon: WhatsAppIcon, color: "text-green-500", preview: "Hi, I need help with...", time: "2m", unread: true, active: true },
                { name: "Mike Chen", channel: "Instagram", icon: Instagram, color: "text-pink-500", preview: "Sent you a DM about...", time: "8m", unread: true, active: false },
                { name: "Emma Wilson", channel: "Messenger", icon: Facebook, color: "text-blue-500", preview: "Following up on order", time: "15m", unread: true, active: false },
                { name: "Alex Kumar", channel: "Telegram", icon: TelegramIcon, color: "text-sky-500", preview: "Thanks so much!", time: "1h", unread: false, active: false },
                { name: "Lisa Park", channel: "Email", icon: Mail, color: "text-muted-foreground", preview: "RE: Shipping inquiry", time: "2h", unread: false, active: false },
              ].map((conv, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                    conv.active 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted/60'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="relative flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        conv.active ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <span className="text-xs font-medium">{conv.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-card border border-border flex items-center justify-center`}>
                        <conv.icon className={`w-2.5 h-2.5 ${conv.color}`} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-sm font-medium text-foreground truncate">{conv.name}</span>
                        <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] ${conv.color}`}>{conv.channel}</span>
                        {conv.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.preview}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <span className="text-sm font-medium">SJ</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-card" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <WhatsAppIcon className="h-3 w-3 text-green-500" /> WhatsApp
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs">Resolve</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">Assign</Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-auto bg-gradient-to-b from-muted/10 to-transparent">
              {/* Customer message */}
              <div className="flex gap-3 animate-in slide-in-from-left duration-300">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">SJ</span>
                </div>
                <div>
                  <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-2.5 max-w-sm">
                    <p className="text-sm text-foreground">Hi, I need help with my order #12345. It says delivered but I never received it.</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 ml-1 block">2:34 PM</span>
                </div>
              </div>

              {/* Sent message animation */}
              {messageSent && (
                <div className={`flex gap-3 justify-end transition-all duration-500 ${showSentAnimation ? 'animate-in slide-in-from-bottom-4 fade-in' : ''}`}>
                  <div>
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-2.5 max-w-sm">
                      <p className="text-sm">{smartReplies[1].text}. {fixedText}{copilotCompletion}</p>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 mt-1 mr-1">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">AI-assisted</span>
                      <span className="text-[10px] text-muted-foreground">2:35 PM</span>
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Smart Replies */}
            {showSmartReplies && !messageSent && (
              <div className="px-4 pb-2 animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Smart Replies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {smartReplies.map((reply, i) => (
                    <button
                      key={i}
                      className={`text-xs px-3 py-2 rounded-full border flex items-center gap-1.5 transition-all duration-300 ${
                        selectedReply === i 
                          ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-lg shadow-primary/25' 
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <reply.icon className="h-3 w-3" />
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="p-4 border-t border-border bg-card relative">
              {/* Spelling correction popup */}
              {showSpellingPopup && (
                <div className="absolute bottom-full left-4 mb-2 animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
                  <div className="bg-card border border-yellow-200 shadow-xl rounded-xl p-3 min-w-[240px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Wand2 className="h-3 w-3 text-yellow-600" />
                      </div>
                      <span className="text-xs font-medium">Spelling Corrections</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { from: "chek", to: "check" },
                        { from: "trakking", to: "tracking" },
                        { from: "detials", to: "details" },
                      ].map((fix, i) => (
                        <div key={i} className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-2 py-1">
                          <span className="text-red-500 line-through">{fix.from}</span>
                          <span className="text-muted-foreground mx-2">→</span>
                          <span className="text-green-600 font-medium">{fix.to}</span>
                        </div>
                      ))}
                    </div>
                    <Button size="sm" className="w-full mt-2 h-7 text-xs gap-1">
                      <Check className="h-3 w-3" /> Fix All (3)
                    </Button>
                  </div>
                </div>
              )}

              {/* Copilot suggestion */}
              {phase >= 4 && !copilotAccepted && copilotText && (
                <div className="absolute bottom-full left-4 right-4 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-primary mb-1">AI Copilot Suggestion</p>
                        <p className="text-sm text-foreground">
                          {fixedText}
                          <span className="text-primary">{copilotText}</span>
                          {!showCopilotAccept && <span className="animate-pulse">|</span>}
                        </p>
                      </div>
                      {showCopilotAccept && (
                        <Button size="sm" className="h-7 text-xs gap-1 flex-shrink-0">
                          <Check className="h-3 w-3" /> Accept
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={copilotAccepted ? fixedText + copilotCompletion : typingText}
                    readOnly
                    placeholder="Type your message..."
                    className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm transition-all duration-300 ${
                      showSpellingPopup 
                        ? 'border-yellow-400 bg-yellow-50/50 ring-2 ring-yellow-100' 
                        : spellingFixed && !copilotAccepted
                          ? 'border-green-400 bg-green-50/30' 
                          : copilotAccepted
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-background'
                    }`}
                  />
                  {phase > 0 && phase < 8 && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground animate-pulse">|</span>
                  )}
                </div>
                <Button 
                  size="icon" 
                  className={`h-12 w-12 rounded-xl transition-all duration-300 ${
                    messageSent ? 'bg-green-500 hover:bg-green-600' : ''
                  }`}
                >
                  {messageSent ? <Check className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>

              {/* AI Status bar */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  {[
                    { label: "Spelling", active: phase >= 2 && phase <= 3 },
                    { label: "Copilot", active: phase >= 4 && phase <= 5 },
                    { label: "Smart Reply", active: phase >= 6 },
                  ].map((feature, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        feature.active ? 'bg-green-500 scale-125' : 'bg-muted-foreground/30'
                      }`} />
                      {feature.label}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  AI powered by FloatChat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite 0.5s; }
        .animate-float-fast { animation: float-fast 2.5s ease-in-out infinite 1s; }
      `}</style>
    </div>
  )
}
