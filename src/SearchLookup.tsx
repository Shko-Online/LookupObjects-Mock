import React, { useCallback } from 'react';

function SearchLookup({
    searchRecords,
    inputRef,
    lookForRecords,
    onSearchClick,
}: {
    searchRecords: (x: string) => void;
    inputRef: React.LegacyRef<HTMLInputElement>;
    lookForRecords: string;
    onSearchClick: () => void;
}) {
    const onKeyPress = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.charCode === 13) {
                const search = (e.target as HTMLInputElement).value;
                searchRecords(search);
            }
        },
        [searchRecords],
    );
    return (
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
                ref={inputRef}
                role="searchbox"
                title="Select to enter data"
                type="text"
            />
            <button
                aria-label="Search records for Select record, Lookup field"
                className="so.justify-center so.align-middle so.p-1 so.text-neutral-700 hover:so.text-blue-700"
                onClick={onSearchClick}
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
    );
}

export default SearchLookup;
