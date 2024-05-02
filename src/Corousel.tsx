/*
    MIT copyright
    This file is part of the 'react-snap-carousel' https://github.com/richardscarrott/react-snap-carousel 
*/
import React, { MutableRefObject, useImperativeHandle } from 'react';
import { useSnapCarousel } from '../src/use-snap-carousel';

export interface CarouselProps<T> {
    readonly axis?: 'x' | 'y';
    readonly items: T[];
    readonly renderItem: (props: CarouselRenderItemProps<T>) => React.ReactElement<CarouselItemProps>;
    readonly scrollMargin?: boolean;
    readonly scrollBehavior?: ScrollBehavior;
}

export interface CarouselRenderItemProps<T> {
    readonly item: T;
    readonly index: number;
    readonly isSnapPoint: boolean;
}

export interface CarouselRef {
    readonly refresh: () => void;
}

// eslint-disable-next-line react/display-name
export const Carousel = React.forwardRef<CarouselRef, CarouselProps<unknown>>(
    ({ axis, items, renderItem, scrollBehavior }, ref) => {
        const { scrollRef, next, prev, snapPointIndexes, refresh } = useSnapCarousel({
            axis,
        });

        useImperativeHandle(ref, () => ({ refresh }));

        return (
            <div className={'so.flex so.flex-row so.relative so.w-full so.justify-between'}>
                <button
                    className="so.flex so.text-inherit so.w-8 so.cursor-pointer so.bg-transparent so.justify-center so.items-center so.box-border so.fill-neutral-600 hover:so.fill-blue-700"
                    onClick={() => prev({ behavior: scrollBehavior })}
                >
                    <svg
                        className="so.fill-inherit "
                        viewBox="-8 -5 24 24"
                        width="28"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M2.757 7l4.95 4.95a1 1 0 1 1-1.414 1.414L.636 7.707a1 1 0 0 1 0-1.414L6.293.636A1 1 0 0 1 7.707 2.05L2.757 7z" />
                    </svg>
                </button>
                <ul className={'so.flex so.flex-1 so.flex-row so.relative so.overflow-hidden'} ref={scrollRef}>
                    {items.map((item, index) =>
                        renderItem({
                            item,
                            index,
                            isSnapPoint: snapPointIndexes.has(index),
                        }),
                    )}
                </ul>
                <button
                    className={
                        'so.flex so.text-inherit so.w-8 so.cursor-pointer so.bg-transparent so.justify-center so.items-center so.box-border  so.fill-neutral-600 hover:so.fill-blue-700'
                    }
                    onClick={() => {
                        next({ behavior: scrollBehavior });
                    }}
                >
                    <svg
                        className="so.fill-inherit"
                        viewBox="-8 -5 24 24"
                        width="28"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.314 7.071l-4.95-4.95A1 1 0 0 1 1.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z" />
                    </svg>
                </button>
            </div>
        );
    },
) as <T>(props: CarouselProps<T> & { ref?: ForwardedRef<CarouselRef> }) => React.ReactElement;

type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;

export interface CarouselItemProps {
    readonly isSnapPoint: boolean;
    readonly width?: number;
    readonly children?: React.ReactNode;
}

export const CarouselItem = ({ width, children }: CarouselItemProps) => {
    return (
        <li
            className={'item'}
            id="corouselitem"
            style={{
                width: width ?? '',
                scrollSnapAlign: 'start',
            }}
        >
            {children}
        </li>
    );
};
