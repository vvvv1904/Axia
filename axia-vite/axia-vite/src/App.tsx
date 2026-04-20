/* ═══════════════════════════════════════════════════════════════════════
   AXIA WAITLIST — Single-File Frontend (Vite + Convex)
   Dark page background + white/cream component cards
   ═══════════════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";
import {
  Loader2,
  CheckCircle2,
  Shield,
  Clock,
  Zap,
  ChevronRight,
  FileCheck,
  Layers,
  Monitor,
  BarChart3,
  MessageSquare,
  CreditCard,
  Link2,
  Copy,
  Share2,
  Gift,
  Crown,
  Star,
  Scissors,
  X,
  Check,
  Minus,
} from "lucide-react";

/* ─── Constants ──────────────────────────────────────────────────────── */
const REFERRAL_REWARDS = [
  { count: 1, label: "Priority early access", icon: Zap },
  { count: 3, label: "3 months free on Starter", icon: Star },
  { count: 5, label: "50% off any tier for life", icon: Crown },
  { count: 10, label: "Expert tier free for 1 year", icon: Gift },
] as const;

const SHARE_PLATFORMS = [
  { name: "Twitter", color: "bg-[#1DA1F2]", icon: "X", label: "Tweet" },
  { name: "WhatsApp", color: "bg-[#25D366]", icon: "W", label: "Share" },
  { name: "Facebook", color: "bg-[#1877F2]", icon: "f", label: "Share" },
  { name: "LinkedIn", color: "bg-[#0A66C2]", icon: "in", label: "Share" },
] as const;

const TOTAL_FOUNDING_SPOTS = 200;
void TOTAL_FOUNDING_SPOTS;

