type ClassList = { [className: string]: boolean };

export function classList(list: ClassList) {
    return Object.keys(list)
        .filter(className => list[className])
        .join(' ');
}
