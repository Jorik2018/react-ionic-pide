import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonTextarea,
	IonToolbar,
	IonItemDivider,
	IonIcon,
	IonItem,
	IonLoading,
	IonButton,
	IonInput,
	IonLabel,
	IonAvatar,
	IonList,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardContent,
	IonText,
	IonListHeader
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory, RouteComponentProps } from "react-router-dom";
import { http } from '../utils/fetch-wrapper.js';

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const Create: React.FC<ResetProps> = ({ match }) => {
	const history = useHistory();
	const [users, setUsers] = useState<Array<any>>([]);
	const [o, setO] = useState({
		nombres: '',
		primerApellido: '',
		segundoApellido: '',
		getDatosPrincipales: {},
		getDatosper: {},
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

	const getDatosPrincipales = () => {
		http.post('/api/inpe/AJudiciales', { nombres: o.nombres, primerApellido: o.primerApellido, segundoApellido: o.segundoApellido }, {})
			.then((data: any) => {
				data = data['jsonObject'];
				set('getDatosPrincipales', data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	}
	return (
		<IonContent className="ion-padding">
			<IonCard>
                <IonCardContent>
                    <IonText style={{ textAlign: 'center', padding: '0px 10px 20px', color: '#1062ac' }}>
                        <h1><u>ANTECEDENTES PENALES:</u></h1>
                    </IonText>
			<IonGrid>
				<IonRow>
					<IonCol size='3'>
						<label>Nombres</label>
						<input value={o.nombres} onChange={(e) => set('nombres', e)} />
					</IonCol>
					<IonCol size='3'>
						<label>Apellido Paterno</label>
						<input value={o.primerApellido} onChange={(e) => set('primerApellido', e)} style={{ textAlign: 'center' }} />
					</IonCol>
					<IonCol size='3'>
						<label>Apellido Materno</label>
						<input value={o.segundoApellido} onChange={(e) => set('segundoApellido', e)} style={{ textAlign: 'center' }} />
					</IonCol>
					<IonCol size='3'>
						<div className="center-movil" style={{ marginTop: 10 }}>
							<IonButton onClick={getDatosPrincipales}>Consultar</IonButton>
						</div>
					</IonCol>
				</IonRow>

			</IonGrid>
			</IonCardContent>
            </IonCard>

			{o.getDatosPrincipales.resultado ? <div>
				{[o.getDatosPrincipales].map((item) =>
					<>
						{
							item.resultado == "Observado" ?
								<IonCard color='danger'>
									<IonCardContent>
										<IonText style={{ color: '#fff' }}>
											<h1>{item.resultado}</h1>
										</IonText>
									</IonCardContent>
								</IonCard>
								:
								<IonCard color='success'>
									<IonCardContent>
										<IonText style={{ color: '#fff' }}>
											<h1>{item.resultado}</h1>
										</IonText>
									</IonCardContent>
								</IonCard>

						}
					</>
				)}


			</div> : <div></div>}



			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;