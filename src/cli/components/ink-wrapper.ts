// Wrapper to handle ink ES module imports
let inkComponents: any = null;

export async function getInkComponents() {
    if (!inkComponents) {
        inkComponents = await import("ink");
    }
    return inkComponents;
}

export async function createInkComponent(componentName: string, props: any, children?: any) {
    const ink = await getInkComponents();
    const Component = ink[componentName];
    return Component ? Component(props, children) : null;
}