import React, { ReactNode } from 'react';

interface BannerinoProps {
    title?: string;
    children?: ReactNode;
}

const Bannerino = ({title, children}: BannerinoProps) => (
    <h2>
        {title} {children}
    </h2>
);

export default Bannerino;
