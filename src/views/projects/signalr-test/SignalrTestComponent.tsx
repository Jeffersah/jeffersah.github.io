import * as React from 'react';
import Run, { ForceResizeCheck } from '../../../projects/dndmech';
import useWindowSize from '../../../hooks/useWindowSize';
import * as signalR from '@microsoft/signalr';
import useSignalR from '../../../hooks/useSignalr';

// tslint:disable-next-line: no-empty-interface
interface ISignalRTestComponentProps {

}
// tslint:disable-next-line: no-empty-interface
interface ISignalRTestComponentState {
    connection?: signalR.HubConnection;
    sendMessage?: (channel: string, data: any) => void;
    err?: any;

    messages: string[];
    inputText: string;
}

export class SignalrTestComponent extends React.Component<ISignalRTestComponentProps, ISignalRTestComponentState> {

    constructor(props: ISignalRTestComponentProps) {
        super(props);

        this.state = { messages: [], inputText: '' };
    }

    componentDidMount() {
        // Bind signalr
        const hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Trace)
            .withUrl(window.prompt('Enter server URL:'))
            .build();

        this.setState({ connection: hubConnection });

        hubConnection.start()
            .then(() => {
                this.setState({ sendMessage: (methodName: string, data: any) => {
                    // Send message func
                    this.state.connection.send(methodName, data)
                        .catch(err => this.setState({ err }));
                }});

                // BIND LISTENERS
                hubConnection.on('message', (msg) => {
                    this.onMessageRecieved(msg);
                });
            })
            .catch(err => this.setState({ err }));
    }

    componentWillUnmount() {
        // Dispose connection
        if (this.state.connection !== undefined) this.state.connection.stop();
    }

    onMessageRecieved(msg: any) {
        this.setState({
            messages: [...this.state.messages, msg as string]
        });
    }

    render() {
        if (this.state.connection === undefined) return <div>Waiting...</div>;
        if (this.state.sendMessage === undefined) return <div>Connecting...</div>;
        return <div>
            <h1>Connected!</h1>
            <div>Messages: </div>
            {this.state.messages.map((msg, i) =>
                    <div key={i}>{msg}</div>)}
            <input type='text' value={this.state.inputText} onChange={ev => this.setState({ inputText: ev.target.value })}></input>
            <button onClick={() => {
                this.state.sendMessage('message', this.state.inputText);
                this.setState({ inputText: '' });
            }}>Send</button>
        </div>;
    }
}