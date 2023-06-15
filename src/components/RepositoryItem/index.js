// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    avatarUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li className="li-container">
      <img className="repository-item-img" src={avatarUrl} alt={name} />
      <h1 className="name">{name} </h1>
      <div className="icon-container">
        <img
          className="icon-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="text">{starsCount} </p>
      </div>
      <div className="icon-container">
        <img
          className="icon-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="text">{forksCount} </p>
      </div>
      <div className="icon-container">
        <img
          className="icon-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="text">{issuesCount} </p>
      </div>
    </li>
  )
}

export default RepositoryItem
