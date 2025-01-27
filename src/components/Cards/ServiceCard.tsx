import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define the interface for the service object
interface Service {
  _id: string;
  title: string;
  img: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { title, img, description, _id } = service;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <figure className="h-[30vh] overflow-hidden">
        <Image
          height={240}
          width={640}
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <Link href={`/services/${_id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
