import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GraphChartService {
    public getSVGText(elementId: string): string {
        const svg = document.getElementById('chart');
        const cssStyleText = this.getCSSStyles(svg);
        const styleElement = this.appendCSS(cssStyleText, svg);
        let source = new XMLSerializer().serializeToString(svg);
        styleElement.remove();

        source = this.removeServicesAttributes(source);
        source = this.removeComments(source);

        return source;
    }

    private getCSSStyles(node: HTMLElement): string {
        const classes = this.getAllCSSClasses(node);
        const cssRules = this.getAllCSSRules();

        const styles = cssRules
            .filter(cssRule => {
                if (cssRule.selectorText) {
                    const matches = cssRule.selectorText.match(
                        /\.([a-z0-9_-]+)/i
                    );
                    return matches && classes.has(matches[1]);
                }
            })
            .map(cssRule => cssRule.cssText);

        return this.removeSuffixCSSRule(styles.join(' '));
    }

    private getAllCSSRules(): CSSStyleRule[] {
        let cssRules = [];

        for (let i = 0; i < document.styleSheets.length; i++) {
            const styleSheet = document.styleSheets[i] as CSSStyleSheet;

            try {
                if (!styleSheet.cssRules) {
                    continue;
                }
            } catch (e) {
                if (e.name !== 'SecurityError') {
                    throw e;
                }
                continue;
            }

            const cssRuleList = styleSheet.cssRules;

            for (let j = 0; j < cssRuleList.length; j++) {
                cssRules = [...cssRules, cssRuleList[j] as CSSStyleRule];
            }
        }

        return cssRules;
    }

    private getAllCSSClasses(node: HTMLElement): Set<string> {
        const classes = new Set<string>();

        const childNodes = node.querySelectorAll('*');
        childNodes.forEach(child =>
            child.classList.forEach(classItem => classes.add(classItem))
        );

        return classes;
    }

    private removeSuffixCSSRule(styleText: string): string {
        return styleText.replace(/\[[0-9a-z_-]+\]/gi, '');
    }

    private removeComments(svgText: string): string {
        return svgText.replace(/<!--(.|\s)*?-->/g, '');
    }

    private removeServicesAttributes(svgText: string) {
        return svgText.replace(
            /\s(_|ng|app)[0-9a-z-]+="[a-z0-9-_.,[\]\s]*"/gi,
            ''
        );
    }

    private appendCSS(cssText: string, element: HTMLElement): HTMLStyleElement {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.innerHTML = cssText;
        const refNode = element.hasChildNodes() ? element.children[0] : null;
        return element.insertBefore(styleElement, refNode);
    }
}
