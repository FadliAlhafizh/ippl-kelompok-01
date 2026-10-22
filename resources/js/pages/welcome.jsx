import React from 'react';

export default function Welcome({ title }) {
    return (
        <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
            <h1>{title}</h1>
            <p>Berhasil setup Inertia.js dengan React di Laravel!</p>
        </div>
    );
}