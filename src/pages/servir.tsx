import {
    IonContent,
    IonLoading,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText
} from '@ionic/react';
import React, { useState, createRef } from 'react';
import { useHistory, RouteComponentProps } from "react-router-dom";
import { http } from '../utils/fetch-wrapper.js';
import { pin, heart, closeCircle, close } from 'ionicons/icons';

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const btn = createRef();

const Create: React.FC<ResetProps> = ({ match }) => {

    const [o, setO] = useState({
        ndoc: '',
        getDatosPrincipales: {},
        getDatosMSG: {},
        data: [] as any[]
    });

    const set = (name: any, v: any) => {
        var vv = v && v.target ? v.target.value : v;
        setO(o => ({
            ...o, [name]: vv
        }));
    };

    const [showLoading, setShowLoading] = useState();

    http.loadingMask = function (v) { setShowLoading(v) };

    const getDatosPrincipales = (doc) => {
        http.post('/api/servir/consultarPorDni', { numDoc: doc }, {})
            .then((data: any) => {
                data = data['soap:Envelope']['soap:Body']['ns5:consultarPorDniResponse'].return['ns10:ResponseSancionRnsdd'];
                data.data = [];
                set('getDatosPrincipales', data);
            }).catch((error: any) => {
                console.error(error.message);
            });
    };

    const getDatosMSG = () => {
        http.post('/api/servir/consultarPorDni', { numDoc: o.ndoc }, {})
            .then((data: any) => {
                data = data['soap:Envelope']['soap:Body']['ns5:consultarPorDniResponse'].return;
                data['ns10:ResponseSancionRnsdd'] != "" ?
                    getDatosPrincipales(o.ndoc)
                    : data.result = ""
                data = data.result;
                set('getDatosMSG', data);
                console.log(data);
            }).catch((error: any) => {
                console.error(error.message);
            });
    };
    return (
        <IonContent className="ion-padding">
            <IonCard>
                <IonCardContent>
                    <IonText style={{ textAlign: 'center', padding: '0px 10px 20px', color: '#1062ac' }}>
                        <h1><u>CONSULTA SERVIR:</u></h1>
                    </IonText>
                    <IonRow>
                        <IonCol >
                            <label>Ingrese N° D.N.I:</label>
                            <input value={o.ndoc} onChange={(e) => set('ndoc', e)}
                                onKeyPress={(event) => { if (event.key === "Enter") btn.current.click(); }}
                                style={{ textAlign: 'center' }} />
                        </IonCol>
                        <IonCol>
                            <div className="center-movil" style={{ marginTop: 10 }}>
                                <IonButton onClick={getDatosMSG} ref={btn}>Consultar</IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>

            {
                o.getDatosMSG != "" ? <div>
                    {o.getDatosPrincipales.numeroDocumento ? <div>
                        {[o.getDatosPrincipales].map((item) =>
                            <>
                                {
                                    item.inhabilita == 0 ?
                                        <IonCard>
                                            <IonCardContent>
                                                <ion-text color="Secundary">
                                                    <h1>HABILITADO..!!</h1>
                                                </ion-text>
                                            </IonCardContent>
                                        </IonCard>
                                        :
                                        <IonCard color='danger'>
                                            <IonCardContent>
                                                <ion-text style={{ color: '#fff' }}>
                                                    <h1>INHABILITADO..!!</h1>
                                                </ion-text>
                                            </IonCardContent>
                                        </IonCard>
                                }
                                <IonCard style={{ background: '#fbd1d7' }}>
                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size='3'>
                                                    <label>DNI: </label>
                                                    <input readOnly="readonly" value={item.numeroDocumento} />
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol>
                                                    <label>Nombre Completo:</label>
                                                    <input readOnly="readonly" value={item.apellidoPaterno + ' ' + item.apellidoMaterno + ' ' + item.nombres} />
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol>
                                                    <label>Entidad:</label>
                                                    <input readOnly="readonly" value={item.entidad} />
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <label>Categ. Sanción</label></IonCol>
                                                <IonCol size='12'> <label>{item.categoria}</label>
                                                </IonCol>
                                                <IonCol size='12'>
                                                    <label>Tipo Sanción:</label></IonCol>
                                                <IonCol size='12'>  <label>{item.tipoSancion} </label></IonCol>
                                                <IonCol size='12'>
                                                    <label>Causa de Sanción:</label></IonCol>
                                                <IonCol size='12'>  <label>{item.causaSancion} </label> </IonCol>

                                            </IonRow>
                                            <IonRow>
                                                <IonCol>
                                                    <label>Estado Sanción:</label>
                                                    <input readOnly="readonly" value={item.estadoSancion} />
                                                </IonCol>
                                                <IonCol>
                                                    <label>Fecha Inicio:</label>
                                                    <input readOnly="readonly" value={item.fechaInicio} />
                                                </IonCol>
                                                <IonCol>
                                                    <label>Fecha Fin:</label>
                                                    <input readOnly="readonly" value={item.fechaFin} />
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol>
                                                    <label>Documentación:</label>
                                                    <input readOnly="readonly" value={item.tipoDocumentoSanciona + ' N°' + item.numeroDocumentoSanciona} />
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>

                                    </IonCardContent>
                                </IonCard>
                            </>
                        )}
                    </div> : <div></div>}
                </div> : <div>
                    <IonCard color='success'>
                        <IonCardContent>
                            <IonText style={{ color: '#fff' }}>
                                <h1>NO TIENE SANCIONES..!!</h1>
                            </IonText>
                        </IonCardContent>
                    </IonCard>
                </div>
            }

            <IonLoading
                isOpen={showLoading}
                message={'Please wait...'}
            />
        </IonContent>
    );
};

export default Create;