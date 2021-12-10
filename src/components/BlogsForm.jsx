import React from 'react';
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';

/**
 *
 * Gets blogs from user input and
 * starts migration
 *
 * @param {*} param0
 * @returns
 */
export default function BlogImporter({ setBlogs, toggleMigrate }) {
    function onSubmit(e) {
        e.preventDefault();
        toggleMigrate();
    }

    function onChangeFile({ target }) {
        // TODO: validate file mime
        // TODO: accept multiple files
        // TODO: validate blogs fields (use ts?)
        const file = target.files[0];
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            const blogsList = JSON.parse(reader.result).blogs;
            setBlogs(blogsList);
        };

        // TODO: improve error handling
        reader.onerror = () => {
            console.error(reader.error);
        };
    }

    return (
        <ClayForm onSubmit={onSubmit}>
            <label htmlFor="blogs">{Liferay.Language.get('blogs')}</label>
            <ClayInput
                id="blogs"
                accept="application/JSON"
                type="file"
                onChange={onChangeFile}
                required
            />
            <ClayButton type="submit" displayType="primary">
                {Liferay.Language.get('execute')}
            </ClayButton>
        </ClayForm>
    );
}
