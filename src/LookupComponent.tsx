/* eslint-disable sonarjs/no-nested-template-literals */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MetadataDB } from '@shko.online/componentframework-mock';
import './LookupCss.css';
import SingleEntityFilter from './SingleEntityFilter';
import MultiEntityFilter from './MultiEntityFilter';
import Header from './Header';
import Footer from './Footer';

import SelectedRecord from './SelectedRecord';
import SearchLookup from './SearchLookup';

interface ILookupComponentProps {
    unmount: () => void;
    resolve: (value: ComponentFramework.LookupValue[] | PromiseLike<ComponentFramework.LookupValue[]>) => void;
    lookupOptions: ComponentFramework.UtilityApi.LookupOptions;
    db: MetadataDB;
}

function LookupComponent({ unmount, resolve, lookupOptions, db }: ILookupComponentProps) {
    const { allowMultiSelect, entityTypes } = lookupOptions;
    const [results, setResults] = useState<ComponentFramework.LookupValue[]>(null);
    const [selected, setSelected] = useState<ComponentFramework.LookupValue[]>(null);
    const selectedIds = useMemo(() => selected?.map((i) => i.id) || [], [selected]);
    const inpuRef = useRef<HTMLInputElement>();
    const onCloseClick = useCallback(() => {
        console.log('unmount?');
        unmount();
        resolve([]);
    }, [resolve, unmount]);

    const searchRecords = useCallback(
        (search?: string) => {
            const result: ComponentFramework.LookupValue[] = [];
            entityTypes.forEach((value) => {
                const metadata = db.getTableMetadata(value);

                const select = `SELECT ${metadata.PrimaryIdAttribute}, ${metadata.PrimaryNameAttribute}
                                FROM ${metadata.LogicalName}
                                ${search ? `WHERE ${metadata.PrimaryNameAttribute || 'name'} LIKE '%${search}%'` : ''}`;

                const res = (db.db.exec(select) as unknown[]).map(
                    (v) =>
                        ({
                            entityType: value,
                            id: v[metadata.PrimaryIdAttribute],
                            name: v[metadata.PrimaryNameAttribute],
                        }) as ComponentFramework.LookupValue,
                );
                result.push(...res);
            });

            console.log('Result', result);
            setResults(result.filter((i) => !selectedIds.includes(i.id)));
        },
        [db, entityTypes, selectedIds],
    );

    const searchByEntityRecords = useCallback(
        (entity?: string) => {
            const search = inpuRef?.current?.value;
            const result: ComponentFramework.LookupValue[] = [];
            console.log(entity);
            lookupOptions.entityTypes.forEach((value) => {
                if (entity && value !== entity) {
                    return;
                }
                const metadata = db.getTableMetadata(value);

                const select = `SELECT ${metadata.PrimaryIdAttribute}, ${metadata.PrimaryNameAttribute}
                                FROM ${metadata.LogicalName}
                                ${search ? `WHERE ${metadata.PrimaryNameAttribute || 'name'} LIKE '%${search}%'` : ''}`;

                const res = (db.db.exec(select) as unknown[]).map(
                    (v) =>
                        ({
                            entityType: value,
                            id: v[metadata.PrimaryIdAttribute],
                            name: v[metadata.PrimaryNameAttribute],
                        }) as ComponentFramework.LookupValue,
                );
                result.push(...res);
            });

            console.log('Result', result);
            setResults(result.filter((i) => !selectedIds?.includes(i.id)));
        },
        [db, lookupOptions.entityTypes, selectedIds],
    );

    const OnSearchClick = useCallback(() => {
        const search = inpuRef.current.value;
        searchRecords(search);
    }, [searchRecords]);

    const onSelect = useCallback(
        (lookup: ComponentFramework.LookupValue) => {
            if (allowMultiSelect) {
                setSelected((prev) => {
                    return prev ? [...prev, lookup] : [lookup];
                });
                setResults((prev) => {
                    return prev.filter((i) => i.id !== lookup.id);
                });
            } else {
                setSelected([lookup]);
                setResults(null);
            }
        },
        [allowMultiSelect],
    );

    const onUnSelect = useCallback(
        (lookup: ComponentFramework.LookupValue) => {
            setSelected((prev) => {
                const state = prev.filter((item) => item.id !== lookup.id);
                return state.length === 0 ? null : state;
            });
            if (allowMultiSelect) setResults((prev) => [...prev, lookup]);
            if (inpuRef?.current?.value) inpuRef.current.value = '';
        },
        [allowMultiSelect],
    );

    const onAddClick = useCallback(() => {
        resolve(selected);
        setSelected(null);
        unmount();
    }, [resolve, selected, unmount]);

    const lookForRecords = useMemo(() => {
        if (lookupOptions.entityTypes.length > 1) {
            return 'Look for records';
        }
        const metadata = db.getTableMetadata(lookupOptions.entityTypes[0]);
        return 'Look for ' + (metadata?.DisplayCollectionName || metadata?.DisplayName || metadata?.LogicalName);
    }, [db, lookupOptions.entityTypes]);

    const entityTypesFilter = useMemo(() => {
        const metadata = db.getTableMetadata(lookupOptions.entityTypes[0]);
        // return 'Look for ' + (metadata.DisplayCollectionName || metadata.DisplayName || metadata.LogicalName);
        return lookupOptions.entityTypes.length === 1 ? (
            <SingleEntityFilter entity={metadata?.DisplayName || metadata?.LogicalName} />
        ) : (
            <MultiEntityFilter
                db={db}
                entityTypes={lookupOptions.entityTypes}
                results={results}
                searchByEntityRecords={searchByEntityRecords}
            />
        );
    }, [db, lookupOptions.entityTypes, results, searchByEntityRecords]);

    return (
        <div className="so.fixed so.top-0 so.bottom-0 so.right-0 so.left-0 so.z-50 so.w-full so.bg-opacity-30 so.bg-black so.flex so.justify-end">
            <div className="so.flex so.flex-col so.h-full so.box-border so.bg-white so.border-solid so.border-2 so.border-transparent so.overflow-auto so.flex-nowrap so.w-[400px] so.content-start so.outline-none so.text-neutral-800 so.font-sans so.font-normal so.antialiased so.visible">
                <section className="so.flex so.flex-col so.flex-1">
                    <Header onCloseClick={onCloseClick} />
                    <div
                        className="so.flex so.overflow-visible so.mb-6 so.mx-2 so.mt-4 so.justify-between so.h-full so.flex-col"
                        role="presentation"
                    >
                        <div className="so.flex so.w-full" role="presentation">
                            <div className="so.max-w-full so.flex-1 so.flex" role="presentation">
                                <div
                                    className="so.flex so.flex-col so.w-full so.border so.border-zinc-100 so.border-solid"
                                    role="presentation"
                                >
                                    <div className="so.flex so.w-full" role="presentation">
                                        <div className="so.rounded so.w-full so.bg-gray-100" role="presentation">
                                            <div aria-atomic="true" role="status"></div>
                                            {selected === null && (
                                                <SearchLookup
                                                    inputRef={inpuRef}
                                                    lookForRecords={lookForRecords}
                                                    onSearchClick={OnSearchClick}
                                                    searchRecords={searchRecords}
                                                />
                                            )}
                                            {selected != null && (
                                                <SelectedRecord
                                                    allowMultiSelect={allowMultiSelect}
                                                    inputRef={inpuRef}
                                                    onSearchClick={OnSearchClick}
                                                    onUnSelect={onUnSelect}
                                                    searchRecords={searchRecords}
                                                    selected={selected}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="so.w-full so.flex so.flex-1 so.flex-col" role="presentation">
                                        {results === null && (
                                            <span className="so.p-2 so.text-sm so.leading-8 so.cursor-default so.text-neutral-800">
                                                Type to search or press Enter to browse
                                            </span>
                                        )}
                                        {results?.length === 0 && (
                                            <span className="so.p-2 so.text-sm so.leading-8 so.cursor-default so.text-neutral-800">
                                                No records found. Create a new record.
                                            </span>
                                        )}
                                        {results?.length > 0 && entityTypesFilter}
                                        {results?.length > 0 && (
                                            <ul className="so.flex-1 so.flex-col so.scroll-auto">
                                                {results.map((r) => (
                                                    <li className="so.flex" key={r.id}>
                                                        <button
                                                            className="so.flex so.flex-1  so.gap-x-1 so.min-h-12 so.items-center so.overflow-hidden so.rounded hover:so.bg-gray-200"
                                                            key={r.id}
                                                            onClick={() => onSelect(r)}
                                                        >
                                                            <div className="so.justify-start so.flex so.text-sm so.items-center so.px-1">
                                                                <img
                                                                    className="so.h-6 so.w-6"
                                                                    src="./favicon.ico"
                                                                ></img>
                                                            </div>
                                                            <div className="so.flex-1 so.truncate so.text-start">
                                                                {r.name}
                                                            </div>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer onAddClick={onAddClick} onCloseClick={onCloseClick} />
                </section>
            </div>
        </div>
    );
}

export default LookupComponent;
