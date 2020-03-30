import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const idOng = localStorage.getItem('ongId');
    
    const history = useHistory();

    async function handleIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }

        try {
            api.post('incidents', data, {
                headers: {
                    authorization: idOng
                }
            });

            history.push("/profile");

        } catch (erro){
            alert("Erro ao cadastrar o novo caso, tente novamente!")
        }

    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Seja um herói!"/>
                    <h1>Cadastrar um novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>
                    <Link to="/profile" className="back-link " >
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                   
                    <button className="button" type="submit">Cadastrar</button>
                </form>            
            </div>
        </div>
    );
}