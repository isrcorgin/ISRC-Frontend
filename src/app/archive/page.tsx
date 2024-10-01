import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Image from 'next/image'; // Import Image component for optimized images

const events = [
  {
    id: 1,
    image: "/images/event-image-1.jpg",
    heading: "CAREER SESSION ",
    description: "This is a brief description of event 1. It should provide enough details to entice users to register.",
    link: "/register/event-1" // Unique link for each event
  },
  {
    id: 2,
    image: "/images/event-image-2.jpg",
    heading: "Innovative Engineer Award.",
    description: "This is a brief description of event 2. It should provide enough details to entice users to register.",
    link: "/register/event-2"
  },
  {
    id: 3,
    image: "/images/event-image-3.jpg",
    heading: "Event Heading 3",
    description: "This is a brief description of event 3. It should provide enough details to entice users to register.",
    link: "/register/event-3"
  },
];

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Privacy Policy"
        shortText=""
        homePageUrl="/"
        homePageText="Home"
        activePageText="Archive"
        bgImg="/images/main-bg2.webp"
      />

      {/* Event Cards */}
      <div className="container my-5">
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card text-center shadow-lg border-0">
                <div style={{ width: '300px', height: '300px', overflow: 'hidden', margin: '0 auto' }}>
                  <Image
                    src={event.image} // Use the image from the event object
                    alt={`Event ${event.id}`}
                    width={300} // Set width
                    height={300} // Set height
                    className="card-img-top"
                    style={{ objectFit: 'cover' }} // Ensures the image covers the container
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{event.heading}</h5>
                  <p className="card-text text-muted">
                    {event.description}
                  </p>
                  <a
                    href={event.link} // Use the link from the event object
                    className="btn btn-primary"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
