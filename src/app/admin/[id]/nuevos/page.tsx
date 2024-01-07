"use client"

// Nuevos

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import DataTable from "@/app/components/DataTable";

interface UserData {
  [key: string]: any;
}

interface MarcadasData {
  Nombre: string;
  ID_ALUMNO_CENTRO: string;
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

  const [marcadas, setMarcadas] = useState<MarcadasData[]>([]);

  useEffect(() => {


    const userIdFromLocalStorage = localStorage.getItem("userId");
    setStoredUserId(userIdFromLocalStorage);



    const fetchUserData = async () => {
      try {
        const idToFetch = storedUserId;

        if (idToFetch && typeof idToFetch === "string") {
          const response = await axios.get<UserData[]>(`http://localhost:8081/user/userData/${idToFetch}`);
          setUserData(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMarcadas = async () => {
      try {
        const response = await axios.get<MarcadasData[]>(`http://localhost:8081/admin/dataMarcadas`);
        setMarcadas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const checkAdminStatus = async () => {
      try {
        const ID_ALUMNO_CENTRO = storedUserId;
        const response = await axios.get(`http://localhost:8081/server/adminProtect/${ID_ALUMNO_CENTRO}`);
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
        console.error(error);
      }
    };


    if (storedUserId) {
      // Aguarde a obtenção do userID antes de fazer a verificação de admin
       checkAdminStatus();
    }
    if (storedUserId) {
      fetchUserData();
      fetchMarcadas();
      checkAdminStatus();
    }
  }, [storedUserId]);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setStoredUserId(userIdFromLocalStorage);
  }, []);

  const regresa = () => {
    router.push(`/admin/${storedUserId}`);
  }

  return (
    <div className="p-6">
      {isAdmin !== null ? (
        isAdmin ? (
          <div>
            <h1 className="text-3xl font-bold mb-6">Nuevos Alumnos</h1>
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
            <DataTable marcadas={marcadas} />
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
