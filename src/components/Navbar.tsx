import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'font-bold text-primary' : 'text-gray-600 hover:text-primary';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">TravelBuddy</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>
              Home
            </Link>
            <Link to="/destinations" className={`${isActive('/destinations')} transition-colors`}>
              Destinations
            </Link>
            <Link to="/plan" className={`${isActive('/plan')} transition-colors`}>
              Plan Trip
            </Link>
            <Link 
              to="/destinations" 
              className="btn btn-primary"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 