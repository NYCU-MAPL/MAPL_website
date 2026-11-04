const deepLearningSemesters = [
  "Spring Semester 2026",
  "Summer Semester 2025",
  "Spring Semester 2025",
  "Summer Semester 2024",
  "Spring Semester 2024",
  "Summer Semester 2023",
  "Spring Semester 2023",
  "Summer Semester 2022",
  "Spring Semester 2022",
  "Summer Semester 2021",
] as const

export const teachingContent = {
  courses: [
    {
      code: "CSIC30153",
      title: "Deep Learning",
      pairedCourse: { code: "CSIC30154", title: "Deep Learning Labs" },
      semesters: deepLearningSemesters,
    },
    {
      code: "IOC5184",
      title: "Deep Learning and Practice",
      semesters: ["Spring Semester 2021", "Summer Semester 2020", "Spring Semester 2020", "Summer Semester 2019", "Spring Semester 2019"],
    },
    {
      code: "IDS5009",
      title: "Matrix Method in Data Science",
      semesters: ["Fall Semester 2019"],
    },
    {
      code: "ILE5242",
      title: "Video Compression",
      semesters: ["Fall Semester 2020", "Spring Semester 2013", "Spring Semester 2012", "Spring Semester 2009", "Spring Semester 2008"],
    },
    {
      code: "DCP2354",
      title: "Linear Algebra",
      semesters: ["Fall Semester 2017", "Fall Semester 2016", "Fall Semester 2013", "Fall Semester 2012", "Fall Semester 2010", "Fall Semester 2008"],
    },
    {
      code: "IOC5127",
      title: "Stochastic Processes",
      semesters: ["Fall Semester 2017", "Spring Semester 2014", "Fall Semester 2012", "Fall Semester 2009"],
    },
    {
      code: "DCP3351",
      title: "Probability Theory",
      semesters: ["Fall Semester 2014", "Spring Semester 2011", "Fall Semester 2010", "Spring Semester 2009"],
    },
  ],
} as const

export const joinUsContent = {
  image: {
    src: "media/join/year-end-party-2025.webp",
    alt: "MAPL members at the 2025 year-end gathering",
    width: 1023,
    height: 585,
  },
  introSlides: "https://maplintro2027.pse.is/9lnn2m",
  studentContacts: [
    { name: "楊成偉", nickname: "Billy", email: "yangchengwei920428@gmail.com" },
    { name: "朱驛庭", nickname: "Benjamin", email: "itingchu1005@gmail.com" },
  ],
  professor: {
    name: "Prof. Wen-Hsiao Peng",
    email: "wpeng@cs.nycu.edu.tw",
    profile: "https://www.cs.nycu.edu.tw/members/detail/wpeng?locale=en",
  },
  lab: {
    location: "EC621 · EC714",
    phone: "+886-3-571-2121 ext. 54779",
    address: "1001 University Road, Hsinchu 30010, Taiwan",
  },
} as const
