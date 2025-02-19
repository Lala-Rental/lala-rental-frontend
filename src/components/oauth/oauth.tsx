import React from 'react'
import ContinueWithGoogle from './with-google.tsx'

interface OauthProps {
  onLoading: (loading: boolean) => void
}

const OAuth: React.FC<OauthProps> = ({ onLoading }) => {
  return (
    <div className="mt-3 space-y-3">
        <ContinueWithGoogle onLoading={onLoading} />
    </div>
  )
}

export default OAuth