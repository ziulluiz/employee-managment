import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch} from 'react-router';
import { saveSupplier, searchSupplierById } from './SupplierApi';
import Supplier from './Supplier';


const SupplierEdit: React.FC = () => {
  
    const { name} = useParams<{ name: string; }>();
    const [supplier, setSupplier] = useState<Supplier>({});
    const history = useHistory();

    const routeMatch: any = useRouteMatch("/page/supplier/:id");
    const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === 'new') {
      setSupplier({});
    } else {
      let result = await searchSupplierById(id);
      setSupplier(result);
    }
  }

  const save = () => {
    saveSupplier(supplier);
    history.push('/page/suppliers');
    // location.reload()
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
            <IonTitle>{id == 'new' ? 'New Supplier' : 'Edit Supplier' } </IonTitle>

            <IonRow>
                <IonCol>
                  <IonItem>
                    <IonInput 
                      label="Name" labelPlacement="stacked" placeholder="Enter text"
                      onIonChange={e => supplier.name = String(e.detail.value)} value = {supplier.name}>
                    </IonInput>
                  </IonItem>  
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Phone" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => supplier.phone = String(e.detail.value)} value = {supplier.phone}>
                      </IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => supplier.address = String(e.detail.value)} value = {supplier.address}>
                      </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput
                        label="Email" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => supplier.email = String(e.detail.value)} value = {supplier.email}>
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

export default SupplierEdit;
