import React from 'react';
import MigrationPanel from './MigrationPanel';

export default function InfoPanel({ blogs, migrate, toggleMigrate }) {
    return (
        <div>
            {!blogs.length ? (
                'no blogs loaded'
            ) : (
                <React.Fragment>
                    Number of blogs loaded: {blogs.length}
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
