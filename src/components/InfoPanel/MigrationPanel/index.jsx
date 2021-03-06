import React, { useEffect, useState } from 'react';
import ClayProgressBar from '@clayui/progress-bar';
import { format } from '../../../utils';

function addBlog(blog) {
    // handle this error
    validateBlog(blog);

    const today = new Date();
    const defaultBlog = {
        subtitle: '',
        urlTitle: '',
        description: '',
        displayDateMonth: today.getMonth(),
        displayDateDay: today.getDate(),
        displayDateYear: today.getFullYear(),
        displayDateHour: today.getHours(),
        displayDateMinute: today.getMinutes(),
        allowPingbacks: true,
        allowTrackbacks: true,
        trackbacks: null,
        coverImageCaption: '',
        '-coverImageImageSelector': '',
        '-smallImageImageSelector': '',
    };
    const blogsWithDefaults = {
        ...defaultBlog,
        ...blog,
    };
    return Liferay.Service('/blogs.blogsentry/add-entry', blogsWithDefaults);
}

function validateBlog({ title, content }) {
    if (!title) {
        throw new Error('no-title');
    }
    if (!content) {
        throw new Error('no-content');
    }
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
            alert(format(Liferay.Language.get('migrated'), blogs.length));
        }
    }, [currBlogIndex]);
    // TODO: implement loader

    const progessPercentage = Math.round((currBlogIndex / blogs.length) * 100);
    return (
        <div>
            <ClayProgressBar value={progessPercentage}>
                {`${progessPercentage}%`}
            </ClayProgressBar>
            <br />
            <br />
            {format(
                Liferay.Language.get('migrating'),
                currBlogIndex + 1,
                blogs.length
            )}
        </div>
    );
}
