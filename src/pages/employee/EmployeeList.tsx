import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { removeEmployee, searchEmployees } from './EmployeeApi';
import Employee from './Employee';

const EmployeeList: React.FC = (props: any) => {
  const { name } = useParams<{ name: string; }>();
  const [employees, setEmployee] = useState<Employee[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchEmployees();
    setEmployee(result);
  }

  const remove = async (id: string) => {
    await removeEmployee(id);
    search();
  }

  const addEmployee = async () => {
    await history.push('/page/employee/new');
  }

  const editEmployee = (id: string) => {
    history.push('/page/employee/' + id);
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
            <IonTitle>Employees</IonTitle>

            <IonItem>
              <IonButton onClick={addEmployee} color="primary" fill="solid" slot="end" size="default">
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
                <IonCol>Salary</IonCol>
                <IonCol>Options</IonCol>
              </IonRow>

              {employees.map((employee: Employee) =>
                <IonRow>
                  <IonCol>{employee.employee_id}</IonCol>
                  <IonCol>{employee.name} {employee.name}</IonCol>
                  <IonCol>{employee.email}</IonCol>
                  <IonCol>{employee.phone}</IonCol>
                  <IonCol>{employee.address}</IonCol>
                  <IonCol>{employee.salary}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear"
                      onClick={() => editEmployee(String(employee.employee_id))}>
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>

                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(employee.employee_id))}>
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

export default EmployeeList;
