import { MockGenerator, ShkoOnline } from '@shko.online/componentframework-mock';
import LookupComponent from "./LookupComponent";
import ReactDOM from "react-dom";
import React from 'react';
import css from '!!raw-loader!./LookupCss.css';

const mockLookupObjects = <
    TInputs extends ShkoOnline.PropertyTypes<TInputs>,
    TOutputs extends ShkoOnline.KnownTypes<TOutputs>
>(mockGenerator: MockGenerator<TInputs, TOutputs>, container: HTMLDivElement) => {
    var innerContainer = document.createElement('div');
    innerContainer.style.position = "absolute"

    const shadowRoot = innerContainer.attachShadow({
        mode: 'closed'
    });

    const shadowDiv = document.createElement('div');
    shadowDiv.style.backgroundColor = "green";
    shadowDiv.style.width = "100%";
    shadowDiv.style.height = "100%";

    shadowRoot.appendChild(shadowDiv);
    shadowDiv.insertAdjacentHTML('beforebegin', `<style>${css}</style>`);

    container.appendChild(innerContainer);
    mockGenerator.context.utils.lookupObjects.callsFake((lookupOptions) => {
        ReactDOM.render(<LookupComponent />, shadowDiv as unknown as HTMLElement);
        return new Promise(() => {
            console.log("Test", document.getElementById('div'))
        });
    });
}

export default mockLookupObjects;