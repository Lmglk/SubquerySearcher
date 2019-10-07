export function responseGroupsAdapter(data: any) {
    return data.map((group: any) => ({
        ...group,
        sequences: group.sequences.map((sequence: any) => ({
            ...sequence,
            nodes: sequence.nodes.map((node: any) => node.id),
        })),
    }));
}
