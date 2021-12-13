import React, { useState } from 'react';

import BlogsForm from './components/BlogsForm/index';
import InfoPanel from './components/InfoPanel/index';

/**
 *
 * Imports Blogs from user input
 *
 * @returns
 */
export default function BlogImporter() {
    const [blogs, setBlogs] = useState([]);
    const [migrate, setMigrate] = useState(false);

    function toggleMigrate() {
        setMigrate(!migrate);
    }

    return (
        <div>
            <BlogsForm setBlogs={setBlogs} toggleMigrate={toggleMigrate} />
            <InfoPanel
                blogs={blogs}
                migrate={migrate}
                toggleMigrate={toggleMigrate}
            />
        </div>
    );
}
