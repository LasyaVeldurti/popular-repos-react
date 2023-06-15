import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

// import {each} from 'immer/dist/internal'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoryData: [],
    isLoading: true,
    value: 'ALL',
    showFailureView: false,
  }

  componentDidMount() {
    this.getgithubReposData()
  }

  getRepositoryItemData = data => {
    const updatedData = data.popular_repos.map(eachRepository => ({
      id: eachRepository.id,
      name: eachRepository.name,
      issuesCount: eachRepository.issues_count,
      forksCount: eachRepository.forks_count,
      starsCount: eachRepository.stars_count,
      avatarUrl: eachRepository.avatar_url,
    }))
    this.setState({repositoryData: updatedData, isLoading: false})
  }

  getDisplayFailureView = () => {
    this.setState({showFailureView: true})
  }

  getgithubReposData = async () => {
    const {value} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${value}`
    const response = await fetch(githubReposApiUrl)
    const data = await response.json()

    if (response.ok === true) {
      this.getRepositoryItemData(data)
    } else {
      this.getDisplayFailureView()
    }
  }

  displayTabDetails = id => {
    this.setState({value: id, isLoading: true}, this.getgithubReposData)
  }

  render() {
    const {repositoryData, isLoading, showFailureView} = this.state

    const loadSpinner = (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
    const displayRepositoryData = showFailureView ? (
      <>
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
          <h1 className="failure-page-title">Something Went Wrong</h1>
        </div>
      </>
    ) : (
      <>
        {repositoryData.map(eachData => (
          <RepositoryItem repositoryDetails={eachData} key={eachData.id} />
        ))}
      </>
    )

    return (
      <div className="bg-container">
        <h1 className="main-page-title">Popular</h1>
        <ul className="ul-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              tabItem={eachItem}
              key={eachItem.id}
              onClickTab={this.displayTabDetails}
            />
          ))}
        </ul>

        <ul className="ul-container">
          {isLoading ? loadSpinner : displayRepositoryData}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
