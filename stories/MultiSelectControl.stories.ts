import type { Meta, StoryObj } from '@storybook/html';
import type { IInputs, IOutputs } from '../__sample-components__/MultiSelectControl/generated/ManifestTypes';

import { useArgs, useEffect } from '@storybook/preview-api';
import { MultiSelectControl as Component } from '../__sample-components__/MultiSelectControl';
import {
    AttributeType,
    ComponentFrameworkMockGenerator,
    ShkoOnline,
    StringPropertyMock,
} from '@shko.online/componentframework-mock';
import '../__sample-components__/MultiSelectControl/css/MultiSelectControl.css';
import mockLookupObjects from '../src';

export default {
    title: "Shko Online's LookupObjects-Mock/MultiSelect Control",
} as Meta<StoryArgs>;

interface StoryArgs {
    isDisabled: boolean;
    isVisible: boolean;
}

const renderGenerator = () => {
    let container: HTMLDivElement | null;
    let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

    return function () {
        const [args] = useArgs<StoryArgs>();
        useEffect(
            () => () => {
                container = null;
                mockGenerator.control.destroy();
            },
            [],
        );
        if (!container) {
            container = document.createElement('div');
            container.className = 'SampleNamespace.TableControl';
            mockGenerator = new ComponentFrameworkMockGenerator(
                Component,
                {
                    stringProperty: StringPropertyMock,
                },
                container,
            );
            // mockGenerator.SetControlResource(resource);

            mockGenerator.metadata.initMetadata([
                {
                    LogicalName: 'account',
                    EntitySetName: 'accounts',
                    PrimaryIdAttribute: 'accountid',
                    PrimaryNameAttribute: 'name',
                    DisplayName: 'Account',
                    Attributes: [
                        {
                            AttributeType: AttributeType.Uniqueidentifier,
                            LogicalName: 'accountid',
                            SchemaName: 'AccountId',
                        } as ShkoOnline.AttributeMetadata,
                        {
                            AttributeType: AttributeType.String,
                            LogicalName: 'name',
                            SchemaName: 'Name',
                        } as ShkoOnline.StringAttributeMetadata,
                        {
                            AttributeType: AttributeType.Money,
                            LogicalName: 'revenue',
                            SchemaName: 'revenue',
                        } as ShkoOnline.AttributeMetadata,
                    ],
                },
                {
                    LogicalName: 'contact',
                    EntitySetName: 'contacts',
                    PrimaryIdAttribute: 'contactid',
                    PrimaryNameAttribute: 'name',
                    DisplayName: 'Contact',
                    Attributes: [
                        {
                            AttributeType: AttributeType.Uniqueidentifier,
                            LogicalName: 'contactid',
                            SchemaName: 'contactId',
                        } as ShkoOnline.AttributeMetadata,
                        {
                            AttributeType: AttributeType.String,
                            LogicalName: 'name',
                            SchemaName: 'Name',
                        } as ShkoOnline.StringAttributeMetadata,
                        {
                            AttributeType: AttributeType.Money,
                            LogicalName: 'rev',
                            SchemaName: 'rev',
                        } as ShkoOnline.AttributeMetadata,
                    ],
                },
            ]);
            mockLookupObjects(mockGenerator);
            mockGenerator.metadata.initItems({
                '@odata.context': '#accounts',
                value: [
                    {
                        name: 'Account 1',
                        revenue: 120000,
                    },
                    {
                        name: 'Account 2',
                        revenue: 1200,
                    },
                ],
            });
            mockGenerator.metadata.initItems({
                '@odata.context': '#contacts',
                value: [
                    {
                        name: 'Contact 1',
                        rev: 1200,
                    },
                    {
                        name: 'Contact 2',
                        rev: 1200,
                    },
                ],
            });

            mockGenerator.context._SetCanvasItems({
                stringProperty: '',
            });

            mockGenerator.context.userSettings.userName = 'Betim Beja';
            mockGenerator.context.mode.isControlDisabled = args.isDisabled;
            mockGenerator.context.mode.isVisible = args.isVisible;
            mockGenerator.context.utils.lookupObjects.callsFake(
                (lookupOptions: ComponentFramework.UtilityApi.LookupOptions) => {
                    return new Promise<ComponentFramework.LookupValue[]>((resolve) => {
                        const rows = mockGenerator.metadata.GetAllRows(
                            lookupOptions.entityTypes ? lookupOptions.entityTypes[0] : 'account',
                        );

                        resolve(
                            rows.rows.map((i) => {
                                return {
                                    entityType: i.entityType || 'account',
                                    id: i.accountid || '00000000-0000-0000-0000-000000000004',
                                    name: i.name || 'Account',
                                };
                            }),
                        );
                    });
                },
            );
            mockLookupObjects(mockGenerator);
            mockGenerator.ExecuteInit();
        }

        if (mockGenerator) {
            mockGenerator.context.mode.isVisible = args.isVisible;
            mockGenerator.context.mode.isControlDisabled = args.isDisabled;

            mockGenerator.ExecuteUpdateView();
        }

        return container;
    };
};

export const MultiSelectControl = {
    render: renderGenerator(),
    args: {},
} as StoryObj<StoryArgs>;
