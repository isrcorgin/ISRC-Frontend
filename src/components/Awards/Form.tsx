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

const awardQuestions: {
  [key: string]: {
    subAwards: string[];
    questions: { [key: string]: Question[] };
  };
} = {
  "Excellence in Education": {
    subAwards: [
      "K-12 School Chain of the Year",
      "Best School Chain of the Year",
      "Excellence in Language and Literacy Award",
      "Innovative Curriculum Design Award",
      "Lifelong Learning Award",
    ],
    questions: {
      "K-12 School Chain of the Year": [
        {
          id: "gradeLevelsServed",
          label: "Grade Levels Served",
          type: "select",
          options: ["K-5", "6-8", "9-10", "11-12", "All K-12"],
        },
        {
          id: "numSchools",
          label: "Number of Schools in Chain",
          type: "select",
          options: ["1-10", "11-25", "26-50", "51+"],
        },
        {
          id: "academicPerformance",
          label: "Average Academic Performance Across Schools",
          type: "select",
          options: ["90%+", "80-89%", "70-79%", "Below 70%"],
        },
        {
          id: "focusAreas",
          label: "Focus Areas of Holistic Development",
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
          id: "recognitions",
          label: "Recognition or Accreditations Received",
          type: "select",
          options: [
            "National Award",
            "State-Level Recognition",
            "International Accreditation",
            "None",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],

      "Best School Chain of the Year": [
        {
          id: "qualityFocus",
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
          id: "learningEnvironment",
          label: "Supportive Learning Environment Features",
          type: "select",
          options: [
            "Mentorship Programs",
            "Counseling Services",
            "Extracurricular Opportunities",
            "Safe and Inclusive Spaces",
            "All of the Above",
          ],
        },
        {
          id: "operatingYears",
          label: "Number of Years Operating as a School Chain",
          type: "select",
          options: [
            "Less than 5 years",
            "5-10 years",
            "11-20 years",
            "21+ years",
          ],
        },
        {
          id: "awards",
          label: "Awards or Recognitions for Excellence in Education",
          type: "select",
          options: [
            "National Award",
            "State-Level Recognition",
            "International Accreditation",
            "None",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Excellence in Language and Literacy Award": [
        {
          id: "primaryFocus",
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
          id: "gradeLevelsTargeted",
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
          id: "literacyAwards",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Innovative Curriculum Design Award": [
        {
          id: "primaryFocus",
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
          id: "gradeLevelsTargeted",
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
          id: "keyFeatures",
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
          id: "recognitions",
          label: "Recognition or Awards for Innovative Curriculum Design",
          type: "select",
          options: [
            "National Recognition",
            "State/Regional Award",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Lifelong Learning Award": [
        {
          id: "programsPromoting",
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
          id: "recognitions",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
    },
  },
  "Innovation in Teaching and Learning": {
    subAwards: [
      "Innovative Teaching Methods Award",
      "Best STEM Program Award",
      "Outstanding Digital Learning Transformation",
      "Innovative Curriculum Design Award",
    ],
    questions: {
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
          id: "subjectsEnhanced",
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
          id: "studentEngagement",
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
          id: "studentFeedback",
          label: "Student Feedback on Teaching Methods",
          type: "select",
          options: ["Excellent", "Very Good", "Good", "Fair", "Not Collected"],
        },
        {
          id: "recognition",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
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
          id: "gradeLevels",
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
          id: "keyElements",
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
          id: "achievements",
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
          id: "participationPercentage",
          label:
            "Percentage of Student Participation in STEM Activities Annually",
          type: "select",
          options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
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
          id: "focusAreas",
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
          id: "studentEngagement",
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
          id: "recognition",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Innovative Curriculum Design Award": [
        {
          id: "primaryFocus",
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
          id: "gradeLevelsTargeted",
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
          id: "keyFeatures",
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
          id: "recognitions",
          label: "Recognition or Awards for Innovative Curriculum Design",
          type: "select",
          options: [
            "National Recognition",
            "State/Regional Award",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
    },
  },
  "Sustainability and Environmental Leadership": {
    subAwards: [
      "Green School Award",
      "Environmental Awareness Initiative Award",
    ],
    questions: {
      "Green School Award": [
        {
          id: "ecoPractices",
          label: "Eco-Friendly Practices Implemented in the School",
          type: "select",
          options: [
            "Waste Segregation",
            "Rainwater Harvesting",
            "Solar Power Usage",
            "Tree Plantation Drives",
            "All of the Above",
          ],
        },
        {
          id: "greenCertifications",
          label: "Certifications or Awards for Green Practices",
          type: "select",
          options: [
            "National Green Certification",
            "State-Level Recognition",
            "Local Community Acknowledgment",
            "None",
          ],
        },
        {
          id: "studentParticipation",
          label: "Percentage of Students Involved in Environmental Programs",
          type: "select",
          options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Environmental Awareness Initiative Award": [
        {
          id: "primaryFocus",
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
          id: "gradeLevels",
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
          id: "impact",
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
          id: "awardsRecognition",
          label: "Awards or Recognition for Environmental Efforts",
          type: "select",
          options: [
            "National Recognition",
            "Local/Regional Award",
            "School-Based Award",
            "None",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
    },
  },
  "Student-Centric Development": {
    subAwards: [
      "Student Well-being Initiative Award",
      "Best Extracurricular Program Award",
      "Student Development and Empowerment Award",
    ],
    questions: {
      "Student Well-being Initiative Award": [
        {
          id: "primaryFocus",
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
          id: "studentParticipation",
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
          id: "recognition",
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
          id: "frequency",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Student Development and Empowerment Award": [
        {
          id: "primaryFocus",
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
          id: "gradeLevels",
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
          id: "engagementPercentage",
          label:
            "Percentage of Students Actively Engaged in Empowerment Initiatives",
          type: "select",
          options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
        },
        {
          id: "impact",
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
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],

      "Best Extracurricular Program Award": [
        {
          id: "activities",
          label: "Key Extracurricular Activities Organized",
          type: "select",
          options: [
            "Cultural Events",
            "Sports Competitions",
            "Debates and Quizzes",
            "Music and Arts Programs",
            "All of the Above",
          ],
        },
        {
          id: "studentParticipation",
          label: "Percentage of Students Participating in Activities",
          type: "select",
          options: ["Less than 25%", "25-50%", "51-75%", "76% or more"],
        },
        {
          id: "recognitions",
          label: "Awards or Recognitions for Extracurricular Programs",
          type: "select",
          options: [
            "National Recognition",
            "State-Level Recognition",
            "Community-Level Acknowledgment",
            "None",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
    },
  },
  "Inclusion and Social Responsibility": {
    subAwards: [
      "Inclusive Education Champion",
      "Social Impact through Education Award",
      "Community Impact Award",
    ],
    questions: {
      "Inclusive Education Champion": [
        {
          id: "inclusiveFocus",
          label: "Primary Focus of Inclusive Education Efforts",
          type: "select",
          options: [
            "Differently-Abled Students",
            "Gender Equality",
            "Socioeconomic Inclusion",
            "Language and Cultural Diversity",
            "All of the Above",
          ],
        },
        {
          id: "inclusiveActivities",
          label: "Types of Inclusive Activities Implemented",
          type: "select",
          options: [
            "Special Education Programs",
            "Counseling Services",
            "Diversity Training",
            "Community Outreach",
            "Other",
          ],
        },
        {
          id: "impactOnStudents",
          label: "Impact of Inclusion Programs on Students",
          type: "select",
          options: [
            "High Impact",
            "Moderate Impact",
            "Low Impact",
            "No Measurable Impact",
          ],
        },
        {
          id: "recognitions",
          label: "Recognitions for Inclusive Education Efforts",
          type: "select",
          options: [
            "National Recognition",
            "Regional/Local Awards",
            "Internal School Recognition",
            "None",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Social Impact through Education Award": [
        {
          id: "impactFocus",
          label: "Primary Focus of Social Impact Programs",
          type: "select",
          options: [
            "Poverty Alleviation",
            "Gender Equality",
            "Health Awareness",
            "Community Upliftment",
            "All of the Above",
          ],
        },
        {
          id: "impactActivities",
          label: "Key Activities for Driving Social Impact",
          type: "select",
          options: [
            "Awareness Campaigns",
            "Workshops and Seminars",
            "Skill Development Initiatives",
            "Community Engagement",
            "Other",
          ],
        },
        {
          id: "impactOutcomes",
          label: "Outcomes of Social Impact Initiatives",
          type: "select",
          options: [
            "Increased Community Awareness",
            "Improved Health Metrics",
            "Enhanced Gender Equality",
            "Poverty Reduction",
            "Other",
          ],
        },
        {
          id: "recognitions",
          label: "Recognitions for Social Impact Initiatives",
          type: "select",
          options: [
            "National Recognition",
            "Regional/Local Awards",
            "Internal School Recognition",
            "None",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
      "Community Impact Award": [
        {
          id: "communityFocus",
          label: "Primary Focus of Community Impact Initiatives",
          type: "select",
          options: [
            "Health and Well-Being",
            "Education Access",
            "Skill Development",
            "Environmental Conservation",
            "All of the Above",
          ],
        },
        {
          id: "communityActivities",
          label: "Types of Community Impact Activities",
          type: "select",
          options: [
            "Volunteer Programs",
            "Partnerships with NGOs",
            "Infrastructure Development",
            "Educational Workshops",
            "Other",
          ],
        },
        {
          id: "communityOutcomes",
          label: "Outcomes Achieved Through Community Impact Initiatives",
          type: "select",
          options: [
            "Significant Community Improvement",
            "Moderate Improvement",
            "Slight Improvement",
            "No Change",
          ],
        },
        {
          id: "recognitions",
          label: "Recognitions for Community Impact Efforts",
          type: "select",
          options: [
            "National Recognition",
            "Regional/Local Awards",
            "Community Acknowledgment",
            "None",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
    },
  },

  "Leadership and Entrepreneurship": {
    subAwards: ["Education Entrepreneur of the Year Award"],
    questions: {
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
          id: "impactFocus",
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
          id: "scaleOfImpact",
          label: "Scale of Reach/Impact",
          type: "select",
          options: ["Local/Regional", "National", "International"],
        },
        {
          id: "recognitions",
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
          id: "yearsOfExperience",
          label: "Years of Experience in the Education Sector",
          type: "select",
          options: [
            "Less than 3 years",
            "3-5 years",
            "6-10 years",
            "10+ years",
          ],
        },
        {
          id: "uniqueContributions",
          label:
            "Please share any unique achievements, experiences, or contributions that haven't been covered in the above sections. This is your opportunity to highlight anything exceptional about you or your work in a concise and impactful manner (Limit: 500 words)",
          type: "textarea",
        },
        {
          id: "uniqueContributions2",
          label:
            "Please provide photos and/or videos that demonstrate your institution’s achievements, initiatives, or programs relevant to this award category. Share a Google Drive link with the required materials (ensure the link has view access).",
          type: "textarea",
        },
      ],
    },
  },
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
    institutewebsite: string;
    establishdate: string;
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
    institutewebsite: "",
    establishdate: "",
    country: null,
    state: null,
    city: null,
    isWhatsappSame: false,
  });
  const [selectedAwardCategory, setSelectedAwardCategory] =
    useState<string>("");
  const [awardData, setAwardData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedMainAward, setSelectedMainAward] = useState<string | null>(
    null
  );
  const [selectedSubAward, setSelectedSubAward] = useState<string | null>(null);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    //   if (!formData.firstName) newErrors.firstName = "First Name is required";
    //   if (!formData.lastName) newErrors.lastName = "Last Name is required";
    //   if (!formData.email) newErrors.email = "Email is required";
    //   if (!formData.mobileNumber)
    //     newErrors.mobileNumber = "Mobile Number is required";
    //   if (!formData.designation)
    //     newErrors.designation = "Designation is required";
    //   if (!formData.school) newErrors.school = "School is required";
    //   if (!formData.country) newErrors.country = "Country is required";
    //   if (!formData.state) newErrors.state = "State is required";
    //   if (!formData.city) newErrors.city = "City is required";
    //   if (!selectedAwardCategory)
    //     newErrors.selectedAwardCategory = "Award Category is required";

    //   setErrors(newErrors);
    //   return Object.keys(newErrors).length === 0;
    // };
    // Basic field validations
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      // Regex to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Mobile number validation
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile Number must be exactly 10 digits";
    }

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

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null,
    name: string
  ) => {
    setFormData({
      ...formData,
      [name]: selectedOption,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate fields
    if (!validateFields()) return;

    // Prepare final data
    const finalData = {
      ...formData,
      awardCategory: selectedAwardCategory,
      ...awardData,
    };

    try {
      // Make POST request with Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/awards/submit-form`,
        finalData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Form Submitted Successfully!");
        // Optionally clear the form or reset state here
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          whatsappNumber: "",
          designation: "",
          school: "",
          institutewebsite: "",
          establishdate: "",
          country: null,
          state: null,
          city: null,
          isWhatsappSame: false,
        });
        setSelectedAwardCategory("");
        setAwardData({});
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      // Show error message to the user
      alert(
        error.response?.data?.message ||
          "An error occurred while submitting the form."
      );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Registration Form</h2>
        <div className="form-grid">
          {/* First Name */}
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
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          {/* Last Name */}
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
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          {/* Email */}
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
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Mobile Number */}
          <div className="form-item">
            <label className="form-label">
              Mobile Number: <span className="required">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  mobileNumber: e.target.value,
                }));
              }}
              required
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
            {errors.mobileNumber && (
              <span className="error-message">{errors.mobileNumber}</span>
            )}
          </div>

          {/* WhatsApp Number */}
          <div className="form-item xl:mb-4">
            <label className="form-label">WhatsApp Number:</label>
            <input
              type="tel"
              name="whatsappNumber"
              value={
                formData.isWhatsappSame
                  ? formData.mobileNumber
                  : formData.whatsappNumber
              }
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  whatsappNumber: formData.isWhatsappSame
                    ? formData.mobileNumber
                    : e.target.value,
                }));
              }}
              disabled={formData.isWhatsappSame} // Disable input when checkbox is checked
              className={`form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                formData.isWhatsappSame ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
            {errors.whatsappNumber && (
              <span className="error-message">{errors.whatsappNumber}</span>
            )}
          </div>

          {/* Checkbox for WhatsApp Same as Mobile */}
          <div className="form-item form-item-checkbox flex flex-row items-center gap-2">
            <input
              type="checkbox"
              name="isWhatsappSame"
              checked={formData.isWhatsappSame}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  isWhatsappSame: e.target.checked,
                }));
              }}
              className="form-checkbox w-6 h-6 mr-2"
            />
            <span className="text-base font-bold">
              <b>WhatsApp no. same as mobile no.</b>
            </span>
          </div>

          {/* Designation */}
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
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
            {errors.designation && (
              <span className="error-message">{errors.designation}</span>
            )}
          </div>

          {/* Institute Name */}
          <div className="form-item">
            <label className="form-label">
              Institute Name: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
            {errors.school && (
              <span className="error-message">{errors.school}</span>
            )}
          </div>

          {/* Institute Website */}
          <div className="form-item">
            <label className="form-label">Institute Website:</label>
            <input
              type="url"
              name="institutewebsite"
              value={formData.institutewebsite}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter website URL"
            />
          </div>

          {/* Establish Date */}
          <div className="form-item">
            <label className="form-label">Establishment Year:</label>
            <input
              type="date"
              name="establishdate"
              value={formData.establishdate}
              onChange={handleChange}
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
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
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              isSearchable
            />
            {errors.country && (
              <span className="error-message">{errors.country}</span>
            )}
          </div>
          <div className="form-item">
            <label className="form-label">
              State/Province: <span className="required">*</span>
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
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
              className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              isSearchable
            />
            {errors.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>
        </div>
        {/* Main Award Dropdown */}
        <div className="form-item mb-6 mt-4">
          <label className="form-label font-bold mb-2 block">
            Choose a Primary Award Category:
          </label>
          <Select
            options={Object.keys(awardQuestions).map((mainAward) => ({
              value: mainAward,
              label: mainAward,
            }))}
            onChange={(option) => {
              if (option) {
                setSelectedAwardCategory(option.value);
                setSelectedSubAward(""); // Reset sub-award dropdown
              }
            }}
            className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Choose a Primary Award Category"
          />
        </div>

        {/* Sub-Award Dropdown */}
        <div className="form-item mb-6">
          <label className="form-label font-bold mb-2 block">
            Select a Specific Sub-Award:
          </label>
          <Select
            options={awardQuestions[selectedAwardCategory]?.subAwards.map(
              (subAward) => ({
                value: subAward,
                label: subAward,
              })
            )}
            onChange={(option) => {
              if (option) {
                setSelectedSubAward(option.value);
              }
            }}
            className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Select Sub-Award"
            isSearchable
          />
        </div>

        {/* Render Questions */}
        {selectedSubAward &&
          awardQuestions[selectedAwardCategory]?.questions[
            selectedSubAward
          ]?.map((question) => (
            <div key={question.id} className="form-item mb-6">
              <label className="form-label font-bold mb-2 block">
                {question.label}
              </label>
              {question.type === "select" ? (
                <Select
                  options={question.options?.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  onChange={(option) => {
                    setAwardData((prevData) => ({
                      ...prevData,
                      [question.id]: option?.value || "", // Ensure no undefined values
                    }));
                  }}
                  className="form-input mt-1 block w-full px-4 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  isSearchable
                  placeholder="Choose an option"
                />
              ) : (
                <textarea
                  id={question.id}
                  rows={4}
                  className="award-question-textarea w-full p-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 mt-1"
                  placeholder="Enter your response here..."
                  onChange={(e) =>
                    setAwardData((prevData) => ({
                      ...prevData,
                      [question.id]: e.target.value || "", // Ensure no undefined values
                    }))
                  }
                ></textarea>
              )}
            </div>
          ))}

        {/* Submit Buttons */}
        <div>
          <button
            type="submit"
            className="awards-submit-button bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
