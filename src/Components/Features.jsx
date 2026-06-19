import { FaShippingFast, FaHandHoldingUsd, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const Features = () => {
  const allFeatures = [
    {
      id: 1,
      icon: <FaShippingFast className="text-4xl text-indigo-600" />,
      title: "Fast Shipping",
      description: "Express delivery to all regions in record time."
    },
    {
      id: 2,
      icon: <FaHandHoldingUsd className="text-4xl text-indigo-600" />,
      title: "Cash on Delivery",
      description: "Inspect your product before payment to ensure quality."
    },
    {
      id: 3,
      icon: <FaHeadset className="text-4xl text-indigo-600" />,
      title: "24/7 Support",
      description: "Our team is available around the clock to assist you."
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-4xl text-indigo-600" />,
      title: "Secure Guarantee",
      description: "Flexible return policy and full buyer protection."
    }
  ];

  return (
    <section className="py-10 bg-blue-50 min-h-[400px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-indigo-500 mb-8 text-center">
          Features
        </h2>     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allFeatures.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 p-3 bg-indigo-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;