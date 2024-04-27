import { MockGenerator, ShkoOnline } from '@shko.online/componentframework-mock';
import LookupComponent from './LookupComponent';
import ReactDOM from 'react-dom';
import React from 'react';

const mockLookupObjects = <
    TInputs extends ShkoOnline.PropertyTypes<TInputs>,
    TOutputs extends ShkoOnline.KnownTypes<TOutputs>,
>(
    mockGenerator: MockGenerator<TInputs, TOutputs>,
) => {
    let container = document.getElementById('so.lookupObjects');
    if(container===null){
        const root = document.getElementById('storybook-root');
        container = document.createElement('div');
        container.style.position = 'absolute';
        root.insertAdjacentElement('afterend', container);
    }
    mockGenerator.context.utils.lookupObjects.callsFake((lookupOptions) => {
        return new Promise((resolve, reject) => {
            const unmount = (cancelled?: boolean) => {
                ReactDOM.unmountComponentAtNode(container);
                if(cancelled) {
                    reject();
                }else{
                    resolve([]);
                }
            };
            ReactDOM.render(<LookupComponent unmount={unmount} />, container);        
        });
    });
};

export default mockLookupObjects;
