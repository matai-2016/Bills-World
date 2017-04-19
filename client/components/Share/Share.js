import React from 'react'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'

const Share = (props) => {
  const { FacebookShareButton, TwitterShareButton } = ShareButtons
  const { FacebookShareCount } = ShareCounts
  const FacebookIcon = generateShareIcon('facebook')
  const TwitterIcon = generateShareIcon('twitter')
  const shareUrl = 'billsworld.co.nz/' + props.billNumber
  const title = props.title
  const summary = props.summary
  return (
    <div className='share-container'>
      <FacebookShareButton
        url={shareUrl}
        title={title}
        description={summary}
        picture={`http://hotelwaterloo.co.nz/wp-content/uploads/The-Beehive.jpg`}
        className='facebook-share'>
        <FacebookIcon
          size={32}
          round />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title={title}
        className='share-button'>
        <TwitterIcon
          size={32}
          round />
      </TwitterShareButton>
    </div>
  )
}

export default Share
