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
import { http } from '../utils/fetch-wrapper.js';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
//https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/

interface ResetProps extends RouteComponentProps<{id: string}> {}

const Create: React.FC<ResetProps> = ({ match }) => {
	const history = useHistory();
	const [users, setUsers] = useState<Array<any>>([]);
	
	const [o, setO] = useState({
		mail:'',
		description:'',
		name:'',
		data: [] as any[]
	});
	const set = (name:any,v:any) => {
		var vv=v&&v.target?v.target.value:v;
		setO(o => ({
			...o,[name]: vv
		}));
	};
	
	const [showLoading, setShowLoading] = useState();
	http.loadingMask=function(v){setShowLoading(v)};
	
	const columns = [
		{
			name: 'Fecha',
			cell: (row)=>row.fechaVacunacion,
			width: 100,
		},
		{
			name: 'Fabricante',
			selector: (row)=>row.fabricanteAbrev,
			wrap: true,
			width: 200,
		},
		{
			name: 'Diagnostico',
			wrap: true,
			selector: (row)=>row.vacuna,
			width: 200,
		},
		{
			name: 'Dosis',
			wrap: true,
			cell: (row)=>row.dosisAplicada,
			width: 100,
		},
		{
			name: 'Establecimiento',
			wrap: true,
			cell: (row)=>row.establecimiento,
			width: 300,
		},
		{
			name: 'Grupo',
			cell: (row)=>row.grupo,
			wrap: true,
			width: 100,
		}
	];
	const loginForm=()=>{
		console.log(o);
		http.post('/api/reniec/'
		,{dni:o.code},{})
			.then((data:any) =>{ 
				data.code=o.code;
				setO(data);
				//set('patient',data[0].paciente);
			})
			.catch((error:any) => {
				console.error(error.message);
			});
	};
	return (
		<IonContent className="ion-padding">
			<IonGrid>
				<div style={{textAlign:'center',padding:'0px 10px 20px'}}>
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
						<input value={o.code} onChange={(e) => set('code',e)} style={{textAlign:'center'}} />
					</IonCol>
					<IonCol>
						<div className="center-movil" style={{marginTop:10}}>
						<IonButton onClick={loginForm}>Buscar</IonButton>
						</div>
					</IonCol>
				</IonRow>
			</IonGrid>
			{o.apPrimer?<div>
			<IonGrid>
				<IonRow>
					<IonCol>
						<img src={'data:image/png;base64, '+o.foto}/>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<label>Ap. Paterno</label>
						<input readOnly="readonly" value={o.apPrimer}/>
					</IonCol>
					<IonCol>
						<label>Ap. Materno</label>
						<input readOnly="readonly" value={o.apSegundo}/>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<label>Nombres</label>
						<input readOnly="readonly" value={o.prenombres}/>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<label>Estado Civil</label>
						<input readOnly="readonly" value={o.estadoCivil}/>
					</IonCol>
					<IonCol>
						<label>Restriccion</label>
						<input readOnly="readonly" value={o.restriccion}/>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<label>Dirección</label>
						<input readOnly="readonly" value={o.direccion}/>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<label>Ubigeo</label>
						<input readOnly="readonly" value={o.ubigeo}/>
					</IonCol>
				</IonRow>
			</IonGrid>
			</div>:<div></div>
		}
		<IonLoading
			isOpen={showLoading}
			message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;
