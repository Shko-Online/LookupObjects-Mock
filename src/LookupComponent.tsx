import React, { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import './LookupCss.css';
import { MetadataDB } from '@shko.online/componentframework-mock';

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
    const onCloseClick = useCallback(
        (e: React.MouseEvent) => {
            console.log('unmount?');
            unmount();
            resolve([]);
        },
        [unmount],
    );

    const searchRecords = useCallback(
        (search: string) => {
            var metadata = db.getTableMetadata(lookupOptions.entityTypes[0]);
            const select = `SELECT 
        ${metadata.PrimaryIdAttribute}, 
        ${metadata.PrimaryNameAttribute}
    FROM ${metadata.LogicalName}
    ${search ? `WHERE ${metadata.PrimaryNameAttribute || 'name'} LIKE '%${search}%'` : ''}`;

            const result = (db.db.exec(select) as any[]).map(
                (v) =>
                    ({
                        entityType: lookupOptions.entityTypes[0],
                        id: v[metadata.PrimaryIdAttribute],
                        name: v[metadata.PrimaryNameAttribute],
                    }) as ComponentFramework.LookupValue,
            );
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
        [db, lookupOptions.entityTypes],
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
    const OnDeleteRecord = useCallback(
        (id: string) => {
            var metadata = db.getTableMetadata(lookupOptions.entityTypes[0]);
            console.log(metadata);
            db.RemoveRow(metadata.LogicalName, id);
            onUnSelect();
        },
        [db, lookupOptions.entityTypes],
    );
    const lookForRecords = useMemo(() => {
        if (lookupOptions.entityTypes.length > 1) {
            return 'Look for records';
        }
        var metadata = db.getTableMetadata(lookupOptions.entityTypes[0]);
        return 'Look for ' + (metadata.DisplayCollectionName || metadata.DisplayName || metadata.LogicalName);
    }, [lookupOptions.entityTypes]);

    const entityTypesFilter = useMemo(() => {
        var metadata = db.getTableMetadata(lookupOptions.entityTypes[0]);
        // return 'Look for ' + (metadata.DisplayCollectionName || metadata.DisplayName || metadata.LogicalName);
        console.log(metadata);
        return lookupOptions.entityTypes.length === 1 ? (
            <div
                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_3_singleentity_heading"
                role="presentation"
                className="so.m-1 so.rounded so.bg-zinc-50 flex so.justify-start so.items-center so.align-middle"
            >
                <div
                    role="presentation"
                    className=" so.h-8 so.flex so.items-center so.pl-2 so.text-sm so.text-center  so.text-neutral-800 so.cursor-pointer"
                >
                    {metadata.DisplayName || metadata.LogicalName}
                </div>
            </div>
        ) :
            (
                <div
                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_1_all_heading"
                    role="presentation"
                    className="so.m-1 so.rounded so.bg-zinc-50"
                >
                    <div role="presentation" className="so.flex so.flex-row so.items-center">
                        <div
                            id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-resultsfrom"
                            data-id="MscrmControls.FieldControls.SimpleLookupControl-resultsfrom"
                            role="presentation"
                            className="so.pl-2 so.text-sm so.text-center  so.text-neutral-800 so.cursor-default"
                        >
                            Results from:{' '}
                        </div>
                        <ul
                            aria-labelledby="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-resultsfrom"
                            className="so.flex so.flex-wrap so.overflow-hidden"
                        >
                            <li className=" ">
                                <button
                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_2_entityBtn_0"
                                    role="button"
                                    type="button"
                                    disabled
                                    className="so.flex so.text-xs so.py-1 so.px-2 so.m-1 so.leading-4 so.border so.border-neutral-300  disabled:so.border-opacity-30 so.border-solid so.rounded so.bg-white disabled:so.bg-zinc-100 disabled:so.bg-opacity-30 so.text-neutral-800
                                disabled:so.text-stone-950 disabled:so.text-opacity-50 so.cursor-pointer"
                                >
                                    <span>
                                        Accounts
                                    </span>
                                </button>
                            </li>
                            <li className=" ">
                                <button
                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_1_entityBtn_0"
                                    aria-label="Contacts"
                                    role="button"
                                    data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_ContactsBtn"
                                    type="button"
                                    className="so.flex so.text-xs so.py-1 so.px-2 so.m-1 so.leading-4 so.border so.border-neutral-300 so.border-solid so.rounded so.bg-white so.text-neutral-800 so.cursor-pointer"
                                >
                                    <span
                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_1_ContactsBtn_0"
                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_ContactsBtn_0"
                                        className=" "
                                    >
                                        Contacts
                                    </span>
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            );
    }, [lookupOptions.entityTypes]);
    return (
        <div className="so.fixed so.top-0 so.bottom-0 so.right-0 so.left-0 so.z-50 so.w-full so.bg-opacity-30 so.bg-black so.flex so.justify-end">
            <div className="so.flex so.flex-col so.h-full so.box-border so.bg-white so.border-solid so.border-2 so.border-transparent so.overflow-auto so.flex-nowrap so.w-[400px] so.content-start so.outline-none so.text-neutral-800 so.font-sans so.font-normal so.antialiased so.visible">
                <section className="so.flex so.flex-col so.flex-1">
                    <div className="so.flex so.flex-col so.mb-1 so.mx-5 so.mt-5">
                        <div role="presentation" className="so.flex so.flex-row so.justify-between">
                            <h1 tabIndex={-1} className="so.text-xl so.font-semibold so.text-left">
                                Lookup Records
                            </h1>
                            <button
                                onClick={onCloseClick}
                                className="so.bg-transparent so.text-neutral-700 so.rounded so.border-transparent so.items-center so.align-middle so.justify-center so.box-border so.p-1 so.w-7 so.h-7 hover:so.bg-neutral-100 hover:so.text-blue-700"
                                type="button"
                                title="Close"
                            >
                                <span className="so.items-center so.inline-flex so.justify-center so.leading-5 so.text-xl so.h-5 so.w-5">
                                    <svg
                                        fill="currentColor"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="m4.4 4.55.07-.08a.75.75 0 0 1 .98-.07l.08.07L12 10.94l6.47-6.47a.75.75 0 1 1 1.06 1.06L13.06 12l6.47 6.47c.27.27.3.68.07.98l-.07.08a.75.75 0 0 1-.98.07l-.08-.07L12 13.06l-6.47 6.47a.75.75 0 0 1-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 0 1-.07-.98l.07-.08-.07.08Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <h2 tabIndex={-1} className="so.text-base so.font-semibold so.font-sans">
                            Select record
                        </h2>
                    </div>
                    <div
                        className="so.flex so.overflow-visible so.mb-6 so.mx-2 so.mt-4 so.justify-between so.h-full so.flex-col"
                        role="presentation"
                    >
                        <div className="so.flex so.w-full" role="presentation">
                            <div className="so.max-w-full so.flex-1 so.flex" role="presentation">
                                <div
                                    role="presentation"
                                    className="so.flex so.flex-col so.w-full so.border so.border-zinc-100 so.border-solid "
                                >
                                    <div
                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_InputSearchContainer"
                                        role="presentation"
                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_InputSearchContainer"
                                        className="so.flex so.w-full"
                                    >
                                        <div
                                            id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_0_BasicContainer"
                                            data-id="MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup"
                                            role="presentation"
                                            className="so.rounded so.w-full so.bg-gray-100 "
                                        >
                                            <div
                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_0_live_region"
                                                role="status"
                                                aria-atomic="true"
                                            ></div>
                                            {selected === null && (
                                                <div
                                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_InputSearch"
                                                    role="presentation"
                                                    className="so.flex so.w-full so.p-1 so.pl-2 so.border-b-2 so.border-b-transparent focus-within:so.border-b-blue-700"
                                                >
                                                    <input
                                                        ref={inpuRef}
                                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_textInputBox_with_filter_new"
                                                        aria-label="Select record, Lookup"
                                                        role="searchbox"
                                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_textInputBox_with_filter_new"
                                                        title="Select to enter data"
                                                        placeholder={lookForRecords}
                                                        autoComplete="off"
                                                        aria-autocomplete="list"
                                                        onKeyPress={onKeyPress}
                                                        type="text"
                                                        className="so.flex-1 so.bg-transparent so.outline-none active:so.border-transparent"
                                                        aria-describedby="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_Type_To_Search_Text"
                                                    />

                                                    <button
                                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_search"
                                                        aria-label="Search records for Select record, Lookup field"
                                                        title="Search"
                                                        type="button"
                                                        className="so.justify-center so.align-middle so.p-1 so.text-neutral-700 hover:so.text-blue-700"
                                                        onClick={OnSearchClick}
                                                    >
                                                        <svg
                                                            className="so.fill-current so.w-4 so.h-4"
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 -0.5 21 21"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="m5.94 12.929 1.485 1.414L1.485 20 0 18.586zM13.65 12C10.755 12 8.4 9.757 8.4 7s2.355-5 5.25-5 5.25 2.243 5.25 5-2.355 5-5.25 5m0-12C9.59 0 6.3 3.134 6.3 7s3.29 7 7.35 7S21 10.866 21 7s-3.29-7-7.35-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                            {selected != null && (
                                                <div
                                                    role="presentation"
                                                    className="so.flex so.w-full so.p-1 so.pl-2 so.border-b-2 so.border-b-transparent focus-within:so.border-b-blue-700"
                                                >
                                                    <ul className="so.flex so.flex-1 so.overflow-hidden so.flex-row so.relative so.outline-none">
                                                        <li className="so.flex so.flex-row so.flex-nowrap so.mx-1 so.h-6 so.rounded so.items-center so.max-w-full so.text-sky-800  so.bg-sky-100 hover hover:so.bg-blue-200">
                                                            <div className="so.justify-center so.flex  so.text-sm so.items-center so.px-1">
                                                                <img src="./favicon.ico" className="so.h-5 so.w-5" />
                                                            </div>
                                                            <div
                                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_selected_tag_text_0"
                                                                role="presentation"
                                                                className="so.px-1 so.cursor-pointer so.text-sky-800 underline so.leading-5  block so.truncate "
                                                            >
                                                                {selected?.name}
                                                            </div>
                                                            <button
                                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_selected_tag_delete_0"
                                                                role="button"
                                                                type="button"
                                                                className="so.px-2 so.flex so.text-inherit so.rounded so.bg-transparent so.items-center"
                                                                onClick={onUnSelect}
                                                            >
                                                                <span
                                                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_microsoftIcon_cancelButton_0"
                                                                    className="so.text-xs "
                                                                >
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
                                    <div role="presentation" className="so.w-full so.flex so.flex-1 so.flex-col">
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
                                                    <button
                                                        onClick={() => onSelect(r)}
                                                        key={r.id}
                                                        className="so.flex so.gap-x-1 so.min-h-12 so.items-center so.overflow-hidden so.rounded hover:so.bg-gray-200"
                                                    >
                                                        <div className="so.justify-center so.flex  so.text-sm so.items-center so.px-1">
                                                            <img src="./favicon.ico" className="so.h-6 so.w-6"></img>
                                                        </div>
                                                        <div className="so.flex-1 so.truncate">{r.name}</div>
                                                    </button>
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
                                type="button"
                                title="Add"
                                onClick={() => OnDeleteRecord(selected.id)}
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
