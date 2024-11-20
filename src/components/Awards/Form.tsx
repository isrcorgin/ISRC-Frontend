"use client";
import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
interface Question {
    id: string;
    label: string;
    type: "select" | "textarea";
    options?: string[];
  }
  
  const awardQuestions: { [key: string]: Question[] } = {
    "K-12 School Chain of the Year": [
      {
        id: "performance",
        label: "School Performance",
        type: "select",
        options: ["90%+", "80-89%", "70-79%", "Below 70%"],
      },
      {
        id: "focusAreas",
        label: "Focus Areas",
        type: "select",
        options: [
          "STEM Education",
          "Sports and Physical Activities",
          "Arts and Culture",
          "Social and Emotional Learning",
          "All of the Above",
        ],
      },
      {
        id: "recognition",
        label: "Recognition",
        type: "select",
        options: [
          "National Award",
          "State-Level Recognition",
          "International Accreditation",
          "None",
        ],
      },
      {
        id: "gradeLevels",
        label: "Grade Levels",
        type: "select",
        options: ["K-5", "6-8", "9-10", "11-12", "All K-12"],
      },
      {
        id: "schoolChainSize",
        label: "School Chain Size",
        type: "select",
        options: ["1-10", "11-25", "26-50", "51+"],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Best School Chain of the Year": [
      {
        id: "educationalQualityFocus",
        label: "Educational Quality Focus Areas",
        type: "select",
        options: [
          "Academic Excellence",
          "Innovation in Learning",
          "Inclusive Education",
          "Technology Integration",
          "All of the Above",
        ],
      },
      {
        id: "innovativePrograms",
        label: "Types of Innovative Programs Implemented Across Schools",
        type: "select",
        options: [
          "STEM Labs",
          "Digital Classrooms",
          "Project-Based Learning",
          "Social-Emotional Learning",
          "Other",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Green School Award": [
      {
        id: "environmentalFocus",
        label: "Key Areas of Environmental Focus",
        type: "select",
        options: [
          "Waste Management",
          "Energy Conservation",
          "Water Conservation",
          "Biodiversity",
          "All of the Above",
        ],
      },
      {
        id: "ecoPractices",
        label: "Eco-Friendly Practices Implemented on Campus",
        type: "select",
        options: [
          "Solar Panels",
          "Recycling Programs",
          "Green Building Design",
          "Organic Gardening",
          "Other",
        ],
      },
      {
        id: "studentInvolvement",
        label: "Student Involvement in Environmental Initiatives",
        type: "select",
        options: [
          "School-Wide Projects",
          "Eco-Clubs",
          "Community Outreach Programs",
          "Curriculum Integration",
          "All of the Above",
        ],
      },
      {
        id: "sustainabilityRecognition",
        label:
          "Recognition or Certifications Received for Sustainability Efforts",
        type: "select",
        options: [
          "Green School Certification",
          "Eco-School Award",
          "Local Environmental Recognition",
          "None",
        ],
      },
      {
        id: "greenSpaces",
        label: "Percentage of Campus Dedicated to Green Spaces",
        type: "select",
        options: ["Less than 10%", "10-25%", "26-50%", "51% or more"],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Lifelong Learning Award": [
      {
        id: "lifelongPrograms",
        label: "Programs Promoting Lifelong Learning for Students and Staff",
        type: "select",
        options: [
          "Skill Development Workshops",
          "Online Learning Platforms",
          "Career Guidance Programs",
          "Continuing Education Courses",
          "All of the Above",
        ],
      },
      {
        id: "focusAreas",
        label: "Focus Areas for Lifelong Learning Initiatives",
        type: "select",
        options: [
          "Technology Skills",
          "Personal Development",
          "Professional Skills",
          "Creative Arts",
          "All of the Above",
        ],
      },
      {
        id: "staffGrowthOpportunities",
        label: "Opportunities Provided for Staff Professional Growth",
        type: "select",
        options: [
          "Professional Development Days",
          "Certifications and Training",
          "Research and Publication Support",
          "Mentorship Programs",
          "All of the Above",
        ],
      },
      {
        id: "lifelongRecognition",
        label: "Recognition or Awards for Lifelong Learning Initiatives",
        type: "select",
        options: [
          "National Recognition",
          "State/Regional Award",
          "Internal Recognition Only",
          "None",
        ],
      },
      {
        id: "participationPercentage",
        label:
          "Percentage of Students and Staff Participating in Lifelong Learning Programs Annually",
        type: "select",
        options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Education Entrepreneur of the Year Award": [
      {
        id: "innovationType",
        label: "Type of Innovation Brought to Education Sector",
        type: "select",
        options: [
          "EdTech Solutions",
          "Curriculum Development",
          "Teacher Training",
          "Student Engagement Tools",
          "Other",
        ],
      },
      {
        id: "entrepreneurialFocus",
        label: "Main Focus of Entrepreneurial Impact",
        type: "select",
        options: [
          "Accessibility of Education",
          "Quality Improvement",
          "Skill Development",
          "Technology Integration",
          "All of the Above",
        ],
      },
      {
        id: "impactScale",
        label: "Scale of Reach/Impact",
        type: "select",
        options: ["Local/Regional", "National", "International"],
      },
      {
        id: "educationAwards",
        label: "Awards or Recognitions Received for Innovation in Education",
        type: "select",
        options: [
          "National Award",
          "Industry-Specific Award",
          "Startup/Innovation Award",
          "None",
        ],
      },
      {
        id: "experienceYears",
        label: "Years of Experience in the Education Sector",
        type: "select",
        options: ["Less than 3 years", "3-5 years", "6-10 years", "10+ years"],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Innovative Teaching Methods Award": [
      {
        id: "teachingMethod",
        label: "Primary Innovative Teaching Method Employed",
        type: "select",
        options: [
          "Project-Based Learning",
          "Flipped Classroom",
          "Gamification",
          "Experiential Learning",
          "Other",
        ],
      },
      {
        id: "enhancedSubjects",
        label: "Subjects Enhanced Through Innovative Methods",
        type: "select",
        options: [
          "Mathematics",
          "Science",
          "Language Arts",
          "Social Studies",
          "All Subjects",
        ],
      },
      {
        id: "engagementLevel",
        label: "Level of Student Engagement Achieved",
        type: "select",
        options: [
          "Significantly Improved",
          "Moderately Improved",
          "Slightly Improved",
          "No Change",
        ],
      },
      {
        id: "feedback",
        label: "Student Feedback on Teaching Methods",
        type: "select",
        options: ["Excellent", "Very Good", "Good", "Fair", "Not Collected"],
      },
      {
        id: "teachingAwards",
        label: "Recognition or Awards Received for Innovative Teaching",
        type: "select",
        options: [
          "School Award",
          "Local/Regional Award",
          "National Award",
          "None",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Best STEM Program Award": [
      {
        id: "stemFocus",
        label: "Primary Focus of STEM Program",
        type: "select",
        options: [
          "Robotics",
          "Coding and Programming",
          "Engineering Design",
          "Science Experiments",
          "Mathematics Applications",
          "All of the Above",
        ],
      },
      {
        id: "stemGradeLevels",
        label: "Grade Levels Involved in STEM Program",
        type: "select",
        options: [
          "Grades 5-6",
          "Grades 7-8",
          "Grades 9-10",
          "All Eligible Grades",
        ],
      },
      {
        id: "stemElements",
        label: "Key Elements of the STEM Program",
        type: "select",
        options: [
          "Hands-On Labs",
          "Project-Based Learning",
          "Industry Partnerships",
          "Competitions and Exhibitions",
          "Other",
        ],
      },
      {
        id: "stemAchievements",
        label: "Achievements or Recognitions for STEM Program Excellence",
        type: "select",
        options: [
          "Local/Regional Recognition",
          "National Award",
          "International Recognition",
          "None",
        ],
      },
      {
        id: "stemParticipation",
        label: "Percentage of Student Participation in STEM Activities Annually",
        type: "select",
        options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Student Well-being Initiative Award": [
      {
        id: "wellbeingFocus",
        label: "Primary Focus of Well-being Initiatives",
        type: "select",
        options: [
          "Mental Health Support",
          "Emotional Learning",
          "Physical Health",
          "Anti-Bullying Programs",
          "All of the Above",
        ],
      },
      {
        id: "supportServices",
        label: "Types of Support Services Provided",
        type: "select",
        options: [
          "Counseling Services",
          "Peer Support Groups",
          "Wellness Workshops",
          "Health and Fitness Programs",
          "Other",
        ],
      },
      {
        id: "participationLevel",
        label: "Level of Student Participation in Well-being Programs",
        type: "select",
        options: [
          "Entire School",
          "Grade-Specific",
          "Select Group of Students",
          "Voluntary Participation",
        ],
      },
      {
        id: "wellbeingRecognition",
        label: "Recognition or Certifications for Well-being Programs",
        type: "select",
        options: [
          "National Recognition",
          "Regional Certification",
          "School-Based Acknowledgment",
          "None",
        ],
      },
      {
        id: "activityFrequency",
        label: "Frequency of Well-being Activities Conducted",
        type: "select",
        options: ["Weekly", "Monthly", "Quarterly", "Annually"],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Outstanding Digital Learning Transformation": [
      {
        id: "digitalTools",
        label: "Primary Digital Tools Integrated for Learning",
        type: "select",
        options: [
          "Learning Management Systems",
          "Interactive Whiteboards",
          "Virtual Classrooms",
          "Educational Apps",
          "All of the Above",
        ],
      },
      {
        id: "digitalFocusAreas",
        label: "Key Focus Areas of Digital Transformation",
        type: "select",
        options: [
          "Interactive Learning",
          "Remote/Hybrid Learning",
          "Student Collaboration",
          "Real-Time Feedback",
          "Other",
        ],
      },
      {
        id: "curriculumPercentage",
        label: "Percentage of Curriculum Delivered Through Digital Platforms",
        type: "select",
        options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
      },
      {
        id: "engagementImpact",
        label: "Impact of Digital Tools on Student Engagement",
        type: "select",
        options: [
          "Significantly Improved",
          "Moderately Improved",
          "Slightly Improved",
          "No Change",
        ],
      },
      {
        id: "digitalRecognition",
        label: "Recognition or Awards for Digital Learning Implementation",
        type: "select",
        options: [
          "National Award",
          "State/Regional Recognition",
          "Technology in Education Award",
          "None",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Inclusive Education Champion": [
      {
        id: "educationPrograms",
        label: "Inclusive Education Programs Offered",
        type: "select",
        options: [
          "Special Education Support",
          "Integrated Classrooms",
          "Individualized Education Plans (IEPs)",
          "Accessibility Services",
          "All of the Above",
        ],
      },
      {
        id: "supportTypes",
        label: "Types of Support Provided for Students with Special Needs",
        type: "select",
        options: [
          "Academic Support",
          "Social-Emotional Support",
          "Physical Accessibility",
          "Assistive Technology",
          "Other",
        ],
      },
      {
        id: "integrationPercentage",
        label:
          "Percentage of Students with Special Needs Integrated into Mainstream Classrooms",
        type: "select",
        options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
      },
      {
        id: "staffTraining",
        label: "Staff Training for Inclusive Education",
        type: "select",
        options: [
          "Specialized Training for All Staff",
          "Select Training for Key Staff",
          "Basic Awareness Sessions",
          "None",
        ],
      },
      {
        id: "inclusiveRecognition",
        label: "Recognition or Awards for Inclusive Education Initiatives",
        type: "select",
        options: [
          "National Award",
          "State/Regional Recognition",
          "School-Based Acknowledgment",
          "None",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Best Extracurricular Program Award": [
      {
        id: "programFocus",
        label: "Primary Focus of Extracurricular Program",
        type: "select",
        options: [
          "Sports and Physical Activities",
          "Arts and Culture",
          "STEM Clubs",
          "Community Service",
          "Leadership Development",
          "All of the Above",
        ],
      },
      {
        id: "gradeLevels",
        label: "Grade Levels Participating in the Program",
        type: "select",
        options: [
          "Grades 5-6",
          "Grades 7-8",
          "Grades 9-10",
          "All Eligible Grades",
        ],
      },
      {
        id: "activityFrequency",
        label: "Frequency of Extracurricular Activities Conducted",
        type: "select",
        options: ["Weekly", "Bi-Weekly", "Monthly", "Annually"],
      },
      {
        id: "participationRate",
        label: "Student Participation Rate in Program Activities",
        type: "select",
        options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
      },
      {
        id: "programRecognition",
        label: "Awards or Recognitions Received for the Program",
        type: "select",
        options: [
          "School-Based Recognition",
          "Local/Regional Award",
          "National Award",
          "None",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Excellence in Language and Literacy Award": [
      {
        id: "languageFocus",
        label: "Primary Focus of Language and Literacy Programs",
        type: "select",
        options: [
          "Reading Comprehension",
          "Writing Skills",
          "Vocabulary Development",
          "Public Speaking",
          "All of the Above",
        ],
      },
      {
        id: "targetedGradeLevels",
        label: "Grade Levels Targeted by Language and Literacy Initiatives",
        type: "select",
        options: [
          "Grades 5-6",
          "Grades 7-8",
          "Grades 9-10",
          "All Eligible Grades",
        ],
      },
      {
        id: "literacyActivities",
        label: "Types of Language and Literacy Activities Implemented",
        type: "select",
        options: [
          "Storytelling",
          "Debates and Discussions",
          "Creative Writing",
          "Book Clubs",
          "Other",
        ],
      },
      {
        id: "proficiencyPercentage",
        label:
          "Percentage of Students Achieving Proficiency in Language and Literacy Skills",
        type: "select",
        options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
      },
      {
        id: "literacyRecognition",
        label: "Awards or Recognitions for Language and Literacy Excellence",
        type: "select",
        options: [
          "National Recognition",
          "State/Regional Award",
          "Internal School Award",
          "None",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Community Impact Award": [
      {
        id: "communityFocus",
        label: "Primary Focus of Community Outreach Initiatives",
        type: "select",
        options: [
          "Environmental Sustainability",
          "Social Welfare",
          "Educational Support",
          "Health and Wellness",
          "Other",
        ],
      },
      {
        id: "engagementActivities",
        label: "Types of Community Engagement Activities",
        type: "select",
        options: [
          "Volunteering",
          "Fundraising",
          "Awareness Campaigns",
          "Mentoring",
          "All of the Above",
        ],
      },
      {
        id: "participationLevel",
        label: "Level of Student Participation in Community Impact Activities",
        type: "select",
        options: [
          "Entire School",
          "Grade-Specific",
          "Select Groups of Students",
          "Voluntary Participation",
        ],
      },
      {
        id: "communityImpact",
        label: "Impact of Outreach Initiatives on the Local Community",
        type: "select",
        options: [
          "Significant Positive Change",
          "Moderate Positive Change",
          "Minor Positive Change",
          "No Measurable Change",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Environmental Awareness Initiative Award": [
      {
        id: "environmentalFocus",
        label: "Primary Focus of Environmental Awareness Program",
        type: "select",
        options: [
          "Recycling and Waste Management",
          "Energy Conservation",
          "Biodiversity Preservation",
          "Eco-Friendly Practices",
          "All of the Above",
        ],
      },
      {
        id: "ecoActivities",
        label: "Types of Eco-Friendly Activities Involved",
        type: "select",
        options: [
          "Clean-Up Drives",
          "Tree Planting",
          "Sustainable Farming",
          "Environmental Campaigns",
          "Other",
        ],
      },
      {
        id: "participatingGradeLevels",
        label: "Grade Levels Participating in Environmental Activities",
        type: "select",
        options: [
          "Grades 5-6",
          "Grades 7-8",
          "Grades 9-10",
          "All Eligible Grades",
        ],
      },
      {
        id: "behaviorImpact",
        label: "Impact of Environmental Initiatives on Student Behavior",
        type: "select",
        options: [
          "Significant Improvement in Eco-Consciousness",
          "Moderate Improvement",
          "Slight Improvement",
          "No Change",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Innovative Curriculum Design Award": [
      {
        id: "curriculumFocus",
        label: "Primary Focus of the Innovative Curriculum Design",
        type: "select",
        options: [
          "Critical Thinking",
          "Creativity Development",
          "Interdisciplinary Learning",
          "Student-Centered Learning",
          "All of the Above",
        ],
      },
      {
        id: "targetedGradeLevels",
        label: "Grade Levels Targeted by the Curriculum",
        type: "select",
        options: [
          "Grades 5-6",
          "Grades 7-8",
          "Grades 9-10",
          "All Eligible Grades",
        ],
      },
      {
        id: "curriculumFeatures",
        label: "Key Features of the Curriculum",
        type: "select",
        options: [
          "Project-Based Learning",
          "Problem-Solving Tasks",
          "Real-World Applications",
          "Technology Integration",
          "Other",
        ],
      },
      {
        id: "studentOutcomes",
        label: "Student Outcomes Achieved Through the Curriculum",
        type: "select",
        options: [
          "Improved Problem-Solving Skills",
          "Enhanced Creativity",
          "Stronger Collaboration",
          "Higher Academic Achievement",
          "Other",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Social Impact through Education Award": [
      {
        id: "socialFocus",
        label: "Primary Focus of Social Impact Initiatives",
        type: "select",
        options: [
          "Poverty Alleviation",
          "Gender Equality",
          "Social Justice",
          "Community Development",
          "Other",
        ],
      },
      {
        id: "socialActivities",
        label: "Key Activities Promoting Social Change through Education",
        type: "select",
        options: [
          "Awareness Campaigns",
          "Advocacy Programs",
          "Skill Development Workshops",
          "Social Entrepreneurship",
          "Other",
        ],
      },
      {
        id: "gradeLevelsInvolved",
        label: "Grade Levels Involved in Social Impact Activities",
        type: "select",
        options: [
          "Grades 5-6",
          "Grades 7-8",
          "Grades 9-10",
          "All Eligible Grades",
        ],
      },
      {
        id: "measurableImpact",
        label: "Measurable Impact of Initiatives on Students and the Community",
        type: "select",
        options: [
          "Significant Positive Change",
          "Moderate Positive Change",
          "Minor Positive Change",
          "No Measurable Change",
        ],
      },
      {
        id: "socialRecognition",
        label: "Recognition or Awards for Social Impact through Education",
        type: "select",
        options: [
          "National Award",
          "Local/Regional Recognition",
          "School-Based Acknowledgment",
          "None",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
    "Student Development and Empowerment Award": [
      {
        id: "empowermentFocus",
        label: "Primary Focus of Student Empowerment Initiatives",
        type: "select",
        options: [
          "Leadership Development",
          "Self-Confidence Building",
          "Life Skills Training",
          "Community Responsibility",
          "All of the Above",
        ],
      },
      {
        id: "empowermentActivities",
        label: "Types of Activities that Empower Students",
        type: "select",
        options: [
          "Leadership Programs",
          "Public Speaking and Debate",
          "Peer Mentorship",
          "Service Learning Projects",
          "Other",
        ],
      },
      {
        id: "gradeLevelsEmpowerment",
        label: "Grade Levels Participating in Empowerment Programs",
        type: "select",
        options: [
          "Grades 5-6",
          "Grades 7-8",
          "Grades 9-10",
          "All Eligible Grades",
        ],
      },
      {
        id: "empowermentParticipation",
        label:
          "Percentage of Students Actively Engaged in Empowerment Initiatives",
        type: "select",
        options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
      },
      {
        id: "empowermentImpact",
        label: "Impact of Empowerment Initiatives on Student Outcomes",
        type: "select",
        options: [
          "Significant Improvement in Leadership Skills",
          "Moderate Improvement",
          "Minor Improvement",
          "No Change",
        ],
      },
      {
        id: "uniqueContributions",
        label:
          "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
        type: "textarea",
      },
    ],
  };
const Form = () => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    whatsappNumber: string;
    designation: string;
    school: string;
    country: { value: string; label: string } | null;
    state: { value: string; label: string } | null;
    city: { value: string; label: string } | null;
    isWhatsappSame: boolean;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    designation: "",
    school: "",
    country: null,
    state: null,
    city: null,
    isWhatsappSame: false,
  });
  const [selectedAwardCategory, setSelectedAwardCategory] =
    useState<string>("");
  const [awardData, setAwardData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile Number is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.school) newErrors.school = "School is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!selectedAwardCategory)
      newErrors.selectedAwardCategory = "Award Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      whatsappNumber:
        type === "checkbox" ? formData.mobileNumber : formData.whatsappNumber,
    });
  };

  const handleSelectChange = (selectedOption: { value: string; label: string } | null, name: string) => {
    setFormData({
      ...formData,
      [name]: selectedOption,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;
  
    const finalData = {
      ...formData,
      awardCategory: selectedAwardCategory,
      ...awardData,
    };
  
    // Save to localStorage
    const storedData = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
    storedData.push(finalData);
    localStorage.setItem("formSubmissions", JSON.stringify(storedData));
  
    alert("Form saved locally. It will be submitted to the API once it's ready.");
  };
//   api to save data to api
//   const submitSavedDataToAPI = async () => {
//     const storedData = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
  
//     if (!storedData.length) {
//       alert("No saved data to submit.");
//       return;
//     }
  
//     try {
//       const responses = await Promise.all(
//         storedData.map((data) =>
//           axios.post("/award-form-submit", data)
//         )
//       );
//       console.log("All saved data submitted successfully:", responses);
  
//       // Clear localStorage after successful submission
//       localStorage.removeItem("formSubmissions");
//       alert("All saved data has been submitted to the API.");
//     } catch (error) {
//       console.error("Error submitting saved data:", error);
//       alert("There was an error submitting the saved data.");
//     }
//   };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Registration Form</h2>
        <div className="form-grid">
          <div className="form-item">
            <label className="form-label">
              First Name: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              Last Name: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              Email: <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              Mobile Number: <span className="required">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.mobileNumber && (
              <span className="error-message">{errors.mobileNumber}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">WhatsApp Number:</label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-item form-item-checkbox">
            <input
              type="checkbox"
              name="isWhatsappSame"
              checked={formData.isWhatsappSame}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label className="form-label-inline">
              WhatsApp number same as mobile number
            </label>
          </div>
          <div className="form-item">
            <label className="form-label">
              Designation: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.designation && (
              <span className="error-message">{errors.designation}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              School: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="form-input"
            />
            {errors.school && (
              <span className="error-message">{errors.school}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              Country: <span className="required">*</span>
            </label>
            <Select
              options={Country.getAllCountries().map((country) => ({
                value: country.isoCode,
                label: country.name,
              }))}
              onChange={(option) => handleSelectChange(option, "country")}
              className="form-select"
              isSearchable
            />
            {errors.country && (
              <span className="error-message">{errors.country}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              State: <span className="required">*</span>
            </label>
            <Select
              options={
                formData.country
                  ? State.getStatesOfCountry(formData.country.value).map(
                      (state) => ({
                        value: state.isoCode,
                        label: state.name,
                      })
                    )
                  : []
              }
              onChange={(option) => handleSelectChange(option, "state")}
              className="form-select"
              isSearchable
            />
            {errors.state && (
              <span className="error-message">{errors.state}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              City: <span className="required">*</span>
            </label>
            <Select
              options={
                formData.state && formData.country
                  ? City.getCitiesOfState(
                      formData.country.value,
                      formData.state.value
                    ).map((city) => ({
                      value: city.name,
                      label: city.name,
                    }))
                  : []
              }
              onChange={(option) => handleSelectChange(option, "city")}
              className="form-select"
              isSearchable
            />
            {errors.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>
        </div>
        {/* Award Section */}
        <div className="awards-container">
          <h3 className="awards-title">Awards and Recognitions</h3>
          <div className="form-item">
            <label className="form-label">Select Award Category:</label>
            <Select
              options={Object.keys(awardQuestions).map((award) => ({
                value: award,
                label: award,
              }))}
              onChange={(option) => {
                if (option) {
                  setSelectedAwardCategory(option.value);
                }
              }}
              className="form-select"
              isSearchable
            />
          </div>
          {selectedAwardCategory &&
            awardQuestions[selectedAwardCategory]?.map((question) => (
              <div key={question.id} className="award-question-item">
                <label className="award-question-label">{question.label}</label>
                {question.type === "select" ? (
                  <Select
                    options={question.options?.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    onChange={(option) => {
                      if (option) {
                        setAwardData((prevData) => ({
                          ...prevData,
                          [question.id]: option.value,
                        }));
                      }
                    }}
                    className="award-question-select"
                  />
                ) : (
                  <textarea
                    id={question.id}
                    rows={4}
                    className="award-question-textarea"
                    onChange={(e) =>
                      setAwardData((prevData) => ({
                        ...prevData,
                        [question.id]: e.target.value,
                      }))
                    }
                  ></textarea>
                )}
              </div>
            ))}
          <button type="submit" className="awards-submit-button">
            Submit
          </button>
          {/* <button onClick={submitSavedDataToAPI} className="submit-saved-data-button" style={{ display: 'none' }}>
            Submit Saved Data
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Form;
