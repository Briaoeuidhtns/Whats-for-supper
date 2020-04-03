import React from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'

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
