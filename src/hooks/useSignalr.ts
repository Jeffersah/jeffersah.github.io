import * as signalR from '@microsoft/signalr';
import { useState, useEffect } from 'react';
import { connect } from 'http2';

export type SignalRConnectionResult =
    { status: 'connecting' }
    | { status: 'connected', connection: signalR.HubConnection }
    | { status: 'failed', err: any };

export default function useSignalR(hostString: string): SignalRConnectionResult {
    const [connection, setConnection] = useState<signalR.HubConnection>(undefined);
    const [connectionResult, setConnectionResult] = useState<SignalRConnectionResult>({ status: 'connecting' });

    if (connection === undefined) {
        setConnection(new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Trace)
            .withUrl(hostString)
            .build());
    }
    useEffect(() => {
        if (connection === undefined) return () => { return; };

        connection.start().then(() => {
            setConnectionResult({ status: 'connected', connection });
        }).catch(err => {
            setConnectionResult({ status: 'failed', err });
        });

        return function cleanup() {
            connection.stop();
        };
    }, [connection]);

    return connectionResult;
}