import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { removeCustomer, saveCustomer, searchCustomers } from './CustomerApi';
import Customer from './Customer';

const CustomerList: React.FC = (props: any) => {
  const { name } = useParams<{ name: string; }>();
  const [customers, setCustomer] = useState<Customer[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    let result = searchCustomers();
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
      id: '1',
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
                Add client
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>id</IonCol>
                <IonCol>Name</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Phone</IonCol>
                <IonCol>Address</IonCol>
                <IonCol>Options</IonCol>
              </IonRow>

              {customers.map((cliente: Customer) =>
                <IonRow>
                  <IonCol>{cliente.id}</IonCol>
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
