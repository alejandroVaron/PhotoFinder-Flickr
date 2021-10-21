import {IonInput, IonButton, IonHeader, IonPage, IonToolbar, IonContent} from '@ionic/react';
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import databaseController from '../controller/database'

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let token = ""
    let history = useHistory();

    async function login(){
        try{
            if(email != "" && password != ""){
                await databaseController.login(email, password).then((response: any) =>{
                    // with this token, we can access the other endpoints
                    token = response.data.token
                    history.replace("/main", {data: {tokenApi: token, id_user: response.data.body.user.id_user}})
                    alert404("¡Bienvenido "+response.data.body.user.user_email+"!")
                }).catch((error: any) =>{
                    alert404('¡Ha habido un error, ingrese los parametros correctamente!')
                });
            }else{
                alert404('¡Agregue un usuario y una contraseña para iniciar sesión!')
            }
        }catch(error){
            console.log(error)
        }
    }
    async function alert404(message:string) {
        const alert = document.createElement('ion-toast');
        alert.message = message;
        alert.duration = 1700;
        document.body.appendChild(alert);
        return alert.present();
    }
    return (
        <IonPage>
            <IonHeader>
            <div className="toolbarDiv">
                    <h2>Login</h2>
                    </div>
            </IonHeader>
            <IonContent>
                <div className="loginDiv">
                    <div>
                        <IonInput placeholder="Email" onIonChange={(e: any) => setEmail(e.target.value)} className="inputLoginStyle" />
                        <IonInput placeholder="Password" onIonChange={(e: any) => setPassword(e.target.value)} className="inputLoginStyle" />
                        <IonButton onClick={login} className="buttonLoginStyle">Iniciar sesión</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
