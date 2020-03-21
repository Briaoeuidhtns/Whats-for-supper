import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'

interface Props {
  loading?: React.ReactNode
}

const RehydrateGuard: React.FC<Props> = ({ loading, children }) => {
  const rehydrated = useSelector(
    ({ recipes: { rehydrated } }: RootState) => rehydrated
  )
  return <>{rehydrated ? children : loading}</>
}

export default RehydrateGuard
