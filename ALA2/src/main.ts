import { Tareas } from './tareas';
import { CLI } from './cli';

function main() {
  const tareas = new Tareas();
  const cli = new CLI(tareas);
  cli.run();
}

main();