'use client'
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { isLoggedIn } from '../services/auth.service';
export default function GroovyInvoiceApp() {
    useEffect(() => {
        if (!isLoggedIn('user')) {
            redirect('/login')
        } else {
            redirect('/dashboard');
        }
    });

    return (<></>)
}