import { highlight } from 'sugar-high';

inter

export function Code({ children, ...props }) {
    let codeHTML = highlight(children);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}
