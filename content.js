/* ----------------------------------------------------
   YOUR DASHBOARD
   Edit the data below to update your website.
   ----------------------------------------------------
*/

const portfolioData = {
    // 1. PERSONAL INFO & IMAGE
    profile: {
        name: "Bishoy Labib",
        img_src: "profile.jpg", // Ensure your file is named exactly this
        role_en: "Mechanical Engineer & Data Scientist",
        role_de: "Maschinenbauingenieur & Data Scientist",
        socials: [
            { icon: "fab fa-linkedin", url: "https://linkedin.com/in/bishoy-labib" },
            { icon: "fab fa-github", url: "https://github.com/" },
            { icon: "fas fa-envelope", url: "mailto:Labib.Bishoy@outlook.com" }
        ]
    },

    // 2. TIMELINE (Work & Education)
    // Add new items at the top of the list to appear first
    timeline: [
        {
            date: "Oct 2025 - Current",
            title: "MSc. Interdisciplinary Computing",
            loc: "IT:U Austria",
            desc_en: "Focus: Software Dev, Data Engineering, ML.",
            desc_de: "Schwerpunkt: Softwareentwicklung, Data Engineering, ML."
        },
        {
            date: "Sep 2024 - Sep 2025",
            title: "Mechanical & Metrology Engineer",
            loc: "ZALNER Engineering Kft.",
            desc_en: "Tactile/Optical measurement systems, CMM programming, GD&T.",
            desc_de: "Taktile/Optische Messsysteme, CMM-Programmierung, GD&T."
        },
        {
            date: "Sep 2021 - May 2025",
            title: "BSc. Mechanical Engineering",
            loc: "Eötvös Loránd University",
            desc_en: "Spec: Manufacturing Technology.",
            desc_de: "Spezialisierung: Fertigungstechnik."
        }
    ],

    // 3. SKILLS
    skills: [
        {
            category_en: "Programming & Data",
            category_de: "Programmierung & Daten",
            tags: ["Python", "TensorFlow/PyTorch", "SQL", "MATLAB", "Data Engineering", "C/C++", "Git"]
        },
        {
            category_en: "Mechanical & Metrology",
            category_de: "Mechanik & Messtechnik",
            tags: ["CAD/CAM (CREO, Fusion)", "ANSYS (FEM)", "GD&T", "CMM Programming", "ZEISS Inspect", "3D Scanning", "PolyWorks"]
        },
        {
            category_en: "Automation",
            category_de: "Automatisierung",
            tags: ["Arduino/Microcontrollers", "PLC", "Control Systems", "Robotics", "Pneumatics"]
        }
    ],

    // 4. PROJECTS
    // To add a photo, change img_placeholder to img_src: "filename.jpg"
    projects: [
        {
            title_en: "Multi-Axis Additive Manufacturing",
            title_de: "Mehrachsige additive Fertigung",
            desc_en: "Developed a 5-axis 3D printing prototype with a customized slicer algorithm and synchronized motion control systems.",
            desc_de: "Entwicklung eines 5-Achsen-3D-Druck-Prototyps mit individuellem Slicer-Algorithmus.",
            tags: ["3D Printing", "Mechatronics", "Algorithm"],
            icon_class: "fas fa-cube", // FontAwesome Icon
            // img_src: "project1.jpg" // Uncomment this line if you have a photo
        },
        {
            title_en: "Medical Device Optimization",
            title_de: "Optimierung medizinischer Geräte",
            desc_en: "Investigated machining optimization for orthodontic pliers. Designed custom fixturing for 5-axis CNC and validated via CMM.",
            desc_de: "Untersuchung der Bearbeitungsoptimierung für kieferorthopädische Zangen.",
            tags: ["CNC", "ANSYS", "Medical Tech"],
            icon_class: "fas fa-tools",
        },
        {
            title_en: "Automated Quality Control",
            title_de: "Automatisierte Qualitätskontrolle",
            desc_en: "Implemented complex metrology procedures using industrial 3D scanners and robotic arms for automotive clients.",
            desc_de: "Implementierung komplexer Messverfahren mittels industrieller 3D-Scanner.",
            tags: ["Metrology", "Robotics", "Quality Assurance"],
            icon_class: "fas fa-robot",
        }
    ],

    // 5. TRANSLATIONS (Static Text)
    i18n: {
        en: {
            bio_summary: "Engineer with a multidisciplinary background in mechanical systems, metrology, and advanced manufacturing. Passionate about R&D, automation, and data-driven approaches to industrial innovation.",
            about_long: "I am a Mechanical and Metrology Engineer based in Linz, Austria, currently pursuing an MSc in Interdisciplinary Computing. My expertise bridges the gap between physical engineering (CAD, GD&T, Precision Metrology) and modern digital technologies (Machine Learning, Python, Data Engineering). I have hands-on experience in automotive quality control and medical device optimization.",
            nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_contact: "Contact",
            btn_projects: "View Work", btn_contact: "Contact Me",
            title_about: "About", title_skills: "Skills", title_projects: "Projects", title_contact: "Get In Touch",
            languages: "Languages",
            contact_sub: "I am currently open to new opportunities in Engineering and Data Science."
        },
        de: {
            bio_summary: "Ingenieur mit multidisziplinärem Hintergrund in mechanischen Systemen, Messtechnik und fortschrittlicher Fertigung. Leidenschaft für F&E, Automatisierung und datengesteuerte Ansätze.",
            about_long: "Ich bin Maschinenbau- und Messtechnikingenieur mit Sitz in Linz, Österreich, und absolviere derzeit einen MSc in Interdisciplinary Computing. Meine Expertise schließt die Lücke zwischen physikalischer Technik (CAD, GD&T, Präzisionsmesstechnik) und modernen digitalen Technologien (Machine Learning, Python, Data Engineering).",
            nav_home: "Start", nav_about: "Über mich", nav_skills: "Fähigkeiten", nav_projects: "Projekte", nav_contact: "Kontakt",
            btn_projects: "Arbeit ansehen", btn_contact: "Kontaktieren",
            title_about: "Über", title_skills: "Fähigkeiten", title_projects: "Projekte", title_contact: "Kontakt",
            languages: "Sprachen",
            contact_sub: "Ich bin derzeit offen für neue Möglichkeiten im Bereich Ingenieurwesen und Data Science."
        }
    }
};
