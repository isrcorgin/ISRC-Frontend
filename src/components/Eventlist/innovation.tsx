"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Modal, Button } from 'react-bootstrap';



interface ProjectSuggestion {
  title: string;
  content: {
    '10-14': string[];
    '15-18': string[];
    '19-22': string[];
  };
}
interface InnovationTopic {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
}

const innovationTopics = [
  { title: 'Sustainable Development', description: 'Projects that focus on creating solutions for sustainable living and environmental conservation.', imageUrl: '/img/ino/2.png', id: 'sustainable-development' },
  { title: 'Smart Cities', description: 'Innovations aimed at improving urban living through smart technologies and IoT.', imageUrl: '/img/ino/3.png', id: 'smart-cities' },
  { title: 'Healthcare', description: 'Developments in medical technology, healthcare systems, and solutions that enhance patient care and health services.', imageUrl: '/img/ino/5.png', id: 'healthcare' },
  { title: 'Agriculture and Food Security', description: 'Projects that address challenges in agriculture, farming techniques, and food production to ensure food security.', imageUrl: '/img/ino/9.png', id: 'agriculture' },
  { title: 'Education and Learning', description: 'Innovations that enhance educational systems, learning methodologies, and access to education.', imageUrl: '/img/ino/7.png', id: 'education' },
  { title: 'Energy Solutions', description: 'Renewable energy projects and technologies aimed at efficient energy use and management.', imageUrl: '/img/ino/6.png', id: 'energy-solutions' },
  { title: 'Robotics and Automation', description: 'Advancements in robotics, automation, and AI for various applications.', imageUrl: '/img/ino/4.png', id: 'robotics' },
  { title: 'Transport and Mobility', description: 'Solutions that improve transportation systems, reduce traffic congestion, and promote sustainable mobility.', imageUrl: '/img/ino/1.png', id: 'transport' },
  { title: 'Disaster Management', description: 'Technologies and systems that aid in disaster prediction, management, and recovery.', imageUrl: '/img/ino/8.png', id: 'disaster-management' },
];
const suggestions: Record<string, ProjectSuggestion> = {
  'sustainable-development': {
    title: 'Sustainable Development - Innovation Project Topics for ISRC',
    content: {
      '10-14': [
        'Eco-Friendly School Supplies: Develop school supplies using recycled or biodegradable materials.',
        'Water Conservation Model: Create a model that demonstrates ways to conserve water in schools and homes.',
        'Solar-Powered Toys: Design simple toys powered by solar energy.',
        'Community Recycling Program: Develop a project plan for starting a recycling initiative in your community.',
        'Green Classroom Initiative: Design a plan to make your classroom or school more eco-friendly.',
        'Vertical Garden: Build a small vertical garden to grow plants in limited space.',
        'Energy-Saving Gadgets: Create a simple gadget that helps save energy at home.',
        'Upcycling Project: Turn waste materials into useful items, like turning old bottles into planters.',
        'Air Quality Monitor: Build a simple device to measure air quality around your school or neighborhood.',
        'Plastic-Free Challenge: Develop a project to reduce plastic use in your daily life.'
      ],
      '15-18': [
        'Smart Irrigation System: Develop a system to optimize water use in agricultural practices.',
        'Renewable Energy Home Solutions: Design affordable renewable energy solutions for households.',
        'Sustainable Packaging: Innovate new packaging methods to reduce plastic waste in food delivery.',
        'Waste-to-Energy Conversion: Create a model that converts organic waste into energy.',
        'Urban Farming: Develop a project to grow food in urban spaces using sustainable methods.',
        'Eco-Friendly Transportation: Design a plan for implementing eco-friendly transportation in your community.',
        'Water Purification System: Innovate a low-cost water purification system for rural areas.',
        'Biodiversity Restoration: Create a project focused on restoring local ecosystems and habitats.',
        'Sustainable Fashion: Develop a line of clothing using recycled or sustainable materials.',
        'Energy-Efficient Home Design: Design a model of an energy-efficient home using sustainable materials.'
      ],
      '19-22': [
        'Smart Grid Solutions: Develop a smart grid project to integrate renewable energy into existing power systems.',
        'Carbon Footprint Reduction: Create a comprehensive plan to reduce carbon footprints in urban areas.',
        'Circular Economy Model: Design a model for a circular economy in a specific industry, such as electronics.',
        'Sustainable Urban Planning: Innovate urban planning methods that incorporate green spaces and renewable energy.',
        'Advanced Waste Management: Develop a project on advanced techniques for waste segregation and recycling.',
        'Sustainable Agriculture: Create a project focused on innovative techniques in sustainable agriculture.',
        'Clean Energy Technology: Design a new technology that promotes the use of clean energy.',
        'Water Management System: Develop an advanced water management system for urban areas facing water scarcity.',
        'Eco-Innovation in Industry: Innovate ways to make industrial processes more eco-friendly.',
        'Climate Change Mitigation: Create a project that focuses on strategies to mitigate climate change at the community level.'
      ]
    }
  },
  'smart-cities': {
    title: 'Smart Cities - Innovation Project Topics for ISRC',
    content: {
      '10-14': [
        'Smart Street Lighting: Design a model for street lights that automatically adjust brightness based on activity.',
        'Traffic Management System: Create a simple system to manage traffic flow using sensors and signals.',
        'Waste Collection System: Develop a plan for an automated waste collection system in a neighborhood.',
        'Smart Playgrounds: Design a playground with interactive, technology-enabled features for safety and learning.',
        'Air Quality Monitoring: Create a basic device to monitor and display air quality in your community.',
        'Public Transport App: Develop a simple app to help people plan their routes using public transport.',
        'Safe Routes to School: Design a project that identifies and maps the safest routes for students walking to school.',
        'Smart Recycling Bins: Innovate a recycling bin that automatically sorts waste into categories.',
        'Digital Notice Board: Create a digital notice board for public spaces to share community updates and events.',
        'Water Leak Detector: Build a simple system to detect and alert for water leaks in homes or schools.'
      ],
      '15-18': [
        'Smart Parking System: Develop a system that helps drivers find available parking spots using sensors and apps.',
        'Energy-Efficient Buildings: Design a project focused on making buildings more energy-efficient with smart technology.',
        'Urban Agriculture: Create a plan for integrating urban farming into city landscapes using smart technology.',
        'Intelligent Waste Management: Develop a system that optimizes waste collection routes and schedules based on real-time data.',
        'Smart Public Transport: Design an innovative public transport system that uses real-time data to optimize routes and reduce wait times.',
        'Smart Water Management: Create a project that uses sensors to monitor and manage water usage in urban areas.',
        'Digital Health Kiosks: Develop a concept for digital health kiosks that provide basic health services in public places.',
        'Smart Traffic Signals: Innovate traffic signals that adapt to real-time traffic conditions to reduce congestion.',
        'Eco-Friendly Urban Spaces: Design a project that creates green spaces in urban areas using smart planning and technology.',
        'Public Safety System: Develop a system that integrates surveillance, emergency response, and public alerts to enhance city safety.'
      ],
      '19-22': [
        'Smart Grid Integration: Develop a project to integrate renewable energy sources into the city’s power grid efficiently.',
        'Sustainable Urban Mobility: Innovate solutions for reducing carbon emissions from city transportation through smart mobility.',
        'Smart Housing Solutions: Design housing solutions that use smart technology to reduce energy consumption and improve living conditions.',
        'Urban Data Analytics: Create a project focused on analyzing city data to improve public services like waste management, energy, and transport.',
        'Integrated City Services: Develop a platform that integrates various city services like waste collection, water supply, and energy management for better efficiency.',
        'Smart Emergency Response: Innovate a system that uses data and technology to improve emergency response times and coordination in cities.',
        'Sustainable Urban Planning: Design a project that uses smart technology to create more sustainable and resilient city infrastructures.',
        'Smart City Infrastructure: Develop a project on the deployment of smart sensors and IoT devices across city infrastructure for real-time monitoring.',
        'Digital Twin for Urban Planning: Create a digital twin of a city area to simulate and plan for urban development and infrastructure.',
        'Smart Public Spaces: Design public spaces that integrate technology to enhance community engagement, safety, and accessibility.'
      ]
    }
  },
  'healthcare': {
    title: 'Healthcare - Innovation Project Topics for ISRC',
    content: {
      '10-14': [
        'Healthy Eating App: Develop a simple app that helps kids track their daily nutrition and encourages healthy eating habits.',
        'First Aid Kit for Kids: Design a user-friendly first aid kit with easy-to-understand instructions for children.',
        'Smart Medicine Box: Create a medicine box that reminds patients to take their medication on time.',
        'Hand Hygiene Monitor: Build a device that encourages proper handwashing techniques and tracks hand hygiene.',
        'Health and Fitness Tracker: Design a basic wearable that tracks steps, heart rate, and encourages physical activity.',
        'Virtual Doctor’s Visit: Develop a concept for a virtual doctor’s visit app for kids with common illnesses.',
        'Home Safety Checklist: Create a project that helps families identify and mitigate common home health hazards.',
        'Healthy Habits Game: Develop a board game that teaches kids about healthy lifestyle choices.',
        'Air Quality Monitor: Build a device that monitors indoor air quality and alerts when it reaches unsafe levels.',
        'Emergency Contact App: Create an app that allows children to quickly contact emergency services or family members.'
      ],
      '15-18': [
        'Telemedicine Platform: Develop a platform that connects patients in remote areas with healthcare providers for virtual consultations.',
        'Wearable Health Monitor: Design a wearable device that tracks vital signs and alerts users to potential health issues.',
        'Mental Health Support App: Create an app that provides mental health resources and connects users with counselors.',
        'Smart Pill Dispenser: Develop a device that dispenses medication based on a user’s schedule and tracks adherence.',
        'Remote Patient Monitoring: Innovate a system for monitoring patients’ health remotely, particularly for chronic conditions.',
        'Health Data Analytics: Create a project that analyzes patient data to identify trends and improve healthcare outcomes.',
        'Mobile Health Clinics: Design a mobile clinic that brings healthcare services to underserved areas.',
        'AI-Powered Diagnostics: Develop a project using AI to assist in diagnosing common illnesses or conditions.',
        'Smart Hospital System: Create a concept for a hospital system that integrates IoT devices for real-time monitoring and management.',
        'Emergency Response System: Develop an app that connects users to nearby healthcare facilities in case of an emergency.'
      ],
      '19-22': [
        'AI-Driven Personalized Medicine:  Develop a project that uses AI to create personalized treatment plans based on patient data.',
        'Blockchain for Health Records: Innovate a system using blockchain technology to securely manage and share patient health records.',
        'Wearable Biosensors: Design wearable biosensors that monitor various health parameters and provide real-time data to healthcare providers.',
        'Telehealth Solutions for Rural Areas: Create a comprehensive telehealth solution that addresses the unique challenges of providing healthcare in rural areas.',
        'Smart Health Devices: Develop a project focused on creating smart devices for chronic disease management, like diabetes or heart disease.',
        'Predictive Analytics in Healthcare: Innovate a system that uses predictive analytics to anticipate health issues and intervene early.',
        'Virtual Reality for Rehabilitation: Create a project that uses virtual reality to assist in physical rehabilitation for patients.',
        'Sustainable Healthcare Facilities: Design a model for healthcare facilities that are environmentally sustainable and energy-efficient.',
        'AI-Powered Health Assistants: Develop an AI-powered assistant that helps patients manage their health and medications.',
        'Global Health Network: Create a platform that connects healthcare professionals across the globe for knowledge sharing and collaborative research.'
      ]
    }
  },
  'agriculture': {
    title: 'Agriculture and Food Security - Innovation Project Topics for ISRC',
    content: {
      '10-14': [
        'Home Vegetable Garden: Develop a project where students grow their own vegetables at home to learn about food production and sustainability.',
        'Rainwater Harvesting for Gardens: Create a system to collect and use rainwater for watering plants, promoting water conservation in agriculture.',
        'Healthy School Lunches: Design a project that encourages students to create nutritious and sustainable meal plans using locally sourced ingredients.',
        'Food Waste Composting: Develop a composting initiative at school to turn food waste into fertilizer for gardening projects.',
        'Educational Game on Food Security: Create a simple board or digital game that teaches players about food security and the importance of sustainable agriculture.',
        'Community Food Drive: Organize a food drive that focuses on collecting non-perishable items for local food banks, raising awareness about food security in your community.',
        'Pollinator-Friendly Gardens: Design a garden that attracts bees and other pollinators, essential for food crop production.',
        'School Greenhouse Project: Develop a greenhouse at school to grow vegetables year-round, teaching students about controlled environment agriculture.',
        'Food Miles Awareness: Create a project that tracks the distance food travels from farm to table, promoting the benefits of eating locally grown produce.',
        'Seed Saving Project: Encourage students to save and exchange seeds from their garden to preserve biodiversity and promote sustainable agriculture.'
      ],
      '15-18': [
        'Urban Food Security Solutions: Develop a project that explores innovative ways to grow food in urban environments, like rooftop gardens or vertical farming.',
        'Smart Irrigation Systems: Design a smart irrigation system that conserves water while maximizing crop yield, addressing food security in water-scarce regions.',
        'Sustainable Crop Rotation: Create a plan for sustainable crop rotation that enhances soil health and increases food production.',
        'Food Waste Reduction in Cafeterias: Develop a project that implements strategies to reduce food waste in school cafeterias and redistribute excess food to those in need.',
        'Local Food Networks: Design a system that connects local farmers with consumers, reducing food miles and supporting local economies.',
        'Nutrient-Rich Superfoods: Research and develop a project around growing and promoting nutrient-rich superfoods that can combat malnutrition.',
        'Resilient Crop Varieties: Explore and cultivate crop varieties that are resilient to climate change, ensuring food security in changing environmental conditions.',
        'Community-Supported Agriculture (CSA): Develop a project that implements a CSA model in your community, where members purchase shares of a local farm’s harvest.',
        'Aquaponics for Food Security: Create an aquaponics system that integrates fish farming with vegetable growing, providing a sustainable food source.',
        'Food Security Education Campaign: Develop a campaign to educate your community about the importance of food security and sustainable agriculture practices.'
      ],
      '19-22': [
        'Climate-Resilient Agriculture Practices: Innovate agricultural practices that help farmers adapt to climate change, ensuring food security for future generations.',
        'Blockchain for Food Traceability: Develop a blockchain-based system to enhance transparency and trust in food supply chains, from farm to table.',
        'Urban Agriculture Hubs: Design urban agriculture hubs that bring food production into cities, improving access to fresh produce and enhancing food security.',
        'Renewable Energy in Agriculture: Create a project that integrates renewable energy sources like solar or wind into agricultural practices to reduce costs and increase sustainability.',
        'Digital Platforms for Food Distribution: Develop a digital platform that connects farmers directly with consumers, reducing food waste and improving access to fresh food.',
        'Sustainable Livestock Farming: Innovate methods for sustainable livestock farming that reduce environmental impact while ensuring a steady supply of animal products.',
        'Agroforestry for Food Security: Design a project that integrates trees and shrubs into agricultural landscapes, enhancing biodiversity and food production.',
        'AI-Powered Crop Monitoring: Develop an AI-based system that monitors crop health and predicts yield outcomes, helping farmers optimize production and ensure food security.',
        'Food Policy Advocacy: Create a project that analyzes and advocates for policies that support food security and sustainable agriculture at the local, national, or international level.',
        'Global Food Security Solutions: Develop strategies for addressing global food security challenges, such as hunger, malnutrition, and food distribution inequalities, through innovative technology and practices.'
      ]
    }
  },
  'education': {
    title: 'Education and Learning - Innovation Project Topics for ISRC',
    content: {
      '10-14': [
        'Interactive Learning Apps: Develop a simple educational app that makes learning subjects like math or science fun and interactive for younger students.',
        'Virtual Classroom Tour: Create a virtual tour of your classroom or school that helps new students feel comfortable and familiar with the environment before they arrive.',
        'Homework Helper Bot: Design a basic chatbot that helps students with homework questions by providing hints and guidance.',
        'Digital Storytelling: Encourage creativity by developing a project where students create and share digital stories or comics on various educational topics.',
        'Peer Learning Platforms: Innovate a peer learning platform where students can help each other with homework, share notes, and collaborate on projects.',
        'Science Experiment Kits: Develop simple, hands-on science experiment kits that students can use at home to learn about basic scientific principles.',
        'Educational Board Games: Create a board game that teaches students about history, math, or science in a fun and engaging way.',
        'Reading Buddies Program: Design a reading program where older students are paired with younger students to help them improve their reading skills.',
        'Language Learning Apps: Develop an app that helps students learn a new language through games, quizzes, and interactive activities.',
        'Recycling Education Campaign: Create a project that educates students about the importance of recycling and how they can contribute to environmental sustainability.'
      ],
      '15-18': [
        'Personalized Learning Platforms: Design a personalized learning platform that adapts to individual student needs, helping them learn at their own pace.',
        'Virtual Reality in Education: Create a VR experience that takes students on virtual field trips to historical sites, museums, or scientific labs.',
        'Online Tutoring Services: Develop an online tutoring service that connects students with qualified tutors for extra help in challenging subjects.',
        'STEM Workshops: Organize STEM workshops for younger students, teaching them about coding, robotics, and other technology-related topics.',
        'Educational Podcasts: Create a series of educational podcasts on various subjects, making learning accessible and engaging for students on the go.',
        'E-Library for Schools: Develop a digital library platform that provides students with access to a wide range of books and educational resources.',
        'AI-Powered Study Aids: Innovate an AI-based study tool that helps students prepare for exams by creating customized quizzes and study plans.',
        'Mentorship Programs: Create a mentorship program that pairs high school students with professionals in their field of interest for career guidance.',
        'Flipped Classroom Models: Design a flipped classroom model where students learn new content at home and engage in interactive activities in class.',
        'Educational Video Series: Produce a series of educational videos that explain complex concepts in subjects like math, science, and history in a simplified and engaging way.'
      ],
      '19-22': [
        'Adaptive Learning Systems: Develop an adaptive learning system that uses data analytics to tailor educational content to individual learning styles and needs.',
        'Global Learning Networks: Create a platform that connects students from different countries for collaborative learning and cultural exchange projects.',
        'AI-Driven Career Guidance: Innovate an AI-powered career guidance tool that helps students choose their career paths based on their skills, interests, and job market trends.',
        'Open Educational Resources (OER): Develop a repository of free, high-quality educational resources that teachers and students can use to enhance learning.',
        'Digital Learning Communities: Create online communities where students can collaborate, share resources, and engage in discussions on various educational topics.',
        'Mobile Learning Platforms: Design a mobile learning platform that provides access to educational content anytime, anywhere, especially for students in remote areas.',
        'Virtual Labs: Develop virtual laboratory experiences that allow students to conduct scientific experiments and practice skills in a safe, simulated environment.',
        'Education for Sustainable Development: Create a curriculum or platform focused on educating students about sustainability and environmental responsibility.',
        'Blockchain in Education: Innovate a system using blockchain technology to securely manage academic records, certificates, and transcripts.',
        'Lifelong Learning Platforms: Develop a platform that encourages continuous learning by offering courses, certifications, and learning resources for individuals at any stage of life.'
      ]
    }
  },
  "energy-solutions": {
    "title": "Energy Solutions - Innovation Project Topics",
    "content": {
      "10-14": [
        "Solar-Powered Devices: Design a simple solar-powered charger for small electronic devices like phones or tablets.",
        "Energy-Efficient Lighting: Create a project that uses LED lights to build a model of a room or outdoor space with energy-efficient lighting.",
        "Wind Turbine Model: Build a small-scale wind turbine that generates electricity to power a small fan or light bulb.",
        "Recycled Energy: Develop a project that converts everyday waste materials into a source of energy, such as a mini biogas generator.",
        "Hydroelectric Power Model: Create a basic model of a hydroelectric power system using water flow to generate electricity.",
        "Energy-Saving Tips Poster: Design a poster or infographic that educates people on simple ways to save energy at home.",
        "Hand-Crank Generator: Build a hand-crank generator that produces electricity to power a small LED light.",
        "Solar Oven: Create a solar oven using reflective materials to cook simple foods using the sun’s energy.",
        "Energy-Efficient Appliances: Develop a model or concept for an energy-efficient appliance, such as a refrigerator or washing machine.",
        "Energy Conservation Game: Design a board or digital game that teaches players about energy conservation and the importance of using renewable energy sources."
      ],
      "15-18": [
        "Smart Grid Technology: Develop a concept for a smart grid that uses sensors and data analytics to optimize electricity distribution and reduce waste.",
        "Solar-Powered Water Purification: Create a project that uses solar energy to power a water purification system, providing clean water in areas with limited resources.",
        "Energy Storage Solutions: Innovate a model for energy storage systems, such as batteries or supercapacitors, that improve the efficiency of renewable energy sources.",
        "Home Energy Audit Tool: Design a tool or app that helps homeowners perform energy audits to identify areas where they can save energy and reduce costs.",
        "Bioenergy from Algae: Develop a project that uses algae to produce biofuel or bioenergy, exploring its potential as a sustainable energy source.",
        "Renewable Energy Integration: Create a system that integrates multiple renewable energy sources, such as solar, wind, and hydro, to provide a stable and reliable power supply.",
        "Energy-Efficient Building Design: Design a model or concept for an energy-efficient building that incorporates passive solar design, insulation, and other green technologies.",
        "Electric Vehicle Charging Stations: Develop a concept for a network of electric vehicle charging stations that uses renewable energy to power electric cars.",
        "Wind Farm Simulation: Create a simulation of a wind farm that analyzes factors such as wind speed, turbine placement, and energy output.",
        "Sustainable Energy Campaign: Develop a campaign to raise awareness about the benefits of renewable energy and promote sustainable energy practices in your community."
      ],
      "19-22": [
        "Advanced Solar Panels: Innovate high-efficiency solar panels using new materials or technologies to increase energy capture and conversion.",
        "Smart Energy Management Systems: Design an advanced energy management system that uses AI to optimize energy use in homes or businesses.",
        "Energy Harvesting Technologies: Develop a project that explores new methods of harvesting energy from ambient sources, such as vibrations or thermal gradients.",
        "Carbon Footprint Calculator: Create a tool or app that helps individuals and organizations calculate and reduce their carbon footprint through better energy practices.",
        "Floating Solar Farms: Develop a concept for floating solar farms that utilize water bodies to generate solar power while conserving land space.",
        "Microgrid Systems: Design a microgrid system that provides reliable and sustainable energy to small communities or facilities, integrating various renewable sources.",
        "Hydrogen Fuel Cells: Innovate a project focused on developing or improving hydrogen fuel cells as a clean energy source for transportation and power generation.",
        "Energy-Efficient Smart Homes: Create a model for a smart home that uses energy-efficient technologies and automation to reduce energy consumption and costs.",
        "Geothermal Energy Systems: Develop a project that explores the use of geothermal energy for heating and cooling systems in buildings.",
        "Energy Policy Analysis: Conduct an analysis of current energy policies and propose recommendations for promoting renewable energy and improving energy efficiency on a national or global scale."
      ]
    }
  },
  "robotics": {
    "title": "Robotics and Automation - Innovation Project Topics",
    "content": {
      "10-14": [
        "Simple Line-Following Robot: Build a basic robot that can follow a line using sensors, introducing students to the concept of automated movement.",
        "Obstacle-Avoiding Robot: Create a robot that can detect and avoid obstacles in its path, teaching the basics of sensor integration and decision-making in robotics.",
        "Robotic Arm: Design and build a simple robotic arm that can pick up and move small objects, introducing the concept of automation in manufacturing.",
        "Automated Plant Watering System: Develop a robot or automated system that waters plants based on soil moisture levels, demonstrating practical applications of automation in daily life.",
        "Toy Sorting Robot: Create a robot that can sort toys or objects by color or size, using basic programming and sensors.",
        "Remote-Controlled Robot: Build a robot that can be controlled remotely using a simple interface, teaching the basics of wireless communication and control.",
        "Dancing Robot: Design a robot that can perform a series of dance moves, introducing students to programming and motor control.",
        "Miniature Conveyor Belt System: Create a small-scale conveyor belt with an automated sorting mechanism, teaching the basics of industrial automation.",
        "Robot for Fetching Items: Build a robot that can fetch and deliver small items, demonstrating the potential for robotics in home automation.",
        "Automated Maze Solver: Design a robot that can navigate and solve a maze, introducing problem-solving skills and algorithmic thinking."
      ],
      "15-18": [
        "Robotics in Healthcare: Develop a robot that can assist in healthcare tasks, such as a medication dispenser or a robotic nurse for elderly care.",
        "Autonomous Delivery Robot: Create a robot capable of delivering packages or items within a building or campus, exploring real-world applications of robotics in logistics.",
        "Automated Agriculture System: Design a robotic system that can perform tasks like planting, watering, and harvesting crops, promoting automation in agriculture.",
        "Search and Rescue Robot: Build a robot designed for search and rescue missions, capable of navigating rough terrain and locating survivors.",
        "AI-Powered Home Assistant: Develop a robotic assistant that can interact with humans using voice commands and AI, helping with tasks like scheduling, reminders, and home automation.",
        "Robot for Hazardous Environments: Create a robot capable of operating in hazardous environments, such as handling dangerous materials or conducting inspections in unsafe areas.",
        "Swarm Robotics: Innovate a project involving multiple small robots working together to accomplish a task, exploring the concept of swarm intelligence.",
        "Robotic Prosthetics: Design a basic robotic prosthetic limb that mimics human movement, introducing students to the intersection of robotics and healthcare.",
        "Warehouse Automation: Develop a robot or robotic system that can sort and move items in a warehouse, simulating automation in logistics and inventory management.",
        "Drone for Automated Surveillance: Create a drone equipped with sensors and cameras for automated surveillance and monitoring, focusing on security applications."
      ],
      "19-22": [
        "AI-Driven Robotics: Innovate a robot that uses artificial intelligence for decision-making, enabling it to perform complex tasks autonomously.",
        "Collaborative Robots (Cobots): Design a collaborative robot that can work alongside humans in manufacturing or other industries, improving efficiency and safety.",
        "Robotics in Smart Cities: Develop a robotic system that integrates with smart city infrastructure, such as automated waste collection or traffic management.",
        "Autonomous Vehicles: Create a prototype of an autonomous vehicle, focusing on navigation, obstacle detection, and route optimization.",
        "Robotics in Disaster Response: Develop a robot capable of responding to natural disasters, such as a drone that can assess damage or a robot that can deliver supplies to isolated areas.",
        "Industrial Automation System: Design an automated manufacturing system that includes robotic arms, conveyor belts, and quality control sensors, simulating a smart factory.",
        "Medical Robotics: Innovate a robotic system that assists in surgical procedures, exploring the future of robotics in healthcare.",
        "Exoskeleton Suits: Develop an exoskeleton suit that enhances human strength and endurance, focusing on applications in rehabilitation or industrial work.",
        "Human-Robot Interaction (HRI): Create a robot that can interact naturally with humans, studying the interface and communication between robots and people.",
        "Autonomous Robotics for Space Exploration: Design a robot or robotic system capable of performing tasks in space, such as exploration, sample collection, or maintenance of satellites and spacecraft."
      ]
    }
  },
  "transport": {
    "title": "Transport and Mobility - Innovation Project Topics",
    "content": {
      "10-14": [
        "Solar-Powered Toy Car: Build a small, solar-powered toy car to introduce the concept of sustainable energy in transportation.",
        "Smart Traffic Lights: Design a model of traffic lights that change based on the flow of vehicles, teaching basic principles of traffic management.",
        "Miniature Electric Vehicle: Create a simple electric vehicle model using batteries and motors, demonstrating the basics of electric transportation.",
        "Bicycle Safety System: Develop a project focused on enhancing bicycle safety, such as an automated light or alarm system for riders.",
        "Automated School Bus Model: Build a model of a school bus that follows a preset route, introducing the idea of automated public transport.",
        "Pedestrian Crossing Robot: Design a robot that helps pedestrians cross the street safely by stopping traffic or guiding people.",
        "Eco-Friendly Transport Poster: Create a poster or campaign that promotes eco-friendly transportation options, such as biking, walking, or using electric vehicles.",
        "Traffic Flow Simulation: Develop a simulation model that demonstrates how different traffic management strategies affect vehicle flow and congestion.",
        "Bike-Powered Generator: Create a project that uses pedaling a bicycle to generate electricity, illustrating the concept of human-powered transportation.",
        "Automated Parking System: Design a small-scale automated parking system that efficiently parks toy cars or models, teaching automation in vehicle storage."
      ],
      "15-18": [
        "Electric Vehicle Charging Infrastructure: Develop a concept for an electric vehicle charging network that addresses the needs of urban and rural areas.",
        "Autonomous Delivery Drones: Create a prototype of a drone that can deliver packages autonomously, focusing on navigation and delivery efficiency.",
        "Smart Parking Solutions: Design a smart parking system that uses sensors and data to find available parking spaces and reduce congestion.",
        "Sustainable Public Transport System: Develop a model of a public transport system that uses renewable energy sources and reduces carbon emissions.",
        "Vehicle-to-Grid Technology: Innovate a system that allows electric vehicles to provide power back to the grid, enhancing energy storage and distribution.",
        "Advanced Traffic Management System: Design a traffic management system that uses real-time data to optimize traffic flow and reduce congestion.",
        "Electric Bicycle Conversion Kit: Create a kit that converts traditional bicycles into electric ones, promoting the use of sustainable transportation.",
        "Autonomous Vehicle Safety Systems: Develop a prototype of safety systems for autonomous vehicles, such as collision avoidance and emergency braking.",
        "Public Transport Optimization App: Design an app that helps users plan their public transport routes more efficiently, integrating real-time data and user preferences.",
        "Smart Mobility Hub: Create a model for a smart mobility hub that integrates various transportation modes, such as bikes, buses, and ride-sharing services."
      ],
      "19-22": [
        "Autonomous Vehicle Technology: Innovate a system for autonomous vehicles that includes advanced sensors, AI algorithms, and vehicle-to-everything (V2X) communication.",
        "Hyperloop Transportation System: Develop a concept for a high-speed Hyperloop transportation system, focusing on design, safety, and feasibility.",
        "Electric Aviation: Create a prototype or concept for electric-powered aircraft, exploring the future of sustainable aviation.",
        "Smart Infrastructure for Future Mobility: Design intelligent infrastructure that supports emerging transportation technologies, such as autonomous vehicles and smart traffic management.",
        "Urban Mobility Solutions: Develop a comprehensive plan for improving urban mobility using a combination of public transport, cycling, and pedestrian-friendly design.",
        "Autonomous Vehicle Fleet Management: Innovate a system for managing a fleet of autonomous vehicles, including scheduling, maintenance, and route optimization.",
        "Next-Generation Electric Vehicles: Design a next-generation electric vehicle with enhanced features such as extended range, faster charging, and advanced connectivity.",
        "Green Logistics: Develop a sustainable logistics system that reduces carbon emissions through optimized transportation routes and eco-friendly practices.",
        "Space Tourism Transportation: Create a concept for transportation solutions in the emerging field of space tourism, including spaceports and spacecraft design.",
        "Mobility-as-a-Service (MaaS) Platform: Design a MaaS platform that integrates various transportation services into a single user-friendly app or system."
      ]
    }
  },
  "disaster-management": {
    "title": "Disaster Management - Innovation Project Topics",
    "content": {
      "10-14": [
        "Earthquake-Resistant Building Model: Build a model of a building designed to withstand earthquakes, using materials and techniques that demonstrate basic engineering principles.",
        "Flood Warning System: Create a simple flood warning system using sensors that detect rising water levels and trigger an alarm.",
        "Fire Safety Robot: Design a small robot that can detect fire and alert people, introducing the concept of automated safety systems.",
        "Emergency Communication Device: Develop a basic device that can send distress signals in emergency situations, like a simple walkie-talkie or an emergency beacon.",
        "Tornado Shelter Model: Construct a model of a tornado shelter, showcasing design elements that protect people during severe storms.",
        "First Aid Kit for Natural Disasters: Create a comprehensive first aid kit tailored for different types of natural disasters, teaching preparedness.",
        "Landslide Detection System: Design a basic system that can detect early signs of a landslide, using soil moisture sensors and alarms.",
        "Community Evacuation Plan: Develop a simple, illustrated evacuation plan for your community, showing safe routes and gathering points.",
        "Disaster Relief Drone: Build a model of a drone that can deliver essential supplies like food and medicine to areas affected by disasters.",
        "Rescue Boat Model: Design a small, automated rescue boat that can navigate floodwaters and carry supplies or rescue stranded individuals."
      ],
      "15-18": [
        "Early Earthquake Detection System: Develop a project that focuses on detecting early tremors and providing warnings before a major earthquake occurs.",
        "Flood Barrier Design: Create a model of a flood barrier system that can be deployed quickly to protect urban areas from rising waters.",
        "Disaster-Resilient Housing: Design a concept for disaster-resilient housing that can withstand hurricanes, floods, or earthquakes, using sustainable materials.",
        "Wildfire Detection and Prevention System: Innovate a system that uses sensors and drones to detect wildfires early and deploy fire retardants to prevent spread.",
        "Smart Emergency Response App: Develop an app that helps coordinate emergency responses during disasters, providing real-time updates and resource management.",
        "Rescue Robot for Collapsed Buildings: Design a robot capable of navigating through debris in collapsed buildings to locate and assist trapped victims.",
        "Portable Water Purification System: Create a portable water purification system that can be quickly deployed in disaster-hit areas to provide safe drinking water.",
        "Community-Based Disaster Alert Network: Develop a community-based network that uses social media, text messages, and local volunteers to alert residents during emergencies.",
        "Disaster Simulation Game: Create an educational simulation game that teaches players how to respond to different disaster scenarios, promoting preparedness.",
        "Automated Tsunami Warning System: Design an automated system that monitors seismic activity and ocean levels to provide early warnings for tsunamis."
      ],
      "19-22": [
        "AI-Powered Disaster Prediction System: Innovate an AI system that predicts natural disasters by analyzing environmental data, providing early warnings and risk assessments.",
        "Advanced Search and Rescue Drones: Develop drones equipped with thermal imaging and AI to locate survivors in disaster-hit areas, even in challenging environments.",
        "Smart Disaster Relief Logistics: Create a logistics platform that uses AI and real-time data to optimize the distribution of relief supplies during disasters.",
        "Climate-Resilient Infrastructure: Design infrastructure projects that can withstand extreme weather conditions, focusing on bridges, roads, and buildings in vulnerable regions.",
        "Disaster Management Command Center: Develop a concept for a centralized command center that integrates data from various sources to coordinate disaster response efforts.",
        "Mobile Emergency Medical Unit: Innovate a mobile unit that can provide essential medical services in disaster zones, including telemedicine capabilities.",
        "Sustainable Rebuilding After Disasters: Create a plan for rebuilding communities after disasters using sustainable practices and materials, ensuring long-term resilience.",
        "Blockchain for Disaster Relief: Develop a blockchain-based system for managing donations, distributing aid, and ensuring transparency in disaster relief efforts.",
        "Real-Time Disaster Mapping Tool: Design a tool that creates real-time maps of disaster-affected areas, using satellite imagery and crowd-sourced data to guide rescue operations.",
        "Disaster-Resilient Energy Solutions: Innovate energy solutions, such as solar-powered microgrids, that can provide reliable power during and after disasters."
      ]
    }
  }
};

