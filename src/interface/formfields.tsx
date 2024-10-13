interface UserFormField {
    label: string;
    title: string;
    name: string;
  }
  
  interface UserFormCard {
    cardHeading: string;
    cardSubheading: string;
    fields: UserFormField[];
  }