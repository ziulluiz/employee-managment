import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { removeCustomer, saveCustomer, searchCustomers } from './CustomerApi';
import Customer from './CustomerList';


const CustomerEdit: React.FC = () => {
    const { name, id } = useParams<{ name: string; id: string }>();

    
    const [customer, setCustomer] = useState<any>({});
    const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    searchCustomers();
    let result = await searchCustomers();
    setCustomer(result);
  }

  const addCustomer = () => {
    history.push('/page/customer/new');
  }

  const editCustomer = (id: string) => {
    history.push('/page/customer/' + id);
  }

  const save = () =>{
  
    saveCustomer(customer);
    history.push('/page/customer/')
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
                      onIonChange={e => customer.firstname = e.detail.value} value = {customer.firstname}>
                      </IonInput>
                  </IonItem>  
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonInput 
                      label="Last name" labelPlacement="stacked" placeholder="Enter text" 
                      onIonChange={e => customer.lastname = e.detail.value} value = {customer.lastname}>
                    </IonInput>
                  </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Phone" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => customer.phone = e.detail.value} value = {customer.phone}>
                      </IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => customer.address = e.detail.value} value = {customer.address}>
                      </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput
                        label="Email" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => customer.email = e.detail.value} value = {customer.email}>
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
