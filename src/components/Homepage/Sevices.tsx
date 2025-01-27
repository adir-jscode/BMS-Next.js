import ServiceCard from '../Cards/ServiceCard';

export default function Sevices() {
    const services = [
        {
          _id: "1",
          title: "Account Management",
          img: "/assets/images/account-management.jpg",
          description:
            "Efficient account management solutions that help your employees manage customer accounts seamlessly, automate daily tasks, and improve productivity within your organization. A system designed to optimize account processes and ensure smooth operations.",
        },
        {
          _id: "2",
          title: "Transaction Monitoring",
          img: "/assets/images/transaction.jpg",
          description:
            "Real-time transaction tracking and reporting for secure banking. Our system provides an easy way to monitor all banking transactions, identify suspicious activities, and generate detailed reports to ensure compliance with regulatory standards and secure operations.",
        },
        {
          _id: "3",
          title: "Customer Support Portal",
          img: "/assets/images/support.jpg",
          description:
            "A seamless platform for managing customer inquiries and services. With this service, your employees can efficiently handle customer queries, manage service requests, and maintain high customer satisfaction by providing timely responses and solutions.",
        },
      ];
      
  return (
    <div className="container mx-auto my-20 px-4 py-8">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Our Banking Services
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  </div>
  )
}
