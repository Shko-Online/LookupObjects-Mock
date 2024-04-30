import { MetadataDB, ShkoOnline } from '@shko.online/componentframework-mock';
import React, { useState } from 'react';
import SelectedEntityFilter from './SelectedEntityFilter';

function MultiEntityFilter({
    entityTypes,
    db,
    results,
    searchByEntityRecords,
}: {
    entityTypes: string[];
    db: MetadataDB;
    results: ComponentFramework.LookupValue[];
    searchByEntityRecords: (entity?: string) => void;
}) {
    const [selectedEntity, setSelectedEntity] = useState<ShkoOnline.EntityMetadata>();
    return selectedEntity == null ? (
        <div className="so.m-1 so.rounded so.bg-zinc-50 so.h-8 " role="presentation">
            <div className="so.flex so.flex-row so.items-center" role="presentation">
                <div
                    className="so.pl-2 so.text-sm so.text-center so.text-neutral-800 so.cursor-default"
                    role="presentation"
                >
                    {`Results from: `}
                </div>
                <ul className="so.flex so.flex-wrap so.overflow-hidden">
                    {entityTypes.map((value) => {
                        const metadata = db.getTableMetadata(value);
                        return (
                            <li key={value}>
                                <button
                                    className="so.flex so.text-xs so.py-1 so.px-2 so.m-1 so.leading-4 so.border so.border-neutral-300 disabled:so.border-opacity-30 so.border-solid so.rounded so.bg-white disabled:so.bg-zinc-100 disabled:so.bg-opacity-30 so.text-neutral-800 disabled:so.text-stone-950 disabled:so.text-opacity-50 so.cursor-pointer"
                                    disabled={results?.filter((i) => i.entityType === value).length === 0}
                                    onClick={() => {
                                        setSelectedEntity(metadata), searchByEntityRecords(value);
                                    }}
                                    role="button"
                                    type="button"
                                >
                                    <span>{metadata.DisplayName || metadata.LogicalName}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    ) : (
        <SelectedEntityFilter
            OnAllClick={() => {
                searchByEntityRecords(), setSelectedEntity(null);
            }}
            entity={selectedEntity}
        />
    );
}

export default MultiEntityFilter;
