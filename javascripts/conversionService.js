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
        var endpointUriBeginning = 'ws://';

        if(conversionServiceURI.substring(0, 5).includes("https")){
                endpointUriBeginning = 'wss://'
        }

        await fetch(conversionServiceURI + '/api/enableStreamAccess/' + data.sessionid, { method: 'put', headers: { 'items': JSON.stringify(arboleda) } });

        viewer = new Communicator.WebViewer({
                containerId: "viewerContainer",
                endpointUri: endpointUriBeginning + data.serverurl + ":" + data.port + '?token=' + data.sessionid,
                model: "ArboledaFull",
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer",
                rendererType: 0
        });

        viewer.start();

        return viewer;

}

async function fetchVersionNumber() {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        let res = await fetch(conversionServiceURI + '/api/hcVersion');
        var data = await res.json();
        versionNumer = data;
        
        return data

}



async function initializeViewer() {
        var viewer = null;
    var ui = null;
    var INITIAL_CAMERA = {
      position: {
        x: -111038.50704000151,
        y: -50454.77499068544,
        z: 35699.247383553375,
      },
      target: {
        x: -44.93310546875,
        y: 5220.4443359375,
        z: 22040,
      },
      up: {
        x: 0.10243505924246869,
        y: 0.039640069717750984,
        z: 0.9939495578301567,
      },
      width: 70000,
      height: 70000,
      projection: 0,
      nearLimit: 0,
      cameraFlags: 0,
    };

    const models = ["Arboleda_Bldg"];


    var date = new Date();
    var start = date.getTime();

    viewer = await startViewer()

    viewer.setCallbacks({
      sceneReady: function () {
        viewer
          .getView()
          .setCamera(Communicator.Camera.fromJson(INITIAL_CAMERA));
        viewer.getView().setBackfacesVisible(true);

      },
      modelStructureReady: function () {
        var date = new Date();
        var end = date.getTime();
        viewer.view.setBackgroundColor(new Communicator.Color(0, 0, 0));

        console.log("Load time = " + (end - start) / 1000.0 + " seconds.");
      },
    });

    const uiConfig = {
      containerId: "content",
      screenConfiguration: Sample.screenConfiguration,
    };
    ui = new Communicator.Ui.Desktop.DesktopUi(viewer, uiConfig);


    window.onresize = function () {
      viewer.resizeCanvas();
    };

}