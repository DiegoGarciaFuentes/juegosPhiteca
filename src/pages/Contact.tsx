import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#cae4db]">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-2 border-[#7a9e96]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                  <Logo variant="primary" size="md" />
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-[#00303f] hover:text-[#ffb41e] transition-colors font-medium">
                ← Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#00303f] mb-4">📞 Contacto</h1>
          <p className="text-xl text-[#00303f]">
            ¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!
          </p>
        </div>

        <div className="bg-white/95 rounded-xl p-8 shadow-lg border-2 border-[#7a9e96]">
          <h2 className="text-2xl font-bold text-[#00303f] mb-6">Información de contacto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-[#00303f] mb-4">📧 Email</h3>
              <p className="text-[#00303f] mb-4">
                Para consultas generales o sugerencias sobre los juegos:
              </p>
              <a 
                href="mailto:info@phiteca.es" 
                className="text-[#ffb41e] hover:text-[#bd7e00] font-semibold transition-colors"
              >
                info@phiteca.es
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#00303f] mb-4">🐙 GitHub</h3>
              <p className="text-[#00303f] mb-4">
                El código fuente está disponible en GitHub:
              </p>
              <a 
                href="https://github.com/DiegoGarciaFuentes/juegosPhiteca" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffb41e] hover:text-[#bd7e00] font-semibold transition-colors"
              >
                Ver repositorio
              </a>
            </div>
          </div>

          <div className="border-t border-[#7a9e96] pt-8">
            <h3 className="text-xl font-semibold text-[#00303f] mb-4">💡 Sugerencias</h3>
            <p className="text-[#00303f] mb-4">
              ¿Tienes ideas para nuevos juegos o mejoras? ¡Estamos abiertos a sugerencias! 
              Puedes contactarnos a través de cualquiera de los medios mencionados arriba.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/games" 
              className="bg-[#ffb41e] hover:bg-[#bd7e00] text-[#00303f] font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
            >
              Explorar Juegos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
