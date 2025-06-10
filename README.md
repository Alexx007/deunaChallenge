# Live coding Challenge: Nelson Rodriguez QA#


#Descripción del Proyecto#
El objetivo principal fue construir desde cero un framework de automatización de pruebas E2E utilizando buenas prácticas, patrones de diseño (como Page Object Model), validaciones de red (network requests), y configuración de CI

#Flujo Automatizado#
Cree dos test dentro del archivo 'liveCodingChallenge.spec' uno que solo es e2e y otro con validaciones para las respuestas de la api
-Búsqueda de producto

-Agregado al carrito

-Validación en carrito

-Simulación de pago

-Validación de pago exitoso

#Requisitos para ejecutar#
Node.js
npm
npm install -g typescript
npx playwright test

Codigo para ejecutar: npx playwright test tests/e2e/liveCodingChallenge.spec.ts --project=chromium  
