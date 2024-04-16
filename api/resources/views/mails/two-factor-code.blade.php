@component('mail::message')
# Código de Autenticación de Dos Factores

Tu código de autenticación de dos factores es: **{{ $code }}**

Este código es válido por un tiempo limitado.

Gracias,<br>
{{ config('app.name') }}
@endcomponent
