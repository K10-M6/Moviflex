document.addEventListener('DOMContentLoaded', function() {
    // Credenciales válidas (mismo correo para todos)
    const validEmail = "usuario@moviflex.com";
    const validPassword = "123";

    // Login Form
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            if (email === validEmail && password === validPassword) {
                switch(role) {
                    case 'admin':
                        window.location.href = 'admin.html';
                        break;
                    case 'conductor':
                        window.location.href = 'conductor.html';
                        break;
                    case 'cliente':
                        window.location.href = 'cliente.html';
                        break;
                    default:
                        showToast('Error', 'Selecciona un tipo de usuario válido', 'danger');
                }
            } else {
                showToast('Error', 'Credenciales incorrectas', 'danger');
            }
        });
    }
// Función para cambiar entre secciones
        function showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(sectionId)?.classList.remove('d-none');
            
    // Actualizar navegación activa
        document.querySelectorAll('[data-section]').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
        });
    }

    // Eventos de navegación
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
        });
    });

    // Eventos de la sección de vehículos
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const placa = btn.dataset.placa || '';
        const userId = btn.dataset.userId || '';

        switch(action) {
            case 'view-docs':
                viewDocuments(placa);
                break;
            case 'approve-vehicle':
                approveVehicle(placa);
                break;
            case 'reject-vehicle':
                rejectVehicle(placa);
                break;
            case 'edit-role':
                editUserRole(userId);
                break;
        }
    });

    // Funciones específicas
    function viewDocuments(placa) {
        document.getElementById('modalPlaca').textContent = placa;
        const modal = new bootstrap.Modal(document.getElementById('documentsModal'));
        modal.show();
    }

    function approveVehicle(placa) {
        if (confirm(`¿Aprobar vehículo ${placa}?`)) {
            alert(`Vehículo ${placa} aprobado correctamente`);
            // Aquí iría la lógica para actualizar la interfaz
        }
    }

    function rejectVehicle(placa) {
        const reason = prompt('Ingrese el motivo del rechazo:');
        if (reason) {
            alert(`Vehículo ${placa} rechazado: ${reason}`);
            // Aquí iría la lógica para actualizar la interfaz
        }
    }

    function editUserRole(userId) {
         // Simulamos datos del usuario (en una app real esto vendría de una API)
        document.getElementById('userName').value = `Usuario ${userId}`;
        document.getElementById('currentRole').value = 'Cliente';
            
        const modal = new bootstrap.Modal(document.getElementById('roleModal'));
        modal.show();
    }

    // Guardar nuevo rol
    document.getElementById('saveRole').addEventListener('click', () => {
        const newRole = document.getElementById('newRole').value;
        alert(`Rol cambiado a: ${newRole}`);
        const modal = bootstrap.Modal.getInstance(document.getElementById('roleModal'));
        modal.hide();
    });

    // Aprobar documentos
    document.getElementById('approveDocs').addEventListener('click', () => {
        const comments = document.getElementById('docComments').value;
        alert(`Documentos aprobados con comentarios: ${comments}`);
        const modal = bootstrap.Modal.getInstance(document.getElementById('documentsModal'));
        modal.hide();
    });

    // Enviar recomendación de ruta
    document.getElementById('sendRecommendation').addEventListener('click', () => {
        const driver = document.getElementById('driverSelect').value;
        const route = document.getElementById('alternativeRoute').value;
        const comments = document.getElementById('routeComments').value;
            
        alert(`Recomendación enviada a ${driver}:\nNueva ruta: ${route}\nComentarios: ${comments}`);
     });

    // Inicialización
    showSection('dashboard');
    document.getElementById('totalUsers').textContent = '42';
    document.getElementById('totalVehicles').textContent = '28';
    document.getElementById('pendingApprovals').textContent = '5';
    // Conductor Page
    if (document.getElementById('vehicleForm')) {
        document.getElementById('vehicleForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Vehículo registrado', 'Documentos en revisión', 'success');
        });
    }

    // Cliente Page
    if (document.getElementById('findDrivers')) {
        document.getElementById('findDrivers').addEventListener('click', function() {
            document.getElementById('driversList').classList.remove('d-none');
            showToast('Conductores encontrados', '3 conductores disponibles', 'success');
        });
    }
});

