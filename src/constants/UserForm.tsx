const UserFormFields:UserFormCard[] = [
  {
    cardHeading: "Welcome to MiResume",
    cardSubheading:
      "Enter your information to create the perfect resume for each job",
    fields: [
      {
        label: "Full Name",
        title: "Name",
        name: "name",
      },
      {
        label: "Gender",
        title: "Gender",
        name: "gender",
      },
    ],
  },

  {
    cardHeading: "Almost there..",
    cardSubheading: "Enter the skills and technologies that you know using the delimiter ;",
    fields: [
      {
        label: "Skills ",
        title: "Skills",
        name: "skills",
      },
      {
        label: "Technologies",
        title: "Technologies",
        name: "technologies",
      },
    ],
  },
];

export default UserFormFields;