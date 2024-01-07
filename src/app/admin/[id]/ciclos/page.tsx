"use client"

// Ciclos

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import SubjectTable from "@/app/components/DataSubjectTable";

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

const AdminDashboard: React.FC = () => {
  const router = useRouter();

  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([]);



  useEffect(() => {

    const userIdFromLocalStorage = localStorage.getItem("userId");
    setStoredUserId(userIdFromLocalStorage);

    const checkAdminStatus = async () => {
      try {
        const ID_ALUMNO_CENTRO = await storedUserId;
        const response = await axios.get(`http://localhost:8081/server/adminProtect/${ID_ALUMNO_CENTRO}`);
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
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

    if (storedUserId) {
      // Aguarde a obtenção do userID antes de fazer a verificação de admin
       checkAdminStatus();
    }
    if (userIdFromLocalStorage) {
      fetchSubjects();
    }
  }, [storedUserId]);

  const handleSaveChangesSubject = async (editingSubject: Subject | null, setEditingSubject: React.Dispatch<React.SetStateAction<Subject | null>>) => {
    try {
      if (!editingSubject) {
        console.error('No subject to edit.');
        return;
      }

      const Id = editingSubject.Id;

      const response = await axios.put(
        `http://localhost:8081/admin/editCiclos/${Id}`,
        {
          Codigo: editingSubject.Codigo,
          Designacion: editingSubject.Designacion,
          Grupo: editingSubject.Grupo,
          Departamento: editingSubject.Departamento,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedSubjects = await axios.get<Subject[]>(`http://localhost:8081/server/dataCiclos`);
      setSubjects(updatedSubjects.data);

      setEditingSubject(null);
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const regresa = () => {
    router.push(`/admin/${storedUserId}`);
  };

  return (
    <div className="p-6">
      {isAdmin !== null ? (
        isAdmin ? (
          <div>
            <h1 className="text-3xl font-bold mb-6">Ciclos Dashboard</h1>
            <Button
              variant="gradient"
              color="green"
              onClick={regresa}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <div className="flex items-center">
                <AiOutlineArrowLeft className="mr-2" />
                Regresa
              </div>
            </Button>
            <SubjectTable subjects={subjects} handleSaveChanges={handleSaveChangesSubject} />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-500 font-semibold">No tienes permiso para acceder al panel de administración.</p>
          </div>
        )
      ) : (
        <div className="text-center">
          <p>Comprobación del estado del administrador...</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
