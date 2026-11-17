// Sample data for the UI demo. The complete project uses live APIs + database.
export const students = [
  { id: 'STU-24017', name: 'Ananya Deshpande', program: 'B.Sc Computer Science', year: '2nd year', gender: 'F', att: 94, cgpa: 9.1, status: 'Active', city: 'Pune' },
  { id: 'STU-24032', name: 'Rahul Bhardwaj', program: 'B.Com', year: '1st year', gender: 'M', att: 81, cgpa: 7.4, status: 'Active', city: 'Delhi' },
  { id: 'STU-23011', name: 'Fatima Noor', program: 'BBA', year: '3rd year', gender: 'F', att: 89, cgpa: 8.6, status: 'Active', city: 'Lucknow' },
  { id: 'STU-23044', name: 'Siddharth Rao', program: 'B.Sc Physics', year: '3rd year', gender: 'M', att: 72, cgpa: 6.8, status: 'At risk', city: 'Hyderabad' },
  { id: 'STU-24056', name: 'Neha Kulkarni', program: 'B.Sc Computer Science', year: '2nd year', gender: 'F', att: 97, cgpa: 9.5, status: 'Active', city: 'Nagpur' },
  { id: 'STU-22008', name: 'Aman Chopra', program: 'BBA', year: 'Alumni', gender: 'M', att: 88, cgpa: 8.2, status: 'Graduated', city: 'Chandigarh' },
  { id: 'STU-24061', name: 'Riya Thomas', program: 'B.Com', year: '1st year', gender: 'F', att: 92, cgpa: 8.9, status: 'Active', city: 'Kochi' },
  { id: 'STU-23029', name: 'Kartik Malhotra', program: 'B.Sc Physics', year: '3rd year', gender: 'M', att: 85, cgpa: 7.9, status: 'On leave', city: 'Jaipur' },
]

export const byProgram = [
  { name: 'B.Sc CS', value: 412 }, { name: 'B.Com', value: 388 }, { name: 'BBA', value: 296 }, { name: 'B.Sc Physics', value: 174 },
]

export const enrolTrend = [
  { label: '2021', students: 980 }, { label: '2022', students: 1040 }, { label: '2023', students: 1125 },
  { label: '2024', students: 1190 }, { label: '2025', students: 1236 }, { label: '2026', students: 1270 },
]

export const profile = {
  ...students[0],
  dob: '14 Mar 2006', blood: 'B+', email: 'ananya.d@student.edu', phone: '+91 98XXXX 4410',
  guardian: { name: 'Sunil Deshpande', relation: 'Father', phone: '+91 98XXXX 0021', occupation: 'Engineer' },
  address: '12, Prabhat Road, Erandwane, Pune 411004',
  attendance: [
    { label: 'Jul', pct: 96 }, { label: 'Aug', pct: 92 }, { label: 'Sep', pct: 95 }, { label: 'Oct', pct: 91 }, { label: 'Nov', pct: 97 },
  ],
  semesters: [
    { label: 'Sem 1', sgpa: 8.7 }, { label: 'Sem 2', sgpa: 9.0 }, { label: 'Sem 3', sgpa: 9.4 },
  ],
  subjects: [
    { name: 'Data Structures', marks: 92, grade: 'A+' }, { name: 'Database Systems', marks: 88, grade: 'A' },
    { name: 'Discrete Mathematics', marks: 85, grade: 'A' }, { name: 'Web Technologies', marks: 95, grade: 'A+' },
  ],
  documents: ['Aadhaar card', '10th marksheet', '12th marksheet', 'Transfer certificate', 'Passport photo', 'Migration certificate'],
  timeline: [
    { when: '10 Nov', what: 'Won 1st prize at inter-college hackathon' },
    { when: '02 Oct', what: 'Semester 3 result: SGPA 9.4' },
    { when: '18 Jul', what: 'Promoted to 2nd year' },
    { when: '01 Aug 2025', what: 'Admitted · Merit scholarship (25%)' },
  ],
}
