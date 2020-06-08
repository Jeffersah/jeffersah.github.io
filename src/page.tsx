import * as React from 'react';

export interface IPageProps {
    title: string;
    component: () => JSX.Element;
}

export class Page extends React.Component<IPageProps, {}> {
    componentDidMount() {
        document.title = this.props.title;
    }
    render() {
        // tslint:disable-next-line: variable-name
        const PageComponent = this.props.component;

        return (
            <PageComponent />
        );
    }
}