"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

const EventSchedulesThree: React.FC = () => {
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const [pdfSrc, setPdfSrc] = useState<string>('');

  // Handle showing the PDF
  const handleShowPdf = (pdfUrl: string) => {
    setPdfSrc(pdfUrl);
    setShowPdf(true);
  };

  const handleClose = () => {
    setShowPdf(false);
    setPdfSrc('');
  };

  return (
    <>
      <div className="schedule-area schedule-style-three bg-image ptb-120">
        <div className="container">
          <div className="section-title">
            <span>Schedule Plan</span>
            <h2>
              Information of <b>Event</b> <br /> Schedules
            </h2>

            <div className="bg-title">Events</div>

            <Link href="/team-register/" className="btn btn-primary">
              Register Now!
            </Link>

            <div className="bar"></div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="single-schedule-item">
                <div className="schedule-date">
                Age Group: 10-14 years
                  <span>Primary</span>
                </div>

                <div className="schedule-item-wrapper">
                  <div className="schedule-content">
                    <div className="event-images">
                      <Image
                        src="/img/topic/boat.jpg"
                        alt="Schedules"
                        width={2000}
                        height={300}
                        style={{ borderRadius: "10px" }}
                      />
                    </div>

                    <div className="schedule-info">
                      <h3>
                        <Link href="#">Water Boat</Link>
                        <p
                          onClick={() => handleShowPdf('/rules/water boat rules and regulation.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                        </p>
                      </h3>
                      <ul>
                        <li>
                        
                          In the <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc6rXu3DPpz90pBybxZboch1">Water Boat</Link> competition, teams design and build boats to navigate through water, focusing on buoyancy, propulsion, and stability. Key factors include ensuring the boat floats correctly, moves efficiently, and remains balanced. Successful designs effectively integrate these elements to perform well in the competition. Teams test and refine their boats to achieve optimal performance. Creativity and engineering skills are crucial for success in this challenging event.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="schedule-item-wrapper">
                    <div className="schedule-content">
                      <div className="event-images">
                        <Image
                          src="/img/topic/path2.jpg"
                          alt="Schedules"
                          width={1400}
                          height={300}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>

                      <div className="schedule-info">
                        <h3>
                          <Link href="#">Robo Track</Link>
                          <p
                          onClick={() => handleShowPdf('/rules/path following rules and regulation.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                        </p>
                        </h3>
                        <ul>
                          <li>
                            In this activity, young participants build simple robots that navigate a set <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc6rXu3DPpz90pBybxZboch1">path</Link> using light or touch sensors. This engaging project introduces children to basic robotics concepts. It fosters problem-solving skills as they design and program their robots. The hands-on experience helps develop critical thinking and creativity. Overall, it's a fun and educational way to explore robotics.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center">
              <div className="single-schedule-item">
                <div className="schedule-date">
                  Age Group: 15-18 years
                  <span>Secondary</span>
                </div>

                <div className="schedule-item-wrapper">
                  <div className="schedule-content">
                    <div className="event-images">
                      <Image
                        src="/img/topic/maze.png"
                        alt="Schedules"
                        width={1000}
                        height={300}
                        style={{ borderRadius: "10px" }}
                      />
                    </div>

                    <div className="schedule-info">
                      <h3>
                        <Link href="#">Maze Solver</Link>
                        <p
                          onClick={() => handleShowPdf('/rules/maze solver rules and regulations.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                        </p>
                      </h3>

                      <ul>
                        <li>
                          In the <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc6dzvxFR32H4Fw3-S1w4u5Y">Maze Solver</Link> competition, participants develop robots capable of finding their way through a maze. The challenge includes navigating complex pathways and overcoming obstacles to reach the end of the maze efficiently.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="schedule-item-wrapper">
                    <div className="schedule-content">
                      <div className="event-images">
                        <Image
                          src="/img/topic/path2.webp"
                          alt="Schedules"
                          width={1100}
                          height={300}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>

                      <div className="schedule-info">
                        <h3>
                          <Link href="#">Robo Track</Link>
                          <p
                          onClick={() => handleShowPdf('/rules/path following rules and regulation.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                        </p>
                        </h3>
                        <ul>
                          <li>
                            Participants build <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc6dzvxFR32H4Fw3-S1w4u5Y">Robots</Link> to navigate a specific route using advanced sensors like infrared or ultrasonic. They fine-tune their robots for higher accuracy with more complex programming. This challenge enhances their understanding of robotics principles.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-item-wrapper">
                    <div className="schedule-content">
                      <div className="event-images">
                        <Image
                          src="/img/topic/boat2.jpg"
                          alt="Schedules"
                          width={1100}
                          height={300}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>

                      <div className="schedule-info">
                        <h3>
                          <Link href="#">Water Boat</Link>
                          <p
                          onClick={() => handleShowPdf('/rules/water boat rules and regulation.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                        </p>
                        </h3>
                        <ul>
                          <li>
                          The <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc6dzvxFR32H4Fw3-S1w4u5Y">Water Boat</Link> Competition tasks teams with designing and building a sophisticated boat that excels in water navigation. Participants must master advanced concepts of buoyancy, propulsion, and stability to create a high-performing watercraft.

                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center">
              <div className="single-schedule-item">
                <div className="schedule-date">
                  Age Group: 19-22 years
                  <span>Higher Secondary</span>
                </div>

                <div className="schedule-item-wrapper">
                  <div className="schedule-content">
                    <div className="event-images">
                      <Image
                        src="/img/topic/line.jpg"
                        alt="Schedules"
                        width={1000}
                        height={400}
                        style={{ borderRadius: "10px" }}
                      />
                    </div>

                    <div className="schedule-info">
                      <h3>
                        <Link href="#">Line Following</Link>
                        <p
                          onClick={() => handleShowPdf('/rules/LINE FOLLOWING RULES AND REGULATION (1).pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                        </p>
                      </h3>
                      <ul>
                        <li>
                          The <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc5mfUbENSQysyDNvN-MwXpw">Line Following</Link> competition requires robots to follow a line on the ground. The robot must stay on the track and navigate turns, demonstrating its ability to respond to changes in the environment.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="schedule-item-wrapper">
                    <div className="schedule-content">
                      <div className="event-images">
                        <Image
                          src="/img/topic/drone.webp"
                          alt="Schedules"
                          width={1200}
                          height={300}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>

                      <div className="schedule-info">
                        <h3>
                          <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc5mfUbENSQysyDNvN-MwXpw">Drone</Link>
                          <p
                          onClick={() => handleShowPdf('/rules/drone rules and regulation.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                        </p>
                        </h3>

                        <ul>
                          <li>
                            In the <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc5mfUbENSQysyDNvN-MwXpw">Drone</Link> competition, participants design and fly drones to complete various tasks and challenges. The competition tests skills in aerodynamics, control, and programming as drones navigate through obstacles and perform specific maneuvers.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="schedule-item-wrapper">
                      <div className="schedule-content">
                        <div className="event-images">
                          <Image
                            src="/img/topic/path3.avif"
                            alt="Schedules"
                            width={1200}
                            height={300}
                            style={{ borderRadius: "10px" }}
                          />
                        </div>

                        <div className="schedule-info">
                          <h3>
                            <Link href="#">Robo Track</Link>
                            <p
                          onClick={() => handleShowPdf('/rules/path following rules and regulation.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                          </p>
                          </h3>

                          <ul>
                            <li>
                              Participants engineer sophisticated robots to follow intricate <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc5mfUbENSQysyDNvN-MwXpw">path</Link> using cutting-edge sensors like LIDAR and advanced algorithms like PID control. This competition allows them to apply theoretical knowledge in practical scenarios. It pushes the boundaries of their technical skills.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="schedule-item-wrapper">
                      <div className="schedule-content">
                        <div className="event-images">
                          <Image
                            src="/img/topic/maze3.jpg"
                            alt="Schedules"
                            width={1200}
                            height={300}
                            style={{ borderRadius: "10px" }}
                          />
                        </div>

                        <div className="schedule-info">
                          <h3>
                            <Link href="#">Maze Solver</Link>
                            <p
                          onClick={() => handleShowPdf('/rules/maze solver rules and regulations.pdf')}
                          style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                        >
                          Rules & Regulations
                          </p>
                          </h3>

                          <ul>
                            <li>
                              Participants engineer sophisticated robots to follow intricate <Link href="https://www.youtube.com/playlist?list=PLjVmoFTyLUc5mfUbENSQysyDNvN-MwXpw">path</Link> using cutting-edge sensors like LIDAR and advanced algorithms like PID control. This competition allows them to apply theoretical knowledge in practical scenarios. It pushes the boundaries of their technical skills.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shape Images */}
          <div className="shape1">
            <Image
              src="/images/shapes/1.png"
              alt="shape1"
              width={77}
              height={77}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="shape2 rotateme">
            <Image
              src="/images/shapes/2.png"
              alt="shape2"
              width={38}
              height={38}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="shape3 rotateme">
            <Image
              src="/images/shapes/3.png"
              alt="shape3"
              width={51}
              height={57}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="shape4">
            <Image
              src="/images/shapes/4.png"
              alt="shape4"
              width={29}
              height={29}
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for PDF */}
      <Modal show={showPdf} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>PDF Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed
            src={pdfSrc}
            type="application/pdf"
            width="100%"
            height="800px"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventSchedulesThree;
