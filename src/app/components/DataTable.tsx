
import React from "react";
import { Card } from "@material-tailwind/react";

interface DataTableProps {
  marcadas: MarcadasData[];
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

const DataTable: React.FC<DataTableProps> = ({ marcadas }) => {
  const TABLE_HEAD = ["Id Alumno", "Nombre", "ID Curso", "Codigo", "Designacion", "Grupo", "Departamento"];

  return (
    <Card className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-light-blue-500 text-gray-500">
          <tr>
            {TABLE_HEAD.map((header, index) => (
              <th key={index} className="py-2 px-4 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {marcadas.map((item, index) => (
            <tr key={item.Id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b border-gray-300`}>
              <td className="py-2 px-4">{item.ID_ALUMNO_CENTRO}</td>
              <td className="py-2 px-4">{item.Nombre}</td>
              <td className="py-2 px-4">{item.Id}</td>
              <td className="py-2 px-4">{item.Codigo}</td>
              <td className="py-2 px-4">{item.Designacion}</td>
              <td className="py-2 px-4">{item.Grupo}</td>
              <td className="py-2 px-4">{item.Departamento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default DataTable;
