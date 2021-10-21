import {IonInput, IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonButton, IonHeader, IonPage, IonToolbar, IonRouterOutlet, IonContent, IonCard} from '@ionic/react';
import React, { useState, useEffect } from 'react'
/* Theme variables */
import '../theme/variables.css';
import databaseController from '../controller/database'
import { useLocation } from 'react-router-dom';

const  Main: React.FC = () => {
    const [photos, setPhotos] = useState(Array<string>())
    const [isStart, setIsStart] = useState(false);
    const [skipCount, setSkipCount] = useState(true);
    const [tag, setTag] = useState('')
    const location:any = useLocation();
    var galleryPhotos:string[] = [];

    useEffect(() =>{
        if (skipCount){
            setSkipCount(false)
        }else{
            const fetchData = async () => {
                databaseController.getPhotos(tag, location.state.data.tokenApi).then((response: any) =>{
                    response.data.data.items.map((item: any) => {
                        const photo= JSON.parse(JSON.stringify(item.media))
                        galleryPhotos.push(photo.m)
                    })
                }).then(() => {
                    setPhotos(galleryPhotos)
                    setIsStart(false)
                    alert("Fotos encontradas por tag: "+tag)
                })
                .catch((error: any) => {console.log(error)})
            }
            fetchData()
        }
    }, [isStart])

    function validateTag(){
        if(tag == ""){ 
            alert("Tiene que ingresar etiquetas para realizar la búsqueda de imagenes")
        }else{
            setIsStart(true)
            databaseController.sendSearchHistory(tag, location.state.data.tokenApi, location.state.data.id_user)
        }
    }
    async function listSearchHistory(){
        const alert = (message:string) => {
            const alert = document.createElement('ion-alert');
            alert.header = "Historial de búsquedas: "
            alert.message = message;
            alert.buttons = [{text: 'Ok', role: 'cancel'}]
            document.body.appendChild(alert);
            return alert.present();
        }

        databaseController.getSearchHistory(location.state.data.tokenApi, location.state.data.id_user).then((response: any) => {
            let message = ""
            for(let i of response.data.data){
                message+=i.searchHistory_description+'<br/>'
            }
            alert(message)
        })
    
        //alert(searchHistory)
    }
    async function alert(message:string) {
        const alert = document.createElement('ion-toast');
        alert.message = message;
        alert.duration = 1700;
        document.body.appendChild(alert);
        return alert.present();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className="containerToolbarDiv">
                        <div className="toolbarDiv">
                            <h2>Photos</h2>
                        </div>
                        <div className="toolbarSearchHistoryDiv">
                        <IonButton className="searchHistoryButtonStyle" onClick={listSearchHistory}>
                                Historial de busqueda
                            </IonButton>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="containerdiv">
                    <div className="searchTag">
                        <IonInput placeholder="Ingrese etiquetas para filtrar fotos" className="inputStyle" onIonChange={(e: any) => setTag(e.target.value)}>
                        </IonInput>
                        <IonButton className="searchButtonStyle" onClick={validateTag}>
                            Buscar
                        </IonButton>
                    </div>
                    <div className="photosDiv">
                            {photos.map((item: any) => (
                                <IonCard className="card">
                                    <img src={item}>
                                    </img>
                                </IonCard>
                            ))}
                    </div>
                    <div className="HistoryDiv">
                        
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Main;
