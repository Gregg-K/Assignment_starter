from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# CLASS
class Student:
    def __init__(self, id, name, course=None):
        self.id = id
        self.name = name
        self.course = course

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "course": self.course
        }


# DATA HOLDER
students = [
    Student(1, "Akida Mwaura", "Software Development"),
    Student(2, "Mike John", "Cyber Security")
]


# HOME ROUTE
@app.route("/")
def home():
    return jsonify({"message": "Backend is running 🚀"})


# CREATE STUDENT
@app.route('/student', methods=["POST"])
def create_student():
    data = request.json

    new_student = Student(
        id=data["id"],
        name=data["name"],
        course=data["course"]
    )

    students.append(new_student)
    return jsonify(new_student.to_dict()), 201


# GET ALL STUDENTS
@app.route('/students', methods=["GET"])
def fetch_students():
    return jsonify([student.to_dict() for student in students])


# GET SINGLE STUDENT
@app.route("/student/<int:id>", methods=["GET"])
def get_student(id):
    for student in students:
        if student.id == id:
            return jsonify(student.to_dict())

    return jsonify({"error": "student not found"}), 404


# UPDATE STUDENT
@app.route("/student/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.json

    for student in students:
        if student.id == id:
            student.name = data.get("name", student.name)
            student.course = data.get("course", student.course)
            return jsonify(student.to_dict())

    return jsonify({"error": "student not found"}), 404


# DELETE STUDENT
@app.route("/student/<int:id>", methods=["DELETE"])
def delete_student(id):
    for student in students:
        if student.id == id:
            students.remove(student)
            return jsonify({"message": "student deleted"})

    return jsonify({"error": "student not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)