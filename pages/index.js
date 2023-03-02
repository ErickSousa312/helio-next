import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/VotePage.module.css'
import { useState } from 'react'
import { SHA256 } from 'crypto-js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [candidate, setCandidate] = useState('');
  const [hashGerado, setHash] = useState('');

  const handleCandidateChange = (event) => {
    setCandidate(event.target.value);
  };

  const handleVote = (e) => {
    e.eventPrevent()
    //chamar da API do Helios para registrar o voto do usuário
    console.log(`Votou em ${candidate}`);
  };

  return (
    <div className={styles.voteContainer}>
      <h1 className={styles.title}>Eleição de 2023</h1>
      <p className={styles.subtitle}>Escolha seu candidato:</p>

      <form onSubmit={handleVote}>
        <label className={styles.label}>
          <input className={styles.input} type="radio" name="candidate" value="Candidato A" onChange={handleCandidateChange} /> Candidato A
        </label>
        <label className={styles.label}>
          <input className={styles.input} type="radio" name="candidato B" value="Candidato B" onChange={handleCandidateChange} /> Candidato B
        </label>
        <label className={styles.label}>
          <input className={styles.input} type="radio" name="candidate" value="Candidato C" onChange={handleCandidateChange} /> Candidato C
        </label>
        <label className={styles.fontLabel}>hash gerado</label><br/>
        <input className={styles.inputs} style={{ textAlign: 'left' }} type="String" name="resultado" onChange={handleCandidateChange} value={hashGerado} disabled /><br/>

        <button className={styles.voteButton}>Votar</button>

      </form>

    </div>
  );
}