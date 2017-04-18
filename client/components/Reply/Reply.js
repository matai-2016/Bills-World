import React from 'react'
import { connect } from 'react-redux'
import './reply.css'

// import { createReply } from '../../actions/comments.js'

const Reply = (props) => {
  console.log(props.parentId, Number(props.activeParentId))
  return (
    <div>
    {
      props.replying
      &&
      (props.parentId === Number(props.activeParentId))
      &&
      <div>
        <textarea type='text' className='input-box form-control' name='reply' placeholder='Reply here'>
        </textarea>
        <button className='submit-button btn'>Submit</button>
      </div>
    }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeParentId: state.activeReply.parentId,
    replying: state.activeReply.replying
  }
}

export default connect(mapStateToProps)(Reply)
