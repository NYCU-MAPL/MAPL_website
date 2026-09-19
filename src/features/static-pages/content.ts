export const teachingContent = {
  courses: [
    {
      code: "IOC5184",
      title: "Deep Learning and Practice",
      description: "Mathematical foundations, modern deep-learning methods, hands-on implementation, paper discussion, and project work.",
    },
    {
      code: "ILE5242",
      title: "Video Compression",
      description: "Core image and video coding principles, motion-compensated prediction, transforms, entropy coding, and modern learned codecs.",
    },
  ],
  links: [
    { label: "Current NYCU course timetable", href: "https://timetable.nycu.edu.tw/" },
    { label: "NYCU CS graduate education", href: "https://www.cs.nycu.edu.tw/education/master?locale=en" },
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
  professor: {
    name: "Prof. Wen-Hsiao Peng",
    email: "wpeng@cs.nycu.edu.tw",
    profile: "https://www.cs.nycu.edu.tw/members/detail/wpeng?locale=en",
  },
  lab: {
    location: "EC621",
    phone: "+886-3-571-2121 ext. 54779",
    address: "1001 University Road, Hsinchu 30010, Taiwan",
  },
} as const
