import { useState, useEffect } from 'react'
import { AlertTriangle, BarChart3, Search } from 'lucide-react'

const SCENARIOS = [
  { id: 'all', title: 'All scenarios' },
  { id: '1', title: 'Bias Visibility Problem' },
  { id: '2', title: 'Time and Accountability Issue' },
  { id: '3', title: 'User Behavior and Edge Cases' },
  { id: '4', title: 'Scale and Growth' },
] as const

const POSTS = [
  { author: '@civic_news', content: 'Local election results, turnout up 12%', engagement: 0.82, safetyRisk: 0.15, weights: { Engagement: 0.82, Virality: 0.2, Recency: 0.9, FactCheck: 0.85, Authority: 0.88, Diversity: 0.7 } },
  { author: '@trending_takes', content: '"This one trick changed how I think about algorithms."', engagement: 0.94, safetyRisk: 0.45, weights: { Engagement: 0.94, Virality: 0.6, Recency: 0.7, FactCheck: 0.5, Authority: 0.4, Diversity: 0.5 } },
  { author: '@science_daily', content: 'New study on platform design and attention; peer-reviewed.', engagement: 0.61, safetyRisk: 0.08, weights: { Engagement: 0.61, Virality: 0.3, Recency: 0.8, FactCheck: 0.95, Authority: 0.92, Diversity: 0.75 } },
  { author: '@viral_clips', content: '"You won\'t believe what happened next…"', engagement: 0.88, safetyRisk: 0.72, weights: { Engagement: 0.88, Virality: 0.85, Recency: 0.6, FactCheck: 0.3, Authority: 0.35, Diversity: 0.4 } },
  { author: '@policy_watch', content: 'Draft regulation on recommender transparency for comment.', engagement: 0.44, safetyRisk: 0.05, weights: { Engagement: 0.44, Virality: 0.2, Recency: 0.85, FactCheck: 0.9, Authority: 0.88, Diversity: 0.8 } },
]

const DEMO_REACH = [
  { label: '18–24', pct: 72 },
  { label: '25–34', pct: 88 },
  { label: '35–44', pct: 65 },
  { label: '45–54', pct: 48 },
  { label: '55+', pct: 31 },
]

const HARM_LOG_MESSAGES = [
  'Diversity boost applied to News sector',
  'Fact-check strictness increased for Politics',
  'Engagement spike detected — cooling applied',
  'Demographic parity check passed for Explore',
  'Bias variance above threshold — review queued',
  'Safety filter triggered on 3 items in Feed',
  'Recommendation weights rebalanced for region EU',
  'Audit trail written for high-reach post',
]

const ISSUE_TYPES = [
  'Recommendation bias',
  'Demographic skew',
  'Safety failure',
  'Transparency',
  'Other',
] as const

