/**
 * ==========================================================================
 * Daro Tec - Lógica de Interacción & Lightbox para Imágenes 3:4
 * ==========================================================================
 */

// Teléfono configurado con código de país para Perú (+51)
const TELEFONO_WHATSAPP = "51946914724"; 

document.addEventListener("DOMContentLoaded", () => {
  // Asegura que todos los botones dirijan al número oficial
  actualizarEnlacesWhatsApp();

  // Inicializar Lightbox para ver imágenes 3:4 en pantalla completa
  configurarLightbox();
});

/**
 * Garantiza que todos los enlaces wa.me usen el número +51 946914724
 */
function actualizarEnlacesWhatsApp() {
  const wspLinks = document.querySelectorAll('a[href*="wa.me"]');
  wspLinks.forEach(link => {
    try {
      const url = new URL(link.href);
      const mensaje = url.searchParams.get("text") || "Hola, deseo cotizar un proyecto con Daro Tec";
      link.href = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    } catch (e) {
      link.href = `https://wa.me/${TELEFONO_WHATSAPP}`;
    }
  });
}

/**
 * Abre las imágenes en pantalla completa al hacer clic en ellas
 */
function configurarLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");
  const imagenesExpandibles = document.querySelectorAll(".expandible-3-4");

  if (!modal || !modalImg) return;

  imagenesExpandibles.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt || "Proyecto Daro Tec";
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Desactivar scroll
    });
  });

  const cerrarModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Reactivar scroll
  };

  if (closeBtn) closeBtn.addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === closeBtn) cerrarModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      cerrarModal();
    }
  });
}
