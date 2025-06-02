import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TravelBuddy</h3>
            <p className="text-gray-300 text-sm">
              Find your perfect travel destination based on your age group and budget.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/plan" className="text-gray-300 hover:text-white transition-colors">
                  Plan Trip
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Age Groups</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations?ageGroup=STUDENT" className="text-gray-300 hover:text-white transition-colors">
                  Student (18-25)
                </Link>
              </li>
              <li>
                <Link to="/destinations?ageGroup=ADULT" className="text-gray-300 hover:text-white transition-colors">
                  Adult (26-40)
                </Link>
              </li>
              <li>
                <Link to="/destinations?ageGroup=MIDDLE_AGED" className="text-gray-300 hover:text-white transition-colors">
                  Middle-aged (41-60)
                </Link>
              </li>
              <li>
                <Link to="/destinations?ageGroup=SENIOR" className="text-gray-300 hover:text-white transition-colors">
                  Senior (61-75)
                </Link>
              </li>
              <li>
                <Link to="/destinations?ageGroup=RETIREE" className="text-gray-300 hover:text-white transition-colors">
                  Retiree (76+)
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">
              Email: info@travelbuddy.com
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} TravelBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 