/* eslint-disable sonarjs/no-nested-template-literals */
import React, { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import { MetadataDB } from '@shko.online/componentframework-mock';
import './LookupCss.css';
import SingleEntityFilter from './SingleEntityFilter';
import MultiEntityFilter from './MultiEntityFilter';
import Header from './Header';

interface ILookupComponentProps {
    unmount: () => void;
    resolve: (value: ComponentFramework.LookupValue[] | PromiseLike<ComponentFramework.LookupValue[]>) => void;
    lookupOptions: ComponentFramework.UtilityApi.LookupOptions;
    db: MetadataDB;
}

function LookupComponent({ unmount, resolve, lookupOptions, db }: ILookupComponentProps) {
    const [results, setResults] = useState<ComponentFramework.LookupValue[]>(null);
    const [selected, setSelected] = useState<ComponentFramework.LookupValue>(null);
    const inpuRef = useRef<HTMLInputElement>();
    const onCloseClick = useCallback(() => {
        console.log('unmount?');
        unmount();
        resolve([]);
    }, [resolve, unmount]);

    const searchRecords = useCallback(
        (search?: string) => {
            const result: ComponentFramework.LookupValue[] = [];
            lookupOptions.entityTypes.forEach((value) => {
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
            setResults(result);
        },
        [db, lookupOptions.entityTypes],
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
            setResults(result);
        },
        [db, lookupOptions.entityTypes],
    );

    const onKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.charCode === 13) {
                const search = (e.target as HTMLInputElement).value;
                searchRecords(search);
            }
        },
        [searchRecords],
    );

    const OnSearchClick = useCallback(() => {
        const search = inpuRef.current.value;
        searchRecords(search);
    }, [searchRecords]);

    const onSelect = useCallback((lookup: ComponentFramework.LookupValue) => {
        setSelected(lookup);
        setResults(null);
    }, []);

    const onUnSelect = useCallback(() => {
        setSelected(null);
        if (inpuRef?.current?.value) inpuRef.current.value = '';
    }, []);
    const OnDeleteRecord = useCallback(() => {
        resolve([selected]);
        onUnSelect();
        unmount();
    }, [onUnSelect, resolve, selected, unmount]);

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
                                                <div
                                                    className="so.flex so.w-full so.p-1 so.pl-2 so.border-b-2 so.border-b-transparent focus-within:so.border-b-blue-700"
                                                    role="presentation"
                                                >
                                                    <input
                                                        aria-autocomplete="list"
                                                        aria-label="Select record, Lookup"
                                                        autoComplete="off"
                                                        className="so.flex-1 so.bg-transparent so.outline-none active:so.border-transparent"
                                                        onKeyPress={onKeyPress}
                                                        placeholder={lookForRecords}
                                                        ref={inpuRef}
                                                        role="searchbox"
                                                        title="Select to enter data"
                                                        type="text"
                                                    />
                                                    <button
                                                        aria-label="Search records for Select record, Lookup field"
                                                        className="so.justify-center so.align-middle so.p-1 so.text-neutral-700 hover:so.text-blue-700"
                                                        onClick={OnSearchClick}
                                                        title="Search"
                                                        type="button"
                                                    >
                                                        <svg
                                                            className="so.fill-current so.w-4 so.h-4"
                                                            height="14"
                                                            viewBox="0 -0.5 21 21"
                                                            width="14"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="m5.94 12.929 1.485 1.414L1.485 20 0 18.586zM13.65 12C10.755 12 8.4 9.757 8.4 7s2.355-5 5.25-5 5.25 2.243 5.25 5-2.355 5-5.25 5m0-12C9.59 0 6.3 3.134 6.3 7s3.29 7 7.35 7S21 10.866 21 7s-3.29-7-7.35-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                            {selected != null && (
                                                <div
                                                    className="so.flex so.w-full so.p-1 so.pl-2 so.border-b-2 so.border-b-transparent focus-within:so.border-b-blue-700"
                                                    role="presentation"
                                                >
                                                    <ul className="so.flex so.flex-1 so.overflow-hidden so.flex-row so.relative so.outline-none">
                                                        <li className="so.flex so.flex-row so.flex-nowrap so.mx-1 so.h-6 so.rounded so.items-center so.max-w-full so.text-sky-800 so.bg-sky-100 hover hover:so.bg-blue-200">
                                                            <div className="so.justify-center so.flex so.text-sm so.items-center so.px-1">
                                                                <img className="so.h-5 so.w-5" src="./favicon.ico" />
                                                            </div>
                                                            <div
                                                                className="so.px-1 so.cursor-pointer so.text-sky-800 underline so.leading-5 block so.truncate"
                                                                role="presentation"
                                                            >
                                                                {selected?.name}
                                                            </div>
                                                            <button
                                                                className="so.px-2 so.flex so.text-inherit so.rounded so.bg-transparent so.items-center"
                                                                onClick={onUnSelect}
                                                                role="button"
                                                                type="button"
                                                            >
                                                                <span className="so.text-xs">
                                                                    <svg
                                                                        className="so.fill-sky-800 so.w-3 so.h-3"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path d="m4.4 4.55.07-.08a.75.75 0 0 1 .98-.07l.08.07L12 10.94l6.47-6.47a.75.75 0 1 1 1.06 1.06L13.06 12l6.47 6.47c.27.27.3.68.07.98l-.07.08a.75.75 0 0 1-.98.07l-.08-.07L12 13.06l-6.47 6.47a.75.75 0 0 1-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 0 1-.07-.98l.07-.08-.07.08Z" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
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
                    <div className="so.flex so.flex-grow-0 so.flex-shrink-0 so.basis-0 so.pr-2 so.gap-x-2 so.mt-2 so.mb-5 so.self-end so.justify-end so.align-middle so.items-center">
                        <div className="so.flex so.w-full so.outline-none" role="presentation">
                            <button
                                className="so.text-sm so.text-white so.border-transparent so.bg-sky-700 so.rounded so.px-3 so.py-1 so.items-center so.box-border so.inline-flex so.justify-center so.no-underline so.align-middle so.overflow-hidden so.min-w-24 so.duration-100 so.transition-[background,border,color] so.ease-in"
                                onClick={() => OnDeleteRecord()}
                                title="Add"
                                type="button"
                            >
                                Add
                            </button>
                        </div>
                        <div className="so.flex so.w-full so.outline-none" role="presentation">
                            <button
                                className="so.text-sm so.text-neutral-800 so.border-[1px] so.border-neutral-500 so.bg-white so.rounded so.px-3 so.py-1 so.items-center so.box-border so.inline-flex so.justify-center so.no-underline so.align-middle so.overflow-hidden so.min-w-24 so.duration-100 so.transition-[background,border,color] so.ease-in"
                                onClick={onCloseClick}
                                title="Cancel"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LookupComponent;
