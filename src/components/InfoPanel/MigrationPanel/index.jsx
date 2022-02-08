import React, { useEffect, useState } from 'react';
import ClayProgressBar from '@clayui/progress-bar';
import { format } from '../../../utils';

function addBlog(blog) {
    const siteId = Liferay.ThemeDisplay.getSiteGroupId();
    const apiPath = `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`;

    return fetch(apiPath, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'x-csrf-token': Liferay.authToken,
        },
        body: JSON.stringify(blog),
    });
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

    async function handleAddBlogResponse(response) {
        if (response.ok) {
            setCurrBlogIndex(currBlogIndex + 1);
        } else {
            response.json().then(json => {
                // toast the error message and stop the migration;
                // ask the user if it should resume
                console.error(json);
            });
            // const errorMessage = await response.json();
            // console.error(errorMessage);
        }
    }

    useEffect(() => {
        if (currBlogIndex < blogs.length) {
            const currBlog = blogs[currBlogIndex];
            addBlog(currBlog).then(handleAddBlogResponse);
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
