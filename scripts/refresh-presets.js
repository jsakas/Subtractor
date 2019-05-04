import 'web-audio-test-api';
import Subtractor from '../src/Subtractor';
import path from 'path';
import fs from 'fs';

const subtractor = new Subtractor();

const fromDir = (startPath, filter) => {
    if (!fs.existsSync(startPath)) {
        console.warn('Could not find directory... ',startPath);
        return;
    }

    let files = fs.readdirSync(startPath);
    
    for (let i = 0; i < files.length; i++) {
        let filename=path.join(startPath,files[i]);
        let stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            fromDir(filename,filter);
        } else if (filename.indexOf(filter) >= 0) {
          console.log('Processing', filename);
          let contents = fs.readFileSync(filename, 'utf8');
          let preset = JSON.parse(contents);

          subtractor.loadPreset(preset);

          let updated = subtractor.getPreset();
          fs.writeFileSync(filename, JSON.stringify(updated, null, ' '));
        }
    }
};

fromDir('./src/presets','.json');