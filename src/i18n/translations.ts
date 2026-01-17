export type Language = 'en' | 'ta' | 'hi';

export interface Translations {
  // Navigation
  nav: {
    about: string;
    skills: string;
    projects: string;
    certifications: string;
    experience: string;
    contact: string;
    hireMe: string;
  };
  // Hero Section
  hero: {
    available: string;
    greeting: string;
    name: string;
    title: string;
    description: string;
    viewWork: string;
    chatWithAssistant: string;
    scroll: string;
  };
  // About Section
  about: {
    label: string;
    title1: string;
    title2: string;
    intro: string;
    aspiring: string;
    journey: string;
    projectsCompleted: string;
    technologies: string;
    highlights: {
      cleanCode: { title: string; description: string };
      problemSolver: { title: string; description: string };
      fastLearner: { title: string; description: string };
      teamPlayer: { title: string; description: string };
    };
  };
  // Skills Section
  skills: {
    label: string;
    title1: string;
    title2: string;
    categories: {
      all: string;
      languages: string;
      frontend: string;
      backend: string;
      ai: string;
      tools: string;
    };
    techBackground: string;
    frontendDev: { title: string; description: string };
    backendDev: { title: string; description: string };
    aiMl: { title: string; description: string };
    pentesting: { title: string; description: string };
  };
  // Projects Section
  projects: {
    label: string;
    title1: string;
    title2: string;
    featuredProject: string;
    viewLive: string;
  };
  // Certifications Section
  certifications: {
    label: string;
    title1: string;
    title2: string;
    viewCertificate: string;
  };
  // Contact Section
  contact: {
    label: string;
    title1: string;
    title2: string;
    description: string;
    getInTouch: string;
    followMe: string;
    sendMessage: string;
    yourName: string;
    yourEmail: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
  };
  // Footer
  footer: {
    rights: string;
    madeWith: string;
  };
  // Chatbot
  chatbot: {
    title: string;
    placeholder: string;
    welcome: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      experience: 'Experience',
      contact: 'Contact',
      hireMe: 'Hire Me',
    },
    hero: {
      available: 'Available for opportunities',
      greeting: "Hi, I'm",
      name: 'TAMILSELVAN P',
      title: 'Penetration Tester & AI Enthusiast',
      description: 'Building intelligent, scalable web applications with modern technologies and Passionate about exploring vulnerabilities in Machines.',
      viewWork: 'View My Work',
      chatWithAssistant: 'Chat with Assistant',
      scroll: 'Scroll',
    },
    about: {
      label: 'About Me',
      title1: 'Aspiring Pentester &',
      title2: 'Tech Enthusiast',
      intro: "I'm TAMILSELVAN P, A Third Year Computer Science Student Pursuing at Annai Mira College of Engineering and Technology",
      aspiring: 'An Aspiring Penetration Tester with a deep interest in building intelligent web applications that make a real impact.',
      journey: 'My journey in technology spans across various domains including web development, artificial intelligence, and Cyber Security. I thrive on creating seamless user experiences backed by robust, scalable architectures.',
      projectsCompleted: 'Projects Completed',
      technologies: 'Technologies',
      highlights: {
        cleanCode: { title: 'Clean Code', description: 'Writing maintainable, scalable code with best practices' },
        problemSolver: { title: 'Problem Solver', description: 'Tackling complex challenges with creative solutions' },
        fastLearner: { title: 'Fast Learner', description: 'Quickly adapting to new technologies and frameworks' },
        teamPlayer: { title: 'Team Player', description: 'Collaborating effectively in agile environments' },
      },
    },
    skills: {
      label: 'Skills',
      title1: 'Technologies &',
      title2: 'Expertise',
      categories: {
        all: 'All Skills',
        languages: 'Languages',
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'AI/ML',
        tools: 'Tools',
      },
      techBackground: 'Technological Background',
      frontendDev: {
        title: 'Frontend Development',
        description: 'I am skilled in creating responsive and interactive web interfaces using HTML, CSS, JavaScript, and React.js. Passionate about clean UI design, performance optimization, and building AI-integrated user experiences.',
      },
      backendDev: {
        title: 'Backend Development',
        description: 'Backend Developer experienced in building secure APIs, managing databases, and integrating AI-powered services using Python and Java. Focused on performance, scalability, and clean architecture.',
      },
      aiMl: {
        title: 'AI & Machine Learning',
        description: 'AI & Machine Learning Developer with experience in NLP, RAG-based models, and AI-powered web applications. Passionate about building intelligent systems that solve real-world problems.',
      },
      pentesting: {
        title: 'Penetration Testing',
        description: 'Aspiring Penetration Tester with hands-on knowledge of reconnaissance, vulnerability assessment, and basic exploitation techniques, focused on improving system and application security.',
      },
    },
    projects: {
      label: 'Projects',
      title1: 'Featured',
      title2: 'Work',
      featuredProject: 'Featured Project',
      viewLive: 'View Live',
    },
    certifications: {
      label: 'Certifications',
      title1: 'Professional',
      title2: 'Certifications',
      viewCertificate: 'View certificate',
    },
    contact: {
      label: 'Contact',
      title1: "Let's",
      title2: 'Connect',
      description: "Have a project in mind or want to discuss opportunities? I'd love to hear from you. Let's create something amazing together.",
      getInTouch: 'Get in Touch',
      followMe: 'Follow Me',
      sendMessage: 'Send a Message',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'John Doe',
      emailPlaceholder: 'john@example.com',
      subjectPlaceholder: 'Project Discussion',
      messagePlaceholder: 'Tell me about your project...',
      send: 'Send Message',
      sending: 'Sending...',
      successMessage: "Message sent successfully! I'll get back to you soon.",
      errorMessage: 'Failed to send message. Please try again.',
    },
    footer: {
      rights: 'All rights reserved.',
      madeWith: 'Made with',
    },
    chatbot: {
      title: 'AI Portfolio Assistant',
      placeholder: 'Ask me anything...',
      welcome: "Hi! I'm Tamilselvan's AI assistant. Ask me about his skills, projects, experience, or anything else about his portfolio!",
    },
  },
  ta: {
    nav: {
      about: 'என்னை பற்றி',
      skills: 'திறன்கள்',
      projects: 'திட்டங்கள்',
      certifications: 'சான்றிதழ்கள்',
      experience: 'அனுபவம்',
      contact: 'தொடர்பு',
      hireMe: 'என்னை நியமி',
    },
    hero: {
      available: 'வாய்ப்புகளுக்கு தயாராக',
      greeting: 'வணக்கம், நான்',
      name: 'தமிழ்செல்வன் பி',
      title: 'பெனிட்ரேஷன் டெஸ்டர் & AI ஆர்வலர்',
      description: 'நவீன தொழில்நுட்பங்களுடன் புத்திசாலித்தனமான, அளவிடக்கூடிய வலை பயன்பாடுகளை உருவாக்குதல் மற்றும் இயந்திரங்களில் பாதிப்புகளை ஆராய்வதில் ஆர்வம்.',
      viewWork: 'என் படைப்புகள்',
      chatWithAssistant: 'உதவியாளருடன் அரட்டை',
      scroll: 'கீழே செல்',
    },
    about: {
      label: 'என்னை பற்றி',
      title1: 'எதிர்கால பெனிட்ரேஷன் டெஸ்டர் &',
      title2: 'தொழில்நுட்ப ஆர்வலர்',
      intro: 'நான் தமிழ்செல்வன் பி, அன்னை மீரா பொறியியல் மற்றும் தொழில்நுட்ப கல்லூரியில் மூன்றாம் ஆண்டு கணினி அறிவியல் மாணவன்',
      aspiring: 'புத்திசாலித்தனமான வலை பயன்பாடுகளை உருவாக்குவதில் ஆழ்ந்த ஆர்வம் கொண்ட எதிர்கால பெனிட்ரேஷன் டெஸ்டர்.',
      journey: 'தொழில்நுட்பத்தில் எனது பயணம் வலை மேம்பாடு, செயற்கை நுண்ணறிவு மற்றும் சைபர் பாதுகாப்பு உள்ளிட்ட பல்வேறு துறைகளில் பரந்துள்ளது.',
      projectsCompleted: 'முடிக்கப்பட்ட திட்டங்கள்',
      technologies: 'தொழில்நுட்பங்கள்',
      highlights: {
        cleanCode: { title: 'சுத்தமான குறியீடு', description: 'சிறந்த நடைமுறைகளுடன் பராமரிக்கக்கூடிய, அளவிடக்கூடிய குறியீட்டை எழுதுதல்' },
        problemSolver: { title: 'சிக்கல் தீர்ப்பவர்', description: 'படைப்பாற்றல் தீர்வுகளுடன் சிக்கலான சவால்களை எதிர்கொள்ளுதல்' },
        fastLearner: { title: 'வேகமான கற்றவர்', description: 'புதிய தொழில்நுட்பங்கள் மற்றும் கட்டமைப்புகளுக்கு விரைவாக மாறுதல்' },
        teamPlayer: { title: 'குழு வீரர்', description: 'அஜைல் சூழல்களில் திறம்பட ஒத்துழைத்தல்' },
      },
    },
    skills: {
      label: 'திறன்கள்',
      title1: 'தொழில்நுட்பங்கள் &',
      title2: 'நிபுணத்துவம்',
      categories: {
        all: 'அனைத்து திறன்கள்',
        languages: 'மொழிகள்',
        frontend: 'ஃப்ரண்ட்எண்ட்',
        backend: 'பேக்எண்ட்',
        ai: 'AI/ML',
        tools: 'கருவிகள்',
      },
      techBackground: 'தொழில்நுட்ப பின்னணி',
      frontendDev: {
        title: 'ஃப்ரண்ட்எண்ட் டெவலப்மெண்ட்',
        description: 'HTML, CSS, JavaScript மற்றும் React.js பயன்படுத்தி பதிலளிக்கக்கூடிய மற்றும் ஊடாடும் வலை இடைமுகங்களை உருவாக்குவதில் திறமையானவர்.',
      },
      backendDev: {
        title: 'பேக்எண்ட் டெவலப்மெண்ட்',
        description: 'Python மற்றும் Java பயன்படுத்தி பாதுகாப்பான APIகளை உருவாக்குவதில் அனுபவமுள்ள பேக்எண்ட் டெவலப்பர்.',
      },
      aiMl: {
        title: 'AI & மெஷின் லர்னிங்',
        description: 'NLP, RAG அடிப்படையிலான மாதிரிகள் மற்றும் AI இயங்கும் வலை பயன்பாடுகளில் அனுபவமுள்ள AI & ML டெவலப்பர்.',
      },
      pentesting: {
        title: 'பெனிட்ரேஷன் டெஸ்டிங்',
        description: 'உளவறிதல், பாதிப்பு மதிப்பீடு மற்றும் அடிப்படை சுரண்டல் நுட்பங்களில் நடைமுறை அறிவு கொண்ட எதிர்கால பெனிட்ரேஷன் டெஸ்டர்.',
      },
    },
    projects: {
      label: 'திட்டங்கள்',
      title1: 'சிறப்பு',
      title2: 'படைப்புகள்',
      featuredProject: 'சிறப்பு திட்டம்',
      viewLive: 'நேரலையில் காண்க',
    },
    certifications: {
      label: 'சான்றிதழ்கள்',
      title1: 'தொழில்முறை',
      title2: 'சான்றிதழ்கள்',
      viewCertificate: 'சான்றிதழைக் காண்க',
    },
    contact: {
      label: 'தொடர்பு',
      title1: 'நாம்',
      title2: 'இணைவோம்',
      description: 'ஒரு திட்டம் மனதில் உள்ளதா அல்லது வாய்ப்புகளைப் பற்றி விவாதிக்க விரும்புகிறீர்களா? உங்களிடமிருந்து கேட்க விரும்புகிறேன்.',
      getInTouch: 'தொடர்பில் இருங்கள்',
      followMe: 'என்னை பின்தொடரவும்',
      sendMessage: 'செய்தி அனுப்பு',
      yourName: 'உங்கள் பெயர்',
      yourEmail: 'உங்கள் மின்னஞ்சல்',
      subject: 'தலைப்பு',
      message: 'செய்தி',
      namePlaceholder: 'உங்கள் பெயர்',
      emailPlaceholder: 'you@example.com',
      subjectPlaceholder: 'திட்ட விவாதம்',
      messagePlaceholder: 'உங்கள் திட்டத்தைப் பற்றி சொல்லுங்கள்...',
      send: 'செய்தி அனுப்பு',
      sending: 'அனுப்புகிறது...',
      successMessage: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! விரைவில் தொடர்பு கொள்கிறேன்.',
      errorMessage: 'செய்தி அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    },
    footer: {
      rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      madeWith: 'உருவாக்கப்பட்டது',
    },
    chatbot: {
      title: 'AI போர்ட்ஃபோலியோ உதவியாளர்',
      placeholder: 'எதையும் கேளுங்கள்...',
      welcome: 'வணக்கம்! நான் தமிழ்செல்வனின் AI உதவியாளர். அவரது திறன்கள், திட்டங்கள், அனுபவம் அல்லது போர்ட்ஃபோலியோ பற்றி என்னிடம் கேளுங்கள்!',
    },
  },
  hi: {
    nav: {
      about: 'मेरे बारे में',
      skills: 'कौशल',
      projects: 'प्रोजेक्ट्स',
      certifications: 'प्रमाणपत्र',
      experience: 'अनुभव',
      contact: 'संपर्क',
      hireMe: 'मुझे हायर करें',
    },
    hero: {
      available: 'अवसरों के लिए उपलब्ध',
      greeting: 'नमस्ते, मैं हूं',
      name: 'तमिलसेल्वन पी',
      title: 'पेनेट्रेशन टेस्टर और AI उत्साही',
      description: 'आधुनिक तकनीकों के साथ बुद्धिमान, स्केलेबल वेब एप्लीकेशन बनाना और मशीनों में कमजोरियों का पता लगाने का जुनून।',
      viewWork: 'मेरा काम देखें',
      chatWithAssistant: 'असिस्टेंट से चैट करें',
      scroll: 'नीचे स्क्रॉल करें',
    },
    about: {
      label: 'मेरे बारे में',
      title1: 'भावी पेंटेस्टर और',
      title2: 'टेक उत्साही',
      intro: 'मैं तमिलसेल्वन पी हूं, अन्नई मीरा इंजीनियरिंग और टेक्नोलॉजी कॉलेज में तीसरे वर्ष का कंप्यूटर साइंस छात्र',
      aspiring: 'बुद्धिमान वेब एप्लीकेशन बनाने में गहरी रुचि रखने वाला भावी पेनेट्रेशन टेस्टर।',
      journey: 'तकनीक में मेरी यात्रा वेब डेवलपमेंट, आर्टिफिशियल इंटेलिजेंस और साइबर सिक्योरिटी सहित विभिन्न डोमेन में फैली हुई है।',
      projectsCompleted: 'पूर्ण प्रोजेक्ट्स',
      technologies: 'तकनीकें',
      highlights: {
        cleanCode: { title: 'क्लीन कोड', description: 'सर्वोत्तम प्रथाओं के साथ रखरखाव योग्य, स्केलेबल कोड लिखना' },
        problemSolver: { title: 'समस्या समाधानकर्ता', description: 'रचनात्मक समाधानों के साथ जटिल चुनौतियों का सामना' },
        fastLearner: { title: 'तेज़ सीखने वाला', description: 'नई तकनीकों और फ्रेमवर्क के लिए जल्दी अनुकूलन' },
        teamPlayer: { title: 'टीम प्लेयर', description: 'एजाइल वातावरण में प्रभावी सहयोग' },
      },
    },
    skills: {
      label: 'कौशल',
      title1: 'तकनीकें और',
      title2: 'विशेषज्ञता',
      categories: {
        all: 'सभी कौशल',
        languages: 'भाषाएं',
        frontend: 'फ्रंटएंड',
        backend: 'बैकएंड',
        ai: 'AI/ML',
        tools: 'टूल्स',
      },
      techBackground: 'तकनीकी पृष्ठभूमि',
      frontendDev: {
        title: 'फ्रंटएंड डेवलपमेंट',
        description: 'HTML, CSS, JavaScript और React.js का उपयोग करके रेस्पॉन्सिव और इंटरएक्टिव वेब इंटरफेस बनाने में कुशल।',
      },
      backendDev: {
        title: 'बैकएंड डेवलपमेंट',
        description: 'Python और Java का उपयोग करके सुरक्षित APIs बनाने में अनुभवी बैकएंड डेवलपर।',
      },
      aiMl: {
        title: 'AI और मशीन लर्निंग',
        description: 'NLP, RAG-आधारित मॉडल और AI-पावर्ड वेब एप्लीकेशन में अनुभव रखने वाला AI और ML डेवलपर।',
      },
      pentesting: {
        title: 'पेनेट्रेशन टेस्टिंग',
        description: 'रिकॉनिसेंस, वल्नरेबिलिटी असेसमेंट और बेसिक एक्सप्लॉइटेशन तकनीकों का व्यावहारिक ज्ञान रखने वाला भावी पेनेट्रेशन टेस्टर।',
      },
    },
    projects: {
      label: 'प्रोजेक्ट्स',
      title1: 'फीचर्ड',
      title2: 'काम',
      featuredProject: 'फीचर्ड प्रोजेक्ट',
      viewLive: 'लाइव देखें',
    },
    certifications: {
      label: 'प्रमाणपत्र',
      title1: 'पेशेवर',
      title2: 'प्रमाणपत्र',
      viewCertificate: 'प्रमाणपत्र देखें',
    },
    contact: {
      label: 'संपर्क',
      title1: 'आइए',
      title2: 'जुड़ें',
      description: 'कोई प्रोजेक्ट है या अवसरों पर चर्चा करना चाहते हैं? मुझे आपसे सुनकर खुशी होगी।',
      getInTouch: 'संपर्क करें',
      followMe: 'मुझे फॉलो करें',
      sendMessage: 'संदेश भेजें',
      yourName: 'आपका नाम',
      yourEmail: 'आपका ईमेल',
      subject: 'विषय',
      message: 'संदेश',
      namePlaceholder: 'आपका नाम',
      emailPlaceholder: 'you@example.com',
      subjectPlaceholder: 'प्रोजेक्ट चर्चा',
      messagePlaceholder: 'अपने प्रोजेक्ट के बारे में बताएं...',
      send: 'संदेश भेजें',
      sending: 'भेज रहे हैं...',
      successMessage: 'संदेश सफलतापूर्वक भेजा गया! जल्द ही संपर्क करूंगा।',
      errorMessage: 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।',
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित।',
      madeWith: 'बनाया गया',
    },
    chatbot: {
      title: 'AI पोर्टफोलियो असिस्टेंट',
      placeholder: 'कुछ भी पूछें...',
      welcome: 'नमस्ते! मैं तमिलसेल्वन का AI असिस्टेंट हूं। उनके कौशल, प्रोजेक्ट्स, अनुभव या पोर्टफोलियो के बारे में मुझसे पूछें!',
    },
  },
};
