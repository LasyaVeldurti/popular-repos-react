// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {tabItem, onClickTab} = props
  const {language, id} = tabItem

  const displayRepositoryItems = () => {
    onClickTab(id)
  }

  return (
    <li className="list-item">
      <button
        className="list-btn"
        onClick={displayRepositoryItems}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
