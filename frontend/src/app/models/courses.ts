export interface Category {
  category: string;
}

export const CATEGORIES: Category[] = [
  { category: 'Study' },
  { category: '1_Sem.' },
  { category: '2_Sem.' },
  { category: '3_Sem.' },
  { category: '4_Sem.' },
  { category: '5_Sem.' },
  { category: '6_Sem.' },
  { category: 'Thesis' },
] 

export interface Course {
  courseName: string;
  category: string;
  courseId: number;
}

export interface Course {
  courseName: string;
  category: string;
  courseId: number;
	module : string;
	moduleUrl: string;
}

export const COURSES: Course[] = [
  {
    courseName: 'Programmierung',
    category: '1 Semester',
    courseId: 1,
		module: 'Praktische',
		moduleUrl: 'URL',
  },
  {    
    courseName: 'Technische Informatik',
    category: '1 Semester',
    courseId: 2,
		module: 'Technische',
		moduleUrl: 'URL',
  },
  {
    courseName: 'Diskrete Strukturen',
    category: '1 Semester',
    courseId: 3,
		module: 'Mathematik',
		moduleUrl: 'URL',
  },
  {    
    courseName: 'Analysis für Informatiker',
    category: '1 Semester',
    courseId: 4,
		module: 'Mathematik',
		moduleUrl: 'URL',
  },{
    courseName: 'Datenstrukturen und Algorithmen',
    category: '2 Semester',
    courseId: 5,
		module: 'Praktische',
		moduleUrl: 'URL',
  },
  // {    
  //   courseName: 'Betriebssysteme und Systemsoftware',
  //   category: '2 Semester',
  //   courseId: 6,
	// 	module: 'Technische',
	// 	moduleUrl: 'URL',
  // },{
  //   courseName: 'Formale Systeme, Automaten, Prozesse',
  //   category: '2 Semester',
  //   courseId: 7,
	// 	module: 'Theoretische',
	// 	moduleUrl: 'URL',
  // },
  // {    
  //   courseName: 'Lineare Algebra',
  //   category: '2 Semester',
  //   courseId: 8,
	// 	module: 'Mathematik',
	// 	moduleUrl: 'URL',
  // },
  // {    
  //   courseName: 'Proseminar',
  //   category: '2 Semester',
  //   courseId: 9,
	// 	module: 'Sonstige',
	// 	moduleUrl: 'URL',
  // }

]
