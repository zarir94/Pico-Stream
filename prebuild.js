import fs from 'fs';
import { exit } from 'process';

const cssFilePath = 'src/bulma.css';
const genRand = () => Math.random().toString(36).substring(2);
const randomText = `.rand-${genRand()} {--rand: "${genRand()}"}\n`;

fs.readFile(cssFilePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading the CSS file:', err);
		return exit(1);
	}

	const updatedData = data + randomText;

	fs.writeFile(cssFilePath, updatedData, 'utf8', (err) => {
		if (err) {
			console.error('Error writing to the CSS file:', err);
      return exit(1);
		} else {
			console.log('CSS file updated with random styles');
		}
	});
});
