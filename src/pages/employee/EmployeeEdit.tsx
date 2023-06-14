import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { removeEmployee, saveEmployee, searchEmployees } from './EmployeeApi';
import Employee from './Employee';


const EmployeeEdit: React.FC = () => {
    const { name, id } = useParams<{ name: string; id: string }>();
    const [employee, setEmployee] = useState<Employee>({});
    const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    searchEmployees();
    let result = await searchEmployees();
    setEmployee(result);
  }

  const addEmployee = () => {
    history.push('/page/Employee/new');
  }

  const editEmployee = (id: string) => {
    history.push('/page/Employee/' + id);
  }

  const save = () =>{
  
    saveEmployee(employee);
    history.push('/page/Employee/')
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
                      label="First name" labelPlacement="stacked" placeholder="Enter text"
                      onIonChange={e => Employee.firstname = String(e.detail.value)} value = {Employee.firstname}>
                      </IonInput>
                  </IonItem>  
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonInput 
                      label="Last name" labelPlacement="stacked" placeholder="Enter text" 
                      onIonChange={e => Employee.lastname = String(e.detail.value)} value = {Employee.lastname}>
                    </IonInput>
                  </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Phone" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => Employee.phone = String(e.detail.value)} value = {Employee.phone}>
                      </IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                      <IonInput 
                        label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => Employee.address = String(e.detail.value)} value = {Employee.address}>
                      </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                      <IonInput
                        label="Email" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e => Employee.email = String(e.detail.value)} value = {Employee.email}>
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
