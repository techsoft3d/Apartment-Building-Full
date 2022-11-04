var arboleda = ["aa8e07b0-8047-491a-a644-c914dc9aa91d",//arboleda full
"f23b7b53-8cf0-43b4-a44c-59cc9967b917", //Arboleda_Bldg-Plumb
"8b147c79-2881-477d-878b-e001ee42c0e0", //Arboleda_Bldg-Mech
"43e04b50-7217-47a1-8655-deeb18d5717a", //Arboleda_Bldg-Elect
"6d85a9c5-ea11-485d-8999-94cbb6aa788d"//Arboleda_Bldg-Arch
] 



async function startViewer() {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        var viewer;

        let res = await fetch(conversionServiceURI + '/api/streamingSession');
        var data = await res.json();

        await fetch(conversionServiceURI + '/api/enableStreamAccess/' + data.sessionid, { method: 'put', headers: { 'items': JSON.stringify(arboleda) } });

        viewer = new Communicator.WebViewer({
                containerId: "viewerContainer",
                endpointUri: 'wss://' + data.serverurl + ":" + data.port + '?token=' + data.sessionid,
                model: "ArboledaFull",
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@2022.2",
                rendererType: 0
        });

        viewer.start();

        return viewer;

}

