import React from 'react';
import './LookupCss.css';
function LookupComponent() {


    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 z-50 w-full bg-opacity-30 bg-black flex justify-end'        >
            <div className='flex flex-col h-full box-border bg-white  border-solid border-2 border-transparent overflow-auto flex-nowrap w-96 content-start outline-none text-neutral-800 font-sans font-normal antialiased visible'>
                <section className="flex flex-col flex-1 "                >
                    <div
                        id="lookupDialogHeaderContainer"
                        className='flex flex-col mb-1 mx-5 mt-5'
                    >
                        <div role="presentation"
                            className='flex flex-row justify-between'
                        >
                            <h1
                                id="lookupDialogTitle"
                                tabIndex={-1}
                                className='text-xl font-semibold text-left'

                            >
                                Lookup Records
                            </h1>
                            <button
                                type="button"
                                title="Close"
                                className='bg-transparent text-neutral-700 border-transparent items-center align-middle justify-center box-border p-1 w-8 '

                            >
                                <span
                                    className='items-center inline-flex justify-center text-xl h-5 w-5'
                                >
                                    <svg
                                        fill="currentColor"
                                        className="___12fm75w f1w7gpdv fez10in fg4l7m0"
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

                        <h2
                            id="lookupDialogSubTitle"
                            tabIndex={-1}
                            className='text-base font-semibold font-sans'

                        >
                            Select record
                        </h2>

                    </div>
                    <div className="flex  overflow-visible mb-6 mx-2 mt-4 justify-between h-full flex-col" id="lookupDialogContainer" role="presentation"                    >
                        <div
                            id="lookupDialogLookup"
                            role="presentation"
                            className="pa-az pa-oc pa-ky pa-le pa-hd pa-he pa-od pa-fa pa-z webkitScroll flexbox"
                            data-lp-id="MscrmControls.FieldControls.SimpleLookupControl|MscrmControls.FieldControls.SimpleLookupControl|null"
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
                                                    value=""
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
                    <div
                        id="lookupDialogFooterContainer"
                        className='flex flex-grow-0 flex-shrink-0 basis-0 pr-2 gap-x-2 mt-2 mb-5 self-end justify-end align-middle items-center'

                    >
                        <div
                            id="lookupDialogFooterAddButtonContainer"

                            role="presentation"
                            className="flex w-full outline-none"
                        >
                            <button
                                type="button"
                                title="Add"
                                data-id="ADD_BUTTON_ID"
                                id="lookupDialogSaveBtn"
                                className='text-sm text-white border-transparent bg-sky-700 rounded px-3 py-1 items-center box-border inline-flex justify-center no-underline align-middle overflow-hidden min-w-24  duration-100 transition-[background,border,color] ease-in'
                            >
                                Add
                            </button>
                        </div>
                        <div
                            id="lookupDialogFooterCancelButtonContainer"
                            data-id="lookupDialogFooterCancelButtonContainer"
                            role="presentation"
                            className="flex w-full outline-none"
                        >
                            <button
                                type="button"
                                title="Cancel"
                                id="lookupDialogCancelBtnFooter"
                                className='text-sm text-neutral-800 border-[1px] border-neutral-500 bg-white rounded px-3 py-1 items-center box-border inline-flex justify-center no-underline align-middle overflow-hidden min-w-24  duration-100 transition-[background,border,color] ease-in'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    );
}

export default LookupComponent;
