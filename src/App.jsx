import { useState, useEffect, useRef } from "react";

const PASSWORD = "future2025"; // 👈 Change this to whatever you want

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [shaking, setShaking] = useState(false);
  const [wrong, setWrong] = useState(false);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      onUnlock();
    } else {
      setWrong(true);
      setShaking(true);
      setInput("");
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setWrong(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=Space+Mono&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease", padding: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>◎</div>
        <h1 style={{
          fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 6px",
          background: "linear-gradient(135deg, #fff 0%, #888 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Future of Work</h1>
        <div style={{ fontSize: 13, color: "#555", marginBottom: 36, fontFamily: "'Space Mono'" }}>CONFERENCE ACCESS ONLY</div>
        <div style={{
          animation: shaking ? "shake 0.4s ease" : "none",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        }}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter access code"
            autoFocus
            style={{
              width: 260, padding: "14px 18px", borderRadius: 12, fontSize: 15,
              background: "rgba(255,255,255,0.04)",
              border: wrong ? "1px solid #FF6B35" : "1px solid rgba(255,255,255,0.1)",
              color: "#fff", fontFamily: "inherit", textAlign: "center",
              outline: "none", transition: "border 0.2s",
              letterSpacing: input ? 4 : 0,
            }}
          />
          {wrong && <div style={{ fontSize: 12, color: "#FF6B35" }}>Incorrect code — try again</div>}
          <button
            onClick={handleSubmit}
            style={{
              width: 260, padding: "13px 0", borderRadius: 12, border: "none",
              background: "#00FFB2", color: "#000", fontSize: 14, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
            }}
          >Enter →</button>
        </div>
      </div>
    </div>
  );
}

const TOOLS = [
  {
    id: "meeting",
    icon: "◎",
    label: "Meeting Coach",
    tagline: "Decode your meetings",
    color: "#00FFB2",
    placeholder: `Paste a meeting transcript here...

Example:
Sarah: I think we should delay the launch.
Tom: Disagree — the market window closes in Q3.
Sarah: We haven't tested with real users yet.
Tom: We can iterate post-launch. Ship it.
Maya: I side with Sarah, risk is too high right now.`,
    inputLabel: "Meeting Transcript",
    buttonText: "Analyze Meeting",
    systemPrompt: `You are an expert meeting coach and organizational psychologist. Analyze the meeting transcript and return ONLY valid JSON (no markdown, no backticks) with this shape:
{
  "summary": "2-sentence summary of what happened",
  "sentiment": "Collaborative | Tense | Productive | Chaotic",
  "actionItems": ["action 1", "action 2", "action 3"],
  "communicationScores": [
    {"name": "Speaker Name", "score": 85, "trait": "assertive", "tip": "one coaching tip"}
  ],
  "keyInsight": "One powerful insight about team dynamics",
  "riskFlag": "Any concerning pattern, or null"
}`,
    buildPrompt: (input) => `Analyze this meeting transcript:\n\n${input}`,
  },
  {
    id: "jobevo",
    icon: "⟳",
    label: "Job Evolution",
    tagline: "See your role in 2035",
    color: "#FF6B35",
    placeholder: "e.g. Marketing Manager, Software Engineer, HR Director, Accountant...",
    inputLabel: "Your Job Title",
    buttonText: "Simulate Evolution",
    systemPrompt: `You are a future-of-work strategist. Return ONLY valid JSON (no markdown, no backticks) with this shape:
{
  "currentRole": "short description of role today",
  "timeline": [
    {"year": 2026, "change": "what shifts", "aiImpact": "low|medium|high"},
    {"year": 2028, "change": "what shifts", "aiImpact": "low|medium|high"},
    {"year": 2030, "change": "what shifts", "aiImpact": "low|medium|high"},
    {"year": 2033, "change": "what shifts", "aiImpact": "low|medium|high"},
    {"year": 2035, "change": "what shifts", "aiImpact": "low|medium|high"}
  ],
  "survivabilityScore": 72,
  "newJobTitle": "what this role will be called in 2035",
  "skillsToKeep": ["skill1", "skill2", "skill3"],
  "skillsToDrop": ["skill1", "skill2"],
  "skillsToGain": ["skill1", "skill2", "skill3"],
  "verdict": "One punchy sentence about this role's future"
}`,
    buildPrompt: (input) => `Analyze how this job will evolve over the next 10 years: ${input}`,
  },
  {
    id: "teambuilder",
    icon: "⬡",
    label: "Team Builder",
    tagline: "Design your AI-human team",
    color: "#A78BFA",
    placeholder: "e.g. Launch a new fintech product in 6 months with a $2M budget targeting SMBs...",
    inputLabel: "Describe Your Project",
    buttonText: "Build My Team",
    systemPrompt: `You are an organizational design expert specializing in human-AI collaboration. Return ONLY valid JSON (no markdown, no backticks) with this shape:
{
  "projectSummary": "one line summary",
  "humanRoles": [
    {"title": "Role Title", "headcount": 1, "why": "why human is essential here", "keySkill": "top skill needed"}
  ],
  "aiAgents": [
    {"name": "Agent Name", "function": "what it does", "tool": "e.g. Claude, Midjourney, custom LLM", "hoursPerWeek": 40}
  ],
  "teamSize": {"humans": 4, "aiAgents": 3},
  "collaborationModel": "how humans and AI work together",
  "biggestRisk": "the main risk in this team structure",
  "estimatedEfficiencyGain": "X% faster than traditional team"
}`,
    buildPrompt: (input) => `Design the ideal human + AI team for this project: ${input}`,
  },
  {
    id: "skills",
    icon: "▲",
    label: "Skills Gap",
    tagline: "Map your path forward",
    color: "#38BDF8",
    placeholder: "My role: Product Designer at a SaaS startup\nMy goal: Become a VP of Product in 3 years\nMy current skills: Figma, user research, wireframing, some SQL",
    inputLabel: "Your Role, Goal & Current Skills",
    buttonText: "Analyze My Gap",
    systemPrompt: `You are a career development coach and skills strategist. Return ONLY valid JSON (no markdown, no backticks) with this shape:
{
  "currentStrengths": ["strength1", "strength2", "strength3"],
  "criticalGaps": [
    {"skill": "skill name", "urgency": "high|medium|low", "why": "why it matters", "timeToLearn": "e.g. 3 months"}
  ],
  "learningPath": [
    {"phase": "Phase 1 (0-3 months)", "focus": "what to focus on", "resources": ["resource1", "resource2"]}
  ],
  "readinessScore": 61,
  "aiSkillsNeeded": ["AI-specific skills they need"],
  "quickWin": "One thing they can do THIS WEEK",
  "outlook": "Honest 2-sentence assessment of their trajectory"
}`,
    buildPrompt: (input) => `Analyze the skills gap and create a roadmap: ${input}`,
  },
  {
    id: "orgchart",
    icon: "◈",
    label: "Future Org Chart",
    tagline: "Redesign for 2030",
    color: "#F472B6",
    placeholder: "e.g. 200-person B2B SaaS company with sales, marketing, engineering, and customer success teams. Traditional hierarchy, struggling with slow decisions...",
    inputLabel: "Describe Your Company",
    buttonText: "Reimagine the Org",
    systemPrompt: `You are a future-of-work organizational designer. Return ONLY valid JSON (no markdown, no backticks) with this shape:
{
  "currentStructure": "brief description of typical structure today",
  "futureStructure": {
    "model": "name of the new model e.g. Pod-based, Holocratic, AI-first",
    "description": "how it works",
    "layers": [
      {"name": "layer name", "description": "what this layer does", "humanCount": 10, "aiCount": 5}
    ]
  },
  "headcountChange": {"before": 200, "after": 140, "note": "explanation"},
  "newRolesCreated": ["role1", "role2", "role3"],
  "rolesEliminated": ["role1", "role2"],
  "keyPrinciples": ["principle1", "principle2", "principle3"],
  "implementationRisk": "high|medium|low",
  "biggestChallenge": "the hardest part of this transformation"
}`,
    buildPrompt: (input) => `Reimagine this company's org structure for 2030: ${input}`,
  },
  {
    id: "aivhuman",
    icon: "⚖",
    label: "AI vs Human",
    tagline: "Who should own what?",
    color: "#FBBF24",
    placeholder: "e.g. Writing quarterly board reports, conducting performance reviews, analyzing customer churn data, running team standup meetings...",
    inputLabel: "List Tasks to Evaluate",
    buttonText: "Divide the Work",
    systemPrompt: `You are an AI-human collaboration strategist. Return ONLY valid JSON (no markdown, no backticks) with this shape:
{
  "tasks": [
    {
      "task": "task name",
      "owner": "AI" | "Human" | "Collaborative",
      "confidence": 85,
      "reasoning": "why",
      "aiRole": "what AI specifically does (or null)",
      "humanRole": "what human specifically does (or null)"
    }
  ],
  "summary": {
    "aiOwned": 3,
    "humanOwned": 2,
    "collaborative": 2,
    "timeSavings": "estimated % time savings",
    "insight": "one powerful insight about this work breakdown"
  },
  "watchOut": "biggest risk of getting this wrong"
}`,
    buildPrompt: (input) => `Analyze these tasks and determine optimal AI vs human ownership: ${input}`,
  },
];

function LoadingDots({ color }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 10, height: 10, borderRadius: "50%",
            backgroundColor: color,
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function MeetingResult({ data, color }) {
  const sentimentColors = { Collaborative: "#00FFB2", Tense: "#FF6B35", Productive: "#38BDF8", Chaotic: "#F472B6" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>SUMMARY</div>
          <div style={{ fontSize: 14, color: "#e0e0e0", lineHeight: 1.6 }}>{data.summary}</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: `1px solid ${sentimentColors[data.sentiment] || color}44`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 140 }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>SENTIMENT</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: sentimentColors[data.sentiment] || color }}>{data.sentiment}</div>
        </div>
      </div>
      {data.riskFlag && (
        <div style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 12, padding: 14 }}>
          <span style={{ color: "#FF6B35", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⚠ RISK DETECTED: </span>
          <span style={{ color: "#e0e0e0", fontSize: 13 }}>{data.riskFlag}</span>
        </div>
      )}
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 12 }}>COMMUNICATION SCORES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.communicationScores?.map((s, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: "#e0e0e0", fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                <span style={{ color, fontSize: 13, fontWeight: 700 }}>{s.score}/100</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.score}%`, background: color, borderRadius: 2, transition: "width 1s ease" }} />
              </div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>💡 {s.tip}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 10 }}>ACTION ITEMS</div>
          {data.actionItems?.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ color, fontWeight: 700, fontSize: 13 }}>→</span>
              <span style={{ color: "#e0e0e0", fontSize: 13 }}>{a}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: `${color}11`, borderRadius: 12, padding: 16, border: `1px solid ${color}33` }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>KEY INSIGHT</div>
          <div style={{ fontSize: 14, color: "#e0e0e0", lineHeight: 1.6, fontStyle: "italic" }}>"{data.keyInsight}"</div>
        </div>
      </div>
    </div>
  );
}

function JobEvoResult({ data, color }) {
  const impactColor = { low: "#00FFB2", medium: "#FBBF24", high: "#FF6B35" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: 200, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>TODAY'S ROLE</div>
          <div style={{ fontSize: 14, color: "#e0e0e0" }}>{data.currentRole}</div>
          <div style={{ marginTop: 12, fontSize: 11, color: "#888", letterSpacing: 2 }}>BY 2035 CALLED</div>
          <div style={{ fontSize: 18, fontWeight: 700, color, marginTop: 4 }}>{data.newJobTitle}</div>
        </div>
        <div style={{ flex: 1, minWidth: 120, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>SURVIVABILITY</div>
          <div style={{ position: "relative", width: 80, height: 80 }}>
            <svg viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="8"
                strokeDasharray={`${(data.survivabilityScore / 100) * 201} 201`} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color }}>{data.survivabilityScore}</div>
          </div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 14 }}>EVOLUTION TIMELINE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.timeline?.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ minWidth: 40, fontSize: 12, fontWeight: 700, color, paddingTop: 2 }}>{t.year}</div>
              <div style={{ flex: 1, fontSize: 13, color: "#e0e0e0" }}>{t.change}</div>
              <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${impactColor[t.aiImpact]}22`, color: impactColor[t.aiImpact], fontWeight: 700, whiteSpace: "nowrap" }}>AI: {t.aiImpact}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {[["KEEP", data.skillsToKeep, "#00FFB2"], ["GAIN", data.skillsToGain, color], ["DROP", data.skillsToDrop, "#FF6B35"]].map(([label, skills, c]) => (
          <div key={label} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: `1px solid ${c}33` }}>
            <div style={{ fontSize: 10, color: c, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>{label}</div>
            {skills?.map((s, i) => <div key={i} style={{ fontSize: 12, color: "#ccc", marginBottom: 4 }}>• {s}</div>)}
          </div>
        ))}
      </div>
      <div style={{ background: `${color}11`, borderRadius: 12, padding: 14, border: `1px solid ${color}33`, fontSize: 14, color: "#e0e0e0", fontStyle: "italic" }}>
        "{data.verdict}"
      </div>
    </div>
  );
}

