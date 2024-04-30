import React from 'react';

function SingleEntityFilter({ entity }: { entity: string }) {
    return (
        <div
            className="so.m-1 so.rounded so.bg-zinc-50 flex so.justify-start so.items-center so.align-middle"
            role="presentation"
        >
            <div
                className="so.h-8 so.flex so.items-center so.pl-2 so.text-sm so.text-center so.text-neutral-800 so.cursor-pointer"
                role="presentation"
            >
                {entity}
            </div>
        </div>
    );
}

export default SingleEntityFilter;
