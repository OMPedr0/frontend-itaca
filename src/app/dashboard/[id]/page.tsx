"use client"

// UserDashboard.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Select, Option } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProgressBar from "../../components/ProgressBar";
import DataCard from "../../components/DataCard";
import SubjectCheckbox from "@/app/components/SubjectCheckbox";

interface UserData {
  [key: string]: any;
}

interface Subject {
  Id: number;
  Codigo: string;
  Designacion: string;
  Grupo: string;
  Departamento: string;
}



interface Materias {
  Id: number;
  RequiereProgramacion: number;
  claveDeExportacionSigad: number;
  NombreCompleto: string;
  Departamento: string;
}



const UserDashboard: React.FC = () => {
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [initialUserData, setInitialUserData] = useState<UserData | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

  const [materias, setMaterias] = useState<Materias[]>([]);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setStoredUserId(userIdFromLocalStorage);

    const fetchUserData = async () => {
      try {
        const idToFetch = userIdFromLocalStorage;

        if (idToFetch && typeof idToFetch === "string") {
          const response = await axios.get<UserData[]>(`http://localhost:8081/user/userData/${idToFetch}`);
          setUserData(response.data[0]);
          setInitialUserData(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axios.get<Subject[]>(`http://localhost:8081/server/dataCiclos`);
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMaterias = async () => {
      try {
        const response = await axios.get<Materias[]>(`http://localhost:8081/server/dataMaterias`);
        console.log(response.data)
        setMaterias(response.data);
      } catch (error) {
        console.error(error);
      }
    };


    fetchMaterias();
    fetchUserData();
    fetchSubjects();
  }, []);

  function handleSelectChange(value: string | undefined) {
    const selectedId = parseInt(value || "0", 10);
    setSelectedSubjectId(value || "");

    const prevSelectedSubjects = selectedSubjects;
    setSelectedSubjects(() => {
      const selectedSubject = subjects.find((subject) => subject.Id === selectedId);

      const newSelectedSubjects = [];
      if (selectedSubject) {
        newSelectedSubjects.push(selectedSubject);
      }

      if (prevSelectedSubjects) {
        newSelectedSubjects.push(...prevSelectedSubjects.filter((subject) => subject !== selectedSubject));
      }

      return newSelectedSubjects;
    });
  }

  function toggleEditMode({ section }: { section: string; }) {
    setEditMode(!editMode);
    setEditSection(section);
  }

  function handleCancel(): void {
    setEditMode(false);
    setEditSection(null);
    setUserData(initialUserData);
  }

  function handleInputChange({ key, value }: { key: string; value: string; }) {
    setUserData({ ...userData, [key]: value });
  }

  async function handleSave(): Promise<void> {
    try {
      if (!userData || !initialUserData) {
        console.error("Dados a serem enviados são indefinidos ou nulos.");
        return;
      }

      const updatedFields: Partial<UserData> = {};
      for (const key in userData) {
        if (userData[key] !== initialUserData[key]) {
          updatedFields[key] = userData[key];
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        console.log("Nenhuma alteração a ser salva.");
        setEditMode(false);
        setEditSection(null);
        return;
      }

      const idToFetch = storedUserId;
      console.log("Dados a serem enviados:", updatedFields);

      const response = await axios.put(`http://localhost:8081/user/updateUserData/${idToFetch}`, updatedFields, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success('Cambios de datos con éxito!');
      } else {
        toast.error('Error al editar los datos, inténtelo de nuevo.');
      }

      setEditMode(false);
      setEditSection(null);
    } catch (error) {
      console.error(error);
    }
  }

  function handleNextStep(): void {
    setCurrentStep(currentStep + 1);
  }

  function handlePreviousStep(): void {
    setCurrentStep(currentStep - 1);
  }

  async function handleSendData(): Promise<void> {
    try {
      const dataToSend = {
        userId: storedUserId,
        nome: userData?.Nombre,
        id: selectedSubjects[0]?.Id,
        codigo: selectedSubjects[0]?.Codigo || "",
        designacion: selectedSubjects[0]?.Designacion || "",
        grupo: selectedSubjects[0]?.Grupo || "",
        departamento: selectedSubjects[0]?.Departamento || "",
      };

      const idToFetch = storedUserId;

      const response = await axios.put(`http://localhost:8081/user/createUserData/${idToFetch}`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Los datos se enviaron con éxito!');
      } else {
        toast.error('Error al enviar datos, inténtelo de nuevo.');
      }
    } catch (error) {
      toast.error('Error al enviar datos, inténtelo de nuevo.');
    }
  }


  return (
    <div className="ml-4 mt-4 flex items-center justify-center flex-col">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <ProgressBar progress={progress} totalSteps={totalSteps} />

      {userData && (
        <div>
          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <DataCard
              title="Dados Pessoais"
              data={{
                Nombre: userData.Nombre,
                Apellido1: userData.Apellido1,
                Apellido2: userData.Apellido2,
                email: userData.email,
                DNI: userData.DNI,
                FechaNacimiento: userData.FechaNacimiento,
                SEXO: userData.SEXO,
                ID_ALUMNO_CENTRO: userData.ID_ALUMNO_CENTRO,
                Grupo: userData.Grupo,
                IdCurso: userData.IdCurso,
                ensenanza: userData.ensenanza,
                Bilingue: userData.Bilingue,
              }}
              section="dadosPessoais"
              isEditing={editMode && editSection === "dadosPessoais"}
              onEditClick={() => toggleEditMode({ section: "dadosPessoais" })}
              onCancelClick={() => handleCancel()}
              onSaveClick={handleSave}
              onInputChange={(key, value) => handleInputChange({ key, value })}
            />
          )}

          {/* Step 2: Dados da Mãe */}
          {currentStep === 2 && (
            <DataCard
              title="Dados da Mãe"
              data={{
                MadreNombre: userData.MadreNombre,
                MadreApellido1: userData.MadreApellido1,
                MadreApellido2: userData.MadreApellido2,
                MadreTlf1: userData.MadreTlf1,
                MadreTlf2: userData.MadreTlf2,
                emailMadre: userData.emailMadre,
                MadreConvive: userData.MadreConvive,
              }}
              section="dadosMae"
              isEditing={editMode && editSection === "dadosMae"}
              onEditClick={() => toggleEditMode({ section: "dadosMae" })}
              onCancelClick={() => handleCancel()}
              onSaveClick={handleSave}
              onInputChange={(key, value) => handleInputChange({ key, value })}
            />
          )}

          {/* Step 3: Dados do Pai */}
          {currentStep === 3 && (
            <DataCard
              title="Dados do Pai"
              data={{
                PadreNombre: userData.PadreNombre,
                PadreApellido1: userData.PadreApellido1,
                PadreApellido2: userData.PadreApellido2,
                PadreTlf1: userData.PadreTlf1,
                PadreTlf2: userData.PadreTlf2,
                emailPadre: userData.emailPadre,
                PadreConvive: userData.PadreConvive,
              }}
              section="dadosPai"
              isEditing={editMode && editSection === "dadosPai"}
              onEditClick={() => toggleEditMode({ section: "dadosPai" })}
              onCancelClick={() => handleCancel()}
              onSaveClick={handleSave}
              onInputChange={(key, value) => handleInputChange({ key, value })}
            />
          )}

          {/* Step 4: Domicilio */}
          {currentStep === 4 && (
            <DataCard
              title="Domicilio"
              data={{
                Domicilio: userData.Domicilio,
                RestoDomicilio: userData.RestoDomicilio,
                CodigoPostal: userData.CodigoPostal,
                LocDomicilio: userData.LocDomicilio,
                MunDomicilio: userData.MunDomicilio,
                ProvDomicilio: userData.ProvDomicilio,
                Tlf1Domicilio: userData.Tlf1Domicilio,
                Tlf2Domicilio: userData.Tlf2Domicilio,
                Tlfurgencia: userData.Tlfurgencia,
              }}
              section="domicilio"
              isEditing={editMode && editSection === "domicilio"}
              onEditClick={() => toggleEditMode({ section: "domicilio" })}
              onCancelClick={() => handleCancel()}
              onSaveClick={handleSave}
              onInputChange={(key, value) => handleInputChange({ key, value })}
            />
          )}

          {/* // Step 5: Subjects */}
          {currentStep === 5 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Histórias Selecionadas:</h2>

              <Select
                defaultValue={subjects[0].Id}
                value={selectedSubjectId}
                onChange={handleSelectChange}
                color="blue"
                size="lg"
                className="mb-4 text-gray-500"
              >
                {subjects.map((subject) => (
                  <Option
                    className="text-gray-500"
                    key={subject.Id}
                    value={subject.Id.toString()}
                  >
                    {`${subject.Designacion} - ${subject.Grupo}`}
                  </Option>
                ))}
              </Select>
            </div>
          )}



          {/* Back button */}
          {currentStep > 1 && (
            <Button variant="gradient" onClick={handlePreviousStep} className="mr-2">
              Regresa
            </Button>
          )}

          {/* Next button */}
          {currentStep < totalSteps && (
            <Button variant="gradient" color="blue" onClick={handleNextStep} className="mr-2">
              Próximo
            </Button>
          )}

          {/* Button para enviar dados */}
          {currentStep === totalSteps && (
            <Button variant="gradient" color="green" onClick={handleSendData} className="mr-2">
              Enviar datos
            </Button>
          )}


        </div>
      )}
    </div>
  );

};

export default UserDashboard;


