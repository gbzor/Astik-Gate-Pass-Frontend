import seal from '../../assets/seal.png'

export default function BrandPanel({ text }) {
  return (
    <aside className="brand-panel">
      <div className="seal">
        <img src={seal} alt="Ateneo de Naga University seal" width="92" height="92" />
      </div>
      <p className="brand-school">ATENEO DE NAGA UNIVERSITY</p>
      <p className="brand-title">Astik GatePass</p>
      <p className="brand-text">{text}</p>
      <p className="brand-footer">© 2026 Ateneo de Naga University · Astik GatePass</p>
    </aside>
  )
}
