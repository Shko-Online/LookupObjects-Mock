import { ShkoOnline } from '@shko.online/componentframework-mock';
import React from 'react';

function SelectedEntityFilter({ entity, OnAllClick }: { entity: ShkoOnline.EntityMetadata; OnAllClick: () => void }) {
    return (
        <div
            className="so.m-1 so.rounded so.bg-zinc-50 so.relative so.flex so.justify-center so.h-8"
            role="presentation"
        >
            <button
                className=" so.absolute so.left-0 so.flex so.z-50 so.flex-row so.items-center so.text-xs so.py-1 so.px-2 so.m-1 so.leading-4 so.border so.border-neutral-300  so.border-solid so.rounded so.bg-white 
                 so.text-neutral-800 so.cursor-pointer"
                onClick={() => OnAllClick()}
                role="button"
                type="button"
            >
                <div aria-hidden="true" className="so.pr-1 so.text-xs  so.text-neutral-800">
                    <svg className="so.w-4 so.h-4" viewBox="0 0 17.92 17.92" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.92 8.4h11.2a0.56 0.56 0 1 1 0 1.12h-11.2a0.56 0.56 0 0 1 0 -1.12" />
                        <path d="m4.152 8.96 4.644 4.643a0.56 0.56 0 0 1 -0.793 0.793L2.963 9.357a0.56 0.56 0 0 1 0 -0.793l5.04 -5.04a0.56 0.56 0 1 1 0.793 0.793z" />
                    </svg>
                </div>
                <span className="so.text-xs so.text-neutral-800">All</span>
            </button>
            <div className="so.flex so.h-8   so.justify-center so.items-center so.align-middle">
                <h3 className="so.text-sm so.text-neutral-800">{entity?.DisplayName} </h3>
            </div>
        </div>
    );
}

export default SelectedEntityFilter;