const InnovationTopics: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ProjectSuggestion | null>(null);

  const handleShow = (topicId: string) => {
    setModalContent(suggestions[topicId] || null);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const formatListItem = (item: string) => {
    const [title, ...rest] = item.split(':');
    return `<strong>${title}:</strong> ${rest.join(':')}`;
  };

  return (
    <>
      <Head>
        <style>{`
          .card-hover {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .card-hover:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
          .card-hover .card-img-top {
            height: 200px;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
          }
          h2 {
            color: #FF2D55;
            font-weight: 700;
            text-align: center;
            margin-bottom: 30px;
          }
          .card-title {
            font-weight: 600;
          }
          .container {
            margin-top: 50px;
          }
          .outer-card {
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease-in-out;
          }
          .outer-card:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
          .modal-content ul li {
            margin-bottom: 10px;
          }
          .modal-content ul li strong {
            font-weight: bold;
          }
        `}</style>
      </Head>
      <div className="container my-5">
        <div className="row">
          <h2 className='text-center'>Approved Innovation Themes</h2>
          <div className="col-md-12">
            <div className="card outer-card shadow-sm">
              <div className="card-body">
                <div className="row">
                  {innovationTopics.map((topic, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card shadow-sm h-100 card-hover" onClick={() => handleShow(topic.id)}>
                      <Image src={topic.imageUrl} className="card-img-top" alt={topic.title} width={300} height={200} />
                        <div className="card-body">
                          <h5 className="card-title">{topic.title}</h5>
                          <p className="card-text">{topic.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent?.content ? (
            Object.entries(modalContent.content).map(([ageGroup, projects]) => (
              <div key={ageGroup}>
                <h5>{`Age Group ${ageGroup}`}</h5>
                <ul>
                  {projects.map((project, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: formatListItem(project) }} />
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No suggestions available for this topic.</p>
          )}
          <p>These are just suggestions; you can create a project with your own idea as well.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InnovationTopics;