import React from 'react';
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';

// http://localhost:8080/api/jsonws?contextName=blogs&signature=%2Fblogs.blogsentry%2Fadd-entry-16-java.lang.String-java.lang.String-java.lang.String-java.lang.String-int-int-int-int-int-boolean-boolean-%5BLjava.lang.String%3B-java.lang.String-com.liferay.portal.kernel.servlet.taglib.ui.ImageSelector-com.liferay.portal.kernel.servlet.taglib.ui.ImageSelector-com.liferay.portal.kernel.service.ServiceContext
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
