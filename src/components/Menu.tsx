import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { 
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, 
} from 'ionicons/icons';
import './Menu.css';
import { http } from 'gra-react-utils';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  click?: () => void;
}

const appPages: AppPage[] = [
  {
    title: 'RENIEC',
    url: '/reniec',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'SUNAT',
    url: '/sunat',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'ANTECENDENTES POLICIALES',
    url: '/antecendentes-policiales',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'ANTECENDENTES PENALES',
    url: '/antecendentes-penales',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'ANTECENDENTES JUDICIALES',
    url: '/antecendentes-judiciales',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'SERVIR',
    url: '/servir',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Cerrar Sesión',
    url: '#',
    click:()=>{
      http.accountService.logOut();
    },
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  }
];
const Menu: React.FC = () => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            var url=appPage.url;
            var click=appPage.click;
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === url ? 'selected' : ''} routerLink={import.meta.env.BASE+url} onClick={click} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        V1
      </IonContent>
      
    </IonMenu>
  );
};
export default Menu;
