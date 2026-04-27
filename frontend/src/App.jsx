import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students</h2>

      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;