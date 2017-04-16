import React from 'react'

const Reply = (props) => {
  if (props.parentId === props.itemId) {
    return (
      <div>
        <h2>REPLY</h2>
      </div>
    )
  }
}

export default Reply
