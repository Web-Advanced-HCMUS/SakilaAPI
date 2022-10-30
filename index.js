
import path from 'path';
const dotEnvConfig = { path: path.resolve(process.cwd(), '.env') };
import * as dotenv from 'dotenv';
dotenv.config(dotEnvConfig);

const init = () => {
	import('./init.js');
};

init();
