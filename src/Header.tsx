import React from 'react';

function Header({ onCloseClick }: { onCloseClick: () => void }) {
    return (
        <div className="so.flex so.flex-col so.mb-1 so.mx-5 so.mt-5">
            <div className="so.flex so.flex-row so.justify-between" role="presentation">
                <h1 className="so.text-xl so.font-semibold so.text-left" tabIndex={-1}>
                    Lookup Records
                </h1>
                <button
                    className="so.bg-transparent so.text-neutral-700 so.rounded so.border-transparent so.items-center so.align-middle so.justify-center so.box-border so.p-1 so.w-7 so.h-7 hover:so.bg-neutral-100 hover:so.text-blue-700"
                    onClick={onCloseClick}
                    title="Close"
                    type="button"
                >
                    <span className="so.items-center so.inline-flex so.justify-center so.leading-5 so.text-xl so.h-5 so.w-5">
                        <svg
                            aria-hidden="true"
                            fill="currentColor"
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
            <h2 className="so.text-base so.font-semibold so.font-sans" tabIndex={-1}>
                Select record
            </h2>
        </div>
    );
}

export default Header;
