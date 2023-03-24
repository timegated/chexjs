import React from 'react'
import { useModels } from '@/hooks/useModels'
const Welcome = () => {
  const {data, error, isLoading} = useModels();

  if (error) return <div>No Models here</div>
  return (
    <section>{data.map((datum: any) => {
      return (
        <article key={datum.id}>
          <div>{datum.id}</div>
          <div>{datum.object}</div>
        </article>
      )
    })}</section>
  )
}

export default Welcome