import * as signalR from '@microsoft/signalr';

export const createSignalRConnection = (token: string) => {
    return new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7164/chat-hub', {
            accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();
};
