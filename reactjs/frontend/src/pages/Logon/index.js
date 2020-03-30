import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon(){

    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('section', {id});
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push("/profile");
        } catch (error){
            alert("Falha ao realizar, login")
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="seja um héroi!" />

                <form onSubmit={handleLogin}>
                    <h1> Faça a diferença no mundo! </h1>
                    <input 
                        placeholder="Insira seu ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <a href="/recuperar" className="forget"> Esqueceu seu ID? </a>
                    <button className="button" type="submit" > Entrar! </button>

                    <Link to="/register" className="back-link " >
                        <FiLogIn size={16} color="#E02041"/>
                        Não tem cadastro?
                    </Link>
                </form>
            </section>

            <img src = {heroesImg} alt="heores"/>
        </div>
    );
}