import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/VotePage.module.css'
import { useState } from 'react'
import { SHA256 } from 'crypto-js'

export default function Home() {
  const [candidate, setCandidate] = useState('');
  const [eleicao, setEleicao] = useState('');
  const [hashEleicao, setHashEleicao] = useState('');
  const [hashVoto, setHashVoto] = useState('');
  

  const handleCandidateChange = (event) => {
    setCandidate(event.target.value);
  };
  const handleEleicaoChange = (event) => {
    setEleicao(event.target.value);
  };

  const generateHash=(text)=> {
    return SHA256(text).toString();
  }


  const handleVote = (e) => {
    e.preventDefault();
    //chamar da API do Helios para registrar o voto do usuário
    const candidateString = JSON.stringify(candidate);
    const eleicaoString = JSON.stringify(eleicao);
    setHashEleicao(generateHash(candidateString))  
    setHashVoto(generateHash(eleicaoString))
    console.log(`hash armazenado do voto: ${hashVoto}`);
    console.log(`hash armazenado da eleição: ${hashEleicao}`);
  };

  return (
    <div className={styles.voteContainer}>
      <h1 className={styles.title}>Eleição de 2023</h1>
      <p className={styles.subtitle}>Escolha seu candidato:</p>

      <form onSubmit={handleVote}>
        <label className={styles.fontLabel}>Nome da eleição</label><br />
        <input className={styles.inputs} type="text" name="eleicao" onChange={handleEleicaoChange} value={eleicao} />

        <label className={styles.label}>
          <input className={styles.input} type="radio" name="candidate" value="Candidato A" onChange={handleCandidateChange} /> Candidato A
        </label>
        <label className={styles.label}>
          <input className={styles.input} type="radio" name="candidate" value="Candidato B" onChange={handleCandidateChange} /> Candidato B
        </label>
        <label className={styles.label}>
          <input className={styles.input} type="radio" name="candidate" value="Candidato C" onChange={handleCandidateChange} /> Candidato C
        </label>

        <label className={styles.fontLabel}>hash Eleição</label><br />
        <input className={styles.inputs} style={{ textAlign: 'left' }} type="String" name="resultado"  value={hashEleicao} disabled /><br />

        <label className={styles.fontLabel}>hash Voto</label><br />
        <input className={styles.inputs} style={{ textAlign: 'left' }} type="String" name="resultado"  value={hashVoto} disabled /><br />

        <button className={styles.voteButton}>Votar</button>

      </form>

    </div>
  );
}