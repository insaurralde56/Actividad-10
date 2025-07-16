function showStatus(message, type = 'success') {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.textContent = message;
    statusDiv.className = `status-message status-${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

async function generateReport() {
    const { jsPDF } = window.jspdf;
    
    // Obtener valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const project = document.getElementById("project").value;
    
    // Validar campos requeridos
    if (!name || !email) {
        alert('Por favor complete los campos obligatorios');
        return;
    }
    
    // Crear nuevo documento PDF
    const doc = new jsPDF();
    
    // Configurar colores y fuentes
    doc.setTextColor(60, 60, 60);
    
    // Título principal
    doc.setFontSize(20);
    doc.text("📋 REPORTE DE USUARIO", 20, 25);
    
    // Línea decorativa
    doc.setDrawColor(102, 126, 234);
    doc.line(20, 30, 190, 30);
    
    // Información del usuario
    doc.setFontSize(12);
    doc.text("Información Personal:", 20, 45);
    
    doc.setFontSize(11);
    doc.text(`👤 Nombre: ${name}`, 25, 55);
    doc.text(`📧 Email: ${email}`, 25, 65);
    
    if (phone) {
        doc.text(`📱 Teléfono: ${phone}`, 25, 75);
    }
    
    if (project) {
        doc.text(`💼 Proyecto: ${project}`, 25, phone ? 85 : 75);
    }
    
    // Fecha de generación
    const currentDate = new Date().toLocaleDateString('es-ES');
    doc.setFontSize(10);
    doc.text(`📅 Fecha de generación: ${currentDate}`, 20, phone || project ? 105 : 95);
    
    // Generar y mostrar PDF
    const pdfDataUri = doc.output("datauristring");
    document.getElementById("reportContainer").innerHTML = 
        `<iframe width="100%" height="500px" src="${pdfDataUri}"></iframe>`;
    
    // Mostrar mensaje de éxito
    showStatus('✅ Reporte PDF generado exitosamente!');
}