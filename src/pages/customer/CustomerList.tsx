import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { removeCustomer, saveCustomer, searchCustomers } from './CustomerApi';
// import Customer from './CustomerList';
// import { removeCustomer, searchCustomers } from './CustomerApi';


const CustomerList: React.FC = (props: any) => {
  const { name } = useParams<{ name: string; }>();
  const [Customers, setCustomer] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    searchCustomers();
    // setCustomer(datosEjemplo);
    let result = await searchCustomers();
    setCustomer(result);
  }

  const remove = async (id: string) => {
    await removeCustomer(id);
    search();
  }

  const addCustomer = () => {
    history.push('/page/customer/new');
  }

  const editCustomer = (id: string) => {
    history.push('/page/customer/' + id);
  }

  const pruebaLocalStorage = () => {
    const ejemplo = {
      firstname: 'Luis',
      lastname: 'Guzman',
      email: 'luis.com',
      phone: '123456',
      address: 'salvador agras'
    }
    saveCustomer(ejemplo);
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard>
            <IonTitle>Customers</IonTitle>

            <IonItem>
              <IonButton onClick={addCustomer} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
                Agregar Cliente
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Teléfono</IonCol>
                <IonCol>Dirección</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>

              {/* {Customers.map(customer => 
                <IonRow>
                  <IonCol>{customer.firstname} {cliente.lastname}</IonCol>
                  <IonCol>{customer.email}</IonCol>
                  <IonCol>{customer.phone}</IonCol>
                  <IonCol>{.address}</IonCol>
                  <IonCol>
                
                )} */}



              {Customers.map((cliente: any) =>
                <IonRow>
                  <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear"
                      onClick={() => editCustomer(String(cliente.id))}>
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>

                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(cliente.id))}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              )}
            </IonGrid>
          </IonCard>
          <IonButton onClick={pruebaLocalStorage} color="danger" fill="clear">
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
