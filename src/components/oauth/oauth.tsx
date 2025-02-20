import React from 'react'
import ContinueWithGoogle from './with-google.tsx'

interface OauthProps {
  data?: any;
  onSuccess?: (response: any) => void;
}

const OAuth: React.FC<OauthProps> = ({ data, onSuccess }) => {
  return (
    <div className="mt-3 space-y-3">
      <ContinueWithGoogle metaData={data} callback={(response) => onSuccess(response)} />
    </div>
  )
}

export default OAuth