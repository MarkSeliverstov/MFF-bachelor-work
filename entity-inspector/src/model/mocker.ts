import { InstanceModel, Entity, EntityInstance, Method } from './instatnce-model';

export function mockInstanceModel (): InstanceModel {
    const en = [];
    en.push(createEntity("test1Entity"));
    en.push(createEntity("test2Entity"));
    return {
        entities: en
    };
}

function createEntity(name: string): Entity {
    return {
        identifier: name,
        instances: [createEntityInstance(name)]
    };
}

function createEntityInstance(name: string): EntityInstance {
    return {
        source: "mock source",
        name: name,
        description: "mock description",
        properties: [],
        methods: [createMethod()],
        extends: []
    };
}

function createMethod(): Method {
    return {
        name: "test_method"
    };
}