import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Logon(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            cidade,
            uf,
        };

        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso ${response.data.id}`);

            history.push("/");

        }catch(err){
            alert(err)
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Seja um herói!"/>
                    <h1>Cadastro</h1>
                    <p>
                        Faça parte dessa corrente do bem! ;)
                    </p>
                    <Link to="/" className="back-link " >
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type= "email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Whatspp" 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={cidade} 
                            onChange={e => setCidade(e.target.value)}/>
                        <input 
                            placeholder="UF" 
                            style= {{ width: 80 }} 
                            value={uf} 
                            onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>            
            </div>
        </div>
    );
}