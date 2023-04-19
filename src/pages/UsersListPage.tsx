import { IonContent, IonHeader, IonPage, IonFab, IonButton, IonIcon, IonFabList, IonTitle, IonToolbar, useIonAlert, IonFabButton } from '@ionic/react';
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
import { withRouter } from 'react-router';
import React, { useState, useEffect } from 'react';
import { http } from '../utils/fetch-wrapper';
import DataTable from "react-data-table-component";
import { useHistory } from 'react-router-dom';

const UsersListPage: React.FC = () => {
	const history = useHistory();
	const [present] = useIonAlert();
	const pad = (num: any, size: any) => {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
	http.loadingMask = function () {
		alert(2);
	}
	const destroy = (r: any) => {
		present({
			header: 'Alert',
			message: 'Esta seguro de eliminar el registro Nº ' + pad(r.id, 4) + '?',
			buttons: [
				'Cancel',
				{ text: 'Ok', handler: (d) => console.log('ok pressed') },
			],
			onDidDismiss: (e) => console.log('did dismiss'),
		})
	}
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const src = '/api/complaint/0/0';
	const handlePerRowsChange = async (newPerPage: any, page: any) => {
		setLoading(true);
		http.get(src).then((d: any) => {
			setData(d.data);
			setLoading(false);
		});
		setPerPage(newPerPage);
	};
	useEffect(() => {
		handlePerRowsChange(10, 1);

	}, []);
	const columns = [
		{
			name: 'ID',
			width: '100',
			cell: (row: any) => pad(row.id, 4),
		},
		{
			name: 'Mail',
			cell: (row: any) => row.mail,
			width: '100',
		},
		{
			name: 'Descripcion',
			selector: (row: any) => row.description,
			width: '200',
		},
		{
			name: 'Operations',
			width: '100',
			cell: (row: any) => <IonButton onClick={() => destroy(row)}>Eliminar</IonButton>,
		},
	];

	return (
		<IonContent>
			<DataTable 
			columns={columns} 
			// src="/api/complaint/0/0" 
			data={data}></DataTable>
			<IonFab vertical="bottom" horizontal="end" slot="fixed">
				<IonFabButton onClick={() => history.push('/page/complaint/create')}>
					<IonIcon icon={add} />
				</IonFabButton>
			</IonFab>
		</IonContent>
	);

};

export default withRouter(UsersListPage);
