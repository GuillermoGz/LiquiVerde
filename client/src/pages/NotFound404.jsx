import React from 'react'
import { Link } from "react-router-dom";

const NotFound404 = () => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-neutral-900">

            <h1 className="text-7xl font-extrabold text-green-600 dark:text-green-400">404</h1>

            <p className="mt-4 text-lg font-medium text-neutral-800 dark:text-neutral-200">
                Página no encontrada
            </p>

            <Link
                to="/"
                className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition"
            >
                Volver al inicio
            </Link>
        </main>
    );
}

export default NotFound404