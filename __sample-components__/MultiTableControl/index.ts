/* eslint-disable @typescript-eslint/no-unused-vars */
/*
	This file is part of the Microsoft PowerApps code samples. 
	Copyright (C) Microsoft Corporation.  All rights reserved. 
	This source code is intended only as a supplement to Microsoft Development Tools and/or  
	on-line documentation.  See these other materials for detailed information regarding  
	Microsoft code samples. 

	THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER  
	EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF  
	MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE. 
 */

import { IInputs, IOutputs } from './generated/ManifestTypes';

export class MultiTableControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // Reference to 'Lookup Objects' HTMLButtonElement
    private _lookupObjectsButton: HTMLButtonElement;

    // Reference to 'Lookup Result Div' HTMLDivElement
    // Used to display information about the item selected by the lookup
    private _lookupObjectsResultDiv: HTMLDivElement;

    // Reference to the control container HTMLDivElement
    // This element contains all elements of our custom control example
    private _container: HTMLDivElement;

    // Reference to ComponentFramework Context object
    private _context: ComponentFramework.Context<IInputs>;

    // Flag if control view has been rendered
    private _controlViewRendered: boolean;

    // Label displayed in lookup result div
    // NOTE: See localization sample control for information on how to localize strings into multiple languages
    private LOOKUP_OBJECRESULT_DIV_STRING = 'Item selected by lookupObjects method:';

    // Prefix for label displayed
    // NOTE: See localization sample control for information on how to localize strings into multiple languages
    private BUTTON_LABEL_CLICK_STRING = 'Click to invoke:';

    // Name of entity to use for metadata retrieve example (this entity needs to exist in your org)
    private ENTITY_LOGICAL_NAME_FOR_METADATA_EXAMPLE = ['account', 'contact'];

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement,
    ): void {
        this._controlViewRendered = false;
        this._context = context;
        this._container = document.createElement('div');
        this._container.classList.add('Table_Container');
        container.appendChild(this._container);
    }

    /**
     * Creates an HTMLButtonElement with the provided label
     * Attaches the provided method to the "onclick" event of the button element
     * @param buttonLabel : Label to set on button element
     * @param onClickHandler : event handler to attach to button's "onclick" event
     * @param entityName : entityName to store in the button's attribute
     */
    private createHTMLButtonElement(
        buttonLabel: string,
        onClickHandler: (event: Event) => void,
        entityName: string[],
    ): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.innerHTML = buttonLabel;
        entityName && button.setAttribute('entityName', entityName.join(', '));

        button.classList.add('SampleControlHtmlTable_ButtonClass');
        button.addEventListener('click', onClickHandler);
        return button;
    }

    /**
     * Event handler for 'lookup objects' button
     *
     * This method invokes the lookup dialog for the entity name specified by the buttons attribute
     * Once the user selects an item in the lookup, the selected item is passed back to our callback method.
     * Our callback method retrieves the id, name, entity type fields from the selected item and injects the
     * values into a resultDiv on the control to showcase the selected values.
     *
     * @param event : OnClick Event
     */
    private onLookupObjectsButtonClick(event: Event): void {
        // Get the entity name for the button
        //ntityName: string[] | null = (event.target as Element)?.getAttribute('entityNames');

        const lookUpOptions: ComponentFramework.UtilityApi.LookupOptions = {
            // Note: lookup can support multiple entity types with the below syntax
            entityTypes: ['account', 'contact'],
            // entityTypes: entityName,
            allowMultiSelect: false,
            defaultEntityType: '',
            defaultViewId: '',
            viewIds: [],
        };

        const lookUpPromise = this._context.utils.lookupObjects(lookUpOptions);

        lookUpPromise.then(
            // Callback method - invoked after user has selected an item from the lookup dialog
            // Data parameter is the item selected in the lookup dialog
            (data: ComponentFramework.LookupValue[]) => {
                if (data?.[0] && this._lookupObjectsResultDiv) {
                    const id: string = data[0].id;
                    const name: string | undefined = data[0].name;
                    const entityType: string = data[0].entityType;

                    let resultHTML: string = this.LOOKUP_OBJECRESULT_DIV_STRING;

                    resultHTML += `<br/>Entity ID: ${id}`;
                    resultHTML += `<br/>Entity Name: ${name}`;
                    resultHTML += `<br/>Entity Type: ${entityType}`;

                    this._lookupObjectsResultDiv.innerHTML = resultHTML;
                }
            },
            () => {
                // Error handling code here
            },
        );
    }

    /**
     * Generates HTML Button that invokes the lookup dialog and appends to custom control container
     * Generates HTML Div that displays the result of the call to the lookup dialog
     * @param entityName : name of entity that should be used by the lookup dialog
     */
    private GenerateLookupObjectElements(entityNames: string[]): void {
        this._lookupObjectsButton = this.createHTMLButtonElement(
            `${this.BUTTON_LABEL_CLICK_STRING} lookupObjects(${entityNames})`,
            this.onLookupObjectsButtonClick.bind(this),
            entityNames,
        );

        this._container.appendChild(this._lookupObjectsButton);

        this._lookupObjectsResultDiv = document.createElement('div');
        this._lookupObjectsResultDiv.setAttribute('class', 'lookupObjectsResultDiv');

        let resultDivString: string = this.LOOKUP_OBJECRESULT_DIV_STRING;
        resultDivString += '<br />';
        resultDivString += 'none';

        this._lookupObjectsResultDiv.innerHTML = resultDivString;
        this._container.appendChild(this._lookupObjectsResultDiv);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        if (!this._controlViewRendered) {
            // this._context.utils.getEntityMetadata(this.ENTITY_LOGICAL_NAME_FOR_METADATA_EXAMPLE).then(
            // (entityMetadata) => {
            // Generate the HTML Elements used for the lookup control example
            this.GenerateLookupObjectElements(this.ENTITY_LOGICAL_NAME_FOR_METADATA_EXAMPLE);
            // },
            // (error) => {
            // Error handling code here
            // },
            // );

            this._controlViewRendered = true;
        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        // no-op: method not leveraged by this example custom control
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // no-op: method not leveraged by this example custom control
    }
}
