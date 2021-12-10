import React, { useEffect, useState } from 'react';

function addBlog(blog) {
    validateBlog(blog);
    const precessedBlog = processBlog(blog);

    const defaultBlog = {
        subtitle: '',
        urlTitle: '',
        description: '',
        displayDateMonth: 0,
        displayDateDay: 22,
        displayDateYear: 2023,
        displayDateHour: 16,
        displayDateMinute: 123,
        allowPingbacks: true,
        allowTrackbacks: true,
        trackbacks: null,
        coverImageCaption: '',
        '-coverImageImageSelector': '',
        '-smallImageImageSelector': '',
    };

    return Liferay.Service('/blogs.blogsentry/add-entry', {
        ...defaultBlog,
        ...precessedBlog,
    });
}

function validateBlog({ title, content }) {
    if (!title) {
        throw new Error('no-title');
    }
    if (!content) {
        throw new Error('no-content');
    }
}

function processBlog(blog) {
    const processedDisplayDateMonth = blog.displayDateMonth - 1;
    return { ...blog, displayDateMonth: processedDisplayDateMonth };
}

/**
 *
 * Execute the migration,
 * while showing its progress
 *
 * @param {*} param0
 * @returns
 */
export default function MigrationPanel({ blogs, toggleMigrate }) {
    const [currBlogIndex, setCurrBlogIndex] = useState(0);

    useEffect(() => {
        if (currBlogIndex < blogs.length) {
            const currBlog = blogs[currBlogIndex];
            addBlog(currBlog)
                .then(() => setCurrBlogIndex(currBlogIndex + 1))
                .catch(console.error); // TODO: handle this error
        } else {
            setCurrBlogIndex(0);
            toggleMigrate();
            alert(`migrated ${blogs.length} blogs`); // TODO: i18n
        }
    }, [currBlogIndex]);
    // TODO: implement loader
    return (
        <div>
            migrating {currBlogIndex + 1}/{blogs.length}
        </div>
    );
}