// Funciones auxiliares
function showToast(title, message, type) {
    const toast = document.createElement('div');
    toast.className = `toast show align-items-center text-white bg-${type}`;
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${title}: ${message}</div>
            <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    const container = document.getElementById('toastContainer') || createToastContainer();
    container.appendChild(toast);
    
    setTimeout(() => toast.remove(), 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '20px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(sectionId)?.classList.remove('d-none');
}

// Registrar nuevo usuario (añadir al final del archivo)
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userType = document.getElementById('userType').value;
        showToast('Registro exitoso', `Te has registrado como ${userType}`, 'success');
        setTimeout(() => {
            window.location.href = userType === 'conductor' ? 'conductor.html' : 'cliente.html';
        }, 2000);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // ==================== FUNCIONALIDAD GENERAL ====================
    
    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Función para mostrar notificaciones
    function showToast(title, message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = 'toast-' + Date.now();
        
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast show align-items-center text-white bg-${type}`;
        toast.role = 'alert';
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <strong>${title}</strong><br>${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Eliminar el toast después de 5 segundos
        setTimeout(() => {
            const toastElement = document.getElementById(toastId);
            if (toastElement) {
                toastElement.remove();
            }
        }, 5000);
    }

    // ==================== FUNCIONALIDAD PARA CLIENTES ====================
    if (document.getElementById('tripForm')) {
        // 1. Geolocalización
        document.getElementById('currentLocation').addEventListener('click', function() {
            const btn = this;
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Detectando...
            `;
            btn.disabled = true;
            
            // Simulación de geolocalización
            setTimeout(() => {
                document.getElementById('origin').value = "Ubicación actual detectada";
                btn.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
                btn.disabled = false;
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                }, 2000);
            }, 1500);
        });

        // 2. Cálculo de ruta
        document.getElementById('tripForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const calculateBtn = document.getElementById('calculateRoute');
            calculateBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Calculando...
            `;
            calculateBtn.disabled = true;
            
            // Simular cálculo de ruta
            setTimeout(() => {
                const ratePerKm = parseFloat(document.getElementById('ratePerKm').value);
                const minRate = parseFloat(document.getElementById('minRate').value);
                const distance = (Math.random() * 10 + 5).toFixed(1); // Distancia aleatoria entre 5-15 km
                let totalCost = ratePerKm * distance;
                
                // Aplicar tarifa mínima
                if (totalCost < minRate) {
                    totalCost = minRate;
                }
                
                // Mostrar resultados
                document.getElementById('distance').textContent = distance;
                document.getElementById('baseRate').textContent = ratePerKm.toLocaleString();
                document.getElementById('totalCost').textContent = totalCost.toLocaleString();
                document.getElementById('routeResult').classList.remove('d-none');
                
                // Restaurar botón
                calculateBtn.innerHTML = `
                    <i class="bi bi-lightning-charge-fill me-2"></i>
                    Calcular Viaje
                `;
                calculateBtn.disabled = false;
                
                // Scroll a resultados
                document.getElementById('routeResult').scrollIntoView({ behavior: 'smooth' });
                
                showToast('Ruta calculada', `Distancia: ${distance} km - Costo: $${totalCost.toLocaleString()}`, 'success');
            }, 2000);
        });

        // 3. Confirmación de viaje
        document.getElementById('confirmTrip').addEventListener('click', function() {
            const confirmBtn = this;
            confirmBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Buscando conductores...
            `;
            confirmBtn.disabled = true;
            
            // Simular búsqueda de conductores
            setTimeout(() => {
                document.getElementById('driversList').classList.remove('d-none');
                confirmBtn.innerHTML = `
                    <i class="bi bi-check-circle me-2"></i>
                    Confirmar
                `;
                confirmBtn.disabled = false;
                
                // Scroll a lista de conductores
                document.getElementById('driversList').scrollIntoView({ behavior: 'smooth' });
                
                showToast('Viaje confirmado', 'Buscando conductores disponibles...', 'info');
            }, 1500);
        });

        // 4. Selección de conductor
        document.addEventListener('click', function(e) {
            if (e.target.closest('.select-driver')) {
                const driverBtn = e.target.closest('.select-driver');
                const driverId = driverBtn.dataset.driverId;
                const driverName = driverBtn.closest('.driver-card').querySelector('h5').textContent;
                
                driverBtn.innerHTML = `
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Contactando...
                `;
                driverBtn.disabled = true;
                
                // Simular confirmación del conductor
                setTimeout(() => {
                    showToast('Conductor encontrado', `${driverName} ha aceptado tu solicitud`, 'success');
                    
                    // Simular viaje completado después de 8 segundos
                    setTimeout(() => {
                        const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
                        document.getElementById('driverName').textContent = driverName;
                        ratingModal.show();
                    }, 8000);
                }, 3000);
            }
        });

        // 5. Sistema de calificación
        const ratingStars = document.querySelectorAll('#interactiveRating i');
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                document.getElementById('selectedRating').value = value;
                
                // Actualizar visualización de estrellas
                ratingStars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.remove('bi-star');
                        s.classList.add('bi-star-fill');
                    } else {
                        s.classList.remove('bi-star-fill');
                        s.classList.add('bi-star');
                    }
                });
            });
            
            // Efecto hover
            star.addEventListener('mouseover', function() {
                const hoverValue = parseInt(this.dataset.value);
                ratingStars.forEach((s, index) => {
                    if (index < hoverValue) {
                        s.classList.add('text-warning');
                    } else {
                        s.classList.remove('text-warning');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                const currentValue = parseInt(document.getElementById('selectedRating').value);
                ratingStars.forEach((s, index) => {
                    if (index >= currentValue) {
                        s.classList.remove('text-warning');
                    }
                });
            });
        });

        // Enviar calificación
        document.getElementById('submitRating').addEventListener('click', function() {
            const rating = document.getElementById('selectedRating').value;
            const comment = document.getElementById('comment').value;
            
            if (rating > 0) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('ratingModal'));
                modal.hide();
                
                showToast('Gracias', `Has calificado con ${rating} estrellas`, 'success');
                
                // Resetear formulario
                document.getElementById('selectedRating').value = 0;
                document.getElementById('comment').value = '';
                ratingStars.forEach(star => {
                    star.classList.remove('bi-star-fill');
                    star.classList.add('bi-star');
                });
            } else {
                showToast('Error', 'Por favor selecciona una calificación', 'danger');
            }
        });
    }

    // ==================== NOTIFICACIONES PROGRAMADAS ====================
    // Simular notificación de recordatorio
    setTimeout(() => {
        showToast('Recordatorio', 'Tu viaje está programado para dentro de 1 hora', 'info');
    }, 10000); // 10 segundos después de cargar la página para demo
});
function initMapSystem() {
    // Elementos del DOM
    const mapElement = document.getElementById('routeMap');
    const originInput = document.getElementById('originInput');
    const destinationInput = document.getElementById('destinationInput');
    const findDriversBtn = document.getElementById('findDriversBtn');
    const clearRouteBtn = document.getElementById('clearRouteBtn');
    const currentLocationBtn = document.getElementById('currentLocationBtn');
    const driversPanel = document.getElementById('driversPanel');
    const driversList = document.getElementById('driversList');
    const closeDriversPanel = document.getElementById('closeDriversPanel');

    // Estado del mapa
    const mapState = {
        origin: null,
        destination: null,
        route: null,
        drivers: []
    };

    // Inicializar mapa simulado
    function renderMap() {
        mapElement.innerHTML = `
            <div style="height:100%; background:#e9ecef; display:flex; justify-content:center; align-items:center;">
                <div class="text-center text-muted">
                    <i class="bi bi-map" style="font-size:3rem;"></i>
                    <p class="mt-2">Selecciona origen y destino</p>
                    <p class="small">Haz clic en el mapa para elegir</p>
                </div>
            </div>
        `;
    }

    // Mostrar ruta simulada
    function showRoute() {
        mapElement.innerHTML = `
            <div style="height:100%; background:#e9ecef; position:relative;">
                <!-- Ruta simulada -->
                <div style="position:absolute; top:50%; left:20%; width:60%; height:4px; background:#0d6efd; transform:translateY(-50%);"></div>
                
                <!-- Marcadores -->
                <div style="position:absolute; top:50%; left:20%; width:12px; height:12px; background:#0d6efd; border-radius:50%; transform:translate(-50%, -50%);"></div>
                <div style="position:absolute; top:50%; left:80%; width:12px; height:12px; background:#dc3545; border-radius:50%; transform:translate(-50%, -50%);"></div>
                
                <!-- Conductores simulados -->
                <div style="position:absolute; top:45%; left:40%; width:10px; height:10px; background:#198754; border-radius:50%; transform:translate(-50%, -50%);"></div>
                <div style="position:absolute; top:55%; left:60%; width:10px; height:10px; background:#198754; border-radius:50%; transform:translate(-50%, -50%);"></div>
                
                <!-- Etiquetas -->
                <div style="position:absolute; top:30%; left:20%;">
                    <span class="badge bg-primary">Origen</span>
                </div>
                <div style="position:absolute; top:30%; left:80%;">
                    <span class="badge bg-danger">Destino</span>
                </div>
            </div>
        `;
    }

    // Cargar conductores simulados
    function loadDrivers() {
        mapState.drivers = [
            {
                id: 1,
                name: "Juan Pérez",
                rating: 4.5,
                distance: "0.8 km",
                car: "Toyota Corolla - ABC123",
                eta: "3 min"
            },
            {
                id: 2,
                name: "María Gómez",
                rating: 4.8,
                distance: "1.2 km",
                car: "Hyundai Tucson - XYZ789",
                eta: "5 min"
            }
        ];

        renderDriversList();
        showNotification("Conductores encontrados", "Hemos encontrado 2 conductores en tu ruta", "success");
    }

    // Renderizar lista de conductores
    function renderDriversList() {
        driversList.innerHTML = mapState.drivers.map(driver => `
            <div class="list-group-item driver-item" data-driver-id="${driver.id}">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${driver.name}</h6>
                        <small class="text-muted">${driver.car}</small>
                        <div class="mt-2 d-flex align-items-center">
                            <span class="badge bg-primary me-2">${driver.distance}</span>
                            <span class="badge bg-secondary me-2">Llega en ${driver.eta}</span>
                            <span class="text-warning small">
                                <i class="bi bi-star-fill"></i> ${driver.rating}
                            </span>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-primary select-driver">
                        <i class="bi bi-check-lg"></i> Elegir
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Event Listeners
    mapElement.addEventListener('click', function() {
        if (!mapState.origin) {
            mapState.origin = "Ubicación seleccionada";
            originInput.value = mapState.origin;
            showNotification("Origen establecido", "Ahora selecciona tu destino", "info");
        } else if (!mapState.destination) {
            mapState.destination = "Destino seleccionado";
            destinationInput.value = mapState.destination;
            findDriversBtn.disabled = false;
            showNotification("Ruta configurada", "Haz clic en buscar conductores", "success");
        }
    });

    currentLocationBtn.addEventListener('click', function() {
        const btn = this;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        
        setTimeout(() => {
            mapState.origin = "Mi ubicación actual";
            originInput.value = mapState.origin;
            btn.innerHTML = '<i class="bi bi-geo-alt-fill"></i>';
            showNotification("Ubicación detectada", "Se ha establecido tu ubicación actual", "success");
            
            setTimeout(() => {
                btn.innerHTML = '<i class="bi bi-geo-alt"></i>';
            }, 2000);
        }, 1000);
    });

    findDriversBtn.addEventListener('click', function() {
        const btn = this;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Buscando...';
        btn.disabled = true;
        
        setTimeout(() => {
            showRoute();
            loadDrivers();
            driversPanel.classList.remove('d-none');
            clearRouteBtn.classList.remove('d-none');
            btn.innerHTML = '<i class="bi bi-search me-2"></i>Buscar conductores';
        }, 1500);
    });

    clearRouteBtn.addEventListener('click', function() {
        mapState.origin = null;
        mapState.destination = null;
        mapState.route = null;
        originInput.value = '';
        destinationInput.value = '';
        findDriversBtn.disabled = true;
        driversPanel.classList.add('d-none');
        this.classList.add('d-none');
        renderMap();
        showNotification("Ruta limpiada", "Puedes seleccionar una nueva ruta", "info");
    });

    closeDriversPanel.addEventListener('click', function() {
        driversPanel.classList.add('d-none');
    });

    // Delegación de eventos para conductores
    document.addEventListener('click', function(e) {
        if (e.target.closest('.select-driver')) {
            const driverId = e.target.closest('.driver-item').dataset.driverId;
            const driver = mapState.drivers.find(d => d.id == driverId);
            
            showNotification("Conductor seleccionado", `${driver.name} está en camino`, "success");
            
            // Simular notificación de llegada
            setTimeout(() => {
                showNotification("¡Tu conductor ha llegado!", `${driver.name} te espera`, "info", 10000);
            }, 5000);
        }
    });

    // Inicializar
    renderMap();
}

// ==================== SISTEMA DE NOTIFICACIONES ====================
function showNotification(title, message, type = "info", duration = 5000) {
    const container = document.getElementById('notificationsContainer');
    const notificationId = 'notif-' + Date.now();
    
    const notification = document.createElement('div');
    notification.id = notificationId;
    notification.className = `toast show align-items-center text-white bg-${type}`;
    notification.role = "alert";
    notification.setAttribute('aria-live', "assertive");
    notification.setAttribute('aria-atomic', "true");
    notification.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <strong>${title}</strong><br>${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Eliminar después de la duración
    setTimeout(() => {
        const toast = document.getElementById(notificationId);
        if (toast) {
            toast.remove();
        }
    }, duration);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initMapSystem();
    
    // Notificación de bienvenida
    setTimeout(() => {
        showNotification("Bienvenido a Moviflex", "Selecciona tu ruta para comenzar", "info");
    }, 1000);
});