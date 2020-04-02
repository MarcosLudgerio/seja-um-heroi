import React from 'react';

import * as MailComposer from 'expo-mail-composer';
 
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles'
import logo from '../../assets/logo.png';


export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá, ${incident.name} eu quero poder ajudar e ser o herói do caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}`
    function navigateBack(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }
    
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style = {styles.container}>
            <View style={styles.header}>
                <Image source={logo} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style = {styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{ incident.name } de { incident.diade }/{ incident.uf } </Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{ incident.title }</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    { Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL'                                
                        }).format(incident.value) }
                </Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}> Salve o dia! </Text>
                <Text style={styles.heroTitle}> Seja bem vindo, herói dessa causa! </Text>

                <Text style={styles.heroDescription}> Entre em contato:  </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}> WhatsApp </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}> E-mail </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}