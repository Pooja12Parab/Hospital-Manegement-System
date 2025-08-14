export const Navitem = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Doctors", path: "/Doctors" },
  { id: 3, title: "Departments", path: "/Departments" },
  { id: 4, title: "Contact", path: "/Contact" },
];
export const DoctorsDropdown = [
  {
    id: 1,
    title: "CARDIOLOGY",
    path: "/Departments/Cardiology",

    subitem: [
      { id: 1, title: "Dr. Aditi Sharma",path:'/Doctors' },
      { id: 2, title: "Dr. Ankit Sinha",path:'/Doctors' },
      { id: 3, title: "Dr. Punit Arrora" ,path:'/Doctors'},
    ],
  },
  {
    id: 2,
    title: "DENTAL",
    path: "/Departments/Dental",
    subitem: [
      { id: 1, title: "Dr. Arjun Nair",path:'/Doctors'},
      { id: 2, title: "Dr. Deepak Bansal" ,path:'/Doctors'},
      { id: 3, title: "Dr. Harish Gupta", path:'/Doctors'},
    ],
  },
  {
    id: 3,
    title: "NEUROLOGIST",
    path: "/Departments/Neurologist",

    subitem: [
      { id: 1, title: "Dr. Kavita Deshmukh",path:'/Doctors' },
      { id: 2, title: "Dr. Manish Saxena" ,path:'/Doctors' },
      { id: 3, title: "Dr. Ajay Saxena" ,path:'/Doctors' },
    ],
  },
  {
    id: 4,
    title: "PEDIATRIC",
    path: "/Departments/Pediatric",

    subitem: [
      { id: 1, title: "Dr. Meera Das",path:'/Doctors'  },
      { id: 2, title: "Dr. Neha Kapoor" ,path:'/Doctors' },
      { id: 3, title: "Dr. Gaurav Saxena",path:'/Doctors'  },
    ],
  },
  {
    id: 5,
    title: "TRAUTOMATOLOGY",
    path: "/Departments/Trautomatology",

    subitem: [
      { id: 1, title: "Dr. Rahul Verma" ,path:'/Doctors' },
      { id: 2, title: "Dr. Ramesh Iyer",path:'/Doctors' },
      { id: 3, title: "Dr. Sneha Patel" ,path:'/Doctors'},
    ],
  },
  {
    id: 6,
    title: "XRAY",
    path: "/Departments/Xray",

    subitem: [
      { id: 1, title: "Dr. Sanjay Mehta" , path:'/Doctors/XRAY' },
      { id: 1, title: "Dr. Sanjay Mehta" , path:'/Doctors/XRAY' },
      { id: 2, title: "Dr. Sumit Pillai", path:'/Doctors/XRAY' },
      { id: 3, title: "Dr. Swati Choudhary",path:'/Doctors/XRAY'  },
    ],
  },
];
export const DepartmentDropdown = [
  { id: 1, title: "CARDIOLOGY", path: "/Departments/Cardiology" },
  { id: 2, title: "DENTAL", path: "/Departments/Dental" },
  { id: 3, title: "NEUROLOGIST", path: "/Departments/Neurologist" },
  { id: 4, title: "PEDIATRIC", path: "/Departments/Pediatric" },
  { id: 5, title: "TRAUTOMATOLOGY", path: "/Departments/Trautomatology" },
  { id: 6, title: "Xray", path: "/Departments/Xray" },
];
