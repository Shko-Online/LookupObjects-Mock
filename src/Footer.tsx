import React from 'react';

function Footer({
    onCloseClick,
    onAddClick,
}: {
    onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
    onAddClick: () => void;
}) {
    return (
        <div className="so.flex so.flex-grow-0 so.flex-shrink-0 so.basis-0 so.pr-2 so.gap-x-2 so.mt-2 so.mb-5 so.self-end so.justify-end so.align-middle so.items-center">
            <div className="so.flex so.w-full so.outline-none" role="presentation">
                <button
                    className="so.text-sm so.text-white so.border-transparent so.bg-sky-700 so.rounded so.px-3 so.py-1 so.items-center so.box-border so.inline-flex so.justify-center so.no-underline so.align-middle so.overflow-hidden so.min-w-24 so.duration-100 so.transition-[background,border,color] so.ease-in"
                    onClick={onAddClick}
                    title="Add"
                    type="button"
                >
                    Add
                </button>
            </div>
            <div className="so.flex so.w-full so.outline-none" role="presentation">
                <button
                    className="so.text-sm so.text-neutral-800 so.border so.border-neutral-500 so.bg-white so.rounded so.px-3 so.py-1 so.items-center so.box-border so.inline-flex so.justify-center so.no-underline so.align-middle so.overflow-hidden so.min-w-24 so.duration-100 so.transition-[background,border,color] so.ease-in"
                    onClick={onCloseClick}
                    title="Cancel"
                    type="button"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Footer;
