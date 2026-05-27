import { useEffect, useState } from "react";

function App() {

  const API = "http://127.0.0.1:5000";

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    course: ""
  });

  const [searchId, setSearchId] = useState("");

  // FETCH ALL STUDENTS
  const fetchStudents = async () => {

    const response = await fetch(
      `${API}/students`
    );

    const data = await response.json();

    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ADD STUDENT
  const addStudent = async () => {

    await fetch(`${API}/student`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(formData)

    });

    fetchStudents();

    setFormData({
      id: "",
      name: "",
      course: ""
    });
  };

  // GET ONE STUDENT
  const getStudent = async () => {

    const response = await fetch(
      `${API}/student/${searchId}`
    );

    const data = await response.json();

    alert(JSON.stringify(data));
  };

  // UPDATE STUDENT
  const updateStudent = async () => {

    await fetch(`${API}/student/${formData.id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: formData.name,
        course: formData.course
      })

    });

    fetchStudents();
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {

    await fetch(`${API}/student/${id}`, {

      method: "DELETE"

    });

    fetchStudents();
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Student Management System</h1>

      <input
        placeholder="ID"
        value={formData.id}
        onChange={(e) =>
          setFormData({
            ...formData,
            id: e.target.value
          })
        }
      />

      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="Course"
        value={formData.course}
        onChange={(e) =>
          setFormData({
            ...formData,
            course: e.target.value
          })
        }
      />

      <br /><br />

      <button onClick={addStudent}>
        Add Student
      </button>

      <button onClick={updateStudent}>
        Update Student
      </button>

      <hr />

      <input
        placeholder="Search Student by ID"
        value={searchId}
        onChange={(e) =>
          setSearchId(e.target.value)
        }
      />

      <button onClick={getStudent}>
        Get Student
      </button>

      <hr />

      <h2>Students</h2>

      {students.map((student) => (

        <div
          key={student.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px"
          }}
        >

          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>

          <button
            onClick={() =>
              deleteStudent(student.id)
            }
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default App;