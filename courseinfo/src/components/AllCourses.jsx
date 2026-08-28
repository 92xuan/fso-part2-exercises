const Course = ({course}) => {
  return (
    <div>
      <h3>{course.name}</h3>
      <ul>{course.parts.map(part => <li key={part.id}>{part.name}: {part.exercises} Exercises</li>)}</ul>
      <div>Total of {course.parts.reduce((total, part) => total + part.exercises, 0)} exercises</div>
    </div>
  )
}

const AllCourses = ({courses}) => {
  return (
    <>
      <ul>
        {courses.map((course, index)=> <Course key={index} course={course}/>)}
      </ul>
    </>
  )
}

export default AllCourses