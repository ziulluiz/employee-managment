import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch} from 'react-router';
import { saveEmployee, searchEmployeeById } from './EmployeeApi';
import Employee from './Employee';


const EmployeeEdit: React.FC = () => {
  
    const { name} = useParams<{ name: string; }>();
    const [employee, setEmployee] = useState<Employee>({});
    const history = useHistory();

    const routeMatch: any = useRouteMatch("/page/employee/:id");
    const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
      if (id !== 'new') {
        let result = await searchEmployeeById(id);
        setEmployee(result)
      } 
    }

  const save = async () => {
    await saveEmployee(employee);
    history.push('/page/employees');
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
            <IonTitle>{id == 'new' ? 'New Employee' : 'Edit Employee' } </IonTitle>

            <IonRow>
                <IonCol>
                  <IonItem>
                    <IonInput 
                      label="Name" labelPlacement="stacked" placeholder="Enter text"
                      onIonChange={e => employee.name = String(e.detail.value)} value = {employee.name}>
                      </IonInput>
                  </IonItem>  
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonInput 
                      label="Salary" labelPlacement="stacked" placeholder="Enter text" 
                      onIonChange={e => employee.salary= String(e.detail.value)} value = {employee.salary}>
                    </IonInput>
                  </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Phone" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => employee.phone = String(e.detail.value)} value = {employee.phone}>
                      </IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => employee.address = String(e.detail.value)} value = {employee.address}>
                      </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput
                        label="Email" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => employee.email = String(e.detail.value)} value = {employee.email}>
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

export default EmployeeEdit;
