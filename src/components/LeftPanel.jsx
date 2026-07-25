import { profile } from '../data/profile'
import Icons from './Icons'

const themes = {
  green: {
    iconBg:      'rgba(30,215,96,0.08)',
    iconBorder:  'rgba(30,215,96,0.15)',
    labelColor:  '#1ED760',
    hoverBorder: 'rgba(30,215,96,0.3)',
    hoverBg:     'rgba(30,215,96,0.04)',
  },
  red: {
    iconBg:      'rgba(220,50,50,0.08)',
    iconBorder:  'rgba(220,50,50,0.15)',
    labelColor:  '#e04040',
    hoverBorder: 'rgba(220,50,50,0.35)',
    hoverBg:     'rgba(220,50,50,0.05)',
  },
  blue: {
    iconBg:      'rgba(29,161,242,0.08)',
    iconBorder:  'rgba(29,161,242,0.15)',
    labelColor:  '#1DA1F2',
    hoverBorder: 'rgba(29,161,242,0.3)',
    hoverBg:     'rgba(29,161,242,0.04)',
  },
  purple: {
    iconBg:      'rgba(124,58,237,0.08)',
    iconBorder:  'rgba(124,58,237,0.15)',
    labelColor:  '#7C3AED',
    hoverBorder: 'rgba(124,58,237,0.3)',
    hoverBg:     'rgba(124,58,237,0.04)',
  },
}

function EQBars({ color }) {
  return (
    <div className="bars" style={{ '--bar-color': color }}>
      <span /><span /><span /><span /><span />
    </div>
  )
}

export default function LeftPanel() {
  return (
    <aside className="left">
      <div className="left-top">
        <div className="status">
          <div className="status-dot" />
          {profile.status}
        </div>

        <h1 className="name" data-text={profile.name}>
          {profile.name}
        </h1>

        <p className="tagline">{profile.bio}</p>

        <div className="location">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {profile.location}
        </div>

        {profile.playlists.map((item, i) => {
          const t = themes[item.theme] ?? themes.purple
          return (
            <a
              key={i}
              className="spotify"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = t.hoverBorder
                e.currentTarget.style.background = t.hoverBg
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border2)'
                e.currentTarget.style.background = 'var(--card)'
              }}
            >
              <div className="sp-icon" style={{ background: t.iconBg, borderColor: t.iconBorder }}>
                <EQBars color={t.labelColor} />
              </div>
              <div className="sp-meta">
                <div className="sp-label" style={{ color: t.labelColor }}>{item.label}</div>
                <div className="sp-name" style={{ fontFamily: '"iA Writer Mono", "Fira Mono", ui-monospace, monospace' }}>{item.displayName}</div>
              </div>
            </a>
          )
        })}
      </div>

      <div className="left-bottom">
        <div className="left-handle">{profile.name.toLowerCase()} · 2026</div>
      </div>
    </aside>
  )
}