/* ─── Pricing Tiers (matching screenshot) ──────────────────────────── */
const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    originalPrice: "",
    period: "",
    savings: "",
    desc: "Get started with basic protection",
    highlight: false,
    buttonLabel: "Get Started",
    features: [
      { text: "1 Report/Month", included: true },
      { text: "Basic Evidence", included: true },
      { text: "Manual Evidence Review", included: true },
      { text: "Automated Analysis", included: false },
      { text: "Cross-Platform Sync", included: false },
      { text: "Policy Analysis", included: false },
    ],
  },
  {
    name: "Starter",
    price: "$7",
    originalPrice: "$14",
    period: "/mo",
    savings: "Save $84/year",
    desc: "Perfect for part-time freelancers",
    highlight: false,
    buttonLabel: "Start Free Trial",
    features: [
      { text: "5 Reports/Month", included: true },
      { text: "Basic Evidence Collection", included: true },
      { text: "Platform Integration", included: true },
      { text: "Evidence Timeline View", included: true },
      { text: "Automated Analysis", included: false },
      { text: "Team Validation", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$15",
    originalPrice: "$30",
    period: "/mo",
    savings: "Save $180/year",
    desc: "For full-time freelancers",
    highlight: true,
    buttonLabel: "Start Free Trial",
    features: [
      { text: "Unlimited Reports", included: true },
      { text: "Advanced Evidence Collection", included: true },
      { text: "Automated Dispute Analysis", included: true },
      { text: "Cross-Platform Sync", included: true },
      { text: "Custom Policy Analysis", included: true },
      { text: "Team Validation", included: false },
      { text: "Premium Network", included: false },
    ],
  },
  {
    name: "Expert",
    price: "$49",
    originalPrice: "$98",
    period: "/mo",
    savings: "Save $588/year",
    desc: "For high-earning professionals",
    highlight: false,
    buttonLabel: "Start Free Trial",
    features: [
      { text: "All Pro Features", included: true },
      { text: "Team Validation", included: true },
      { text: "Policy Deep Analysis", included: true },
      { text: "Premium Network Access", included: true },
      { text: "Priority Processing", included: true },
      { text: "WCVM Access", included: true },
      { text: "White Label Option", included: true },
    ],
  },
] as const;

/* ─── DuctTapeStack Component ────────────────────────────────────────── */
function DuctTapeStack() {
  const tools = [
    { name: "Google Docs", icon: FileCheck, color: "text-blue-600" },
    { name: "Trello", icon: Layers, color: "text-sky-600" },
    { name: "Stripe", icon: CreditCard, color: "text-purple-600" },
    { name: "Loom", icon: Monitor, color: "text-rose-600" },
    { name: "Slack", icon: MessageSquare, color: "text-amber-600" },
  ];
  return (
    <div className="relative py-4 px-2">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "22%", left: "5%", right: "5%", h: 18, rot: -1.5, opacity: 0.6 },
          { top: "52%", left: "8%", right: "3%", h: 16, rot: 1, opacity: 0.5 },
          { top: "10%", left: "15%", right: "15%", h: 14, rot: 6, opacity: 0.4 },
        ].map((t, i) => (
          <div
            key={i}
            className="absolute rounded-[2px]"
            style={{
              top: t.top, left: t.left, right: t.right, height: t.h, opacity: t.opacity,
              background: "linear-gradient(180deg, #C4A44A 0%, #B89530 40%, #D4B85A 60%, #C4A44A 100%)",
              transform: `rotate(${t.rot}deg)`,
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.15) 8px, rgba(0,0,0,0.15) 9px)" }}
            />
          </div>
        ))}
        <div
          className="absolute bottom-[18%] right-[10%] w-[50px] h-[20px] rounded-[2px] opacity-45"
          style={{
            background: "linear-gradient(180deg, #C4A44A 0%, #B89530 50%, #D4B85A 100%)",
            transform: "rotate(-4deg)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        />
      </div>
      <div className="relative space-y-2.5">
        {tools.map((t, i) => (
          <div
            key={t.name}
            className="jitter-hover flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-dashed border-red-300 bg-[#FFF5F5]"
            style={{ transform: `rotate(${(i - 2) * 1.8}deg) translateX(${i % 2 === 0 ? 3 : -3}px)` }}
          >
            <t.icon className={`w-4 h-4 ${t.color}`} />
            <span className="text-slate-700 text-sm font-medium">{t.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute -top-1 -right-1 text-amber-600/40">
        <Scissors className="w-5 h-5" />
      </div>
    </div>
  );
}

/* ─── DashboardMock Component — white card on dark bg ────────────── */
function AxiaDashboardMock() {
  return (
    <div className="bg-[#FDFBF7] border border-slate-200 rounded-xl overflow-hidden shadow-2xl shadow-black/30">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-[#F8F6F0]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-1 bg-white rounded text-xs text-slate-400 font-mono border border-slate-200">
            app.axia.io/dashboard
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Active Projects", value: "7", change: "+2" },
            { label: "Verified Hours", value: "142", change: "+18" },
            { label: "Revenue MTD", value: "$12,840", change: "+$2.1k" },
          ].map((s) => (
            <div key={s.label} className="bg-[#F8F6F0] rounded-lg p-3 border border-slate-100">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-xl font-semibold text-slate-800">{s.value}</p>
              <p className="text-xs text-emerald-600">{s.change} this week</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F8F6F0] rounded-lg p-3 border border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Recent Verified Deliverables</p>
          {[
            { project: "Brand Redesign — Acme Co", time: "3h 42m", status: "Verified" },
            { project: "API Integration — FinFlow", time: "5h 10m", status: "Verified" },
            { project: "Landing Page — NovaTech", time: "2h 18m", status: "Pending" },
          ].map((a) => (
            <div key={a.project} className="flex items-center justify-between py-1.5 border-t border-slate-100">
              <span className="text-sm text-slate-700">{a.project}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{a.time}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${a.status === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs text-amber-700 font-medium">Invoice #1042 — includes verified work log</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
        </div>
      </div>
    </div>
  );
}

/* ─── ReferralPopup Component — white card popup ──────────────────── */
function ReferralPopup({ isOpen, onClose, position, referralCode, referralCount }: {
  isOpen: boolean; onClose: () => void; position: number; referralCode: string; referralCount: number;
}) {
  const [copied, setCopied] = useState(false);
  const referralLink = typeof window !== "undefined" ? `${window.location.origin}/?ref=${referralCode}` : "";

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  }, [referralLink]);

  const shareOn = useCallback((platform: string) => {
    const text = "I just joined the Axia waitlist! One tab for your entire business — CRM, invoicing, and verified work logs. Get early access:";
    const urls: Record<string, string> = {
      Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      WhatsApp: `https://wa.me/?text=${encodeURIComponent(text + " " + referralLink)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(text)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  }, [referralLink]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-reveal-1">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#FDFBF7] border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-axia-gold via-axia-gold-light to-axia-gold" />
        <div className="p-6 md:p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 bg-axia-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-7 h-7 text-axia-gold" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center mb-2">You&apos;re on the list!</h2>
          <p className="text-slate-500 text-center text-sm mb-6">
            Your spot is <span className="text-axia-gold font-bold text-lg">#{position}</span> — refer friends to move up!
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-center">
            <p className="text-slate-800 font-semibold text-sm mb-1">Want to move up the list?</p>
            <p className="text-slate-500 text-xs">Refer friends and unlock rewards at every milestone</p>
          </div>
          <div className="mb-4">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-1.5">Your referral link</p>
            <div className="flex items-center gap-2">
              <input readOnly value={referralLink} onClick={(e) => (e.target as HTMLInputElement).select()}
                className="h-9 flex-1 bg-white border border-slate-200 rounded-md px-3 text-slate-600 text-xs font-mono focus:outline-none" />
              <button onClick={copyLink}
                className="h-9 px-3 bg-axia-gold hover:bg-axia-gold-light text-[#070F1B] text-xs font-semibold rounded-md cursor-pointer flex items-center gap-1">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="flex gap-2 mb-5">
            {SHARE_PLATFORMS.map((p) => (
              <button key={p.name} onClick={() => shareOn(p.name)}
                className={`flex-1 ${p.color} text-white rounded-lg py-2 flex items-center justify-center gap-1.5 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer`}>
                <span className="text-sm font-bold">{p.icon}</span>
                <span className="hidden sm:inline">{p.label}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Your referral progress</p>
              <span className="text-xs text-axia-gold font-semibold">{referralCount} referred</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {REFERRAL_REWARDS.map((reward) => {
                const achieved = referralCount >= reward.count;
                return (
                  <div key={reward.count}
                    className={`text-center p-2 rounded-lg ${achieved ? "bg-axia-gold/10 border border-axia-gold/20" : "bg-white border border-slate-200"}`}>
                    <reward.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${achieved ? "text-axia-gold" : "text-slate-300"}`} />
                    <p className={`text-[10px] font-semibold ${achieved ? "text-axia-gold" : "text-slate-400"}`}>{reward.count}</p>
                    <p className="text-[8px] text-slate-400 leading-tight">{reward.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────────────── */
export default function App({ hasBackend = false }: { hasBackend?: boolean }) {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const refCode = searchParams.get("ref");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [myReferralCode, setMyReferralCode] = useState("");
  const [myReferralCount] = useState(0);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

const countData = useQuery(hasBackend ? api.waitlist.getCount : "skip");

  const signupCount = hasBackend ? (countData?.total ?? 100) : 107;
  const spotsRemaining = hasBackend ? (countData?.remaining ?? 100) : 93;

  useEffect(() => {
    if (!hasBackend || !myReferralCode) return;
    const interval = setInterval(async () => {}, 8000);
    return () => clearInterval(interval);
  }, [myReferralCode, hasBackend]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) { toast.error("Please enter a valid email"); return; }
    setIsLoading(true);
    try {
      if (!hasBackend) {
        await new Promise((r) => setTimeout(r, 800));
        const fakeCode = "AX-" + Math.random().toString(36).substring(2, 7).toUpperCase();
        setIsSuccess(true); setPosition(Math.floor(Math.random() * 20) + 80);
        setMyReferralCode(fakeCode); setShowReferralPopup(true);
        toast.success("Welcome! You're on the list (demo mode).");
      } else {
        const result = await joinWaitlist({ email, ref: refCode || undefined });
        if (result.success) {
          setIsSuccess(true); setPosition((result.entry as any)?.position || 100);
          setMyReferralCode((result.entry as any)?.referralCode || "");
          setShowReferralPopup(true); toast.success(result.message as string);
        } else { toast.error(result.error as string); }
      }
    } catch {
      if (!hasBackend) {
        const fakeCode = "AX-" + Math.random().toString(36).substring(2, 7).toUpperCase();
        setIsSuccess(true); setPosition(Math.floor(Math.random() * 20) + 80);
        setMyReferralCode(fakeCode); setShowReferralPopup(true);
        toast.success("Welcome! You're on the list (demo mode).");
      } else { toast.error("Failed to join. Please try again."); }
    } finally { setIsLoading(false); }
  };

  const SectionHeader = ({ label, title, subtitle, maxWidth = "max-w-lg" }: {
    label: string; title: string; subtitle: string; maxWidth?: string;
  }) => (
    <div className="text-center mb-16">
      <p className="text-sm text-axia-gold uppercase tracking-[0.08em] font-medium mb-3">{label}</p>
      <h2 className="text-[34px] sm:text-[40px] font-bold text-white tracking-[-0.02em] mb-4">{title}</h2>
      <p className={`text-slate-400 text-lg ${maxWidth} mx-auto`}>{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070F1B] flex flex-col">
      <ReferralPopup isOpen={showReferralPopup} onClose={() => setShowReferralPopup(false)}
        position={position} referralCode={myReferralCode} referralCount={myReferralCount} />

      {/* ─── Nav — dark background ─── */}
      <nav className="border-b border-[#2E5580]/60 bg-[#070F1B]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-axia-gold rounded-lg flex items-center justify-center">
              <span className="text-[#070F1B] font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">Axia</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-axia-gold animate-pulse" />
            <span className="text-sm text-slate-300 font-medium">
              {signupCount > 100 ? `${signupCount.toLocaleString()} people waiting` : "100+ people waiting"}
            </span>
            <span className="text-xs text-amber-400 font-semibold">· Only {spotsRemaining} spots left</span>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* ═══════ SECTION 1 — HERO ═══════ */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <div className="animate-reveal-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-axia-gold/5 border border-axia-gold/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-axia-gold animate-pulse" />
                <span className="text-axia-gold text-sm font-medium tracking-wide">
                  100+ people already waiting — only {spotsRemaining} founding spots left
                </span>
              </div>
              <h1 className="animate-reveal-2 text-[38px] sm:text-[48px] md:text-[56px] font-bold text-white leading-[1.08] tracking-[-0.03em] mb-6">
                Your business, one tab.<br />
                <span className="text-axia-gold">Ten hours back, every week.</span>
              </h1>
              <p className="animate-reveal-3 text-lg text-slate-400 leading-relaxed mb-10 max-w-[520px]">
                Axia replaces the five tools you duct-taped together — CRM, invoicing, time tracking, and a
                verification engine that makes &ldquo;What did you work on?&rdquo; emails disappear. One tab. Zero chaos.
              </p>
              <form onSubmit={handleSubmit} className="animate-reveal-4 mb-4" id="signup-form">
                <div className="flex gap-2.5">
                  <input type="email" placeholder="you@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="h-14 flex-1 bg-[#142840] border border-[#2E5580] focus:border-axia-gold focus:ring-1 focus:ring-axia-gold/10 text-white placeholder:text-slate-600 text-base rounded-lg px-4 focus:outline-none" />
                  <button type="submit" disabled={isLoading}
                    className="h-14 px-8 bg-axia-gold hover:bg-axia-gold-light text-[#070F1B] font-semibold text-base rounded-lg whitespace-nowrap cursor-pointer flex items-center justify-center disabled:opacity-60">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Secure Founding Access"}
                  </button>
                </div>
              </form>
              <div className="animate-reveal-5 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["bg-amber-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500"].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#070F1B] flex items-center justify-center`}>
                      <span className="text-white text-[10px] font-bold">{["J", "M", "S", "K"][i]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-300">
                  {signupCount > 100 ? `${signupCount.toLocaleString()} professionals` : "100+ professionals"} already waiting
                  <span className="text-slate-500"> · </span>
                  <span className="text-amber-400 font-semibold">Only {spotsRemaining} spots left</span>
                  <span className="text-slate-500"> · </span>
                  <span className="text-axia-gold">Referral rewards</span> for founding members
                </p>
              </div>
              {refCode && (
                <div className="animate-reveal-5 mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-axia-gold/5 border border-axia-gold/20">
                  <Share2 className="w-3 h-3 text-axia-gold" />
                  <span className="text-xs text-axia-gold">You were referred — skip the line!</span>
                </div>
              )}
            </div>
            <div className="animate-reveal-4 hidden lg:block">
              <AxiaDashboardMock />
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 2 — FEATURES (dark bg, cream cards) ═══════ */}
        <section className="border-t border-[#2E5580]/40 bg-[#0C1624]">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <SectionHeader label="What You Get" title="One workspace. Every tool you need."
              subtitle="From first lead to final payment — Axia handles the entire lifecycle. No duct tape. No gaps. No extra subscriptions." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {[
                { icon: FileCheck, title: "Smart Proposals", desc: "Draft proposals in your brand voice with smart follow-ups that trigger on Day 3, 7, and 14 — so you never chase manually. Close deals faster without the back-and-forth." },
                { icon: CreditCard, title: "Validated Billing", desc: "Invoices that prove their own worth. Every line item links back to verified work logs — no more disputes over hours. Get paid what you earned, every time." },
                { icon: BarChart3, title: "CRM & Pipeline", desc: "Visual pipeline board tracks every deal from first contact to close. Know exactly where your money is, who needs follow-up, and what to prioritize next." },
                { icon: Clock, title: "Verified Workstreams", desc: "Zero-friction time tracking that records automatically. Alerts when work not started. Your work logs build themselves — accurate down to the minute." },
                { icon: Shield, title: "Truth Layer Verification", desc: "A background engine that validates activity in real-time. Provides indisputable proof of what was done, when, and for how long — accelerating client trust instantly." },
                { icon: MessageSquare, title: "Automated Alignment", desc: "Smart sequences that replace manual chasing. Payment reminders, status updates, and check-ins — all on autopilot. Your clients stay informed without your effort." },
                { icon: Monitor, title: "Revenue Protection", desc: "Catch scope creep as it happens with automatic detection and one-click change orders. Never do unpaid work again — every hour is accounted for and billable." },
                { icon: Zap, title: "Instant Setup, Zero Config", desc: "No workflow builders. No automation rules to configure. Add your email, set your brand, and everything runs from day one. Working in under ten minutes." },
              ].map((f) => (
                <div key={f.title}
                  className="bg-[#FDFBF7] border border-slate-200 hover:border-axia-gold/30 transition-colors group shadow-lg shadow-black/20 rounded-xl p-6">
                  <div className="w-12 h-12 bg-axia-gold/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-axia-gold/20 transition-colors">
                    <f.icon className="w-6 h-6 text-axia-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-base text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            {/* Comparison table — cream card */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-[#FDFBF7] border border-slate-200 rounded-xl overflow-hidden shadow-lg shadow-black/20">
                <div className="grid grid-cols-3 text-center border-b border-slate-200">
                  <div className="py-3 px-4 bg-slate-50"><span className="text-sm text-slate-500 font-medium">Capability</span></div>
                  <div className="py-3 px-4 bg-red-50"><span className="text-sm text-red-400 font-medium">Others</span></div>
                  <div className="py-3 px-4 bg-amber-50"><span className="text-sm text-axia-gold font-medium">Axia</span></div>
                </div>
                {[
                  { feature: "Proposal workflow", others: "Manual or partial", axia: "Auto-drafted + smart follow-ups" },
                  { feature: "Work verification", others: "Screenshots only", axia: "Truth Layer — full audit trail" },
                  { feature: "Invoice proof", others: "Static PDF", axia: "Validated Billing — linked to work" },
                  { feature: "Scope creep protection", others: "Manual tracking", axia: "Auto-detected + change orders" },
                  { feature: "Setup time", others: "3–7 days", axia: "10 minutes" },
                ].map((row) => (
                  <div key={row.feature} className="grid grid-cols-3 text-center border-b border-slate-100 last:border-b-0">
                    <div className="py-3 px-4 text-sm text-slate-700 font-medium text-left">{row.feature}</div>
                    <div className="py-3 px-4 text-sm text-slate-400">{row.others}</div>
                    <div className="py-3 px-4 text-sm text-axia-gold font-medium">{row.axia}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 3 — BEFORE & AFTER (dark bg, cream cards) ═══════ */}
        <section className="border-t border-[#2E5580]/40">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <SectionHeader label="The Before & After" title="You didn't start a business to manage a tech stack."
              subtitle="Stop duct-taping your workflow together. Axia unifies your deal flow into a single, verified narrative." maxWidth="max-w-xl" />
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="rounded-xl border border-dashed border-red-300 bg-[#FFF5F5] p-5 shadow-lg shadow-black/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Before</span>
                  <span className="text-[10px] text-slate-400">— the duct-tape stack</span>
                </div>
                <DuctTapeStack />
              </div>
              <div className="rounded-xl border border-axia-gold/20 bg-[#FDFBF7] p-5 shadow-lg shadow-black/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-axia-gold uppercase tracking-wider">After</span>
                  <span className="text-[10px] text-slate-400">— Axia</span>
                </div>
                <div className="space-y-3 p-3">
                  {[
                    { icon: FileCheck, label: "Contracts & Proposals" },
                    { icon: Clock, label: "Verified Time Tracking" },
                    { icon: BarChart3, label: "CRM & Pipeline" },
                    { icon: CreditCard, label: "Invoicing & Payments" },
                    { icon: Shield, label: "Work Verification Engine" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-slate-200">
                      <t.icon className="w-4 h-4 text-axia-gold" />
                      <span className="text-sm text-slate-700 font-medium">{t.label}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 4 — TRUTH LAYER (dark bg, cream cards) ═══════ */}
        <section className="border-t border-[#2E5580]/40 bg-[#0C1624]">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="max-w-4xl mx-auto">
              <SectionHeader label="The Difference" title="Other tools stop once the contract is signed." subtitle="Axia is just getting started." />
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                <div className="bg-[#FDFBF7] border border-slate-200 rounded-xl p-6 shadow-lg shadow-black/20">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-4">Other tools</p>
                  <ul className="space-y-3">
                    {["Proposals & contracts", "Basic invoicing", "Payment collection", "Template library"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-base text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />{item}
                      </li>
                    ))}
                    {["Verified work logs", "Automated context capture", "Dispute-proof billing"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-base text-slate-300 line-through">
                        <span className="w-3.5 h-3.5 flex-shrink-0 text-center text-red-400/60">x</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#FDFBF7] border border-axia-gold/20 rounded-xl p-6 relative shadow-lg shadow-black/20">
                  <div className="absolute -top-2.5 left-4">
                    <span className="bg-axia-gold text-[#070F1B] text-xs font-semibold px-2.5 py-0.5 rounded-md">Truth Layer</span>
                  </div>
                  <p className="text-xs text-axia-gold/70 uppercase tracking-wider font-medium mb-4 mt-1">Axia</p>
                  <ul className="space-y-3">
                    {["Proposals & contracts", "Validated Billing", "Payment collection", "Template library", "Verified Workstreams", "Automated context capture", "Dispute-proof invoicing"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-base text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-axia-gold flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-center text-slate-400 text-[15px] leading-relaxed max-w-xl mx-auto">
                Generic tools manage your documents; Axia manages your <span className="text-white font-medium">work</span>.
                Our verification engine validates your activity in the background — providing transparency that accelerates
                client trust and ensures you&apos;re compensated for every second.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 5 — JUSTIFICATION IS CONSTANT (dark bg, cream cards) ═══════ */}
        <section className="border-t border-[#2E5580]/40">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeader label="For the 99%" title="Disputes are rare. Justification is constant."
                subtitle={'You\'re probably losing 3–5 hours a week manually proving your value — updating clients, second-guessing invoices, documenting work "just in case." Axia automates your professional transparency. Lead with indisputable evidence — not over-explanation.'} />
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                {[
                  { icon: Clock, stat: "3–5 hrs", label: "saved per week on justification" },
                  { icon: CreditCard, stat: "Validated", label: "invoices that prove their own worth" },
                  { icon: Link2, stat: "Zero-friction", label: "work streams, recorded automatically" },
                ].map((t) => (
                  <div key={t.label} className="bg-[#FDFBF7] border border-slate-200 rounded-xl p-6 shadow-lg shadow-black/20">
                    <t.icon className="w-6 h-6 text-axia-gold mb-4" />
                    <p className="text-2xl font-bold text-slate-900 mb-2">{t.stat}</p>
                    <p className="text-base text-slate-400">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 6 — PRICING (dark bg, cream cards) ═══════ */}
        <section className="border-t border-[#2E5580]/40 bg-[#0C1624]">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <SectionHeader label="Pricing Preview" title="Start free. Scale when you're ready."
              subtitle="Every plan includes the Truth Layer. The difference is how much power you need." maxWidth="max-w-md" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {PRICING_TIERS.map((tier) => (
                <div key={tier.name}
                  className={`bg-[#FDFBF7] border rounded-xl p-6 relative flex flex-col shadow-lg shadow-black/20 ${
                    tier.highlight ? "border-axia-gold/40 ring-1 ring-axia-gold/20" : "border-slate-200"
                  }`}>
                  {tier.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-axia-gold text-[#070F1B] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    {tier.period && <span className="text-base text-slate-400">{tier.period}</span>}
                  </div>
                  {tier.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-slate-400 line-through">{tier.originalPrice}</span>
                      {tier.savings && <span className="text-xs font-semibold text-emerald-600">{tier.savings}</span>}
                    </div>
                  )}
                  <p className="text-sm text-slate-500 mb-5">{tier.desc}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f.text} className={`flex items-center gap-2.5 text-sm ${f.included ? "text-slate-700" : "text-slate-300"}`}>
                        {f.included ? <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> : <Minus className="w-4 h-4 text-slate-300 flex-shrink-0" />}
                        <span className={f.included ? "" : "line-through"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-colors ${
                    tier.highlight ? "bg-axia-gold hover:bg-axia-gold-light text-[#070F1B]" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}>
                    {tier.buttonLabel}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant activation
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 7 — REFERRAL REWARDS (dark bg, cream cards) ═══════ */}
        <section className="border-t border-[#2E5580]/40">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <SectionHeader label="Referral Rewards" title="Share Axia. Get rewarded."
              subtitle="Every friend you refer moves you up the list and unlocks perks. The more you share, the more you earn." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
              {REFERRAL_REWARDS.map((r) => (
                <div key={r.count} className="bg-[#FDFBF7] border border-slate-200 hover:border-axia-gold/30 transition-colors rounded-xl p-6 text-center shadow-lg shadow-black/20">
                  <div className="w-12 h-12 bg-axia-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <r.icon className="w-6 h-6 text-axia-gold" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{r.count}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">referrals</p>
                  <p className="text-sm text-slate-600">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 8 — BOTTOM CTA ═══════ */}
        <section className="border-t border-[#2E5580]/40 bg-[#0C1624]">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-[34px] sm:text-[40px] font-bold text-white tracking-[-0.02em] mb-4">
                Stop duct-taping. Start building.
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Join {signupCount > 100 ? `${signupCount.toLocaleString()}` : "100+"} professionals already on the
                waitlist. Only {spotsRemaining} founding spots remaining.
              </p>
              {!isSuccess && (
                <form onSubmit={handleSubmit} className="flex gap-2.5 max-w-lg mx-auto">
                  <input type="email" placeholder="you@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="h-14 flex-1 bg-[#142840] border border-[#2E5580] focus:border-axia-gold focus:ring-1 focus:ring-axia-gold/10 text-white placeholder:text-slate-600 text-base rounded-lg px-4 focus:outline-none" />
                  <button type="submit" disabled={isLoading}
                    className="h-14 px-8 bg-axia-gold hover:bg-axia-gold-light text-[#070F1B] font-semibold text-base rounded-lg whitespace-nowrap cursor-pointer flex items-center justify-center disabled:opacity-60">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Early Access"}
                  </button>
                </form>
              )}
              {isSuccess && (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">You&apos;re on the list! Check your referral link above.</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer — dark ─── */}
      <footer className="border-t border-[#2E5580]/40 bg-[#070F1B]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-axia-gold rounded-md flex items-center justify-center">
              <span className="text-[#070F1B] font-bold text-xs">A</span>
            </div>
            <span className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Axia. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
