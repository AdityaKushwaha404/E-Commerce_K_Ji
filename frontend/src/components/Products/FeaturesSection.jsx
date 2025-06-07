import { HiShoppingBag, HiRefresh, HiShieldCheck } from "react-icons/hi";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <HiShoppingBag className="text-3xl text-black" />
          </div>
          <h4 className="text-lg font-semibold mb-2 tracking-tight">
            FREE INTERNATIONAL SHIPPING
          </h4>
          <p className="text-gray-600 text-sm tracking-tight">
            On all orders over $100.00
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <HiRefresh className="text-3xl text-black" />
          </div>
          <h4 className="text-lg font-semibold mb-2 tracking-tight">
            EASY RETURNS
          </h4>
          <p className="text-gray-600 text-sm tracking-tight">
            Hassle-free returns within 30 days
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <HiShieldCheck className="text-3xl text-black" />
          </div>
          <h4 className="text-lg font-semibold mb-2 tracking-tight">
            SECURE PAYMENT
          </h4>
          <p className="text-gray-600 text-sm tracking-tight">
            Your payment information is safe with us
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
