import { Check, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

interface AddNewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (newCourse: Course) => void;
  editCourse: Course | null;
  onEditCourse: (updatedCourse: Course) => void;
}

interface Course {
  id: number;
  courseName: string;
  description: string;
  lessons: number;
  duration: number;
}

const AddNewCourseModal: React.FC<AddNewCourseModalProps> = ({
  isOpen,
  onClose,
  onAddCourse,
  editCourse,
  onEditCourse,
}) => {
  const [newCourse, setNewCourse] = useState<Course>({
    id: 0,
    courseName: "",
    description: "",
    lessons: 0,
    duration: 0,
  });

  useEffect(() => {
    if (editCourse) {
      setNewCourse(editCourse);
    } else {
      setNewCourse({
        id: 0,
        courseName: "",
        description: "",
        lessons: 0,
        duration: 0,
      });
    }
  }, [editCourse]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCourse) {
      onEditCourse(newCourse);
    } else {
      onAddCourse(newCourse);
      setNewCourse({
        id: 0,
        courseName: "",
        description: "",
        lessons: 0,
        duration: 0,
      });
    }
    onClose();
  };

  const handleNumberInput = (
    field: keyof Course,
    value: string
  ) => {
    const sanitizedValue = value.replace(/^0+/, ""); 
    setNewCourse({
      ...newCourse,
      [field]: sanitizedValue === "" ? 0 : Number(sanitizedValue),
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="p-6 bg-white rounded-md w-[450px]">
        <h2 id="modal-title" className="text-xl font-bold">
          Add/Edit Course
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="courseName" className="block">
            Kurs nomi
          </label>
          <input
            type="text"
            id="courseName"
            placeholder="Enter course name"
            value={newCourse.courseName}
            onChange={(e) =>
              setNewCourse({ ...newCourse, courseName: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded-md"
            required
          />

          <label htmlFor="description" className="block">
            Tavsifi
          </label>
          <input
            type="text"
            id="description"
            placeholder="Enter course description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded-md"
            required
          />

          <label htmlFor="lessons" className="block">
            Darslar soni
          </label>
          <input
            type="text" // Use text input to handle dynamic formatting
            id="lessons"
            placeholder="Number of lessons"
            value={newCourse.lessons === 0 ? "" : String(newCourse.lessons)} // Display as empty if 0
            onChange={(e) => handleNumberInput("lessons", e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md"
            required
          />

          <label htmlFor="duration" className="block">
            Davomiyligi (minut)
          </label>
          <input
            type="text" // Use text input to handle dynamic formatting
            id="duration"
            placeholder="Duration in minutes"
            value={newCourse.duration === 0 ? "" : String(newCourse.duration)} // Display as empty if 0
            onChange={(e) => handleNumberInput("duration", e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md"
            required
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="p-2 text-white bg-red-600 rounded-md"
              onClick={onClose}
            >
              <X />
            </button>
            <button
              type="submit"
              className="p-2 text-white bg-black rounded-md"
              title={editCourse ? "Update Course" : "Add Course"}
            >
              {editCourse ? <Check /> : <Plus />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCourseModal;
