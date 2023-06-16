import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch} from 'react-router';
import { removeCustomer, saveCustomer, searchCustomerById } from './CustomerApi';
import Customer from './Customer';


const CustomerEdit: React.FC = () => {
  
    const { name } = useParams<{ name: string; }>();
    const [customer, setCustomer] = useState<Customer>({});
    const history = useHistory();

    const routeMatch: any = useRouteMatch("/page/customer/:id");
    const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id !== 'new') {
      let result = await searchCustomerById(id);
      setCustomer(result)
    } 
  }

  const save = async () => {
    await saveCustomer(customer);
    history.push('/page/Customer');
    location.reload()
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
            <IonTitle>{id == 'new' ? 'New Customer' : 'Edit Customer' } </IonTitle>

            <IonRow>
                <IonCol>
                  <IonItem>
                    <IonInput 
                      label="First name" labelPlacement="stacked" placeholder="Enter text"
                      onIonChange={e => customer.firstname = String(e.detail.value)} value = {customer.firstname}>
                      </IonInput>
                  </IonItem>  
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonInput 
                      label="Last name" labelPlacement="stacked" placeholder="Enter text" 
                      onIonChange={e => customer.lastname = String(e.detail.value)} value = {customer.lastname}>
                    </IonInput>
                  </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Phone" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => customer.phone = String(e.detail.value)} value = {customer.phone}>
                      </IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => customer.address = String(e.detail.value)} value = {customer.address}>
                      </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput
                        label="Email" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => customer.email = String(e.detail.value)} value = {customer.email}>
                        </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
            <IonItem>
              <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                <IonIcon icon={checkmark} />
                Save
              </IonButton>
            </IonItem>
          </IonCard>
        </IonContent>


      
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;
