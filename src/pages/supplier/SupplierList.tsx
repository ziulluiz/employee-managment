import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { removeSupplier, searchSuppliers } from './SupplierApi';
import Supplier from './Supplier';

const SupplierList: React.FC = (props: any) => {
  const { name } = useParams<{ name: string; }>();
  const [suppliers, setSupplier] = useState<Supplier[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchSuppliers();
    setSupplier(result);
  }

  const remove = async (id: string) => {
    await removeSupplier(id);
    search();
  }

  const addSupplier = async () => {
    await history.push('/page/supplier/new');
  }

  const editSupplier = (id: string) => {
    history.push('/page/supplier/' + id);
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
            <IonTitle>Suppliers</IonTitle>

            <IonItem>
              <IonButton onClick={addSupplier} color="primary" fill="solid" slot="end" size="default">
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

              {suppliers.map((supplier: Supplier) =>
                <IonRow>
                  <IonCol>{supplier.supplier_id}</IonCol>
                  <IonCol>{supplier.name} {supplier.name}</IonCol>
                  <IonCol>{supplier.email}</IonCol>
                  <IonCol>{supplier.phone}</IonCol>
                  <IonCol>{supplier.address}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear"
                      onClick={() => editSupplier(String(supplier.supplier_id))}>
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>

                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(supplier.supplier_id))}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              )}
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default SupplierList;
