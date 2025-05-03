
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-wedding-cream py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-playfair text-3xl md:text-4xl mb-4">J & E</h2>
        
        <p className="text-gray-700 mb-6">
          Gracias por ser parte de nuestra historia de amor.
        </p>
        
        <div className="text-sm text-gray-500">
          &copy; {currentYear} | Con amor, los novios
        </div>
      </div>
    </footer>
  );
};

export default Footer;
