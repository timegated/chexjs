import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useModels } from '@/hooks/useModels'
import styles from '../../styles/Welcome.module.css';
import { GlobalStateContext } from '../context/Global';


interface Permission {
  id: string
  object: string
  created: Date
  allow_create_engine: boolean
  allow_sampling: boolean
  allow_logprobs: boolean
  allow_search_indices: boolean
  allow_view: boolean
  allow_fine_tuning: boolean
  organization: string
  group: null | string
  is_blocking: boolean
}

interface Model {
  id: string
  object: string
  created: number
  owned_by: string
  permission: Permission[]
  root: string
  parent: null | any
}

const code = 'Code';
const text = 'Text';
const gpt = 'GPT';
const sim = 'Similarity';

const Welcome = () => {
  const { data, error } = useModels();
  const [filteredModels, setFilteredModels] = useState<Model[]>(data)
  const [filterString, setFilterString] = useState<string>('');
  const { dispatch } = useContext(GlobalStateContext);


  const filterCode = useCallback(() => (filterString: string): Model[] => data && data.filter((model: Model) => {
    return model.id.includes(filterString);
  }), [data]);

  useEffect(() => {
    setFilteredModels(filterCode()(filterString))
  }, [filterString, filterCode]);

  if (error) return <div>No Models here</div>

  return (
    <>
      <section style={{ display: 'flex', flexDirection: 'column', fontSize: '24px' }}>
        <label htmlFor="select">Filter</label>
        <select className={styles.select} name="filters" id="filters" onChange={(e: any) => setFilterString(e.target.value)}>
          {['', code, text, gpt, sim].map((opt: string) => {
            return <option key={opt} value={opt.toLowerCase()}
            >{opt}</option>
          })}
          <option value=""></option>
        </select>
      </section>
      <section className={styles.models}>{filteredModels && filteredModels.map((model: Model) => {
        return (
          <article className={styles.model} key={model.id} onClick={() => dispatch({ type: 'changeModelChoice', payload: model.id })}>
            <div>{model.id}</div>
          </article>
        )
      })}</section>
    </>
  )
}

export default Welcome