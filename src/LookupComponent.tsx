import React, { KeyboardEvent, useCallback, useMemo, useState } from 'react';
import './LookupCss.css';
import { MetadataDB } from '@shko.online/componentframework-mock';

interface ILookupComponentProps {
    unmount: () => void;
    resolve: (value: ComponentFramework.LookupValue[] | PromiseLike<ComponentFramework.LookupValue[]>) => void;
    lookupOptions: ComponentFramework.UtilityApi.LookupOptions;
    db: MetadataDB;
}

function LookupComponent({ unmount, resolve, lookupOptions, db }: ILookupComponentProps) {
    const [results, setResults] = useState<ComponentFramework.LookupValue[]>([]);
    const onCloseClick = useCallback(
        (e: React.MouseEvent) => {
            console.log('unmount?');
            unmount();
            resolve([]);
        },
        [unmount],
    );

    const onKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.charCode === 13) {
                const search = (e.target as HTMLInputElement).value;
                var metadata = db.getTableMetadata(lookupOptions.entityTypes[0]);
                const select = `SELECT 
                ${metadata.PrimaryIdAttribute}, 
                ${metadata.PrimaryNameAttribute}
            FROM ${metadata.LogicalName}
            ${search ? `WHERE ${metadata.PrimaryNameAttribute || 'name'} LIKE '%${search}%'` : ''}`;
                setResults(
                    (db.db.exec(select) as any[]).map(
                        (v) =>
                            ({
                                entityType: lookupOptions.entityTypes[0],
                                id: v[metadata.PrimaryIdAttribute],
                                name: v[metadata.PrimaryNameAttribute],
                            }) as ComponentFramework.LookupValue,
                    ),
                );
            }
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
    return (
        <div className="so.fixed so.top-0 so.bottom-0 so.right-0 so.left-0 so.z-50 so.w-full so.bg-opacity-30 so.bg-black so.flex so.justify-end">
            <div className="so.flex so.flex-col so.h-full so.box-border so.bg-white so.border-solid so.border-2 so.border-transparent so.overflow-auto so.flex-nowrap so.w-96 so.content-start so.outline-none so.text-neutral-800 so.font-sans so.font-normal so.antialiased so.visible">
                <section className="so.flex so.flex-col so.flex-1">
                    <div className="so.flex so.flex-col so.mb-1 so.mx-5 so.mt-5">
                        <div role="presentation" className="so.flex so.flex-row so.justify-between">
                            <h1 tabIndex={-1} className="so.text-xl so.font-semibold so.text-left">
                                Lookup Records
                            </h1>
                            <button
                                onClick={onCloseClick}
                                className="so.bg-transparent so.text-neutral-700 so.border-transparent so.items-center so.align-middle so.justify-center so.box-border so.p-1 so.w-7 so.h-7 hover:so.bg-neutral-100"
                                type="button"
                                title="Close"
                            >
                                <span className="so.items-center so.inline-flex so.justify-center so.leading-5 so.text-xl so.h-5 so.w-5">
                                    <svg
                                        fill="currentColor"
                                        aria-hidden="true"
                                        // width="24"
                                        // height="24"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="m4.4 4.55.07-.08a.75.75 0 0 1 .98-.07l.08.07L12 10.94l6.47-6.47a.75.75 0 1 1 1.06 1.06L13.06 12l6.47 6.47c.27.27.3.68.07.98l-.07.08a.75.75 0 0 1-.98.07l-.08-.07L12 13.06l-6.47 6.47a.75.75 0 0 1-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 0 1-.07-.98l.07-.08-.07.08Z"
                                            fill="currentColor"
                                        ></path>
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
                                <div role="presentation" className="so.flex so.flex-col so.w-full">
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
                                            className="so.rounded so.w-full so.bg-gray-100 pa-of pa-b pa-y pa-az pa-w pa-og pa-iu pa-gs pa-z pa-oh pa-oi pa-oj pa-ok pa-ol pa-om pa-on pa-oo pa-op pa-oq pa-or pa-os pa-ot pa-ou pa-ov pa-ow pa-ox pa-oy pa-oz pa-pa pa-pb flexbox"
                                        >
                                            <div
                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_0_live_region"
                                                role="status"
                                                aria-atomic="true"
                                            ></div>
                                            <div
                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_InputSearch"
                                                role="presentation"
                                                className="so.flex so.w-full so.p-1 so.pl-2 so.border-b-2 so.border-b-transparent focus-within:so.border-b-blue-700"
                                            >
                                                <input
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
                                                    className="so.flex-1 so.bg-transparent so.outline-none active:so.border-transparent pa-az pa-cx pa-pd pa-fc pa-da pa-ih pa-pe pa-pf pa-pg pa-ph "
                                                    aria-describedby="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_Type_To_Search_Text"
                                                />

                                                <button
                                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_search"
                                                    aria-label="Search records for Select record, Lookup field"
                                                    title="Search"
                                                    data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_search"
                                                    type="button"
                                                    className="so.justify-center so.align-middle so.p-1 pa-q pa-ee pa-pi pa-cn pa-lh pa-pj pa-da pa-pk pa-pl pa-pm pa-pn pa-iu pa-gz pa-po pa-pp flexbox"
                                                >
                                                    <svg
                                                        width="14px"
                                                        height="14px"
                                                        viewBox="0 -0.5 21 21"
                                                        version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <g
                                                                transform="translate(-179.000000, -280.000000)"
                                                                fill="#000000"
                                                            >
                                                                <g transform="translate(56.000000, 160.000000)">
                                                                    <path d="M128.93985,132.929 L130.42455,134.343 L124.4847,140 L123,138.586 L128.93985,132.929 Z M136.65,132 C133.75515,132 131.4,129.757 131.4,127 C131.4,124.243 133.75515,122 136.65,122 C139.54485,122 141.9,124.243 141.9,127 C141.9,129.757 139.54485,132 136.65,132 L136.65,132 Z M136.65,120 C132.5907,120 129.3,123.134 129.3,127 C129.3,130.866 132.5907,134 136.65,134 C140.7093,134 144,130.866 144,127 C144,123.134 140.7093,120 136.65,120 L136.65,120 Z" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="presentation" className="so.w-full so.flex so.flex-1">
                                        {results.length === 0 && (
                                            <span className="">Type to search or press Enter to browse</span>
                                        )}
                                        {results.length > 0 && (
                                            <ul className="so.flex-1 so.flex-col so.scroll-auto">
                                                {results.map((r) => (
                                                    <li key={r.id} className="so.flex">
                                                        <div className="">Icon</div>
                                                        <div className="so.flex-1">{r.name}</div>
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
                                type="button"
                                title="Add"
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
