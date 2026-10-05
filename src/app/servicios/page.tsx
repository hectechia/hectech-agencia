import { redirect } from 'next/navigation';

export default function ServiciosIndex() {
  // Redirigir directamente a la sección de servicios en la página principal
  redirect('/#servicios');
}
