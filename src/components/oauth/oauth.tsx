import React from 'react'
import ContinueWithGoogle from './with-google.tsx'

interface OauthProps {
  data?: any
}

const OAuth: React.FC<OauthProps> = ({ data }) => {
  return (
    <div className="mt-3 space-y-3">
        <ContinueWithGoogle metaData={data} />
    </div>
  )
}

export default OAuth