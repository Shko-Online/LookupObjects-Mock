import React, { useLayoutEffect, useRef } from 'react';
import { Carousel, CarouselItem, CarouselRef } from './Corousel';
import SearchLookup from './SearchLookup';

function SelectedRecord({
    selected,
    allowMultiSelect,
    onUnSelect,
    searchRecords,
    inputRef,
    onSearchClick,
}: {
    selected: ComponentFramework.LookupValue[];
    allowMultiSelect: boolean;
    onUnSelect: (lookup: ComponentFramework.LookupValue) => void;
    searchRecords: (x: string) => void;
    inputRef: React.LegacyRef<HTMLInputElement>;
    onSearchClick: () => void;
}) {
    const carouselRef = useRef<CarouselRef>(null);
    useLayoutEffect(() => {
        if (!carouselRef.current) {
            return;
        }
        carouselRef.current.refresh();
    }, [selected]);
    return allowMultiSelect ? (
        <div>
            <Carousel
                axis="x"
                items={selected}
                ref={carouselRef}
                renderItem={({ item, isSnapPoint }) => (
                    <CarouselItem isSnapPoint={isSnapPoint} key={item?.id}>
                        <div
                            className="so.flex so.w-full so.p-1  so.border-b-2 so.border-b-transparent focus-within:so.border-b-blue-700"
                            key={item.id}
                            role="presentation"
                        >
                            <ul className="so.flex so.flex-1 so.overflow-hidden so.flex-row so.relative so.outline-none">
                                <li className="so.flex so.flex-row so.flex-nowrap so.text-nowrap so.mx-1 so.h-6 so.rounded so.items-center so.max-w-full so.text-sky-800 so.bg-sky-100 hover hover:so.bg-blue-200">
                                    <div className="so.justify-center so.flex so.text-sm so.items-center so.px-1 so.w-6">
                                        <img className="so.h-5 so.w-5" src="./favicon.ico" />
                                    </div>
                                    <div
                                        className="so.px-1 so.cursor-pointer so.text-sky-800 so.underline so.decoration-sky-800 so.decoration-1 so.leading-5 block so.text-nowrap "
                                        role="presentation"
                                    >
                                        {item.name}
                                    </div>
                                    <button
                                        className="so.px-2 so.flex so.text-inherit so.rounded so.bg-transparent so.items-center"
                                        onClick={() => onUnSelect(item)}
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
                    </CarouselItem>
                )}
            />
            <SearchLookup
                inputRef={inputRef}
                lookForRecords={'Add more records'}
                onSearchClick={onSearchClick}
                searchRecords={searchRecords}
            />
        </div>
    ) : (
        <div
            className="so.flex so.w-full so.p-1 so.pl-2 so.border-b-2 so.border-b-transparent focus-within:so.border-b-blue-700"
            key={selected[0].id}
            role="presentation"
        >
            <ul className="so.flex so.flex-1 so.overflow-hidden so.flex-row so.relative so.outline-none">
                <li className="so.flex so.flex-row so.flex-nowrap so.mx-1 so.h-6 so.rounded so.items-center so.max-w-full so.text-sky-800 so.bg-sky-100 hover hover:so.bg-blue-200">
                    <div className="so.justify-center so.flex so.text-sm so.items-center so.px-1">
                        <img className="so.h-5 so.w-5" src="./favicon.ico" />
                    </div>
                    <div
                        className="so.px-1 so.cursor-pointer so.text-sky-800 so.underline so.decoration-sky-800 so.decoration-1 so.leading-5 block so.truncate"
                        role="presentation"
                    >
                        {selected[0].name}
                    </div>
                    <button
                        className="so.px-2 so.flex so.text-inherit so.rounded so.bg-transparent so.items-center"
                        onClick={() => onUnSelect(selected[0])}
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
    );
}

export default SelectedRecord;
