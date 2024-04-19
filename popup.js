const screen = document.getElementById('capture-button');
const filenames = `screenshot-${new Date().toISOString().slice(0, 10)}.jpg`;


screen.onclick = async () => {
  chrome.tabs.captureVisibleTab(async(dataUrl) => {

    const blob = await fetch(dataUrl).then((res) => res.blob());

   
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;

      
      navigator.clipboard.write([
        new ClipboardItem({
          'image/png': new Blob([new Uint8Array(arrayBuffer)], { type: 'image/png' }),
        }),
      ]);
    };

    reader.readAsArrayBuffer(blob);

    //download image
    chrome.downloads.download({
        filename: filenames,
        url: dataUrl,
    });
  });
};

