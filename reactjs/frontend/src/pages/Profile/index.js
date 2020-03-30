import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2  } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Profile(){

    const [incidents, setIncidents] = useState([]);

    const nameOng = localStorage.getItem('ongName');
    const idOng = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('profile',{
            headers: {
                authorization: idOng
            }
        }).then(response =>{
            setIncidents(response.data)
        })
    }, [idOng]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: idOng
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (error){
            alert("erro ao deletar o caso");
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }
//e1a88aee
    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Seja um herói" />
                <span> Bem vindo, {nameOng} </span>
                
                <Link className="button" to="/incident/new"> Cadastrar novo caso </Link>

                <button type="button" onClick={handleLogout} >
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                        <li key= {incident.id} >
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{ Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>
                        
                            <button type="button" onClick={ () => handleDeleteIncident(incident.id) } >
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}