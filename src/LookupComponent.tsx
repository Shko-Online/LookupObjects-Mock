import React, { useCallback } from 'react';
import './LookupCss.css';

function LookupComponent({ unmount }: { unmount: () => void }) {
    const onCloseClick = useCallback(
        (e: React.MouseEvent) => {
            console.log('unmount?');
            unmount();
        },
        [unmount],
    );
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
                                className="so.bg-transparent so.text-neutral-700 so.border-transparent so.items-center so.align-middle so.justify-center so.box-border so.p-1 so.w-8"
                                type="button"
                                title="Close"
                            >
                                <span className="so.items-center so.inline-flex so.justify-center so.text-xl so.h-5 so.w-5">
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
                        <div
                            className="so.pa-az so.pa-oc pa-ky pa-le pa-hd pa-he pa-od pa-fa pa-z webkitScroll flexbox"
                            role="presentation"
                        >
                            <div
                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_0"
                                data-id="MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup"
                                role="presentation"
                                className="pa-d pa-oe flexbox"
                            >
                                <div
                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0"
                                    data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup"
                                    role="presentation"
                                    className="pa-b pa-az pa-cs flexbox"
                                >
                                    <div
                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_InputSearchContainer"
                                        role="presentation"
                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_InputSearchContainer"
                                        className=" "
                                    >
                                        <div
                                            id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_0_BasicContainer"
                                            data-id="MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup"
                                            role="presentation"
                                            className="pa-of pa-b pa-y pa-az pa-w pa-og pa-iu pa-gs pa-z pa-oh pa-oi pa-oj pa-ok pa-ol pa-om pa-on pa-oo pa-op pa-oq pa-or pa-os pa-ot pa-ou pa-ov pa-ow pa-ox pa-oy pa-oz pa-pa pa-pb flexbox"
                                        >
                                            <div
                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_0_live_region"
                                                role="status"
                                                aria-atomic="true"
                                                //style="position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0px; border: 0px; overflow: hidden; white-space: nowrap;"
                                            ></div>
                                            <div
                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_InputSearch"
                                                role="presentation"
                                                data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_InputSearch"
                                                className="pa-gs pa-pc flexbox"
                                            >
                                                <input
                                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_textInputBox_with_filter_new"
                                                    aria-label="Select record, Lookup"
                                                    role="searchbox"
                                                    data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_textInputBox_with_filter_new"
                                                    title="Select to enter data"
                                                    placeholder="Look for records"
                                                    autoComplete="off"
                                                    aria-autocomplete="list"
                                                    type="text"
                                                    className="pa-az pa-cx pa-pd pa-fc pa-da pa-ih pa-pe pa-pf pa-pg pa-ph "
                                                    aria-describedby="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_Type_To_Search_Text"
                                                />

                                                <button
                                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_search"
                                                    aria-label="Search records for Select record, Lookup field"
                                                    title="Search"
                                                    data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_search"
                                                    type="button"
                                                    className="pa-q pa-ee pa-pi pa-cn pa-lh pa-pj pa-da pa-pk pa-pl pa-pm pa-pn pa-iu pa-gz pa-po pa-pp flexbox"
                                                >
                                                    <span
                                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_0_microsoftIcon_searchButton"
                                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-Lookup_falseBoundLookup_microsoftIcon_searchButton"
                                                        className="symbolFont SearchButton-symbol  "
                                                    ></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_children"
                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_children"
                                        role="presentation"
                                        className="pa-b pa-ii pa-il pa-pq pa-f webkitScroll flexbox"
                                    >
                                        <span
                                            id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_Type_To_Search_Text"
                                            data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_Type_To_Search_Text"
                                            className="pa-fc pa-jl pa-pr pa-cz pa-ps "
                                        >
                                            Type to search or press Enter to browse
                                        </span>
                                        <div
                                            id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_tabContainer_0"
                                            role="region"
                                            data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_tabContainer"
                                            className="pa-b pa-ii pa-f pa-pt webkitScroll flexbox"
                                        >
                                            <ul
                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_buttonPanelList_0"
                                                role="presentation"
                                                data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_buttonPanelList"
                                                className="pa-ie pa-pu pa-dp pa-y flexbox"
                                            >
                                                <button
                                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_addNewBtnContainer_0"
                                                    aria-label="New Record"
                                                    role="button"
                                                    title="Go to entity tab to add new"
                                                    tabIndex={-1}
                                                    data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_addNewBtnContainer"
                                                    type="button"
                                                    className="pa-q pa-da pa-iu pa-ee pa-fc pa-cn pa-pv pa-dg pa-e pa-pw pa-px pa-lt pa-pm pa-pn pa-py pa-pz pa-qa flexbox"
                                                >
                                                    <div
                                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_microsoftIcon_new_container_0"
                                                        aria-hidden="true"
                                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_microsoftIcon_new_container"
                                                        className="pa-gv "
                                                    >
                                                        <span
                                                            id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_microsoftIcon_new_0"
                                                            data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_microsoftIcon_new"
                                                            className="symbolFont New-symbol pa-pr pa-qb "
                                                        ></span>
                                                    </div>
                                                    <span
                                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_addNewBtn_0"
                                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_addNewBtn_0"
                                                        className="pa-az pa-e pa-cl pa-qc pa-qd "
                                                    >
                                                        New Record
                                                    </span>
                                                </button>
                                                <a
                                                    id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_advancedLookupBtnContainer"
                                                    aria-label="Advanced lookup"
                                                    role="button"
                                                    tabIndex={0}
                                                    data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_advancedLookupBtnContainer"
                                                    href="#"
                                                    className="pa-q pa-da pa-iu pa-ee pa-fc pa-cn pa-pv pa-dg pa-e pa-pw pa-px pa-in pa-lt pa-pm pa-pn pa-py pa-pz pa-qa "
                                                >
                                                    <div aria-hidden="true" className="pa-gv ">
                                                        <span className="symbolFont SearchButton-symbol pa-pr pa-qb "></span>
                                                    </div>
                                                    <span
                                                        id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_0_advlookup"
                                                        data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_advlookup"
                                                        className="pa-az pa-e pa-cl pa-qc pa-qd "
                                                    >
                                                        Advanced lookup
                                                    </span>
                                                </a>
                                            </ul>
                                        </div>
                                        <span
                                            id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_0_instructionsToExpandListItem"
                                            data-id="MscrmControls.FieldControls.SimpleLookupControl-LookupResultsDropdown_falseBoundLookup_0_instructionsToExpandListItem"
                                            className="pa-al "
                                        >
                                            Press the left or right arrow keys to toggle additional details. On touch
                                            devices, navigate to the button named "More details" inside this item.
                                        </span>
                                        <div role="presentation" className=" ">
                                            <div
                                                id="lookupDialogLookup-MscrmControls.FieldControls.SimpleLookupControl-LookupResultsPopup_falseBoundLookup_0_status"
                                                role="status"
                                                aria-atomic="true"
                                                // style="position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0px; border: 0px; overflow: hidden; white-space: nowrap;"
                                            ></div>
                                        </div>
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