function App() {
  const [profitVsSocial, setProfitVsSocial] = useState(40)
  const [viralVsFactCheck, setViralVsFactCheck] = useState(35)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [expandedPost, setExpandedPost] = useState<number | null>(null)
  const [harmLog, setHarmLog] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [issueType, setIssueType] = useState<string>(ISSUE_TYPES[0])
  const [evidence, setEvidence] = useState('')

  const fairnessIndex = Math.round(
    100 - (profitVsSocial * 0.4 + viralVsFactCheck * 0.35)
  )
  const clampedFairness = Math.max(0, Math.min(100, fairnessIndex))
  const biasVariance = clampedFairness >= 60 ? 'Low' : clampedFairness >= 35 ? 'Med' : 'High'
  const fairnessColor = clampedFairness >= 60 ? 'text-emerald-400' : clampedFairness >= 35 ? 'text-amber-400' : 'text-rose-400'

  useEffect(() => {
    const t = setInterval(() => {
      const msg = HARM_LOG_MESSAGES[Math.floor(Math.random() * HARM_LOG_MESSAGES.length)]
      setHarmLog((prev) => [msg, ...prev].slice(0, 20))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const submitReport = () => {
    const snippet = evidence.slice(0, 50) + (evidence.length > 50 ? '…' : '')
    setHarmLog((prev) => [`[Report] ${issueType}: ${snippet}`, ...prev])
    setModalOpen(false)
    setEvidence('')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4">
      {/* Header */}
      <header className="glass-box rounded-lg p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Algorithmic Accountability</h1>
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <span className="text-slate-400 text-sm">Fairness Index </span>
            <span className={`font-mono font-bold ${fairnessColor}`}>{clampedFairness}%</span>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Bias Variance </span>
            <span className="font-mono">{biasVariance}</span>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Audit Status </span>
            <span className="text-emerald-400">Active</span>
          </div>
        </div>
        <nav className="flex gap-2 flex-wrap">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-3 py-1.5 rounded text-sm ${activeTab === s.id ? 'bg-slate-600 text-white' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}`}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Tuner */}
        <aside className="lg:col-span-3 glass-box rounded-lg p-4">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Optimization Tuner</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Social Well-being ← → Profit</label>
              <input
                type="range"
                min={0}
                max={100}
                value={profitVsSocial}
                onChange={(e) => setProfitVsSocial(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="text-xs text-slate-500">{profitVsSocial}</span>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Fact-check Strictness ← → Viral Reach</label>
              <input
                type="range"
                min={0}
                max={100}
                value={viralVsFactCheck}
                onChange={(e) => setViralVsFactCheck(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="text-xs text-slate-500">{viralVsFactCheck}</span>
            </div>
          </div>
        </aside>

        {/* Center: Feed */}
        <main className="lg:col-span-5 glass-box rounded-lg p-4">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Decision Engine Feed</h2>
          <div className="space-y-3">
            {POSTS.map((post, i) => (
              <div key={i} className="bg-slate-800/50 rounded p-3 border border-slate-700">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-slate-400 text-sm">{post.author}</span>
                    <p className="text-slate-200 mt-0.5">{post.content}</p>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedPost(expandedPost === i ? null : i)}
                  className="mt-2 flex items-center gap-1 text-xs text-emerald-400 hover:underline"
                >
                  <Search className="w-3.5 h-3.5" /> Algo Insight
                </button>
                {expandedPost === i && (
                  <div className="mt-3 pt-3 border-t border-slate-600 space-y-2">
                    <p className="text-xs text-slate-400">Recommendation Logic Weights</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {Object.entries(post.weights).map(([k, v]) => (
                        <span key={k} className="text-slate-300">{k}: {(v * 100).toFixed(0)}%</span>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Safety Risk</p>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${post.safetyRisk >= 0.6 ? 'bg-rose-500' : post.safetyRisk >= 0.35 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${post.safetyRisk * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* Right: Analytics */}
        <aside className="lg:col-span-4 glass-box rounded-lg p-4 flex flex-col">
          <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Transparency Analytics
          </h2>
          <div className="mb-4">
            <p className="text-xs text-slate-400 mb-2">Demographic Reach</p>
            <div className="space-y-1.5">
              {DEMO_REACH.map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="text-xs w-12 text-slate-400">{d.label}</span>
                  <div className="flex-1 h-4 bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-emerald-600/80 rounded" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-xs text-slate-300 w-8">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <p className="text-xs text-slate-400 mb-2">Harm Detection Log</p>
            <div className="harm-log-scroll h-40 overflow-y-auto space-y-1 text-xs text-slate-300 bg-slate-900/50 rounded p-2">
              {harmLog.length === 0 ? (
                <span className="text-slate-500">Waiting for entries…</span>
              ) : (
                harmLog.map((msg, i) => (
                  <div key={i} className="border-b border-slate-700/50 pb-1">{msg}</div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* CTA */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium"
        >
          <AlertTriangle className="w-4 h-4" /> Report Algorithmic Bias
        </button>
      </div>

      {/* Audit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="glass-box rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Report Algorithmic Bias</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Issue Type</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-slate-200"
                >
                  {ISSUE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Evidence</label>
                <textarea
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  placeholder="e.g. skewed recommendations, repeated content…"
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-slate-200 placeholder-slate-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2 rounded bg-slate-600 hover:bg-slate-500">
                Cancel
              </button>
              <button onClick={submitReport} className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-500">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
