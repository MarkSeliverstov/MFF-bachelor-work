// @lc-identifier :Identifiable
// @lc-name Identifiable
// @lc-description export Interface for resources with an identifier.
export interface Identifiable{
    // @lc-property
    // @lc-name identifier
    identifier: string | null
}

// @lc-entity
// @lc-identifier :Property
// @lc-name Property
// @lc-description Property.
export interface Property{
    // @lc-property
    // @lc-name name
    name?: string
    // @lc-property
    // @lc-name description
    description?: string
}

// @lc-entity
// @lc-identifier :Method
// @lc-name Method
// @lc-description Method.
export type Method = Property;

// @lc-entity
// @lc-identifier :EntityInstance
// @lc-name EntityInstance
// @lc-description Instance of an entity in a source file.
export interface EntityInstance{
    // @lc-property
    // @lc-name source
    source: string
    // @lc-property
    // @lc-name name
    name?: string
    // @lc-property
    // @lc-name description
    description?: string
    // @lc-property
    // @lc-name properties
    properties: Property[]
    // @lc-property
    // @lc-name properties
    methods: Method[]
    // @lc-property
    // @lc-name extends
    extends: string[]
}

// @lc-entity
// @lc-identifier :Entity
// @lc-name Entity
// @lc-extends :Identifiable
// @lc-description Identifiable entity, can have multiple instances.
export interface Entity extends Identifiable{
    // @lc-property
    // @lc-name instances
    instances: EntityInstance[]
}

// @lc-entity
// @lc-identifier :InstanceModel
// @lc-name InstanceModel
// @lc-description Collection of instances.
export interface InstanceModel{
    // @lc-property
    // @lc-name entities
    entities: Entity[]
}