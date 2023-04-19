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
	IonListHeader
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory, RouteComponentProps } from "react-router-dom";
import { http } from '../../utils/fetch-wrapper.js';
import DataTable from "react-data-table-component";

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const Create: React.FC<ResetProps> = ({ match }) => {

	const [o, setO] = useState({
		mail: '',
		description: '',
		name: '',
		code: '',
		coResultado: '',
		datosPersona: {},
		deResultado: '',
		direccion: '',
		apSegundo: '',
		prenombres: '',
		estadoCivil: '',
		restriccion: '',
		ubigeo: '',
		apPrimer: '',
		foto: '',
		data: [] as any[]
	});

	const set = (name: any, v: any) => {
		var vv = v && v.target ? v.target.value : v;
		setO(o => ({
			...o, [name]: vv
		}));
	};

	const [showLoading, setShowLoading] = useState();

	http.loadingMask = function (v: any) { setShowLoading(v) };

	const columns = [
		{
			name: 'Fecha',
			cell: (row: any) => row.fechaVacunacion,
			width: '100',
		},
		{
			name: 'Fabricante',
			selector: (row: any) => row.fabricanteAbrev,
			wrap: true,
			width: '200',
		},
		{
			name: 'Diagnostico',
			wrap: true,
			selector: (row: any) => row.vacuna,
			width: '200',
		},
		{
			name: 'Dosis',
			wrap: true,
			cell: (row: any) => row.dosisAplicada,
			width: '100',
		},
		{
			name: 'Establecimiento',
			wrap: true,
			cell: (row: any) => row.establecimiento,
			width: '300',
		},
		{
			name: 'Grupo',
			cell: (row: any) => row.grupo,
			wrap: true,
			width: '100',
		}
	];

	const loginForm = () => {
		console.log(o);
		http.post('/api/reniec/'
			, { dni: o.code }, {})
			.then((data: any) => {
				data.code = o.code;
				setO(data);
			})
			.catch((error: any) => {
				console.error(error.message);
			});
	};

	return (
		<IonContent className="ion-padding">

			<IonGrid>
				<div style={{ textAlign: 'center', padding: '0px 10px 20px' }}>
					<label>Consulta RENIEC</label>
				</div>
				<IonRow>
					<IonCol>
						<label>Tipo Doc.</label>
						<select>
							<option value="DNI">DNI</option>
							<option value="LM">LIBRETA MILITAR</option>
							<option value="CE">CARNET EXTRANJERIA</option>
						</select>
					</IonCol>
					<IonCol>
						<label>Ingrese Numero</label>
						<input value={o.code} onChange={(e) => set('code', e)} style={{ textAlign: 'center' }} />
					</IonCol>
					<IonCol>
						<div className="center-movil" style={{ marginTop: 10 }}>
							<IonButton onClick={loginForm}>Buscar</IonButton>
						</div>
					</IonCol>
				</IonRow>
			</IonGrid>
			{o.apPrimer ? <div>
				<IonGrid>
					<IonRow>
						<IonCol>
							<img src={'data:image/png;base64, ' + o.foto} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Ap. Paterno</label>
							<input readOnly={true} value={o.apPrimer} />
						</IonCol>
						<IonCol>
							<label>Ap. Materno</label>
							<input readOnly={true} value={o.apSegundo} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Nombres</label>
							<input readOnly={true} value={o.prenombres} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Estado Civil</label>
							<input readOnly={true} value={o.estadoCivil} />
						</IonCol>
						<IonCol>
							<label>Restriccion</label>
							<input readOnly={true} value={o.restriccion} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Dirección</label>
							<input readOnly={true} value={o.direccion} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Ubigeo</label>
							<input readOnly={true} value={o.ubigeo} />
						</IonCol>
					</IonRow>
				</IonGrid>
				<hr />
				<DataTable columns={columns} data={o.data}></DataTable>
			</div> : <div></div>
			}
			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;
