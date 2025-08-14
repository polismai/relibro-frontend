import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Necesitás ayuda?</h2>
        <p className="text-gray-600 mb-8">
          Estamos acá para responder tus dudas y ayudarte en lo que necesites.
          Elegí el medio de contacto que prefieras.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="mailto:contacto@tudominio.com"
            className="flex items-center justify-center gap-3 bg-white shadow-md px-6 py-4 rounded-lg hover:shadow-lg transition"
          >
            <FaEnvelope className="text-blue-600 text-2xl" />
            <span className="text-lg font-medium">Enviar correo</span>
          </a>

          <a
            href="https://wa.me/59892566652?text=Hola!%20Tengo%20una%20consulta..."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 text-white shadow-md px-6 py-4 rounded-lg hover:bg-green-600 transition"
          >
            <FaWhatsapp className="text-2xl" />
            <span className="text-lg font-medium">WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
