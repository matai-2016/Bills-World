
import React from 'react'

import './commentCount.css'

class CommentCount extends React.Component {
  render () {
    const comments = this.props.comments
    console.log(comments.length)
    const numberOfComments = comments.length
    return (
      <div className='container-fluid'>
        {numberOfComments}
      </div>
    )
  }
}

export default CommentCount
