  // trigger an upload dialog and load the file contents as a preset
  //
  export const loadPresetFile = (subtractor) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const fileContents = fileReader.result;
      const preset = JSON.parse(fileContents);
      subtractor.loadPreset(preset);
    });

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.addEventListener('change', () => {
      fileReader.readAsText(input.files[0]);
    });

    input.click();
  };

  // download the current preset as JSON file
  //
  export const savePresetFile = (subtractor) => {
    const preset = subtractor.getPreset();
    const json = JSON.stringify(preset, null, ' ');
    const blob = new Blob([json], { 'type': 'application/json' });
    const objectURL = URL.createObjectURL(blob);

    const presetName = prompt('Preset name', preset.name || '');

    const a = document.createElement('a');
    a.download = `${presetName}.json`;
    a.href = objectURL;

    a.click();
  };