const tabs = [
  { id: 'today', label: 'Bugün' },
  { id: 'products', label: 'Ürünlerim' },
  { id: 'routines', label: 'Rutinlerim' },
]

function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? 'nav-button active' : 'nav-button'}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

export default Navbar