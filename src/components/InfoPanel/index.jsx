import React from 'react';
import { format } from '../../utils';
import MigrationPanel from './MigrationPanel/index';

/**
 *
 * Handle all the migration
 *
 * @param {*} param0
 * @returns
 */
export default function InfoPanel({ blogs, migrate, toggleMigrate }) {
    return (
        <div>
            {!blogs.length ? (
                Liferay.Language.get('no-blogs-loaded')
            ) : (
                <React.Fragment>
                    {format(
                        Liferay.Language.get('loaded-blogs-number'),
                        blogs.length
                    )}
                    {migrate && (
                        <MigrationPanel
                            blogs={blogs}
                            toggleMigrate={toggleMigrate}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
}
