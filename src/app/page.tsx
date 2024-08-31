"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Exam } from '../constants/types';
import { getExamsFromLocalStorage, deleteExamFromLocalStorage } from '../utils/localStorageUtils';

export default function Home() {
  const router = useRouter()
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    setExams(getExamsFromLocalStorage());
  }, []);

  const handleEdit = (id: string) => {
     router.push(`/exam?id=${id}`);
  };

  const handleCreate = () => {
     router.push(`/exam`);
  };

  const handleDelete = (id: string) => {
    deleteExamFromLocalStorage(id);
    setExams(getExamsFromLocalStorage()); // Refresh the list
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-6">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Exams List</h1>
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
            >
              Create New Exam
            </button>
          </div>

          {exams.length === 0 ? (
            <p className="text-gray-700">No exams available. Click the button above to create a new exam.</p>
          ) : (
            <ul className="space-y-4">
              {exams.map((exam) => (
                <li key={exam.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h2 className="text-xl font-semibold">{exam.title}</h2>
                  <p className="text-gray-600 mb-2">{exam.description}</p>
                  <button
                    onClick={() => handleEdit(exam.id)}
                    className="text-blue-500 underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="text-red-500 underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
      </div>
    </main>
  );
}


