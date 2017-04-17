
import React from 'react'

import './commentCount.css'

class CommentCount extends React.Component {
  render () {
    const comments = this.props.comments
    const numberOfComments = comments.length
    return (
      <div className='container-fluid'>
        <img className='speech-bubble' src='/img/speech-bubble.jpg' /> {numberOfComments}
      </div>
    )
  }
}

export default CommentCount
