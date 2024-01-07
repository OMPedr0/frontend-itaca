import React, { useState } from 'react';
import { Card, Button } from "@material-tailwind/react";
import axios from 'axios';

interface Subject {
    Id: number;
    Codigo: string;
    Designacion: string;
    Grupo: string;
    Departamento: string;
}

interface SubjectTableProps {
    subjects: Subject[];
    handleSaveChanges: (editingSubject: Subject | null, setEditingSubject: React.Dispatch<React.SetStateAction<Subject | null>>) => void;
}



const SubjectTable: React.FC<SubjectTableProps> = ({ subjects, handleSaveChanges }) => {
 
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);




    const handleEdit = (subject: Subject) => {
        setEditingSubject(subject);
    };



    const handleCancelEdit = () => {
        setEditingSubject(null);
    };

    const TABLE_HEAD = ["Id", "Codigo", "Designacion", "Grupo", "Departamento", "Actions"];

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
                    {subjects.map((subject) => (
                        <tr key={subject.Id}>
                            <td className="px-4 py-2">{subject.Id}</td>
                            <td className="px-4 py-2">{subject.Codigo}</td>
                            <td className="px-4 py-2">{subject.Designacion}</td>
                            <td className="px-4 py-2">{subject.Grupo}</td>
                            <td className="px-4 py-2">{subject.Departamento}</td>
                            <td className="px-4 py-2">
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    onClick={() => handleEdit(subject)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {editingSubject && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-white p-4 rounded-lg">
                        <h1 className="text-2xl font-bold mb-4">Edit Subject</h1>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="codigo" className=" text-gray-700 text-sm font-bold mb-2">
                                    Codigo:
                                </label>
                                <input
                                    type="text"
                                    id="codigo"
                                    name="codigo"
                                    value={editingSubject.Codigo}
                                    onChange={(e) => setEditingSubject({ ...editingSubject, Codigo: e.target.value })}
                                    className="border-2 border-gray-300 rounded w-full py-2 px-4"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="designacion" className=" text-gray-700 text-sm font-bold mb-2">
                                Designacion:
                                </label>
                                <input
                                    type="text"
                                    id="designacion"
                                    name="designacion"
                                    value={editingSubject.Designacion}
                                    onChange={(e) => setEditingSubject({ ...editingSubject, Designacion: e.target.value })}
                                    className="border-2 border-gray-300 rounded w-full py-2 px-4"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="grupo" className="text-gray-700 text-sm font-bold mb-2">
                                Grupo:
                                </label>
                                <input
                                    type="text"
                                    id="grupo"
                                    name="grupo"
                                    value={editingSubject.Grupo}
                                    onChange={(e) => setEditingSubject({ ...editingSubject, Grupo: e.target.value })}
                                    className="border-2 border-gray-300 rounded w-full py-2 px-4"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="departamento" className=" text-gray-700 text-sm font-bold mb-2">
                                Departamento:
                                </label>
                                <input
                                    type="text"
                                    id="departamento"
                                    name="departamento"
                                    value={editingSubject.Departamento}
                                    onChange={(e) => setEditingSubject({ ...editingSubject, Departamento: e.target.value })}
                                    className="border-2 border-gray-300 rounded w-full py-2 px-4"
                                />
                            </div>
                            {/* Repeat similar blocks for other fields (Designacion, Grupo, Departamento) */}
                        </form>
                        <div className="mt-4 flex justify-end">
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={() => handleSaveChanges(editingSubject, setEditingSubject)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                              
                               
                            >
                                Save Changes
                            </Button >
                            <Button
                                variant="gradient"
                                onClick={handleCancelEdit}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </Button >
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default SubjectTable;