function TeamBuilderResult({ data, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>TEAM COMPOSITION</div>
          <div style={{ fontSize: 32, fontWeight: 700, color }}>{data.teamSize?.humans}<span style={{ fontSize: 14, color: "#888", fontWeight: 400 }}> humans</span></div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#A78BFA" }}>{data.teamSize?.aiAgents}<span style={{ fontSize: 14, color: "#888", fontWeight: 400 }}> AI agents</span></div>
          <div style={{ marginTop: 8, fontSize: 13, color: "#00FFB2", fontWeight: 600 }}>{data.estimatedEfficiencyGain} more efficient</div>
        </div>
        <div style={{ flex: 2, minWidth: 200, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>HOW THEY WORK TOGETHER</div>
          <div style={{ fontSize: 13, color: "#e0e0e0", lineHeight: 1.7 }}>{data.collaborationModel}</div>
          <div style={{ marginTop: 12, fontSize: 11, color: "#FF6B35", letterSpacing: 1 }}>⚠ {data.biggestRisk}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 12 }}>HUMAN ROLES</div>
          {data.humanRoles?.map((r, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.humanRoles.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0" }}>{r.title} <span style={{ color: "#666", fontWeight: 400 }}>×{r.headcount}</span></div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{r.why}</div>
              <div style={{ fontSize: 11, color, marginTop: 4 }}>Key skill: {r.keySkill}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: "rgba(167,139,250,0.06)", borderRadius: 12, padding: 16, border: "1px solid rgba(167,139,250,0.2)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 12 }}>AI AGENTS</div>
          {data.aiAgents?.map((a, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.aiAgents.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#A78BFA" }}>{a.name}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{a.function}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{a.tool} · {a.hoursPerWeek}h/wk</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsResult({ data, color }) {
  const urgencyColor = { high: "#FF6B35", medium: "#FBBF24", low: "#00FFB2" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 120, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 8 }}>READINESS</div>
          <div style={{ fontSize: 48, fontWeight: 800, color, lineHeight: 1 }}>{data.readinessScore}</div>
          <div style={{ fontSize: 11, color: "#666" }}>out of 100</div>
        </div>
        <div style={{ flex: 3, minWidth: 200, background: `${color}0d`, borderRadius: 12, padding: 16, border: `1px solid ${color}33` }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 6 }}>QUICK WIN THIS WEEK</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#e0e0e0", marginBottom: 10 }}>⚡ {data.quickWin}</div>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 6 }}>OUTLOOK</div>
          <div style={{ fontSize: 13, color: "#ccc", fontStyle: "italic" }}>{data.outlook}</div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 12 }}>CRITICAL GAPS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.criticalGaps?.map((g, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ minWidth: 50, fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${urgencyColor[g.urgency]}22`, color: urgencyColor[g.urgency], fontWeight: 700, textAlign: "center" }}>{g.urgency}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>{g.skill}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{g.why}</div>
              </div>
              <div style={{ fontSize: 11, color: "#666", whiteSpace: "nowrap" }}>{g.timeToLearn}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 10, color: "#888", letterSpacing: 2, marginBottom: 8 }}>LEARNING PATH</div>
          {data.learningPath?.map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color }}>{p.phase}</div>
              <div style={{ fontSize: 12, color: "#ccc", marginBottom: 4 }}>{p.focus}</div>
              {p.resources?.map((r, j) => <div key={j} style={{ fontSize: 11, color: "#666" }}>→ {r}</div>)}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 10, color: "#888", letterSpacing: 2, marginBottom: 8 }}>AI SKILLS TO GAIN</div>
          {data.aiSkillsNeeded?.map((s, i) => <div key={i} style={{ fontSize: 12, color: "#e0e0e0", marginBottom: 6, display: "flex", gap: 6 }}><span style={{ color }}>✦</span>{s}</div>)}
          <div style={{ marginTop: 12, fontSize: 10, color: "#888", letterSpacing: 2, marginBottom: 8 }}>CURRENT STRENGTHS</div>
          {data.currentStrengths?.map((s, i) => <div key={i} style={{ fontSize: 12, color: "#e0e0e0", marginBottom: 6, display: "flex", gap: 6 }}><span style={{ color: "#00FFB2" }}>✓</span>{s}</div>)}
        </div>
      </div>
    </div>
  );
}

function OrgChartResult({ data, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 6 }}>TODAY</div>
          <div style={{ fontSize: 13, color: "#999" }}>{data.currentStructure}</div>
        </div>
        <div style={{ fontSize: 24, display: "flex", alignItems: "center", color }}>→</div>
        <div style={{ flex: 2, background: `${color}0d`, borderRadius: 12, padding: 16, border: `1px solid ${color}33` }}>
          <div style={{ fontSize: 11, color, letterSpacing: 2, marginBottom: 4 }}>2030 MODEL: {data.futureStructure?.model?.toUpperCase()}</div>
          <div style={{ fontSize: 13, color: "#e0e0e0" }}>{data.futureStructure?.description}</div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 12 }}>NEW STRUCTURE LAYERS</div>
        {data.futureStructure?.layers?.map((l, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color }}>{l.name}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{l.description}</div>
            </div>
            <div style={{ textAlign: "right", minWidth: 100 }}>
              <div style={{ fontSize: 12, color: "#e0e0e0" }}>{l.humanCount} humans</div>
              <div style={{ fontSize: 12, color: "#A78BFA" }}>{l.aiCount} AI</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 10, color: "#00FFB2", letterSpacing: 2, marginBottom: 8 }}>NEW ROLES</div>
          {data.newRolesCreated?.map((r, i) => <div key={i} style={{ fontSize: 12, color: "#e0e0e0", marginBottom: 4 }}>✦ {r}</div>)}
          <div style={{ fontSize: 10, color: "#FF6B35", letterSpacing: 2, margin: "12px 0 8px" }}>ELIMINATED</div>
          {data.rolesEliminated?.map((r, i) => <div key={i} style={{ fontSize: 12, color: "#e0e0e0", marginBottom: 4 }}>✕ {r}</div>)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: 2, marginBottom: 8 }}>HEADCOUNT</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#FF6B35" }}>{data.headcountChange?.before} <span style={{ color: "#666", fontSize: 14 }}>→</span> <span style={{ color: "#00FFB2" }}>{data.headcountChange?.after}</span></div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{data.headcountChange?.note}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: 2, marginBottom: 6 }}>BIGGEST CHALLENGE</div>
            <div style={{ fontSize: 12, color: "#e0e0e0" }}>{data.biggestChallenge}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIvHumanResult({ data, color }) {
  const ownerColor = { AI: "#A78BFA", Human: "#38BDF8", Collaborative: "#00FFB2" };
  const ownerIcon = { AI: "🤖", Human: "👤", Collaborative: "🤝" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[["AI Owned", data.summary?.aiOwned, "#A78BFA"], ["Human Owned", data.summary?.humanOwned, "#38BDF8"], ["Collaborative", data.summary?.collaborative, "#00FFB2"]].map(([label, count, c]) => (
          <div key={label} style={{ flex: 1, minWidth: 100, background: `${c}11`, borderRadius: 12, padding: 14, border: `1px solid ${c}33`, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: c }}>{count}</div>
            <div style={{ fontSize: 11, color: "#888" }}>{label}</div>
          </div>
        ))}
        <div style={{ flex: 2, minWidth: 160, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 4 }}>TIME SAVINGS</div>
          <div style={{ fontSize: 20, fontWeight: 700, color }}>{data.summary?.timeSavings}</div>
          <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{data.summary?.insight}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.tasks?.map((t, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0", flex: 1 }}>{t.task}</div>
              <div style={{ padding: "4px 12px", borderRadius: 20, background: `${ownerColor[t.owner]}22`, color: ownerColor[t.owner], fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                {ownerIcon[t.owner]} {t.owner}
              </div>
              <div style={{ fontSize: 11, color: "#666", minWidth: 40 }}>{t.confidence}%</div>
            </div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{t.reasoning}</div>
            <div style={{ display: "flex", gap: 16 }}>
              {t.aiRole && <div style={{ fontSize: 11, color: "#A78BFA" }}>🤖 {t.aiRole}</div>}
              {t.humanRole && <div style={{ fontSize: 11, color: "#38BDF8" }}>👤 {t.humanRole}</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,107,53,0.08)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,107,53,0.2)", fontSize: 13, color: "#e0e0e0" }}>
        <span style={{ color: "#FF6B35", fontWeight: 700 }}>⚠ Watch out: </span>{data.watchOut}
      </div>
    </div>
  );
}

const RESULT_COMPONENTS = {
  meeting: MeetingResult,
  jobevo: JobEvoResult,
  teambuilder: TeamBuilderResult,
  skills: SkillsResult,
  orgchart: OrgChartResult,
  aivhuman: AIvHumanResult,
};

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("meeting");

  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const tool = TOOLS.find((t) => t.id === activeTab);
  const input = inputs[activeTab] || "";
  const result = results[activeTab];
  const isLoading = loading[activeTab];
  const error = errors[activeTab];

  const handleRun = async () => {
    if (!input.trim()) return;
    setLoading((l) => ({ ...l, [activeTab]: true }));
    setErrors((e) => ({ ...e, [activeTab]: null }));
    setResults((r) => ({ ...r, [activeTab]: null }));
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: tool.systemPrompt,
          messages: [{ role: "user", content: tool.buildPrompt(input) }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResults((r) => ({ ...r, [activeTab]: parsed }));
    } catch (err) {
      setErrors((e) => ({ ...e, [activeTab]: "Something went wrong. Please try again." }));
    } finally {
      setLoading((l) => ({ ...l, [activeTab]: false }));
    }
  };

  const ResultComponent = RESULT_COMPONENTS[activeTab];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#e0e0e0",
      padding: "0 0 40px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        @keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        textarea:focus { outline: none !important; }
        button:active { transform: scale(0.98); }
      `}</style>

      {/* Header */}
      <div style={{ padding: "32px 32px 0", marginBottom: 8 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: 3, marginBottom: 8 }}>POWERED BY CLAUDE AI</div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #ffffff 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1 }}>
          Future of Work
        </h1>
        <div style={{ fontSize: 14, color: "#555", marginTop: 6 }}>Six AI-powered tools for the workplace of tomorrow</div>
      </div>

      {/* Tab Nav */}
      <div style={{ padding: "20px 32px 0", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: activeTab === t.id ? `1px solid ${t.color}66` : "1px solid rgba(255,255,255,0.06)",
              background: activeTab === t.id ? `${t.color}18` : "rgba(255,255,255,0.02)",
              color: activeTab === t.id ? t.color : "#666",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px 32px 0", animation: "fadeIn 0.3s ease" }} key={activeTab}>
        <div style={{ marginBottom: 6, display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{tool.icon} {tool.label}</span>
          <span style={{ fontSize: 13, color: "#555" }}>{tool.tagline}</span>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* Input */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 8 }}>{tool.inputLabel?.toUpperCase()}</div>
            <textarea
              value={input}
              onChange={(e) => setInputs((i) => ({ ...i, [activeTab]: e.target.value }))}
              placeholder={tool.placeholder}
              style={{
                width: "100%",
                minHeight: 180,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 12,
                padding: 16,
                fontSize: 13,
                color: "#ccc",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: 1.6,
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleRun}
              disabled={isLoading || !input.trim()}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "12px 24px",
                borderRadius: 10,
                border: "none",
                background: input.trim() ? tool.color : "rgba(255,255,255,0.06)",
                color: input.trim() ? "#000" : "#444",
                fontSize: 13,
                fontWeight: 700,
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                letterSpacing: 0.5,
                transition: "all 0.2s",
              }}
            >
              {isLoading ? "Analyzing..." : tool.buttonText}
            </button>
          </div>

          {/* Output */}
          <div style={{ flex: 2, minWidth: 300 }}>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 8 }}>ANALYSIS</div>
            <div style={{
              minHeight: 220,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: result || isLoading ? 16 : 0,
              display: "flex",
              alignItems: result || isLoading ? "stretch" : "center",
              justifyContent: result || isLoading ? "stretch" : "center",
            }}>
              {isLoading ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LoadingDots color={tool.color} />
                </div>
              ) : error ? (
                <div style={{ padding: 24, color: "#FF6B35", fontSize: 13 }}>{error}</div>
              ) : result ? (
                <div style={{ flex: 1, animation: "fadeIn 0.4s ease" }}>
                  <ResultComponent data={result} color={tool.color} />
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 40 }}>
                  <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>{tool.icon}</div>
                  <div style={{ fontSize: 13, color: "#444" }}>Enter your input and click "{tool.buttonText}"</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
