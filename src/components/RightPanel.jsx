import { links } from '../data/links'
import Icons from './Icons'

export default function RightPanel() {
  return (
    <main className="right">
      {links.map((section, si) => (
        <div className="section" key={section.category}>
          <div className="section-head">{section.category}</div>
          <div className="grid">
            {section.items.map((item, ii) => (
              <a
                key={item.url}
                className="card"
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{ animationDelay: `${(si * 0.1) + (ii * 0.05)}s` }}
              >
                <div className="card-icon">
                  <Icons name={item.icon} />
                </div>
                <div className="card-text">
                  <div className="card-name">{item.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}