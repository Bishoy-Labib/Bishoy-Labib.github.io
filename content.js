const portfolioData = {
    profile: {
        name: "Bishoy Labib",
        img_src: "profile.jpg",
        role_en: "Mechanical Engineer & Data Scientist",
        role_de: "Maschinenbauingenieur & Data Scientist",
        
        // --- ADD THESE TWO LINES ---
        cv_en: "pdf_cv/BishoyLabib_CV_EN.pdf",
        cv_de: "pdf_cv/BishoyLabib_CV_DE.pdf",
        // ---------------------------

        socials: [
            { icon: "fab fa-linkedin", url: "https://linkedin.com/in/bishoy-labib" },
            { icon: "fab fa-github", url: "https://github.com/" },
            { icon: "fas fa-envelope", url: "mailto:Labib.Bishoy@outlook.com" }
        ]
    },
    timeline: [
        { date: "Oct 2025 - Current", title: "MSc. Interdisciplinary Computing", loc: "IT:U Austria", desc_en: "Focus: Software Dev, Data Engineering, ML.", desc_de: "Schwerpunkt: Softwareentwicklung, Data Engineering, ML." },
        { date: "Sep 2024 - Sep 2025", title: "Mechanical & Metrology Engineer", loc: "ZALNER Engineering Kft.", desc_en: "Tactile/Optical measurement systems, CMM programming, GD&T.", desc_de: "Taktile/Optische Messsysteme, CMM-Programmierung, GD&T." },
        { date: "Sep 2021 - Jan 2025", title: "BSc. Mechanical Engineering", loc: "Eötvös Loránd University", desc_en: "Spec: Manufacturing Technology.", desc_de: "Spezialisierung: Fertigungstechnik." }
    ],
    skills: [
        { category_en: "Programming & Data", category_de: "Programmierung & Daten", tags: ["Python", "TensorFlow/PyTorch", "SQL", "MATLAB", "Data Engineering", "C/C++", "Git"] },
        { category_en: "Mechanical & Metrology", category_de: "Mechanik & Messtechnik", tags: ["CAD/CAM (CREO, Fusion)", "ANSYS (FEM)", "GD&T", "CMM Programming", "ZEISS Inspect", "3D Scanning", "PolyWorks"] },
        { category_en: "Automation", category_de: "Automatisierung", tags: ["Arduino/Microcontrollers", "PLC", "Control Systems", "Robotics", "Pneumatics"] }
    ],

    // --- UPDATED PROJECTS SECTION (Supports links & unlimited items) ---
    projects: [
        {
            title_en: "Study on Workpiece Deformation",
            title_de: "Mehrachsige additive Fertigung",
            desc_en: "Study deformation due to clamping based on experimental, analytical, and CAE approaches",
            desc_de: "Entwicklung eines 5-Achsen-3D-Druck-Prototyps.",
            tags: ["3D Printing", "Mechatronics"],
            icon_class: "fas fa-cube",
            link: "https://github.com/Bishoy-Labib/StudyWorkpieceDeformation.git" // <--- ADD LINK HERE
        },
        {
            title_en: "Explicit Dynamics Simulation: Deepdrawing",
            title_de: "Optimierung medizinischer Geräte",
            desc_en: "Designed custom fixturing for 5-axis CNC and validated via CMM.",
            desc_de: "Untersuchung der Bearbeitungsoptimierung für kieferorthopädische Zangen.",
            tags: ["CNC", "ANSYS"],
            icon_class: "fas fa-tools",
            link: "https://github.com/Bishoy-Labib/Deep-Drawing-with-ANSYS.git"
        },
        {
            title_en: "Optimization of Medical Device Manufacturing Technology",
            title_de: "Automatisierte Qualitätskontrolle",
            desc_en: "Designed a custom fixturing system for 5-axis CNC machining of orthodontic pliers.",
            desc_de: "Implementierung komplexer Messverfahren mittels industrieller 3D-Scanner.",
            tags: ["Metrology", "Robotics"],
            icon_class: "fas fa-robot",
            link: "https://github.com/Bishoy-Labib/MedicalPliersFixturing.git"
        }
    ],

    i18n: {
        en: {
            bio_summary: "Engineer with a multidisciplinary background in mechanical systems, metrology, and advanced manufacturing. Passionate about R&D, automation, and data-driven approaches to industrial innovation.",
            about_long: "I am a Mechanical and Metrology Engineer based in Linz, Austria, currently pursuing an MSc in Interdisciplinary Computing. My expertise bridges the gap between physical engineering (CAD, GD&T, Precision Metrology) and modern digital technologies (Machine Learning, Python, Data Engineering). I have hands-on experience in automotive quality control and medical device optimization.",
            nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_contact: "Contact",
            btn_projects: "View Projects", btn_contact: "Contact Me",
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
